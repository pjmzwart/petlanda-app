
import { fal } from '@fal-ai/client';
import { getRandomSceneVariation, getSceneVariation, getStylePrompt } from '@/lib/styles';
import { makeWatermarkedPreview } from '@/lib/watermark';
import { readOrder, readOrderFile, saveOrderFile, updateOrder } from '@/lib/orders';

function getFalKey() {
  const key = process.env.FAL_KEY || process.env.OPENAI_API_KEY;
  if (!key) throw new Error('FAL_KEY ontbreekt. Voeg je fal.ai key toe in Vercel Environment Variables.');
  return key;
}

function configureFal() {
  fal.config({ credentials: getFalKey() });
}

function dataUriFromBuffer(buffer: Buffer, mimeType = 'image/png') {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

function randomSeed() {
  return Math.floor(Math.random() * 2_000_000_000);
}

function buildPrompt(sceneId: string, variant: string) {
  return `${getStylePrompt(sceneId)}

IMPORTANT OUTPUT RULES:
- Keep the uploaded pet clearly recognizable.
- Do not replace the pet with another breed/species.
- Keep the original animal's face, expression and body identity as much as possible.
- Change the surroundings and moment clearly so the result is not just the original photo.
- If the pet holds a glass or object, make the gesture funny but animal-like, not a realistic human hand.
- No text, no logo, no watermark in the generated image.

VARIATION:
${variant}`;
}

async function downloadImage(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download generated image: ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
}

async function generateFalImage(params: {
  inputBuffer: Buffer;
  inputMimeType?: string;
  styleId: string;
  variant: string;
  outputFormat?: 'jpeg' | 'png';
  preview?: boolean;
}) {
  configureFal();
  const model = process.env.FAL_MODEL || 'fal-ai/flux-pro/kontext';

  const result = await fal.subscribe(model as any, {
    input: {
      image_url: dataUriFromBuffer(params.inputBuffer, params.inputMimeType || 'image/png'),
      prompt: buildPrompt(params.styleId, params.variant),
      guidance_scale: Number(process.env.FAL_GUIDANCE_SCALE || 3.7),
      num_images: 1,
      output_format: params.outputFormat || 'jpeg',
      safety_tolerance: String(process.env.FAL_SAFETY_TOLERANCE || '2'),
      enhance_prompt: true,
      aspect_ratio: '1:1',
      seed: randomSeed()
    } as any,
    logs: false
  } as any);

  const imageUrl = (result.data as any)?.images?.[0]?.url;
  if (!imageUrl) throw new Error('No image received from fal.ai.');
  return downloadImage(imageUrl);
}

export async function generateThreeWatermarkedPreviews(params: {
  orderId: string;
  inputBuffer: Buffer;
  inputMimeType?: string;
  styleId: string;
}) {
  const previewFiles: string[] = [];

  for (let i = 1; i <= 3; i++) {
    const variation = getSceneVariation(params.styleId, i - 1);
    const previewSource = await generateFalImage({
      inputBuffer: params.inputBuffer,
      inputMimeType: params.inputMimeType,
      styleId: params.styleId,
      variant: `Free preview ${i} of 3. Use this specific setting: ${variation}. Make this preview visually different from the other previews by changing camera angle, pose, mood, background details and composition. Keep the exact pet recognizable.`,
      outputFormat: 'jpeg',
      preview: true
    });

    const previewName = `preview-${i}.jpg`;
    const previewBuffer = await makeWatermarkedPreview(previewSource, process.env.WATERMARK_TEXT || 'PETLANDA PREVIEW');
    await saveOrderFile(params.orderId, previewName, previewBuffer, 'image/jpeg');
    previewFiles.push(previewName);
  }

  return previewFiles;
}

// Backwards-compatible export, in case an old route imports it.
export async function generateOneWatermarkedPreview(params: {
  orderId: string;
  inputBuffer: Buffer;
  inputMimeType?: string;
  styleId: string;
}) {
  const files = await generateThreeWatermarkedPreviews(params);
  return files[0];
}

export async function generatePaidHdPackage(orderId: string) {
  const order = await readOrder(orderId);
  const targetCount = order.packageImageCount || (order.packageType === 'premium' ? 10 : 5);
  if (order.hdFiles.length >= targetCount) return order;

  await updateOrder(orderId, { status: 'generating' });
  const inputBuffer = await readOrderFile(order.id, order.inputFile);
  const hdFiles: string[] = [];

  for (let i = 1; i <= targetCount; i++) {
    const selectedVariation = getSceneVariation(order.styleId, i - 1);
    const extraRandomness = getRandomSceneVariation(order.styleId);
    const hdBuffer = await generateFalImage({
      inputBuffer,
      inputMimeType: order.inputMimeType || 'image/png',
      styleId: order.styleId,
      variant: `Paid HD image ${i} of ${targetCount}. This must be unique and not a repeat. Primary setting: ${selectedVariation}. Additional mood/background inspiration: ${extraRandomness}. Vary the camera angle, framing, lighting, background, props, pose, moment and composition. Keep the exact pet recognizable. ${order.packageType === 'premium' ? 'Premium quality, wallpaper-friendly and print-ready detail.' : ''}`,
      outputFormat: 'png'
    });

    const hdName = `petlanda-hd-${i}.png`;
    await saveOrderFile(order.id, hdName, hdBuffer, 'image/png');
    hdFiles.push(hdName);
  }

  return updateOrder(orderId, { status: 'paid', hdFiles });
}
