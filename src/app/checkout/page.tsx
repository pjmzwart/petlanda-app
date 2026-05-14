'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
  const params = useSearchParams();
  const orderId = params.get('orderId') ?? '';
  const [status, setStatus] = useState<'preview' | 'generating' | 'paid' | 'loading'>('loading');
  const [error, setError] = useState('');

  const previews = useMemo(() => [`/api/preview/${orderId}/preview-1.jpg`], [orderId]);

  async function checkStatus() {
    if (!orderId) return;
    const res = await fetch(`/api/payment-status?orderId=${orderId}`);
    const data = await res.json();
    setStatus(data.status === 'paid' ? 'paid' : data.status === 'generating' ? 'generating' : 'preview');
  }

  useEffect(() => { checkStatus(); }, [orderId]);

  async function pay() {
    setError('');
    const res = await fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Betaling starten mislukt.');
      return;
    }
    window.location.href = data.checkoutUrl;
  }

  if (!orderId) return <main style={{ padding: 24 }}>Geen order gevonden.</main>;

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
      <section style={{ textAlign: 'center', padding: '30px 0' }}>
        <h1 style={{ fontSize: 40, marginBottom: 8 }}>Je voorbeelden zijn klaar</h1>
        <p style={{ opacity: 0.75 }}>Bekijk je gratis preview met watermerk. Na betaling worden 5 HD-afbeeldingen gemaakt en kun je ze als ZIP downloaden.</p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
        {previews.map((src, i) => (
          <div key={src} style={{ background: 'white', borderRadius: 18, padding: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
            <img src={src} alt={`Preview ${i + 1}`} style={{ width: '100%', borderRadius: 14, display: 'block' }} />
          </div>
        ))}
      </section>

      <section style={{ textAlign: 'center', marginTop: 28 }}>
        {error && <p style={{ color: '#b00020' }}>{error}</p>}
        {status === 'generating' ? (
          <div style={{ opacity: 0.8, fontWeight: 700 }}>Je betaling is ontvangen. Het HD-pakket wordt gemaakt. Klik zo op status controleren.</div>
        ) : status === 'paid' ? (
          <a href={`/api/download/${orderId}`} style={{ display: 'inline-block', borderRadius: 999, padding: '17px 30px', fontSize: 18, fontWeight: 800, background: '#2d221b', color: 'white', textDecoration: 'none' }}>
            Download HD ZIP
          </a>
        ) : (
          <button onClick={pay} style={{ border: 0, borderRadius: 999, padding: '17px 30px', fontSize: 18, fontWeight: 800, background: '#2d221b', color: 'white' }}>
            Betaal en maak 5 HD-afbeeldingen
          </button>
        )}
        <div style={{ marginTop: 14 }}>
          <button onClick={checkStatus} style={{ background: 'transparent', border: 0, textDecoration: 'underline', opacity: 0.7 }}>
            Controleer status
          </button>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<main style={{ padding: 24 }}>Laden...</main>}>
      <CheckoutContent />
    </Suspense>
  );
}
