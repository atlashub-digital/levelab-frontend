export const locales = ['pt-br', 'pt-pt', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const copy = {
  'pt-br': {
    hero: 'Uma vida mais leve começa com acompanhamento.',
    lead: 'Organize sua rotina, desenvolva hábitos sustentáveis e tenha a LIA ao seu lado para ajudar você a continuar.',
    primary: 'Começar minha avaliação',
    secondary: 'Conversar com a LIA',
  },
  'pt-pt': {
    hero: 'Uma vida mais leve começa com acompanhamento.',
    lead: 'Organize a sua rotina, desenvolva hábitos sustentáveis e tenha a LIA ao seu lado para ajudar a manter a consistência.',
    primary: 'Começar a avaliação',
    secondary: 'Conversar com a LIA',
  },
  en: {
    hero: 'A lighter life starts with support.',
    lead: 'Organize your routine, build sustainable habits and keep LIA by your side to help you stay consistent.',
    primary: 'Start my assessment',
    secondary: 'Talk to LIA',
  },
  es: {
    hero: 'Una vida más ligera comienza con acompañamiento.',
    lead: 'Organiza tu rutina, desarrolla hábitos sostenibles y ten a LIA a tu lado para ayudarte a mantener la constancia.',
    primary: 'Comenzar mi evaluación',
    secondary: 'Hablar con LIA',
  },
} satisfies Record<Locale, { hero: string; lead: string; primary: string; secondary: string }>;
