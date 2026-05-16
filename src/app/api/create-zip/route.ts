
import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { uploadPublicBlob } from '@/lib/blob';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orderId = body.orderId;
    const sceneId = body.sceneId || 'petlanda';
    const packageType = body.packageType || 'basic';
    const imageUrls = Array.isArray(body.imageUrls) ? body.imageUrls : [];

    if (!orderId || imageUrls.length === 0) {
      return NextResponse.json({ error: 'Missing orderId or imageUrls' }, { status: 400 });
    }

    const zip = new JSZip();

    for (let i = 0; i < imageUrls.length; i++) {
      const res = await fetch(imageUrls[i]);
      if (!res.ok) throw new Error(`Could not fetch image ${i + 1}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      zip.file(`petlanda-${sceneId}-${i + 1}.jpg`, buffer);
    }

    const zipBuffer = Buffer.from(await zip.generateAsync({ type: 'nodebuffer' }));
    const zipUrl = await uploadPublicBlob(
      `orders/${orderId}/petlanda-${packageType}.zip`,
      zipBuffer,
      'application/zip'
    );

    return NextResponse.json({ zipUrl });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error?.message || 'ZIP creation failed' }, { status: 500 });
  }
}
