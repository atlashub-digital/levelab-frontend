import { NextResponse, type NextRequest } from 'next/server';
import { getSession } from '@/lib/supabase/server';
import { levelabApiUrl } from '@/lib/levelab-api';

export const runtime = 'nodejs';

/**
 * Full premium PDF for the signed-in member. The backend checks the
 * entitlement and streams the file; nothing is cached.
 */
export async function GET(_req: NextRequest, ctx: { params: Promise<{ assetId: string }> }) {
  const { assetId } = await ctx.params;
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const upstream = await fetch(levelabApiUrl(`/me/content/${encodeURIComponent(assetId)}`), {
    headers: { Authorization: `Bearer ${session.accessToken}` },
    cache: 'no-store',
  }).catch(() => null);

  if (!upstream) return NextResponse.json({ error: 'unavailable' }, { status: 502 });
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: upstream.status === 403 ? 'no_access' : 'not_found' },
      { status: upstream.status === 403 ? 403 : 404 },
    );
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Cache-Control': 'private, no-store',
      'Content-Disposition': 'inline',
      'X-Robots-Tag': 'noindex',
    },
  });
}
