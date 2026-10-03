import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, SectionHeading, Section } from '@/components/ui/Section';
import { EcosystemGrid } from '@/components/blocks/EcosystemGrid';
import { AnaSection } from '@/components/blocks/AnaSection';
import { CTABanner } from '@/components/blocks/CTABanner';
import { Leaf } from '@/components/blocks/ProductVisual';
import { methodPrinciples } from '@/lib/content/brand';
import { siteConfig } from '@/config/site';
import { getLocaleCopy, isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Sobre a LeveLab',
  description:
    'A LeveLab é uma marca do Grupo MTX Farma dedicada a saúde, bem-estar e longevidade com método, LIA e apoio humano.',
  alternates: { canonical: '/pt-br/sobre' },
  openGraph: {
    title: 'Sobre a LeveLab',
    description:
      'Saúde • Bem-estar • Longevidade com método, LIA e apoio humano. Uma marca do Grupo MTX Farma.',
    url: '/pt-br/sobre',
  },
};

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);

  const hierarchy = [
    {
      level: 'Grupo',
      name: siteConfig.group,
      desc: 'O grupo-controlador do qual a LeveLab faz parte.',
    },
    {
      level: 'Marca',
      name: siteConfig.name,
      desc: 'A marca de saúde, bem-estar e longevidade.',
    },
    {
      level: 'Linhas',
      name: 'Care · Academy · Club · Store · LIA',
      desc: 'Cinco linhas que cobrem acompanhamento, educação, comunidade, loja e a assistente de bem-estar.',
    },
    {
      level: 'Produtos',
      name: 'Corpo Forte · Força na Caneta',
      desc: 'Programa interativo de 8 semanas e guia educativo de 7 dias — com Reader e Workbook.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <Section className="py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="eyebrow">Sobre a LeveLab</span>
            <h1 className="mt-3 text-balance font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.04] text-ink">
              Saúde de hoje. Um amanhã com mais vida.
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              A LeveLab é uma marca do {siteConfig.group} dedicada a acompanhar
              pessoas na construção de rotina, hábitos e bem-estar — com método,
              LIA (assistente de bem-estar) e apoio humano de verdade.
            </p>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted">
              Não prometemos resultados rápidos nem milagres. Prometemos presença,
              aprendizado e continuidade: pequenos hábitos que cabem na vida real
              e ficam no tempo.
            </p>
          </div>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-forest opacity-[0.06] blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-forest/10 bg-gradient-forest p-10 text-ivory shadow-card">
              <Leaf className="absolute -right-12 -top-12 h-64 w-64 text-ivory/10" />
              <Leaf className="absolute -bottom-16 -left-12 h-56 w-56 text-ivory/8 [transform:rotate(180deg)]" />
              <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                {siteConfig.tagline}
              </p>
              <p className="relative mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-tight">
                {siteConfig.closingLine}
              </p>
              <p className="relative mt-6 text-sm text-ivory/70">
                {siteConfig.care} — uma marca do {siteConfig.group}.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Brand hierarchy */}
      <section className="bg-cream/70 py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Estrutura da marca"
            title="Onde a LeveLab está"
            intro="Da holding às linhas e aos produtos — uma hierarquia simples e transparente."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {hierarchy.map((h, i) => (
              <li
                key={h.level}
                className="relative flex flex-col gap-2 rounded-3xl border border-forest/10 bg-white p-6 shadow-soft"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-gold font-display text-base font-medium text-ink">
                  {i + 1}
                </span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-forest-2">
                  {h.level}
                </p>
                <p className="font-display text-lg font-medium text-ink">{h.name}</p>
                <p className="text-sm leading-relaxed text-muted">{h.desc}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-muted">
            Identificação jurídica final (razão social, CNPJ e endereço) será
            incluída aqui assim que fornecida. A LeveLab não inventa credenciais.
          </p>
        </Container>
      </section>

      {/* Ecosystem */}
      <EcosystemGrid locale={locale} />

      {/* Values — O Método F.O.R.T.E. */}
      <section className="bg-cream/70 py-16 md:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Valores"
            title="O Método F.O.R.T.E."
            intro="Cinco pilares que sustentam o método — e que se aplicam a cada conversa, programa e conteúdo."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {methodPrinciples.map((p) => (
              <li
                key={p.id}
                className="flex gap-4 rounded-3xl border border-forest/10 bg-white p-6 shadow-soft"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-display text-lg font-medium text-ink">
                  {p.key}
                </span>
                <div>
                  <p className="mt-1 font-display text-lg font-medium text-ink">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Human support */}
      <AnaSection copy={copy} />

      <CTABanner
        eyebrow="Vamos começar?"
        title="Comece pela avaliação ou pela conversa com a LIA"
        description="Sem compromisso. Em poucos passos a LIA sugere o ponto de entrada certo para o seu momento."
        primaryLabel="Começar avaliação"
        primaryHref={`/${locale}/avaliacao`}
        secondaryLabel="Falar com a LIA"
        secondaryHref={`/${locale}/lia`}
        tone="forest"
      />
    </>
  );
}
