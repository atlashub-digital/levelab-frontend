'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowRight, Globe, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { cn } from '@/lib/utils';
import { locales, type Locale } from '@/lib/i18n';
import type { V2Copy } from '@/lib/i18n-v2';

const localeShort: Record<Locale, string> = { 'pt-br': 'PT-BR', 'pt-pt': 'PT-PT', en: 'EN', es: 'ES' };

function swapLocale(pathname: string, target: Locale) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return `/${target}`;
  parts[0] = target;
  return `/${parts.join('/')}`;
}

export function SiteHeader({ locale, copy }: { locale: string; copy: V2Copy }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(false);
  const t = copy.nav;

  const links = [
    { label: t.home, href: `/${locale}`, exact: true },
    { label: t.programs, href: `/${locale}/programas` },
    { label: t.content, href: `/${locale}/conteudos` },
    { label: t.shop, href: `/${locale}/loja` },
    { label: t.lia, href: `/${locale}/lia` },
    { label: t.about, href: `/${locale}/sobre` },
    { label: t.contact, href: `/${locale}/${t.contactSlug}` },
  ];
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  // Close the drawer on navigation and lock body scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const iconBtn =
    'inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-forest/5 hover:text-forest';

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur-[6px]">
      <div className="shell-wide flex h-[var(--header-height)] items-center justify-between gap-4">
        <Link href={`/${locale}`} aria-label="LeveLab — início" className="shrink-0">
          <BrandLogo size="sm" taglineText={copy.footer.tagline} />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-5 lg:flex xl:gap-8">
          {links.map((l) => {
            const active = isActive(l.href, l.exact);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative py-2 text-[14px] font-medium text-ink/80 transition-colors hover:text-forest',
                  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-forest after:transition-transform after:duration-300 hover:after:scale-x-100",
                  active && 'text-forest after:scale-x-100',
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <div className="relative hidden xl:block">
            <button
              type="button"
              onClick={() => setLang((v) => !v)}
              aria-expanded={lang}
              aria-label={t.language}
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-ink/70 hover:bg-forest/5"
            >
              <Globe className="h-4 w-4" />
              {localeShort[locale as Locale]}
            </button>
            {lang ? (
              <div className="absolute right-0 top-11 z-10 w-32 overflow-hidden rounded-lg border border-line bg-ivory py-1 shadow-soft">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={swapLocale(pathname, loc)}
                    onClick={() => setLang(false)}
                    className={cn(
                      'block px-3 py-2 text-sm hover:bg-sage/50',
                      loc === locale ? 'font-semibold text-forest' : 'text-ink/80',
                    )}
                  >
                    {localeShort[loc]}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link href={`/${locale}/conteudos`} aria-label={t.search} className={cn(iconBtn, 'hidden sm:inline-flex lg:hidden xl:inline-flex')}>
            <Search className="h-[19px] w-[19px]" strokeWidth={1.6} />
          </Link>
          <Link href={`/${locale}/conta`} aria-label={t.account} className={cn(iconBtn, 'hidden sm:inline-flex lg:hidden xl:inline-flex')}>
            <UserRound className="h-[19px] w-[19px]" strokeWidth={1.6} />
          </Link>
          <Link href={`/${locale}/loja`} aria-label={t.shopIcon} className={cn(iconBtn, 'hidden sm:inline-flex lg:hidden xl:inline-flex')}>
            <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.6} />
          </Link>
          <Link
            href={`/${locale}/avaliacao`}
            className="ml-2 hidden h-10 items-center gap-2 rounded-md bg-forest px-4 text-sm font-semibold text-ivory shadow-soft transition-colors hover:bg-forest-2 md:inline-flex"
          >
            {t.cta} <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.menu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={cn(iconBtn, 'border border-line lg:hidden')}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-nav" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label={t.close}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(88%,400px)] flex-col bg-ivory shadow-lift">
            <div className="flex h-[var(--header-height)] items-center justify-between border-b border-line px-5">
              <BrandLogo size="sm" tagline={false} />
              <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className={iconBtn}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Navegação" className="flex flex-col px-3 py-4">
              {links.map((l) => {
                const active = isActive(l.href, l.exact);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-3 py-3.5 font-display text-[1.45rem] leading-none',
                      active ? 'bg-sage/60 text-forest' : 'text-ink hover:bg-cream',
                    )}
                  >
                    {l.label}
                    <ArrowRight className="h-4 w-4 text-gold" />
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto space-y-3 border-t border-line p-5">
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/conta`}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-forest/20 text-sm font-semibold text-forest"
                >
                  <UserRound className="h-4 w-4" /> {t.account}
                </Link>
              </div>
              <Link
                href={`/${locale}/avaliacao`}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-forest text-[15px] font-semibold text-ivory"
              >
                {t.cta} <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex justify-center gap-1 pt-1" aria-label={t.language}>
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={swapLocale(pathname, loc)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-semibold',
                      loc === locale ? 'bg-forest text-ivory' : 'text-ink/70 hover:bg-cream',
                    )}
                  >
                    {localeShort[loc]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
