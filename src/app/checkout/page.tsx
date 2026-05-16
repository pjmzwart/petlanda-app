
'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type HdStatus = {
  status: 'idle' | 'working' | 'done' | 'error';
  total: number;
  completed: number;
  message: string;
  zipUrl?: string;
  error?: string;
};

function CheckoutContent() {
  const params = useSearchParams();

  const orderId = params.get('orderId') || '';
  const packageType = params.get('packageType') || 'basic';
  const inputUrl = params.get('inputUrl') || '';
  const sceneId = params.get('sceneId') || 'restaurant';

  const total = packageType === 'premium' ? 10 : 5;

  const [status, setStatus] = useState<HdStatus>({
    status: 'idle',
    total,
    completed: 0,
    message: 'Payment received. Starting your HD pack...'
  });

  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const progress = useMemo(() => {
    if (!status.total) return 5;
    return Math.max(5, Math.min(100, Math.round((status.completed / status.total) * 100)));
  }, [status.completed, status.total]);

  async function startGeneration() {
    if (!orderId || !inputUrl || started) return;

    setStarted(true);
    setSeconds(0);
    setImageUrls([]);

    setStatus({
      status: 'working',
      total,
      completed: 0,
      message: 'Payment received. Creating image 1 of ' + total + '...'
    });

    const urls: string[] = [];

    try {
      for (let i = 0; i < total; i++) {
        setStatus({
          status: 'working',
          total,
          completed: i,
          message: `Creating image ${i + 1} of ${total}...`
        });

        const res = await fetch('/api/create-hd-one', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, packageType, inputUrl, sceneId, index: i })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || `Image ${i + 1} failed.`);
        }

        urls.push(data.imageUrl);
        setImageUrls([...urls]);

        setStatus({
          status: 'working',
          total,
          completed: i + 1,
          message: `Image ${i + 1} of ${total} ready.`
        });
      }

      setStatus({
        status: 'working',
        total,
        completed: total,
        message: 'Packaging your ZIP download...'
      });

      const zipRes = await fetch('/api/create-zip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, packageType, sceneId, imageUrls: urls })
      });

      const zipData = await zipRes.json();

      if (!zipRes.ok) {
        throw new Error(zipData.error || 'ZIP creation failed.');
      }

      setStatus({
        status: 'done',
        total,
        completed: total,
        message: 'Your HD pack is ready!',
        zipUrl: zipData.zipUrl
      });
    } catch (error: any) {
      setStatus({
        status: 'error',
        total,
        completed: urls.length,
        message: 'Something went wrong while creating your HD pack.',
        error: error?.message || 'Unknown error'
      });
    }
  }

  useEffect(() => {
    startGeneration();
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
      <div style={{ maxWidth: 920, margin: '0 auto', paddingTop: 40 }}>
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
                  ? `${status.completed} of ${status.total} images completed`
                  : 'Starting generation...'}
              </p>

              <p style={{ color: '#9ca3af' }}>
                Images are created one by one to avoid timeouts. Please keep this page open.
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
                  Still working — your images are being created. You are not being charged again.
                </div>
              )}
            </>
          )}

          {imageUrls.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 12,
              marginTop: 24
            }}>
              {imageUrls.map((url, index) => (
                <img
                  key={url}
                  src={url}
                  alt={`HD image ${index + 1}`}
                  style={{ width: '100%', borderRadius: 16, border: '1px solid rgba(255,255,255,.14)' }}
                />
              ))}
            </div>
          )}

          {status.status === 'done' && status.zipUrl && (
            <a href={status.zipUrl} style={{
              display: 'inline-flex',
              marginTop: 24,
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
                setImageUrls([]);
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
