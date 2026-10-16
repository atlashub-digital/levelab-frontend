-- Apply only after reviewing Supabase project and migration scope.
-- ARO notifications are NOT entitlement authority.
create table if not exists public.aro_webhook_events (
  event_id uuid primary key,
  project_slug text not null,
  event_type text not null,
  event_created_at timestamptz not null,
  received_at timestamptz not null default now()
);
create index if not exists aro_webhook_events_project_received
  on public.aro_webhook_events (project_slug, received_at desc);
alter table public.aro_webhook_events enable row level security;
revoke all on public.aro_webhook_events from anon, authenticated;
-- No anon/authenticated policy. Service-role (server only) used for inserts.
-- Do NOT add triggers that directly grant/revoke commercial entitlements.
