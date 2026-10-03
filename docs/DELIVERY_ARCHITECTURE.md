# LeveLab Web/App Delivery Architecture

Status: Accepted
Date: 2026-09-28

## Domain model

### levelab.org
Public brand and acquisition site.

Primary responsibilities:
- institutional homepage;
- Corpo Forte landing;
- Check-up Corpo Forte;
- educational content / SEO;
- LeveLab Care / Club / Academy / Store entrypoints;
- pricing/offers;
- legal pages;
- contact;
- LIA entry CTA.

### app.levelab.org
Authenticated member application.

Primary responsibilities:
- dashboard;
- onboarding;
- programs;
- Corpo Forte weekly experience;
- Workbook web forms;
- quizzes;
- commitments;
- 7-day plans;
- check-ins;
- progress;
- account/consent;
- LIA embedded experience.

### lia.doctor
Public LIA brand/entry experience.

Primary responsibilities:
- introduce LIA;
- guest conversation where allowed;
- authenticated LIA Companion;
- deep links into LeveLab programs;
- explain privacy, memory and limits;
- route users to LeveLab/app when structured program UI is required.

LIA remains one backend/runtime. `lia.doctor` is a product surface, not a separate AI implementation.

## Implementation source of truth

**GitHub is canonical.**

The production UI lives in:
`nexflowx-hub/levelab-frontend`

No external visual builder is allowed to become an untracked source of truth.

## Tool strategy

### Lovable
Use for:
- rapid page exploration;
- visual alternatives;
- component prototypes;
- landing-page experiments;
- low-risk interaction mockups.

Do not let Lovable:
- own the production database schema;
- create parallel authentication;
- bypass the LeveLab Backend;
- hard-code health claims;
- become the only copy of design work.

Any useful result must be reconciled into the GitHub repo.

### ChatGPT Work / Codex / repo-native AI
Use for:
- multi-file implementation;
- refactors;
- integration work;
- tests;
- browser QA;
- GitHub/Vercel operations;
- repetitive production tasks;
- migration from approved prototype into maintainable code.

### Direct repository development
Use for the production app.

Preferred stack:
- Next.js App Router;
- TypeScript;
- Vercel;
- accessible component primitives;
- API-driven runtime content;
- server-side entitlement checks;
- consent-aware analytics.

## Product routes — V1

### Public
```
/
 /corpo-forte
 /checkup-corpo-forte
 /lia
 /conteudos
 /sobre
 /contato
 /legal/termos
 /legal/privacidade
 /legal/cookies
 /legal/saude-e-seguranca
```

### Member app
```
/dashboard
/onboarding
/programas/corpo-forte
/programas/corpo-forte/semana/[week]
/workbook
/lia
/progresso
/plano-90-dias
/perfil
/consentimentos
```

## Corpo Forte week template

```text
WeekHeader
  -> MicroLesson
  -> ReadingBlocks
  -> WorkbookExercise
  -> LiaPrompt
  -> Quiz
  -> Commitment
  -> SevenDayPlan
  -> CheckIn
  -> WeekCheckout
```

## Data rule

Frontend never owns canonical clinical/editorial claims.

It consumes versioned content from LeveLab Backend:

- content_id;
- version;
- module_id;
- locale;
- claim_ids;
- media_refs;
- exercise_schema;
- quiz_schema;
- LIA context.

## Visual rule

The Editorial Design System for Corpo Forte informs the web design system, but print pages are not copied literally into the app.

Web must be:
- mobile-first;
- fast;
- accessible;
- modular;
- usable inside WhatsApp deep-link flows;
- able to resume exactly where the member stopped.

## Delivery order

1. global LeveLab design tokens and shell;
2. public landing + legal skeleton;
3. Check-up Corpo Forte;
4. authentication;
5. onboarding;
6. Corpo Forte Week 1 vertical slice;
7. embedded LIA;
8. dashboard/progress;
9. Weeks 2–8;
10. 90-day continuation;
11. analytics/accessibility QA.
