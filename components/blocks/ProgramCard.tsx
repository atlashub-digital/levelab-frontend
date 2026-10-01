import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Card';
import { Leaf } from '@/components/blocks/ProductVisual';
import type { LocaleCopy } from '@/lib/i18n';

export type ProgramCardItem = {
  name: string;
  duration: string;
  tagline: string;
  description: string;
  /** locale-relative path */
  path: string;
  accent: 'forest' | 'olive' | 'gold' | 'sage';
  badge?: string;
  kind?: string;
  /** Optional CTA label override (e.g. 'Ver programa' per spec). */
  ctaLabel?: string;
};

export function ProgramCard({
  item,
  locale,
  copy,
  className,
}: {
  item: ProgramCardItem;
  locale: string;
  copy: LocaleCopy;
  className?: string;
}) {
  const href = `/${locale}${item.path}`;
  const accentBg = {
    forest: 'bg-gradient-forest',
    olive: 'bg-olive/20',
    gold: 'bg-gradient-gold',
    sage: 'bg-sage',
  }[item.accent];

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      <div className={cn('absolute inset-x-0 top-0 h-1.5', accentBg)} />
      <Leaf className="absolute -right-8 -top-8 h-40 w-40 text-forest/5 [transform:rotate(20deg)]" />
      <div className="relative flex items-center justify-between">
        <Badge variant="ivory">{item.kind ?? 'Programa'}</Badge>
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          {item.duration}
        </span>
      </div>
      <h3 className="relative mt-4 font-display text-2xl font-medium text-ink">{item.name}</h3>
      <p className="relative mt-2 text-[15px] italic text-forest-2">{item.tagline}</p>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
      <div className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">
        {item.ctaLabel ?? copy.common.readMore}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
