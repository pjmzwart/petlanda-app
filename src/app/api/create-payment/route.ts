import { NextRequest, NextResponse } from 'next/server';
import createMollieClient from '@mollie/api-client';
import { readOrder, updateOrder } from '@/lib/orders';

export const runtime = 'nodejs';

type PackageType = 'basic' | 'premium';

const PACKAGES: Record<PackageType, { price: string; description: string; imageCount: number }> = {
  basic: {
    price: process.env.BASIC_PRICE_EUR || '7.99',
    description: 'PetLanda Basic Pack - 5 HD AI pet artworks',
    imageCount: 5
  },
  premium: {
    price: process.env.PREMIUM_PRICE_EUR || '14.99',
    description: 'PetLanda Premium Pack - 10 HD AI pet artworks + extras',
    imageCount: 10
  }
};

export async function POST(req: NextRequest) {
  try {
    if (!process.env.MOLLIE_API_KEY) {
      return NextResponse.json({ error: 'MOLLIE_API_KEY is missing in Vercel Environment Variables.' }, { status: 500 });
    }

    const { orderId, packageType = 'basic' } = await req.json();
    if (!orderId) return NextResponse.json({ error: 'orderId is missing.' }, { status: 400 });
    if (packageType !== 'basic' && packageType !== 'premium') {
      return NextResponse.json({ error: 'Invalid package selected.' }, { status: 400 });
    }

    const order = await readOrder(orderId);
    const selected = PACKAGES[packageType as PackageType];

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.APP_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: 'NEXT_PUBLIC_BASE_URL is missing. Add your Vercel app URL in Environment Variables.' }, { status: 500 });
    }

    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

    const payment = await mollie.payments.create({
      amount: { currency: 'EUR', value: Number(selected.price).toFixed(2) },
      description: selected.description,
      redirectUrl: `${cleanBaseUrl}/checkout?orderId=${order.id}&paid=check`,
      webhookUrl: `${cleanBaseUrl}/api/payment-status?orderId=${order.id}`,
      metadata: {
        orderId: order.id,
        packageType,
        packageImageCount: selected.imageCount
      }
      // IMPORTANT: no fixed "method" here. Mollie will show the suitable active methods for your profile.
    });

    await updateOrder(order.id, {
      paymentId: payment.id,
      packageType,
      packageImageCount: selected.imageCount
    });

    return NextResponse.json({ checkoutUrl: (payment as any)._links.checkout.href });
  } catch (error: any) {
    console.error(error);
    const message = error?.title || error?.message || 'Mollie payment could not be created.';
    return NextResponse.json({ error: `Mollie payment could not be created: ${message}` }, { status: 500 });
  }
}
