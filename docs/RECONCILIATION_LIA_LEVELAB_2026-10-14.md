# LeveLab + LIA — Dual-domain Reconciliation (Proposal, 2026-10-14)

**Status:** review only, not a release. Preserve all production configuration.

## Surface responsibility
- `levelab.org`: institutional LeveLab, editorial products, WebReader, programs, Store, Club/Academy and accessibility/legal.
- `app.levelab.org`: member routes, login, progress, entitlements and program UI (verify DNS and deployment).
- `lia.doctor`: LIA-led website, guest chat, transparent AI identity, content discovery and links to LeveLab; **same LIA backend**, not a clone.

## Known and to verify
- This repository is connected to the observed Vercel LeveLab frontend project; production deployment reported READY. Do not assume public HTTP, auth, Reader or checkout work without browser E2E.
- Legacy `nexflowx-hub/levelab-frontend` docs refer to production; compare history and update source-of-truth references after verifying, not by deletion.

## P0 acceptance
- [ ] Site and TLS/redirect tests at 1440/390, screen reader, consent, SEO.
- [ ] Reader pages versioned against approved editorial PDFs, preview versus full entitlement checks, keyboard navigation and outbound CTA validity.
- [ ] Website-to-LIA continuity without exposing credentials or personal data in URLs.
- [ ] LIA avatar MVP uses approved 2D identity; click-to-chat; microphone opt-in only. 3D deferred to measured experiments.
- [ ] Campaign links only after destination HTTP and analytics work.
- [ ] PR with tests and screenshots; no automatic production deploy from this document.

## Canonical contracts
Notion = approved editorial master; Drive = approved assets/releases; Backend = versioned content/rights; LIA service = conversational safety/orchestration; frontend = presentation.
