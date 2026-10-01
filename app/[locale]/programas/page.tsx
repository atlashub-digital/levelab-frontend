import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProgramCard, type ProgramCardItem } from '@/components/blocks/ProgramCard';
import { CTABanner } from '@/components/blocks/CTABanner';
import { Container, SectionHeading, Section } from '@/components/ui/Section';
import { corpoForte, forcaNaCaneta } from '@/lib/content/programs';
import { getLocaleCopy, isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Programas',
  description:
    'Programas LeveLab — Corpo Forte (8 semanas) e Força na Caneta (7 dias). Educativos, calmos e estruturados, com LIA e apoio humano.',
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

  const items: ProgramCardItem[] = [
    {
      name: corpoForte.name,
      duration: corpoForte.duration,
      tagline: corpoForte.tagline,
      description: corpoForte.description,
      path: '/programas/corpo-forte',
      accent: 'forest',
      badge: 'Premium',
      kind: 'Programa',
    },
    {
      name: forcaNaCaneta.name,
      duration: forcaNaCaneta.duration,
      tagline: forcaNaCaneta.tagline,
      description: forcaNaCaneta.description,
      path: '/programas/forca-na-caneta',
      accent: 'olive',
      badge: 'Novo',
      kind: 'Guia',
    },
  ];

  return (
    <>
      {/* Hero / intro */}
      <Section className="pb-10 pt-16 md:pt-24">
        <SectionHeading
          align="center"
          eyebrow="Programas"
          title="Dois percursos, um método"
          intro="Cada programa LeveLab é educativo e calmo — estruturado em semanas ou dias, com LIA e apoio humano do lado de cá. Sem promessas rápidas, sem pressão clínica."
        />
      </Section>

      {/* Program cards */}
      <Section className="py-10 md:py-12">
        <div className="grid gap-6 md:grid-cols-2">
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

      {/* Difference strip */}
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
        secondaryLabel="Começar avaliação"
        secondaryHref={`/${locale}/avaliacao`}
        tone="forest"
      />
    </>
  );
}
