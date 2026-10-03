import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { locales, isLocale } from '@/lib/i18n';
import { getV2Copy } from '@/lib/i18n-v2';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getV2Copy(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader locale={locale} copy={copy} />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} copy={copy} />
    </div>
  );
}
