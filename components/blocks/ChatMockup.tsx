import { LIAAvatar } from '@/components/blocks/LIAAvatar';
import { liaInfo, liaMockConversation } from '@/lib/content/brand';
import { Send } from 'lucide-react';

/**
 * Static, premium chat preview (used on the home hero and LIA landing).
 * For the interactive LIA page, see components/lia/LiaChat.
 */
export function ChatMockup({ variant = 'light' }: { variant?: 'light' | 'inset' }) {
  return (
    <div
      className={
        variant === 'light'
          ? 'rounded-3xl border border-forest/10 bg-white/80 p-5 shadow-card backdrop-blur'
          : 'rounded-3xl border border-white/15 bg-white/70 p-5 shadow-card backdrop-blur'
      }
    >
      <div className="flex items-center gap-3 border-b border-forest/10 pb-4">
        <LIAAvatar size={44} />
        <div className="flex-1">
          <p className="font-display text-base font-semibold text-ink">LIA</p>
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-gold" />
            {liaInfo.statusLabel}
          </p>
        </div>
        <span className="rounded-full bg-sage px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-forest">
          IA
        </span>
      </div>
      <div className="flex flex-col gap-3 py-5">
        {liaMockConversation.map((m, i) => (
          <div
            key={i}
            className={
              m.role === 'lia'
                ? 'max-w-[85%] rounded-2xl rounded-tl-sm bg-sage px-4 py-2.5 text-sm leading-relaxed text-ink'
                : 'ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-forest px-4 py-2.5 text-sm leading-relaxed text-white'
            }
          >
            {m.text}
          </div>
        ))}
        <div className="flex items-center gap-1.5 pl-1 text-forest/60">
          <span className="lia-dot inline-block h-2 w-2 rounded-full bg-forest/50" />
          <span className="lia-dot inline-block h-2 w-2 rounded-full bg-forest/50 [animation-delay:0.2s]" />
          <span className="lia-dot inline-block h-2 w-2 rounded-full bg-forest/50 [animation-delay:0.4s]" />
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-2xl border border-forest/15 bg-white px-4 py-3 text-sm text-muted">
        <span className="flex-1">Escrever uma mensagem…</span>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-ink">
          <Send className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 text-center text-[11px] text-muted">
        {liaInfo.identity}
      </p>
    </div>
  );
}
