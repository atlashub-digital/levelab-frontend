import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShopCatalog } from '@/components/blocks/ShopCatalog';
import { EspelhoMeuSection } from '@/components/blocks/EspelhoMeuSection';
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
    'Loja LeveLab — Corpo Forte com workbook, conteúdos educativos e coleção editorial EspelhoMeu. Consulte preços e disponibilidade nos respetivos canais.',
  alternates: { canonical: '/pt-br/loja' },
  openGraph: {
    title: 'Loja · LeveLab',
    description:
      'Conteúdos LeveLab e uma secção dedicada à Biblioteca EspelhoMeu, com cinco livros digitais.',
    url: '/pt-br/loja',
  },
};

const storeFaq = [
  {
    id: 'compra-futura',
    q: 'Já posso comprar agora?',
    a: 'Corpo Forte está apresentado a R$ 39,90 com o workbook incluído. O checkout PIX do site LeveLab será disponibilizado após testes de pagamento e acesso. Os eBooks EspelhoMeu são vendidos separadamente em espelho.lia.doctor.',
  },
  {
    id: 'tipos-conteudo',
    q: 'Que tipos de conteúdo existem?',
    a: 'Programas estruturados (semanas ou dias), guias educativos curtos, e-books, workbooks de aplicação, receitas e assinaturas com a LIA no dia a dia.',
  },
  {
    id: 'acompanhamento',
    q: 'Os conteúdos vêm com acompanhamento?',
    a: 'O produto Corpo Forte inclui o workbook, mas não inclui acompanhamento com a LIA. Os serviços LIA e LeveLab+ estão assinalados como Em breve.',
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

  return (
    <>
      <ShopCatalog locale={locale} />
      <EspelhoMeuSection />
      <FAQ
        eyebrow="FAQ da loja"
        title="Perguntas sobre a loja"
        intro="O essencial sobre o catálogo, o que está incluído e os limites educativos."
        items={[...storeFaq, ...liaFaq]}
      />
      <CTABanner
        eyebrow="Não sabe por onde começar?"
        title="Conheça as nossas leituras"
        description="Explore Corpo Forte e conheça também os cinco volumes EspelhoMeu. O acompanhamento LIA estará disponível em breve."
        primaryLabel="Ver biblioteca EspelhoMeu"
        primaryHref="https://espelho.lia.doctor/colecao"
        secondaryLabel="Conhecer a LeveLab"
        secondaryHref={`/${locale}/programas/corpo-forte`}
        tone="forest"
      />
    </>
  );
}
