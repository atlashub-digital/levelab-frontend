import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/blocks/Hero';
import { TrustStrip } from '@/components/blocks/TrustStrip';
import { ProgramsSection } from '@/components/blocks/ProgramsSection';
import { MethodSection } from '@/components/blocks/MethodSection';
import { LiaSection } from '@/components/blocks/LiaSection';
import { ContentHighlights } from '@/components/blocks/ContentHighlights';
import { AnaSection } from '@/components/blocks/AnaSection';
import { NewsletterCTA } from '@/components/blocks/NewsletterCTA';
import { getLocaleCopy, isLocale } from '@/lib/i18n';
import { siteConfig } from '@/config/site';

/**
 * HOME page.
 *
 * Spec (levelab-zai-ui-spec-v1.0.json → pages.home.sections_order):
 *   hero → trust_strip → programs_featured → method_forte → content_highlights
 *   → lia_teaser → human_support → newsletter → institutional_footer.
 *
 * Removed per spec: EcosystemGrid, HowItWorks, TestimonialsSection,
 * the corpo-forte CTABanner, FinalCTA. (Footer is rendered by the layout.)
 */
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
      <ProgramsSection locale={locale} copy={copy} />
      <MethodSection />
      <ContentHighlights locale={locale} copy={copy} />
      <LiaSection locale={locale} copy={copy} />
      <AnaSection copy={copy} />
      <NewsletterCTA />
    </>
  );
}
