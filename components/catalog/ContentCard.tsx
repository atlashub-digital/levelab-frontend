import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/content/store';

/**
 * Compact horizontal content card (Maquete Home → "Conteúdos em destaque").
 * Live items link to their free Reader preview; upcoming items say so.
 */
export function ContentCard({
  product,
  locale,
  labels,
}: {
  product: Product;
  locale: string;
  labels: { preview: string; soon: string };
}) {
  const live = product.status === 'live';
  const href = `/${locale}${product.readerPath ?? product.path}`;
  const body = (
    <>
      <div
        className={cn(
          'relative w-[5.5rem] shrink-0 overflow-hidden rounded-[3px] bg-cream',
          product.image.kind === 'cover' ? 'aspect-[3/4.2] shadow-card' : 'aspect-[3/4] rounded-md',
        )}
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="88px"
          className={cn('object-cover', !live && 'grayscale-[30%]')}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="w-fit rounded-[3px] border border-gold/40 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gold">
          {product.badge}
        </span>
        <h3 className="mt-2 font-display text-[1.3rem] leading-[1.08] text-ink">{product.title}</h3>
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink/65">{product.tagline}</p>
        <span
          className={cn(
            'mt-auto inline-flex items-center gap-1.5 pt-3 text-[12.5px] font-semibold',
            live ? 'text-forest' : 'text-muted',
          )}
        >
          {live ? <BookOpen className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
          {live ? labels.preview : labels.soon}
          {live ? <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /> : null}
        </span>
      </div>
    </>
  );

  const cls =
    'group flex h-full gap-4 rounded-lg bg-paper p-4 ring-1 ring-line transition-shadow duration-300';
  return live ? (
    <Link href={href} className={cn(cls, 'hover:shadow-lift')}>
      {body}
    </Link>
  ) : (
    <div className={cn(cls, 'opacity-90')} aria-label={`${product.title} — ${labels.soon}`}>
      {body}
    </div>
  );
}
