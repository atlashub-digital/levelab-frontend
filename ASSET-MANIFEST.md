# LeveLab — Asset Manifest (Visual V2)

Status legend: **FINAL** = canonical asset in place · **INTERIM** = usable today, must be replaced by a higher-quality original · **PENDING** = not yet available (the UI does not fake it).

Source of truth for media: Google Drive → `MTX - Farma` (Media Root). Never hotlink Drive in production — copy into `public/`.

## Brand

| Name | Use | Source | Ratio | Recommended size | Status |
|---|---|---|---|---|---|
| `levelab-logo.svg` (mark + wordmark) | Header, footer, OG | Official vector from brand owner | — | SVG | **PENDING** — `components/brand/BrandLogo.tsx` rebuilds the mockup lockup (line leaf + Cormorant wordmark) until the vector arrives; swap it there only |
| `levelab-care-logo.svg` | LeveLab Care vertical (footer) | Official vector | — | SVG | **PENDING** — text + leaf mark for now |
| `og-default.jpg` | Social sharing | Design | 1.91:1 | 1200×630 | **PENDING** — uses `hero-home.webp` meanwhile |
| Social profile URLs | Footer icons | Brand owner | — | — | **PENDING** — icons hidden until real URLs exist |

## LIA (Visual Identity Lock — Notion page 17)

| Name | Use | Source | Ratio | Recommended size | Status |
|---|---|---|---|---|---|
| `public/images/people/lia/lia-portrait.webp` | Home LIA section, /lia hero, LIA card | Drive `LIA — Levelab Intelligent Assistant` → **Master A** (`1ITJ3HAx…`), crop 172,40 464×580 | 4:5 | 1600×2000 | **INTERIM** — 960×1201 crop of a poster; needs a clean HD export of Master A without overlay |
| `public/images/people/lia/lia-avatar.webp` | Chat avatar, small LIA marks | Master A face crop | 1:1 | 800×800 | **INTERIM** — 420×420 |
| — | — | `Maquete_LIA_001.png`, "Clínica da LIA" | — | — | **REJECTED** — different face (violates the Lock); "Clínica" adds white coat + stethoscope, explicitly forbidden by the Lock and by health-advertising rules |

## Lifestyle & programs (cropped from the V2 mockups)

All of these were cut out of the mockup PNGs (≈1448 px wide) and upscaled ×2–3, so they are soft on large/retina screens. Replace with the original photographs (or regenerated HD versions) at the recommended sizes.

| Name | Use | Source | Ratio | Recommended size | Status |
|---|---|---|---|---|---|
| `lifestyle/hero-home.webp` | Home hero | Maquete Home (hero woman) | ~1.58:1 | 2400×1520 | **INTERIM** (1220×772) |
| `lifestyle/hero-conteudos.webp` | Loja / Conteúdos hero | Maquete Loja | ~1.85:1 | 2400×1300 | **INTERIM** (1222×660) |
| `lifestyle/quote-horizon.webp` | Quote bands (Home, LIA) | Maquete Home bottom band | ~2.2:1 | 1600×720 | **INTERIM** (733×328) |
| `programs/corpo-forte-card.webp` | Program card, catalog | Maquete Home programs row | 4:5 | 800×1000 | **INTERIM** (336×420) |
| `programs/forca-na-caneta-card.webp` | Program card | Maquete Home | 4:5 | 800×1000 | **INTERIM** |
| `programs/jornada-8-semanas-card.webp` | Program card (Em breve) | Maquete Home | 4:5 | 800×1000 | **INTERIM** |
| `content/receitas-levelab.webp` | Catalog (Em breve) | Maquete Loja | 4:3 | 1200×900 | **INTERIM** |
| `content/plano-alimentacao.webp` | Catalog (Em breve) | Maquete Loja | 4:3 | 1200×900 | **INTERIM** — very soft |
| `content/diario-evolucao.webp` | Catalog (Em breve) | Maquete Loja | 4:3 | 1200×900 | **INTERIM** — very soft |
| `content/guia-do-sono.webp` | Catalog (Em breve) | Maquete Loja | 4:3 | 1200×900 | **INTERIM** — very soft |
| `content/pequenos-habitos.webp` | Catalog (Em breve) | Maquete Loja | 4:3 | 1200×900 | **INTERIM** — very soft |
| `content/plano-8-semanas.webp` | (spare) | Maquete Loja | 2:1 | 1200×600 | **INTERIM** |

## Product covers & Reader (rendered from the real PDFs — FINAL)

| Name | Use | Source | Status |
|---|---|---|---|
| `public/content/thumbs/cover-*.webp` (3) | Covers in cards, Premium feature, Reader banner | Page 1 of the v2.0 FINAL PDFs | **FINAL** (regenerate when a PDF changes) |
| `public/content/thumbs/<asset>-pNNN.webp` (58) | Reader chapter thumbnails | Chapter pages of the PDFs | **FINAL** |
| `public/content/previews/*.pdf` (3) | Free Reader preview | First 7/5/4 pages of the PDFs | **FINAL** |

Regeneration: `LeveLab/tools/thumbserver.mjs` + `thumbs.html` (rendered in a browser — Node canvas cannot render these PDFs), `preview.mjs` (pdf-lib), `crops.mjs` (sharp, mockup crops).
