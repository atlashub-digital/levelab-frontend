/**
 * LIA transport abstraction.
 *
 * The public LIA chat must NOT call OpenAI/OpenRouter directly from the browser.
 * V1 ships with MockLiaTransport (demoable). The AtendimentoCenterLiaTransport
 * stub will be wired to the Atendimento.Center WebChat SDK in a later pass.
 *
 * Use env: NEXT_PUBLIC_ATENDIMENTO_WEBCHAT_URL
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

export function createLiaTransport(): LiaTransport {
  // V1 always uses the Mock transport. The stub above documents the future wiring.
  // const url = process.env.NEXT_PUBLIC_ATENDIMENTO_WEBCHAT_URL;
  return new MockLiaTransport();
}

export function seedConversation(locale: string): LiaMessage[] {
  return liaMockConversation.map((m, i) => ({
    id: `seed-${i}`,
    role: m.role,
    text: m.text,
  }));
}

export { liaMockConversation, type ChatMessage };
