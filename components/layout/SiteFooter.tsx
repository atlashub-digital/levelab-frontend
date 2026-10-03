import Link from 'next/link';
import { BrandLogo, LeafMark } from '@/components/brand/BrandLogo';
import type { V2Copy } from '@/lib/i18n-v2';

/**
 * Institutional footer (V2 mockups). Social icons are intentionally absent
 * until official profile URLs exist (ASSET-MANIFEST.md → social links).
 */
export function SiteFooter({ locale, copy }: { locale: string; copy: V2Copy }) {
  const t = copy.footer;
  const n = copy.nav;
  const explore = [
    { label: n.programs, href: `/${locale}/programas` },
    { label: n.content, href: `/${locale}/conteudos` },
    { label: n.shop, href: `/${locale}/loja` },
    { label: n.lia, href: `/${locale}/lia` },
    { label: n.about, href: `/${locale}/sobre` },
    { label: n.contact, href: `/${locale}/${n.contactSlug}` },
  ];
  const legal = [
    { label: t.privacy, href: `/${locale}/legal/privacidade` },
    { label: t.terms, href: `/${locale}/legal/termos` },
    { label: t.cookies, href: `/${locale}/legal/cookies` },
    { label: t.health, href: `/${locale}/legal/saude` },
    { label: t.ai, href: `/${locale}/legal/ia` },
    { label: t.accessibility, href: `/${locale}/acessibilidade` },
  ];

  return (
    <footer className="mt-auto bg-forest-dark text-ivory/85">
      <div className="shell-wide grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr] lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <BrandLogo tone="light" taglineText={t.tagline} />
          <p className="mt-5 max-w-xs font-display text-xl italic leading-snug text-ivory/90">{t.closing}</p>
        </div>

        <nav aria-label={t.explore}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">{t.explore}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ivory hover:underline hover:underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.legal}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">{t.legal}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ivory hover:underline hover:underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3 lg:col-span-1">
          <div className="flex items-start gap-3 border-t border-ivory/10 pt-6 lg:border-0 lg:pt-0">
            <LeafMark className="h-9 w-9 shrink-0 text-champagne" />
            <div>
              <p className="font-display text-lg text-ivory">{t.care}</p>
              <p className="text-sm text-ivory/70">{t.group}</p>
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ivory/55">{t.disclaimer}</p>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="shell-wide flex flex-col items-center justify-between gap-2 py-5 text-xs text-ivory/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} LeveLab. {t.rights}
          </p>
          <p>{t.group}</p>
        </div>
      </div>
    </footer>
  );
}
