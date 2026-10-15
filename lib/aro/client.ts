/** ARO V1 project-facing wire contract. No payment-provider dependencies. */
export const ARO_OFFERS=['guia-corpo-forte','guia-forca-na-caneta'] as const;
export type AroOffer=(typeof ARO_OFFERS)[number];
export type AroState='CREATED'|'PENDING'|'APPROVED'|'FAILED'|'CANCELED'|'EXPIRED'|'REFUNDED'|'CHARGEBACK';
export type AroSession={id:string;order_id:string;project:string;offer:string;state:AroState;amount:{amount_minor:number;currency:string};checkout_secret:string;payment?:{kind:'PIX';copy_paste:string;qr_payload:string;expires_at:string}|{kind:'CARD';client_secret?:string;redirect_url?:string}};
function base(url:string){if(!/^https:\/\//.test(url)&&!/^http:\/\/localhost(?::\d+)?$/.test(url))throw new Error('ARO_URL_INVALID');return url.replace(/\/$/,'');}
function verify(data:unknown,project:string,offer?:string):AroSession{
 if(!data||typeof data!=='object')throw new Error('ARO_BAD_SESSION');
 const s=data as Partial<AroSession>,states=['CREATED','PENDING','APPROVED','FAILED','CANCELED','EXPIRED','REFUNDED','CHARGEBACK'];
 if(s.project!==project||(offer&&s.offer!==offer)||typeof s.id!=='string'||typeof s.order_id!=='string'||typeof s.checkout_secret!=='string'||!states.includes(String(s.state))||!s.amount||!Number.isSafeInteger(s.amount.amount_minor)||s.amount.amount_minor<0||!/^[A-Z]{3}$/.test(s.amount.currency))throw new Error('ARO_BAD_SESSION');
 return s as AroSession;
}
export async function createAroCheckout(input:{apiUrl:string;project:string;publicKey:string;offer:AroOffer;payer:{name:string;email:string;document?:string};paymentMethod:'PIX'|'CARD';idempotencyKey:string;attribution?:Record<string,string>;fetchImpl?:typeof fetch}):Promise<AroSession>{
 const response=await(input.fetchImpl??fetch)(base(input.apiUrl)+'/v1/checkout-sessions',{method:'POST',headers:{'content-type':'application/json','X-ARO-Public-Key':input.publicKey,'Idempotency-Key':input.idempotencyKey},body:JSON.stringify({project:input.project,offer:input.offer,market:'BR',country:'BR',currency:'BRL',payment_method:input.paymentMethod,payer:{...input.payer,country:'BR'},...(input.attribution?{attribution:input.attribution}:{})}),signal:AbortSignal.timeout(10000),cache:'no-store'});
 if(!response.ok)throw new Error('ARO_CHECKOUT_UNAVAILABLE');
 return verify(await response.json(),input.project,input.offer);
}
export async function getAroStatus(input:{apiUrl:string;project:string;id:string;secret:string;fetchImpl?:typeof fetch}):Promise<Omit<AroSession,'checkout_secret'>>{
 const response=await(input.fetchImpl??fetch)(base(input.apiUrl)+'/v1/checkout-sessions/'+encodeURIComponent(input.id),{headers:{'X-ARO-Checkout-Secret':input.secret},cache:'no-store',signal:AbortSignal.timeout(10000)});
 if(!response.ok)throw new Error('ARO_STATUS_UNAVAILABLE');
 const session=verify(await response.json(),input.project);
 if(session.id!==input.id)throw new Error('ARO_MISMATCHED_SESSION');
 const {checkout_secret:_secret,...safe}=session;return safe;
}
