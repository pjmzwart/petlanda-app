import sharp from 'sharp';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function makeWatermarkedPreview(inputBuffer: Buffer, watermarkText = 'PETLANDA PREVIEW') {
  const resized = await sharp(inputBuffer)
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 72 })
    .toBuffer();

  const meta = await sharp(resized).metadata();
  const width = meta.width ?? 900;
  const height = meta.height ?? 900;
  const mainFontSize = Math.max(34, Math.round(width / 9));
  const smallFontSize = Math.max(18, Math.round(width / 28));
  const safeText = escapeXml(watermarkText);

  // Strong visible watermark: diagonal repeat + centered outline + bottom banner.
  // Designed to remain readable on both dark and light pet images.
  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="transparent"/>

    <g transform="rotate(-28 ${width / 2} ${height / 2})" opacity="0.82">
      <text x="50%" y="28%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${smallFontSize}"
        font-weight="900" fill="rgba(255,255,255,0.68)" stroke="rgba(45,26,18,0.55)" stroke-width="2">
        ${safeText} • ${safeText} • ${safeText}
      </text>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${mainFontSize}"
        font-weight="900" fill="rgba(255,255,255,0.78)" stroke="rgba(45,26,18,0.70)" stroke-width="3">
        ${safeText}
      </text>
      <text x="50%" y="72%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${smallFontSize}"
        font-weight="900" fill="rgba(255,255,255,0.68)" stroke="rgba(45,26,18,0.55)" stroke-width="2">
        ${safeText} • ${safeText} • ${safeText}
      </text>
    </g>

    <rect x="0" y="${height - 72}" width="${width}" height="72" fill="rgba(255,255,255,0.74)"/>
    <text x="50%" y="${height - 34}" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="${smallFontSize}"
      font-weight="900" fill="rgba(45,26,18,0.92)">
      ${safeText} • Unlock HD to remove watermark
    </text>
  </svg>`;

  return sharp(resized)
    .composite([{ input: Buffer.from(svg), gravity: 'center' }])
    .jpeg({ quality: 72 })
    .toBuffer();
}
