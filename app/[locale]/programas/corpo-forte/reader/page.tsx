import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ReaderShell } from '@/components/reader/ReaderShell';
import { learningContent, getReaderAsset } from '@/lib/content/readers';
import { corpoForte } from '@/lib/content/programs';
import { getLocaleCopy, isLocale } from '@/lib/i18n';
import { siteConfig } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Corpo Forte Reader · LeveLab',
    description:
      'Reader premium do Corpo Forte — navegação por semanas, marcadores, zoom e atalhos para a LIA em cada tema.',
    alternates: { canonical: '/pt-br/programas/corpo-forte/reader' },
    openGraph: {
      title: 'Corpo Forte Reader · LeveLab',
      description:
        'Reader premium do Corpo Forte — oito semanas de leitura, aplicação e continuidade.',
      url: `${siteConfig.url}/pt-br/programas/corpo-forte/reader`,
    },
  };
}

export default async function CorpoForteReaderPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ semana?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { semana } = await searchParams;
  const copy = getLocaleCopy(locale);

  const module = await learningContent.getModule('corpo-forte', semana ?? 'semana-1');
  if (!module) notFound();

  const asset = getReaderAsset('corpo-forte', 'guia');
  const weeks = corpoForte.weeks!;
  const program = corpoForte;

  return (
    <ReaderShell
      locale={locale}
      copy={copy}
      program={program}
      module={module}
      asset={asset}
      weeks={weeks}
    />
  );
}
