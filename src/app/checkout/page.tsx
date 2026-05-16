
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type HdStatus = {
  status: 'idle' | 'working' | 'done' | 'error';
  total: number;
  completed: number;
  message: string;
  zipUrl?: string;
  error?: string;
};

export default function CheckoutPage() {
  const params = useSearchParams();

  const orderId = params.get('orderId') || '';
  const packageType = params.get('packageType') || 'basic';
  const inputUrl = params.get('inputUrl') || '';
  const sceneId = params.get('sceneId') || 'restaurant';

  const [status, setStatus] = useState<HdStatus>({
    status: 'idle',
    total: packageType === 'premium' ? 10 : 5,
    completed: 0,
    message: 'Payment received. Starting your HD pack...'
  });

  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const progress = useMemo(() => {
    if (!status.total) return 5;
    return Math.max(5, Math.min(100, Math.round((status.completed / status.total) * 100)));
  }, [status.completed, status.total]);

  async function startGeneration() {
    if (!orderId || !inputUrl || started) return;
    setStarted(true);

    setStatus({
      status: 'working',
      total: packageType === 'premium' ? 10 : 5,
      completed: 0,
      message: 'Payment received. Creating your HD images now...'
    });

    try {
      const res = await fetch('/api/create-hd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, packageType, inputUrl, sceneId })
      });

      const data = await res.json();

      if (data.status === 'done') {
        setStatus({
          status: 'done',
          total: data.total,
          completed: data.completed,
          message: data.message || 'Your HD pack is ready!',
          zipUrl: data.zipUrl
        });
      } else if (data.status === 'error') {
        setStatus({
          status: 'error',
          total: data.total || (packageType === 'premium' ? 10 : 5),
          completed: data.completed || 0,
          message: data.message || 'Generation took too long.',
          error: data.error
        });
      }
    } catch (error: any) {
      setStatus({
        status: 'error',
        total: packageType === 'premium' ? 10 : 5,
        completed: 0,
        message: 'Something went wrong while creating your HD pack.',
        error: error?.message || 'Unknown error'
      });
    }
  }

  async function pollStatus() {
    if (!orderId) return;
    try {
      const res = await fetch(`/api/hd-status?orderId=${encodeURIComponent(orderId)}`, {
        cache: 'no-store'
      });
      const data = await res.json();

      if (data?.status && data.status !== 'idle') {
        setStatus(data);
      }
    } catch {}
  }

  useEffect(() => {
    startGeneration();
    const interval = setInterval(pollStatus, 2500);
    return () => clearInterval(interval);
  }, [orderId, inputUrl]);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 20% 0, rgba(251,191,36,.18), transparent 28%), linear-gradient(135deg,#050816,#111827,#1f1635)',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: 24
    }}>
      <div style={{ maxWidth: 820, margin: '0 auto', paddingTop: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 34 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 16,
            background: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
            display: 'grid',
            placeItems: 'center',
            color: '#111827',
            fontSize: 28
          }}>🐾</div>
          <h1 style={{ margin: 0, fontSize: 34 }}>PetLanda</h1>
        </div>

        <section style={{
          background: 'rgba(255,255,255,.08)',
          border: '1px solid rgba(255,255,255,.14)',
          borderRadius: 28,
          padding: 28,
          boxShadow: '0 24px 70px rgba(0,0,0,.28)'
        }}>
          <h2 style={{ fontSize: 34, marginTop: 0 }}>
            {status.status === 'done'
              ? 'Your HD pack is ready 🎉'
              : status.status === 'error'
              ? 'We need to try again'
              : 'Payment received — creating your HD pack'}
          </h2>

          <p style={{ color: '#d1d5db', fontSize: 18, lineHeight: 1.5 }}>
            {status.message}
          </p>

          {status.status !== 'done' && status.status !== 'error' && (
            <>
              <div style={{
                height: 16,
                background: 'rgba(255,255,255,.12)',
                borderRadius: 999,
                overflow: 'hidden',
                margin: '26px 0 12px'
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
                  borderRadius: 999,
                  transition: 'width .4s ease'
                }} />
              </div>

              <p style={{ color: '#fbbf24', fontWeight: 900 }}>
                {status.completed > 0
                  ? `Image ${status.completed} of ${status.total} completed`
                  : 'Starting generation...'}
              </p>

              <p style={{ color: '#9ca3af' }}>
                This usually takes less than one minute. Please keep this page open.
              </p>

              {seconds > 20 && (
                <div style={{
                  marginTop: 20,
                  padding: 16,
                  borderRadius: 18,
                  background: 'rgba(251,191,36,.12)',
                  border: '1px solid rgba(251,191,36,.28)',
                  color: '#fde68a'
                }}>
                  Still working — your images are being created. Some scenes take a little longer, but you are not being charged again.
                </div>
              )}
            </>
          )}

          {status.status === 'done' && status.zipUrl && (
            <a href={status.zipUrl} style={{
              display: 'inline-flex',
              marginTop: 18,
              padding: '16px 26px',
              borderRadius: 999,
              background: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
              color: '#111827',
              fontWeight: 950,
              textDecoration: 'none'
            }}>
              Download your HD ZIP
            </a>
          )}

          {status.status === 'error' && (
            <>
              <p style={{ color: '#fecaca' }}>
                {status.error || 'The generation did not complete.'}
              </p>
              <button onClick={() => {
                setStarted(false);
                setSeconds(0);
                setTimeout(startGeneration, 50);
              }} style={{
                marginTop: 18,
                padding: '16px 26px',
                borderRadius: 999,
                border: 0,
                background: 'linear-gradient(135deg,#f59e0b,#fbbf24)',
                color: '#111827',
                fontWeight: 950,
                cursor: 'pointer'
              }}>
                Try again
              </button>
              <p style={{ color: '#9ca3af', marginTop: 16 }}>
                If this keeps happening, contact info@petlanda.com with your order number: {orderId}
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
