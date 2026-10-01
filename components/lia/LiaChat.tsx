'use client';

import { useEffect, useRef, useState } from 'react';
import { Send, Mic, Paperclip, Plus, MessageCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LIAAvatar } from '@/components/blocks/LIAAvatar';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { liaQuickActions, liaInfo } from '@/lib/content/brand';
import { siteConfig } from '@/config/site';
import { createLiaTransport, seedConversation, type LiaMessage } from '@/lib/lia/transport';
import type { LocaleCopy } from '@/lib/i18n';

export function LiaChat({ locale, copy }: { locale: string; copy: LocaleCopy }) {
  const transportRef = useRef(createLiaTransport());
  const [messages, setMessages] = useState<LiaMessage[]>(() => seedConversation(locale));
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [partial, setPartial] = useState('');
  const streamRef = useRef<(() => void) | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, partial]);

  function send(text: string) {
    const value = text.trim();
    if (!value || streaming) return;
    const userMsg: LiaMessage = { id: `u-${Date.now()}`, role: 'user', text: value };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setStreaming(true);
    setPartial('');
    const assistantId = `a-${Date.now()}`;

    streamRef.current = transportRef.current.stream(
      value,
      { history: messages, locale },
      {
        onToken: (t) => setPartial((p) => p + t),
        onDone: (full) => {
          setMessages((m) => [...m, { id: assistantId, role: 'lia', text: full }]);
          setPartial('');
          setStreaming(false);
          streamRef.current = null;
        },
        onError: () => {
          setMessages((m) => [
            ...m,
            {
              id: assistantId,
              role: 'lia',
              text: 'Desculpe, tive um problema técnico. Pode repetir?',
            },
          ]);
          setPartial('');
          setStreaming(false);
          streamRef.current = null;
        },
      },
    );
  }

  function reset() {
    streamRef.current?.();
    setMessages([{ id: 'welcome', role: 'lia', text: transportRef.current.welcome(locale) }]);
    setPartial('');
    setStreaming(false);
  }

  const history = [
    { id: 'h1', title: 'Planejar minha rotina matinal', time: 'hoje' },
    { id: 'h2', title: 'Refeições que sustentam a tarde', time: 'ontem' },
    { id: 'h3', title: 'Movimento para hoje', time: 'ontem' },
  ];

  return (
    <div className="grid min-h-[calc(100vh-72px)] lg:grid-cols-[260px_1fr]">
      <aside className="hidden flex-col gap-2 border-r border-forest/10 bg-cream/40 p-5 lg:flex">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-white transition-colors hover:bg-forest-2"
        >
          <Plus className="h-4 w-4" /> Nova conversa
        </button>
        <p className="mt-4 px-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Histórico
        </p>
        <ul className="flex flex-col gap-1">
          {history.map((h) => (
            <li key={h.id}>
              <button
                type="button"
                className="w-full rounded-xl px-2 py-2 text-left text-sm text-muted transition-colors hover:bg-forest/5 hover:text-ink"
              >
                <span className="block truncate">{h.title}</span>
                <span className="block text-[11px] text-muted/70">{h.time}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-auto rounded-2xl border border-forest/10 bg-white p-3 text-xs text-muted">
          <p className="flex items-center gap-1.5 font-semibold text-forest">
            <ShieldCheck className="h-3.5 w-3.5" /> Modo visitante
          </p>
          <p className="mt-1">Memória curta, sem dados sensíveis. A conta chega numa próxima fase.</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-forest/10 bg-ivory/85 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <LIAAvatar size={44} />
            <div>
              <p className="font-display text-base font-semibold text-ink">LIA</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span className="inline-block h-2 w-2 rounded-full bg-gold" />
                {liaInfo.statusLabel} · IA
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <WhatsAppCTA
              phone={siteConfig.liaWhatsappNumber}
              text="Olá! Quero continuar a conversa com a LIA."
              variant="outline"
              size="sm"
            >
              {copy.common.continueWhatsapp}
            </WhatsAppCTA>
            <button
              type="button"
              onClick={reset}
              aria-label="Nova conversa"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-forest/15 text-forest hover:bg-forest/5 lg:hidden"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="scrollbar-soft flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} role={m.role} text={m.text} />
            ))}
            {streaming ? (
              <MessageBubble role="lia" text={partial} typing={partial === ''} />
            ) : null}
          </div>
        </div>

        <div className="border-t border-forest/10 bg-ivory/85 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-2xl flex-col gap-2">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-soft">
              {liaQuickActions.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => send(q.label)}
                  className="inline-flex h-8 shrink-0 items-center rounded-full border border-forest/15 px-3 text-xs font-medium text-forest transition-colors hover:bg-forest/5"
                >
                  {q.label}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 rounded-full border border-forest/15 bg-white px-3 py-2 shadow-soft"
            >
              <button
                type="button"
                aria-label="Anexar imagem ou ficheiro"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-forest/5"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escrever uma mensagem…"
                className="h-10 flex-1 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                type="button"
                aria-label="Microfone"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-forest/5"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                aria-label="Enviar"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-forest text-white transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="text-center text-[11px] text-muted">{liaInfo.identity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  role,
  text,
  typing,
}: {
  role: 'lia' | 'user';
  text: string;
  typing?: boolean;
}) {
  const isLia = role === 'lia';
  return (
    <div className={cn('flex items-end gap-2', isLia ? 'justify-start' : 'justify-end')}>
      {isLia ? <LIAAvatar size={32} ring={false} /> : null}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isLia
            ? 'rounded-bl-sm bg-sage text-ink'
            : 'rounded-br-sm bg-forest text-white',
        )}
      >
        {typing ? (
          <span className="flex items-center gap-1 py-1 text-forest/70">
            <span className="lia-dot inline-block h-2 w-2 rounded-full bg-forest/60" />
            <span className="lia-dot inline-block h-2 w-2 rounded-full bg-forest/60 [animation-delay:0.2s]" />
            <span className="lia-dot inline-block h-2 w-2 rounded-full bg-forest/60 [animation-delay:0.4s]" />
          </span>
        ) : (
          text
        )}
      </div>
    </div>
  );
}
