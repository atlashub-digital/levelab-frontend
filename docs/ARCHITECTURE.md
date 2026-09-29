# LeveLab Frontend Architecture

## Surfaces

- `levelab.org/[locale]`: institutional + acquisition.
- `levelab.org/[locale]/avaliacao`: lead qualification.
- `levelab.org/[locale]/lia`: public LIA test mode.
- `lia.doctor`: dedicated LIA entrypoint, mapped to the same product surface.
- `app.levelab.org`: authenticated member experience, added in the next slice.

## Locales

Initial locales: pt-BR, pt-PT, en, es.

Country, currency, legal entity, catalog eligibility and payment rules are separate from language.

## LIA public mode

The public chat is intentionally limited:
- short session memory;
- no member private data;
- limited tools;
- explicit AI identity;
- CTA to assessment, account creation and WhatsApp continuation.

## Next vertical slice

Replace the static LIA conversation with the Atendimento.Center WebChat SDK and implement secure handoff to WhatsApp.
