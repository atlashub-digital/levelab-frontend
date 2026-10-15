import {notFound} from 'next/navigation';
import {AroCheckoutForm} from '@/components/aro/AroCheckoutForm';
import {ARO_OFFERS} from '@/lib/aro/client';
import {isLocale} from '@/lib/i18n';
export const dynamic='force-dynamic';
export const metadata={title:'Pagamento seguro · LeveLab',robots:{index:false,follow:false}};
export default async function CheckoutPage({params,searchParams}:{params:Promise<{locale:string}>;searchParams:Promise<{offer?:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 const {offer}=await searchParams;
 const approved=ARO_OFFERS.find(o=>o===offer);
 const enabled=process.env.ARO_CHECKOUT_ENABLED==='true';
 return <main className="shell min-h-[70vh] py-12 md:py-20">
  {enabled&&approved?<AroCheckoutForm offer={approved} locale={locale}/>:
   <div className="mx-auto max-w-xl rounded-3xl border border-forest/15 bg-white p-8">
    <h1 className="font-display text-3xl text-ink">Compra ainda não disponível</h1>
    <p className="mt-4 text-muted">Estamos a concluir a homologação editorial e o registo das ofertas no Atlas Revenue Operations. Nenhum pagamento foi iniciado.</p>
   </div>}
 </main>;
}
