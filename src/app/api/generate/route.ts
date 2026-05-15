
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { ensureOrderDir, saveOrder, saveOrderFile, getOrderFileUrl } from '@/lib/orders';
import { generateThreeWatermarkedPreviews } from '@/lib/ai';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.FAL_KEY && !process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'FAL_KEY is missing. Add your fal.ai key in Vercel Environment Variables.' }, { status: 500 });
    }

    const form = await req.formData();
    const image = form.get('image');
    const styleId = String(form.get('styleId') ?? 'luxury-restaurant');

    if (!(image instanceof File)) return NextResponse.json({ error: 'No image received.' }, { status: 400 });
    if (image.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Image is too large. Maximum 10 MB.' }, { status: 400 });

    const orderId = nanoid(12);
    await ensureOrderDir(orderId);
    const inputBuffer = Buffer.from(await image.arrayBuffer());
    const safeName = image.name.replace(/[^a-z0-9.\-_]/gi, '_');
    const inputFile = `upload-${safeName || 'pet.png'}`;
    await saveOrderFile(orderId, inputFile, inputBuffer, image.type || 'image/png');

    const previewFiles = await generateThreeWatermarkedPreviews({
      orderId,
      inputBuffer,
      inputMimeType: image.type || 'image/png',
      styleId
    });

    await saveOrder({
      id: orderId,
      styleId,
      createdAt: new Date().toISOString(),
      status: 'preview',
      inputFile,
      inputMimeType: image.type || 'image/png',
      previewFiles,
      hdFiles: []
    });

    const previewUrls = await Promise.all(previewFiles.map((file) => getOrderFileUrl(orderId, file)));
    return NextResponse.json({ orderId, previewUrls, previewUrl: previewUrls[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Preview generation failed. Check your fal.ai key, billing, and try again.' }, { status: 500 });
  }
}
