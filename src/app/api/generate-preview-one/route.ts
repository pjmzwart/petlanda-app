
import { NextRequest, NextResponse } from 'next/server';
import { generatePetImage } from '@/lib/ai';
import { makeWatermarkedPreview } from '@/lib/watermark';
import { uploadPublicBlob } from '@/lib/blob';

export const runtime = 'nodejs';
export const maxDuration = 45;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderId = body.orderId;
    const inputUrl = body.inputUrl;
    const sceneId = body.sceneId || 'restaurant';
    const index = Number(body.index || 0);

    if (!orderId || !inputUrl) {
      return NextResponse.json({ error: 'Missing orderId or inputUrl' }, { status: 400 });
    }

    const inputRes = await fetch(inputUrl);
    if (!inputRes.ok) throw new Error('Could not load original pet photo');

    const inputBuffer = Buffer.from(await inputRes.arrayBuffer());
    const inputMimeType = inputRes.headers.get('content-type') || 'image/jpeg';

    const generated = await generatePetImage({
      inputBuffer,
      inputMimeType,
      sceneId,
      index,
      preview: true
    });

    const watermarked = await makeWatermarkedPreview(generated);
    const previewUrl = await uploadPublicBlob(
      `orders/${orderId}/preview-${index + 1}.jpg`,
      watermarked,
      'image/jpeg'
    );

    return NextResponse.json({ previewUrl, index });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error?.message || 'Preview generation failed' }, { status: 500 });
  }
}
