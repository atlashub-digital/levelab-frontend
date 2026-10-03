import { Apple, Dumbbell, HeartHandshake, MoonStar, Sprout } from 'lucide-react';
import type { V2Copy } from '@/lib/i18n-v2';

/** "O Método LeveLab" — five pillars, thin gold iconography, hairline dividers. */
export function MethodPillars({ copy }: { copy: V2Copy }) {
  const t = copy.home;
  const icons = [Dumbbell, Sprout, MoonStar, Apple, HeartHandshake];
  return (
    <section className="border-y border-line bg-ivory py-14 lg:py-16" aria-labelledby="metodo-title">
      <div className="shell-wide grid gap-10 lg:grid-cols-[1.15fr_repeat(5,minmax(0,1fr))] lg:gap-0">
        <div className="lg:pr-8">
          <p className="eyebrow">{t.methodEyebrow}</p>
          <h2 id="metodo-title" className="mt-1 font-display text-[2.6rem] leading-none text-ink">
            {t.methodTitle}
          </h2>
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-ink/70">{t.methodLead}</p>
        </div>
        <ol className="contents">
          {t.pillars.map((p, i) => {
            const Icon = icons[i];
            return (
              <li
                key={p.title}
                className="flex gap-4 border-line sm:flex-col sm:items-center sm:text-center lg:border-l lg:px-5"
              >
                <Icon className="h-8 w-8 shrink-0 text-gold" strokeWidth={1.15} aria-hidden />
                <div>
                  <h3 className="font-display text-[1.35rem] leading-tight text-ink sm:mt-3">{p.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink/65">{p.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
