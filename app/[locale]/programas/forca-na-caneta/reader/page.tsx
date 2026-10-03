import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductReader } from '@/components/reader/ProductReader';
import { findAsset } from '@/lib/content/library';
import { isLocale } from '@/lib/i18n';
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
  searchParams: Promise<{ doc?: string; p?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { doc, p } = await searchParams;
  const asset = findAsset('forca-na-caneta', doc);
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
