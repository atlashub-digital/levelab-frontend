'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Globe, Sparkles, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales, type Locale, type LocaleCopy } from '@/lib/i18n';

const localeShort: Record<Locale, string> = {
  'pt-br': 'PT-BR',
  'pt-pt': 'PT-PT',
  en: 'EN',
  es: 'ES',
};

function swapLocale(pathname: string, target: Locale): string {
  // pathname like /pt-br/lia or /pt-br/programas/corpo-forte/reader
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return `/${target}`;
  parts[0] = target;
  return `/${parts.join('/')}`;
}

export function SiteNav({ locale, copy }: { locale: string; copy: LocaleCopy }) {
  const pathname = usePathname() ?? `/${locale}`;
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const links: { label: string; href: string }[] = [
    { label: copy.nav.home, href: `/${locale}` },
    { label: copy.nav.programs, href: `/${locale}/programas` },
    { label: copy.nav.content, href: `/${locale}/conteudos` },
    { label: copy.nav.shop, href: `/${locale}/loja` },
    { label: copy.nav.lia, href: `/${locale}/lia` },
    { label: copy.nav.about, href: `/${locale}/sobre` },
    { label: copy.nav.contact, href: `/${locale}/contato` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-ivory/85 backdrop-blur-md">
      <div className="shell flex h-[72px] items-center justify-between gap-4">
        <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="LeveLab — início">
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[22px] font-semibold tracking-tight text-ink">
              Leve<span className="text-gold">Lab</span>
            </span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-muted sm:block">
              {copy.footer.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'relative text-sm font-medium text-muted transition-colors hover:text-forest',
                pathname === l.href && 'text-forest',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="menu"
              className="inline-flex items-center gap-1 rounded-full border border-forest/15 px-3 py-1.5 text-xs font-semibold text-forest transition-colors hover:border-forest/40"
            >
              <Globe className="h-3.5 w-3.5" />
              {localeShort[locale as Locale] ?? 'PT-BR'}
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen ? (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-forest/10 bg-white p-1 shadow-card"
              >
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    role="menuitem"
                    href={swapLocale(pathname, loc)}
                    onClick={() => setLangOpen(false)}
                    className={cn(
                      'block rounded-xl px-3 py-2 text-sm transition-colors hover:bg-forest/5',
                      loc === locale ? 'font-semibold text-forest' : 'text-muted',
                    )}
                  >
                    {localeShort[loc]}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Link
            href={`/${locale}/conta`}
            className="hidden items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium text-forest hover:bg-forest/5 md:inline-flex"
          >
            <UserRound className="h-4 w-4" />
            Área de membros
          </Link>

          <Link
            href={`/${locale}/avaliacao`}
            className="hidden items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-forest-2 hover:shadow-lift md:inline-flex"
          >
            <Sparkles className="h-4 w-4" />
            {copy.nav.assessment}
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest/15 text-forest lg:hidden"
            aria-label={copy.common.menu}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(86%,420px)] flex-col gap-2 bg-ivory p-6 shadow-lift">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-ink">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest/15 text-forest"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col" aria-label="Navegação mobile">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-lg font-medium text-ink transition-colors hover:bg-forest/5"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-forest/10 pt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                {copy.footer.language}
              </p>
              <div className="flex flex-wrap gap-2">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={swapLocale(pathname, loc)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-semibold',
                      loc === locale
                        ? 'border-forest bg-forest text-white'
                        : 'border-forest/20 text-forest',
                    )}
                  >
                    {localeShort[loc]}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href={`/${locale}/conta`}
              onClick={() => setOpen(false)}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-forest/20 px-5 py-3 text-base font-semibold text-forest"
            >
              <UserRound className="h-4 w-4" />
              Área de membros
            </Link>
            <Link
              href={`/${locale}/avaliacao`}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-base font-semibold text-white"
            >
              <Sparkles className="h-4 w-4" />
              {copy.nav.assessment}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 56 56" className="h-9 w-9" aria-hidden>
      <circle cx="28" cy="28" r="27" className="fill-forest" />
      <path
        d="M28 8c10 7 16 16 16 24 0 10-7 17-16 18C19 47 12 40 12 32c0-8 6-17 16-24z"
        fill="none"
        stroke="#c8b892"
        strokeWidth="1.4"
      />
      <path d="M28 12v32" stroke="#c8b892" strokeWidth="1.2" />
      <path
        d="M28 20c4 1 7 4 8 8M28 28c4 1 7 4 8 8"
        stroke="#c8b892"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
