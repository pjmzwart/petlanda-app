import { NextRequest, NextResponse } from 'next/server';
import createMollieClient from '@mollie/api-client';
import { readOrder, updateOrder } from '@/lib/orders';

export const runtime = 'nodejs';

async function verifyAndMarkPaid(orderId: string) {
  const order = await readOrder(orderId);
  if (!order.paymentId) return order;
  if (!process.env.MOLLIE_API_KEY) throw new Error('MOLLIE_API_KEY ontbreekt.');

  const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
  const payment = await mollie.payments.get(order.paymentId);
  if (payment.status === 'paid') {
    return updateOrder(orderId, { status: 'paid' });
  }
  return order;
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId');
  if (!orderId) return NextResponse.json({ error: 'orderId ontbreekt.' }, { status: 400 });
  const order = await verifyAndMarkPaid(orderId);
  return NextResponse.json({ status: order.status });
}

export async function POST(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId');
  if (!orderId) return NextResponse.json({ ok: false }, { status: 400 });
  await verifyAndMarkPaid(orderId);
  return NextResponse.json({ ok: true });
}
