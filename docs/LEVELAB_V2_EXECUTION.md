# LeveLab V2 — G0–G6 | Implementation ledger
Date: 2026-10-26
Status: PREVIEW / NOT PRODUCTION APPROVED
Source: executive instructions supplied by project direction.

## Canonical infrastructure (G0)
- GitHub: `atlashub-digital/levelab-frontend`, `atlashub-digital/levelab-backend`, `atlashub-digital/levelab-lia`.
- Vercel project confirmed by direction: `https://vercel.com/atlas-hub1/levelab-frontend`.
- Public domain: `https://levelab.org`.
- Prior `nexflowx-hub/levelab-*` implementations are not write targets.
- Vercel connected app permission currently does not allow project inspection in `atlas-hub1`; verify production commit/branch and deploy preview in authorized context. No DNS changes.

## Scope and product truth (G1)
- `corpo-forte`: **Corpo Forte — Além da Balança**, one commercial SKU, digital book **plus** workbook `O Meu Corpo em Construção`, BRL **R$39.90** approved by direction.
- `tomei-mounjaro`: **Tomei Mounjaro. E Agora?**, new eBook. Prior BRL R$39.90 is a proposal until separately approved for the ARO offer.
- `forca-na-caneta`: historical 7-day publication, **under editorial review**; do not delete or replace silently, do not sell an unverified version.
- The workbook is an **included asset**, not a distinct paid SKU.
- Source Drive canonical:
  - MSL001: https://drive.google.com/drive/folders/1R0ocDdsUOVfhjUARP9L2Nxzsr_coZjva
  - MSL002: https://drive.google.com/drive/folders/1c-MH7NFnwLgHaiTZZyhYjG3FtOH4NgMF
  - MSL003: https://drive.google.com/drive/folders/1Gj1-4WJoFo2Kh3-OogTfx5dRbaU9eHir
- Direction confirmed editorial content approval despite the historical `NAO_PUBLICAR` proof filenames. Do not ship named proof files directly: generate release-named assets, verify author/credits, page counts, cover, regulatory copy and Reader manifests, then record SHA256 of final bytes and the exact approval evidence.
- Replace v2.0 reader assumptions (105/77 pages) with observed actual counts of release exports; avoid updating just the numbers while keeping old chapter offsets.

## Commerce & access architecture (G3–G4)
- Two independent channels: Hotmart remains standalone; **no Hotmart–LeveLab entitlements sync in Phase 1**.
- `levelab.org` sales UI -> ARO checkout (PIX) -> ARO authoritative payment/order/entitlement -> LeveLab Backend access checks -> gated Reader.
- ARO canonical OpenAPI: `atlashub-digital/atlashub-finance/openapi/aro-v1.yaml`.
- Preserve existing work in Frontend PRs #6/#7 and Backend PRs #7/#8; resolve conflicts into an integration branch **without force-push**.
- Offer contract staging delta is in `feat/levelab-v2-aro-offers-20261026`, based on Frontend PR #7. Offer states remain `draft`; never sync as active from repository changes alone.
- ARO must own **all refunds/chargebacks, reconciliation and authoritative revoked rights**. The human after-sales team handles customer interaction, but no refunded/revoked purchase may retain automatically granted Reader access.
- For Corpo Forte, one approved offer grants **both** `levelab:reader:corpo-forte` and `levelab:reader:corpo-forte-workbook`.
- Backend `/me/library` and `/me/content/:assetId` must both read ARO authoritative ACTIVE rights (fail closed), keyed by verified identity, not merely webhook receipt.
- No payment-provider SDK or secret in LeveLab frontend; no provider-specific PIX integration.
- Controlled financial test must cover payment PENDING -> APPROVED -> ACTIVE reader for both included documents; idempotency, duplicate signed webhook, refund/chargeback->REVOKED, timeout and rollback.

## Authentication plan (G4)
- Keep Supabase identity in the LeveLab Backend as the session authority. Prefer passwordless email via the already implemented `supabase.auth.signInWithOtp` route (link mode initially).
- Email OTP **code** only after Supabase email template and resend delivery proven, `verifyOtp({ email, token, type:'email' })`. Validate the sender domain `@lia.doctor` and Resend SMTP configuration in Supabase settings without copying secrets to GitHub.
- WhatsApp OTP via existing AtlasHub delivery bridge (or LIA WA only if authenticated provider and ownership validated) **must not** become a second independent member identity. Use verified challenge -> Supabase exchange with one stable member ID, proof expiration, rate limits and verified phone-to-member binding.
- OTP target 5 minutes; session target 7 days after validated provider/Supabase configuration. These are target policies, not claims that the current implementation meets them.
- Do not expose tokens/codes or log OTP payloads. Account recovery must be available via validated email fallback.

## Website/marketing (G2 & G5)
- Build landing pages for the two books and catalogue; Força na Caneta is in review. Maintain current design system (forest/ivory/gold) and original approved cover assets.
- Keep LIA and human subscription promises clearly marked **Em breve**; do not promise included LIA+ with a R$39.90 eBook.
- The future LIA service integration, community, recurring membership, WhatsApp conversational flow is separate phase after commercial site operation.
- Use real facts only; no before/after visuals, weight-loss efficacy claims, invented testimonials, forced scarcity, medical claims, prescription guidance or fake discount badges.

## Tests/release (G6)
- G0 prod repo/commit mapping evidence and previews verified.
- G1 editorial release bytes SHA256; PDF graphics QA; chapters/page offsets; gated preview/restricted byte stream.
- G2 390/1440 screenshot/mobile contrast/ARIA tests, canonical metadata, legal/privacy/consent.
- G3 ARO catalog/offer registered, charge amount minor units = 3990 for Corpo Forte, checkout feature flag off by default until acceptance; webhooks signed and deduplicated with persistent store.
- G4 linked Supabase identity/ARO entitlement tests; both book and workbook visible and inaccessible after revoked.
- G5 LIA remains Em breve without false claims.
- G6 CI GREEN, preview functional with controlled purchase, after-sales procedure, rollback flag, authorized GO, then production deploy; no unrelated infrastructure changes.
