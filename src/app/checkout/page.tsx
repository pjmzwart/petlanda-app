'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId') ?? '';
  const [status, setStatus] = useState<'preview' | 'generating' | 'paid' | 'loading'>('loading');
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const fallbackPreview = useMemo(() => `/api/preview/${orderId}/preview-1.jpg`, [orderId]);

  useEffect(() => {
    if (!orderId) return;
    const stored = sessionStorage.getItem(`petlanda-preview-${orderId}`);
    if (stored) setPreviewUrl(stored);
    checkStatus();
  }, [orderId]);

  async function checkStatus() {
    if (!orderId) return;
    const res = await fetch(`/api/payment-status?orderId=${orderId}`);
    const data = await res.json();
    setStatus(data.status === 'paid' ? 'paid' : data.status === 'generating' ? 'generating' : 'preview');
  }

  async function pay(packageType: 'basic' | 'premium') {
    setError('');
    const res = await fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, packageType })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Payment could not be started.');
      return;
    }
    window.location.href = data.checkoutUrl;
  }

  if (!orderId) return <main style={{ padding: 24 }}>No order found.</main>;

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff1f5 0%, #eef7ff 45%, #f1fff6 100%)', color: '#2f2630' }}>
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '42px 22px 72px' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 34 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: '#ffcad4', display: 'grid', placeItems: 'center', fontSize: 25, boxShadow: '0 10px 28px rgba(255,120,150,.22)' }}>🐾</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.03em' }}>PetLanda</div>
            <div style={{ fontSize: 13, opacity: 0.62 }}>AI pet art studio</div>
          </div>
        </header>

        <section style={{ textAlign: 'center', padding: '14px 0 30px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.72)', borderRadius: 999, padding: '9px 15px', fontWeight: 800, marginBottom: 16, boxShadow: '0 8px 25px rgba(30,40,80,.08)' }}>Your free preview is ready</div>
          <h1 style={{ fontSize: 'clamp(38px, 6vw, 64px)', fontWeight: 950, lineHeight: 0.98, letterSpacing: '-0.055em', margin: 0 }}>
            Love the look?<br />Unlock your HD pet art pack
          </h1>
          <p style={{ fontSize: 19, maxWidth: 760, margin: '20px auto 0', opacity: 0.74, lineHeight: 1.55 }}>
            View your watermarked preview below. Choose your package. After payment, PetLanda creates your high-resolution artwork pack and delivers it as a ZIP download.
          </p>
        </section>

        <section style={{ maxWidth: 560, margin: '0 auto', background: 'rgba(255,255,255,.84)', borderRadius: 30, padding: 18, boxShadow: '0 18px 55px rgba(80,60,90,.12)', border: '1px solid rgba(255,255,255,.9)' }}>
          <img
            src={previewUrl || fallbackPreview}
            alt="PetLanda watermarked preview"
            onError={() => { if (previewUrl) setPreviewUrl(''); }}
            style={{ width: '100%', borderRadius: 22, display: 'block', background: '#fff' }}
          />
        </section>

        <section style={{ textAlign: 'center', marginTop: 30 }}>
          {error && <p style={{ color: '#b00020', fontWeight: 800, maxWidth: 720, margin: '0 auto 16px' }}>{error}</p>}
          {status === 'generating' ? (
            <div style={{ opacity: 0.8, fontWeight: 800 }}>Payment received. Your HD pack is being created. Please check again in a moment.</div>
          ) : status === 'paid' ? (
            <a href={`/api/download/${orderId}`} style={{ display: 'inline-block', borderRadius: 999, padding: '18px 34px', fontSize: 18, fontWeight: 900, background: 'linear-gradient(135deg, #ff8fab, #8ec5ff)', color: 'white', textDecoration: 'none', boxShadow: '0 16px 38px rgba(255,143,171,.32)' }}>
              Download my HD ZIP
            </a>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, maxWidth: 760, margin: '0 auto' }}>
              <div style={{ background: 'rgba(255,255,255,.82)', border: '1px solid rgba(255,255,255,.9)', borderRadius: 28, padding: 24, boxShadow: '0 16px 45px rgba(80,60,90,.10)' }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#ff6f91', marginBottom: 8 }}>Basic Pack</div>
                <div style={{ fontSize: 34, fontWeight: 950, marginBottom: 8 }}>€7.99</div>
                <p style={{ opacity: .72, lineHeight: 1.45, margin: '0 0 18px' }}>5 HD AI artworks, no watermark, delivered as a ZIP download.</p>
                <button onClick={() => pay('basic')} style={{ width: '100%', border: 0, borderRadius: 999, padding: '16px 22px', fontSize: 16, fontWeight: 900, background: 'linear-gradient(135deg, #ff8fab, #8ec5ff)', color: 'white', boxShadow: '0 16px 38px rgba(255,143,171,.32)' }}>
                  Unlock 5 HD artworks
                </button>
              </div>

              <div style={{ position: 'relative', background: 'rgba(255,255,255,.92)', border: '2px solid rgba(255,143,171,.55)', borderRadius: 28, padding: 24, boxShadow: '0 20px 55px rgba(255,143,171,.18)' }}>
                <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: '#ff8fab', color: 'white', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 900 }}>Most popular</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#8a7dff', marginBottom: 8 }}>Premium Pack</div>
                <div style={{ fontSize: 34, fontWeight: 950, marginBottom: 8 }}>€14.99</div>
                <p style={{ opacity: .72, lineHeight: 1.45, margin: '0 0 18px' }}>10 HD artworks, extra polish, mobile wallpaper-friendly compositions and print-ready detail.</p>
                <button onClick={() => pay('premium')} style={{ width: '100%', border: 0, borderRadius: 999, padding: '16px 22px', fontSize: 16, fontWeight: 900, background: 'linear-gradient(135deg, #ff8fab, #8ec5ff)', color: 'white', boxShadow: '0 16px 38px rgba(255,143,171,.32)' }}>
                  Unlock Premium Pack
                </button>
              </div>
            </div>
          )}
          <div style={{ marginTop: 14 }}>
            <button onClick={checkStatus} style={{ background: 'transparent', border: 0, textDecoration: 'underline', opacity: 0.65 }}>
              Check status
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<main style={{ padding: 24 }}>Loading...</main>}>
      <CheckoutContent />
    </Suspense>
  );
}
