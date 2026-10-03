'use client';

import { useMemo, useState } from 'react';
import {
  BookMarked,
  BookOpen,
  Clock,
  Crown,
  Filter,
  LayoutGrid,
  NotebookPen,
  Salad,
  Sprout,
  X,
} from 'lucide-react';
import { ProductTile } from '@/components/catalog/ProductTile';
import { cn } from '@/lib/utils';
import {
  goalLabels,
  productCategories,
  products,
  type ProductCategory,
  type ProductGoal,
} from '@/lib/content/store';

type CategoryId = ProductCategory | 'todos' | 'em-breve';
type Sort = 'relevance' | 'available' | 'az';

const categoryIcons: Record<CategoryId, typeof LayoutGrid> = {
  todos: LayoutGrid,
  programas: Sprout,
  'e-books': BookOpen,
  workbooks: NotebookPen,
  guias: BookMarked,
  receitas: Salad,
  assinaturas: Crown,
  'em-breve': Clock,
};

/** Filterable catalog (Maquete Loja): category tabs, sidebar filters, grid. */
export function CatalogBrowser({ locale }: { locale: string }) {
  const [category, setCategory] = useState<CategoryId>('todos');
  const [goals, setGoals] = useState<ProductGoal[]>([]);
  const [formats, setFormats] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>('relevance');
  const [drawer, setDrawer] = useState(false);

  const byCategory = (id: CategoryId) =>
    id === 'todos' ? products : id === 'em-breve' ? products.filter((p) => p.status === 'soon') : products.filter((p) => p.category === id);

  const list = useMemo(() => {
    let items = byCategory(category);
    if (goals.length) items = items.filter((p) => p.goals.some((g) => goals.includes(g)));
    if (formats.length) items = items.filter((p) => formats.includes(p.formatType));
    if (sort === 'available') items = [...items].sort((a, b) => Number(b.status === 'live') - Number(a.status === 'live'));
    if (sort === 'az') items = [...items].sort((a, b) => a.title.localeCompare(b.title, 'pt'));
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, goals, formats, sort]);

  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const clear = () => {
    setCategory('todos');
    setGoals([]);
    setFormats([]);
  };

  const filters = (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-display text-lg text-ink">
          <Filter className="h-4 w-4 text-gold" /> Filtrar por
        </p>
        <button type="button" onClick={clear} className="text-xs text-muted hover:text-forest hover:underline">
          Limpar filtros
        </button>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Categoria</legend>
        <ul className="mt-3 space-y-2">
          {productCategories.map((c) => (
            <li key={c.id}>
              <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ink/80">
                <input
                  type="radio"
                  name="categoria"
                  checked={category === c.id}
                  onChange={() => setCategory(c.id)}
                  className="h-4 w-4 accent-forest"
                />
                {c.label} <span className="text-muted">({byCategory(c.id).length})</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Objetivo</legend>
        <ul className="mt-3 space-y-2">
          {(Object.keys(goalLabels) as ProductGoal[]).map((g) => (
            <li key={g}>
              <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ink/80">
                <input
                  type="checkbox"
                  checked={goals.includes(g)}
                  onChange={() => setGoals((v) => toggle(v, g))}
                  className="h-4 w-4 accent-forest"
                />
                {goalLabels[g]} <span className="text-muted">({products.filter((p) => p.goals.includes(g)).length})</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Formato</legend>
        <ul className="mt-3 space-y-2">
          {[
            ['digital', 'Digital'],
            ['acompanhamento', 'Com acompanhamento'],
          ].map(([id, label]) => (
            <li key={id}>
              <label className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ink/80">
                <input
                  type="checkbox"
                  checked={formats.includes(id)}
                  onChange={() => setFormats((v) => toggle(v, id))}
                  className="h-4 w-4 accent-forest"
                />
                {label} <span className="text-muted">({products.filter((p) => p.formatType === id).length})</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <p className="rounded-lg bg-cream/70 p-3 text-xs leading-relaxed text-ink/70">
        Os preços serão publicados quando a loja abrir. Para acesso imediato, fale conosco.
      </p>
    </div>
  );

  return (
    <div className="shell-wide pb-16">
      {/* Category tabs */}
      <nav aria-label="Categorias" className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 py-6">
        {productCategories.map((c) => {
          const Icon = categoryIcons[c.id];
          const active = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              aria-pressed={active}
              className={cn(
                'inline-flex h-11 shrink-0 items-center gap-2 rounded-md border px-4 text-[13.5px] font-medium transition-colors',
                active ? 'border-forest bg-forest text-ivory' : 'border-line bg-paper text-ink/80 hover:border-forest/40',
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} /> {c.label}
            </button>
          );
        })}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-lg bg-paper p-5 ring-1 ring-line">{filters}</div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink/70" aria-live="polite">
              <strong className="font-semibold text-ink">{list.length}</strong> conteúdos encontrados
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDrawer(true)}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-line bg-paper px-3 text-sm font-medium text-ink lg:hidden"
              >
                <Filter className="h-4 w-4" /> Filtros
              </button>
              <label className="flex items-center gap-2 text-sm text-ink/70">
                Ordenar por
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-10 rounded-md border border-line bg-paper px-2 text-sm text-ink focus:border-forest/40 focus:outline-none"
                >
                  <option value="relevance">Mais relevantes</option>
                  <option value="available">Disponíveis primeiro</option>
                  <option value="az">A–Z</option>
                </select>
              </label>
            </div>
          </div>

          {list.length ? (
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((p) => (
                <li key={p.id}>
                  <ProductTile product={p} locale={locale} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 rounded-lg bg-paper p-8 text-center text-ink/70 ring-1 ring-line">
              Nenhum conteúdo corresponde a estes filtros.{' '}
              <button type="button" onClick={clear} className="font-semibold text-forest underline">
                Limpar filtros
              </button>
            </p>
          )}
        </div>
      </div>

      {drawer ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros">
          <button type="button" aria-label="Fechar" className="absolute inset-0 bg-ink/40" onClick={() => setDrawer(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-ivory p-6 shadow-lift">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Fechar filtros"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filters}
            <button
              type="button"
              onClick={() => setDrawer(false)}
              className="mt-6 h-12 w-full rounded-md bg-forest text-[15px] font-semibold text-ivory"
            >
              Ver {list.length} conteúdos
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
