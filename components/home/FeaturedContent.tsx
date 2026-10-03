import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ContentCard } from '@/components/catalog/ContentCard';
import { products } from '@/lib/content/store';
import type { V2Copy } from '@/lib/i18n-v2';

const FEATURED = ['forca-na-caneta', 'corpo-forte', 'workbook-corpo-forte', 'receitas-levelab', 'plano-alimentacao'];

export function FeaturedContent({ locale, copy }: { locale: string; copy: V2Copy }) {
  const t = copy.home;
  const items = FEATURED.map((id) => products.find((p) => p.id === id)!).filter(Boolean);
  return (
    <section className="bg-ivory py-16 lg:py-20" aria-labelledby="destaques-title">
      <div className="shell-wide">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <h2 id="destaques-title" className="eyebrow text-ink">
              {t.contentEyebrow}
            </h2>
            <p className="text-sm text-ink/65">{t.contentLead}</p>
          </div>
          <Link
            href={`/${locale}/loja`}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-forest underline-offset-4 hover:underline"
          >
            {t.contentAll} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="scrollbar-none -mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-2 xl:mx-0 xl:grid xl:grid-cols-5 xl:overflow-visible xl:px-0">
          {items.map((p) => (
            <li key={p.id} className="w-[19rem] shrink-0 snap-start xl:w-auto">
              <ContentCard product={p} locale={locale} labels={{ preview: t.preview, soon: t.soon }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
