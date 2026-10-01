import { cn } from '@/lib/utils';

/**
 * Legal prose wrapper — consistent typography for legal pages.
 * NEW shared helper (not a modification of any existing component).
 */
export function LegalProse({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'prose-levelab max-w-2xl [&_a]:font-medium [&_a]:text-forest [&_a]:underline [&_a:hover]:text-forest-2',
        '[&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-ink [&_h2:first-child]:mt-0',
        '[&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-ink/85',
        '[&_ul]:mt-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:text-ink/85',
        '[&_li]:leading-relaxed [&_li]:marker:text-forest-2',
        '[_strong]:font-semibold [&_strong]:text-ink',
        '[&_code]:rounded-md [&_code]:border [&_code]:border-forest/10 [&_code]:bg-cream/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-forest-2',
        '[&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-forest/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LegalRevisionNote() {
  return (
    <p className="mt-6 rounded-2xl border border-gold/30 bg-cream/60 p-4 text-xs italic text-muted">
      Texto final em revisão jurídica. Esta versão é um placeholder informativo
      e não constitui aconselhamento legal.
    </p>
  );
}
