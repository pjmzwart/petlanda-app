import { NextRequest, NextResponse } from 'next/server';
import createMollieClient from '@mollie/api-client';
import { readOrder, updateOrder } from '@/lib/orders';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.MOLLIE_API_KEY) {
      return NextResponse.json({ error: 'MOLLIE_API_KEY is missing.' }, { status: 500 });
    }

    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: 'orderId is missing.' }, { status: 400 });
    const order = await readOrder(orderId);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
    const price = Number(process.env.PRODUCT_PRICE_EUR || '4.99').toFixed(2);

    const payment = await mollie.payments.create({
      amount: { currency: 'EUR', value: price },
      description: process.env.PRODUCT_NAME || 'PetLanda 5 HD AI pet artworks',
      redirectUrl: `${baseUrl}/checkout?orderId=${order.id}&paid=check`,
      webhookUrl: `${baseUrl}/api/payment-status?orderId=${order.id}`,
      metadata: { orderId: order.id }
    });

    await updateOrder(order.id, { paymentId: payment.id });
    return NextResponse.json({ checkoutUrl: (payment as any)._links.checkout.href });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Mollie payment could not be created.' }, { status: 500 });
  }
}
