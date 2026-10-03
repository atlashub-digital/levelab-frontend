import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReaderShell } from '@/components/reader/ReaderShell';
import { learningContent, getReaderAsset } from '@/lib/content/readers';
import { forcaNaCaneta } from '@/lib/content/programs';
import { getLocaleCopy, isLocale } from '@/lib/i18n';
import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Força na Caneta Reader · LeveLab',
    description:
      'Reader premium do Força na Caneta — navegação por dia, marcadores, zoom e atalhos para a LIA em cada tema.',
    alternates: { canonical: '/pt-br/programas/forca-na-caneta/reader' },
    openGraph: {
      title: 'Força na Caneta Reader · LeveLab',
      description:
        'Reader premium do Força na Caneta — 7 dias de leitura e aplicação.',
      url: `${siteConfig.url}/pt-br/programas/forca-na-caneta/reader`,
    },
  };
}

export default async function ForcaNaCanetaReaderPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ semana?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  // `semana` query param carries a day slug (e.g. "dia-1") for Força na Caneta.
  // We keep the param name as `semana` so WeekTimeline links work uniformly.
  const { semana } = await searchParams;
  const copy = getLocaleCopy(locale);

  const module = await learningContent.getModule('forca-na-caneta', semana ?? 'dia-1');
  if (!module) notFound();

  const asset = getReaderAsset('forca-na-caneta', 'guia');
  const weeks = forcaNaCaneta.days!;
  const program = forcaNaCaneta;

  return (
    <ReaderShell
      key={module.week.slug}
      locale={locale}
      copy={copy}
      program={program}
      module={module}
      asset={asset}
      weeks={weeks}
    />
  );
}
