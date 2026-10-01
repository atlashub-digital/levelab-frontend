'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  Bookmark,
  MessageCircle,
  BookOpen,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LIAAvatar } from '@/components/blocks/LIAAvatar';
import { Badge } from '@/components/ui/Card';
import type { ModuleContent, ReaderAsset } from '@/lib/content/readers';
import type { ProgramMeta, ProgramWeek } from '@/lib/content/programs';
import type { LocaleCopy } from '@/lib/i18n';

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
  const pages = mod.pages;
  const totalPages = asset?.totalPages ?? pages.length;
  const current = pages[Math.min(pageIdx, pages.length - 1)];

  const readerPath =
    program.slug === 'corpo-forte'
      ? '/programas/corpo-forte/reader'
      : '/programas/forca-na-caneta/reader';
  const unit = program.slug === 'corpo-forte' ? 'Semana' : 'Dia';
  const unitShort = program.slug === 'corpo-forte' ? 'S' : 'D';

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'ArrowRight') setPageIdx((i) => Math.min(i + 1, pages.length - 1));
      if (e.key === 'ArrowLeft') setPageIdx((i) => Math.max(i - 1, 0));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pages.length]);

  useEffect(() => {
    setPageIdx(0);
    setBookmarked(false);
  }, [mod.week.slug]);

  const progress = Math.round(((pageIdx + 1) / pages.length) * 100);

  return (
    <div className={cn('flex flex-col', fs && 'fixed inset-0 z-50 bg-ivory')}>
      {!fs ? (
        <div className="border-b border-forest/10 bg-cream/40">
          <div className="shell py-6">
            <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
              <Link href={`/${locale}`} className="hover:text-forest">
                {copy.nav.home}
              </Link>
              <ChevronRight className="h-3 w-3" />
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
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="border-b border-forest/10 bg-ivory">
        <div className="shell flex gap-2 overflow-x-auto py-3 scrollbar-soft">
          {weeks.map((w) => {
            const active = w.slug === mod.week.slug;
            return (
              <Link
                key={w.slug}
                href={`/${locale}${readerPath}?semana=${w.slug}`}
                className={cn(
                  'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
                  active ? 'bg-forest text-white' : 'border border-forest/15 text-forest hover:bg-forest/5',
                )}
              >
                <span className="font-display">
                  {unitShort}
                  {w.n}
                </span>
                <span className="hidden sm:inline">{w.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="shell grid flex-1 gap-6 py-8 lg:grid-cols-[240px_1fr_280px]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-forest/10 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Capítulos</p>
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
                      <span
                        className={cn(
                          'mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-display text-xs font-medium',
                          active ? 'bg-forest text-white' : 'bg-forest/8 text-forest',
                        )}
                      >
                        {w.n}
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
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-forest/10 bg-white p-2 shadow-soft">
            <div className="flex items-center gap-1">
              <ToolbarBtn
                label={copy.common.previous}
                onClick={() => setPageIdx((i) => Math.max(0, i - 1))}
                disabled={pageIdx === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </ToolbarBtn>
              <span className="px-2 text-xs text-muted">
                Página {current ? mod.week.pageStart + pageIdx : 0} / {totalPages}
              </span>
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
                <ZoomOut className="h-4 w-4" />
              </ToolbarBtn>
              <span className="px-2 text-xs text-muted">{zoom}%</span>
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

          <div className="flex flex-1 justify-center overflow-auto rounded-3xl border border-forest/10 bg-cream/40 p-4 scrollbar-soft">
            <div
              style={{ width: `${zoom}%`, maxWidth: 720 }}
              className="rounded-2xl bg-white p-8 shadow-card md:p-12"
            >
              {current ? (
                <article className="flex flex-col gap-5">
                  <header className="flex items-center justify-between border-b border-forest/10 pb-4">
                    <span className="eyebrow">
                      {unit} {mod.week.n}
                    </span>
                    <span className="text-xs text-muted">{mod.week.focus}</span>
                  </header>
                  <h2 className="font-display text-3xl font-medium text-ink">{mod.week.title}</h2>
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
                      {mod.week.pageStart + pageIdx} / {totalPages}
                    </span>
                  </footer>
                </article>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-4">
            <div className="rounded-3xl border border-forest/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Progresso</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-forest/10">
                <div className="h-full bg-gradient-gold" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted">
                {progress}% da {program.slug === 'corpo-forte' ? 'semana' : 'dia'}
              </p>
            </div>

            <div className="rounded-3xl border border-forest/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {program.slug === 'corpo-forte' ? 'Resumo da semana' : 'Resumo do dia'}
              </p>
              <p className="mt-2 font-display text-lg font-medium text-ink">{mod.week.title}</p>
              <p className="mt-1 text-sm text-muted">{mod.week.summary}</p>
              <p className="mt-3 text-xs text-muted">
                <span className="font-semibold text-forest">Foco:</span> {mod.week.focus}
              </p>
              <p className="mt-1 text-xs text-muted">
                <span className="font-semibold text-forest">Experimento:</span> {mod.week.experiment}
              </p>
            </div>

            {program.slug === 'corpo-forte' ? (
              <div className="rounded-3xl border border-forest/10 bg-cream/60 p-5">
                <BookOpen className="h-5 w-5 text-forest" />
                <p className="mt-2 font-display text-base font-medium text-ink">
                  Workbook Corpo Forte
                </p>
                <p className="mt-1 text-xs text-muted">
                  77 páginas de aplicação para acompanhar o guia.
                </p>
                <Link
                  href={`/${locale}/conteudos`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-forest"
                >
                  {copy.common.openWorkbook}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}

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
            {mod.week.pageStart + pageIdx} / {totalPages}
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
