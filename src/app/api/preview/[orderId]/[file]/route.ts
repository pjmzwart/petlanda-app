import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import { readOrder, orderPath } from '@/lib/orders';

export const runtime = 'nodejs';

export async function GET(_req: Request, context: { params: Promise<{ orderId: string; file: string }> }) {
  const { orderId, file } = await context.params;
  const order = await readOrder(orderId);
  if (!order.previewFiles.includes(file)) {
    return NextResponse.json({ error: 'Niet gevonden.' }, { status: 404 });
  }
  const buffer = await fs.readFile(orderPath(orderId, file));
  return new NextResponse(buffer, { headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'no-store' } });
}
