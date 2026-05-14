import { NextRequest, NextResponse } from 'next/server';
import createMollieClient from '@mollie/api-client';
import { readOrder, updateOrder } from '@/lib/orders';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.MOLLIE_API_KEY) {
      return NextResponse.json({ error: 'MOLLIE_API_KEY is missing in Vercel Environment Variables.' }, { status: 500 });
    }

    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: 'orderId is missing.' }, { status: 400 });
    const order = await readOrder(orderId);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.APP_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: 'NEXT_PUBLIC_BASE_URL is missing. Add your Vercel app URL in Environment Variables.' }, { status: 500 });
    }

    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
    const price = Number(process.env.PRODUCT_PRICE_EUR || '4.99').toFixed(2);

    const payment = await mollie.payments.create({
      amount: { currency: 'EUR', value: price },
      description: process.env.PRODUCT_NAME || 'PetLanda 5 HD AI pet artworks',
      redirectUrl: `${baseUrl.replace(/\/$/, '')}/checkout?orderId=${order.id}&paid=check`,
      webhookUrl: `${baseUrl.replace(/\/$/, '')}/api/payment-status?orderId=${order.id}`,
      metadata: { orderId: order.id }
    });

    await updateOrder(order.id, { paymentId: payment.id });
    return NextResponse.json({ checkoutUrl: (payment as any)._links.checkout.href });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Mollie payment could not be created. Check MOLLIE_API_KEY and NEXT_PUBLIC_BASE_URL.' }, { status: 500 });
  }
}
