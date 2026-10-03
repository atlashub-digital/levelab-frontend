import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-forest text-white hover:bg-forest-2 shadow-soft hover:shadow-lift',
  secondary:
    'bg-transparent text-forest border border-forest/25 hover:border-forest/50 hover:bg-forest/5',
  ghost: 'bg-transparent text-forest hover:bg-forest/5',
  gold: 'bg-gradient-gold text-ink hover:opacity-90 shadow-soft',
  outline: 'bg-white/70 text-forest border border-forest/15 hover:border-forest/35 backdrop-blur',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-8 text-base',
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = ButtonOwnProps &
  (
    | (ComponentPropsWithoutRef<'button'> & { href?: undefined })
    | (ComponentPropsWithoutRef<'a'> & { href: string })
  );

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (typeof props.href === 'string') {
    const { href, ...rest } = props as ComponentPropsWithoutRef<'a'> & { href: string };
    const external = /^https?:\/\//.test(href) || href.startsWith('https://wa.me');
    if (external) {
      return (
        <a href={href} className={cls} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { ...rest } = props as ComponentPropsWithoutRef<'button'>;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
