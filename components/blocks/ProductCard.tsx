import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { ProductVisual } from '@/components/blocks/ProductVisual';
import { formatPrice } from '@/lib/utils';
import { getCurrencyForLocale } from '@/lib/content/store';
import type { Product } from '@/lib/content/store';
import type { Locale } from '@/lib/i18n';

export function ProductCard({
  product,
  locale,
  className,
}: {
  product: Product;
  locale: Locale;
  className?: string;
}) {
  const { locale: intl, currency } = getCurrencyForLocale(locale);
  const href = `/${locale}${product.path}`;
  const monogram = product.title.charAt(0);
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
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-medium text-forest">
              {formatPrice(product.price, intl, currency)}
            </span>
            {product.compareAtPrice ? (
              <span className="text-sm text-muted line-through">
                {formatPrice(product.compareAtPrice, intl, currency)}
              </span>
            ) : null}
          </div>
          <Button
            href={href}
            size="sm"
            variant="secondary"
            aria-label={`Ver ${product.title}`}
          >
            Ver
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
