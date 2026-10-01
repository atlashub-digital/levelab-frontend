import Link from 'next/link';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { ChatMockup } from '@/components/blocks/ChatMockup';
import { Leaf } from '@/components/blocks/ProductVisual';
import type { LocaleCopy } from '@/lib/i18n';

export function Hero({ locale, copy }: { locale: string; copy: LocaleCopy }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_82%_-4%,rgba(183,154,91,0.22),transparent_32rem),radial-gradient(circle_at_2%_14%,rgba(21,61,49,0.06),transparent_26rem)]"
      />
      <Leaf className="pointer-events-none absolute -right-24 top-10 hidden h-[420px] w-[420px] text-forest/[0.06] md:block [transform:rotate(8deg)]" />
      <Leaf className="pointer-events-none absolute -left-24 bottom-0 hidden h-[320px] w-[320px] text-gold/10 lg:block [transform:rotate(-12deg)]" />

      <div className="shell grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative">
          <span className="eyebrow inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            {copy.hero.eyebrow}
          </span>
          <h1 className="mt-4 text-balance text-[clamp(2.5rem,6vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-ink">
            {copy.hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            {copy.hero.lead}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/programas`}
              className="inline-flex h-14 items-center gap-2 rounded-full bg-forest px-8 text-base font-semibold text-white shadow-soft transition-all hover:bg-forest-2 hover:shadow-lift"
            >
              <Sparkles className="h-4 w-4" />
              {copy.hero.primary}
            </Link>
            <Link
              href={`/${locale}/lia`}
              className="inline-flex h-14 items-center gap-2 rounded-full border border-forest/25 px-8 text-base font-semibold text-forest transition-colors hover:border-forest/50 hover:bg-forest/5"
            >
              <MessageCircle className="h-4 w-4" />
              {copy.hero.secondary}
            </Link>
          </div>
          <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-gold" />
              8 semanas de método
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-forest-2" />
              LIA + apoio humano
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-olive" />
              Conteúdo premium
            </div>
          </dl>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2.75rem] bg-gradient-forest opacity-[0.07] blur-2xl"
          />
          <div className="relative">
            <ChatMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
