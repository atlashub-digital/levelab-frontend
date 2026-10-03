import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductReader } from '@/components/reader/ProductReader';
import { findAsset } from '@/lib/content/library';
import { isLocale } from '@/lib/i18n';
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
  searchParams: Promise<{ doc?: string; p?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { doc, p } = await searchParams;
  const asset = findAsset('corpo-forte', doc);
  if (!asset) notFound();

  const page = Number.parseInt(p ?? '', 10);

  return (
    <ProductReader
      locale={locale}
      asset={asset}
      initialPage={Number.isFinite(page) && page > 0 ? page : undefined}
    />
  );
}
