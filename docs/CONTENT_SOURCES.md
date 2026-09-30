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

### Current status

RC1 binaries were generated previously but are not currently present in the production Drive folders. The canonical content has evolved beyond RC1.

Current baseline:
- **Corpo Forte v1.2 Expanded RC**
- Guide and Workbook are still pre-publication pending professional/compliance gates.
- Do not expose unfinished or clinically pending copy as approved public content.

### Drive

Root:
https://drive.google.com/drive/folders/1HCRTvUGofOLFWtV6Wt6YxXujCVTDubIF?usp=sharing

Corpo Forte:
https://drive.google.com/drive/folders/1Alx1IUbns4gEtC3CuTUMXGCLa9_FTrsZ

Subfolders:
- Guia: https://drive.google.com/drive/folders/1XKW1wewmGpsfzhsgJN_bqFapxruMcQjD
- Workbook: https://drive.google.com/drive/folders/1YCqLZqGxQQzp5nPQ6Jlw6VNn3UUQh52_
- Web/App: https://drive.google.com/drive/folders/1eAd9QEeS9BmHMWWFMtv7-6mNViQVEDdV
- Campaign exports: https://drive.google.com/drive/folders/1T4de__OJ5PMPstxgKZpjYrv_JYCSKRN6

At the time of this manifest, the four Corpo Forte subfolders are empty.

## Força na Caneta

Current premium PDF in Drive root:
https://drive.google.com/file/d/1yABUENC1vuGWJUIlJxsJ5AMercYLzRQU/view?usp=drivesdk

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

Use local fixture content for layout. We will later promote approved content into the LeveLab Backend API and bind the reader to that runtime source.
