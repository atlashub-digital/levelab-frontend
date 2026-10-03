import Link from 'next/link';
import { Mail, Phone, MessageCircle, Heart, Sun, Flower2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { legalConfig } from '@/config/legal';
import { locales, type LocaleCopy } from '@/lib/i18n';
import { whatsappUrl } from '@/lib/utils';
import { OliveBranch } from '@/components/blocks/OliveBranch';

export function SiteFooter({ locale, copy }: { locale: string; copy: LocaleCopy }) {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: copy.nav.home, href: `/${locale}` },
    { label: copy.nav.programs, href: `/${locale}/programas` },
    { label: copy.nav.content, href: `/${locale}/conteudos` },
    { label: copy.nav.shop, href: `/${locale}/loja` },
    { label: copy.nav.lia, href: `/${locale}/lia` },
    { label: copy.nav.about, href: `/${locale}/sobre` },
    { label: copy.nav.contact, href: `/${locale}/contato` },
  ];

  const legalLinks = [
    { label: copy.footer.privacy, href: `/${locale}/legal/privacidade` },
    { label: copy.footer.terms, href: `/${locale}/legal/termos` },
    { label: copy.footer.cookies, href: `/${locale}/legal/cookies` },
    { label: copy.footer.health, href: `/${locale}/legal/saude` },
    { label: copy.footer.ai, href: `/${locale}/legal/ia` },
    { label: copy.footer.accessibility, href: `/${locale}/acessibilidade` },
  ];

  /**
   * Maquette motif: a row of 3 decorative icon-links ABOVE the copyright
   * line — subtle outline circles representing the brand values.
   *   Heart → "Conhecimento"
   *   Flower2 (lotus) → "Equilíbrio"
   *   Sun → "Vida"
   */
  const valueIconLinks = [
    { icon: Heart, label: 'Conhecimento' },
    { icon: Flower2, label: 'Equilíbrio' },
    { icon: Sun, label: 'Vida' },
  ];

  return (
    <footer className="mt-auto border-t border-forest/10 bg-forest text-ivory/90">
      <div className="relative overflow-hidden bg-paper-grain">
        {/* Subtle olive branch motifs at the corners of the footer top. */}
        <OliveBranch
          orientation="left"
          thin
          className="pointer-events-none absolute -left-2 -top-2 h-32 w-32 text-gold/40"
        />
        <OliveBranch
          orientation="right"
          thin
          className="pointer-events-none absolute -right-2 -top-2 h-32 w-32 text-gold/40"
        />
        <div className="shell relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 56 56" className="h-10 w-10" aria-hidden>
                <circle cx="28" cy="28" r="27" fill="#fbf8f0" />
                <path
                  d="M28 8c10 7 16 16 16 24 0 10-7 17-16 18C19 47 12 40 12 32c0-8 6-17 16-24z"
                  fill="none"
                  stroke="#b79a5b"
                  strokeWidth="1.4"
                />
                <text
                  x="28"
                  y="36"
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  fontSize="22"
                  fill="#15302a"
                >
                  L
                </text>
              </svg>
              <div className="leading-tight">
                <p className="font-display text-xl font-semibold text-ivory">
                  Leve<span className="text-gold-soft">Lab</span>
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ivory/60">
                  {copy.footer.tagline}
                </p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ivory/70">
              Acompanhamento de rotina, bem-estar e longevidade com método, LIA e apoio humano.
            </p>
            <p className="text-sm text-ivory/60">
              {siteConfig.care} — {copy.footer.group}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {siteConfig.social.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-ivory/20 px-3 py-1 text-xs text-ivory/80 transition-colors hover:border-gold/60 hover:text-ivory"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <nav aria-label={copy.footer.navigation} className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-soft">
              {copy.footer.navigation}
            </p>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ivory/70 transition-colors hover:text-ivory"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-soft">
              {copy.footer.contact}
            </p>
            <a
              href={whatsappUrl(siteConfig.liaWhatsappNumber, 'Olá! Quero saber mais sobre a LeveLab.')}
              className="inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
            >
              <MessageCircle className="h-4 w-4" />
              {siteConfig.liaWhatsappNumber}
            </a>
            <a
              href={whatsappUrl(siteConfig.commercialWhatsappNumber, 'Olá! Preciso de apoio comercial.')}
              className="inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.commercialWhatsappNumber} · Ana
            </a>
            {legalConfig.supportEmail ? (
              <a
                href={`mailto:${legalConfig.supportEmail}`}
                className="inline-flex items-center gap-2 text-sm text-ivory/70 transition-colors hover:text-ivory"
              >
                <Mail className="h-4 w-4" />
                {legalConfig.supportEmail}
              </a>
            ) : null}
          </div>

          <nav aria-label={copy.footer.legal} className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-soft">
              {copy.footer.legal}
            </p>
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ivory/70 transition-colors hover:text-ivory"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="shell flex flex-col items-center justify-between gap-6 py-6 text-center md:flex-row md:text-left">
          <p className="font-display text-lg italic text-ivory/90">{siteConfig.closingLine}</p>
          {/* Maquette motif: 3 decorative outline icon-links (Conhecimento /
              Equilíbrio / Vida) sit ABOVE the copyright line. */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Valores LeveLab">
            {valueIconLinks.map((v) => (
              <li key={v.label}>
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-ivory/70">
                  <span className="inline-grid h-8 w-8 place-items-center rounded-full border border-ivory/25 text-gold-soft">
                    <v.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  {v.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-ivory/50">
            © {year} {siteConfig.name}. {copy.footer.rights} · {copy.footer.group}
          </p>
        </div>
      </div>
    </footer>
  );
}
