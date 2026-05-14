import { NextResponse } from 'next/server';
import { readOrder, readOrderFile } from '@/lib/orders';

export const runtime = 'nodejs';

export async function GET(_req: Request, context: { params: { orderId: string; file: string } }) {
  const { orderId, file } = context.params;
  const order = await readOrder(orderId);
  if (!order.previewFiles.includes(file)) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }
  const buffer = await readOrderFile(orderId, file);
  return new NextResponse(buffer, { headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'no-store' } });
}
