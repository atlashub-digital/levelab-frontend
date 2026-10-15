import {NextResponse} from 'next/server';
import {verifyWebhook} from '@/lib/aro/client';
export const runtime='nodejs';
export async function POST(req:Request){
  // Fail closed until durable event-id deduplication is configured in deployment.
  // Never activate a paid entitlement based on webhook body.
  const secret=process.env.ARO_WEBHOOK_SECRET;
  const stamp=req.headers.get('X-ARO-Timestamp')??'';
  const signature=req.headers.get('X-ARO-Signature')??'';
  const eventId=req.headers.get('X-ARO-Event-Id')??'';
  if(!secret || !eventId)return NextResponse.json({error:'NOT_CONFIGURED'},{status:503});
  const raw=await req.text();
  if(raw.length>65536 || !verifyWebhook(raw,stamp,signature,secret))
    return NextResponse.json({error:'UNAUTHORIZED'},{status:401});
  let event:unknown;
  try{event=JSON.parse(raw)}catch{return NextResponse.json({error:'INVALID_REQUEST'},{status:400})}
  const obj=event as Record<string,unknown>;
  if(obj.id!==eventId || obj.project!==process.env.ARO_PROJECT_SLUG || typeof obj.type!=='string')
    return NextResponse.json({error:'INVALID_EVENT'},{status:400});
  // No enqueue before persistent event table is installed.
  return NextResponse.json({error:'WEBHOOK_STORAGE_NOT_CONFIGURED'},{status:503});
}
