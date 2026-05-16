
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { uploadPublicBlob } from '@/lib/blob';

export const runtime = 'nodejs';
export const maxDuration = 15;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    const sceneId = (form.get('sceneId') as string) || 'restaurant';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const inputMimeType = file.type || 'image/jpeg';
    const orderId = nanoid(12);

    const inputUrl = await uploadPublicBlob(
      `orders/${orderId}/input-${file.name || 'pet.jpg'}`,
      inputBuffer,
      inputMimeType
    );

    return NextResponse.json({ orderId, inputUrl, sceneId });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error?.message || 'Could not upload photo' }, { status: 500 });
  }
}
