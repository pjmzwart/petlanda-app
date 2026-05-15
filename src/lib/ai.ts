import { fal } from '@fal-ai/client';
import { getSceneVariation, getStylePrompt } from '@/lib/styles';
import { makeWatermarkedPreview } from '@/lib/watermark';
import { readOrder, readOrderFile, saveOrderFile, updateOrder } from '@/lib/orders';

function getFalKey() {
  const key = process.env.FAL_KEY || process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error('FAL_KEY ontbreekt. Voeg je fal.ai key toe in Vercel Environment Variables.');
  }
  return key;
}

function configureFal() {
  fal.config({ credentials: getFalKey() });
}

function dataUriFromBuffer(buffer: Buffer, mimeType = 'image/png') {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

function buildPrompt(sceneId: string, variant: string) {
  return `${getStylePrompt(sceneId)}

CRITICAL: This is a photo edit of the uploaded pet, not a new pet generation. Keep the same recognizable animal identity and personality. Change the background, scene, props, lighting, outfit and composition to match the chosen concept. If a glass is raised, make the paw gesture believable and animal-like, not a human hand. Natural photorealistic result. No text, no logo, no watermark.

Variation instruction: ${variant}`;
}

async function downloadImage(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not download generated image: ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function generateFalImage(params: {
  inputBuffer: Buffer;
  inputMimeType?: string;
  styleId: string;
  variant: string;
  outputFormat?: 'jpeg' | 'png';
}) {
  configureFal();

  const model = process.env.FAL_MODEL || 'fal-ai/flux-pro/kontext';

  const result = await fal.subscribe(model as any, {
    input: {
      image_url: dataUriFromBuffer(params.inputBuffer, params.inputMimeType || 'image/png'),
      prompt: buildPrompt(params.styleId, params.variant),
      guidance_scale: Number(process.env.FAL_GUIDANCE_SCALE || 3.5),
      num_images: 1,
      output_format: params.outputFormat || 'jpeg',
      safety_tolerance: String(process.env.FAL_SAFETY_TOLERANCE || '2'),
      enhance_prompt: true,
      aspect_ratio: '1:1'
    } as any,
    logs: false
  } as any);

  const imageUrl = (result.data as any)?.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error('No image received from fal.ai.');
  }

  return downloadImage(imageUrl);
}

export async function generateOneWatermarkedPreview(params: {
  orderId: string;
  inputBuffer: Buffer;
  inputMimeType?: string;
  styleId: string;
}) {
  const previewSource = await generateFalImage({
    inputBuffer: params.inputBuffer,
    inputMimeType: params.inputMimeType,
    styleId: params.styleId,
    variant: 'Create one preview image. Make the scene change clearly visible, but keep the pet identity strongly recognizable.',
    outputFormat: 'jpeg'
  });

  const previewName = 'preview-1.jpg';
  const previewBuffer = await makeWatermarkedPreview(previewSource, process.env.WATERMARK_TEXT || 'PETLANDA PREVIEW');
  await saveOrderFile(params.orderId, previewName, previewBuffer, 'image/jpeg');
  return previewName;
}

export async function generatePaidHdPackage(orderId: string) {
  const order = await readOrder(orderId);

  const targetCount = order.packageImageCount || (order.packageType === 'premium' ? 10 : 5);

  if (order.hdFiles.length >= targetCount) {
    return order;
  }

  await updateOrder(orderId, { status: 'generating' });

  const inputBuffer = await readOrderFile(order.id, order.inputFile);
  const hdFiles: string[] = [];

  for (let i = 1; i <= targetCount; i++) {
    const hdBuffer = await generateFalImage({
      inputBuffer,
      inputMimeType: order.inputMimeType || 'image/png',
      styleId: order.styleId,
      variant: `Paid HD version ${i}. Create a unique image, not a repeat. Use this specific variation: ${getSceneVariation(order.styleId, i - 1)}. Keep the exact pet recognizable. Vary the restaurant/scene setting, camera angle, lighting, composition, props, pose or mood so every paid image feels different.${order.packageType === 'premium' ? ' Premium quality, wallpaper-friendly and print-ready detail.' : ''}`,
      outputFormat: 'png'
    });

    const hdName = `petlanda-hd-${i}.png`;
    await saveOrderFile(order.id, hdName, hdBuffer, 'image/png');
    hdFiles.push(hdName);
  }

  return updateOrder(orderId, { status: 'paid', hdFiles });
}
