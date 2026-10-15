import {notFound} from 'next/navigation';
import {checkoutEnabled} from '@/lib/aro/client';
import {AroCheckoutForm} from '@/components/aro/AroCheckoutForm';
export default async function Page({params}:{params:Promise<{locale:string;offer:string}>}) {
 const {locale,offer}=await params;
 if(!['pt-br','pt-pt','en','es'].includes(locale))notFound();
 const titles:Record<string,string>={
   'levelab-forca-na-caneta-br':'Força na Caneta',
   'levelab-corpo-forte-br':'Corpo Forte Premium'
 };
 if(!titles[offer])notFound();
 if(!checkoutEnabled()) return (
 <main className="mx-auto max-w-2xl p-10"><h1 className="text-3xl font-semibold">Checkout em preparação</h1>
 <p className="mt-4">Este produto ainda está em homologação editorial e comercial. Não é possível realizar pagamentos agora.</p></main>);
 return <main className="mx-auto max-w-2xl px-5 py-12">
   <h1 className="text-3xl font-semibold">{titles[offer]}</h1>
   <p className="my-4">O valor e as condições finais serão apresentados pelo ARO antes do pagamento.</p>
   <AroCheckoutForm offer={offer}/>
 </main>;
}
