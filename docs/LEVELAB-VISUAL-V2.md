# LeveLab — Visual V2

Evolution of the LeveLab website from "landing MVP" to a premium editorial platform, following the V2 mockups (Drive `MTX - Farma`: Home/Programas, Loja, LIA landing, LIA 001, Corpo Forte Reader, Força na Caneta Reader). Branch: `feat/levelab-visual-v2`.

## 1. Design system

Tokens live in `app/styles/tokens.css` (Tailwind v4 `@theme`); `base.css` (element defaults, focus, reduced motion) and `utilities.css` (containers, editorial type, rules, scrollbars, reveal). `app/globals.css` only imports them.

**Colors** — legacy names kept so every page inherits the new palette:

| Token | Value | Role |
|---|---|---|
| `forest` | `#173C2F` | Primary (buttons, active states) |
| `forest-dark` | `#0F2E24` | Footer, LIA band |
| `forest-2` | `#245B49` | Hover / secondary accents |
| `olive` | `#4D5A32` | Rare accents |
| `sage` / `sage-2` | `#DDE6D8` / `#E9EFE5` | Soft surfaces, chips |
| `ivory` | `#FBF7ED` | Page background |
| `cream` / `paper` / `sand` | `#F4EBDD` / `#F8F2E6` / `#ECE1CD` | Section rhythm, cards |
| `champagne` (`gold-soft`) | `#C7A866` | Decorative lines, badges |
| `gold` (bronze) | `#A87839` | Text-safe gold (italic accents, eyebrows, icons) |
| `ink` | `#20302A` | Text |
| `muted` | `#6B665D` | Secondary text (darkened warm gray for AA) |

**Typography** (`next/font`): `--font-display` Cormorant Garamond (headlines only), `--font-sans`/`--font-body` Inter (body, UI), `--font-script`/`--font-accent` Allura (short handwritten notes, never body). Utilities: `display-xl`, `display-lg`, `display-md`, `eyebrow`, `font-script`.

**Shape & elevation** — buttons are soft rectangles (`rounded-md`), not pills; cards `rounded-lg` with hairline `ring-line`; shadows `soft`, `card`, `lift`.

**Containers** — `shell-reading` 780 px · `shell` 1200 px · `shell-wide` 1360 px. **Motion** — `--ease-calm`, 160/260/600 ms; `reveal` keyframe; everything off under `prefers-reduced-motion`.

## 2. Components

| Area | Components |
|---|---|
| Brand | `brand/BrandLogo` (lockup + `LeafMark`) — interim until the official SVG |
| Chrome | `layout/SiteHeader` (sticky 72 px, nav with active underline, search/account/shop, CTA, accessible drawer, language), `layout/SiteFooter` (explore, legal, LeveLab Care / Grupo MTX Farma, disclaimer) |
| Home | `home/HomeHero`, `ProgramsRow`, `MethodPillars`, `LiaFeature`, `FeaturedContent`, `HowItWorks`, `QuoteNewsletter` + `NewsletterForm`, `FinalCTA` |
| Catalog | `catalog/ProductTile`, `ContentCard`, `CatalogBrowser` (tabs, sidebar filters with counts, mobile drawer, sort), `CatalogHero`, `PremiumFeature` |
| LIA | `lia/LiaChat` (rebuilt), `blocks/LIAAvatar` (canonical image) |
| Reader | `reader/ProductReader`, `reader/ReaderApp` (see Reader below) |

## 3. Routes

| Route | Status |
|---|---|
| `/[locale]` | Rebuilt (Maquete Home) |
| `/[locale]/programas` | Rebuilt: hero, featured programs, roadmap (Leve 7/Reset 21/Leve 90/Leve 365 — "Em breve"), method, LIA, CTA |
| `/[locale]/conteudos` | Rebuilt: library — free reading first, then by format |
| `/[locale]/loja` | Rebuilt (Maquete Loja): hero, Premium feature, catalog browser, FAQ |
| `/[locale]/lia` | Rebuilt as the LIA landing (Maquete LIA landing): hero + sample chat (labelled "Exemplo"), what LIA does, how it works, **explicit limits**, WhatsApp (invite capture while the group is not open), FAQ |
| `/[locale]/lia/chat` | New: the conversation (real LIA via `/api/lia/chat`) |
| `/[locale]/contacto` | 308 → `/[locale]/contato` |
| Reader, `/conta`, `/entrar`, `/avaliacao`, `/sobre`, legal pages | Unchanged logic; inherit the new tokens, header and footer |

## 4. Catalog truth rules

`lib/content/store.ts` is the single source. Only **Corpo Forte, Workbook Corpo Forte, Força na Caneta and LeveLab Premium** are `live`; everything else is `soon` and shown as "Em breve / Em preparação". No prices and no discounts until commerce is connected (the previous "Bundle −20%" and three products wrongly marked as available were removed). Access is granted by the team (`levelab-acesso` on the VPS) — CTAs go to the commercial WhatsApp, never to a fake checkout.

## 5. LIA

- Identity: canonical LIA = Visual Identity Lock **Master A** only. `Maquete_LIA_001` (different face) and "Clínica da LIA" (white coat, stethoscope) are rejected.
- Always presented as an AI virtual assistant; never as a doctor. Limits are visible on `/lia` and in the chat sidebar.
- Chat: guest mode, short session memory, nothing personal stored; attachment/voice buttons are shown disabled ("em breve") because they are not implemented.

## 6. Newsletter (real)

`NewsletterForm` → `POST /api/newsletter` (validates e-mail + explicit consent) → backend `POST /api/v1/leads/newsletter` with `x-web-forms-token` → member stored as LEAD + consent `marketing.newsletter v2026-10`. Env: `WEB_FORMS_TOKEN` (Vercel, sensitive) = `WEB_FORMS_TOKEN` (VPS backend).

## 7. Reader

Unchanged from the Reader v2 work (three panes, real PDFs, free preview, locked pages, progress, bookmarks), now in the new type and palette. Prepared components map to the brief as: `ProductReader` ≈ ProgramReader + ReaderHeader; `ReaderApp` contains ReaderSidebar (ChapterList), ReaderProgress, ReaderActions (toolbar), WorkbookAction (related card) and AskLiaButton (LIA card). Força na Caneta extras from its mockup (7-day plan, daily checklist, quick recipes) are a next step.

## 8. Responsive & QA

Screenshots (`docs/screenshots/v2/`): home at 1440/1280/1024/768/430/390/360; loja, lia, chat, programas, conteudos, reader at 1440 and 390. Horizontal overflow = 0 on all of them; no console errors. Routes `/`, `/pt-br`, `/pt-pt`, `/en`, `/es`, avaliação, lia, lia/chat, programas, conteúdos, loja, sobre, contato, contacto (redirect), readers, entrar, legal → 200.

Fixed along the way: header overflow at 1024 px; featured-content grid overflow at 1024 px; footer ornament and values row overflow (site-wide).

## 9. Accessibility

Skip link, semantic landmarks and headings, `aria-current` on nav, focus-visible outlines, labelled icon buttons, drawer with Escape + body scroll lock, `aria-live` on chat and catalog count, alt text on all images, reduced-motion support, touch targets ≥ 40 px.

## 10. SEO

Root metadata (title "LeveLab — Saúde, Bem-Estar e Acompanhamento", description from the brief, OG/Twitter, theme color). Home: canonical + `hreflang` alternates per locale, OG locale. No ratings, reviews or medical schema.

## 11. Localization

Header, footer and home copy are centralized in `lib/i18n-v2.ts` for PT-BR (você), PT-PT (tu), EN and ES. PT-BR UI strings were swept for European forms (equipa, connosco, ecrã, pequeno-almoço, stress, registar…).

## 12. Real pending items

1. Official vector logo (LeveLab + LeveLab Care) — `BrandLogo` is interim.
2. HD originals for every **INTERIM** image in `ASSET-MANIFEST.md` (current crops are soft on large screens).
3. EN/ES (and PT-PT) copy for the new Loja, Conteúdos, Programas, LIA landing and chat pages — they still render Portuguese (PT-BR) content in those locales; `<html lang>` is fixed to `pt-BR`.
4. Program detail pages (`/programas/corpo-forte`, `/programas/forca-na-caneta`), `/sobre`, `/avaliacao`, legal pages: inherit the new system but were not re-composed to the mockups.
5. Força na Caneta Reader extras (7-day plan, checklist, quick recipes).
6. Social links, OG image, WhatsApp group URL (`NEXT_PUBLIC_LIA_LAUNCH_GROUP_URL`).
7. Payment provider (no checkout yet — by design).
