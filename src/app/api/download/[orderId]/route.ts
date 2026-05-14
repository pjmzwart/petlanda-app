import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { PassThrough } from 'stream';
import archiver from 'archiver';
import { readOrder, orderPath } from '@/lib/orders';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await context.params;
  const order = await readOrder(orderId);

  if (order.status !== 'paid') {
    return NextResponse.json({ error: 'Nog niet betaald.' }, { status: 402 });
  }

  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = new PassThrough();
  archive.pipe(stream);

  for (const file of order.hdFiles) {
    archive.append(fs.createReadStream(orderPath(order.id, file)), { name: file });
  }
  archive.finalize();

  return new NextResponse(stream as any, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="pet-art-${order.id}.zip"`
    }
  });
}
