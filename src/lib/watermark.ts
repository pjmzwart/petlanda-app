import sharp from 'sharp';

function escapeXml(text: string) {
  return text.replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c] || c));
}

export async function makeWatermarkedPreview(inputBuffer: Buffer, watermarkText = '✦ PETLANDA ✦') {
  const resized = await sharp(inputBuffer)
    .resize({ width: 640, height: 640, fit: 'cover', withoutEnlargement: true })
    .modulate({ brightness: 1.14, saturation: 1.08 })
    .jpeg({ quality: 60, mozjpeg: true })
    .toBuffer();

  const meta = await sharp(resized).metadata();
  const width = meta.width ?? 640;
  const height = meta.height ?? 640;
  const text = escapeXml(watermarkText);

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="wm" width="210" height="118" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
        <text x="0" y="48" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="900"
          fill="rgba(255,255,255,0.48)" stroke="rgba(0,0,0,0.55)" stroke-width="1.2">${text}</text>
        <text x="55" y="104" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="900"
          fill="rgba(255,255,255,0.36)" stroke="rgba(0,0,0,0.50)" stroke-width="1">PETLANDA</text>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wm)"/>
    <rect x="0" y="0" width="100%" height="100%" fill="rgba(255,255,255,0.02)"/>
  </svg>`;

  return sharp(resized)
    .composite([{ input: Buffer.from(svg), gravity: 'center' }])
    .jpeg({ quality: 64, mozjpeg: true })
    .toBuffer();
}
