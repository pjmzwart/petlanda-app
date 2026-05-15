
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { generatePetImage } from '@/lib/ai';
import { makeWatermarkedPreview } from '@/lib/watermark';
import { uploadPublicBlob } from '@/lib/blob';
export const runtime='nodejs';
export async function POST(req:NextRequest){
 try{
  const form=await req.formData(); const file=form.get('file') as File|null; const sceneId=(form.get('sceneId') as string)||'restaurant';
  if(!file)return NextResponse.json({error:'No file uploaded'},{status:400});
  const inputBuffer=Buffer.from(await file.arrayBuffer()); const inputMimeType=file.type||'image/jpeg'; const orderId=nanoid(12);
  const inputUrl=await uploadPublicBlob(`orders/${orderId}/input-${file.name||'pet.jpg'}`,inputBuffer,inputMimeType);
  const previewUrls:string[]=[];
  for(let i=0;i<3;i++){const generated=await generatePetImage({inputBuffer,inputMimeType,sceneId,index:i,preview:true});const watermarked=await makeWatermarkedPreview(generated);const url=await uploadPublicBlob(`orders/${orderId}/preview-${i+1}.jpg`,watermarked,'image/jpeg');previewUrls.push(url);}
  return NextResponse.json({orderId,inputUrl,sceneId,previewUrls});
 }catch(error:any){console.error(error);return NextResponse.json({error:error?.message||'Preview generation failed'},{status:500})}
}
