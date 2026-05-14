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
  return `${getStylePrompt(styleId)} Square composition, high-quality pet artwork, clean background, no text, no watermark, no logo, no extra animals.`;
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
    num_inference_steps: 28,
    output_format: params.outputFormat || 'jpeg',
    guidance_scale: 3.5,
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
    variant: 'Create one strong preview version that clearly shows the final look. Make it charming, friendly and commercially attractive.',
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

  if (order.hdFiles.length >= 5) {
    return order;
  }

  await updateOrder(orderId, { status: 'generating' });

  const inputBuffer = await readOrderFile(order.id, order.inputFile);
  const hdFiles: string[] = [];

  for (let i = 1; i <= 5; i++) {
    const hdBuffer = await generateFalImage({
      inputBuffer,
      inputMimeType: order.inputMimeType || 'image/png',
      styleId: order.styleId,
      variant: `Paid HD version ${i}: create a different but consistent variation with a new pose, lighting, expression, or background detail while keeping the same pet recognizable. Premium quality, gift-worthy result.`,
      imageSize: 'square_hd',
      outputFormat: 'png'
    });

    const hdName = `petlanda-hd-${i}.png`;
    await saveOrderFile(order.id, hdName, hdBuffer, 'image/png');
    hdFiles.push(hdName);
  }

  return updateOrder(orderId, { status: 'paid', hdFiles });
}
