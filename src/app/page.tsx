'use client';

import { useState } from 'react';
import { PET_STYLES } from '@/lib/styles';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [styleId, setStyleId] = useState('luxury-restaurant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function selectFile(nextFile: File | null) {
    setFile(nextFile);
    setPreview(nextFile ? URL.createObjectURL(nextFile) : '');
  }

  async function submit() {
    if (!file) {
      setError('Please upload a clear photo of your pet first.');
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

    if (data.previewUrls) sessionStorage.setItem(`petlanda-previews-${data.orderId}`, JSON.stringify(data.previewUrls));
    if (data.previewUrl) sessionStorage.setItem(`petlanda-preview-${data.orderId}`, data.previewUrl);
    window.location.href = `/checkout?orderId=${data.orderId}`;
  }

  const selectedScene = PET_STYLES.find((s) => s.id === styleId) ?? PET_STYLES[0];
  const restaurantExamples = PET_STYLES.filter((s) => s.category === 'restaurant').slice(0, 6);
  const otherExamples = PET_STYLES.filter((s) => s.category !== 'restaurant').slice(0, 12);

  return (
    <main className="page-shell">
      <aside className="side-panel">
        <div className="brand"><div className="logo">🐾</div><div className="brand-text">PetLanda</div></div>
        <h1>Place YOUR pet into magical scenes</h1>
        <p className="lead">Upload one photo, choose a scene, and turn your real pet into a funny, beautiful or magical moment.</p>
        <div className="checks">
          <span>✅ Image-to-image scene transformation</span>
          <span>✅ Strong pet identity preservation</span>
          <span>✅ 5 or 10 unique HD photos after payment</span>
          <span>✅ Different settings, angles and compositions</span>
          <span>✅ Powered by fal.ai FLUX Kontext</span>
        </div>
        <div className="mini-gallery">
          <h2>Example scenes</h2>
          <div className="mini-grid">
            {PET_STYLES.slice(0, 12).map((scene) => (
              <button key={scene.id} className="mini-card" onClick={() => setStyleId(scene.id)}>
                <img src={scene.image} alt={scene.name} />
                <span>{scene.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="tagline">Simple. Fun. Magical.<br />Your pet. Everywhere. 🐾</div>
      </aside>

      <section className="app-panel">
        <nav className="topnav"><strong>🐾 PetLanda</strong><span>Home</span><span>Examples</span><span>Pricing</span><button>My Creations</button></nav>
        <section className="hero">
          <span className="pill">Your real pet in a new world ✨</span>
          <h2>Create magical scenes with your pet</h2>
          <p>Choose a situation, not just a filter. PetLanda keeps your pet recognizable while changing the world around them.</p>
        </section>

        <section className="workflow">
          <div className="card upload-card">
            <h3>1. Upload your pet</h3>
            <div className="upload-box">
              {preview ? <img src={preview} alt="Selected pet" /> : <div className="upload-placeholder">Upload a clear pet photo</div>}
              <label className="upload-button">📤 {file ? 'Change photo' : 'Choose photo'}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => selectFile(e.target.files?.[0] ?? null)} /></label>
            </div>
            {file && <p className="selected">Selected: <strong>{file.name}</strong></p>}
          </div>

          <div className="card scene-card">
            <h3>2. Choose a scene</h3>
            <div className="scene-grid">
              {PET_STYLES.map((scene) => (
                <button key={scene.id} onClick={() => setStyleId(scene.id)} className={styleId === scene.id ? 'scene selected-scene' : 'scene'}>
                  <img src={scene.image} alt={scene.name} />
                  <div className="scene-name"><span>{scene.icon}</span>{scene.name}</div>
                  <div className="scene-desc">{scene.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="generate-row">
          <div className="card generate-card">
            <h3>3. Generate 3 free previews</h3>
            <p>Your 3 previews use the selected scene: <strong>{selectedScene.name}</strong>. They include a visible watermark. Unlock HD to remove it and create your full unique pack.</p>
            {error && <p className="error">{error}</p>}
            <button className="primary" onClick={submit} disabled={loading}>{loading ? 'Creating your previews...' : '✨ ✨ Create 3 free previews'}</button>
            <small>Low-resolution preview generation credit is used for each preview.</small>
          </div>
          <div className="card packages">
            <h3>Choose package after preview</h3>
            <div><strong>Basic</strong><span>5 unique HD images · €7.99</span></div>
            <div className="premium"><strong>Premium</strong><span>10 unique HD images · €14.99</span></div>
            <p>No repeats: each paid image should vary the angle, setting, pose, mood or composition while keeping the same pet.</p>
          </div>
        </section>

        <section className="examples-section">
          <div className="section-title">🍽️ Restaurant variations</div>
          <div className="example-row">{restaurantExamples.map((scene) => <button key={scene.id} onClick={() => setStyleId(scene.id)}><img src={scene.image} alt={scene.name} /><span>{scene.name}</span></button>)}</div>
          <div className="section-title">✨ Other magical scene examples</div>
          <div className="example-row big">{otherExamples.map((scene) => <button key={scene.id} onClick={() => setStyleId(scene.id)}><img src={scene.image} alt={scene.name} /><span>{scene.name}</span></button>)}</div>
          <div className="how-it-works"><strong>5–10 HD photos, all different:</strong> different angle, different pose, different moment, different composition, different setting — always the same pet.</div>
        </section>
      </section>
    </main>
  );
}
