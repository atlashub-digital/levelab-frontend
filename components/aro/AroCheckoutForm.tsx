'use client';
import {useState} from 'react';
type Checkout={id:string;checkout_secret:string;state:string;amount:{amount_minor:number;currency:string};payment?:{kind:string;copy_paste?:string;qr_payload?:string;expires_at?:string;redirect_url?:string}};
export function AroCheckoutForm({offer}:{offer:string}){
 const [name,setName]=useState(''),[email,setEmail]=useState('');
 const [checkout,setCheckout]=useState<Checkout|null>(null);
 const [error,setError]=useState(''),[busy,setBusy]=useState(false);
 const [retryKey,setRetryKey]=useState<string|undefined>();
 async function start(e:React.FormEvent){e.preventDefault();setBusy(true);setError('');
  const key=retryKey??crypto.randomUUID();
  setRetryKey(key);
  try{
   const res=await fetch('/api/aro/checkout',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':key},body:JSON.stringify({offer,payer:{name,email}})});
   if(!res.ok)throw new Error('Checkout indisponível. Tente mais tarde.');
   const data=await res.json() as Checkout;setCheckout(data);
  }catch(e){setError(e instanceof Error?e.message:'Falha de checkout');}
  finally{setBusy(false);}
 }
 async function refresh(){
  if(!checkout)return;
  try{
   const r=await fetch('/api/aro/checkout/'+encodeURIComponent(checkout.id),{headers:{'X-ARO-Checkout-Secret':checkout.checkout_secret},cache:'no-store'});
   if(!r.ok)throw new Error('Não foi possível confirmar o estado.');
   setCheckout(await r.json());
  }catch(e){setError(e instanceof Error?e.message:'Consulta indisponível');}
 }
 if(!checkout)return <form onSubmit={start} className="grid gap-4 rounded-xl border p-6">
  <label>Nome<input className="mt-1 block w-full rounded border p-3" required minLength={2} maxLength={160} value={name} onChange={e=>setName(e.target.value)}/></label>
  <label>E-mail<input className="mt-1 block w-full rounded border p-3" required type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label>
  <button disabled={busy} className="rounded bg-emerald-950 p-3 text-white" type="submit">{busy?'Aguarde…':'Continuar para PIX seguro'}</button>
  {error&&<p role="alert">{error}</p>}
  <p className="text-xs">Pagamento processado pelo ARO. A compra só estará completa quando o direito de acesso for confirmado.</p>
 </form>;
 const pix=checkout.payment?.kind==='PIX';
 return <section className="grid gap-4 rounded-xl border p-6" aria-live="polite">
   <p className="text-lg font-semibold">Estado: {checkout.state}</p>
   <p>Valor: {new Intl.NumberFormat('pt-BR',{style:'currency',currency:checkout.amount.currency}).format(checkout.amount.amount_minor/100)}</p>
   {pix&&checkout.payment?.copy_paste && <><label htmlFor="pix">PIX copia e cola</label>
    <textarea id="pix" readOnly rows={4} className="w-full break-all rounded border p-2" value={checkout.payment.copy_paste}/>
    <button className="rounded border p-2" type="button" onClick={()=>navigator.clipboard.writeText(checkout.payment!.copy_paste!)}>Copiar PIX</button>
    <p className="text-xs">Validade: {checkout.payment.expires_at}</p></>}
   {checkout.payment?.kind==='CARD' && checkout.payment.redirect_url&&<a href={checkout.payment.redirect_url}>Continuar pagamento</a>}
   {checkout.state==='APPROVED'&&<p>Pagamento aprovado. Entre na sua conta para verificar o acesso; a autorização depende da consulta de entitlement ao ARO.</p>}
   {['FAILED','CANCELED','EXPIRED','REFUNDED','CHARGEBACK'].includes(checkout.state)&&<p>Este pagamento não permite acesso. Volte à loja ou contacte o suporte.</p>}
   <button className="rounded border p-3" type="button" onClick={refresh}>Verificar estado</button>
   {error&&<p role="alert">{error}</p>}
 </section>;
}
