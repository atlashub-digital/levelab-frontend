# LeveLab Content Sources — 2026-09-29

## Canonical rule

- **Notion = editorial source of truth**
- **LeveLab Backend/PostgreSQL = runtime source of truth after publication**
- **Google Drive = visual/media/DAM and release exports**
- **Frontend = presentation layer; do not hard-code the canonical health/educational library into components**

## Corpo Forte

### Canonical editorial masters

- Guia Editorial Master  
  https://app.notion.com/p/3e930a325ec4815e9ea3f2cebd22f38d?pvs=204

- Workbook Master  
  https://app.notion.com/p/3e930a325ec481abbac0fbfe1be2d0b8?pvs=204

- Product Bible  
  https://app.notion.com/p/3e930a325ec4813f8f42ca51b09a5eaa?pvs=204

- Complete Product Architecture  
  https://app.notion.com/p/3e930a325ec48144b135eda2a7e3b886?pvs=204

- v1.2 Density Audit & Expanded Master  
  https://app.notion.com/p/3e930a325ec481a4a3a3fa74532067ea?pvs=204

- RC1 release record  
  https://app.notion.com/p/3e930a325ec481858943ddd2efc9bf1f?pvs=204

### Current status — Premium Release

The old RC1/RC2 pre-publication exports have been archived.

Current premium release:
- **Corpo Forte — Guia Premium v2.0 FINAL: 105 pages**
- **Corpo Forte — Workbook Premium v2.0 FINAL: 77 pages**
- Source content remains the expanded 8-week editorial master.
- Public framing remains educational/wellness. Medication, diagnosis, dose adjustment and individualized clinical guidance are outside the product scope.

The visual pagination is intentionally larger than the previous 62/29-page pre-publication exports because the final edition uses a premium cartilha layout with chapter openers, whitespace, worksheet space and callout treatment.

### Drive

Root:
https://drive.google.com/drive/folders/1HCRTvUGofOLFWtV6Wt6YxXujCVTDubIF?usp=sharing

Corpo Forte:
https://drive.google.com/drive/folders/1Alx1IUbns4gEtC3CuTUMXGCLa9_FTrsZ

Subfolders:
- Final premium release: https://drive.google.com/drive/folders/1LJL8jIxp-qHIv7aRD9gsw8u--OiJcvqF
- Guia master: https://drive.google.com/drive/folders/1XKW1wewmGpsfzhsgJN_bqFapxruMcQjD
- Workbook master: https://drive.google.com/drive/folders/1YCqLZqGxQQzp5nPQ6Jlw6VNn3UUQh52_
- Web/App: https://drive.google.com/drive/folders/1eAd9QEeS9BmHMWWFMtv7-6mNViQVEDdV
- Campaign exports: https://drive.google.com/drive/folders/1T4de__OJ5PMPstxgKZpjYrv_JYCSKRN6
- Archived RC2/pre-publication files: https://drive.google.com/drive/folders/1i4Nwh-3OLYSynOKpMoLxHFeKg6Q_yXa0

Final Drive files:
- Guia Premium v2.0 FINAL: https://drive.google.com/file/d/1Cj1yLncOgBaTIjIDwu40SyhWAq5IZp3g/view
- Workbook Premium v2.0 FINAL: https://drive.google.com/file/d/1rYzmfKL2HFGbJbb3SEpJ73LmDTOgYecC/view

## Força na Caneta

Current premium final:
- **LeveLab — Força na Caneta Premium v2.0 FINAL: 38 pages**
- PDF: https://drive.google.com/file/d/1yABUENC1vuGWJUIlJxsJ5AMercYLzRQU/view
- Folder: https://drive.google.com/drive/folders/1N3jHlLPNYSiHXMGhbPyFCeJZiigDxP4q
- Final PDF folder: https://drive.google.com/drive/folders/1tFnAHsDcMh6cc0_7gSWHHuFg5gJQabEF
- Web Reader workspace: https://drive.google.com/drive/folders/1aTXN9U_84Qp2m_9O1Ihe_5hppw5InL8l

Product should be treated as a separate LeveLab educational product/guide, not as the public identity of Corpo Forte.

## Visual assets

- Ana Gomes:
  https://drive.google.com/drive/folders/1gfbf3pOsl-O9dNNNeN4s5FYYuaaT5zMx

- LIA:
  https://drive.google.com/drive/folders/1zOAyxlP4OHL9b-19-RmGKCT-gL-pKz5M

- LeveLab Visual Pack:
  https://drive.google.com/drive/folders/1wgIWuGl3Criww_TyvNkxCqBtX_QAdoaF

- Web:
  https://drive.google.com/drive/folders/18X7Pn0-12Ufl1QxRmSPsfdJz3rNHnJBR

## Implementation rule for Z.AI / external builders

Build the **reader shell, course/product pages, navigation, content adapters and mock fixtures**.

Do not:
- scrape and republish the entire Notion library;
- invent missing clinical content;
- create medication advertising;
- expose private Drive files as public dependencies;
- put service keys in the browser.

The final PDF editions are now available and should be used as the visual/content reference for the first Reader implementation.

For V1, the website may ship with static, versioned reader content generated from the approved editorial release, behind a content-provider adapter. The later backend pass will move persistence, entitlements and member progress to the LeveLab API.

Do not extract or transform clinical/health claims beyond the supplied release; preserve the editorial wording unless explicitly reviewed.
