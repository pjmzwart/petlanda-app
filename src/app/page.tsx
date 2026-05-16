
'use client';

import { useRef, useState } from 'react';
import { scenes } from '@/lib/scenes';

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [sceneId, setSceneId] = useState('restaurant');
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [orderId, setOrderId] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [error, setError] = useState('');

  function chooseFile() {
    fileInputRef.current?.click();
  }

  function onFileChange(nextFile: File | null) {
    setFile(nextFile);
    setPreviews([]);
    setOrderId('');
    setInputUrl('');
    setError('');
  }

  function clearPhoto() {
    setFile(null);
    setPreviews([]);
    setOrderId('');
    setInputUrl('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function clearPreviewsOnly() {
    setPreviews([]);
    setOrderId('');
    setInputUrl('');
    setError('');
  }

  async function generate() {
    if (!file) {
      setError('Please upload a pet photo first.');
      return;
    }

    setLoading(true);
    setError('');
    setPreviews([]);
    setOrderId('');
    setInputUrl('');

    const fd = new FormData();
    fd.append('file', file);
    fd.append('sceneId', sceneId);

    try {
      const res = await fetch('/api/generate', { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Preview generation failed.');
        return;
      }

      setPreviews(data.previewUrls || []);
      setOrderId(data.orderId || '');
      setInputUrl(data.inputUrl || '');
    } catch (err: any) {
      setError(err?.message || 'Preview generation failed.');
    } finally {
      setLoading(false);
    }
  }

  async function pay(packageType: 'basic' | 'premium') {
    if (!orderId || !inputUrl) {
      setError('Please create previews first.');
      return;
    }

    const res = await fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, packageType, inputUrl, sceneId })
    });

    const data = await res.json();

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      setError(data.error || 'Payment could not be created.');
    }
  }

  return (
    <main className="page">
      <div className="wrap">
        <header className="header">
          <div className="brand"><div className="logo">🐾</div>PetLanda</div>
          <a className="btn gold" href="#create">Create Pet Art</a>
        </header>

        <section className="hero">
          <h1>Place your pet into magical scenes</h1>
          <p>Upload your real pet and create 3 low-resolution previews. Unlock 5 or 10 unique HD images after payment.</p>
        </section>

        <section className="grid2" id="create">
          <div className="panel">
            <h2>1. Upload your pet</h2>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => onFileChange(e.target.files?.[0] || null)}
            />

            <div className="uploadbox" onClick={chooseFile} style={{ cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: 42, marginBottom: 12 }}>📸</div>
                <p>{file ? file.name : 'Click here to choose a clear photo of your pet'}</p>
                <button type="button" className="btn" onClick={(e) => { e.stopPropagation(); chooseFile(); }}>
                  {file ? 'Choose another photo' : 'Choose photo'}
                </button>
              </div>
            </div>

            {file && (
              <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button type="button" className="btn" onClick={generate} disabled={loading}>
                  {loading ? 'Creating previews...' : previews.length ? 'Create new previews with same photo' : 'Create previews'}
                </button>
                <button type="button" className="btn" onClick={clearPhoto} disabled={loading}>
                  Remove photo
                </button>
              </div>
            )}
          </div>

          <div className="panel">
            <h2>2. Choose a scene</h2>
            <div className="scenes">
              {scenes.map((s) => (
                <button
                  key={s.id}
                  className={`scene ${sceneId === s.id ? 'active' : ''}`}
                  onClick={() => {
                    setSceneId(s.id);
                    clearPreviewsOnly();
                  }}
                  disabled={loading}
                >
                  <div className="scene-img" style={{ background: s.sampleBg }}>{s.sampleAnimal}</div>
                  <div className="scene-body">
                    <div className="scene-title">{s.emoji} {s.title}</div>
                    <div className="scene-sub">{s.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="panel" style={{ marginTop: 22, textAlign: 'center' }}>
          <h2>3. Create 3 free previews</h2>
          <p className="small">Try multiple scenes with the same pet photo. No page refresh needed.</p>

          {error && <div className="error">{error}</div>}

          <button className="btn gold" onClick={generate} disabled={loading || !file}>
            {loading ? 'Creating previews...' : previews.length ? 'Generate again' : 'Create my free previews'}
          </button>

          {loading && (
            <p className="small" style={{ marginTop: 14 }}>
              Creating your previews. This can take a short moment. Please keep this page open.
            </p>
          )}

          {previews.length > 0 && (
            <>
              <div className="preview-grid">
                {previews.map((p, i) => <img key={i} src={p} alt={`Preview ${i + 1}`} />)}
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
                <button className="btn" onClick={generate} disabled={loading}>
                  Try again with same photo
                </button>
                <button className="btn" onClick={clearPreviewsOnly} disabled={loading}>
                  Choose another scene
                </button>
                <button className="btn" onClick={chooseFile} disabled={loading}>
                  Upload different pet
                </button>
              </div>

              <h2>Unlock your full HD pack</h2>
              <div className="packs">
                <div className="pack">
                  <h3>Basic Pack</h3>
                  <div className="price">€7.99</div>
                  <p>5 unique HD images without watermark.</p>
                  <button className="btn" onClick={() => pay('basic')}>Unlock 5 HD images</button>
                </div>
                <div className="pack">
                  <h3>Premium Pack</h3>
                  <div className="price">€14.99</div>
                  <p>10 unique HD images with more variation.</p>
                  <button className="btn gold" onClick={() => pay('premium')}>Unlock 10 HD images</button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
