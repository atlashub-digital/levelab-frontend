import Image from 'next/image';
import { NewsletterForm } from '@/components/home/NewsletterForm';
import { OliveBranch } from '@/components/blocks/OliveBranch';
import type { V2Copy } from '@/lib/i18n-v2';

/** Closing band (Maquete Home): photographic quote + real newsletter opt-in. */
export function QuoteNewsletter({ locale, copy }: { locale: string; copy: V2Copy }) {
  const t = copy.home;
  return (
    <section className="grid lg:grid-cols-2" aria-label={t.newsletterTitle}>
      <figure className="relative flex min-h-[18rem] items-center overflow-hidden lg:min-h-[22rem]">
        <Image
          src="/images/lifestyle/quote-horizon.webp"
          alt="Mulher de costas a contemplar montanhas ao pôr do sol"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[70%_50%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-forest-dark/80 via-forest-dark/45 to-transparent" />
        <blockquote className="relative max-w-sm px-8 font-display text-[1.9rem] italic leading-snug text-ivory sm:px-12">
          “{t.quote}”
        </blockquote>
      </figure>
      <div className="relative overflow-hidden bg-sage-2 px-8 py-14 sm:px-12 lg:py-16">
        <OliveBranch orientation="right" className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 text-forest" thin />
        <div className="relative max-w-md">
          <h2 className="font-display text-[1.9rem] leading-tight text-ink">{t.newsletterTitle}</h2>
          <p className="mt-2 text-sm text-ink/70">{t.newsletterLead}</p>
          <NewsletterForm
            locale={locale}
            labels={{
              placeholder: t.newsletterPlaceholder,
              consent: t.newsletterConsent,
              cta: t.newsletterCta,
              ok: t.newsletterOk,
              error: t.newsletterError,
            }}
          />
        </div>
      </div>
    </section>
  );
}
