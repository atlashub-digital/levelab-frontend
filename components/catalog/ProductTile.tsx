import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/content/store';

/** Catalog grid card (Maquete Loja). No prices until commerce is connected. */
export function ProductTile({ product, locale }: { product: Product; locale: string }) {
  const live = product.status === 'live';
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-paper ring-1 ring-line transition-shadow duration-300 hover:shadow-lift">
      <div
        className={cn(
          'relative aspect-[4/3] overflow-hidden',
          product.image.kind === 'cover' ? 'bg-[linear-gradient(160deg,#efe4cf,#e2d3b5)]' : 'bg-cream',
        )}
      >
        {product.image.kind === 'cover' ? (
          <div className="absolute inset-0 flex items-end justify-center pt-5">
            <div className="relative h-[92%] w-auto aspect-[720/1019] -rotate-2 shadow-[0_18px_30px_-12px_rgba(32,48,42,0.5)] transition-transform duration-500 group-hover:-rotate-1 group-hover:-translate-y-1">
              <Image src={product.image.src} alt={product.image.alt} fill sizes="200px" className="rounded-[2px] object-cover" />
            </div>
          </div>
        ) : (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1280px) 18vw, (min-width: 768px) 30vw, 90vw"
            className={cn(
              'object-cover transition-transform duration-700 group-hover:scale-[1.04]',
              !live && 'grayscale-[30%]',
            )}
            style={{ objectPosition: product.id === 'lia-companion' ? '50% 18%' : '50% 40%' }}
          />
        )}
        <span className="absolute left-3 top-3 rounded-[3px] bg-ivory/95 px-2 py-1 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-forest shadow-sm">
          {product.badge}
        </span>
        {!live ? (
          <span className="absolute right-3 top-3 rounded-full bg-forest/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ivory">
            Em breve
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-[1.4rem] leading-[1.08] text-ink">{product.title}</h3>
        <p className="mt-1.5 line-clamp-3 text-[13px] leading-relaxed text-ink/65">{product.tagline}</p>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">{product.format}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          {live ? (
            <>
              {product.readerPath ? (
                <Link
                  href={`/${locale}${product.readerPath}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-forest hover:underline hover:underline-offset-4"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Pré-visualizar
                </Link>
              ) : (
                <span />
              )}
              <Link
                href={`/${locale}${product.path}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-forest px-3.5 text-[13px] font-semibold text-ivory transition-colors hover:bg-forest-2"
              >
                Ver detalhes <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted">
              <Clock className="h-3.5 w-3.5" /> Em preparação
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
