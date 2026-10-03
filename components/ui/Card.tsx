import { cn } from '@/lib/utils';

export function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-forest/10 bg-white/80 shadow-soft backdrop-blur-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

const badgeVariants = {
  forest: 'bg-forest text-white',
  gold: 'bg-gradient-gold text-ink',
  sage: 'bg-sage text-forest',
  outline: 'border border-forest/20 text-forest',
  ivory: 'bg-ivory text-forest border border-forest/10',
} as const;

export function Badge({
  children,
  variant = 'forest',
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof badgeVariants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide',
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
