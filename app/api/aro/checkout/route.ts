import { NextResponse } from 'next/server';
import { checkoutEnabled,createCheckout } from '@/lib/aro/client';

/**
 * Controlled-test gate (mission P0 2026-10-26): when
 * ARO_CHECKOUT_ALLOWED_EMAILS is set, ONLY those identities may create a
 * checkout — the purchase stays closed to the general public until the
 * direction authorizes commercial opening.
 */
function allowedEmail(email:string):boolean{
  const list=(process.env.ARO_CHECKOUT_ALLOWED_EMAILS??'').split(',').map(v=>v.trim().toLowerCase()).filter(Boolean);
  return list.length===0 || list.includes(email.toLowerCase());
}
export const runtime='nodejs';
// Força na Caneta is NOT published (editorial review) — do not re-add without direction.
const offers=new Set(['levelab-corpo-forte-br']);
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
  if(!allowedEmail(String(payer.email))){
    return NextResponse.json({error:'CHECKOUT_NOT_AVAILABLE_FOR_ACCOUNT'},{status:403});
  }
  const cpf=typeof payer.cpf==='string'?payer.cpf.replace(/\D/g,''):'';
  if(cpf.length!==11 || /^([0-9])\1+$/.test(cpf)){
    return NextResponse.json({error:'INVALID_CPF'},{status:400});
  }
  try {
    const checkout=await createCheckout({offer:String(p.offer),payer:{name:payer.name,email:payer.email,cpf},idempotencyKey:key});
    return NextResponse.json(checkout,{status:201,headers:{'Cache-Control':'no-store'}});
  }catch{
    return NextResponse.json({error:'ARO_UNAVAILABLE'},{status:503});
  }
}
