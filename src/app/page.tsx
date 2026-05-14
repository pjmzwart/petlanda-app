'use client';

import { useState } from 'react';
import { PET_STYLES } from '@/lib/styles';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [styleId, setStyleId] = useState('cartoon');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit() {
    if (!file) {
      setError('Please upload a photo of your pet first.');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('styleId', styleId);

    const res = await fetch('/api/generate', { method: 'POST', body: formData });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong.');
      return;
    }

    window.location.href = `/checkout?orderId=${data.orderId}`;
  }

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff1f5 0%, #eef7ff 45%, #f1fff6 100%)', color: '#2f2630' }}>
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '42px 22px 64px' }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 38 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, background: '#ffcad4', display: 'grid', placeItems: 'center', fontSize: 25, boxShadow: '0 10px 28px rgba(255,120,150,.22)' }}>🐾</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.03em' }}>PetLanda</div>
              <div style={{ fontSize: 13, opacity: 0.62 }}>AI pet art studio</div>
            </div>
          </div>
          <div style={{ fontWeight: 800, background: 'rgba(255,255,255,.68)', padding: '10px 14px', borderRadius: 999, boxShadow: '0 8px 24px rgba(30,40,80,.08)' }}>1 free preview</div>
        </header>

        <section style={{ textAlign: 'center', padding: '20px 0 34px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,.72)', borderRadius: 999, padding: '9px 15px', fontWeight: 800, marginBottom: 16, boxShadow: '0 8px 25px rgba(30,40,80,.08)' }}>Turn your pet photo into adorable AI art</div>
          <h1 style={{ fontSize: 'clamp(42px, 7vw, 78px)', fontWeight: 950, lineHeight: 0.95, letterSpacing: '-0.06em', margin: 0 }}>
            Create magical art<br />from your pet photo
          </h1>
          <p style={{ fontSize: 20, maxWidth: 760, margin: '22px auto 0', opacity: 0.74, lineHeight: 1.55 }}>
            Upload a dog or cat photo, choose a lovable style, and receive one watermarked preview. After payment, PetLanda creates your full 5-image HD download pack.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
          <div style={{ background: 'rgba(255,255,255,.82)', borderRadius: 30, padding: 26, boxShadow: '0 18px 55px rgba(80,60,90,.12)', border: '1px solid rgba(255,255,255,.9)' }}>
            <h2 style={{ marginTop: 0 }}>1. Upload your pet</h2>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              style={{ display: 'block', width: '100%', margin: '18px 0', fontSize: 16, background: '#fff', borderRadius: 16, padding: 14 }}
            />
            {file && <p>Selected: <strong>{file.name}</strong></p>}
            <p style={{ opacity: 0.68, lineHeight: 1.55 }}>Best results come from a clear, sharp photo where your pet’s face is easy to see.</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,.82)', borderRadius: 30, padding: 26, boxShadow: '0 18px 55px rgba(80,60,90,.12)', border: '1px solid rgba(255,255,255,.9)' }}>
            <h2 style={{ marginTop: 0 }}>2. Choose a style</h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {PET_STYLES.map((s) => (
                <label key={s.id} style={{ cursor: 'pointer', border: styleId === s.id ? '2px solid #ff8fab' : '1px solid rgba(80,70,90,.14)', background: styleId === s.id ? '#fff4f7' : '#fff', borderRadius: 18, padding: 14, display: 'block', transition: 'all .15s ease' }}>
                  <input type="radio" name="style" checked={styleId === s.id} onChange={() => setStyleId(s.id)} />{' '}
                  <strong>{s.name}</strong><br />
                  <span style={{ opacity: 0.68, marginLeft: 22 }}>{s.desc}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section style={{ textAlign: 'center', marginTop: 30 }}>
          {error && <p style={{ color: '#b00020', fontWeight: 800 }}>{error}</p>}
          <button
            onClick={submit}
            disabled={loading}
            style={{ border: 0, borderRadius: 999, padding: '18px 34px', fontSize: 18, fontWeight: 900, background: 'linear-gradient(135deg, #ff8fab, #8ec5ff)', color: 'white', boxShadow: '0 16px 38px rgba(255,143,171,.32)', cursor: loading ? 'wait' : 'pointer' }}
          >
            {loading ? 'Creating your preview...' : 'Create my free preview'}
          </button>
          <p style={{ opacity: 0.66, maxWidth: 650, margin: '16px auto 0', lineHeight: 1.5 }}>
            Free: 1 watermarked preview. After payment: 5 HD artworks generated with fal.ai and delivered as a ZIP download.
          </p>
        </section>
      </section>
    </main>
  );
}
