import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProgramCard, type ProgramCardItem } from '@/components/blocks/ProgramCard';
import { CTABanner } from '@/components/blocks/CTABanner';
import { Container, SectionHeading, Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Card';
import { ArrowRight } from 'lucide-react';
import { getLocaleCopy, isLocale } from '@/lib/i18n';

/**
 * Programas index.
 *
 * Spec (levelab-zai-ui-spec-v1.0.json → pages.programs.featured_cards):
 *   Corpo Forte (live), Força na Caneta (live), Leve 7 (coming soon),
 *   Reset 21 (coming soon), Leve 90 (coming soon), Leve 365 (coming soon),
 *   LIA Companion (coming soon).
 *
 * Layout: editorial card grid + short intro. Primary CTA: 'Ver programa'.
 * Coming-soon cards link to /programas (or /lia for LIA Companion) and show
 * an 'Em breve' badge.
 */
export const metadata: Metadata = {
  title: 'Programas · LeveLab',
  description:
    'Programas LeveLab — Corpo Forte (8 semanas), Força na Caneta (7 dias) e os próximos percursos: Leve 7, Reset 21, Leve 90, Leve 365 e LIA Companion.',
  alternates: { canonical: '/pt-br/programas' },
};

export default async function ProgramasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);

  const items: (ProgramCardItem & { status: 'live' | 'soon' })[] = [
    {
      name: 'Corpo Forte',
      duration: '8 semanas',
      tagline: 'Corpo Forte não é um tipo de corpo. É uma capacidade.',
      description:
        'Programa interativo de 8 semanas com aprendizado, aplicação, experimentos semanais e workbook.',
      path: '/programas/corpo-forte',
      accent: 'forest',
      badge: 'Premium',
      kind: 'Programa',
      ctaLabel: 'Ver programa',
      status: 'live',
    },
    {
      name: 'Força na Caneta',
      duration: '7 dias',
      tagline: 'Pequenas escolhas. Grandes mudanças.',
      description:
        'Guia educativo de 7 dias sobre organização de refeições, apetite e escolhas.',
      path: '/programas/forca-na-caneta',
      accent: 'olive',
      badge: 'Novo',
      kind: 'Guia',
      ctaLabel: 'Ver guia',
      status: 'live',
    },
    {
      name: 'Leve 7',
      duration: '7 dias',
      tagline: 'Uma semana para voltar ao que importa.',
      description:
        'Programa curto de 7 dias com pequenos hábitos, acompanhamento e LIA. Em breve.',
      path: '/programas',
      accent: 'gold',
      badge: 'Em breve',
      kind: 'Programa',
      ctaLabel: 'Ver programa',
      status: 'soon',
    },
    {
      name: 'Reset 21',
      duration: '21 dias',
      tagline: 'Três semanas para reorganizar a rotina.',
      description:
        'Programa de 21 dias com foco em rotina, alimentação, movimento e recuperação. Em breve.',
      path: '/programas',
      accent: 'forest',
      badge: 'Em breve',
      kind: 'Programa',
      ctaLabel: 'Ver programa',
      status: 'soon',
    },
    {
      name: 'Leve 90',
      duration: '90 dias',
      tagline: 'Três meses para construir continuidade.',
      description:
        'Programa trimestral com acompanhamento estendido, LIA e apoio humano. Em breve.',
      path: '/programas',
      accent: 'gold',
      badge: 'Em breve',
      kind: 'Programa',
      ctaLabel: 'Ver programa',
      status: 'soon',
    },
    {
      name: 'Leve 365',
      duration: '365 dias',
      tagline: 'Um ano inteiro de constância e cuidado.',
      description:
        'Programa anual com acompanhamento, LIA e conteúdo contínuo. Em breve.',
      path: '/programas',
      accent: 'forest',
      badge: 'Em breve',
      kind: 'Programa',
      ctaLabel: 'Ver programa',
      status: 'soon',
    },
    {
      name: 'LIA Companion',
      duration: 'Assinatura mensal',
      tagline: 'A LIA no seu dia, todos os dias.',
      description:
        'Assinatura com LIA no dia a dia — rotina, alimentação, movimento e motivação. Em breve.',
      path: '/lia',
      accent: 'gold',
      badge: 'Em breve',
      kind: 'Assinatura',
      ctaLabel: 'Ver assinatura',
      status: 'soon',
    },
  ];

  return (
    <>
      {/* Hero / intro */}
      <Section className="pb-10 pt-16 md:pt-24">
        <SectionHeading
          align="center"
          eyebrow="Programas"
          title="Percursos para uma rotina mais leve"
          intro="Programas LeveLab — educativos, calmos e estruturados. Cada percurso tem LIA e apoio humano do lado de cá. Sem promessas rápidas, sem pressão clínica."
        />
        <div className="mt-8 flex justify-center">
          <Badge variant="ivory">7 percursos · 2 disponíveis hoje · 5 em breve</Badge>
        </div>
      </Section>

      {/* Program cards editorial grid */}
      <Section className="py-10 md:py-12">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ProgramCard
              key={item.name}
              item={item}
              locale={locale}
              copy={copy}
            />
          ))}
        </div>
      </Section>

      {/* Educational strip */}
      <section className="bg-cream/70 py-16 md:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                t: 'Educativo, não clínico',
                d: 'Aprendizado e aplicação. Sem diagnóstico, prescrição ou promessa de resultado.',
              },
              {
                t: 'Calmo e estruturado',
                d: 'Semanas ou dias com ritmo realista — pequenos hábitos que ficam no tempo.',
              },
              {
                t: 'LIA + apoio humano',
                d: 'A LIA ao lado do percurso e a Ana/equipa para dúvidas e continuidade.',
              },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft"
              >
                <p className="font-display text-lg font-medium text-ink">{f.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        eyebrow="Ainda a decidir?"
        title="Deixe a LIA ajudar a escolher"
        description="Conte o seu momento numa conversa curta — a LIA sugere o ponto de entrada, sem compromisso."
        primaryLabel="Falar com a LIA"
        primaryHref={`/${locale}/lia`}
        secondaryLabel="Explorar a loja"
        secondaryHref={`/${locale}/loja`}
        tone="forest"
      />

      <div className="pb-20 text-center">
        <a
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:underline"
        >
          Voltar ao início
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </>
  );
}
