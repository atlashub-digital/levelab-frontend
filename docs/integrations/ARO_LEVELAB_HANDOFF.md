# ARO Project Handoff — LeveLab / LIA (15 Oct 2026)

Derived from `atlashub-digital/atlashub-finance/docs/developer/PROJECT_HANDOFF_TEMPLATE.md`.
Canonical API: `atlashub-finance/openapi/aro-v1.yaml`; follow START_HERE and ACCEPTANCE_CHECKLIST.

## Project
```yaml
project:
  slug: levelab
  name: LeveLab
  repository: atlashub-digital/levelab-frontend
  backend_repository: atlashub-digital/levelab-backend
  production_url: https://levelab.org
  preview_url: PENDING_VERCEL_PREVIEW
  webhook_url: https://api.levelab.org/api/v1/aro/webhook
  market: BR
  currency: BRL
```

## Product type
- [x] eBook / Reader
- [x] Download, if licensed and approved
- [x] Bundle (Corpo Forte Guide + Workbook)
- [ ] Membership (out of this release)
- [ ] Community

## Offers — PROPOSED, NOT REGISTERED
```yaml
offers:
  - code: guia-forca-na-caneta
    product: forca-na-caneta
    market: BR
    currency: BRL
    amount_minor: PENDING_APPROVED_INTEGER
    cadence: once
    entitlements: [content:forca-na-caneta, levelab-plus]
  - code: guia-corpo-forte
    product: corpo-forte
    market: BR
    currency: BRL
    amount_minor: PENDING_APPROVED_INTEGER
    cadence: once
    entitlements: [content:corpo-forte, levelab-plus]
```
Existing LeveLab catalog treats `levelab-plus` as a **30-day** companion grant alongside the perpetual eBook. ARO must register the time-limited mapping explicitly; do not assume perpetual LIA+ or configure prices from proposals. `levelab-premium` is out of scope until separately approved.

## Integration
```yaml
aro:
  api_url_env: ARO_API_URL
  project_slug_env: ARO_PROJECT_SLUG
  public_key_env: ARO_PUBLIC_KEY
  server_key_env: ARO_SERVER_KEY
  webhook_secret_env: ARO_WEBHOOK_SECRET
  checkout_path: /api/aro/checkout
  status_path: /api/aro/status
  webhook_path: /api/v1/aro/webhook
  checkout_feature_flag: ARO_CHECKOUT_ENABLED
  entitlement_feature_flag: ARO_ENTITLEMENTS_ENABLED
```
Checkout/status proxies belong to the Next.js server; signed webhook and authoritative entitlement lookup belong to NestJS backend (webhook `https://api.levelab.org/api/v1/aro/webhook`). ARO credentials must be provisioned by infrastructure. Checkout server proxy receives project public key only; never put server key/webhook secret in browser.

## Protected surfaces
- `GET /api/v1/me/library`
- `GET /api/v1/me/content/:assetId` (actual PDF byte stream)
- `/api/content/[assetId]` (authenticated frontend proxy)
- Member Reader routes for Corpo Forte and Força na Caneta (full content via gated byte stream).

The backend verifies signed-in Supabase member identity; transitional ARO V1 resolution uses **server-verified email**. It denies missing, expired or revoked rights. Paid rights are never granted from webhooks or browser redirects. Existing separate manual complimentary grants remain visibly operator-owned.

## Events consumed (notifications only)
- [x] payment.approved
- [x] payment.refunded
- [x] payment.chargeback
- [x] order.approved
- [x] entitlement.granted
- [x] entitlement.revoked

Webhook verifies original raw body, 300s timestamp tolerance, HMAC-SHA256 and constant-time comparison, project and ID matching. Persistent inbox table `AroWebhookEvent` has unique event ID and stores no customer/payment data.

## Acceptance — canonical Definition of Done
- [x] Project code references ARO exclusively; no direct providers.
- [x] Offer codes and keys have explicit mapping proposal; prices NOT approved/registered.
- [x] Integer minor units, ISO currency and ARO normalized states in client.
- [x] Idempotency header; PIX copy/paste and CARD redirect (when ARO returns HTTPS URL).
- [x] Checkout status poll using opaque secret outside URL.
- [x] Webhook raw-body HMAC and durable deduplication code + migration.
- [x] Protected-read ARO entitlement resolver with fail-closed behavior.
- [x] Unit mock tests written and local pure-component tests executed.
- [ ] CI typecheck/build and HTTP route tests on both cloned repositories.
- [ ] ARO project + two offers + price registration confirmed.
- [ ] Controlled real payment → APPROVED order → ACTIVE entitlement → Reader.
- [ ] Duplicate event and refund/revoke end-to-end with deployed DB.
- [ ] Copydesk/clinical nutrition/exercise review of all three PDFs.
- [ ] Verified photo rights, final artwork and legal commercial policies.
- [ ] Release approval, branch merge, env secrets, controlled deployment, rollback evidence.

**STATUS: ENGINEERING DRAFT. NOT 'ARO INTEGRATION READY', NOT 'SALES READY'.**
Checkout feature flag defaults to false. No provider adapters or credentials in LeveLab. No import of Produtos-Farma.
