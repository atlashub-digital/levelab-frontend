# ARO Definition of Done — LeveLab (15 out 2026)

Source: atlashub-digital/atlashub-finance/docs/developer/ACCEPTANCE_CHECKLIST.md.

## Contract
- [x] Code references ARO only; no PixGo/MisticPay/Stripe project adapter.
- [ ] Offer codes registered and approved in ARO. Draft only; prices deliberately null.
- [x] Entitlement mapping explicit in aro.project.yaml.
- [x] Amount returned by ARO as integer minor units with ISO currency.
- [x] Code uses normalized checkout states.

## Checkout
- [ ] Live/preview ARO create and polling tests (not executed).
- [x] API client sends Idempotency-Key.
- [x] Basic PIX payment instruction, PENDING and APPROVED UI implemented.
- [x] Failure/expired cancellation messages implemented.
- [ ] Checkout UX/browser tested at 390 and 1440 px.

## Webhook
- [x] Raw body, X-ARO-Timestamp and HMAC sha256, timing-safe compare.
- [ ] Durable event ID deduplication and storage: NOT IMPLEMENTED.
- [ ] Handler 2xx + quick acknowledgement: intentionally fails closed 503.
- [ ] Duplicate delivery tests: blocked until durable store.

## Entitlement
- [x] Server-side ARO resolver helper, ACTIVE / REVOKED / EXPIRED logic.
- [ ] Wire resolver into real backend /me/content and Reader authorization consistently.
- [ ] Existing backend token/identity and ARO customer identity reconciled.
- [ ] Tested bundle rights, purchase recovery, refunds and revocations.

## Security
- [x] No provider payment secrets or payment router.
- [x] ARO server key never sent to browser by integration route.
- [x] Data minimized and no logging of payer documents.
- [ ] Server-held production secrets configured through approved Vercel environment.

## Release
- [ ] Controlled payment.
- [ ] ARO Order APPROVED.
- [ ] Entitlement ACTIVE.
- [ ] Protected content successfully opens.
- [ ] Duplicate event, refund/revoke and rollback tests.
- [ ] Editorial medical/nutrition review, rights of media, business signoff.

**Result:** INTEGRATION SCAFFOLD / CONTRACT PREVIEW. NOT ARO INTEGRATION READY; NOT SALES READY.
Feature default ARO_CHECKOUT_ENABLED=false. Never merge or enable in production until verification.
