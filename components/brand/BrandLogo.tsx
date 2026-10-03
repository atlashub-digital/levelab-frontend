import { cn } from '@/lib/utils';

/**
 * LeveLab lockup as shown in the V2 mockups: line-art leaf mark + serif
 * wordmark + tagline.
 *
 * INTERIM: rebuilt in SVG/HTML from the mockups until the canonical vector
 * logo is delivered (see ASSET-MANIFEST.md → levelab-logo.svg). When it
 * arrives, replace <LeafMark/> and the wordmark with the official SVG here —
 * every header/footer uses this component.
 */
export function BrandLogo({
  tone = 'dark',
  tagline = true,
  size = 'md',
  taglineText = 'Saúde • Bem-estar • Longevidade',
  className,
}: {
  tone?: 'dark' | 'light';
  tagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  taglineText?: string;
  className?: string;
}) {
  const word = { sm: 'text-[22px]', md: 'text-[26px]', lg: 'text-[32px]' }[size];
  const mark = { sm: 'h-8 w-8', md: 'h-9 w-9', lg: 'h-11 w-11' }[size];
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LeafMark className={cn(mark, tone === 'dark' ? 'text-ink' : 'text-ivory')} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-semibold tracking-[-0.01em]',
            word,
            tone === 'dark' ? 'text-ink' : 'text-ivory',
          )}
        >
          LeveLab
        </span>
        {tagline ? (
          <span
            className={cn(
              'mt-1 text-[8.5px] font-semibold uppercase tracking-[0.2em]',
              tone === 'dark' ? 'text-ink/70' : 'text-ivory/70',
            )}
          >
            {taglineText}
          </span>
        ) : null}
      </span>
    </span>
  );
}

export function LeafMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={className}>
      <path
        d="M30.5 6.5C19 7.4 10.8 14.4 9.7 24.6c-.3 2.6.1 5 .9 7.1 8.6-.9 15.3-6.3 18-14.1 1-2.9 1.6-6.6 1.9-11.1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M26.8 11.2C20.4 17 15.2 24.3 11.6 32.6M5.5 35.5c2.7-1.3 4.6-2.2 6.1-2.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
