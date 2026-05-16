
import { fal } from '@fal-ai/client';
import { buildPrompt } from './scenes';
fal.config({credentials:process.env.FAL_KEY||process.env.OPENAI_API_KEY||''});
function dataUriFromBuffer(buffer:Buffer,mime='image/jpeg'){return `data:${mime};base64,${buffer.toString('base64')}`}
function extractImageUrl(result:any):string{const c=[result?.data?.images?.[0]?.url,result?.images?.[0]?.url,result?.data?.image?.url,result?.image?.url,result?.url];const f=c.find(Boolean);if(!f)throw new Error('No image URL returned from fal.ai');return f}
export async function generatePetImage(params:{inputBuffer:Buffer;inputMimeType?:string;sceneId:string;index?:number;preview?:boolean;}){
 if(!process.env.FAL_KEY&&!process.env.OPENAI_API_KEY)throw new Error('FAL_KEY missing');
 const prompt=buildPrompt(params.sceneId,params.index||0);
 const result:any=await fal.subscribe('fal-ai/flux-pro/kontext',{input:{image_url:dataUriFromBuffer(params.inputBuffer,params.inputMimeType||'image/jpeg'),prompt,output_format:'jpeg',aspect_ratio:'1:1',guidance_scale:params.preview?4.8:4.2,num_inference_steps:params.preview?12:30,safety_tolerance:'2'} as any,logs:false} as any);
 const url=extractImageUrl(result); const res=await fetch(url); if(!res.ok)throw new Error('Could not fetch generated image'); return Buffer.from(await res.arrayBuffer());
}
