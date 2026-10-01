import { cn } from '@/lib/utils';

/**
 * ScriptAccent — short handwritten-style microcopy in gold ink.
 *
 * Uses the Caveat font (loaded via next/font/google in app/layout.tsx as
 * --font-caveat / --font-script). Rendered sparingly for emotional accents
 * like "Mais conversa. Mais equilíbrio." or "Faz parte desta nova etapa
 * connosco.". Never for long body copy — keep to one or two lines max.
 *
 * Optional trailing decorative heart (maquette motif: small heart doodle
 * beside handwritten accents).
 */
export function ScriptAccent({
  children,
  className,
  as: As = 'p',
  heart = false,
  rotate = -3,
}: {
  children: React.ReactNode;
  className?: string;
  /** Polymorphic element — defaults to <p>. */
  as?: 'p' | 'span' | 'div' | 'h3';
  /** Optional small trailing heart doodle (maquette motif). */
  heart?: boolean;
  /** Subtle rotation in degrees (default -3°, handwritten feel). */
  rotate?: number;
}) {
  return (
    <As
      className={cn('font-script text-2xl leading-tight text-gold md:text-3xl', className)}
      style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'center' }}
    >
      {children}
      {heart ? (
        <span aria-hidden className="ml-1 inline-block align-middle text-gold/90">
          <svg viewBox="0 0 16 16" className="inline-block h-3.5 w-3.5 fill-current">
            <path d="M8 14.5C8 14.5 1.5 10.3 1.5 6C1.5 3.5 3.2 2 5 2C6.4 2 7.5 3 8 4C8.5 3 9.6 2 11 2C12.8 2 14.5 3.5 14.5 6C14.5 10.3 8 14.5 8 14.5Z" />
          </svg>
        </span>
      ) : null}
    </As>
  );
}
