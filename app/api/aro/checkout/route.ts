import {NextResponse,type NextRequest} from 'next/server';
import {ARO_OFFERS,createAroCheckout} from '@/lib/aro/client';
export const runtime='nodejs';
export async function POST(req:NextRequest){
 if(process.env.ARO_CHECKOUT_ENABLED!=='true')return NextResponse.json({error:'CHECKOUT_NOT_RELEASED'},{status:503});
 const apiUrl=process.env.ARO_API_URL,project=process.env.ARO_PROJECT_SLUG,publicKey=process.env.ARO_PUBLIC_KEY;
 if(!apiUrl||!project||!publicKey)return NextResponse.json({error:'ARO_NOT_CONFIGURED'},{status:503});
 const body=await req.json().catch(()=>null) as Record<string,unknown>|null;
 const payer=body?.payer as Record<string,unknown>|undefined,key=req.headers.get('idempotency-key'),offer=body?.offer;
 if(!key||!/^[a-zA-Z\d-]{16,128}$/.test(key)||typeof offer!=='string'||!ARO_OFFERS.some(o=>o===offer)||!payer||typeof payer.name!=='string'||payer.name.trim().length<2||payer.name.length>160||typeof payer.email!=='string'||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payer.email)||!['PIX','CARD'].includes(String(body?.payment_method)))return NextResponse.json({error:'INVALID_CHECKOUT_INPUT'},{status:400});
 const a:Record<string,string>={},params=body?.attribution as Record<string,unknown>|undefined;
 for(const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','referrer'])if(typeof params?.[k]==='string')a[k]=(params[k] as string).slice(0,k==='referrer'?512:128);
 try{
  const result=await createAroCheckout({apiUrl,project,publicKey,offer:offer as typeof ARO_OFFERS[number],idempotencyKey:key,paymentMethod:body?.payment_method as 'PIX'|'CARD',payer:{name:payer.name.trim(),email:payer.email.trim().toLowerCase(),...(typeof payer.document==='string'&&payer.document.trim()?{document:payer.document.trim()}: {})},attribution:a});
  return NextResponse.json(result,{status:201,headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'ARO_CHECKOUT_UNAVAILABLE'},{status:502});}
}
