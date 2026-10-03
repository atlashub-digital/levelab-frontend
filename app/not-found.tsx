import Link from 'next/link';
import { ArrowRight, Home, Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 py-20 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_30%,rgba(183,154,91,0.16),transparent_30rem),radial-gradient(circle_at_0%_80%,rgba(21,61,49,0.05),transparent_22rem)]"
      />
      <div className="relative">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-forest text-ivory shadow-soft">
          <Leaf className="h-7 w-7" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-forest-2">
          LeveLab
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.6rem,8vw,5rem)] font-medium leading-none text-ink">
          404
        </h1>
        <p className="mt-3 font-display text-2xl font-medium text-ink">
          Esta página saiu para uma caminhada.
        </p>
        <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted">
          O conteúdo que procura pode ter mudado de endereço ou ainda não
          existir. Voltar ao início é o caminho mais leve.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pt-br"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-white shadow-soft transition-all hover:bg-forest-2 hover:shadow-lift"
          >
            <Home className="h-4 w-4" />
            Voltar ao início
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/pt-br/lia"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
          >
            Conversar com a LIA
          </Link>
        </div>
      </div>
    </main>
  );
}
