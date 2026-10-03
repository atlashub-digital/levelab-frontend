import { cn } from '@/lib/utils';

/**
 * ValueBadge — circular gold seal used as a visual anchor overlapping
 * hero/reader viewer corners. Maquette motif: solid gold gradient circle
 * with a short value phrase in serif text + a subtle outer ring.
 *
 * Maquette examples:
 *   - "Orientação real para uma vida mais leve." (hero, right side)
 *   - "-20%" or "20% no bundle" (loja bundle, right side)
 *   - "Mais energia. Mais liberdade. Mais tu." (reader viewer, bottom-right)
 *
 * Sizing: ~96–120px on desktop. Falls back to 80px on small screens.
 */
const sizeMap = {
  sm: 'h-20 w-20 text-[11px] md:h-24 md:w-24 md:text-xs',
  md: 'h-24 w-24 text-xs md:h-28 md:w-28 md:text-sm',
  lg: 'h-28 w-28 text-sm md:h-32 md:w-32 md:text-base',
} as const;

export function ValueBadge({
  children,
  className,
  size = 'md',
  /** Optional small eyebrow line above the main phrase (e.g., "20% no bundle"). */
  eyebrow,
  /** Optional rotation for the handwritten-seal feel (default -6°). */
  rotate = -6,
}: {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizeMap;
  eyebrow?: string;
  rotate?: number;
}) {
  return (
    <div
      className={cn(
        'relative inline-grid place-items-center rounded-full bg-gradient-gold text-center text-ink shadow-lift',
        'ring-1 ring-gold/40 ring-offset-4 ring-offset-ivory/0',
        'before:absolute before:inset-1 before:rounded-full before:border before:border-ink/15',
        sizeMap[size],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <div className="relative flex flex-col items-center gap-0.5 px-3 leading-tight">
        {eyebrow ? (
          <span className="font-display text-[0.7em] font-bold uppercase tracking-[0.18em] text-forest">
            {eyebrow}
          </span>
        ) : null}
        <span className="font-display text-[0.92em] font-semibold leading-[1.05]">
          {children}
        </span>
      </div>
    </div>
  );
}
