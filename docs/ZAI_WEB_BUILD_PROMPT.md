# Z.AI IMPLEMENTATION BRIEF — LeveLab Web V1

## Mission

Build the first production-quality public web experience for **LeveLab** using the existing frontend foundation.

This is not a generic wellness template. It is the public entry point to a multi-product ecosystem with:
- institutional brand pages;
- lead generation;
- LIA conversational assistant;
- Corpo Forte 8-week learning experience;
- Força na Caneta educational product;
- future Store / Academy / Club;
- future authenticated member area.

## Repository and Git workflow

Repository:
https://github.com/nexflowx-hub/levelab-frontend

**Base branch:** `feat/foundation-v1`

Create a new branch:
`feat/zai-levelab-web-v1`

Do **not** commit directly to `main`.

Do **not** modify:
- `levelab-backend`
- `levelab-lia`
- Atendimento.Center repositories

At completion:
1. run typecheck and build;
2. commit all changes;
3. open a Pull Request targeting `feat/foundation-v1`;
4. include screenshots and a concise technical summary in the PR;
5. document any mocked API/data dependency.

## Product and brand hierarchy

```
Grupo MTX Farma
  -> LeveLab
      -> LeveLab Care
      -> LeveLab Academy
      -> LeveLab Club
      -> LeveLab Store
      -> LIA
      -> Products:
         - Corpo Forte
         - Força na Caneta
         - future programs
```

LeveLab is the B2C brand. Grupo MTX Farma remains a discreet institutional parent/retaguarda.

## Design direction

Premium editorial wellness + modern AI product.

Do NOT make it look:
- like a pharmacy catalogue;
- like a hospital portal;
- like a generic pink fitness website;
- like a cheap ebook funnel;
- like a crypto/tech dashboard.

### Palette

Use the existing foundation tokens as baseline:
- forest: #153D31
- forest secondary: #245B49
- sage: #DFE9DF
- ivory: #FBF8F0
- gold: #B79A5B
- ink: #15302A
- white: #FFFFFF

May extend with:
- warm paper
- sand
- soft cream
- muted olive

### Typography

Use a premium editorial serif for display headlines and a highly readable humanist sans for body/UI.

Recommended:
- Display: Cormorant Garamond / Fraunces / Libre Baskerville
- UI/body: Inter / Manrope / Source Sans 3

Use `next/font`.

### Visual rhythm

- generous whitespace;
- editorial image blocks;
- soft rounded cards;
- subtle borders;
- restrained shadows;
- gold only as accent;
- natural textures;
- calm micro-motion;
- mobile-first;
- excellent accessibility.

## Identity assets

Use only the approved assets if available from the LeveLab Drive:
- Ana Gomes official visual assets;
- LIA official visual assets;
- LeveLab logos / footer lockup.

**Do not invent a new face for Ana or LIA.**
If the assets cannot be downloaded in the Z.AI environment, create clearly named placeholders:
- `/public/placeholders/ana-gomes-placeholder.svg`
- `/public/placeholders/lia-placeholder.svg`
and leave an integration comment. Do not use stock people or generated replacement faces.

Media reference:
https://drive.google.com/drive/folders/1HCRTvUGofOLFWtV6Wt6YxXujCVTDubIF?usp=sharing

## Information architecture

Create or complete these routes for all supported locales:

```
/[locale]
/[locale]/sobre
/[locale]/care
/[locale]/lia
/[locale]/avaliacao
/[locale]/programas
/[locale]/programas/corpo-forte
/[locale]/programas/corpo-forte/reader
/[locale]/programas/corpo-forte/semanas/[week]
/[locale]/programas/forca-na-caneta
/[locale]/programas/forca-na-caneta/reader
/[locale]/academy
/[locale]/club
/[locale]/store
/[locale]/contato
/[locale]/faq
/[locale]/legal/privacidade
/[locale]/legal/termos
/[locale]/legal/cookies
/[locale]/legal/saude
/[locale]/legal/ia
/[locale]/acessibilidade
```

Initial locales:
- pt-br
- pt-pt
- en
- es

Brazilian Portuguese is the primary fully-polished copy. Other locales may use translated UI copy, but do not invent localized regulatory claims.

## Homepage

### 1. Navbar

- LeveLab logo
- Care
- Programas
- LIA
- Conteúdo
- Sobre
- language switcher
- CTA: “Começar avaliação”

Desktop + compact mobile navigation.

### 2. Hero

Headline direction:
**Uma vida mais leve começa com acompanhamento.**

Supporting copy:
LeveLab helps people organize routine, learn practical habits and stay accompanied through LIA and human support.

Primary CTA:
**Começar minha avaliação**

Secondary CTA:
**Conversar com a LIA**

Visual:
- premium lifestyle/editorial composition;
- integrated LIA conversation card;
- no drug/needle/medicine hero imagery.

### 3. Trust strip

- Acompanhamento
- Conteúdo educativo
- IA + apoio humano
- Privacidade
- Rotina real

### 4. Ecosystem

Introduce:
- LeveLab Care
- LIA
- Corpo Forte
- Força na Caneta
- Academy
- Club

Use cards, not a giant sitemap.

### 5. “Conheça a LIA”

Large section with approved LIA visual and a live-looking chat preview.

Copy must clearly say:
**LIA é uma assistente virtual de bem-estar da LeveLab.**

Actions:
- Testar LIA
- Continuar no WhatsApp

WhatsApp number:
+55 15 98138-3291

No provider/API secret in browser.

### 6. Human support

Ana Gomes section:
- approved portrait only;
- role: Gerente Comercial;
- copy: human help, commercial questions, onboarding/premium support;
- CTA “Falar com Ana”.

Current temporary test number can exist in config only:
+55 62 99409-1930

Mark it internally as temporary. Do not hard-code this number in multiple components.

### 7. Programs

Featured:
**Corpo Forte — Programa Interativo de 8 Semanas**
Tagline:
**Corpo Forte não é um tipo de corpo. É uma capacidade.**

Secondary:
**Força na Caneta**
Educational 7-day guide/product.

### 8. How it works

Assessment -> LIA -> Program -> Daily/weekly progress -> Human support -> Continuity.

### 9. Content/Academy

Editorial cards and future learning catalogue.

### 10. Final CTA

**Comece pela conversa certa para você.**
- avaliação
- LIA
- Ana

### 11. Institutional footer

Must be complete and professional.

Include:
- LeveLab Care
- “uma marca do Grupo MTX Farma”
- navigation
- contact
- languages
- social placeholders
- Privacy
- Terms
- Cookies
- Cookie preferences
- Health notice
- AI transparency
- Accessibility
- Refund/cancellation placeholder where relevant
- shipping placeholder for future Store
- copyright

Do not invent:
- CNPJ
- company registration
- legal address
- medical registration numbers

Create a `src/config/legal.ts` with nullable/placeholder fields and render legal identification only when configured.

## Corpo Forte product page

This page sells/explains the **program**, not a PDF.

Hero:
**Corpo Forte**
**Programa Interativo LeveLab de 8 Semanas**
**Corpo Forte não é um tipo de corpo. É uma capacidade.**

Explain:
- learning;
- application;
- LIA;
- workbook;
- weekly experiments;
- check-ins;
- progress;
- continuity.

### Eight-week visual roadmap

Create an elegant timeline/card system for:
1. Progresso além da balança
2. Músculo e capacidade
3. Aprender força
4. Alimentação que sustenta
5. Movimento que soma
6. Recuperação
7. Corpo e identidade
8. Continuidade

Do not add medical claims.

### Reader CTA

Buttons:
- Abrir demonstração do Reader
- Ver como funciona
- Conversar com a LIA

## Corpo Forte Reader

Build a high-quality digital reader shell.

The goal is to be ready for API-driven approved content later.

### Layout

Desktop:
- left navigation / contents
- central reader
- optional right context panel for LIA / notes / progress

Mobile:
- top compact chapter selector
- reader body
- sticky bottom actions

### Reader capabilities

- week/chapter navigation;
- progress bar;
- table of contents;
- estimated reading time;
- “Ouvir” button placeholder;
- bookmark;
- font size controls;
- light editorial theme;
- accessible keyboard navigation;
- “Abrir Workbook” action;
- “Conversar com a LIA sobre esta semana” action;
- next/previous;
- content version badge.

### Content model

Create an adapter interface, for example:

```ts
interface LearningContentProvider {
  getProduct(slug: string, locale: string): Promise<ProductContent>;
  getModule(product: string, module: string, locale: string): Promise<ModuleContent>;
}
```

Provide:
- `MockLearningContentProvider`
- future `ApiLearningContentProvider` stub

Do NOT embed the entire canonical Notion manuscript inside React components.

Use concise demonstration fixtures only.

## 8-week learning area

Create pages/shells for each week with this UX:

```
Microaula
  -> Leitura
  -> Exercício / Workbook
  -> Conversar com LIA
  -> Quiz
  -> Experimento da semana
  -> Compromisso
  -> Check-out
```

For now:
- use mock/demo state;
- store no sensitive health information in localStorage;
- local progress may be UI-only/demonstration;
- clearly mark member persistence as API integration pending.

## Força na Caneta

Create a separate product page and reader shell.

It is not part of the eight Corpo Forte weeks.

Position:
- LeveLab educational guide;
- practical 7-day content;
- appetite/meal organization context;
- educational, not prescription.

Current reference PDF:
https://drive.google.com/file/d/1yABUENC1vuGWJUIlJxsJ5AMercYLzRQU/view?usp=drivesdk

Do not turn the page into medication advertising.
Do not guarantee weight loss.

## LIA WebChat

Create a polished GPT/Gemini-style public LIA experience on:
`/[locale]/lia`

### Required UI

- chat history panel on desktop;
- new conversation;
- streaming-ready message list;
- assistant/user bubbles with premium minimal styling;
- typing state;
- input composer;
- microphone button;
- image/file attachment button;
- send button;
- quick actions;
- “Falar com Ana”
- “Continuar no WhatsApp”
- AI identity badge;
- privacy/health notice;
- guest mode label.

### Quick actions

- Planejar meu dia
- Organizar uma refeição
- Movimento de hoje
- Como dormi
- Preciso voltar à rotina
- Ver como funciona o Corpo Forte
- Falar com Ana

### Architecture

Do not call OpenAI/OpenRouter directly from the browser.

Create transport abstraction:
- `MockLiaTransport`
- `AtendimentoCenterLiaTransport` stub

Use environment:
`NEXT_PUBLIC_ATENDIMENTO_WEBCHAT_URL`

We will wire the actual Atendimento.Center API later.

Audio/image controls should be implemented as UI-ready with clear mocked states if no real media endpoint is available yet.

## Assessment / lead funnel

Build a multi-step assessment UI.

5–7 short steps:
- primary objective;
- biggest routine difficulty;
- general routine;
- preferred support style;
- channel preference;
- name;
- WhatsApp/email consent.

No clinical diagnosis scoring.

Result page:
- concise profile summary;
- recommended next LeveLab entry point;
- CTA LIA;
- CTA WhatsApp;
- optional product card.

Add attribution persistence:
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term
- landing_variant

For now, store non-sensitive attribution locally and prepare adapter for backend submission.

## Funnels / campaign landing architecture

Create a reusable landing-page system, not one-off pages.

Suggested route:
`/[locale]/lp/[slug]`

Provide config-driven templates for:
- routine consistency;
- restart after stopping;
- Leve 7;
- Corpo Forte check-up;
- LIA demo;
- Força na Caneta.

Each landing template should support:
- hero;
- social proof placeholder;
- problem/desired state;
- mechanism/process;
- FAQ;
- CTA;
- attribution;
- conversion event hooks.

Do not invent testimonials.

## SEO

Implement:
- Metadata API;
- canonical tags;
- hreflang;
- OpenGraph;
- Twitter cards;
- structured data where appropriate;
- sitemap;
- robots;
- product/program breadcrumbs.

Do not expose private member routes to indexing.

## Accessibility

WCAG-aware implementation:
- semantic headings;
- keyboard navigation;
- visible focus;
- sufficient contrast;
- reduced motion support;
- image alt text;
- form labels;
- no information conveyed by color alone.

## Content safety / public-copy rules

Do not make:
- guaranteed weight-loss promises;
- “lose X kg in Y days” claims;
- medication advertising;
- diagnosis/prescription language;
- clinical treatment claims;
- fabricated professional credentials.

Allowed public framing:
- education;
- routine;
- well-being;
- movement;
- organization;
- general healthy habits;
- guided learning;
- AI + human support.

## Code architecture

Use Feature-Oriented Architecture.

Suggested:

```
src/
  features/
    brand/
    institutional/
    lia/
    assessment/
    programs/
    corpo-forte/
    forca-na-caneta/
    reader/
    funnels/
    academy/
    club/
    store/
    legal/
    analytics/
  components/
  config/
  services/
  lib/
  i18n/
  types/
```

Reuse components.

No monolithic 1000-line page components.

## Data boundaries

Z.AI must not request or use:
- Supabase service role key;
- DATABASE_URL;
- Atendimento.Center service token;
- OpenAI/OpenRouter keys.

Do not create direct database access from the frontend.

Everything private later flows:
Frontend -> LeveLab Backend / Atendimento.Center.

## Definition of Done

The PR is ready when:

- `npm run typecheck` passes;
- `npm run build` passes;
- homepage is premium and responsive;
- LIA guest chat interface is complete in UI;
- assessment funnel works as frontend demo;
- Corpo Forte page exists;
- Corpo Forte Reader demo exists;
- 8-week learning shell exists;
- Força na Caneta page/reader exists;
- legal/institutional footer exists;
- pt-BR is polished;
- locale architecture remains functional;
- all future API points use adapters/mocks;
- no secrets are committed;
- no invented clinical claims;
- no replacement faces for LIA or Ana;
- PR targets `feat/foundation-v1`.

## Handoff note

Do not attempt to finish production authentication, DB writes, WhatsApp API, entitlement checks or real LIA inference.

Those integrations will be completed in a second pass by the LeveLab/Atendimento.Center backend team after the UI/UX and route architecture are accepted.
