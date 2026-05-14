'use client';

import { useState } from 'react';

const styles = [
  { id: 'royal', name: 'Royal Pet', desc: 'Koninklijk portret' },
  { id: 'astronaut', name: 'Astronaut', desc: 'Ruimtepak en sterren' },
  { id: 'superhero', name: 'Superheld', desc: 'Cape en posterstijl' },
  { id: 'oilpainting', name: 'Klassiek schilderij', desc: 'Museumstijl' },
  { id: 'christmas', name: 'Kerstkaart', desc: 'Warm en feestelijk' }
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [styleId, setStyleId] = useState('royal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit() {
    if (!file) {
      setError('Upload eerst een foto van je huisdier.');
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
      setError(data.error ?? 'Er ging iets mis.');
      return;
    }

    window.location.href = `/checkout?orderId=${data.orderId}`;
  }

  return (
    <main style={{ maxWidth: 1050, margin: '0 auto', padding: 24 }}>
      <section style={{ textAlign: 'center', padding: '42px 0 26px' }}>
        <div style={{ fontSize: 46, fontWeight: 900, lineHeight: 1.05 }}>Maak AI kunst van je huisdier</div>
        <p style={{ fontSize: 19, opacity: 0.78 }}>Upload een foto, kies een stijl en ontvang 5 unieke voorbeelden met watermerk.</p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ background: 'white', borderRadius: 22, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2>1. Upload foto</h2>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            style={{ display: 'block', margin: '18px 0', fontSize: 16 }}
          />
          {file && <p>Gekozen: <strong>{file.name}</strong></p>}
          <p style={{ opacity: 0.7 }}>Tip: gebruik een scherpe foto waarop het gezicht van je hond of kat goed zichtbaar is.</p>
        </div>

        <div style={{ background: 'white', borderRadius: 22, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <h2>2. Kies stijl</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {styles.map((s) => (
              <label key={s.id} style={{ border: styleId === s.id ? '2px solid #2d221b' : '1px solid #ddd', borderRadius: 14, padding: 14, display: 'block' }}>
                <input type="radio" name="style" checked={styleId === s.id} onChange={() => setStyleId(s.id)} />{' '}
                <strong>{s.name}</strong><br />
                <span style={{ opacity: 0.7, marginLeft: 22 }}>{s.desc}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center', marginTop: 28 }}>
        {error && <p style={{ color: '#b00020' }}>{error}</p>}
        <button
          onClick={submit}
          disabled={loading}
          style={{ border: 0, borderRadius: 999, padding: '17px 30px', fontSize: 18, fontWeight: 800, background: '#2d221b', color: 'white' }}
        >
          {loading ? 'Beelden worden gemaakt...' : 'Genereer 5 previews'}
        </button>
        <p style={{ opacity: 0.7 }}>Na de preview betaal je via Mollie om de HD-bestanden te downloaden.</p>
      </section>
    </main>
  );
}
