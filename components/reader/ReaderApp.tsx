'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Expand,
  Lock,
  Maximize2,
  MessageCircle,
  Minimize2,
  PanelLeft,
  Shrink,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LibraryAsset } from '@/lib/content/library';
import {
  chapterForPage,
  coverSrc,
  thumbSrc,
  type Chapter,
  type ReaderManifest,
} from '@/lib/content/manifests';

type Props = {
  locale: string;
  asset: LibraryAsset;
  manifest: ReaderManifest;
  /** Full PDF for members, preview PDF (first `previewPages`) otherwise. */
  src: string;
  hasAccess: boolean;
  related?: LibraryAsset;
  initialPage?: number;
};

type Saved = { page: number; maxRead: number; bookmarks: number[] };

const ZOOMS = [0.75, 1, 1.25, 1.5, 2];
const storageKey = (assetId: string) => `levelab.reader.${assetId}`;

function loadSaved(assetId: string): Saved | null {
  try {
    const raw = localStorage.getItem(storageKey(assetId));
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

export function ReaderApp({ locale, asset, manifest, src, hasAccess, related, initialPage }: Props) {
  const total = asset.totalPages;
  const readable = hasAccess ? total : asset.previewPages;

  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [page, setPage] = useState(() => clamp(initialPage ?? 1, 1, total));
  const [maxRead, setMaxRead] = useState(1);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [savedPage, setSavedPage] = useState<number | null>(null);
  const [zoom, setZoom] = useState<'width' | 'page' | number>('page');
  const [focus, setFocus] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [pageInput, setPageInput] = useState(String(page));
  const stageRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const chapter = chapterForPage(manifest, page);
  const locked = page > readable;
  const [section, setSection] = useState(chapter?.section ?? manifest.sections[0].id);

  // Restore progress (client only) unless the URL asked for a page.
  useEffect(() => {
    const saved = loadSaved(asset.id);
    if (!saved) return;
    setMaxRead(saved.maxRead ?? 1);
    setBookmarks(saved.bookmarks ?? []);
    if (saved.page > 1) setSavedPage(saved.page);
    if (!initialPage && saved.page > 1) setPage(clamp(saved.page, 1, total));
  }, [asset.id, initialPage, total]);

  // Persist progress and reflect the page in the URL (shareable, no history spam).
  useEffect(() => {
    setPageInput(String(page));
    const nextMax = Math.max(maxRead, Math.min(page, readable));
    if (nextMax !== maxRead) setMaxRead(nextMax);
    try {
      localStorage.setItem(
        storageKey(asset.id),
        JSON.stringify({ page, maxRead: nextMax, bookmarks } satisfies Saved),
      );
    } catch {
      /* storage unavailable */
    }
    const url = new URL(window.location.href);
    url.searchParams.set('doc', asset.doc);
    url.searchParams.set('p', String(page));
    window.history.replaceState(null, '', url);
    if (chapter) setSection(chapter.section);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, bookmarks]);

  // Load the PDF.
  useEffect(() => {
    let cancelled = false;
    let loaded: PDFDocumentProxy | null = null;
    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdf.worker.min.mjs';
        loaded = await pdfjs.getDocument({ url: src, withCredentials: true }).promise;
        if (!cancelled) setDoc(loaded);
      } catch {
        if (!cancelled) setLoadError(true);
      }
    })();
    return () => {
      cancelled = true;
      void loaded?.destroy();
    };
  }, [src]);

  const go = useCallback((target: number) => {
    setPage((current) => {
      const next = clamp(target, 1, total);
      if (next !== current) stageRef.current?.scrollTo({ top: 0 });
      return next;
    });
    setDrawer(false);
  }, [total]);

  // Keyboard navigation.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go(page + 1);
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(page - 1);
      else if (e.key === 'Home') go(1);
      else if (e.key === 'End') go(total);
      else return;
      e.preventDefault();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, page, total]);

  // Fullscreen state.
  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  function toggleFullscreen() {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void shellRef.current?.requestFullscreen?.();
  }

  function toggleBookmark() {
    setBookmarks((list) =>
      list.includes(page) ? list.filter((p) => p !== page) : [...list, page].sort((a, b) => a - b),
    );
  }

  function stepZoom(dir: 1 | -1) {
    setZoom((z) => {
      const current = typeof z === 'number' ? z : 1;
      const idx = ZOOMS.findIndex((v) => v >= current);
      const nextIdx = clamp((idx === -1 ? ZOOMS.length - 1 : idx) + dir, 0, ZOOMS.length - 1);
      return ZOOMS[nextIdx];
    });
  }

  // Swipe on touch devices.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touch.current || typeof zoom === 'number') return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(page + (dx < 0 ? 1 : -1));
    touch.current = null;
  };

  const sectionChapters = useMemo(
    () => manifest.chapters.filter((c) => c.section === section),
    [manifest.chapters, section],
  );
  const bookmarked = bookmarks.includes(page);
  const progress = Math.round((Math.min(maxRead, total) / total) * 100);
  const weekIndex = manifest.sections.findIndex((s) => s.id === chapter?.section);

  const chapterList = (
    <ChapterList
      assetId={asset.id}
      chapters={sectionChapters}
      current={chapter}
      readable={readable}
      onSelect={(c) => go(c.page)}
    />
  );

  return (
    <div ref={shellRef} className={cn('bg-paper', fullscreen && 'overflow-auto')}>
      {/* Section tabs */}
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6">
        <nav
          aria-label="Secções"
          className="scrollbar-soft -mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
        >
          {manifest.sections.map((s) => {
            const first = manifest.chapters.find((c) => c.section === s.id);
            const active = s.id === section;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSection(s.id);
                  if (first) go(first.page);
                }}
                className={cn(
                  'flex min-w-[7.5rem] shrink-0 flex-col items-center rounded-2xl border px-4 py-2.5 text-center transition-all',
                  active
                    ? 'border-forest bg-forest text-white shadow-soft'
                    : 'border-forest/10 bg-white text-ink hover:border-forest/30',
                )}
              >
                <span className="font-display text-[15px] leading-tight">{s.label}</span>
                {s.sub ? (
                  <span className={cn('mt-0.5 text-[11px]', active ? 'text-white/75' : 'text-muted')}>
                    {s.sub}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div
        className={cn(
          'mx-auto grid w-full max-w-[1440px] gap-6 px-4 py-6 sm:px-6',
          focus ? 'grid-cols-1' : 'xl:grid-cols-[17rem_minmax(0,1fr)_19rem] lg:grid-cols-[minmax(0,1fr)_19rem]',
        )}
      >
        {/* Chapters rail */}
        {!focus ? (
          <aside className="hidden xl:block">
            <div className="sticky top-24 rounded-3xl border border-forest/10 bg-white p-4 shadow-soft">
              <p className="px-2 pb-3 font-display text-lg text-ink">
                {manifest.sections.find((s) => s.id === section)?.label}
              </p>
              <div className="scrollbar-soft max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
                {chapterList}
              </div>
            </div>
          </aside>
        ) : null}

        {/* Viewer */}
        <section className="min-w-0">
          <div className="overflow-hidden rounded-3xl border border-forest/10 bg-white shadow-soft">
            <Toolbar
              page={page}
              total={total}
              pageInput={pageInput}
              setPageInput={setPageInput}
              onGo={go}
              chapter={chapter}
              zoom={zoom}
              setZoom={setZoom}
              stepZoom={stepZoom}
              bookmarked={bookmarked}
              onBookmark={toggleBookmark}
              focus={focus}
              onFocus={() => setFocus((f) => !f)}
              fullscreen={fullscreen}
              onFullscreen={toggleFullscreen}
              onChapters={() => setDrawer(true)}
            />
            <div
              ref={stageRef}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className={cn(
                'relative flex justify-center overflow-auto bg-[#e9e3d6] p-3 sm:p-6',
                fullscreen ? 'h-[calc(100vh-3.5rem)]' : 'min-h-[60vh]',
              )}
            >
              {locked ? (
                <LockedPage asset={asset} page={page} chapter={chapter} />
              ) : loadError ? (
                <p className="self-center rounded-2xl bg-white/80 p-6 text-center text-muted">
                  Não foi possível abrir o documento. Atualize a página ou volte a entrar.
                </p>
              ) : doc ? (
                <PdfPage doc={doc} pageNumber={page} zoom={zoom} stage={stageRef} fullscreen={fullscreen} />
              ) : (
                <div className="flex aspect-[1/1.414] w-full max-w-xl animate-pulse items-center justify-center rounded-lg bg-white/60 text-sm text-muted">
                  Abrindo {asset.title}…
                </div>
              )}

              {/* Side arrows (desktop) */}
              <button
                type="button"
                onClick={() => go(page - 1)}
                disabled={page <= 1}
                aria-label="Página anterior"
                className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-soft transition-opacity hover:bg-white disabled:opacity-0 md:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(page + 1)}
                disabled={page >= total}
                aria-label="Página seguinte"
                className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest shadow-soft transition-opacity hover:bg-white disabled:opacity-0 md:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            {/* Progress strip */}
            <div className="h-1 bg-sage" aria-hidden>
              <div className="h-full bg-gold transition-all" style={{ width: `${(page / total) * 100}%` }} />
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Use as setas do teclado ou deslize para mudar de página.
          </p>
        </section>

        {/* Context rail */}
        {!focus ? (
          <aside className="flex flex-col gap-5">
            <div className="rounded-3xl border border-forest/10 bg-white p-5 shadow-soft">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-lg text-ink">O seu progresso</p>
                {weekIndex > 0 && manifest.sections[weekIndex].label.startsWith('Semana') ? (
                  <span className="text-xs text-muted">
                    {manifest.sections[weekIndex].label} de 8
                  </span>
                ) : null}
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-sage">
                <div className="h-full rounded-full bg-forest" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 flex justify-between text-xs text-muted">
                <span>
                  {Math.min(maxRead, total)} de {total} páginas
                </span>
                <span>{progress}%</span>
              </p>
              <button
                type="button"
                onClick={() => go(savedPage && savedPage !== page ? savedPage : Math.min(maxRead + 1, total))}
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-forest text-sm font-semibold text-white transition-colors hover:bg-forest-2"
              >
                Continuar leitura <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={toggleBookmark}
                className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-forest/20 text-sm font-medium text-forest transition-colors hover:bg-forest/5"
              >
                {bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                {bookmarked ? 'Página salva' : 'Salvar página'}
              </button>
              {bookmarks.length ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {bookmarks.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => go(b)}
                      className={cn(
                        'rounded-full px-2.5 py-1 text-xs font-medium',
                        b === page ? 'bg-gold/25 text-ink' : 'bg-cream text-forest hover:bg-sage',
                      )}
                    >
                      p. {b}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {chapter ? (
              <div className="rounded-3xl border border-forest/10 bg-white p-5 shadow-soft">
                <p className="eyebrow">Neste capítulo</p>
                <p className="mt-2 font-display text-lg leading-snug text-ink">{chapter.title}</p>
                {chapter.summary ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted">{chapter.summary}</p>
                ) : null}
                <button
                  type="button"
                  onClick={() => setDrawer(true)}
                  className="mt-3 text-sm font-semibold text-forest hover:underline xl:hidden"
                >
                  Ver todos os capítulos
                </button>
              </div>
            ) : null}

            {!hasAccess ? (
              <a
                href="#desbloquear"
                className="group rounded-3xl bg-gradient-forest p-5 text-white shadow-soft"
              >
                <Lock className="h-5 w-5 text-gold-soft" />
                <p className="mt-2 font-display text-lg">Desbloquear o guia completo</p>
                <p className="mt-1 text-sm text-white/75">
                  {total - readable} páginas à sua espera, com a LIA a acompanhar.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-soft">
                  Ver opções <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ) : null}

            {related ? (
              <Link
                href={`/${locale}/programas/${related.product}/reader?doc=${related.doc}`}
                className="flex gap-4 rounded-3xl border border-forest/10 bg-white p-4 shadow-soft transition-shadow hover:shadow-lift"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverSrc(related.id)}
                  alt=""
                  className="h-24 w-[4.25rem] shrink-0 rounded-md object-cover shadow-soft"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="font-display text-base text-ink">
                    {related.doc === 'workbook' ? 'Workbook relacionado' : 'Guia relacionado'}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {related.doc === 'workbook'
                      ? 'Aprofunde os exercícios e reflexões desta semana.'
                      : 'Volte à leitura que acompanha estes exercícios.'}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-forest">
                    Abrir <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ) : null}

            <div className="rounded-3xl bg-sage-2 p-5">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/people/lia/lia-avatar.webp"
                  alt=""
                  className="h-12 w-12 rounded-full bg-white object-cover ring-2 ring-white"
                />
                <div>
                  <p className="font-display text-base text-ink">Conversar com a LIA</p>
                  <p className="text-xs text-muted">Dúvidas sobre este capítulo? A LIA ajuda.</p>
                </div>
              </div>
              <Link
                href={`/${locale}/lia`}
                className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-forest text-sm font-semibold text-white hover:bg-forest-2"
              >
                <MessageCircle className="h-4 w-4" /> Falar com a LIA
              </Link>
            </div>
          </aside>
        ) : null}
      </div>

      {/* Chapters drawer (tablet/mobile) */}
      {drawer ? (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Capítulos">
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(88%,380px)] flex-col bg-ivory shadow-lift">
            <div className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
              <p className="font-display text-lg text-ink">Capítulos</p>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label="Fechar"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-forest hover:bg-forest/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="scrollbar-soft flex-1 overflow-y-auto p-3">
              <ChapterList
                assetId={asset.id}
                chapters={manifest.chapters}
                current={chapter}
                readable={readable}
                onSelect={(c) => go(c.page)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Toolbar(props: {
  page: number;
  total: number;
  pageInput: string;
  setPageInput: (v: string) => void;
  onGo: (p: number) => void;
  chapter?: Chapter;
  zoom: 'width' | 'page' | number;
  setZoom: (z: 'width' | 'page' | number) => void;
  stepZoom: (d: 1 | -1) => void;
  bookmarked: boolean;
  onBookmark: () => void;
  focus: boolean;
  onFocus: () => void;
  fullscreen: boolean;
  onFullscreen: () => void;
  onChapters: () => void;
}) {
  const btn =
    'inline-flex h-9 w-9 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/5 disabled:opacity-30';
  const zoomLabel =
    props.zoom === 'page' ? 'Página' : props.zoom === 'width' ? 'Largura' : `${Math.round(props.zoom * 100)}%`;
  return (
    <div className="flex items-center gap-1 border-b border-forest/10 bg-white px-2 py-2 sm:gap-2 sm:px-3">
      <button type="button" className={cn(btn, 'xl:hidden')} onClick={props.onChapters} aria-label="Capítulos">
        <PanelLeft className="h-[18px] w-[18px]" />
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => props.onGo(props.page - 1)}
        disabled={props.page <= 1}
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-[18px] w-[18px]" />
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const n = Number.parseInt(props.pageInput, 10);
          if (Number.isFinite(n)) props.onGo(n);
        }}
        className="flex items-center gap-1.5 text-sm text-muted"
      >
        <input
          aria-label="Número da página"
          inputMode="numeric"
          value={props.pageInput}
          onChange={(e) => props.setPageInput(e.target.value.replace(/\D/g, ''))}
          onBlur={() => props.setPageInput(String(props.page))}
          className="h-9 w-12 rounded-lg border border-forest/15 text-center text-ink focus:border-forest/40 focus:outline-none"
        />
        <span>/ {props.total}</span>
      </form>
      <button
        type="button"
        className={btn}
        onClick={() => props.onGo(props.page + 1)}
        disabled={props.page >= props.total}
        aria-label="Página seguinte"
      >
        <ChevronRight className="h-[18px] w-[18px]" />
      </button>

      <p className="mx-2 hidden min-w-0 flex-1 truncate text-center text-sm text-muted md:block">
        {props.chapter ? (
          <>
            <span className="font-semibold text-gold">{props.chapter.n}</span> · {props.chapter.title}
          </>
        ) : null}
      </p>
      <span className="flex-1 md:hidden" />

      <div className="hidden items-center sm:flex">
        <button type="button" className={btn} onClick={() => props.stepZoom(-1)} aria-label="Diminuir zoom">
          <ZoomOut className="h-[18px] w-[18px]" />
        </button>
        <button
          type="button"
          onClick={() => props.setZoom(props.zoom === 'page' ? 'width' : 'page')}
          className="h-9 min-w-[4.5rem] rounded-full px-2 text-xs font-semibold text-forest hover:bg-forest/5"
          title="Alternar entre ajustar à página e à largura"
        >
          {zoomLabel}
        </button>
        <button type="button" className={btn} onClick={() => props.stepZoom(1)} aria-label="Aumentar zoom">
          <ZoomIn className="h-[18px] w-[18px]" />
        </button>
      </div>
      <button
        type="button"
        className={cn(btn, props.bookmarked && 'text-gold')}
        onClick={props.onBookmark}
        aria-label={props.bookmarked ? 'Remover marcador' : 'Salvar página'}
        aria-pressed={props.bookmarked}
      >
        {props.bookmarked ? <BookmarkCheck className="h-[18px] w-[18px]" /> : <Bookmark className="h-[18px] w-[18px]" />}
      </button>
      <button
        type="button"
        className={cn(btn, 'hidden lg:inline-flex')}
        onClick={props.onFocus}
        aria-label={props.focus ? 'Sair do modo foco' : 'Modo foco'}
        aria-pressed={props.focus}
        title="Modo foco"
      >
        {props.focus ? <Shrink className="h-[18px] w-[18px]" /> : <Expand className="h-[18px] w-[18px]" />}
      </button>
      <button
        type="button"
        className={btn}
        onClick={props.onFullscreen}
        aria-label={props.fullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
      >
        {props.fullscreen ? <Minimize2 className="h-[18px] w-[18px]" /> : <Maximize2 className="h-[18px] w-[18px]" />}
      </button>
    </div>
  );
}

function ChapterList({
  assetId,
  chapters,
  current,
  readable,
  onSelect,
}: {
  assetId: string;
  chapters: Chapter[];
  current?: Chapter;
  readable: number;
  onSelect: (c: Chapter) => void;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {chapters.map((c) => {
        const active = current?.n === c.n && current.page === c.page;
        const locked = c.page > readable;
        return (
          <li key={`${c.n}-${c.page}`}>
            <button
              type="button"
              onClick={() => onSelect(c)}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl border p-2 text-left transition-all',
                active ? 'border-forest/25 bg-sage-2' : 'border-transparent hover:bg-cream/70',
              )}
            >
              <span className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbSrc(assetId, c.thumb)}
                  alt=""
                  loading="lazy"
                  className={cn(
                    'h-[4.25rem] w-12 rounded-md bg-white object-cover object-top shadow-sm',
                    locked && 'opacity-60 blur-[1.5px]',
                  )}
                />
                {locked ? (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Lock className="h-4 w-4 text-forest" />
                  </span>
                ) : null}
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-gold">
                  {c.n}
                </span>
                <span className="line-clamp-2 block font-display text-[15px] leading-snug text-ink">
                  {c.title}
                </span>
                <span className="block text-xs text-muted">p. {c.page}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function LockedPage({ asset, page, chapter }: { asset: LibraryAsset; page: number; chapter?: Chapter }) {
  return (
    <div className="relative flex aspect-[1/1.414] w-full max-w-xl flex-col items-center justify-center overflow-hidden rounded-lg bg-white p-8 text-center shadow-card">
      {chapter ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbSrc(asset.id, chapter.thumb)}
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-md"
        />
      ) : null}
      <div className="relative">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-gold-soft shadow-soft">
          <Lock className="h-6 w-6" />
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Página {page} de {asset.totalPages}
        </p>
        <p className="mt-2 font-display text-2xl leading-snug text-ink">
          {chapter ? chapter.title : 'Conteúdo exclusivo para membros'}
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Esta página faz parte do guia completo. Desbloqueie para continuar a leitura com a LIA ao
          seu lado.
        </p>
        <a
          href="#desbloquear"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-white shadow-soft hover:bg-forest-2"
        >
          <BookOpen className="h-4 w-4" /> Desbloquear acesso
        </a>
      </div>
    </div>
  );
}

function PdfPage({
  doc,
  pageNumber,
  zoom,
  stage,
  fullscreen,
}: {
  doc: PDFDocumentProxy;
  pageNumber: number;
  zoom: 'width' | 'page' | number;
  stage: React.RefObject<HTMLDivElement | null>;
  fullscreen: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [tick, setTick] = useState(0);

  // Re-render on resize.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTick((t) => t + 1));
    ro.observe(el);
    return () => ro.disconnect();
  }, [stage]);

  useEffect(() => {
    let cancelled = false;
    let task: { cancel: () => void } | null = null;
    (async () => {
      const page = await doc.getPage(pageNumber);
      if (cancelled) return;
      const base = page.getViewport({ scale: 1 });
      const el = stage.current;
      const padding = window.innerWidth < 640 ? 24 : 48;
      const availW = Math.max(240, (el?.clientWidth ?? base.width) - padding);
      const availH = fullscreen
        ? (el?.clientHeight ?? base.height) - padding
        : Math.max(420, window.innerHeight - 220);
      const fitWidth = availW / base.width;
      const fitPage = Math.min(fitWidth, availH / base.height);
      const scale =
        zoom === 'width' ? fitWidth : zoom === 'page' ? fitPage : fitPage * zoom;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: scale * dpr });
      const c = canvas.current;
      if (!c || cancelled) return;
      c.width = Math.floor(viewport.width);
      c.height = Math.floor(viewport.height);
      setSize({ w: Math.floor(viewport.width / dpr), h: Math.floor(viewport.height / dpr) });
      const ctx = c.getContext('2d');
      if (!ctx) return;
      const render = page.render({ canvasContext: ctx, viewport });
      task = render;
      await render.promise.catch(() => undefined);
    })();
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, pageNumber, zoom, stage, tick, fullscreen]);

  return (
    <canvas
      ref={canvas}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={`Página ${pageNumber}`}
      className="block shrink-0 self-start rounded-[3px] bg-white shadow-card"
      style={size ? { width: size.w, height: size.h } : { width: '100%', maxWidth: 640, aspectRatio: '1 / 1.414' }}
    />
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
