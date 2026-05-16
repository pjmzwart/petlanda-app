import sharp from 'sharp';

export async function makeWatermarkedPreview(
  inputBuffer: Buffer,
  watermarkText = 'PETLANDA'
) {
  const resized = await sharp(inputBuffer)
    .resize({ width: 640, withoutEnlargement: true })
    .jpeg({ quality: 62 })
    .toBuffer();

  const meta = await sharp(resized).metadata();
  const width = meta.width ?? 640;
  const height = meta.height ?? 640;

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        id="wm"
        width="240"
        height="140"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(-24)"
      >
        <text
          x="0"
          y="80"
          font-family="Arial"
          font-size="30"
          font-weight="900"
          fill="rgba(255,255,255,0.28)"
          stroke="rgba(0,0,0,0.22)"
          stroke-width="1"
        >
          ✦ ${watermarkText}
        </text>
      </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#wm)" />
  </svg>`;

  return sharp(resized)
    .composite([{ input: Buffer.from(svg), gravity: 'center' }])
    .jpeg({ quality: 70 })
    .toBuffer();
}
