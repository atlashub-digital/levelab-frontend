import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Card';
import { ProductCard } from '@/components/blocks/ProductCard';
import { CTABanner } from '@/components/blocks/CTABanner';
import { getLocaleCopy, isLocale } from '@/lib/i18n';
import { products, type Product } from '@/lib/content/store';
import { corpoForte, forcaNaCaneta } from '@/lib/content/programs';

/**
 * Conteúdos (Editorial content highlights) page.
 *
 * Per spec (levelab-zai-ui-spec-v1.0.json):
 *   - The store lives at /loja (with ShopCatalog + prices hidden).
 *   - /conteudos is repurposed as a content/editorial highlights page —
 *     NOT the store.
 *
 * Editorial cards: Corpo Forte program, Força na Caneta, Pequenos Hábitos,
 * Guia do Sono, Receitas LeveLab. Each card is a `ProductCard` (which now
 * renders NO price). CTA at the bottom: 'Explorar a loja' → /loja.
 */
export const metadata: Metadata = {
  title: 'Conteúdos · LeveLab',
  description:
    'Conteúdos editoriais LeveLab — Corpo Forte, Força na Caneta, Pequenos Hábitos, Guia do Sono e Receitas LeveLab. Educativo, calmo, sem promessas clínicas.',
  alternates: { canonical: '/pt-br/conteudos' },
  openGraph: {
    title: 'Conteúdos · LeveLab',
    description:
      'Conteúdos editoriais LeveLab — programas, guias e e-books com método e apoio humano.',
    url: '/pt-br/conteudos',
  },
};

export default async function ConteudosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);
  void copy;

  // Pick the editorial highlights from the catalog.
  const highlightIds = [
    'corpo-forte',
    'forca-na-caneta',
    'pequenos-habitos',
    'guia-do-sono',
    'receitas-levelab',
  ];
  const highlights: Product[] = highlightIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  // Editorial intro lines from the live program metadata.
  const cfTagline = corpoForte.tagline;
  const fcTagline = forcaNaCaneta.tagline;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-forest/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_85%_-10%,rgba(183,154,91,0.18),transparent_28rem),radial-gradient(circle_at_0%_40%,rgba(21,61,49,0.05),transparent_22rem)]"
        />
        <div className="shell py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Conteúdos editoriais
            </span>
            <h1 className="mt-4 text-balance font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.04] text-ink">
              Histórias, guias e programas para acompanhar a sua rotina.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              Conteúdo LeveLab educativo e calmo — programas estruturados, guias
              curtos, e-books e receitas. Cada peça segue o método F.O.R.T.E. e
              não substitui acompanhamento clínico.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial highlight quotes */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft md:p-8">
              <Badge variant="gold">Programa em destaque</Badge>
              <h2 className="mt-3 font-display text-2xl font-medium text-ink">Corpo Forte</h2>
              <p className="mt-2 italic text-forest-2">{cfTagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Programa interativo LeveLab de 8 semanas — aprendizado, aplicação,
                experimentos semanais e workbook premium.
              </p>
              <Link
                href={`/${locale}/programas/corpo-forte`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest hover:underline"
              >
                Conhecer o programa
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft md:p-8">
              <Badge variant="gold">Guia em destaque</Badge>
              <h2 className="mt-3 font-display text-2xl font-medium text-ink">Força na Caneta</h2>
              <p className="mt-2 italic text-forest-2">{fcTagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Guia educativo de 7 dias sobre organização de refeições, apetite
                e escolhas. Não substitui a sua equipe de saúde.
              </p>
              <Link
                href={`/${locale}/programas/forca-na-caneta`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest hover:underline"
              >
                Conhecer o guia
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Editorial content grid */}
      <Section className="py-10 md:py-12">
        <SectionHeading
          eyebrow="Catálogo editorial"
          title="Conteúdos para o seu percurso"
          intro="E-books, guias e receitas com método LeveLab. Calmos, educativos, sem promessas rápidas."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {highlights.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
        <div className="mt-8 flex items-center gap-2 text-sm text-muted">
          <BookOpen className="h-4 w-4 text-forest-2" />
          Preços serão divulgados quando a LeveLab Store oficial abrir.
        </div>
      </Section>

      <CTABanner
        eyebrow="Loja LeveLab"
        title="Explorar a loja completa"
        description="A loja reúne programas, guias, e-books, workbooks, receitas e assinaturas — o catálogo completo em um só lugar."
        primaryLabel="Explorar a loja"
        primaryHref={`/${locale}/loja`}
        secondaryLabel="Falar com a LIA"
        secondaryHref={`/${locale}/lia`}
        tone="forest"
      />
    </>
  );
}
