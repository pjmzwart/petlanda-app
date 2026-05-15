
import sharp from 'sharp';
export async function makeWatermarkedPreview(inputBuffer:Buffer, watermarkText='PETLANDA PREVIEW'){
 const resized=await sharp(inputBuffer).resize({width:640,withoutEnlargement:true}).jpeg({quality:62}).toBuffer();
 const meta=await sharp(resized).metadata(); const width=meta.width??640; const height=meta.height??640;
 const svg=`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="wm" width="360" height="190" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)"><text x="0" y="95" font-family="Arial" font-size="34" font-weight="900" fill="rgba(255,255,255,0.36)" stroke="rgba(0,0,0,0.30)" stroke-width="1">${watermarkText}</text></pattern></defs><rect width="100%" height="100%" fill="url(#wm)"/><rect x="0" y="${height-48}" width="${width}" height="48" fill="rgba(255,255,255,0.72)"/><text x="${width/2}" y="${height-18}" text-anchor="middle" font-family="Arial" font-size="18" font-weight="900" fill="rgba(20,20,30,0.75)">${watermarkText}</text></svg>`;
 return sharp(resized).composite([{input:Buffer.from(svg),gravity:'center'}]).jpeg({quality:70}).toBuffer();
}
