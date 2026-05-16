
import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { saveStatus } from '@/lib/hdStatus';
import { uploadPublicBlob } from '@/lib/blob';
import { generatePetImage } from '@/lib/ai';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const startedAt = Date.now();

  try {
    const body = await req.json();
    const orderId = body.orderId;
    const inputUrl = body.inputUrl;
    const sceneId = body.sceneId || 'restaurant';
    const packageType = body.packageType || 'basic';
    const total = packageType === 'premium' ? 10 : 5;

    if (!orderId || !inputUrl) {
      return NextResponse.json({ error: 'Missing orderId or inputUrl' }, { status: 400 });
    }

    await saveStatus({
      orderId,
      status: 'working',
      total,
      completed: 0,
      message: 'Payment received. Creating your HD images now...',
      updatedAt: new Date().toISOString()
    });

    const inputRes = await fetch(inputUrl);
    if (!inputRes.ok) throw new Error('Could not load original pet photo');

    const inputBuffer = Buffer.from(await inputRes.arrayBuffer());
    const inputMimeType = inputRes.headers.get('content-type') || 'image/jpeg';

    const zip = new JSZip();

    // Generate in small batches. This is faster than fully sequential, but safer than launching 10 at once.
    const batchSize = 2;
    let completed = 0;

    for (let start = 0; start < total; start += batchSize) {
      const batch = Array.from({ length: Math.min(batchSize, total - start) }, (_, j) => start + j);

      const results = await Promise.all(batch.map(async (i) => {
        const image = await generatePetImage({
          inputBuffer,
          inputMimeType,
          sceneId,
          index: i + 100,
          preview: false
        });
        return { index: i, image };
      }));

      for (const result of results) {
        zip.file(`petlanda-${sceneId}-${result.index + 1}.jpg`, result.image);
        completed += 1;

        await saveStatus({
          orderId,
          status: 'working',
          total,
          completed,
          message: `Creating image ${completed} of ${total}...`,
          updatedAt: new Date().toISOString()
        });
      }

      // If Vercel is close to timeout, stop with a clear status rather than hanging silently.
      if (Date.now() - startedAt > 52000 && completed < total) {
        await saveStatus({
          orderId,
          status: 'error',
          total,
          completed,
          message: 'Generation is taking longer than expected. Please try again or contact support.',
          error: 'Generation timeout protection triggered before completion.',
          updatedAt: new Date().toISOString()
        });
        return NextResponse.json({
          status: 'error',
          message: 'Generation is taking longer than expected. Please try again.',
          completed,
          total
        }, { status: 202 });
      }
    }

    await saveStatus({
      orderId,
      status: 'working',
      total,
      completed,
      message: 'Packaging your HD images...',
      updatedAt: new Date().toISOString()
    });

    const zipBuffer = Buffer.from(await zip.generateAsync({ type: 'nodebuffer' }));
    const zipUrl = await uploadPublicBlob(
      `orders/${orderId}/petlanda-${packageType}.zip`,
      zipBuffer,
      'application/zip'
    );

    await saveStatus({
      orderId,
      status: 'done',
      total,
      completed,
      message: 'Your HD pack is ready!',
      zipUrl,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({
      status: 'done',
      completed,
      total,
      zipUrl,
      message: 'Your HD pack is ready!'
    });

  } catch (error: any) {
    console.error(error);

    try {
      const body = await req.json().catch(() => ({}));
      if (body?.orderId) {
        await saveStatus({
          orderId: body.orderId,
          status: 'error',
          total: body.packageType === 'premium' ? 10 : 5,
          completed: 0,
          message: 'Something went wrong while creating your HD pack.',
          error: error?.message || 'Unknown error',
          updatedAt: new Date().toISOString()
        });
      }
    } catch {}

    return NextResponse.json({
      status: 'error',
      error: error?.message || 'HD generation failed'
    }, { status: 500 });
  }
}
