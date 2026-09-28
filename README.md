# LeveLab Frontend

Web and member experience for the LeveLab ecosystem.

## Scope

This repository owns:

- `levelab.org` institutional and acquisition experience
- `app.levelab.org` member experience
- Corpo Forte 40+ program UI
- Check-up Corpo Forte lead magnet
- onboarding
- member progress, trackers and quizzes
- LIA web entrypoint / chat surfaces
- landing pages, offer pages and conversion flows
- LeveLab design system and accessible UI primitives

## Product flow

```text
Content / Ads
  -> Check-up Corpo Forte
  -> Result + LIA
  -> Corpo Forte 40+ offer
  -> Onboarding
  -> Week experience:
     micro-lesson
     -> reading
     -> exercise
     -> LIA
     -> quiz
     -> commitment
     -> check-out
```

## Source-of-truth contract

- Product/editorial canonical content: **Notion / LeveLab Content Lab**
- Runtime content and progress: **LeveLab Backend API**
- Conversational orchestration: **levelab-lia**
- Approved visual masters: **LeveLab Google Drive DAM**

The frontend must not hard-code clinical claims or duplicate the canonical content library.

## Planned stack

- Next.js / TypeScript
- responsive mobile-first UI
- authentication through the LeveLab backend/Supabase architecture
- analytics and consent-aware event tracking
- Vercel deployment

## Initial implementation tracks

1. LeveLab design system
2. Corpo Forte 40+ program shell
3. Check-up Corpo Forte funnel
4. Onboarding experience
5. LIA chat integration
6. member dashboard and progress
7. accessibility and analytics

## Content IDs

UI must preserve content metadata such as:

- `content_id`
- `version`
- `claim_ids`
- `module_id`
- `locale`

## Security

Never commit credentials, private keys, production tokens, health data, or personal member data to this repository.
