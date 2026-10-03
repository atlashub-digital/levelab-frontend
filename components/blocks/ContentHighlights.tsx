import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/blocks/ProductCard';
import { products } from '@/lib/content/store';
import { SectionHeading } from '@/components/ui/Section';
import type { Locale, LocaleCopy } from '@/lib/i18n';

export function ContentHighlights({ locale, copy }: { locale: Locale; copy: LocaleCopy }) {
  const featured = products.slice(0, 3);
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Conteúdos em destaque"
            title="Editorial premium pronto para si"
            intro="Programas, guias e e-books para apoiar a sua rotina — com clareza e cuidado."
          />
          <Link
            href={`/${locale}/conteudos`}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-sm font-semibold text-forest transition-colors hover:border-forest/50 hover:bg-forest/5"
          >
            {copy.common.viewAll}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
