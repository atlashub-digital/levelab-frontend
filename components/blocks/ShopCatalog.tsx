'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { ProductCard } from '@/components/blocks/ProductCard';
import { ValueBadge } from '@/components/blocks/ValueBadge';
import { OliveBranch } from '@/components/blocks/OliveBranch';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import {
  products as allProducts,
  productCategories,
  featuredBundle,
  type Product,
  type ProductCategory,
} from '@/lib/content/store';
import type { Locale } from '@/lib/i18n';

type SortKey = 'recomendados' | 'novidades';

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'recomendados', label: 'Mais relevantes' },
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
 * Maquette-style accordion filter group. Each group is collapsible
 * (chevron toggle, single-open is the visual pattern in the maquette —
 * we allow any combination). Counts in parentheses per spec
 * ("Programas (5)"). Built with native button + state for accessibility.
 */
function FilterAccordion({
  title,
  count,
  defaultOpen = true,
  children,
}: {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-forest/10 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 py-3 text-left"
      >
        <span className="text-sm font-semibold text-ink">
          {title}
          {count != null ? (
            <span className="ml-1 text-xs font-normal text-muted">({count})</span>
          ) : null}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted transition-transform',
            open ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>
      {open ? <div className="pb-4">{children}</div> : null}
    </div>
  );
}

/** Square checkbox option with maquette-style clean look. */
function CheckboxOption({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-1.5 py-1.5 text-sm text-ink transition-colors hover:bg-forest/5">
      <span
        className={cn(
          'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors',
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
        onChange={onToggle}
      />
      <span className="flex-1">{label}</span>
      {count != null ? <span className="text-xs text-muted">{count}</span> : null}
    </label>
  );
}

export function ShopCatalog({ locale }: { locale: Locale }) {
  const [selectedCats, setSelectedCats] = useState<Set<ProductCategory>>(
    () => new Set(ALL_CATEGORIES),
  );
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(
    () => new Set(),
  );
  const [selectedObjectives, setSelectedObjectives] = useState<Set<string>>(
    () => new Set(),
  );
  const [sort, setSort] = useState<SortKey>('recomendados');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Distinct formats in the catalog (with counts).
  const formatOptions = useMemo(() => {
    const seen = new Map<string, number>();
    for (const p of allProducts) {
      seen.set(p.format, (seen.get(p.format) ?? 0) + 1);
    }
    return Array.from(seen.entries()).map(([label, count]) => ({ label, count }));
  }, []);

  // Category counts (mock — count by category in the static catalog).
  const categoryCounts = useMemo(() => {
    const counts = new Map<ProductCategory, number>();
    for (const p of allProducts) {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    return counts;
  }, []);

  // Objective options — visual/mock multi-select. Spec (Task D brief):
  //   "Mais energia", "Força e movimento", "Rotina", "Sono".
  // Does NOT filter the list (no product has an "objective" field in V1).
  const objectiveOptions: { id: string; label: string }[] = [
    { id: 'mais-energia', label: 'Mais energia' },
    { id: 'forca-movimento', label: 'Força e movimento' },
    { id: 'rotina', label: 'Rotina' },
    { id: 'sono', label: 'Sono' },
  ];

  const filtered = useMemo(() => {
    let list: Product[] = allProducts.filter((p) => selectedCats.has(p.category));
    if (selectedFormats.size > 0) {
      list = list.filter((p) => selectedFormats.has(p.format));
    }
    const sorted = [...list];
    switch (sort) {
      case 'novidades':
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
        break;
    }
    return sorted;
  }, [selectedCats, selectedFormats, sort]);

  function toggleCategory(cat: ProductCategory) {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
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

  function toggleObjective(id: string) {
    setSelectedObjectives((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearFilters() {
    setSelectedCats(new Set(ALL_CATEGORIES));
    setSelectedFormats(new Set());
    setSelectedObjectives(new Set());
    setSort('recomendados');
  }

  const isAllSelected = selectedCats.size === ALL_CATEGORIES.length;
  const activePill: ProductCategory | 'todos' = isAllSelected
    ? 'todos'
    : selectedCats.size === 1
      ? Array.from(selectedCats)[0]
      : 'todos';

  const activeFiltersCount =
    (selectedCats.size !== ALL_CATEGORIES.length ? 1 : 0) +
    selectedFormats.size +
    selectedObjectives.size;

  const filtersPanel = (
    <div className="flex flex-col">
      {/* Maquette: "Filtrar por" header with funnel icon + "Limpar filtros" link. */}
      <div className="flex items-center justify-between gap-2 pb-4">
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-forest-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filtrar por
        </span>
        <button
          type="button"
          onClick={clearFilters}
          className="text-[11px] font-semibold uppercase tracking-wider text-gold transition-colors hover:text-forest"
        >
          Limpar filtros
        </button>
      </div>

      <FilterAccordion
        title="Categoria"
        count={productCategories.filter((c) => c.id !== 'todos').length}
      >
        <div className="flex flex-col gap-1">
          {productCategories
            .filter((c) => c.id !== 'todos')
            .map((c) => {
              const id = c.id as ProductCategory;
              const checked = selectedCats.has(id);
              return (
                <CheckboxOption
                  key={c.id}
                  label={c.label}
                  count={categoryCounts.get(id) ?? 0}
                  checked={checked}
                  onToggle={() => toggleCategory(id)}
                />
              );
            })}
        </div>
      </FilterAccordion>

      <FilterAccordion title="Objetivo" count={objectiveOptions.length}>
        <div className="flex flex-col gap-1">
          {objectiveOptions.map((o) => {
            const checked = selectedObjectives.has(o.id);
            return (
              <CheckboxOption
                key={o.id}
                label={o.label}
                checked={checked}
                onToggle={() => toggleObjective(o.id)}
              />
            );
          })}
        </div>
        <p className="mt-2 text-[11px] italic text-muted">
          Filtro visual — será ligado ao catálogo backend em breve.
        </p>
      </FilterAccordion>

      <FilterAccordion
        title="Formato"
        count={formatOptions.length}
      >
        <div className="flex flex-col gap-1">
          {formatOptions.map((f) => {
            const checked = selectedFormats.has(f.label);
            return (
              <CheckboxOption
                key={f.label}
                label={f.label}
                count={f.count}
                checked={checked}
                onToggle={() => toggleFormat(f.label)}
              />
            );
          })}
        </div>
      </FilterAccordion>

      <FilterAccordion title="Preço">
        <p className="text-xs text-muted">O preço confirmado aparece no produto correspondente. Outras ofertas ainda estão em preparação.</p>
      </FilterAccordion>
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
              Conteúdo e Loja
            </span>
            <h1 className="mt-4 text-balance font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.04] text-ink">
              Programas, guias e editorial para acompanhar a sua rotina.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              Conteúdo premium com método LeveLab — aprendizado, aplicação e
              progresso. Os produtos aprovados apresentam o preço individual;
              as ofertas em revisão continuam assinaladas como em preparação.
              Sem promessas de resultados ou subscrições automáticas.
            </p>
          </div>
        </div>
      </section>

      {/* Featured bundle banner — maquette motif: circular gold ValueBadge
          (-20%) on the right + OliveBranch motifs in corners + script accent. */}
      <section className="py-12 md:py-16">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-forest/10 bg-gradient-forest p-6 text-ivory shadow-card md:p-12">
            <OliveBranch
              orientation="left"
              thin
              className="pointer-events-none absolute -left-2 -top-2 h-40 w-40 text-gold/60"
            />
            <OliveBranch
              orientation="right"
              thin
              className="pointer-events-none absolute -right-2 bottom-0 h-44 w-44 text-gold/60"
            />
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
                {/* Maquette: script accent inside the bundle. */}
                <div className="mt-6">
                  <ScriptAccent className="text-ivory/90" rotate={-2}>
                    Mais que conteúdos. Uma jornada completa.
                  </ScriptAccent>
                </div>
              </div>
              <div className="relative rounded-3xl border border-ivory/15 bg-ivory/5 p-6 backdrop-blur">
                {/* V2: sem desconto fictício; o workbook já integra a compra. */}
                <div className="absolute -right-3 -top-6 z-10">
                  <ValueBadge size="md" eyebrow="Acompanha">
                    Workbook
                  </ValueBadge>
                </div>
                <p className="font-display text-xl font-medium text-ivory">
                  Bundle essencial
                </p>
                <p className="mt-1 text-sm text-ivory/70">
                  Livro digital + Caderno O Meu Corpo em Construção.
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-gold-soft">
                  Oferta editorial validada · pagamento PIX em integração
                </p>
                {featuredBundle.price != null ? (
                  <p className="mt-4 font-display text-3xl text-ivory">
                    {featuredBundle.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    <span className="ml-2 font-sans text-xs text-ivory/70">pagamento único</span>
                  </p>
                ) : null}
                <div className="mt-6">
                  {/* Maquette: solid dark green block button "Ver detalhes". */}
                  <Button
                    href={`/${locale}${featuredBundle.path}`}
                    variant="primary"
                    className="w-full bg-forest-3 hover:bg-forest"
                  >
                    Ver detalhes
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-3 text-[11px] text-ivory/60">
                  Checkout PIX via ARO será disponibilizado após os testes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category pills (preserved for quick category jumping) */}
      <section className="border-t border-forest/10 bg-cream/40">
        <div className="shell py-6">
          <div className="flex flex-wrap items-center gap-2">
            {productCategories.map((c) => {
              const isActive = activePill === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => selectPreset(c.id as ProductCategory | 'todos')}
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
              {activeFiltersCount > 0 ? (
                <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1.5 text-[11px] font-bold text-white">
                  {activeFiltersCount}
                </span>
              ) : null}
            </button>
          </div>

          {/* Grid + sort bar */}
          <div>
            {/* Maquette: results bar with count + "Ordenar por:" dropdown. */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'conteúdo encontrado' : 'conteúdos encontrados'}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  Ordenar por:
                </span>
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
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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

function SortLegend() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-forest/10 bg-cream/50 px-5 py-4 text-[11px] text-muted">
      <span className="font-semibold uppercase tracking-wider text-forest-2">
        Recomendados
      </span>
      <span>·</span>
      <span>Ordem editorial curada</span>
      <span>·</span>
      <span>Novidades = lançamentos e badges "Novo" primeiro</span>
      <span>·</span>
      <span>
        Ordenação por preço é visual enquanto os preços não são confirmados.
      </span>
    </div>
  );
}
