import { ProductTile } from '@/components/catalog/ProductTile';
import type { Product } from '@/lib/content/store';

/** Kept for existing call sites (e.g. AssessmentFunnel); renders the V2 tile. */
export function ProductCard({ product, locale }: { product: Product; locale: string }) {
  return <ProductTile product={product} locale={locale} />;
}
