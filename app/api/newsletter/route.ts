import { NextResponse, type NextRequest } from 'next/server';
import { levelabApiUrl } from '@/lib/levelab-api';

export const runtime = 'nodejs';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Newsletter opt-in → LeveLab backend (member as LEAD + marketing consent). */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; consent?: unknown; locale?: unknown }
    | null;
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email) || email.length > 254 || body?.consent !== true) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }

  const token = process.env.WEB_FORMS_TOKEN;
  if (!token) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const res = await fetch(levelabApiUrl('/leads/newsletter'), {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-web-forms-token': token },
    body: JSON.stringify({
      email,
      consent: true,
      locale: typeof body.locale === 'string' ? body.locale.slice(0, 8) : 'pt-br',
      source: 'website.home',
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!res?.ok) return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  return NextResponse.json({ ok: true });
}
