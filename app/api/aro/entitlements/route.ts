import {NextResponse} from 'next/server';
import {getSession} from '@/lib/supabase/server';
import {resolveRights,RIGHTS_BY_ASSET,hasRight} from '@/lib/aro/client';
export const runtime='nodejs';
export async function POST(req:Request){
  const session=await getSession();
  if(!session?.email)return NextResponse.json({error:'UNAUTHORIZED'},{status:401});
  let body:unknown;try{body=await req.json()}catch{return NextResponse.json({error:'INVALID_REQUEST'},{status:400})}
  const asset=(body && typeof body==='object' && 'assetId' in body)?String(body.assetId):'';
  const right=RIGHTS_BY_ASSET[asset];
  if(!right)return NextResponse.json({error:'INVALID_ASSET'},{status:400});
  try{const rights=await resolveRights(session.email);
    return NextResponse.json({hasAccess:hasRight(rights,right),assetId:asset},{headers:{'Cache-Control':'private, no-store'}});
  }catch{return NextResponse.json({error:'ARO_UNAVAILABLE'},{status:503})}
}
