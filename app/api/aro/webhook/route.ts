import { NextResponse } from 'next/server';
import { verifyWebhook } from '@/lib/aro/client';
import { recordAroWebhook } from '@/lib/aro/webhook-store';

export const runtime = 'nodejs';
const validTypes = new Set([
  'checkout.started','payment.pending','payment.approved','payment.failed',
  'payment.refunded','payment.chargeback','order.approved',
  'entitlement.granted','entitlement.revoked',
]);

export async function POST(req: Request) {
  if (process.env.ARO_WEBHOOK_ENABLED !== 'true') {
    return NextResponse.json({ error: 'WEBHOOK_DISABLED' }, { status: 503 });
  }
  const secret = process.env.ARO_WEBHOOK_SECRET;
  const project = process.env.ARO_PROJECT_SLUG;
  if (!secret || !project) {
    return NextResponse.json({ error: 'WEBHOOK_NOT_CONFIGURED' }, { status: 503 });
  }
  const stamp = req.headers.get('X-ARO-Timestamp') ?? '';
  const signature = req.headers.get('X-ARO-Signature') ?? '';
  const id = req.headers.get('X-ARO-Event-Id') ?? '';
  // Event ids are UUIDs according to openapi/aro-v1.yaml.
  if (!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: 'INVALID_EVENT' }, { status: 400 });
  }
  const raw = await req.text();
  if (raw.length > 65536 || !verifyWebhook(raw, stamp, signature, secret)) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  }
  let event: unknown;
  try { event = JSON.parse(raw); }
  catch { return NextResponse.json({ error: 'INVALID_REQUEST' }, { status: 400 }); }
  if (!event || typeof event !== 'object') {
    return NextResponse.json({ error: 'INVALID_REQUEST' }, { status: 400 });
  }
  const body = event as Record<string, unknown>;
  if (body.id !== id || body.project !== project
     || !validTypes.has(String(body.type))
     || typeof body.created_at !== 'string'
     || !Number.isFinite(Date.parse(body.created_at))
     || !body.data || typeof body.data !== 'object' || Array.isArray(body.data)) {
    return NextResponse.json({ error: 'INVALID_EVENT' }, { status: 400 });
  }
  try {
    // UNIQUE event_id is a durable deduplication boundary.
    // Webhook receipt does NOT grant rights; Reader queries canonical ARO.
    await recordAroWebhook({
      eventId:id, project, type:String(body.type), eventCreatedAt:body.created_at,
    });
    return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  } catch {
    // ARO will retry: never acknowledge unpersisted notifications.
    return NextResponse.json({ error:'WEBHOOK_STORAGE_UNAVAILABLE' }, { status:503 });
  }
}
