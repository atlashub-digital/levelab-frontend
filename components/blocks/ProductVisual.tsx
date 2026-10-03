import { cn } from '@/lib/utils';

const accentMap = {
  forest: 'bg-gradient-forest text-white',
  olive: 'bg-olive/15 text-forest',
  gold: 'bg-gradient-gold text-ink',
  sage: 'bg-sage text-forest',
} as const;

/**
 * Decorative product/program visual block — gradient + botanical monogram.
 * Used in ProductCard and ProgramCard until real cover art is provided.
 */
export function ProductVisual({
  monogram,
  accent = 'forest',
  className,
  label,
}: {
  monogram: string;
  accent?: keyof typeof accentMap;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-t-3xl bg-gradient-forest',
        accentMap[accent],
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <Leaf className="absolute -right-6 -top-6 h-40 w-40 text-white/15" />
      <Leaf className="absolute -bottom-10 -left-8 h-44 w-44 text-white/10 [transform:rotate(180deg)]" />
      <div className="relative flex h-full min-h-[180px] flex-col items-center justify-center gap-2 p-6 text-center">
        <span
          aria-hidden
          className="font-display text-[64px] font-medium leading-none text-white/95 drop-shadow-sm"
        >
          {monogram}
        </span>
        {label ? (
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={className} fill="none">
      <path
        d="M60 8c26 18 42 42 42 64 0 28-20 46-42 50C38 118 18 100 18 72c0-22 16-46 42-64z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M60 14v104" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M60 36c10 3 17 9 20 19M60 60c10 3 17 9 20 19M60 36c-10 3-17 9-20 19M60 60c-10 3-17 9-20 19"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
