/**
 * LIA transport abstraction.
 *
 * The public LIA chat must NOT call OpenAI/OpenRouter (or LIA Core) directly
 * from the browser. HttpLiaTransport calls the site's /api/lia/chat route,
 * which holds the LIA service token server-side. MockLiaTransport remains the
 * fallback when that route is not configured.
 */
import { liaMockConversation, type ChatMessage } from '@/lib/content/brand';

export type LiaRole = 'lia' | 'user';

export interface LiaMessage {
  id: string;
  role: LiaRole;
  text: string;
  /** streaming-ready: partial while in-flight */
  partial?: boolean;
}

export interface LiaSendContext {
  history: LiaMessage[];
  locale: string;
  attribution?: Record<string, string>;
}

export interface LiaTransport {
  /** Subscribe to streamed assistant tokens. Returns a cancel function. */
  stream(
    input: string,
    ctx: LiaSendContext,
    handlers: {
      onToken: (token: string) => void;
      onDone: (full: string) => void;
      onError: (err: Error) => void;
    },
  ): () => void;
  /** Quick canned welcome used in guest mode. */
  welcome(locale: string): string;
}

const WELCOME: Record<string, string> = {
  'pt-br':
    'Olá! Sou a LIA, assistente de bem-estar da LeveLab. Posso ajudar com rotina, alimentação, movimento e hábitos. Por onde quer começar?',
  'pt-pt':
    'Olá! Sou a LIA, assistente de bem-estar da LeveLab. Posso ajudar com rotina, alimentação, movimento e hábitos. Por onde quer começar?',
  en: "Hi! I'm LIA, LeveLab's well-being assistant. I can help with routine, food, movement and habits. Where would you like to start?",
  es: 'Hola, soy LIA, la asistente de bienestar de LeveLab. Puedo ayudarte con rutina, alimentación, movimiento y hábitos. ¿Por dónde quieres empezar?',
};

const MOCK_REPLIES = [
  'Boa. Que tal começarmos por um pequeno hábito hoje? Posso ajudar a montar isso passo a passo.',
  'Entendi. Vamos organizar isso de forma calma e realista — sem pressa e sem pressão.',
  'Posso anotar isso e voltarmos amanhã. A constância é mais importante que a intensidade.',
  'Isso encaixa bem no método LeveLab — leve, com método e acompanhado. Quer que eu continue?',
];

/**
 * Mock transport — purely client-side, deterministic, no network.
 * Provides a demoable, streaming-style experience for the public LIA page.
 */
export class MockLiaTransport implements LiaTransport {
  welcome(locale: string): string {
    return WELCOME[locale] ?? WELCOME['pt-br'];
  }

  stream(
    input: string,
    _ctx: LiaSendContext,
    handlers: { onToken: (t: string) => void; onDone: (f: string) => void; onError: (e: Error) => void },
  ): () => void {
    const reply = MOCK_REPLIES[input.length % MOCK_REPLIES.length];
    let i = 0;
    const timer = setInterval(() => {
      if (i >= reply.length) {
        clearInterval(timer);
        handlers.onDone(reply);
        return;
      }
      handlers.onToken(reply[i]);
      i += 1;
    }, 18);
    return () => clearInterval(timer);
  }
}

/**
 * Atendimento.Center transport stub. Real wiring happens in the next pass
 * using NEXT_PUBLIC_ATENDIMENTO_WEBCHAT_URL + the Atendimento.Center SDK.
 */
export class AtendimentoCenterLiaTransport implements LiaTransport {
  constructor(private webchatUrl: string) {}

  welcome(locale: string): string {
    return WELCOME[locale] ?? WELCOME['pt-br'];
  }

  stream(
    _input: string,
    _ctx: LiaSendContext,
    handlers: { onToken: (t: string) => void; onDone: (f: string) => void; onError: (e: Error) => void },
  ): () => void {
    handlers.onError(
      new Error('Atendimento.Center transport not wired yet — using Mock fallback.'),
    );
    return () => {};
  }
}

const RATE_LIMITED_REPLY =
  'Conversámos bastante em pouco tempo. Faça uma pequena pausa e volte daqui a alguns minutos — estarei por aqui.';

/**
 * Real LIA via the site's own server route (/api/lia/chat), which holds the
 * LIA service token. Falls back to the mock when the route is not configured
 * (e.g. local dev without LIA_API_URL / LIA_SERVICE_TOKEN).
 */
export class HttpLiaTransport implements LiaTransport {
  private readonly fallback = new MockLiaTransport();

  welcome(locale: string): string {
    return WELCOME[locale] ?? WELCOME['pt-br'];
  }

  stream(
    input: string,
    ctx: LiaSendContext,
    handlers: { onToken: (t: string) => void; onDone: (f: string) => void; onError: (e: Error) => void },
  ): () => void {
    const controller = new AbortController();
    const history = ctx.history
      .filter((m) => !m.partial && m.text.trim())
      .map((m) => ({ role: m.role === 'lia' ? 'assistant' : 'user', text: m.text }));

    fetch('/api/lia/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: input, history }),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (res.status === 503) {
          this.fallback.stream(input, ctx, handlers);
          return;
        }
        if (res.status === 429) {
          handlers.onDone(RATE_LIMITED_REPLY);
          return;
        }
        if (!res.ok) throw new Error(`LIA request failed (${res.status})`);
        const data = (await res.json()) as { reply?: string };
        if (!data.reply) throw new Error('Empty LIA reply');
        handlers.onDone(data.reply);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        handlers.onError(err instanceof Error ? err : new Error(String(err)));
      });

    return () => controller.abort();
  }
}

export function createLiaTransport(): LiaTransport {
  return new HttpLiaTransport();
}

export function seedConversation(locale: string): LiaMessage[] {
  return liaMockConversation.map((m, i) => ({
    id: `seed-${i}`,
    role: m.role,
    text: m.text,
  }));
}

export { liaMockConversation, type ChatMessage };
