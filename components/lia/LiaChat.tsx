'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Apple,
  ArrowUp,
  CalendarHeart,
  Footprints,
  Info,
  MessageCircle,
  Mic,
  MoonStar,
  Paperclip,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LIAAvatar } from '@/components/blocks/LIAAvatar';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { siteConfig } from '@/config/site';
import { createLiaTransport, type LiaMessage } from '@/lib/lia/transport';

const SUGGESTIONS = [
  { icon: CalendarHeart, title: 'Organizar a minha rotina', prompt: 'Quero organizar melhor a minha rotina. Por onde começo?' },
  { icon: Apple, title: 'Refeições mais leves', prompt: 'Tem ideias de refeições simples e nutritivas para o dia a dia?' },
  { icon: Footprints, title: 'Movimento com pouco tempo', prompt: 'Tenho pouco tempo. Como posso me movimentar mais durante o dia?' },
  { icon: MoonStar, title: 'Dormir melhor', prompt: 'Durmo mal e acordo sem energia. O que posso observar primeiro?' },
  { icon: Sparkles, title: 'Conhecer o Corpo Forte', prompt: 'Como funciona o programa Corpo Forte?' },
  { icon: RotateCcw, title: 'Voltar à rotina', prompt: 'Saí da rotina. Pode me ajudar a voltar sem tentar fazer tudo de uma vez?' },
];

/**
 * LIA webchat (/[locale]/lia/chat). Guest mode: short session memory, no
 * personal data stored. Transport → /api/lia/chat → LIA Core.
 */
export function LiaChat({ locale }: { locale: string }) {
  const transportRef = useRef(createLiaTransport());
  const welcome = (): LiaMessage => ({ id: 'welcome', role: 'lia', text: transportRef.current.welcome(locale) });
  const [messages, setMessages] = useState<LiaMessage[]>(() => [welcome()]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [partial, setPartial] = useState('');
  const streamRef = useRef<(() => void) | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const empty = messages.length <= 1 && !streaming;

  // Follow the conversation, but keep the welcome/suggestions view at the top.
  useEffect(() => {
    if (messages.length <= 1 && !streaming) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, partial, streaming]);

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
          inputRef.current?.focus();
        },
        onError: () => {
          setMessages((m) => [
            ...m,
            { id: assistantId, role: 'lia', text: 'Desculpe, tive um problema técnico. Pode repetir?' },
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
    setMessages([welcome()]);
    setPartial('');
    setStreaming(false);
  }

  return (
    <div className="grid h-[calc(100dvh-var(--header-height))] min-h-[34rem] lg:grid-cols-[19rem_minmax(0,1fr)]">
      {/* Profile & context */}
      <aside className="hidden flex-col border-r border-line bg-paper lg:flex">
        <div className="flex flex-col items-center border-b border-line px-6 py-8 text-center">
          <LIAAvatar size={96} />
          <p className="mt-4 font-display text-3xl leading-none text-ink">LIA</p>
          <p className="mt-1 text-sm text-ink/65">Sua companheira de jornada</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-xs font-semibold text-forest">
            <span className="h-2 w-2 rounded-full bg-forest-2" /> Online
          </span>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Podemos conversar sobre</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {['Alimentação', 'Movimento', 'Rotina', 'Sono', 'Bem-estar', 'Programas'].map((t) => (
                <li key={t} className="rounded-full border border-line bg-ivory px-3 py-1 text-xs text-ink/75">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-cream/70 p-4 text-xs leading-relaxed text-ink/70">
            <p className="flex items-center gap-1.5 font-semibold text-forest">
              <ShieldCheck className="h-4 w-4" /> Transparência
            </p>
            <p className="mt-1.5">
              A LIA é uma assistente virtual com inteligência artificial. É educativa: não diagnostica, não prescreve e não
              substitui profissionais de saúde. Nesta conversa não guardamos dados pessoais.
            </p>
            <Link href={`/${locale}/legal/ia`} className="mt-2 inline-block font-semibold text-forest underline-offset-4 hover:underline">
              Saber mais
            </Link>
          </div>
        </div>
        <div className="space-y-2 border-t border-line p-5">
          <WhatsAppCTA
            phone={siteConfig.commercialWhatsappNumber}
            text="Olá! Vim da conversa com a LIA e gostaria de falar com alguém da equipe."
            variant="outline"
            size="sm"
            className="w-full justify-center !rounded-md"
          >
            Falar com a equipe
          </WhatsAppCTA>
        </div>
      </aside>

      {/* Conversation */}
      <section className="flex min-h-0 flex-col bg-ivory" aria-label="Conversa com a LIA">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-ivory/90 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <LIAAvatar size={42} ring={false} />
            <div>
              <p className="flex items-center gap-2 font-display text-xl leading-none text-ink">
                LIA <span className="h-2 w-2 rounded-full bg-forest-2" aria-label="online" />
              </p>
              <p className="mt-1 text-xs text-ink/60">Assistente virtual LeveLab · IA</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href={`/${locale}/lia`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-forest hover:bg-forest/5 lg:hidden"
              aria-label="Sobre a LIA"
            >
              <Info className="h-[18px] w-[18px]" />
            </Link>
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-forest hover:bg-forest/5"
            >
              <RotateCcw className="h-4 w-4" /> <span className="hidden sm:inline">Nova conversa</span>
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="scrollbar-soft flex-1 overflow-y-auto" aria-live="polite">
          <div className="mx-auto flex w-full max-w-[46rem] flex-col gap-5 px-4 py-8 sm:px-6">
            {empty ? (
              <div className="flex flex-col items-center pb-2 pt-4 text-center">
                <LIAAvatar size={88} />
                <h1 className="mt-5 font-display text-[2.2rem] leading-tight text-ink">
                  Olá! Eu sou a <em className="italic text-gold">LIA</em>.
                </h1>
                <p className="mt-2 max-w-md text-ink/70">
                  Estou aqui para ajudar você a construir uma vida mais leve. Escolha um tema ou escreva a sua pergunta.
                </p>
                <ul className="mt-8 grid w-full gap-3 sm:grid-cols-2">
                  {SUGGESTIONS.map(({ icon: Icon, title, prompt }) => (
                    <li key={title}>
                      <button
                        type="button"
                        onClick={() => send(prompt)}
                        className="flex w-full items-center gap-3 rounded-lg bg-paper p-4 text-left ring-1 ring-line transition-all hover:ring-forest/30 hover:shadow-soft"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
                          <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                        </span>
                        <span className="text-sm font-medium text-ink">{title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              messages.map((m) => <Bubble key={m.id} role={m.role} text={m.text} />)
            )}
            {streaming ? <Bubble role="lia" text={partial} typing={partial === ''} /> : null}
          </div>
        </div>

        <div className="border-t border-line bg-ivory px-4 pb-4 pt-3 sm:px-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="mx-auto flex max-w-[46rem] items-end gap-2 rounded-xl bg-paper p-2 ring-1 ring-line focus-within:ring-forest/40"
          >
            <button
              type="button"
              disabled
              title="Envio de imagens — em breve"
              aria-label="Anexar imagem (em breve)"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted opacity-50"
            >
              <Paperclip className="h-[18px] w-[18px]" />
            </button>
            <label htmlFor="lia-input" className="sr-only">
              Mensagem para a LIA
            </label>
            <textarea
              id="lia-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={2000}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Escreva a sua mensagem…"
              className="max-h-40 min-h-10 flex-1 resize-none bg-transparent py-2.5 text-[15px] text-ink placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              disabled
              title="Mensagens de voz — em breve"
              aria-label="Mensagem de voz (em breve)"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted opacity-50 sm:inline-flex"
            >
              <Mic className="h-[18px] w-[18px]" />
            </button>
            <button
              type="submit"
              disabled={!input.trim() || streaming}
              aria-label="Enviar"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-ivory transition-opacity hover:bg-forest-2 disabled:opacity-40"
            >
              <ArrowUp className="h-[18px] w-[18px]" />
            </button>
          </form>
          <p className="mx-auto mt-2 max-w-[46rem] text-center text-[11px] text-muted">
            <MessageCircle className="mr-1 inline h-3 w-3" />
            A LIA é uma IA educativa e pode errar. Em caso de urgência, procure um serviço de saúde.
          </p>
        </div>
      </section>
    </div>
  );
}

function Bubble({ role, text, typing }: { role: 'lia' | 'user'; text: string; typing?: boolean }) {
  const isLia = role === 'lia';
  return (
    <div className={cn('flex items-end gap-2.5', isLia ? 'justify-start' : 'justify-end')}>
      {isLia ? <LIAAvatar size={32} ring={false} className="shrink-0" /> : null}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed',
          isLia ? 'rounded-bl-sm bg-paper text-ink ring-1 ring-line' : 'rounded-br-sm bg-forest text-ivory',
        )}
      >
        {typing ? (
          <span className="flex items-center gap-1 py-1" aria-label="A LIA está a escrever">
            <span className="lia-dot inline-block h-2 w-2 rounded-full bg-forest/60" />
            <span className="lia-dot inline-block h-2 w-2 rounded-full bg-forest/60 [animation-delay:0.2s]" />
            <span className="lia-dot inline-block h-2 w-2 rounded-full bg-forest/60 [animation-delay:0.4s]" />
          </span>
        ) : (
          <RichText text={text} />
        )}
      </div>
    </div>
  );
}

/** Line breaks and **bold** from LIA replies, without injecting HTML. */
function RichText({ text }: { text: string }) {
  return (
    <span className="whitespace-pre-line">
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </span>
  );
}
