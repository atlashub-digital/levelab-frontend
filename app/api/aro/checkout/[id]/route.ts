import {NextResponse} from 'next/server';
import {checkoutEnabled,readCheckout} from '@/lib/aro/client';
export const runtime='nodejs';
export async function GET(req:Request,{params}:{params:Promise<{id:string}>}){
  if(!checkoutEnabled()) return NextResponse.json({error:'CHECKOUT_NOT_READY'},{status:503});
  const {id}=await params;
  if(!/^[0-9a-f-]{36}$/i.test(id))return NextResponse.json({error:'INVALID_REQUEST'},{status:400});
  const secret=req.headers.get('X-ARO-Checkout-Secret')??'';
  if(!secret)return NextResponse.json({error:'UNAUTHORIZED'},{status:401});
  try{return NextResponse.json(await readCheckout(id,secret),{headers:{'Cache-Control':'no-store'}});}
  catch{return NextResponse.json({error:'ARO_UNAVAILABLE'},{status:503});}
}
