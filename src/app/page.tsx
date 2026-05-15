'use client';

import { useState } from 'react';
import { PET_STYLES } from '@/lib/styles';

const exampleScenes = [
  ['Luxury Restaurant', '🍷', 'Your pet at a candlelit dinner'],
  ['Astronaut', '🚀', 'Space suit on the moon'],
  ['King on Throne', '👑', 'Royal palace portrait'],
  ['Beach Vacation', '🏖️', 'Sunny tropical holiday'],
  ['Cozy Christmas', '🎄', 'Warm festive scene'],
  ['Superhero', '🦸', 'City rooftop hero poster'],
  ['Paris Café', '☕', 'French terrace charm'],
  ['Chef in Kitchen', '👨‍🍳', 'Funny gourmet chef'],
  ['Yacht Adventure', '🛥️', 'Luxury sea adventure'],
  ['Medieval Knight', '⚔️', 'Castle fantasy scene'],
  ['Business Meeting', '💼', 'Boardroom boss pet'],
  ['Wizard School', '🪄', 'Magical school scene']
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [styleId, setStyleId] = useState('luxury-restaurant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function selectFile(nextFile: File | null) {
    setFile(nextFile);
    setPreview(nextFile ? URL.createObjectURL(nextFile) : '');
  }

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
      setError(data.error ?? 'Preview generation failed. Please try again.');
      return;
    }

    if (data.previewUrl) {
      sessionStorage.setItem(`petlanda-preview-${data.orderId}`, data.previewUrl);
    }
    window.location.href = `/checkout?orderId=${data.orderId}`;
  }

  return (
    <main style={{ minHeight: '100vh', background: '#09111f', color: '#111827', fontFamily: 'Inter, Arial, sans-serif' }}>
      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 360px) 1fr', gap: 18, maxWidth: 1440, margin: '0 auto', padding: 18 }}>
        <aside style={{ background: 'linear-gradient(180deg, #0c1425, #121827)', color: 'white', borderRadius: 24, padding: 26, boxShadow: '0 24px 80px rgba(0,0,0,.35)', position: 'sticky', top: 18, alignSelf: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 48, height: 48, borderRadius: 15, background: 'linear-gradient(135deg,#ffd166,#ff9f1c)', display: 'grid', placeItems: 'center', fontSize: 28 }}>🐾</div>
            <div style={{ fontSize: 36, fontWeight: 950, letterSpacing: '-0.05em' }}>PetLanda</div>
          </div>
          <h1 style={{ margin: '18px 0 10px', fontSize: 24, lineHeight: 1.08, color: '#ffd166' }}>Place YOUR pet into magical scenes</h1>
          <p style={{ opacity: .82, lineHeight: 1.55, marginTop: 0 }}>Upload one photo. Choose a scene. PetLanda edits the same recognizable pet into a new world.</p>

          <div style={{ display: 'grid', gap: 9, margin: '22px 0' }}>
            {['Image-to-image scene transformation', 'Strong pet identity preservation', 'Simple prompts per scene', 'Watermarked preview first', 'Powered by fal.ai FLUX Kontext'].map((x) => (
              <div key={x} style={{ display: 'flex', gap: 9, alignItems: 'center', fontWeight: 750 }}><span>✅</span>{x}</div>
            ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 18, padding: 12 }}>
            <div style={{ textAlign: 'center', color: '#ffd166', fontWeight: 900, marginBottom: 10 }}>Example scenes</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {exampleScenes.map(([name, icon]) => (
                <div key={name} style={{ minHeight: 78, borderRadius: 14, display: 'grid', placeItems: 'center', textAlign: 'center', padding: 8, background: 'radial-gradient(circle at 30% 20%, rgba(255,209,102,.35), rgba(124,58,237,.14) 45%, rgba(0,0,0,.28))', border: '1px solid rgba(255,255,255,.12)' }}>
                  <div style={{ fontSize: 24 }}>{icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 900 }}>{name}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 18, background: 'rgba(255,209,102,.12)', borderRadius: 18, padding: 14, textAlign: 'center', fontWeight: 850 }}>
            Simple. Fun. Magical.<br />Your pet. Everywhere. 🐾
          </div>
        </aside>

        <section style={{ background: 'linear-gradient(135deg,#f8fbff,#fff7fb 55%,#f0fff6)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,.28)' }}>
          <nav style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', background: 'rgba(255,255,255,.72)', borderBottom: '1px solid rgba(15,23,42,.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 950 }}><span>🐾</span>PetLanda</div>
            <div style={{ display: 'flex', gap: 22, fontSize: 13, fontWeight: 800, opacity: .75 }}>
              <span>Home</span><span>How it works</span><span>Examples</span><span>Pricing</span>
            </div>
            <div style={{ background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', color: 'white', padding: '10px 15px', borderRadius: 10, fontWeight: 900 }}>My Creations</div>
          </nav>

          <div style={{ padding: 28 }}>
            <section style={{ textAlign: 'center', margin: '6px 0 24px' }}>
              <div style={{ display: 'inline-block', background: 'white', padding: '8px 13px', borderRadius: 999, fontWeight: 900, color: '#7c3aed', boxShadow: '0 8px 28px rgba(124,58,237,.12)' }}>Your pet in a new world ✨</div>
              <h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)', lineHeight: .94, letterSpacing: '-0.06em', margin: '14px 0 12px', fontWeight: 1000 }}>Create magical scenes<br />with your real pet</h2>
              <p style={{ maxWidth: 760, margin: '0 auto', fontSize: 18, lineHeight: 1.55, color: '#5b6472' }}>Choose a situation, not just a style. PetLanda aims to keep the face and personality of your pet recognizable while changing the world around them.</p>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.35fr)', gap: 18 }}>
              <div style={{ background: 'rgba(255,255,255,.88)', borderRadius: 22, padding: 22, border: '1px solid rgba(15,23,42,.08)', boxShadow: '0 18px 55px rgba(30,40,80,.08)' }}>
                <h3 style={{ marginTop: 0, fontSize: 22 }}>1. Upload your pet</h3>
                <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: 18, padding: 14, textAlign: 'center' }}>
                  {preview ? (
                    <img src={preview} alt="Selected pet" style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 14, display: 'block' }} />
                  ) : (
                    <div style={{ height: 220, display: 'grid', placeItems: 'center', color: '#64748b', fontWeight: 800 }}>Upload a clear pet photo</div>
                  )}
                  <label style={{ display: 'block', marginTop: 14, background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: 12, cursor: 'pointer', fontWeight: 850 }}>
                    📤 {file ? 'Change photo' : 'Choose photo'}
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => selectFile(e.target.files?.[0] ?? null)} style={{ display: 'none' }} />
                  </label>
                </div>
                {file && <p style={{ fontSize: 13, color: '#64748b' }}>Selected: <strong>{file.name}</strong></p>}
              </div>

              <div style={{ background: 'rgba(255,255,255,.88)', borderRadius: 22, padding: 22, border: '1px solid rgba(15,23,42,.08)', boxShadow: '0 18px 55px rgba(30,40,80,.08)' }}>
                <h3 style={{ marginTop: 0, fontSize: 22 }}>2. Choose a scene</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
                  {PET_STYLES.map((s: any) => (
                    <button key={s.id} onClick={() => setStyleId(s.id)} style={{ minHeight: 92, cursor: 'pointer', border: styleId === s.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0', borderRadius: 16, background: styleId === s.id ? '#f5f3ff' : 'white', boxShadow: styleId === s.id ? '0 12px 35px rgba(139,92,246,.18)' : 'none', padding: 12, textAlign: 'center' }}>
                      <div style={{ fontSize: 24 }}>{s.icon}</div>
                      <div style={{ fontWeight: 950, fontSize: 13 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: '#64748b', marginTop: 3 }}>{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: '1fr minmax(280px, 420px)', gap: 18, marginTop: 18 }}>
              <div style={{ background: 'rgba(255,255,255,.88)', borderRadius: 22, padding: 22, border: '1px solid rgba(15,23,42,.08)', boxShadow: '0 18px 55px rgba(30,40,80,.08)' }}>
                <h3 style={{ marginTop: 0, fontSize: 22 }}>3. Generate your preview</h3>
                <p style={{ color: '#64748b', lineHeight: 1.5 }}>Your free preview uses the selected scene and a visible watermark. Unlock HD to remove the watermark and generate the full pack.</p>
                {error && <p style={{ color: '#b00020', fontWeight: 900 }}>{error}</p>}
                <button onClick={submit} disabled={loading} style={{ width: '100%', border: 0, borderRadius: 14, padding: '17px 24px', fontSize: 17, fontWeight: 950, background: 'linear-gradient(135deg,#8b5cf6,#ec4899)', color: 'white', boxShadow: '0 16px 38px rgba(139,92,246,.30)', cursor: loading ? 'wait' : 'pointer' }}>
                  {loading ? 'Creating your scene...' : '✨ Create my free preview'}
                </button>
                <div style={{ marginTop: 10, textAlign: 'center', fontSize: 12, color: '#64748b', fontWeight: 700 }}>Premium generation credit is used</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,.88)', borderRadius: 22, padding: 22, border: '1px solid rgba(15,23,42,.08)', boxShadow: '0 18px 55px rgba(30,40,80,.08)' }}>
                <h3 style={{ marginTop: 0, fontSize: 18 }}>Choose package after preview</h3>
                <div style={{ display: 'grid', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 14 }}><strong>Basic</strong><span>5 HD images · €7.99</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f5f3ff', border: '2px solid #8b5cf6', borderRadius: 14, padding: 14 }}><strong>Premium</strong><span>10 HD images · €14.99</span></div>
                </div>
              </div>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 26, color: '#475569' }}>
              {['100% your pet', 'Magical scenes', 'High quality', 'Secure checkout'].map((x, i) => <div key={x} style={{ background: 'rgba(255,255,255,.58)', borderRadius: 18, padding: 16, textAlign: 'center', fontWeight: 900 }}><div style={{ fontSize: 22 }}>{['🐶','✨','🏆','🔒'][i]}</div>{x}</div>)}
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}
