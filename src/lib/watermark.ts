
import sharp from 'sharp';

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function makeWatermarkedPreview(inputBuffer: Buffer, watermarkText = 'PETLANDA PREVIEW') {
  const resized = await sharp(inputBuffer)
    .resize({ width: 720, height: 720, fit: 'cover' })
    .jpeg({ quality: 58 })
    .toBuffer();

  const meta = await sharp(resized).metadata();
  const width = meta.width ?? 720;
  const height = meta.height ?? 720;
  const safeText = escapeXml(watermarkText);

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="wm" width="390" height="180" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
        <text x="-10" y="95" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900"
          fill="rgba(255,255,255,0.36)" stroke="rgba(20,20,20,0.34)" stroke-width="1.5">
          ${safeText}
        </text>
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#wm)"/>

    <g transform="rotate(-28 ${width / 2} ${height / 2})">
      <rect x="${width * 0.08}" y="${height * 0.44}" width="${width * 0.84}" height="${height * 0.12}" rx="18"
        fill="rgba(0,0,0,0.20)"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(38, Math.round(width / 11))}"
        font-weight="900" fill="rgba(255,255,255,0.82)" stroke="rgba(0,0,0,0.55)" stroke-width="3">
        ${safeText}
      </text>
    </g>

    <rect x="0" y="${height - 64}" width="${width}" height="64" fill="rgba(255,255,255,0.78)"/>
    <text x="50%" y="${height - 32}" text-anchor="middle" dominant-baseline="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="900" fill="rgba(30,25,40,0.92)">
      ${safeText} • unlock HD to remove watermark
    </text>
  </svg>`;

  return sharp(resized)
    .composite([{ input: Buffer.from(svg), gravity: 'center' }])
    .jpeg({ quality: 62 })
    .toBuffer();
}
