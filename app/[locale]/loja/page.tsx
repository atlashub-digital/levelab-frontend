import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/blocks/ShopCatalog';
import { FAQ } from '@/components/blocks/FAQ';
import { CTABanner } from '@/components/blocks/CTABanner';
import { getLocaleCopy, isLocale } from '@/lib/i18n';
import { liaFaq } from '@/lib/content/brand';

/**
 * Loja (Store) page.
 *
 * Spec (levelab-zai-ui-spec-v1.0.json → pages.store):
 *   - route: /[locale]/loja
 *   - commerce_phase: catalogue_ready_checkout_later + "Do not hard-code the
 *     Euro prices visible in the visual mockup." (Prices are NOT shown — see
 *     ProductCard.tsx.)
 *   - filters: Categoria / Objetivo / Formato / Preço. Objetivo + Preço are
 *     visual/mock in V1 (no prices in the catalog yet).
 *
 * Hero banner label: 'Conteúdo e Loja' (ShopCatalog renders it internally).
 */
export const metadata: Metadata = {
  title: 'Loja · LeveLab',
  description:
    'Loja LeveLab — programas, guias, e-books, workbooks, receitas e assinaturas. Catálogo premium com método. Preços serão divulgados quando a LeveLab Store abrir.',
  alternates: { canonical: '/pt-br/loja' },
  openGraph: {
    title: 'Loja · LeveLab',
    description:
      'Programas, guias, e-books, workbooks e assinaturas LeveLab — com método e apoio humano.',
    url: '/pt-br/loja',
  },
};

const storeFaq = [
  {
    id: 'compra-futura',
    q: 'Já posso comprar agora?',
    a: 'A compra digital será ativada apenas após a homologação editorial e comercial e a configuração do ARO. Até lá, explore o catálogo ou fale com a equipa.',
  },
  {
    id: 'tipos-conteudo',
    q: 'Que tipos de conteúdo existem?',
    a: 'Programas estruturados (semanas ou dias), guias educativos curtos, e-books, workbooks de aplicação, receitas e assinaturas com a LIA no dia a dia.',
  },
  {
    id: 'acompanhamento',
    q: 'Os conteúdos vêm com acompanhamento?',
    a: 'Alguns programas e bundles incluem acompanhamento humano e acesso à LIA ao longo do percurso. Os bundles e a descrição de cada item deixam claro o que está incluído.',
  },
  {
    id: 'educativo-nao-clinico',
    q: 'Os conteúdos são clínicos?',
    a: 'Não. Todos os conteúdos LeveLab são educativos e de bem-estar. Não substituem acompanhamento clínico, diagnóstico ou prescrição.',
  },
];

export default async function LojaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);
  void copy; // chrome text already rendered by the layout's SiteNav/SiteFooter.

  const checkoutEnabled = process.env.ARO_CHECKOUT_ENABLED === 'true';

  return (
    <>
      <ShopCatalog locale={locale} />
      {checkoutEnabled ? (
        <section className="shell py-10" aria-label="Comprar edições homologadas">
          <div className="rounded-3xl border border-forest/15 bg-cream p-6 md:p-8">
            <h2 className="font-display text-2xl text-forest">Edições digitais LeveLab</h2>
            <p className="mt-2 text-sm text-muted">As ofertas e valores são confirmados pelo Atlas Revenue Operations antes do pagamento.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`/${locale}/checkout?offer=guia-corpo-forte`} className="rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white">Comprar Corpo Forte</Link>
              <Link href={`/${locale}/checkout?offer=guia-forca-na-caneta`} className="rounded-full border border-forest px-5 py-3 text-sm font-semibold text-forest">Comprar Força na Caneta</Link>
            </div>
          </div>
        </section>
      ) : null}
      <FAQ
        eyebrow="FAQ da loja"
        title="Perguntas sobre a loja"
        intro="O essencial sobre o catálogo, o que está incluído e os limites educativos."
        items={[...storeFaq, ...liaFaq]}
      />
      <CTABanner
        eyebrow="Não sabe por onde começar?"
        title="Comece pela conversa com a LIA"
        description="A LIA ajuda a entender o seu momento e sugerir um ponto de entrada — sem compromisso e sem promessas clínicas."
        primaryLabel="Falar com a LIA"
        primaryHref={`/${locale}/lia`}
        secondaryLabel="Falar com a Ana"
        secondaryHref={`/${locale}/contato`}
        tone="forest"
      />
    </>
  );
}
