import { NextResponse } from 'next/server';
import { checkoutEnabled,createCheckout } from '@/lib/aro/client';
export const runtime='nodejs';
const offers=new Set(['levelab-forca-na-caneta-br','levelab-corpo-forte-br']);
export async function POST(req:Request) {
  if (!checkoutEnabled()) return NextResponse.json({error:'CHECKOUT_NOT_READY'},{status:503});
  let payload:unknown;
  try { payload=await req.json(); } catch {return NextResponse.json({error:'INVALID_REQUEST'},{status:400});}
  if(!payload || typeof payload!=='object') return NextResponse.json({error:'INVALID_REQUEST'},{status:400});
  const p=payload as Record<string,unknown>;
  const payer=p.payer as Record<string,unknown> | undefined;
  const key=req.headers.get('Idempotency-Key')??'';
  if(!offers.has(String(p.offer)) || !/^[\x20-\x7e]{16,128}$/.test(key)
    || typeof payer?.name!=='string' || payer.name.length<2 || typeof payer.email!=='string'
    || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payer.email)) {
    return NextResponse.json({error:'INVALID_REQUEST'},{status:400});
  }
  try {
    const checkout=await createCheckout({offer:String(p.offer),payer:{name:payer.name,email:payer.email},idempotencyKey:key});
    return NextResponse.json(checkout,{status:201,headers:{'Cache-Control':'no-store'}});
  }catch{
    return NextResponse.json({error:'ARO_UNAVAILABLE'},{status:503});
  }
}
