
import { NextRequest, NextResponse } from 'next/server';
import { readStatus } from '@/lib/hdStatus';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
  }

  const status = await readStatus(orderId);

  if (!status) {
    return NextResponse.json({
      orderId,
      status: 'idle',
      total: 0,
      completed: 0,
      message: 'Waiting to start generation...',
      updatedAt: new Date().toISOString()
    });
  }

  return NextResponse.json(status);
}
