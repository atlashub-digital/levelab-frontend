/**
 * Server-side proxy: browser -> this route -> LIA Core (api.lia.doctor).
 *
 * The LIA service token never reaches the browser. Guest mode only: no
 * memberId is forwarded (a client-supplied id would be trusted blindly).
 *
 * Env (server-only, set in Vercel):
 *   LIA_API_URL        e.g. https://api.lia.doctor
 *   LIA_SERVICE_TOKEN  same value as LIA_SERVICE_TOKEN in levelab-lia
 */
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_MESSAGE = 2000;
const MAX_TURNS = 12;
const MAX_TURN_TEXT = 4000;

// Best-effort per-instance limiter. Serverless instances do not share memory,
// so this caps bursts from one client, not global spend.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

type Turn = { role: 'user' | 'assistant'; text: string };

function parseBody(body: unknown): { message: string; history: Turn[] } | null {
  if (!body || typeof body !== 'object') return null;
  const { message, history } = body as { message?: unknown; history?: unknown };
  if (typeof message !== 'string') return null;
  const trimmed = message.trim();
  if (!trimmed || trimmed.length > MAX_MESSAGE) return null;

  const turns: Turn[] = Array.isArray(history)
    ? history
        .filter(
          (t): t is Turn =>
            !!t &&
            typeof t === 'object' &&
            ((t as Turn).role === 'user' || (t as Turn).role === 'assistant') &&
            typeof (t as Turn).text === 'string' &&
            (t as Turn).text.trim().length > 0,
        )
        .slice(-MAX_TURNS)
        .map((t) => ({ role: t.role, text: t.text.slice(0, MAX_TURN_TEXT) }))
    : [];

  return { message: trimmed, history: turns };
}

export async function POST(req: NextRequest) {
  const apiUrl = process.env.LIA_API_URL?.replace(/\/$/, '');
  const token = process.env.LIA_SERVICE_TOKEN;
  if (!apiUrl || !token) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const parsed = parseBody(await req.json().catch(() => null));
  if (!parsed) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  try {
    const res = await fetch(`${apiUrl}/api/v1/chat`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-lia-service-token': token,
      },
      body: JSON.stringify({
        message: parsed.message,
        history: parsed.history,
        channel: 'web',
      }),
      signal: AbortSignal.timeout(55_000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
    }

    const data = (await res.json()) as { reply?: string; action?: string };
    if (!data.reply) {
      return NextResponse.json({ error: 'empty_reply' }, { status: 502 });
    }

    return NextResponse.json({ reply: data.reply, action: data.action ?? 'reply' });
  } catch {
    return NextResponse.json({ error: 'upstream_unavailable' }, { status: 504 });
  }
}
