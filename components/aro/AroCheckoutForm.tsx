'use client';
import {useEffect,useRef,useState,type FormEvent} from 'react';
import Link from 'next/link';
import type {AroOffer,AroSession,AroState} from '@/lib/aro/client';
const copy:Record<AroState,string>={
 CREATED:'A preparar as instruções de pagamento…',
 PENDING:'Aguardando confirmação do pagamento no ARO.',
 APPROVED:'Pagamento aprovado. Entre com o mesmo e-mail para aceder ao seu conteúdo após confirmação de acesso no ARO.',
 FAILED:'Pagamento não concluído.',CANCELED:'Pagamento cancelado.',EXPIRED:'Esta sessão de pagamento expirou.',
 REFUNDED:'Este pagamento foi reembolsado.',CHARGEBACK:'Este pagamento foi revertido.'
};
const endStates=new Set<AroState>(['APPROVED','FAILED','CANCELED','EXPIRED','REFUNDED','CHARGEBACK']);
export function AroCheckoutForm({offer,locale}:{offer:AroOffer;locale:string}){
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[document,setDocument]=useState('');
 const [method,setMethod]=useState<'PIX'|'CARD'>('PIX');
 const [checkout,setCheckout]=useState<AroSession|null>(null);
 const [state,setState]=useState<AroState>('CREATED');
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 const key=useRef('');
 useEffect(()=>{
  if(!checkout||endStates.has(state))return;
  let alive=true;
  const poll=async()=>{
   try{
    const res=await fetch('/api/aro/status',{method:'POST',headers:{'content-type':'application/json'},cache:'no-store',body:JSON.stringify({id:checkout.id,secret:checkout.checkout_secret})});
    if(res.ok){const result=await res.json() as {state:AroState};if(alive)setState(result.state);}
   }catch{ /* transient; retry */ }
  };
  void poll();
  const timer=window.setInterval(()=>void poll(),4000);
  return()=>{alive=false;window.clearInterval(timer)};
 },[checkout,state]);
 async function start(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(busy)return;setBusy(true);setError('');
  if(!key.current)key.current=crypto.randomUUID();
  try{
   const q=new URLSearchParams(location.search),attribution:Record<string,string>={};
   for(const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'])if(q.has(k))attribution[k]=q.get(k)!.slice(0,128);
   const res=await fetch('/api/aro/checkout',{method:'POST',headers:{'content-type':'application/json','idempotency-key':key.current},body:JSON.stringify({offer,payer:{name,email,...(document?{document}:{})},payment_method:method,attribution})});
   if(!res.ok)throw new Error('Checkout indisponível. Não foi confirmado nenhum pagamento.');
   const result=await res.json() as AroSession;setCheckout(result);setState(result.state);
  }catch(err){setError(err instanceof Error?err.message:'Checkout indisponível.');}
  finally{setBusy(false);}
 }
 const pix=checkout?.payment?.kind==='PIX'?checkout.payment:null;
 const card=checkout?.payment?.kind==='CARD'?checkout.payment:null;
 function restart(){key.current='';setCheckout(null);setState('CREATED');setError('');}
 return <section className="mx-auto max-w-xl rounded-3xl border border-forest/15 bg-white p-6 shadow-soft md:p-8">
  <p className="eyebrow">LeveLab · pagamento via Atlas Revenue Operations</p>
  <h1 className="mt-3 font-display text-3xl text-ink">{offer==='guia-corpo-forte'?'Corpo Forte — Guia e Workbook':'Força na Caneta — Guia'}</h1>
  {!checkout?<form className="mt-7 space-y-4" onSubmit={start}>
   <label className="block text-sm text-ink">Nome completo<input required minLength={2} maxLength={160} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-xl border border-forest/25 px-4 py-3" /></label>
   <label className="block text-sm text-ink">E-mail para associar o acesso<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-forest/25 px-4 py-3" /></label>
   <label className="block text-sm text-ink">CPF (apenas se exigido pelo meio de pagamento)<input inputMode="numeric" autoComplete="off" value={document} onChange={e=>setDocument(e.target.value.replace(/\D/g,'').slice(0,11))} className="mt-1 w-full rounded-xl border border-forest/25 px-4 py-3" /></label>
   <label className="block text-sm text-ink">Pagamento<select value={method} onChange={e=>setMethod(e.target.value as 'PIX'|'CARD')} className="mt-1 w-full rounded-xl border border-forest/25 px-4 py-3"><option value="PIX">PIX</option><option value="CARD">Cartão (se disponibilizado no ARO)</option></select></label>
   <p className="text-xs leading-relaxed text-muted">O valor será apresentado conforme o catálogo aprovado no ARO. Conteúdo educativo; não substitui cuidados de saúde. Consulte as condições comerciais antes de pagar.</p>
   {error?<p role="alert" className="text-sm text-red-700">{error}</p>:null}
   <button disabled={busy} type="submit" className="w-full rounded-full bg-forest px-6 py-3 font-semibold text-white disabled:opacity-50">{busy?'A preparar…':'Continuar para o pagamento'}</button>
  </form>:<div className="mt-7 space-y-5" aria-live="polite">
   <p role="status" className="font-semibold text-forest">{copy[state]}</p>
   <p className="font-display text-2xl text-ink">{new Intl.NumberFormat('pt-BR',{style:'currency',currency:checkout.amount.currency}).format(checkout.amount.amount_minor/100)}</p>
   {pix?<div className="rounded-2xl bg-cream p-4">
    <p className="font-semibold text-ink">PIX Copia e Cola</p>
    <textarea aria-label="Código de pagamento PIX" className="mt-3 w-full rounded-lg border border-forest/20 bg-white p-2 font-mono text-xs" rows={4} readOnly value={pix.copy_paste} />
    <button type="button" onClick={()=>void navigator.clipboard.writeText(pix.copy_paste)} className="mt-3 rounded-full border border-forest px-5 py-2 text-forest">Copiar código</button>
    <p className="mt-3 text-xs text-muted">Confirme o pagamento no seu banco. Não envie o código nem dados pessoais por mensagens.</p>
   </div>:null}
   {card?.redirect_url?.startsWith('https://')?<a href={card.redirect_url} rel="noopener noreferrer" className="inline-flex rounded-full bg-forest px-6 py-3 text-white">Continuar no checkout indicado pelo ARO</a>:null}
   {state==='APPROVED'?<Link href={`/${locale}/entrar`} className="inline-flex rounded-full bg-forest px-6 py-3 text-white">Entrar e abrir o meu conteúdo</Link>:null}
   {endStates.has(state)&&state!=='APPROVED'?<button onClick={restart} className="rounded-full border border-forest/25 px-6 py-3 text-forest">Criar nova sessão</button>:null}
   <p className="text-xs leading-relaxed text-muted">O acesso exige entitlement ACTIVE confirmado no servidor. Um retorno positivo do navegador não concede acesso por si só.</p>
  </div>}
 </section>;
}
