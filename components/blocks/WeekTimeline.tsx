import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ProgramWeek } from '@/lib/content/programs';

export function WeekTimeline({
  weeks,
  locale,
  basePath,
  label = 'Semana',
}: {
  weeks: ProgramWeek[];
  locale: string;
  /** locale-relative base path, e.g. /programas/corpo-forte */
  basePath: string;
  label?: string;
}) {
  return (
    <section className="py-12">
      <ol className="flex snap-x gap-4 overflow-x-auto pb-4 scrollbar-soft md:grid md:grid-cols-4 md:overflow-visible">
        {weeks.map((w) => (
          <li key={w.slug} className="snap-start">
            <Link
              href={`/${locale}${basePath}/reader?semana=${w.slug}`}
              className="group flex h-full flex-col gap-2 rounded-3xl border border-forest/10 bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-forest font-display text-lg font-medium text-ivory">
                {w.n}
              </span>
              <p className="mt-2 font-display text-lg font-medium leading-snug text-ink">
                {w.title}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
                {label} {w.n}
              </p>
              <p className="text-sm leading-relaxed text-muted">{w.focus}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-forest">
                Abrir
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
