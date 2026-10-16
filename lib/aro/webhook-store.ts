import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Durable, idempotent receipt of a *verified* ARO notification.
 * ARO remains the only source of financial and entitlement truth.
 * Minimal metadata; no payer or raw event data persisted.
 */
export async function recordAroWebhook(input:{
  eventId:string; project:string; type:string; eventCreatedAt:string;
}):Promise<'new'|'duplicate'> {
  const url=process.env.ARO_WEBHOOK_DB_URL;
  const key=process.env.ARO_WEBHOOK_DB_SERVICE_KEY;
  if(!url||!key) throw new Error('ARO_WEBHOOK_STORAGE_NOT_CONFIGURED');
  const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {error}=await db.from('aro_webhook_events').insert({
    event_id:input.eventId,
    project_slug:input.project,
    event_type:input.type,
    event_created_at:input.eventCreatedAt
  });
  if(!error)return 'new';
  if(error.code==='23505')return 'duplicate';
  // Never return a success on DB outage or schema mismatch.
  throw new Error('ARO_WEBHOOK_STORAGE_UNAVAILABLE');
}
