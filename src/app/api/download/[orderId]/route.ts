import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import JSZip from 'jszip';
import { readOrder, orderPath } from '@/lib/orders';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, context: { params: { orderId: string } }) {
  const { orderId } = context.params;
  const order = await readOrder(orderId);

  if (order.status !== 'paid') {
    return NextResponse.json({ error: 'Nog niet betaald.' }, { status: 402 });
  }

  const zip = new JSZip();
  for (const file of order.hdFiles) {
    const data = await fs.readFile(orderPath(order.id, file));
    zip.file(file, data);
  }

  const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="pet-art-${order.id}.zip"`
    }
  });
}
