# LeveLab — SALES READY audit and implementation gate (2026-10-15)

> **Current state: NOT SALES READY.** No deployment, checkout activation, status promotion or permission change is authorised by this audit.

## Canonical assets transferred

- Portfolio ZIP AMF: https://drive.google.com/file/d/18hNzm2F_2338KpZmgDbmQYbXkS_w81_J/view
- Força na Caneta: https://drive.google.com/drive/folders/1xlnFuJrFZOwk_A2_ql8ZPBZFj74Ilh45
- Corpo Forte: https://drive.google.com/drive/folders/10Vwg2yk5vKakJHIhSO0NPwwZvjQmft1a
- Authoritative status + evidence ledger: https://docs.google.com/document/d/1fhp2gSWzhNtndPNBN9VaHuO4aAtKK6GJl80PofqV1Fs/edit

## Verified code findings on `main`

1. Frontend `components/reader/ProductReader.tsx`: paywall buttons call `WhatsAppCTA`, not a checkout service. There is no verified automatic purchase-to-entitlement transaction in this code.
2. Frontend `app/api/content/[assetId]/route.ts`: authenticated proxy forwards Supabase bearer token to backend and avoids caching.
3. Backend `src/access/admin.controller.ts`: explicit manual entitlement endpoint 'while no payment provider is wired'. This is an **operator grant**, not a payment confirmation.
4. Backend `src/access/me.controller.ts`: validates entitlement and streams PDF files from `CONTENT_DIR`.
5. Backend `src/access/access.catalog.ts`: protected assets point to the **v2.0 PDFs** for Corpo Forte and Força na Caneta. The new FNC v2.1 cannot replace production files without catalog/version migration and tests.
6. Frontend `lib/content/readers.ts`: older mock provider/future API TODO is not a completed proof of real reading content.
7. Manifest supplied in Source Pack is `draft`, with 10 Publications, 2 Programs, 1 Collection. This schema has **NOT** been validated with AMF package runtime in CI here.

## P0 implementation steps — staged only

- [ ] Decide authorised payment provider and pricing, credentials held only in secrets vault; no reliance on manual WhatsApp grants for automatic sales.
- [ ] Prepare checkout service/API order records, verified payment webhooks with signature, idempotent event handling, refund/revocation logic.
- [ ] Map existing `OFFERS` to confirmed paid SKUs; do not regrant on failed/unpaid transactions.
- [ ] Prepare signed release PDFs (not unapproved concept covers or source extracts). Upload to secure backend storage and update catalog file names/versions.
- [ ] Ensure preview endpoints remain free-only, full PDF only with valid entitlement, and no private content is baked into public frontend bundles.
- [ ] Test checkout → payment → webhooks → grants → login → PDF download for each SKU and bundle. Negative tests: unauthenticated, unpaid, wrong asset, revoked, expired, webhook replay, refund.
- [ ] AMF schema/core validation and browser QA 1440/390px for Reader, program modules, checkout and access.
- [ ] Marketing policy/consumer law: clear supplier, terms, cancellation/arrependimento, help, tax invoices where applicable, LGPD data minimisation/consent.

## Editorial dependencies

- Força na Caneta: verify nutrition, 10 recipes, storage, food images, licenses, and GLP-1 safety statements; deliver an approved v2.1+ PDF.
- Corpo Forte: full 105pp Guia and 77pp Workbook visual/editorial rebuilding and copydesk; eliminate QR placeholders, version credit inconsistencies, verify scientific sources; qualified review for exercise/health content.
- New cover artwork is **CONCEPT / NOT APPROVED**.
- No domain `lia.doctor` as a functional CTA until deployed and tested.

## Acceptance criteria

Only mark `READY FOR AMF INGESTION` after actual Schema/Core/CI/Preview pass with correct source mapping. Only mark `SALES READY` after signed editorial/nutritional/art/legal gates AND an E2E real controlled transaction with functioning member access; production deploy requires explicit coordinated release.

**Do not import Produtos-Farma. Do not merge this draft PR automatically.**
