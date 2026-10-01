import Link from 'next/link';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { ChatMockup } from '@/components/blocks/ChatMockup';
import { Leaf } from '@/components/blocks/ProductVisual';
import { ValueBadge } from '@/components/blocks/ValueBadge';
import { OliveBranch } from '@/components/blocks/OliveBranch';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import type { LocaleCopy } from '@/lib/i18n';

export function Hero({ locale, copy }: { locale: string; copy: LocaleCopy }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_82%_-4%,rgba(183,154,91,0.22),transparent_32rem),radial-gradient(circle_at_2%_14%,rgba(21,61,49,0.06),transparent_26rem)]"
      />
      {/* Maquette motif: prominent botanical Leaf overlays framing the hero. */}
      <Leaf className="pointer-events-none absolute -right-28 top-4 hidden h-[520px] w-[520px] text-forest/[0.10] md:block [transform:rotate(10deg)]" />
      <Leaf className="pointer-events-none absolute -left-28 bottom-[-4rem] hidden h-[380px] w-[380px] text-gold/[0.14] lg:block [transform:rotate(-14deg)]" />
      {/* Olive branches framing corners (subtle, behind content). */}
      <OliveBranch
        orientation="left"
        thin
        className="pointer-events-none absolute -left-4 top-2 hidden h-44 w-44 text-forest/30 md:block"
      />
      <OliveBranch
        orientation="right"
        thin
        className="pointer-events-none absolute -right-4 bottom-6 hidden h-40 w-40 text-gold/50 md:block"
      />

      <div className="shell relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative">
          <span className="eyebrow inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            {copy.hero.eyebrow}
          </span>
          <h1 className="mt-4 text-balance text-[clamp(2.5rem,6vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-ink">
            {copy.hero.headline}
          </h1>
          {/* Maquette motif: handwritten script accent near the headline. */}
          <ScriptAccent
            className="mt-4 text-forest-2"
            rotate={-3}
            heart
          >
            Mais conversa. Mais equilíbrio.
          </ScriptAccent>
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
              <ArrowRight className="h-4 w-4" />
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
          {/* Maquette motif: circular gold ValueBadge overlapping the
              chat card on the right — visual anchor with a short phrase.
              Approved lifestyle photography should be dropped in to replace
              the botanical placeholder accents (no stock photos in V1). */}
          <div className="absolute -right-4 -top-6 z-10 hidden sm:block">
            <ValueBadge size="md" eyebrow="Orientação real">
              para uma vida mais leve.
            </ValueBadge>
          </div>
        </div>
      </div>
    </section>
  );
}
