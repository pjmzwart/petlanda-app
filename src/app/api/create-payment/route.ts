
import { NextRequest, NextResponse } from 'next/server';
import createMollieClient from '@mollie/api-client';
export const runtime='nodejs';
const PACKS:any={basic:{value:'7.99',description:'PetLanda Basic Pack - 5 HD images',images:5},premium:{value:'14.99',description:'PetLanda Premium Pack - 10 HD images',images:10}};
export async function POST(req:NextRequest){
 try{
  const {orderId,packageType,inputUrl,sceneId}=await req.json(); const pack=PACKS[packageType||'basic']||PACKS.basic;
  if(!process.env.MOLLIE_API_KEY)throw new Error('MOLLIE_API_KEY missing'); const baseUrl=process.env.NEXT_PUBLIC_BASE_URL||process.env.APP_URL; if(!baseUrl)throw new Error('NEXT_PUBLIC_BASE_URL missing');
  const mollie=createMollieClient({apiKey:process.env.MOLLIE_API_KEY});
  const payment=await mollie.payments.create({amount:{currency:'EUR',value:pack.value},description:pack.description,redirectUrl:`${baseUrl}/checkout?orderId=${orderId}&packageType=${packageType||'basic'}&inputUrl=${encodeURIComponent(inputUrl||'')}&sceneId=${sceneId||'restaurant'}&paid=1`,webhookUrl:`${baseUrl}/api/payment-status`,metadata:{orderId,packageType:packageType||'basic',images:pack.images}} as any);
  return NextResponse.json({checkoutUrl:payment.getCheckoutUrl()});
 }catch(error:any){console.error(error);return NextResponse.json({error:error?.message||'Mollie payment could not be created'},{status:500})}
}
