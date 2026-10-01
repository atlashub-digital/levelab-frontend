import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/blocks/Hero';
import { TrustStrip } from '@/components/blocks/TrustStrip';
import { EcosystemGrid } from '@/components/blocks/EcosystemGrid';
import { ProgramsSection } from '@/components/blocks/ProgramsSection';
import { MethodSection } from '@/components/blocks/MethodSection';
import { HowItWorks } from '@/components/blocks/HowItWorks';
import { LiaSection } from '@/components/blocks/LiaSection';
import { ContentHighlights } from '@/components/blocks/ContentHighlights';
import { TestimonialsSection } from '@/components/blocks/TestimonialsSection';
import { AnaSection } from '@/components/blocks/AnaSection';
import { NewsletterCTA } from '@/components/blocks/NewsletterCTA';
import { FinalCTA } from '@/components/blocks/FinalCTA';
import { CTABanner } from '@/components/blocks/CTABanner';
import { getLocaleCopy, isLocale } from '@/lib/i18n';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'LeveLab — Saúde • Bem-estar • Longevidade',
  description:
    'Acompanhamento de rotina, bem-estar e longevidade com método, LIA e apoio humano. Conheça Corpo Forte, Força na Caneta e a LIA.',
  alternates: { canonical: '/pt-br' },
  openGraph: {
    title: 'LeveLab — Saúde • Bem-estar • Longevidade',
    description:
      'Acompanhamento de rotina, bem-estar e longevidade com método, LIA e apoio humano.',
    url: siteConfig.url,
  },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);

  return (
    <>
      <Hero locale={locale} copy={copy} />
      <TrustStrip />
      <EcosystemGrid locale={locale} />
      <ProgramsSection locale={locale} copy={copy} />
      <MethodSection />
      <HowItWorks />
      <LiaSection locale={locale} copy={copy} />
      <ContentHighlights locale={locale} copy={copy} />
      <TestimonialsSection />
      <CTABanner
        eyebrow="Programa em destaque"
        title="Corpo Forte — Programa Interativo de 8 Semanas"
        description="Aprendizado, aplicação e progresso em oito semanas estruturadas, com LIA e apoio humano."
        primaryLabel="Explorar o programa"
        primaryHref={`/${locale}/programas/corpo-forte`}
        secondaryLabel="Conversar com a LIA"
        secondaryHref={`/${locale}/lia`}
        tone="forest"
      />
      <AnaSection copy={copy} />
      <NewsletterCTA />
      <FinalCTA locale={locale} copy={copy} />
    </>
  );
}
