import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { readOrder, readOrderFile } from '@/lib/orders';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, context: { params: { orderId: string } }) {
  const { orderId } = context.params;
  const order = await readOrder(orderId);

  const targetCount = order.packageImageCount || (order.packageType === 'premium' ? 10 : 5);

  if (order.status !== 'paid' || order.hdFiles.length < targetCount) {
    return NextResponse.json({ error: 'Your HD pack is not ready yet or has not been paid.' }, { status: 202 });
  }

  const zip = new JSZip();
  for (const file of order.hdFiles) {
    const data = await readOrderFile(order.id, file);
    zip.file(file, data);
  }

  const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="petlanda-${order.id}.zip"`
    }
  });
}
