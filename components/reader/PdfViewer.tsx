'use client';

import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';

/**
 * Renders a PDF page by page with pdf.js (works on mobile, where a PDF in an
 * iframe often shows only the first page). Pages render lazily as they near
 * the viewport.
 */
export function PdfViewer({ src, title }: { src: string; title: string }) {
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState(false);

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
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
      void loaded?.destroy();
    };
  }, [src]);

  if (error) {
    return (
      <p className="rounded-2xl bg-cream/60 p-6 text-center text-muted">
        Não foi possível abrir o documento. Atualize a página ou volte a entrar.
      </p>
    );
  }

  if (!doc) {
    return (
      <div className="flex h-[60vh] items-center justify-center rounded-2xl bg-cream/40 text-muted">
        A abrir {title}…
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center gap-4"
      aria-label={title}
      onContextMenu={(e) => e.preventDefault()}
    >
      {Array.from({ length: doc.numPages }, (_, i) => (
        <PdfPage key={i} doc={doc} pageNumber={i + 1} />
      ))}
    </div>
  );
}

function PdfPage({ doc, pageNumber }: { doc: PDFDocumentProxy; pageNumber: number }) {
  const holder = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(pageNumber <= 2);
  const [ratio, setRatio] = useState(1.414);

  useEffect(() => {
    const el = holder.current;
    if (!el || visible) return;
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && setVisible(true),
      { rootMargin: '800px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    let task: { cancel: () => void } | null = null;
    (async () => {
      const page = await doc.getPage(pageNumber);
      // A cancelled run must not touch the canvas (two renders on one canvas fail).
      if (cancelled) return;
      const base = page.getViewport({ scale: 1 });
      setRatio(base.height / base.width);
      const width = holder.current?.clientWidth ?? base.width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: (width / base.width) * dpr });
      const c = canvas.current;
      if (!c) return;
      c.width = viewport.width;
      c.height = viewport.height;
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
  }, [doc, pageNumber, visible]);

  return (
    <div
      ref={holder}
      className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-soft"
      style={{ aspectRatio: `1 / ${ratio}` }}
    >
      <canvas ref={canvas} className="block h-full w-full" aria-label={`Página ${pageNumber}`} />
    </div>
  );
}
