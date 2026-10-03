import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductVisual } from '@/components/blocks/ProductVisual';
import type { Product } from '@/lib/content/store';
import type { Locale } from '@/lib/i18n';

/**
 * Product card for the LeveLab store / catalogue.
 *
 * Spec (levelab-zai-ui-spec-v1.0.json → pages.store.commerce_phase):
 *   price_rule = "Do not hard-code the Euro prices visible in the visual mockup.
 *   Prices remain config/API driven and can be hidden until confirmed."
 *
 * V1 does NOT render any price block. When `product.price` is `undefined`
 * (the V1 default), this card renders nothing for price. A future phase-2
 * catalog provider can populate `price` / `compareAtPrice` and this card
 * will pick them up automatically (rendering logic is gated on `!= null`).
 *
 * Maquette motifs (Task D):
 *   - Category badge moves to a TOP-LEFT OVERLAY on the ProductVisual area
 *     (absolute positioned over the gradient cover). Spec/status badges
 *     (Novo / Premium / Em breve) sit on the top-right.
 *   - "Ver detalhes" is a solid dark green block button at the bottom of
 *     the card (full-width). No cart icon in V1 (no checkout yet).
 */
export function ProductCard({
  product,
  locale,
  className,
}: {
  product: Product;
  locale: Locale;
  className?: string;
}) {
  const href = `/${locale}${product.path}`;
  const monogram = product.title.charAt(0);
  const showPrice = product.price != null;
  const showCompareAt = product.compareAtPrice != null && product.compareAtPrice > (product.price ?? 0);

  const categoryLabel = product.category.replace('-', ' ');

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      <div className="relative">
        <ProductVisual monogram={monogram} accent={product.accent} label={product.format} />
        {/* Maquette: top-left category overlay on the cover area. */}
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-forest shadow-soft backdrop-blur">
          {categoryLabel}
        </span>
        {/* Maquette: status / quality badge top-right. */}
        {product.badge ? (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink shadow-soft">
            {product.badge}
          </span>
        ) : null}
        {product.status === 'soon' ? (
          <span className="absolute right-3 top-3 inline-flex items-center rounded-full border border-ivory/40 bg-ink/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ivory shadow-soft backdrop-blur">
            Em breve
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-xl font-medium text-ink">{product.title}</h3>
          <p className="text-sm text-muted">{product.subtitle}</p>
        </div>
        <p className="text-[15px] leading-relaxed text-ink/80">{product.tagline}</p>
        {showPrice ? (
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-medium text-forest">
              {/* Prices are rendered via the formatPrice helper when defined.
                  V1 default: undefined → no price rendered at all. */}
              {product.price!.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            {showCompareAt ? (
              <span className="text-sm text-muted line-through">
                {product.compareAtPrice!.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            ) : null}
          </div>
        ) : (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            {product.comingSoon ? 'Em breve' : 'Ver detalhes'}
          </span>
        )}
        {/* Maquette: solid dark green block button at the bottom of the card. */}
        <div className="mt-auto pt-2">
          <Link
            href={href}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-forest text-sm font-semibold text-white transition-colors hover:bg-forest-2"
            aria-label={`Ver ${product.title}`}
          >
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <Link href={href} className="sr-only">
        Abrir {product.title}
      </Link>
    </article>
  );
}
