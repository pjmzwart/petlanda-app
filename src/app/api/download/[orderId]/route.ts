
import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { generatePetImage } from '@/lib/ai';
export const runtime='nodejs';
export async function GET(req:NextRequest,{params}:{params:{orderId:string}}){
 try{
  const packageType=req.nextUrl.searchParams.get('packageType')||'basic'; const count=packageType==='premium'?10:5; const inputUrl=req.nextUrl.searchParams.get('inputUrl'); const sceneId=req.nextUrl.searchParams.get('sceneId')||'restaurant';
  if(!inputUrl)return NextResponse.json({error:'Missing inputUrl'},{status:400});
  const inputRes=await fetch(inputUrl); const inputBuffer=Buffer.from(await inputRes.arrayBuffer()); const inputMimeType=inputRes.headers.get('content-type')||'image/jpeg';
  const zip=new JSZip(); for(let i=0;i<count;i++){const img=await generatePetImage({inputBuffer,inputMimeType,sceneId,index:i+10,preview:false});zip.file(`petlanda-${sceneId}-${i+1}.jpg`,img);}
  const zipBuffer=await zip.generateAsync({type:'nodebuffer'});
  return new NextResponse(zipBuffer,{headers:{'Content-Type':'application/zip','Content-Disposition':`attachment; filename="petlanda-${packageType}-${params.orderId}.zip"`}});
 }catch(error:any){console.error(error);return NextResponse.json({error:error?.message||'Download generation failed'},{status:500})}
}
