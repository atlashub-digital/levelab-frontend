'use client';

import { useMemo, useState } from 'react';
import {
  ArrowDownUp,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { ProductCard } from '@/components/blocks/ProductCard';
import {
  products as allProducts,
  productCategories,
  featuredBundle,
  type Product,
  type ProductCategory,
  getCurrencyForLocale,
} from '@/lib/content/store';
import type { Locale } from '@/lib/i18n';

type SortKey = 'recomendados' | 'preco-asc' | 'preco-desc' | 'novidades';

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'recomendados', label: 'Recomendados' },
  { key: 'preco-asc', label: 'Preço ↑' },
  { key: 'preco-desc', label: 'Preço ↓' },
  { key: 'novidades', label: 'Novidades' },
];

const ALL_CATEGORIES: ProductCategory[] = [
  'programas',
  'e-books',
  'workbooks',
  'guias',
  'receitas',
  'assinaturas',
  'em-breve',
];

/**
 * LeveLab premium shop catalog.
 * Client-side filtering of the static mock catalog. The future LeveLab Store
 * will plug in live catalog + entitlements via the same component surface.
 */
export function ShopCatalog({ locale }: { locale: Locale }) {
  const { locale: intl, currency } = getCurrencyForLocale(locale);
  const maxPrice = useMemo(
    () => Math.max(...allProducts.map((p) => p.price)),
    [],
  );

  // State — category multi-select, format multi-select, price cap, sort.
  const [selectedCats, setSelectedCats] = useState<Set<ProductCategory>>(
    () => new Set(ALL_CATEGORIES),
  );
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(
    () => new Set(),
  );
  const [priceCap, setPriceCap] = useState<number>(maxPrice);
  const [sort, setSort] = useState<SortKey>('recomendados');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Distinct formats in the catalog (for the format checkboxes).
  const formatOptions = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of allProducts) {
      if (!seen.has(p.format)) {
        seen.set(p.format, p.format);
      }
    }
    return Array.from(seen.values());
  }, []);

  const filtered = useMemo(() => {
    let list: Product[] = allProducts.filter(
      (p) => selectedCats.has(p.category) && p.price <= priceCap,
    );
    if (selectedFormats.size > 0) {
      list = list.filter((p) => selectedFormats.has(p.format));
    }
    const sorted = [...list];
    switch (sort) {
      case 'preco-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'preco-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'novidades':
        // "Novo" badge first, then by status (live before soon), then default order.
        sorted.sort((a, b) => {
          const an = a.badge === 'Novo' ? 0 : 1;
          const bn = b.badge === 'Novo' ? 0 : 1;
          if (an !== bn) return an - bn;
          const as = a.status === 'soon' ? 1 : 0;
          const bs = b.status === 'soon' ? 1 : 0;
          return as - bs;
        });
        break;
      case 'recomendados':
      default:
        // Default catalog order — keep as-is.
        break;
    }
    return sorted;
  }, [selectedCats, selectedFormats, priceCap, sort]);

  function toggleCategory(cat: ProductCategory) {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      // Never allow zero categories — fall back to "all" if user unchecks the last one.
      if (next.size === 0) return new Set(ALL_CATEGORIES);
      return next;
    });
  }

  function selectPreset(id: ProductCategory | 'todos') {
    if (id === 'todos') {
      setSelectedCats(new Set(ALL_CATEGORIES));
    } else {
      setSelectedCats(new Set([id]));
    }
  }

  function toggleFormat(format: string) {
    setSelectedFormats((prev) => {
      const next = new Set(prev);
      if (next.has(format)) next.delete(format);
      else next.add(format);
      return next;
    });
  }

  function clearFilters() {
    setSelectedCats(new Set(ALL_CATEGORIES));
    setSelectedFormats(new Set());
    setPriceCap(maxPrice);
    setSort('recomendados');
  }

  const isAllSelected = selectedCats.size === ALL_CATEGORIES.length;
  const activePill: ProductCategory | 'todos' = isAllSelected
    ? 'todos'
    : selectedCats.size === 1
      ? Array.from(selectedCats)[0]
      : 'todos';

  const filtersPanel = (
    <div className="flex flex-col gap-7">
      <FilterGroup title="Categoria">
        <div className="flex flex-col gap-1.5">
          {productCategories
            .filter((c) => c.id !== 'todos')
            .map((c) => {
              const id = c.id as ProductCategory;
              const checked = selectedCats.has(id);
              return (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-sm text-ink transition-colors hover:bg-forest/5"
                >
                  <span
                    className={cn(
                      'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors',
                      checked
                        ? 'border-forest bg-forest text-white'
                        : 'border-forest/30 bg-white text-transparent',
                    )}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleCategory(id)}
                  />
                  <span>{c.label}</span>
                </label>
              );
            })}
        </div>
      </FilterGroup>

      <FilterGroup title="Formato">
        <div className="flex flex-col gap-1.5">
          {formatOptions.map((f) => {
            const checked = selectedFormats.has(f);
            return (
              <label
                key={f}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 text-sm text-ink transition-colors hover:bg-forest/5"
              >
                <span
                  className={cn(
                    'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border transition-colors',
                    checked
                      ? 'border-forest bg-forest text-white'
                      : 'border-forest/30 bg-white text-transparent',
                  )}
                >
                  <Check className="h-3 w-3" />
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleFormat(f)}
                />
                <span>{f}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Preço máximo">
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted">até</span>
            <span className="font-display text-base font-medium text-forest">
              {formatPrice(priceCap, intl, currency)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={10}
            value={priceCap}
            onChange={(e) => setPriceCap(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-sage accent-forest"
            aria-label="Preço máximo"
          />
          <div className="flex justify-between text-[11px] text-muted">
            <span>{formatPrice(0, intl, currency)}</span>
            <span>{formatPrice(maxPrice, intl, currency)}</span>
          </div>
        </div>
      </FilterGroup>

      <button
        type="button"
        onClick={clearFilters}
        className="self-start text-xs font-semibold uppercase tracking-wider text-forest-2 transition-colors hover:text-forest"
      >
        Limpar filtros
      </button>
    </div>
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-forest/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_85%_-10%,rgba(183,154,91,0.18),transparent_28rem),radial-gradient(circle_at_0%_40%,rgba(21,61,49,0.05),transparent_22rem)]"
        />
        <div className="shell py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Conteúdos · Loja LeveLab
            </span>
            <h1 className="mt-4 text-balance font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.04] text-ink">
              Programas, guias e editorial para acompanhar a sua rotina.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              Conteúdo premium com método LeveLab — aprendizado, aplicação e
              progresso. Cada item é educativo e calmo; nada de promessas
              rápidas ou clínicas.
            </p>
          </div>
        </div>
      </section>

      {/* Featured bundle banner */}
      <section className="py-12 md:py-16">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-forest/10 bg-gradient-forest p-6 text-ivory shadow-card md:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.12] [background:radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:20px_20px]"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <Badge variant="gold">Pacote em destaque</Badge>
                <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-tight">
                  {featuredBundle.title}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-gold-soft">
                  {featuredBundle.subtitle}
                </p>
                <p className="mt-4 max-w-lg text-ivory/80">
                  {featuredBundle.description}
                </p>
                <ul className="mt-6 flex flex-col gap-2">
                  {featuredBundle.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ivory/90">
                      <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-[10px] font-bold text-ink">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-ivory/15 bg-ivory/5 p-6 backdrop-blur">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-medium text-ivory">
                    {formatPrice(featuredBundle.price, intl, currency)}
                  </span>
                  <span className="text-base text-ivory/60 line-through">
                    {formatPrice(featuredBundle.compareAtPrice, intl, currency)}
                  </span>
                </div>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                  {featuredBundle.discountLabel}
                </span>
                <div className="mt-6">
                  <Button
                    href={`/${locale}${featuredBundle.path}`}
                    variant="gold"
                    className="w-full"
                  >
                    Ver pacote
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-3 text-[11px] text-ivory/60">
                  Compra futura via LeveLab Store (em breve).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="border-t border-forest/10 bg-cream/40">
        <div className="shell py-6">
          <div className="flex flex-wrap items-center gap-2">
            {productCategories.map((c) => {
              const isActive = activePill === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => selectPreset(c.id)}
                  className={cn(
                    'inline-flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-forest bg-forest text-white'
                      : 'border-forest/15 bg-white text-forest hover:border-forest/40',
                  )}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catalog grid + sidebar */}
      <section className="py-12 md:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-forest/10 bg-white p-6 shadow-soft">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-forest-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtrar
              </div>
              {filtersPanel}
            </div>
          </aside>

          {/* Mobile filter toggle */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-forest/25 bg-white px-5 text-sm font-semibold text-forest shadow-soft"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtrar
              {(selectedCats.size !== ALL_CATEGORIES.length || selectedFormats.size > 0 || priceCap !== maxPrice) ? (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1.5 text-[11px] font-bold text-white">
                  {selectedFormats.size + (selectedCats.size !== ALL_CATEGORIES.length ? 1 : 0)}
                </span>
              ) : null}
            </button>
          </div>

          {/* Grid + sort bar */}
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'conteúdo' : 'conteúdos'}
              </p>
              <div className="flex items-center gap-2">
                <ArrowDownUp className="h-4 w-4 text-muted" />
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="h-10 cursor-pointer appearance-none rounded-full border border-forest/15 bg-white pl-4 pr-9 text-sm font-medium text-ink transition-colors hover:border-forest/40"
                    aria-label="Ordenar por"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.key} value={o.key}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-forest/20 bg-white p-12 text-center">
                <p className="font-display text-xl text-ink">Nenhum conteúdo encontrado</p>
                <p className="mt-2 text-sm text-muted">
                  Ajuste os filtros ou limpe para ver tudo.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-forest px-5 text-sm font-semibold text-white"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} locale={locale} />
                ))}
              </div>
            )}

            <SortLegend />
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(86%,420px)] flex-col bg-ivory p-6 shadow-lift">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-display text-lg font-semibold text-ink">
                <SlidersHorizontal className="h-4 w-4 text-forest" />
                Filtrar
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest/15 text-forest"
                aria-label="Fechar filtros"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-soft pr-1">
              {filtersPanel}
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-white"
            >
              Ver {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </p>
      {children}
    </div>
  );
}

function SortLegend() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-forest/10 bg-cream/50 px-5 py-4 text-[11px] text-muted">
      <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-forest-2">
        <ArrowUp className="h-3 w-3" /> Preço ↑
      </span>
      <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-forest-2">
        <ArrowDown className="h-3 w-3" /> Preço ↓
      </span>
      <span>·</span>
      <span>Recomendados = ordem editorial curada</span>
      <span>·</span>
      <span>Novidades = lançamentos e badges "Novo" primeiro</span>
    </div>
  );
}
