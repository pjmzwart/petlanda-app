
import { NextRequest, NextResponse } from 'next/server';
import { generatePetImage } from '@/lib/ai';
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

    const image = await generatePetImage({
      inputBuffer,
      inputMimeType,
      sceneId,
      index: index + 100,
      preview: false
    });

    const imageUrl = await uploadPublicBlob(
      `orders/${orderId}/hd-${index + 1}.jpg`,
      image,
      'image/jpeg'
    );

    return NextResponse.json({ imageUrl, index });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error?.message || 'HD image generation failed' }, { status: 500 });
  }
}
