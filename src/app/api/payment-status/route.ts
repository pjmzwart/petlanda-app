import { NextRequest, NextResponse } from 'next/server';
import createMollieClient from '@mollie/api-client';
import { readOrder } from '@/lib/orders';
import { generatePaidHdPackage } from '@/lib/ai';

export const runtime = 'nodejs';
export const maxDuration = 60;

async function verifyAndGenerateIfPaid(orderId: string) {
  const order = await readOrder(orderId);
  if (!order.paymentId) return order;
  if (!process.env.MOLLIE_API_KEY) throw new Error('MOLLIE_API_KEY is missing.');

  const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
  const payment = await mollie.payments.get(order.paymentId);

  if (payment.status === 'paid') {
    const targetCount = order.packageImageCount || (order.packageType === 'premium' ? 10 : 5);
    if (order.hdFiles.length >= targetCount && order.status === 'paid') return order;
    return generatePaidHdPackage(orderId);
  }

  return order;
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId');
  if (!orderId) return NextResponse.json({ error: 'orderId is missing.' }, { status: 400 });
  const order = await verifyAndGenerateIfPaid(orderId);
  const targetCount = order.packageImageCount || (order.packageType === 'premium' ? 10 : 5);
  return NextResponse.json({ status: order.status, hdReady: order.hdFiles.length >= targetCount, packageType: order.packageType || 'basic', imageCount: targetCount });
}

export async function POST(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId');
  if (!orderId) return NextResponse.json({ ok: false }, { status: 400 });
  await verifyAndGenerateIfPaid(orderId);
  return NextResponse.json({ ok: true });
}
