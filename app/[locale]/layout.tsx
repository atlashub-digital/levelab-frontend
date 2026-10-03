import { SiteNav } from '@/components/layout/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { locales, isLocale, getLocaleCopy } from '@/lib/i18n';
import { notFound } from 'next/navigation';

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
  const copy = getLocaleCopy(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav locale={locale} copy={copy} />
      <main className="flex-1">{children}</main>
      <SiteFooter locale={locale} copy={copy} />
    </div>
  );
}
