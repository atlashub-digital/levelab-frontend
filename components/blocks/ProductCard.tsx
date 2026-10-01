import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
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
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
    >
      <ProductVisual monogram={monogram} accent={product.accent} label={product.format} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="ivory" className="capitalize">
            {product.category.replace('-', ' ')}
          </Badge>
          {product.badge ? <Badge variant="gold">{product.badge}</Badge> : null}
          {product.status === 'soon' ? <Badge variant="outline">Em breve</Badge> : null}
        </div>
        <div>
          <h3 className="font-display text-xl font-medium text-ink">{product.title}</h3>
          <p className="text-sm text-muted">{product.subtitle}</p>
        </div>
        <p className="text-[15px] leading-relaxed text-ink/80">{product.tagline}</p>
        <div className="mt-auto flex items-end justify-between pt-2">
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
          <Button
            href={href}
            size="sm"
            variant="secondary"
            aria-label={`Ver ${product.title}`}
          >
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Link href={href} className="sr-only">
        Abrir {product.title}
      </Link>
    </article>
  );
}
