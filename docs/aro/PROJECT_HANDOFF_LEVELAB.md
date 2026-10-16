# ARO Project Handoff — LeveLab

Canonical: atlashub-digital/atlashub-finance — docs/developer/START_HERE.md,
openapi/aro-v1.yaml, docs/developer/PROJECT_HANDOFF_TEMPLATE.md,
docs/developer/ACCEPTANCE_CHECKLIST.md.

## Project
```yaml
project:
  slug: levelab
  name: LeveLab
  repository: atlashub-digital/levelab-frontend
  production_url: https://levelab.org
  preview_url: pending ARO-enabled Vercel preview
```

## Product type
- [x] eBook / Reader
- [x] Download
- [x] Bundle
- [ ] Membership (future; not authorized)
- [ ] Video course
- [ ] Community / group

## Offers — proposed, NOT registered, pricing NOT approved
```yaml
offers:
  - code: levelab-forca-na-caneta-br
    product: forca-na-caneta
    market: BR
    currency: BRL
    amount_minor: 2490 # proposed; approval pending
    cadence: once
    entitlements: ["levelab:reader:forca-na-caneta"]
  - code: levelab-corpo-forte-br
    product: corpo-forte
    market: BR
    currency: BRL
    amount_minor: 6990 # proposed; approval pending
    cadence: once
    entitlements: ["levelab:reader:corpo-forte", "levelab:reader:corpo-forte-workbook"]
```
Proposed values 2490 BRL and 6990 BRL are NOT commercial approvals. Offer status draft until ARO sync and clinical/commercial review. Do not send prices from frontend; ARO verifies the registered offer.
Review existing legacy offer ids guia-corpo-forte and guia-forca-na-caneta; these
are UI ids, NOT ARO offer codes or evidence of catalog registration.
Current premium LIA promises must be separately approved/fulfilled, not assumed.

## Integration
```yaml
aro:
  api_url_env: ARO_API_URL
  project_slug_env: ARO_PROJECT_SLUG
  public_key_env: ARO_PUBLIC_KEY
  server_key_env: ARO_SERVER_KEY
  webhook_secret_env: ARO_WEBHOOK_SECRET
  webhook_path: /api/aro/webhook
```
Checkout: POST /api/aro/checkout, polling GET /api/aro/checkout/{id};
webhook: POST /api/aro/webhook (HMAC/timestamp/event id); entitlement
authority: POST /v1/entitlements/resolve using project server key,
invoked only from authenticated server routes. No providers.
Protected surfaces: /pt-br/programas/forca-na-caneta/reader,
 /pt-br/programas/corpo-forte/reader and /api/content/{assetId}.
These currently also depend on backend access checks. ARO authoritative access
needs explicit backend reconciliation before production rollout.

## Events consumed
- [x] payment.approved
- [x] payment.refunded
- [x] payment.chargeback
- [x] order.approved
- [x] entitlement.granted
- [x] entitlement.revoked

## Operational status
Feature gated with ARO_CHECKOUT_ENABLED=false by default. No assumed credentials,
no invented ARO availability; no commercial activation while product editions
lack signed editorial/nutritional QA and images/rights. No direct provider SDK.
Persistent deduplication must be provisioned on webhook store before go-live.
Webhook is never payment authority.

## Acceptance
Follow original docs/developer/ACCEPTANCE_CHECKLIST.md.
Tests must include idempotency, invalid HMAC, replay/stale timestamps, dedupe,
status pending/approved/refund, entitled/denied, bundle, recovery, protection
of server keys, controlled live payment. CI + preview + human sign-off required.
