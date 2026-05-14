import sharp from 'sharp';

export async function makeWatermarkedPreview(inputBuffer: Buffer, watermarkText = 'PETLANDA PREVIEW') {
  const resized = await sharp(inputBuffer)
    .resize({ width: 900, withoutEnlargement: true })
    .jpeg({ quality: 72 })
    .toBuffer();

  const meta = await sharp(resized).metadata();
  const width = meta.width ?? 900;
  const height = meta.height ?? 900;
  const fontSize = Math.max(28, Math.round(width / 10));

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="transparent"/>
    <g transform="rotate(-28 ${width / 2} ${height / 2})">
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}"
        font-weight="900" fill="rgba(255,255,255,0.58)" stroke="rgba(60,35,50,0.28)" stroke-width="2">
        ${watermarkText}
      </text>
    </g>
  </svg>`;

  return sharp(resized)
    .composite([{ input: Buffer.from(svg), gravity: 'center' }])
    .jpeg({ quality: 72 })
    .toBuffer();
}
