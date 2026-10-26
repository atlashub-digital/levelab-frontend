import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';

export const ARO_STATES = ['CREATED','PENDING','APPROVED','FAILED','CANCELED','EXPIRED','REFUNDED','CHARGEBACK'] as const;
export type AroState = (typeof ARO_STATES)[number];
export type AroCheckout = {
  id: string; order_id: string; project: string; offer: string; state: AroState;
  amount: { amount_minor: number; currency: string };
  checkout_secret: string;
  payment?: { kind: 'PIX'; copy_paste: string; qr_payload: string; expires_at: string }
    | { kind: 'CARD'; client_secret?: string; redirect_url?: string };
};
export type AroEvent = { id:string; type:string; created_at:string; project:string; data:Record<string,unknown> };

function config() {
  const api = process.env.ARO_API_URL;
  const project = process.env.ARO_PROJECT_SLUG;
  if (!api || !project) throw new Error('ARO_NOT_CONFIGURED');
  return { api: api.replace(/\/$/, ''), project };
}
export function checkoutEnabled() { return process.env.ARO_CHECKOUT_ENABLED === 'true'; }
export function aroProject() { return config().project; }
function secret(name: string) {
  const value = process.env[name];
  if (!value) throw new Error('ARO_NOT_CONFIGURED');
  return value;
}
async function parseJson<T>(r: Response): Promise<T> {
  if (!r.ok) throw new Error('ARO_UPSTREAM_' + r.status);
  return r.json() as Promise<T>;
}
export async function createCheckout(input: { offer:string; payer:{name:string;email:string;cpf:string}; idempotencyKey:string }):Promise<AroCheckout> {
  const c=config();
  return parseJson<AroCheckout>(await fetch(c.api+'/v1/checkout-sessions',{
    method:'POST',cache:'no-store',headers:{
      'Content-Type':'application/json','X-ARO-Public-Key':secret('ARO_PUBLIC_KEY'),
      'Idempotency-Key':input.idempotencyKey
    },body:JSON.stringify({project:c.project,offer:input.offer,market:'BR',country:'BR',
      currency:'BRL',payment_method:'PIX',payer:{name:input.payer.name,email:input.payer.email,document:input.payer.cpf}})
  }));
}
export async function readCheckout(id:string,checkoutSecret:string):Promise<AroCheckout>{
  const c=config();
  return parseJson<AroCheckout>(await fetch(c.api+'/v1/checkout-sessions/'+encodeURIComponent(id),{
    cache:'no-store',headers:{'X-ARO-Checkout-Secret':checkoutSecret}
  }));
}
export type AroRights = { project:string; entitlements:Array<{ key:string;status:'ACTIVE'|'REVOKED'|'EXPIRED';starts_at:string;expires_at?:string }> };
export async function resolveRights(email:string):Promise<AroRights>{
  const c=config();
  return parseJson<AroRights>(await fetch(c.api+'/v1/entitlements/resolve',{
    method:'POST',cache:'no-store',headers:{'Content-Type':'application/json',
      Authorization:'Bearer '+secret('ARO_SERVER_KEY')},
    body:JSON.stringify({project:c.project,identity:{email}})
  }));
}
export function verifyWebhook(raw:string,timestamp:string,signature:string,secretValue:string,now=Date.now()):boolean {
  if(!/^\d+$/.test(timestamp) || Math.abs(now/1000-Number(timestamp))>300) return false;
  const expected=createHmac('sha256',secretValue).update(timestamp+'.'+raw).digest();
  const hex=signature.split(',').map(v=>v.trim()).find(v=>v.startsWith('v1='))?.slice(3);
  if(!hex || !/^[0-9a-f]{64}$/i.test(hex)) return false;
  return timingSafeEqual(expected,Buffer.from(hex,'hex'));
}
export const RIGHTS_BY_ASSET:Record<string,string> = {
  'forca-na-caneta':'levelab:reader:forca-na-caneta',
  'corpo-forte-guia':'levelab:reader:corpo-forte',
  'corpo-forte-workbook':'levelab:reader:corpo-forte-workbook'
};
export function hasRight(rights:AroRights,key:string,now=Date.now()):boolean {
  return rights.entitlements.some(e=>e.key===key && e.status==='ACTIVE'
    && Date.parse(e.starts_at)<=now && (!e.expires_at || Date.parse(e.expires_at)>now));
}
