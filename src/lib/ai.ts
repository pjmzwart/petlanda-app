import { fal } from '@fal-ai/client';
import { getStylePrompt } from '@/lib/styles';
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

function buildPrompt(styleId: string) {
  return `
Transform THIS EXACT pet from the uploaded photo into premium artwork.

CRITICAL IDENTITY RULES:
- Keep the SAME animal identity.
- Keep the SAME breed and body type.
- Keep the SAME fur color. If the pet is black, it must remain black.
- Keep the SAME face shape, muzzle, nose, ears, eyes and expression.
- Keep the SAME markings, collar details and recognizable features when possible.
- Keep the SAME pose and camera angle as much as possible.
- Do NOT create a different dog or cat.
- Do NOT turn a black dog into a brown, white or fluffy dog.
- Do NOT invent a new breed.
- Only change the artistic style and polish.

Style direction: ${getStylePrompt(styleId)}

High-quality pet artwork, charming, emotional, gift-worthy, no text, no logo, no watermark, no extra animals.
`;
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
  imageSize?: 'square' | 'square_hd';
  outputFormat?: 'jpeg' | 'png';
}) {
  configureFal();

  const input = {
    image_url: dataUriFromBuffer(params.inputBuffer, params.inputMimeType || 'image/png'),
    prompt: `${buildPrompt(params.styleId)} ${params.variant}`,
    image_size: params.imageSize || 'square',
    num_images: 1,
    num_inference_steps: 30,
    output_format: params.outputFormat || 'jpeg',
    guidance_scale: 2.8,
    // Lower strength keeps the uploaded pet more recognizable.
    strength: 0.28,
    enable_safety_checker: true
  } as any;

  const result = await fal.subscribe('fal-ai/flux/dev/image-to-image' as any, {
    input,
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
    variant: 'Create one preview. Keep the pet highly recognizable. Preserve fur color, face, ears, eyes, markings and expression. Apply the selected style subtly.',
    imageSize: 'square',
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
      variant: `Paid HD version ${i}: keep this exact pet highly recognizable. Preserve fur color, face shape, muzzle, ears, eye shape, markings, collar details and expression. Create a beautiful polished variation without changing breed or identity.${order.packageType === 'premium' ? ' Include premium polish, mobile wallpaper-friendly composition and print-ready detail.' : ''}`,
      imageSize: 'square_hd',
      outputFormat: 'png'
    });

    const hdName = `petlanda-hd-${i}.png`;
    await saveOrderFile(order.id, hdName, hdBuffer, 'image/png');
    hdFiles.push(hdName);
  }

  return updateOrder(orderId, { status: 'paid', hdFiles });
}
