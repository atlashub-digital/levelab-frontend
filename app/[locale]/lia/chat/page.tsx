import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LiaChat } from '@/components/lia/LiaChat';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Conversar com a LIA',
  description: 'Converse com a LIA, a assistente virtual de bem-estar da LeveLab.',
  alternates: { canonical: '/pt-br/lia/chat' },
  robots: { index: false },
};

export default async function LiaChatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LiaChat locale={locale} />;
}
