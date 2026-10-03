import type { V2Copy } from '@/lib/i18n-v2';

/** Editorial four-step narrative — numerals and a hairline, no boxes. */
export function HowItWorks({ copy }: { copy: V2Copy }) {
  const t = copy.home;
  return (
    <section className="bg-cream py-16 lg:py-24" aria-labelledby="como-title">
      <div className="shell-wide grid gap-10 lg:grid-cols-[0.8fr_2.2fr] lg:gap-16">
        <div>
          <p className="eyebrow">{t.howEyebrow}</p>
          <h2 id="como-title" className="display-lg mt-3 text-balance">
            {t.howTitle}
          </h2>
        </div>
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span aria-hidden className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-champagne/70 via-champagne/40 to-transparent lg:block" />
          {t.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span className="relative inline-block bg-cream pr-4 font-display text-[3.4rem] leading-none text-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-[1.6rem] leading-tight text-ink">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
