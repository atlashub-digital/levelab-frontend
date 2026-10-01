export const locales = ['pt-br', 'pt-pt', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type LocaleCopy = {
  code: Locale;
  label: string;
  nav: {
    care: string;
    programs: string;
    content: string;
    lia: string;
    about: string;
    contact: string;
    assessment: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    lead: string;
    primary: string;
    secondary: string;
  };
  common: {
    talkToLia: string;
    talkToAna: string;
    continueWhatsapp: string;
    startAssessment: string;
    readMore: string;
    viewAll: string;
    soon: string;
    premium: string;
    new: string;
    back: string;
    menu: string;
    openReader: string;
    openWorkbook: string;
    aboutThisWeek: string;
    pages: string;
    zoomIn: string;
    zoomOut: string;
    fullscreen: string;
    download: string;
    previous: string;
    next: string;
  };
  footer: {
    tagline: string;
    group: string;
    closing: string;
    rights: string;
    navigation: string;
    contact: string;
    legal: string;
    follow: string;
    health: string;
    ai: string;
    cookies: string;
    accessibility: string;
    privacy: string;
    terms: string;
    refund: string;
    shipping: string;
    language: string;
  };
};

export const copy: Record<Locale, LocaleCopy> = {
  'pt-br': {
    code: 'pt-br',
    label: 'Português (BR)',
    nav: {
      care: 'Care',
      programs: 'Programas',
      content: 'Conteúdos',
      lia: 'LIA',
      about: 'Sobre',
      contact: 'Contacto',
      assessment: 'Começar avaliação',
      home: 'Início',
    },
    hero: {
      eyebrow: 'Saúde • Bem-estar • Longevidade',
      headline: 'Uma vida mais leve começa com acompanhamento.',
      lead: 'Organize sua rotina, desenvolva hábitos sustentáveis e tenha a LIA ao seu lado — com método e apoio humano de verdade.',
      primary: 'Começar minha avaliação',
      secondary: 'Conversar com a LIA',
    },
    common: {
      talkToLia: 'Conversar com a LIA',
      talkToAna: 'Falar com Ana',
      continueWhatsapp: 'Continuar no WhatsApp',
      startAssessment: 'Começar avaliação',
      readMore: 'Ler mais',
      viewAll: 'Ver tudo',
      soon: 'Em breve',
      premium: 'Premium',
      new: 'Novo',
      back: 'Voltar',
      menu: 'Menu',
      openReader: 'Abrir demonstração do Reader',
      openWorkbook: 'Abrir Workbook',
      aboutThisWeek: 'Conversar com a LIA sobre esta semana',
      pages: 'páginas',
      zoomIn: 'Aumentar zoom',
      zoomOut: 'Diminuir zoom',
      fullscreen: 'Tela cheia',
      download: 'Abrir original',
      previous: 'Anterior',
      next: 'Próxima',
    },
    footer: {
      tagline: 'Saúde • Bem-estar • Longevidade',
      group: 'Uma marca do Grupo MTX Farma',
      closing: 'Saúde de hoje. Um amanhã com mais vida.',
      rights: 'Todos os direitos reservados.',
      navigation: 'Navegação',
      contact: 'Contacto',
      legal: 'Legal',
      follow: 'Seguir a LeveLab',
      health: 'Aviso de saúde',
      ai: 'Transparência em IA',
      cookies: 'Cookies',
      accessibility: 'Acessibilidade',
      privacy: 'Privacidade',
      terms: 'Termos',
      refund: 'Reembolso e cancelamento',
      shipping: 'Envios',
      language: 'Idioma',
    },
  },
  'pt-pt': {
    code: 'pt-pt',
    label: 'Português (PT)',
    nav: {
      care: 'Care',
      programs: 'Programas',
      content: 'Conteúdos',
      lia: 'LIA',
      about: 'Sobre',
      contact: 'Contacto',
      assessment: 'Começar avaliação',
      home: 'Início',
    },
    hero: {
      eyebrow: 'Saúde • Bem-estar • Longevidade',
      headline: 'Uma vida mais leve começa com acompanhamento.',
      lead: 'Organize a sua rotina, desenvolva hábitos sustentáveis e tenha a LIA ao seu lado — com método e apoio humano de verdade.',
      primary: 'Começar a minha avaliação',
      secondary: 'Conversar com a LIA',
    },
    common: {
      talkToLia: 'Conversar com a LIA',
      talkToAna: 'Falar com a Ana',
      continueWhatsapp: 'Continuar no WhatsApp',
      startAssessment: 'Começar avaliação',
      readMore: 'Ler mais',
      viewAll: 'Ver tudo',
      soon: 'Em breve',
      premium: 'Premium',
      new: 'Novo',
      back: 'Voltar',
      menu: 'Menu',
      openReader: 'Abrir demonstração do Reader',
      openWorkbook: 'Abrir Workbook',
      aboutThisWeek: 'Conversar com a LIA sobre esta semana',
      pages: 'páginas',
      zoomIn: 'Aumentar zoom',
      zoomOut: 'Diminuir zoom',
      fullscreen: 'Ecrã inteiro',
      download: 'Abrir original',
      previous: 'Anterior',
      next: 'Próxima',
    },
    footer: {
      tagline: 'Saúde • Bem-estar • Longevidade',
      group: 'Uma marca do Grupo MTX Farma',
      closing: 'Saúde de hoje. Um amanhã com mais vida.',
      rights: 'Todos os direitos reservados.',
      navigation: 'Navegação',
      contact: 'Contacto',
      legal: 'Legal',
      follow: 'Seguir a LeveLab',
      health: 'Aviso de saúde',
      ai: 'Transparência em IA',
      cookies: 'Cookies',
      accessibility: 'Acessibilidade',
      privacy: 'Privacidade',
      terms: 'Termos',
      refund: 'Reembolso e cancelamento',
      shipping: 'Envios',
      language: 'Idioma',
    },
  },
  en: {
    code: 'en',
    label: 'English',
    nav: {
      care: 'Care',
      programs: 'Programs',
      content: 'Content',
      lia: 'LIA',
      about: 'About',
      contact: 'Contact',
      assessment: 'Start assessment',
      home: 'Home',
    },
    hero: {
      eyebrow: 'Health • Well-being • Longevity',
      headline: 'A lighter life starts with support.',
      lead: 'Organize your routine, build sustainable habits and keep LIA by your side — with real method and human support.',
      primary: 'Start my assessment',
      secondary: 'Talk to LIA',
    },
    common: {
      talkToLia: 'Talk to LIA',
      talkToAna: 'Talk to Ana',
      continueWhatsapp: 'Continue on WhatsApp',
      startAssessment: 'Start assessment',
      readMore: 'Read more',
      viewAll: 'View all',
      soon: 'Coming soon',
      premium: 'Premium',
      new: 'New',
      back: 'Back',
      menu: 'Menu',
      openReader: 'Open Reader demo',
      openWorkbook: 'Open Workbook',
      aboutThisWeek: 'Talk to LIA about this week',
      pages: 'pages',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      fullscreen: 'Fullscreen',
      download: 'Open original',
      previous: 'Previous',
      next: 'Next',
    },
    footer: {
      tagline: 'Health • Well-being • Longevity',
      group: 'A brand of Grupo MTX Farma',
      closing: "Today's health. A tomorrow with more life.",
      rights: 'All rights reserved.',
      navigation: 'Navigation',
      contact: 'Contact',
      legal: 'Legal',
      follow: 'Follow LeveLab',
      health: 'Health notice',
      ai: 'AI transparency',
      cookies: 'Cookies',
      accessibility: 'Accessibility',
      privacy: 'Privacy',
      terms: 'Terms',
      refund: 'Refund & cancellation',
      shipping: 'Shipping',
      language: 'Language',
    },
  },
  es: {
    code: 'es',
    label: 'Español',
    nav: {
      care: 'Care',
      programs: 'Programas',
      content: 'Contenidos',
      lia: 'LIA',
      about: 'Sobre',
      contact: 'Contacto',
      assessment: 'Comenzar evaluación',
      home: 'Inicio',
    },
    hero: {
      eyebrow: 'Salud • Bienestar • Longevidad',
      headline: 'Una vida más ligera comienza con acompañamiento.',
      lead: 'Organiza tu rutina, desarrolla hábitos sostenibles y ten a LIA a tu lado — con método y apoyo humano real.',
      primary: 'Comenzar mi evaluación',
      secondary: 'Hablar con LIA',
    },
    common: {
      talkToLia: 'Hablar con LIA',
      talkToAna: 'Hablar con Ana',
      continueWhatsapp: 'Continuar en WhatsApp',
      startAssessment: 'Comenzar evaluación',
      readMore: 'Leer más',
      viewAll: 'Ver todo',
      soon: 'Pronto',
      premium: 'Premium',
      new: 'Nuevo',
      back: 'Volver',
      menu: 'Menú',
      openReader: 'Abrir demo del Reader',
      openWorkbook: 'Abrir Workbook',
      aboutThisWeek: 'Hablar con LIA sobre esta semana',
      pages: 'páginas',
      zoomIn: 'Acercar',
      zoomOut: 'Alejar',
      fullscreen: 'Pantalla completa',
      download: 'Abrir original',
      previous: 'Anterior',
      next: 'Siguiente',
    },
    footer: {
      tagline: 'Salud • Bienestar • Longevidad',
      group: 'Una marca del Grupo MTX Farma',
      closing: 'Salud de hoy. Un mañana con más vida.',
      rights: 'Todos los derechos reservados.',
      navigation: 'Navegación',
      contact: 'Contacto',
      legal: 'Legal',
      follow: 'Seguir a LeveLab',
      health: 'Aviso de salud',
      ai: 'Transparencia en IA',
      cookies: 'Cookies',
      accessibility: 'Accesibilidad',
      privacy: 'Privacidad',
      terms: 'Términos',
      refund: 'Reembolso y cancelación',
      shipping: 'Envíos',
      language: 'Idioma',
    },
  },
};

export function getLocaleCopy(locale: string): LocaleCopy {
  return isLocale(locale) ? copy[locale] : copy['pt-br'];
}
