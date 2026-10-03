import { MessageCircle } from 'lucide-react';
import { cn, whatsappUrl } from '@/lib/utils';

/**
 * WhatsApp CTA. Uses the configured phone number (public).
 * No API tokens or service secrets in the browser.
 *
 * Pass `disabled` to render a non-clickable, muted state (used for the LIA
 * launch group before the official invite URL is supplied — see
 * config/site.ts → liaWhatsappGroupUrl = null).
 */
export function WhatsAppCTA({
  phone,
  text,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  href,
  className,
}: {
  phone?: string;
  text?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'gold' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Explicit href (e.g. WhatsApp group invite URL) overrides `phone`+`text`. */
  href?: string;
  className?: string;
}) {
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

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        role="button"
        className={cn(
          'inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full font-medium tracking-tight opacity-60',
          variants[variant],
          sizes[size],
          className,
        )}
      >
        <MessageCircle className="h-4 w-4" />
        {children}
      </span>
    );
  }

  const resolvedHref = href ?? (phone ? whatsappUrl(phone, text) : '#');
  return (
    <a
      href={resolvedHref}
      target={resolvedHref.startsWith('https://wa.me') || resolvedHref.startsWith('https://chat.whatsapp.com') ? '_blank' : undefined}
      rel={resolvedHref.startsWith('https://wa.me') || resolvedHref.startsWith('https://chat.whatsapp.com') ? 'noopener noreferrer' : undefined}
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
