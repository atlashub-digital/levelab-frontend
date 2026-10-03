import Image from 'next/image';
import Link from 'next/link';
import { Apple, ArrowRight, CalendarHeart, Footprints, Flower2, MoonStar, ShieldCheck } from 'lucide-react';
import type { V2Copy } from '@/lib/i18n-v2';

/** LIA section — canonical LIA (Visual Identity Lock, Master A). Never presented as a doctor. */
export function LiaFeature({ locale, copy }: { locale: string; copy: V2Copy }) {
  const t = copy.home;
  const topicIcons = [Apple, Footprints, CalendarHeart, MoonStar, Flower2];
  return (
    <section className="relative overflow-hidden bg-forest-dark text-ivory" aria-labelledby="lia-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_78%_20%,rgba(199,168,102,0.18),transparent_32rem),radial-gradient(circle_at_10%_100%,rgba(36,91,73,0.6),transparent_30rem)]"
      />
      <div className="shell-wide relative grid items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div className="relative mx-auto w-full max-w-[26rem]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] rounded-b-lg ring-1 ring-champagne/40">
            <Image
              src="/images/people/lia/lia-portrait.webp"
              alt="LIA, assistente virtual da LeveLab"
              fill
              sizes="(min-width: 1024px) 26rem, 80vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
          <div aria-hidden className="absolute -inset-3 -z-0 rounded-t-[13rem] rounded-b-xl border border-champagne/25" />
          <p className="absolute -bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ivory px-4 py-2 text-xs font-semibold text-forest shadow-soft">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" /> {t.liaEyebrow}
          </p>
        </div>

        <div>
          <h2 id="lia-title" className="font-display text-[clamp(4.5rem,9vw,7rem)] font-medium leading-[0.85] tracking-[0.02em] text-ivory">
            LIA
          </h2>
          <p className="mt-3 font-display text-[clamp(1.7rem,3vw,2.3rem)] leading-tight text-ivory/95">{t.liaTitle}</p>
          <div className="mt-6 h-px w-16 bg-champagne" />
          <p className="mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-ivory/75">{t.liaLead}</p>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {t.liaTopics.map((topic, i) => {
              const Icon = topicIcons[i];
              return (
                <li
                  key={topic}
                  className="inline-flex items-center gap-2 rounded-full border border-champagne/35 px-4 py-2 text-sm text-ivory/90"
                >
                  <Icon className="h-4 w-4 text-champagne" strokeWidth={1.4} /> {topic}
                </li>
              );
            })}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/lia/chat`}
              className="inline-flex h-12 items-center gap-2 rounded-md bg-ivory px-6 text-[15px] font-semibold text-forest transition-colors hover:bg-cream"
            >
              {t.liaCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/lia`}
              className="inline-flex h-12 items-center gap-2 rounded-md border border-ivory/30 px-6 text-[15px] font-semibold text-ivory transition-colors hover:border-ivory/60"
            >
              {t.liaMore}
            </Link>
          </div>
          <p className="mt-6 max-w-lg text-xs leading-relaxed text-ivory/50">{t.liaNote}</p>
        </div>
      </div>
    </section>
  );
}
