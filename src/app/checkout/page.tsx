
'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId') ?? '';
  const [status, setStatus] = useState<'preview' | 'generating' | 'paid' | 'loading'>('loading');
  const [error, setError] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const fallbackPreviews = useMemo(() => [1, 2, 3].map((n) => `/api/preview/${orderId}/preview-${n}.jpg`), [orderId]);
  const visiblePreviews = previewUrls.length ? previewUrls : fallbackPreviews;

  useEffect(() => {
    if (!orderId) return;
    const storedMany = sessionStorage.getItem(`petlanda-previews-${orderId}`);
    const storedOne = sessionStorage.getItem(`petlanda-preview-${orderId}`);
    if (storedMany) {
      try { setPreviewUrls(JSON.parse(storedMany)); } catch {}
    } else if (storedOne) {
      setPreviewUrls([storedOne]);
    }
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
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0b1220 0%, #111827 50%, #1f1635 100%)', color: '#f8fafc' }}>
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '42px 22px 72px' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 34 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', display: 'grid', placeItems: 'center', fontSize: 25, boxShadow: '0 10px 28px rgba(251,191,36,.22)' }}>🐾</div>
          <div><div style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.03em' }}>PetLanda</div><div style={{ fontSize: 13, opacity: 0.68 }}>AI pet scene studio</div></div>
        </header>

        <section style={{ textAlign: 'center', padding: '14px 0 30px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.10)', borderRadius: 999, padding: '9px 15px', fontWeight: 900, marginBottom: 16, color: '#fbbf24' }}>Your 3 previews are ready</div>
          <h1 style={{ fontSize: 'clamp(38px, 6vw, 64px)', fontWeight: 950, lineHeight: 0.98, letterSpacing: '-0.055em', margin: 0 }}>
            Choose your favourite look.<br />Unlock your full HD pack.
          </h1>
          <p style={{ fontSize: 19, maxWidth: 820, margin: '20px auto 0', opacity: 0.76, lineHeight: 1.55 }}>
            These low-resolution previews show variation in scene, angle and mood. After payment, PetLanda creates 5 or 10 unique high-resolution images without watermark.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, maxWidth: 940, margin: '0 auto' }}>
          {visiblePreviews.map((src, index) => (
            <div key={index} style={{ background: 'rgba(255,255,255,.09)', borderRadius: 24, padding: 10, boxShadow: '0 18px 55px rgba(0,0,0,.28)', border: '1px solid rgba(255,255,255,.12)' }}>
              <img src={src} alt={`PetLanda preview ${index + 1}`} style={{ width: '100%', borderRadius: 18, display: 'block', background: '#fff', aspectRatio: '1/1', objectFit: 'cover' }} />
            </div>
          ))}
        </section>

        <section style={{ textAlign: 'center', marginTop: 30 }}>
          {error && <p style={{ color: '#fca5a5', fontWeight: 900, maxWidth: 780, margin: '0 auto 16px' }}>{error}</p>}
          {status === 'generating' ? (
            <div style={{ opacity: 0.8, fontWeight: 900 }}>Payment received. Your HD pack is being created. Please check again in a moment.</div>
          ) : status === 'paid' ? (
            <a href={`/api/download/${orderId}`} style={{ display: 'inline-block', borderRadius: 999, padding: '18px 34px', fontSize: 18, fontWeight: 900, background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', color: '#111827', textDecoration: 'none', boxShadow: '0 16px 38px rgba(251,191,36,.28)' }}>Download my HD ZIP</a>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, maxWidth: 780, margin: '0 auto' }}>
              <div style={{ background: 'rgba(255,255,255,.09)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 28, padding: 24, boxShadow: '0 16px 45px rgba(0,0,0,.22)' }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#fbbf24', marginBottom: 8 }}>Basic Pack</div>
                <div style={{ fontSize: 34, fontWeight: 950, marginBottom: 8 }}>€7.99</div>
                <p style={{ opacity: .75, lineHeight: 1.45, margin: '0 0 18px' }}>5 unique HD images, no watermark, delivered as a ZIP download.</p>
                <button onClick={() => pay('basic')} style={{ width: '100%', border: 0, borderRadius: 999, padding: '16px 22px', fontSize: 16, fontWeight: 900, background: 'linear-gradient(135deg,#7c3aed,#a855f7)', color: 'white', boxShadow: '0 16px 38px rgba(124,58,237,.32)' }}>Unlock 5 HD images</button>
              </div>
              <div style={{ position: 'relative', background: 'rgba(255,255,255,.12)', border: '2px solid rgba(251,191,36,.45)', borderRadius: 28, padding: 24, boxShadow: '0 20px 55px rgba(251,191,36,.14)' }}>
                <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: '#fbbf24', color: '#111827', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 900 }}>Most popular</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#fbbf24', marginBottom: 8 }}>Premium Pack</div>
                <div style={{ fontSize: 34, fontWeight: 950, marginBottom: 8 }}>€14.99</div>
                <p style={{ opacity: .75, lineHeight: 1.45, margin: '0 0 18px' }}>10 unique HD images with more variation, wallpaper-friendly compositions and print-ready detail.</p>
                <button onClick={() => pay('premium')} style={{ width: '100%', border: 0, borderRadius: 999, padding: '16px 22px', fontSize: 16, fontWeight: 900, background: 'linear-gradient(135deg,#f59e0b,#fbbf24)', color: '#111827', boxShadow: '0 16px 38px rgba(251,191,36,.28)' }}>Unlock Premium Pack</button>
              </div>
            </div>
          )}
          <div style={{ marginTop: 14 }}><button onClick={checkStatus} style={{ background: 'transparent', border: 0, textDecoration: 'underline', opacity: 0.65, color: '#f8fafc' }}>Check status</button></div>
        </section>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return <Suspense fallback={<main style={{ padding: 24 }}>Loading...</main>}><CheckoutContent /></Suspense>;
}
