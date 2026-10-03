import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomeHero } from '@/components/home/HomeHero';
import { ProgramsRow } from '@/components/home/ProgramsRow';
import { MethodPillars } from '@/components/home/MethodPillars';
import { LiaFeature } from '@/components/home/LiaFeature';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import { HowItWorks } from '@/components/home/HowItWorks';
import { QuoteNewsletter } from '@/components/home/QuoteNewsletter';
import { FinalCTA } from '@/components/home/FinalCTA';
import { isLocale, locales } from '@/lib/i18n';
import { getV2Copy } from '@/lib/i18n-v2';

const ogLocale: Record<string, string> = { 'pt-br': 'pt_BR', 'pt-pt': 'pt_PT', en: 'en_US', es: 'es_ES' };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const description =
    locale === 'en'
      ? 'Programs, content and guidance for a lighter routine, with LIA and LeveLab human support.'
      : locale === 'es'
        ? 'Programas, contenidos y acompañamiento para una rutina más ligera, con LIA y apoyo humano LeveLab.'
        : 'Programas, conteúdos e acompanhamento para uma rotina mais leve, com a LIA e suporte humano LeveLab.';
  return {
    title: { absolute: 'LeveLab — Saúde, Bem-Estar e Acompanhamento' },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: { locale: ogLocale[locale], url: `/${locale}`, description },
  };
}

/**
 * Home — Visual V2 (Maquete Home): brand first, then programs, method,
 * LIA, featured content, how it works, quote + newsletter, final CTA.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getV2Copy(locale);
  const t = copy.home;

  return (
    <>
      <HomeHero locale={locale} copy={copy} />
      <ProgramsRow locale={locale} copy={copy} />
      <MethodPillars copy={copy} />
      <LiaFeature locale={locale} copy={copy} />
      <FeaturedContent locale={locale} copy={copy} />
      <HowItWorks copy={copy} />
      <QuoteNewsletter locale={locale} copy={copy} />
      <FinalCTA
        locale={locale}
        title={t.finalTitle}
        lead={t.finalLead}
        primary={t.finalAssessment}
        secondary={t.finalLia}
      />
    </>
  );
}
