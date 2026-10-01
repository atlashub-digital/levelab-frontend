import { MessageCircle } from 'lucide-react';
import { cn, whatsappUrl } from '@/lib/utils';

/**
 * WhatsApp CTA. Uses the configured phone number (public).
 * No API tokens or service secrets in the browser.
 */
export function WhatsAppCTA({
  phone,
  text,
  children,
  variant = 'primary',
  size = 'md',
  className,
}: {
  phone: string;
  text?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'gold' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const href = whatsappUrl(phone, text);
  const variants = {
    primary: 'bg-forest text-white hover:bg-forest-2 shadow-soft hover:shadow-lift',
    gold: 'bg-gradient-gold text-ink hover:opacity-90 shadow-soft',
    secondary: 'border border-forest/25 text-forest hover:bg-forest/5',
    outline: 'border border-forest/15 text-forest bg-white/70 backdrop-blur hover:border-forest/35',
  };
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-12 px-6 text-[15px]',
    lg: 'h-14 px-8 text-base',
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <MessageCircle className="h-4 w-4" />
      {children}
    </a>
  );
}
