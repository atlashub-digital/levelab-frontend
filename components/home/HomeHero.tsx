import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, HeartHandshake, MessageCircle, Sprout, Users } from 'lucide-react';
import { OliveBranch } from '@/components/blocks/OliveBranch';
import type { V2Copy } from '@/lib/i18n-v2';

/** Editorial hero (Maquete Home): brand first, photography right, LIA as a secondary CTA. */
export function HomeHero({ locale, copy }: { locale: string; copy: V2Copy }) {
  const t = copy.home;
  const trustIcons = [Sprout, BookOpenCheck, HeartHandshake, Users];

  return (
    <section className="relative overflow-hidden bg-cream">
      {/* Photography — full-bleed on the right, fades into the cream canvas */}
      <div className="relative h-[19rem] sm:h-[24rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[56%]">
        <Image
          src="/images/lifestyle/hero-home.webp"
          alt="Mulher sorridente a descansar ao sol, num terraço com plantas"
          fill
          priority
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-[55%_30%] lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_24%)]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream lg:hidden" />
        <p className="font-script absolute left-6 top-6 hidden max-w-[15rem] rotate-[-6deg] text-[2.1rem] text-gold drop-shadow-[0_1px_0_rgba(251,247,237,0.7)] md:block lg:left-[5%] lg:top-[11%]">
          {t.script}
        </p>
        <div className="absolute bottom-8 right-8 hidden h-36 w-36 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#e6d3a3,#c7a866_55%,#a87839)] p-5 text-center shadow-card ring-1 ring-ivory/40 md:flex lg:bottom-14 lg:right-[34%]">
          <span className="font-display text-[1.15rem] italic leading-tight text-forest-dark">{t.badge}</span>
        </div>
      </div>

      <OliveBranch className="pointer-events-none absolute -left-10 -top-6 hidden h-56 w-56 text-forest lg:block" thin />

      <div className="shell-wide relative">
        <div className="max-w-[40rem] py-10 lg:py-[4.5rem]">
          <p className="eyebrow reveal">{t.eyebrow}</p>
          <h1 className="display-xl mt-5 text-balance text-ink reveal">
            {t.title[0]}
            <em className="font-display italic text-gold">{t.title[1]}</em>
          </h1>
          <p className="mt-6 max-w-[34rem] text-pretty text-[1.05rem] leading-relaxed text-ink/75">{t.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/programas`}
              className="inline-flex h-12 items-center gap-2 rounded-md bg-forest px-6 text-[15px] font-semibold text-ivory shadow-soft transition-colors hover:bg-forest-2"
            >
              {t.ctaPrograms} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/lia`}
              className="inline-flex h-12 items-center gap-2 rounded-md border border-forest/30 bg-ivory/60 px-6 text-[15px] font-semibold text-forest transition-colors hover:border-forest hover:bg-ivory"
            >
              <MessageCircle className="h-4 w-4" /> {t.ctaLia}
            </Link>
          </div>
          <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap lg:flex-nowrap">
            {t.trust.map((label, i) => {
              const Icon = trustIcons[i];
              return (
                <li key={label} className="flex items-center gap-2 whitespace-nowrap text-[12px] text-ink/70">
                  <Icon className="h-[18px] w-[18px] text-gold" strokeWidth={1.4} />
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
