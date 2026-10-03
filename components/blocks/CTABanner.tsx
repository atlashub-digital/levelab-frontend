import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Leaf } from '@/components/blocks/ProductVisual';

type CTABannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tone?: 'forest' | 'gold' | 'light';
  className?: string;
};

export function CTABanner({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  tone = 'forest',
  className,
}: CTABannerProps) {
  const tones = {
    forest: 'bg-gradient-forest text-ivory',
    gold: 'bg-gradient-gold text-ink',
    light: 'bg-white text-ink border border-forest/10',
  };
  const primaryCls = {
    forest: 'bg-gradient-gold text-ink hover:opacity-90',
    gold: 'bg-forest text-white hover:bg-forest-2',
    light: 'bg-forest text-white hover:bg-forest-2',
  };
  const secondaryCls = {
    forest: 'border-ivory/30 text-ivory hover:bg-ivory/10',
    gold: 'border-ink/20 text-ink hover:bg-ink/5',
    light: 'border-forest/25 text-forest hover:bg-forest/5',
  };

  return (
    <section className={cn('py-12', className)}>
      <div className="shell">
        <div
          className={cn(
            'relative overflow-hidden rounded-[2.5rem] px-6 py-12 shadow-card md:px-14 md:py-14',
            tones[tone],
          )}
        >
          <Leaf className="absolute -right-16 -top-16 h-72 w-72 text-current opacity-10 [transform:rotate(12deg)]" />
          <Leaf className="absolute -bottom-20 -left-16 h-64 w-64 text-current opacity-10 [transform:rotate(-12deg)]" />
          <div className="relative max-w-2xl">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-current opacity-80">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-medium leading-tight text-balance">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-current opacity-80">{description}</p>
            ) : null}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={primaryHref}
                className={cn(
                  'inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-semibold shadow-soft transition-all',
                  primaryCls[tone],
                )}
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {secondaryLabel && secondaryHref ? (
                <Link
                  href={secondaryHref}
                  className={cn(
                    'inline-flex h-12 items-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors',
                    secondaryCls[tone],
                  )}
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
