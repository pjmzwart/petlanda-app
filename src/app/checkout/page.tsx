
'use client';
import { useSearchParams } from 'next/navigation';
export default function Checkout(){const p=useSearchParams();const orderId=p.get('orderId')||'';const packageType=p.get('packageType')||'basic';const inputUrl=p.get('inputUrl')||'';const sceneId=p.get('sceneId')||'restaurant';const download=`/api/download/${orderId}?packageType=${packageType}&inputUrl=${encodeURIComponent(inputUrl)}&sceneId=${sceneId}`;return <main className="page"><div className="wrap"><header className="header"><div className="brand"><div className="logo">🐾</div>PetLanda</div></header><section className="hero"><h1>Payment received</h1><p>Your HD pack is ready. Click below to generate and download your ZIP.</p><a className="btn gold" href={download}>Generate & download HD ZIP</a></section></div></main>}
