'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  Bookmark,
  MessageCircle,
  BookOpen,
  Star,
  Search,
  Timer,
  CheckCircle2,
  Circle,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LIAAvatar } from '@/components/blocks/LIAAvatar';
import { Badge } from '@/components/ui/Card';
import { Leaf } from '@/components/blocks/ProductVisual';
import { ValueBadge } from '@/components/blocks/ValueBadge';
import type { ModuleContent, ReaderAsset } from '@/lib/content/readers';
import type { ProgramMeta, ProgramWeek } from '@/lib/content/programs';
import type { LocaleCopy } from '@/lib/i18n';

/**
 * Reader shell — premium editorial PDF-style reader (V1 mock renderer).
 *
 * Spec (levelab-zai-ui-spec-v1.0.json):
 *   - pages.corpo_forte_reader.viewer.not_iframe_only = true → mock page renderer
 *     (real rendered content — NOT an iframe, NOT a screenshot).
 *   - pages.corpo_forte_reader.viewer.features: page thumbnails, chapter/week
 *     navigation, page number, zoom, search, bookmark UI, fullscreen,
 *     next/previous, responsive mobile reader, open workbook, download.
 *   - pages.forca_na_caneta_reader.right_panel: progress, 7-day navigation,
 *     today checklist (UI only until member backend integration), recipe
 *     shortcuts, LIA CTA.
 *
 * Task D maquette-faithful polish:
 *   - Breadcrumb: Programas › Corpo Forte › Reader (no Início first link).
 *   - Week tabs: rectangular two-line buttons (Semana N + short title),
 *     active = solid forest, inactive = light grey + border.
 *   - Left sidebar header: "Capítulos da Semana N" + right chevron.
 *   - Center viewer: large serif "0N" header + serif title + uppercase
 *     premium subheader (week focus only — no invented clinical claims),
 *     Leaf motif along the LEFT edge of the page.
 *   - Toolbar: page input field flanked by prev/next + `- 100% +` zoom.
 *   - Right rail progress: "O seu progresso" + "Semana N de 8" + pages read
 *     + % bar + primary "Continuar leitura →" button (advances page).
 *   - Right rail summary: interactive accordion 1–4 with chevrons,
 *     numbered (1) O que vai aprender (2) Principais conceitos
 *     (3) Experimento da semana (4) Check-out.
 *   - ValueBadge "Mais energia" overlapping the bottom-right of the viewer.
 *
 * Mock checklist + recipes are UI-only — NO backend, NO sensitive health data.
 */
export function ReaderShell({
  locale,
  copy,
  program,
  module: mod,
  asset,
  weeks,
}: {
  locale: string;
  copy: LocaleCopy;
  program: ProgramMeta;
  module: ModuleContent;
  asset?: ReaderAsset;
  weeks: ProgramWeek[];
}) {
  const [pageIdx, setPageIdx] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [bookmarked, setBookmarked] = useState(false);
  const [fs, setFs] = useState(false);
  const [query, setQuery] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(() => new Set());
  const [openSummary, setOpenSummary] = useState<number>(0);
  const pages = mod.pages;
  const totalPages = asset?.totalPages ?? pages.length;
  const current = pages[Math.min(pageIdx, pages.length - 1)];

  const readerPath =
    program.slug === 'corpo-forte'
      ? '/programas/corpo-forte/reader'
      : '/programas/forca-na-caneta/reader';
  const unit = program.slug === 'corpo-forte' ? 'Semana' : 'Dia';
  const unitShort = program.slug === 'corpo-forte' ? 'S' : 'D';
  const totalUnits = program.slug === 'corpo-forte' ? 8 : 7;

  // Mock "search results" — non-functional search field per spec (filter
  // nothing in V1). This just highlights the query string visually when it
  // matches the current page title; a future backend can swap in real search.
  const searchHasMatch = useMemo(() => {
    if (!query.trim()) return false;
    return current?.title.toLowerCase().includes(query.trim().toLowerCase());
  }, [query, current]);

  function toggleChecklist(idx: number) {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  const progress = Math.round(((pageIdx + 1) / pages.length) * 100);
  const absolutePage = mod.week.pageStart + pageIdx;

  // Força na Caneta mock checklist items — UI only. NO sensitive data.
  const forcaChecklist: { id: number; label: string }[] = [
    { id: 0, label: 'Anotar 3 momentos de fome hoje.' },
    { id: 1, label: 'Beber água antes da próxima refeição.' },
    { id: 2, label: 'Definir o jantar antes das 19h.' },
  ];

  // Força na Caneta mock recipe shortcuts — UI only.
  const forcaRecipes: { id: string; title: string; time: string }[] = [
    { id: 'r1', title: 'Bowl de manhã calma', time: '10 min' },
    { id: 'r2', title: 'Salada que sustenta a tarde', time: '15 min' },
  ];

  // Maquette-style summary accordion — numbered 1-4 with chevrons.
  // Content from mod.week fields (summary/focus/experiment) — no invented
  // clinical content. The "Check-out" item is a soft close + LIA CTA.
  const summaryItems = [
    {
      n: 1,
      title: 'O que vai aprender',
      body: mod.week.summary,
    },
    {
      n: 2,
      title: 'Principais conceitos',
      body: mod.week.focus,
    },
    {
      n: 3,
      title: 'Experimento da semana',
      body: mod.week.experiment,
    },
    {
      n: 4,
      title: 'Check-out',
      body:
        'Conversar com a LIA sobre esta semana e levar o aprendizado para a rotina. Conteúdo educativo — não substitui orientação clínica.',
    },
  ];

  return (
    <div className={cn('flex flex-col', fs && 'fixed inset-0 z-50 bg-ivory')}>
      {!fs ? (
        <div className="border-b border-forest/10 bg-cream/40">
          <div className="shell py-6">
            {/* Maquette: breadcrumb = Programas › Corpo Forte › Reader (no Início first link). */}
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
              <Link href={`/${locale}/programas`} className="hover:text-forest">
                {copy.nav.programs}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link
                href={`/${locale}${program.slug === 'corpo-forte' ? '/programas/corpo-forte' : '/programas/forca-na-caneta'}`}
                className="hover:text-forest"
              >
                {program.name}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-forest">Reader</span>
            </nav>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">
                  {program.kind === 'programa' ? 'Programa Interativo' : 'Guia Educativo'} · {program.duration}
                </p>
                <h1 className="mt-1 font-display text-3xl font-medium text-ink">
                  {program.name} Reader
                </h1>
                <p className="mt-1 text-sm italic text-forest-2">{program.tagline}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="gold">
                  <Star className="h-3 w-3" /> {program.seal}
                </Badge>
                {asset ? <Badge variant="ivory">{asset.version}</Badge> : null}
                {asset ? <Badge variant="ivory">{asset.totalPages} {copy.common.pages}</Badge> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Maquette: week tabs as rectangular two-line buttons. */}
      <div className="border-b border-forest/10 bg-ivory">
        <div className="shell flex gap-2 overflow-x-auto py-3 scrollbar-soft">
          {weeks.map((w) => {
            const active = w.slug === mod.week.slug;
            return (
              <Link
                key={w.slug}
                href={`/${locale}${readerPath}?semana=${w.slug}`}
                className={cn(
                  'inline-flex min-w-[124px] flex-col gap-0.5 rounded-xl px-4 py-2 text-left transition-colors',
                  active
                    ? 'bg-forest text-white shadow-soft'
                    : 'border border-forest/15 bg-cream/40 text-forest hover:border-forest/40 hover:bg-forest/5',
                )}
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
                  {unit} {w.n}
                </span>
                <span className="text-sm font-medium leading-tight">{w.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="shell grid flex-1 gap-6 py-8 lg:grid-cols-[260px_1fr_300px]">
        {/* Left sidebar — search + chapters with thumbnail tiles */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-4">
            {/* Search */}
            <div className="rounded-3xl border border-forest/10 bg-white p-4">
              <label htmlFor="reader-search" className="sr-only">
                Pesquisar
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="reader-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pesquisar no guia…"
                  className="h-10 w-full rounded-full border border-forest/15 bg-cream/30 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-forest/40 focus:outline-none"
                />
              </div>
              {query.trim() ? (
                <p className="mt-2 text-[11px] text-muted">
                  {searchHasMatch
                    ? 'Correspondência na página atual.'
                    : 'Pesquisa visual (a pesquisa completa chega com o backend do Reader).'}
                </p>
              ) : null}
            </div>

            {/* Chapters with thumbnail tiles — maquette: header with right chevron. */}
            <div className="rounded-3xl border border-forest/10 bg-white p-4">
              <button
                type="button"
                className="flex w-full items-center justify-between text-left"
                aria-expanded="true"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Capítulos da {unit} {mod.week.n}
                </p>
                <ChevronRight className="h-4 w-4 text-forest" />
              </button>
              <ul className="mt-3 flex flex-col">
                {weeks.map((w) => {
                  const active = w.slug === mod.week.slug;
                  return (
                    <li key={w.slug}>
                      <Link
                        href={`/${locale}${readerPath}?semana=${w.slug}`}
                        className={cn(
                          'flex items-start gap-3 rounded-xl p-2.5 transition-colors',
                          active ? 'bg-forest/8' : 'hover:bg-forest/5',
                        )}
                      >
                        {/* Document tile thumbnail — visual only. */}
                        <span
                          className={cn(
                            'relative mt-0.5 flex h-14 w-11 shrink-0 flex-col items-center justify-start gap-1 rounded-md border p-1.5',
                            active
                              ? 'border-forest bg-forest text-white'
                              : 'border-forest/15 bg-cream/50 text-forest',
                          )}
                        >
                          <span className="font-display text-[11px] leading-none">
                            {unitShort}
                            {w.n}
                          </span>
                          <span className="h-px w-full bg-current opacity-30" />
                          <span className="h-px w-3/4 bg-current opacity-20" />
                          <span className="h-px w-1/2 bg-current opacity-20" />
                        </span>
                        <span>
                          <span
                            className={cn('block text-sm font-medium', active ? 'text-forest' : 'text-ink')}
                          >
                            {w.title}
                          </span>
                          <span className="block text-[11px] text-muted">
                            p. {w.pageStart}–{w.pageEnd}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>

        {/* Center — page renderer */}
        <div className="flex min-w-0 flex-col">
          {/* Maquette: toolbar with page input field + `- 100% +` zoom. */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-forest/10 bg-white p-2 shadow-soft">
            <div className="flex items-center gap-1">
              <ToolbarBtn
                label={copy.common.previous}
                onClick={() => setPageIdx((i) => Math.max(0, i - 1))}
                disabled={pageIdx === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </ToolbarBtn>
              <div className="inline-flex items-center gap-1 rounded-full border border-forest/15 px-2">
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={absolutePage}
                  onChange={(e) => {
                    const n = Number(e.target.value);
                    if (!Number.isFinite(n)) return;
                    const clamped = Math.max(1, Math.min(totalPages, n));
                    const newIdx = Math.max(0, Math.min(pages.length - 1, clamped - mod.week.pageStart));
                    setPageIdx(newIdx);
                  }}
                  className="h-8 w-12 bg-transparent text-center text-sm font-medium text-ink focus:outline-none"
                  aria-label="Página atual"
                />
                <span className="text-xs text-muted">/ {totalPages}</span>
              </div>
              <ToolbarBtn
                label={copy.common.next}
                onClick={() => setPageIdx((i) => Math.min(pages.length - 1, i + 1))}
                disabled={pageIdx >= pages.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </ToolbarBtn>
            </div>
            <div className="flex items-center gap-1">
              <ToolbarBtn label={copy.common.zoomOut} onClick={() => setZoom((z) => Math.max(60, z - 10))}>
                <span className="text-base font-semibold leading-none">–</span>
              </ToolbarBtn>
              <span className="px-2 text-xs font-medium text-ink">{zoom}%</span>
              <ToolbarBtn label={copy.common.zoomIn} onClick={() => setZoom((z) => Math.min(160, z + 10))}>
                <ZoomIn className="h-4 w-4" />
              </ToolbarBtn>
              <span className="mx-1 h-5 w-px bg-forest/10" />
              <ToolbarBtn label="Marcar" onClick={() => setBookmarked((b) => !b)}>
                <Bookmark className={cn('h-4 w-4', bookmarked && 'fill-gold text-gold')} />
              </ToolbarBtn>
              <ToolbarBtn label={copy.common.fullscreen} onClick={() => setFs((f) => !f)}>
                {fs ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </ToolbarBtn>
            </div>
          </div>

          {/* Mock page renderer — real rendered content (not an iframe, not a screenshot). */}
          <div className="relative flex flex-1 justify-center overflow-auto rounded-3xl border border-forest/10 bg-cream/40 p-4 scrollbar-soft">
            <div
              style={{ width: `${zoom}%`, maxWidth: 720 }}
              className="relative rounded-2xl bg-white p-8 shadow-card md:p-12"
            >
              {/* Maquette: botanical motif along the LEFT edge of the viewer
                  page. Positioned just inside the page so it's clearly
                  visible in the left gutter between the page edge and the
                  article content. Sits BEHIND the article (DOM order + the
                  article's relative stacking context), so only the portion in
                  the gutter renders — but that's the maquette look. */}
              <Leaf
                className="pointer-events-none absolute left-0 top-8 hidden h-[65%] w-12 text-forest/30 md:block [transform:rotate(-10deg)]"
                aria-hidden
              />
              {current ? (
                <article className="relative flex flex-col gap-5">
                  <header className="flex items-center justify-between border-b border-forest/10 pb-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                      {program.kind === 'programa' ? 'Programa Corpo Forte' : 'Guia Força na Caneta'}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest-2">
                      {unit} {mod.week.n}
                    </span>
                  </header>
                  {/* Maquette: large serif "0N" header + serif title. */}
                  <div className="flex items-start gap-5">
                    <span className="font-display text-[clamp(3rem,5vw,4.5rem)] font-medium leading-none text-forest/80">
                      {String(mod.week.n).padStart(2, '0')}
                    </span>
                    <div className="pt-2">
                      <h2 className="font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
                        {mod.week.title}
                      </h2>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                        {mod.week.focus}
                      </p>
                    </div>
                  </div>
                  {/* Maquette: uppercase premium subheader — generic, no clinical claims. */}
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                    {program.kind === 'programa'
                      ? 'Mais força para uma vida mais plena'
                      : 'Pequenas escolhas. Grandes mudanças.'}
                  </p>
                  {current.paragraphs.map((p, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-ink/85">
                      {p}
                    </p>
                  ))}
                  {current.callout ? (
                    <aside className="rounded-2xl border-l-4 border-gold bg-cream/60 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
                        {current.callout.label}
                      </p>
                      <p className="mt-1 text-sm text-muted">{current.callout.text}</p>
                    </aside>
                  ) : null}
                  <footer className="mt-2 flex items-center justify-between border-t border-forest/10 pt-3 text-xs text-muted">
                    <span>{asset?.title ?? program.name}</span>
                    <span>
                      {absolutePage} / {totalPages}
                    </span>
                  </footer>
                </article>
              ) : null}
            </div>
            {/* Maquette: circular gold ValueBadge overlapping bottom-right of the viewer. */}
            <div className="pointer-events-none absolute -bottom-3 right-6 z-10 hidden md:block">
              <ValueBadge size="sm" eyebrow="Mais energia">
                Mais constância.
              </ValueBadge>
            </div>
          </div>
        </div>

        {/* Right rail — branched by program slug per spec */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-4">
            {/* Maquette: "O seu progresso" header + week-N-of-N + pages read + % + "Continuar leitura" CTA. */}
            <div className="rounded-3xl border border-forest/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">O seu progresso</p>
              <p className="mt-2 font-display text-base font-medium text-ink">
                {unit} {mod.week.n} de {totalUnits}
              </p>
              <p className="mt-1 text-xs text-muted">
                {pageIdx + 1} de {pages.length} {program.slug === 'corpo-forte' ? 'páginas lidas' : 'páginas lidas'}
              </p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-forest/10">
                <div className="h-full bg-gradient-gold" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted">{progress}%</p>
              {/* Maquette: primary "Continuar leitura →" button (advances the page). */}
              <button
                type="button"
                onClick={() => setPageIdx((i) => Math.min(pages.length - 1, i + 1))}
                disabled={pageIdx >= pages.length - 1}
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-white transition-colors hover:bg-forest-2 disabled:opacity-50"
              >
                Continuar leitura
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setBookmarked((b) => !b)}
                className="mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-forest/15 px-4 text-xs font-semibold text-forest transition-colors hover:bg-forest/5"
              >
                <Bookmark className={cn('h-3.5 w-3.5', bookmarked && 'fill-gold text-gold')} />
                Guardar página
              </button>
            </div>

            {program.slug === 'corpo-forte' ? (
              <>
                {/* Maquette: interactive accordion 1-4 with chevrons. */}
                <div className="rounded-3xl border border-forest/10 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Resumo da {unit} {mod.week.n}
                  </p>
                  <ul className="mt-3 flex flex-col">
                    {summaryItems.map((item) => {
                      const open = openSummary === item.n;
                      return (
                        <li key={item.n} className="border-b border-forest/10 last:border-b-0">
                          <button
                            type="button"
                            onClick={() => setOpenSummary(open ? -1 : item.n)}
                            aria-expanded={open}
                            className="flex w-full items-center gap-2.5 py-2.5 text-left"
                          >
                            <span className="inline-grid h-5 w-5 shrink-0 place-items-center rounded-full bg-forest/10 text-[11px] font-bold text-forest">
                              {item.n}
                            </span>
                            <span className="flex-1 text-sm font-medium text-ink">{item.title}</span>
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 text-muted transition-transform',
                                open ? 'rotate-180' : 'rotate-0',
                              )}
                            />
                          </button>
                          {open ? (
                            <p className="pb-3 pl-7 text-sm leading-relaxed text-muted">{item.body}</p>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Workbook CTA */}
                <div className="rounded-3xl border border-forest/10 bg-cream/60 p-5">
                  <BookOpen className="h-5 w-5 text-forest" />
                  <p className="mt-2 font-display text-base font-medium text-ink">
                    Workbook Corpo Forte
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    77 páginas de aplicação para acompanhar o guia.
                  </p>
                  <Link
                    href={`/${locale}/programas/corpo-forte`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest"
                  >
                    {copy.common.openWorkbook}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* LIA CTA */}
                <div className="rounded-3xl border border-forest/10 bg-gradient-forest p-5 text-ivory">
                  <div className="flex items-center gap-3">
                    <LIAAvatar size={40} />
                    <div>
                      <p className="font-display text-base font-medium">LIA</p>
                      <p className="text-[11px] text-ivory/70">Assistente de bem-estar</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-ivory/85">{copy.common.aboutThisWeek}</p>
                  <Link
                    href={`/${locale}/lia`}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs font-semibold text-ink"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Conversar
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* 7-day circular tracker */}
                <div className="rounded-3xl border border-forest/10 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Tracker de 7 dias
                  </p>
                  <div className="mt-3 grid grid-cols-7 gap-1.5">
                    {weeks.map((w) => {
                      const isActive = w.slug === mod.week.slug;
                      const isPast = w.n < mod.week.n;
                      return (
                        <span
                          key={w.slug}
                          title={`${unit} ${w.n} — ${w.title}`}
                          className={cn(
                            'flex aspect-square items-center justify-center rounded-full text-[11px] font-medium',
                            isActive
                              ? 'bg-forest text-white ring-2 ring-gold ring-offset-2 ring-offset-white'
                              : isPast
                                ? 'bg-sage text-forest'
                                : 'border border-forest/15 text-muted',
                          )}
                        >
                          {w.n}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-[11px] text-muted">
                    {unit} atual: <span className="font-semibold text-forest">{mod.week.n} · {mod.week.title}</span>
                  </p>
                </div>

                {/* Today checklist — UI only, no backend */}
                <div className="rounded-3xl border border-forest/10 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Hoje · checklist
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {forcaChecklist.map((item) => {
                      const checked = checkedItems.has(item.id);
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => toggleChecklist(item.id)}
                            className="flex w-full items-start gap-2.5 rounded-xl p-1.5 text-left text-sm transition-colors hover:bg-forest/5"
                          >
                            {checked ? (
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                            ) : (
                              <Circle className="mt-0.5 h-4 w-4 shrink-0 text-forest/40" />
                            )}
                            <span className={cn('text-ink/85', checked && 'line-through opacity-60')}>
                              {item.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-2 text-[10px] italic text-muted">
                    UI demonstrativa — sem dados sensíveis guardados.
                  </p>
                </div>

                {/* Recipe shortcuts — UI only */}
                <div className="rounded-3xl border border-forest/10 bg-cream/60 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Atalhos de receitas
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {forcaRecipes.map((r) => (
                      <li
                        key={r.id}
                        className="flex items-center justify-between rounded-xl border border-forest/10 bg-white p-3"
                      >
                        <span className="text-sm font-medium text-ink">{r.title}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                          <Timer className="h-3.5 w-3.5" />
                          {r.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[10px] italic text-muted">
                    Receitas demonstrativas — ligadas ao catálogo backend em breve.
                  </p>
                </div>

                {/* LIA CTA */}
                <div className="rounded-3xl border border-forest/10 bg-gradient-forest p-5 text-ivory">
                  <div className="flex items-center gap-3">
                    <LIAAvatar size={40} />
                    <div>
                      <p className="font-display text-base font-medium">LIA</p>
                      <p className="text-[11px] text-ivory/70">Assistente de bem-estar</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-ivory/85">Conversar sobre o dia {mod.week.n}.</p>
                  <Link
                    href={`/${locale}/lia`}
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs font-semibold text-ink"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Conversar
                  </Link>
                </div>
              </>
            )}

            {asset ? (
              <a
                href={asset.pdfPath}
                className="inline-flex items-center gap-2 rounded-2xl border border-forest/15 px-4 py-3 text-sm text-forest hover:bg-forest/5"
              >
                <Download className="h-4 w-4" /> {copy.common.download}
              </a>
            ) : null}
          </div>
        </aside>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="sticky bottom-0 border-t border-forest/10 bg-ivory/90 backdrop-blur lg:hidden">
        <div className="shell flex items-center justify-between gap-2 py-3">
          <ToolbarBtn
            label={copy.common.previous}
            onClick={() => setPageIdx((i) => Math.max(0, i - 1))}
            disabled={pageIdx === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </ToolbarBtn>
          <span className="text-xs text-muted">
            {absolutePage} / {totalPages}
          </span>
          <ToolbarBtn
            label={copy.common.next}
            onClick={() => setPageIdx((i) => Math.min(pages.length - 1, i + 1))}
            disabled={pageIdx >= pages.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </ToolbarBtn>
          <Link
            href={`/${locale}/lia`}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-white"
          >
            <MessageCircle className="h-3.5 w-3.5" /> LIA
          </Link>
        </div>
      </div>
    </div>
  );
}

function ToolbarBtn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors hover:bg-forest/5 disabled:opacity-40"
    >
      {children}
    </button>
  );
}
