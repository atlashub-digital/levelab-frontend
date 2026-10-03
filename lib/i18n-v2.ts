/**
 * LeveLab Visual V2 — centralized UI copy (header, footer, home, LIA, catalog).
 * PT-BR uses "você/sua"; PT-PT uses European Portuguese. Health copy stays
 * educational: no diagnosis, prescription or guaranteed results.
 */
import type { Locale } from '@/lib/i18n';

export type V2Copy = {
  nav: {
    home: string;
    programs: string;
    content: string;
    shop: string;
    lia: string;
    about: string;
    contact: string;
    contactSlug: string;
    cta: string;
    search: string;
    account: string;
    shopIcon: string;
    menu: string;
    close: string;
    language: string;
  };
  footer: {
    tagline: string;
    explore: string;
    legal: string;
    privacy: string;
    terms: string;
    cookies: string;
    health: string;
    ai: string;
    accessibility: string;
    care: string;
    group: string;
    closing: string;
    rights: string;
    disclaimer: string;
  };
  home: {
    eyebrow: string;
    title: [string, string];
    lead: string;
    ctaPrograms: string;
    ctaLia: string;
    trust: [string, string, string, string];
    script: string;
    badge: string;
    programsEyebrow: string;
    programsScript: string;
    programsAll: string;
    soon: string;
    methodEyebrow: string;
    methodTitle: string;
    methodLead: string;
    pillars: { title: string; text: string }[];
    liaEyebrow: string;
    liaTitle: string;
    liaLead: string;
    liaTopics: string[];
    liaCta: string;
    liaMore: string;
    liaNote: string;
    contentEyebrow: string;
    contentLead: string;
    contentAll: string;
    preview: string;
    howEyebrow: string;
    howTitle: string;
    steps: { title: string; text: string }[];
    quote: string;
    newsletterTitle: string;
    newsletterLead: string;
    newsletterPlaceholder: string;
    newsletterConsent: string;
    newsletterCta: string;
    newsletterOk: string;
    newsletterError: string;
    finalTitle: string;
    finalLead: string;
    finalAssessment: string;
    finalLia: string;
  };
};

const ptBR: V2Copy = {
  nav: {
    home: 'Início',
    programs: 'Programas',
    content: 'Conteúdos',
    shop: 'Loja',
    lia: 'LIA',
    about: 'Sobre',
    contact: 'Contato',
    contactSlug: 'contato',
    cta: 'Começar agora',
    search: 'Pesquisar conteúdos',
    account: 'Área de membros',
    shopIcon: 'Loja',
    menu: 'Abrir menu',
    close: 'Fechar menu',
    language: 'Idioma',
  },
  footer: {
    tagline: 'Saúde • Bem-estar • Longevidade',
    explore: 'Explorar',
    legal: 'Legal',
    privacy: 'Privacidade',
    terms: 'Termos',
    cookies: 'Cookies',
    health: 'Avisos de saúde',
    ai: 'Transparência da IA',
    accessibility: 'Acessibilidade',
    care: 'LeveLab Care',
    group: 'Uma marca do Grupo MTX Farma',
    closing: 'Saúde de hoje. Um amanhã com mais vida.',
    rights: 'Todos os direitos reservados.',
    disclaimer:
      'Conteúdo educativo de bem-estar. Não substitui consulta, diagnóstico ou tratamento por profissionais de saúde.',
  },
  home: {
    eyebrow: 'LeveLab • Saúde, bem-estar e longevidade',
    title: ['Saúde, bem-estar e transformação com método e ', 'acolhimento.'],
    lead:
      'A LeveLab reúne programas, conteúdos e acompanhamento — com a LIA, a nossa assistente virtual — para ajudar você a construir hábitos sustentáveis e evoluir no seu ritmo.',
    ctaPrograms: 'Explorar programas',
    ctaLia: 'Conhecer a LIA',
    trust: ['Método estruturado', 'Conteúdo baseado em evidências', 'Acompanhamento', 'Comunidade'],
    script: 'Mais energia. Mais equilíbrio. Mais você.',
    badge: 'Pequenas escolhas, grandes mudanças.',
    programsEyebrow: 'Os nossos programas',
    programsScript: 'Um caminho completo para cada fase da sua vida.',
    programsAll: 'Ver todos os programas',
    soon: 'Em breve',
    methodEyebrow: 'O método',
    methodTitle: 'LeveLab',
    methodLead: 'Cinco pilares para um corpo mais forte, uma mente mais tranquila e uma vida com mais sentido.',
    pillars: [
      { title: 'Força', text: 'Músculos, ossos e capacidade funcional para hoje e amanhã.' },
      { title: 'Organização', text: 'Rotina, ambiente e planejamento que facilitam escolhas melhores.' },
      { title: 'Recuperação', text: 'Sono, pausas e equilíbrio da rotina para se regenerar.' },
      { title: 'Transformação alimentar', text: 'Uma relação prática, flexível e sustentável com a comida.' },
      { title: 'Emoções & mentalidade', text: 'Autoconhecimento, motivação e consistência.' },
    ],
    liaEyebrow: 'Assistente virtual LeveLab',
    liaTitle: 'Sua companheira LeveLab.',
    liaLead:
      'A LIA conversa com você no dia a dia: explica conteúdos, ajuda a organizar a rotina e lembra os seus compromissos — sempre com a abordagem LeveLab e apoio humano quando faz diferença.',
    liaTopics: ['Alimentação', 'Movimento', 'Rotina', 'Sono', 'Bem-estar'],
    liaCta: 'Conversar com a LIA',
    liaMore: 'Conhecer a LIA',
    liaNote: 'A LIA é uma assistente virtual. Não é médica e não substitui profissionais de saúde.',
    contentEyebrow: 'Conteúdos em destaque',
    contentLead: 'Guias, e-books e ferramentas para acompanhar a sua jornada.',
    contentAll: 'Ver todos na loja',
    preview: 'Ler pré-visualização',
    howEyebrow: 'Como funciona',
    howTitle: 'Uma jornada no seu ritmo.',
    steps: [
      { title: 'Descobrir', text: 'Faça a avaliação inicial e conheça o programa certo para este momento.' },
      { title: 'Começar', text: 'Leia, aplique no Workbook e dê o primeiro passo — pequeno e possível.' },
      { title: 'Acompanhar', text: 'A LIA e a equipa LeveLab acompanham você entre uma semana e outra.' },
      { title: 'Evoluir', text: 'Revise, ajuste e continue. Progresso é saber voltar.' },
    ],
    quote: 'Cuidar de mim hoje é construir o amanhã que quero viver.',
    newsletterTitle: 'Receba inspiração e novidades da LeveLab.',
    newsletterLead: 'Conteúdos de bem-estar e lançamentos, diretamente no seu e-mail.',
    newsletterPlaceholder: 'O seu melhor e-mail',
    newsletterConsent: 'Aceito receber comunicações da LeveLab. Posso cancelar a qualquer momento.',
    newsletterCta: 'Inscrever',
    newsletterOk: 'Inscrição confirmada. Obrigado por estar aqui!',
    newsletterError: 'Não foi possível concluir. Tente novamente daqui a pouco.',
    finalTitle: 'Comece hoje a construir uma vida mais leve.',
    finalLead: 'Uma avaliação curta ajuda a encontrar o melhor ponto de partida para você.',
    finalAssessment: 'Começar avaliação',
    finalLia: 'Conversar com a LIA',
  },
};

const ptPT: V2Copy = {
  ...ptBR,
  nav: { ...ptBR.nav, contact: 'Contacto', search: 'Pesquisar conteúdos' },
  footer: { ...ptBR.footer },
  home: {
    ...ptBR.home,
    lead:
      'A LeveLab reúne programas, conteúdos e acompanhamento — com a LIA, a nossa assistente virtual — para te ajudar a construir hábitos sustentáveis e evoluir ao teu ritmo.',
    script: 'Mais energia. Mais equilíbrio. Mais tu.',
    programsScript: 'Um caminho completo para cada fase da tua vida.',
    pillars: [
      { title: 'Força', text: 'Músculos, ossos e capacidade funcional para hoje e amanhã.' },
      { title: 'Organização', text: 'Rotina, ambiente e planeamento que facilitam escolhas melhores.' },
      { title: 'Recuperação', text: 'Sono, pausas e equilíbrio da rotina para te regenerares.' },
      { title: 'Transformação alimentar', text: 'Uma relação prática, flexível e sustentável com a comida.' },
      { title: 'Emoções & mentalidade', text: 'Autoconhecimento, motivação e consistência.' },
    ],
    liaTitle: 'A tua companheira LeveLab.',
    liaLead:
      'A LIA conversa contigo no dia a dia: explica conteúdos, ajuda a organizar a rotina e lembra os teus compromissos — sempre com a abordagem LeveLab e apoio humano quando faz diferença.',
    contentLead: 'Guias, e-books e ferramentas para te acompanhar na tua jornada.',
    howTitle: 'Uma jornada ao teu ritmo.',
    steps: [
      { title: 'Descobrir', text: 'Faz a avaliação inicial e conhece o programa certo para este momento.' },
      { title: 'Começar', text: 'Lê, aplica no Workbook e dá o primeiro passo — pequeno e possível.' },
      { title: 'Acompanhar', text: 'A LIA e a equipa LeveLab acompanham-te entre uma semana e outra.' },
      { title: 'Evoluir', text: 'Revê, ajusta e continua. Progresso é saber voltar.' },
    ],
    newsletterTitle: 'Recebe inspiração e novidades da LeveLab.',
    newsletterLead: 'Conteúdos de bem-estar e lançamentos, diretamente no teu e-mail.',
    newsletterPlaceholder: 'O teu melhor e-mail',
    newsletterCta: 'Subscrever',
    newsletterOk: 'Subscrição confirmada. Obrigado por estares aqui!',
    newsletterError: 'Não foi possível concluir. Tenta novamente daqui a pouco.',
    finalTitle: 'Começa hoje a construir uma vida mais leve.',
    finalLead: 'Uma avaliação curta ajuda a encontrar o melhor ponto de partida para ti.',
  },
};

const en: V2Copy = {
  nav: {
    home: 'Home',
    programs: 'Programs',
    content: 'Content',
    shop: 'Shop',
    lia: 'LIA',
    about: 'About',
    contact: 'Contact',
    contactSlug: 'contato',
    cta: 'Get started',
    search: 'Search content',
    account: 'Members area',
    shopIcon: 'Shop',
    menu: 'Open menu',
    close: 'Close menu',
    language: 'Language',
  },
  footer: {
    tagline: 'Health • Well-being • Longevity',
    explore: 'Explore',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    cookies: 'Cookies',
    health: 'Health notice',
    ai: 'AI transparency',
    accessibility: 'Accessibility',
    care: 'LeveLab Care',
    group: 'A brand of Grupo MTX Farma',
    closing: 'Health today. A tomorrow with more life.',
    rights: 'All rights reserved.',
    disclaimer:
      'Educational well-being content. It does not replace consultation, diagnosis or treatment by health professionals.',
  },
  home: {
    eyebrow: 'LeveLab • Health, well-being and longevity',
    title: ['Health, well-being and transformation with method and ', 'care.'],
    lead:
      'LeveLab brings together programs, content and guidance — with LIA, our virtual assistant — to help you build sustainable habits and grow at your own pace.',
    ctaPrograms: 'Explore programs',
    ctaLia: 'Meet LIA',
    trust: ['Structured method', 'Evidence-informed content', 'Guidance', 'Community'],
    script: 'More energy. More balance. More you.',
    badge: 'Small choices, big changes.',
    programsEyebrow: 'Our programs',
    programsScript: 'A complete path for every stage of your life.',
    programsAll: 'See all programs',
    soon: 'Coming soon',
    methodEyebrow: 'The method',
    methodTitle: 'LeveLab',
    methodLead: 'Five pillars for a stronger body, a calmer mind and a more meaningful life.',
    pillars: [
      { title: 'Strength', text: 'Muscles, bones and functional capacity for today and tomorrow.' },
      { title: 'Organization', text: 'Routine, environment and planning that make better choices easier.' },
      { title: 'Recovery', text: 'Sleep, rest and a balanced routine to regenerate.' },
      { title: 'Food transformation', text: 'A practical, flexible and sustainable relationship with food.' },
      { title: 'Emotions & mindset', text: 'Self-awareness, motivation and consistency.' },
    ],
    liaEyebrow: 'LeveLab virtual assistant',
    liaTitle: 'Your LeveLab companion.',
    liaLead:
      'LIA talks with you day to day: she explains content, helps organize your routine and reminds you of your commitments — always with the LeveLab approach and human support when it matters.',
    liaTopics: ['Food', 'Movement', 'Routine', 'Sleep', 'Well-being'],
    liaCta: 'Chat with LIA',
    liaMore: 'Meet LIA',
    liaNote: 'LIA is a virtual assistant. She is not a doctor and does not replace health professionals.',
    contentEyebrow: 'Featured content',
    contentLead: 'Guides, e-books and tools for your journey.',
    contentAll: 'See all in the shop',
    preview: 'Read preview',
    howEyebrow: 'How it works',
    howTitle: 'A journey at your pace.',
    steps: [
      { title: 'Discover', text: 'Take the initial assessment and find the right program for now.' },
      { title: 'Start', text: 'Read, apply it in the Workbook and take a small, possible first step.' },
      { title: 'Follow up', text: 'LIA and the LeveLab team support you from week to week.' },
      { title: 'Evolve', text: 'Review, adjust and continue. Progress is knowing how to come back.' },
    ],
    quote: 'Taking care of myself today is building the tomorrow I want to live.',
    newsletterTitle: 'Get inspiration and news from LeveLab.',
    newsletterLead: 'Well-being content and launches, straight to your inbox.',
    newsletterPlaceholder: 'Your best e-mail',
    newsletterConsent: 'I agree to receive LeveLab communications. I can unsubscribe at any time.',
    newsletterCta: 'Subscribe',
    newsletterOk: 'Subscription confirmed. Thank you for being here!',
    newsletterError: 'Something went wrong. Please try again shortly.',
    finalTitle: 'Start building a lighter life today.',
    finalLead: 'A short assessment helps find the best starting point for you.',
    finalAssessment: 'Start assessment',
    finalLia: 'Chat with LIA',
  },
};

const es: V2Copy = {
  nav: {
    home: 'Inicio',
    programs: 'Programas',
    content: 'Contenidos',
    shop: 'Tienda',
    lia: 'LIA',
    about: 'Sobre',
    contact: 'Contacto',
    contactSlug: 'contato',
    cta: 'Empezar ahora',
    search: 'Buscar contenidos',
    account: 'Área de miembros',
    shopIcon: 'Tienda',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
    language: 'Idioma',
  },
  footer: {
    tagline: 'Salud • Bienestar • Longevidad',
    explore: 'Explorar',
    legal: 'Legal',
    privacy: 'Privacidad',
    terms: 'Términos',
    cookies: 'Cookies',
    health: 'Aviso de salud',
    ai: 'Transparencia de la IA',
    accessibility: 'Accesibilidad',
    care: 'LeveLab Care',
    group: 'Una marca del Grupo MTX Farma',
    closing: 'Salud de hoy. Un mañana con más vida.',
    rights: 'Todos los derechos reservados.',
    disclaimer:
      'Contenido educativo de bienestar. No sustituye consulta, diagnóstico ni tratamiento por profesionales de salud.',
  },
  home: {
    eyebrow: 'LeveLab • Salud, bienestar y longevidad',
    title: ['Salud, bienestar y transformación con método y ', 'acogida.'],
    lead:
      'LeveLab reúne programas, contenidos y acompañamiento — con LIA, nuestra asistente virtual — para ayudarte a construir hábitos sostenibles y avanzar a tu ritmo.',
    ctaPrograms: 'Explorar programas',
    ctaLia: 'Conocer a LIA',
    trust: ['Método estructurado', 'Contenido basado en evidencia', 'Acompañamiento', 'Comunidad'],
    script: 'Más energía. Más equilibrio. Más tú.',
    badge: 'Pequeñas decisiones, grandes cambios.',
    programsEyebrow: 'Nuestros programas',
    programsScript: 'Un camino completo para cada etapa de tu vida.',
    programsAll: 'Ver todos los programas',
    soon: 'Próximamente',
    methodEyebrow: 'El método',
    methodTitle: 'LeveLab',
    methodLead: 'Cinco pilares para un cuerpo más fuerte, una mente más tranquila y una vida con más sentido.',
    pillars: [
      { title: 'Fuerza', text: 'Músculos, huesos y capacidad funcional para hoy y mañana.' },
      { title: 'Organización', text: 'Rutina, entorno y planificación que facilitan mejores decisiones.' },
      { title: 'Recuperación', text: 'Sueño, pausas y equilibrio para regenerarte.' },
      { title: 'Transformación alimentaria', text: 'Una relación práctica, flexible y sostenible con la comida.' },
      { title: 'Emociones y mentalidad', text: 'Autoconocimiento, motivación y constancia.' },
    ],
    liaEyebrow: 'Asistente virtual LeveLab',
    liaTitle: 'Tu compañera LeveLab.',
    liaLead:
      'LIA conversa contigo en el día a día: explica contenidos, ayuda a organizar tu rutina y te recuerda tus compromisos — siempre con el enfoque LeveLab y apoyo humano cuando hace falta.',
    liaTopics: ['Alimentación', 'Movimiento', 'Rutina', 'Sueño', 'Bienestar'],
    liaCta: 'Conversar con LIA',
    liaMore: 'Conocer a LIA',
    liaNote: 'LIA es una asistente virtual. No es médica y no sustituye a profesionales de salud.',
    contentEyebrow: 'Contenidos destacados',
    contentLead: 'Guías, e-books y herramientas para acompañarte en tu camino.',
    contentAll: 'Ver todo en la tienda',
    preview: 'Leer vista previa',
    howEyebrow: 'Cómo funciona',
    howTitle: 'Un camino a tu ritmo.',
    steps: [
      { title: 'Descubrir', text: 'Haz la evaluación inicial y conoce el programa adecuado para este momento.' },
      { title: 'Empezar', text: 'Lee, aplícalo en el Workbook y da un primer paso pequeño y posible.' },
      { title: 'Acompañar', text: 'LIA y el equipo LeveLab te acompañan semana a semana.' },
      { title: 'Evolucionar', text: 'Revisa, ajusta y continúa. Progresar es saber volver.' },
    ],
    quote: 'Cuidarme hoy es construir el mañana que quiero vivir.',
    newsletterTitle: 'Recibe inspiración y novedades de LeveLab.',
    newsletterLead: 'Contenidos de bienestar y lanzamientos, directamente en tu correo.',
    newsletterPlaceholder: 'Tu mejor correo',
    newsletterConsent: 'Acepto recibir comunicaciones de LeveLab. Puedo darme de baja en cualquier momento.',
    newsletterCta: 'Suscribirme',
    newsletterOk: 'Suscripción confirmada. ¡Gracias por estar aquí!',
    newsletterError: 'No se pudo completar. Inténtalo de nuevo en un momento.',
    finalTitle: 'Empieza hoy a construir una vida más ligera.',
    finalLead: 'Una evaluación corta ayuda a encontrar el mejor punto de partida para ti.',
    finalAssessment: 'Empezar evaluación',
    finalLia: 'Conversar con LIA',
  },
};

const dictionaries: Record<Locale, V2Copy> = { 'pt-br': ptBR, 'pt-pt': ptPT, en, es };

export function getV2Copy(locale: string): V2Copy {
  return dictionaries[locale as Locale] ?? ptBR;
}
