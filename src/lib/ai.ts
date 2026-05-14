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
Create a beautiful artistic version of the pet in the uploaded photo.

BALANCE:
- Keep the same pet recognizable.
- Preserve the pet's breed, main fur color, face shape, ears, nose, eyes, markings, collar and expression.
- Keep the same pose or a very similar pose when possible.
- Apply the selected art style clearly, but do not replace the pet with a different animal.
- If the pet is a black dog, it should remain a black dog.
- Do not invent a different breed or a completely different face.

Style direction: ${getStylePrompt(styleId)}

Premium pet portrait, polished, warm, charming, emotional, gift-worthy, clean composition, no text, no logo, no watermark, no extra animals.
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
    guidance_scale: 4,
    // Balanced: visible style transformation while keeping the pet recognizable.
    strength: 0.55,
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
    variant: 'Create one preview. Keep the pet recognizable, but clearly apply the selected art style. Preserve fur color, face, ears, eyes, markings and expression.',
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
      variant: `Paid HD version ${i}: create a polished artistic variation of this same pet. Keep the pet recognizable, preserve fur color, face shape, muzzle, ears, eye shape, markings, collar details and expression, but apply the selected style clearly.${order.packageType === 'premium' ? ' Include premium polish, mobile wallpaper-friendly composition and print-ready detail.' : ''}`,
      imageSize: 'square_hd',
      outputFormat: 'png'
    });

    const hdName = `petlanda-hd-${i}.png`;
    await saveOrderFile(order.id, hdName, hdBuffer, 'image/png');
    hdFiles.push(hdName);
  }

  return updateOrder(orderId, { status: 'paid', hdFiles });
}
