/**
 * LeveLab brand content: ecosystem, method, trust strip, how it works,
 * testimonials (reserved slots — never invented), FAQ, LIA capabilities,
 * quick actions and mock chat, Ana Gomes info.
 *
 * Guardrails (from docs/ZAI_WEB_BUILD_PROMPT.md):
 * - Do not invent testimonials → reserved slots only.
 * - Do not make clinical/weight-loss claims.
 * - LIA must always be identified as an AI assistant.
 */

export type EcosystemItem = {
  id: string;
  name: string;
  kind: 'care' | 'lia' | 'program' | 'academy' | 'club' | 'store';
  tagline: string;
  description: string;
  /** locale-relative path */
  path: string;
  status: 'live' | 'soon';
};

export const ecosystem: EcosystemItem[] = [
  {
    id: 'care',
    name: 'LeveLab Care',
    kind: 'care',
    tagline: 'Acompanhamento humano',
    description: 'Suporte humano e comercial — da dúvida à continuidade.',
    path: '/sobre#care',
    status: 'live',
  },
  {
    id: 'lia',
    name: 'LIA',
    kind: 'lia',
    tagline: 'Assistente de bem-estar',
    description: 'Conversas práticas sobre rotina, alimentação, movimento e hábitos.',
    path: '/lia',
    status: 'live',
  },
  {
    id: 'corpo-forte',
    name: 'Corpo Forte',
    kind: 'program',
    tagline: 'Programa de 8 semanas',
    description: 'Aprendizado, aplicação e progresso em oito semanas estruturadas.',
    path: '/programas/corpo-forte',
    status: 'live',
  },
  {
    id: 'forca-na-caneta',
    name: 'Força na Caneta',
    kind: 'program',
    tagline: 'Guia de 7 dias',
    description: 'Guia educativo prático sobre apetite e organização das refeições.',
    path: '/programas/forca-na-caneta',
    status: 'live',
  },
  {
    id: 'academy',
    name: 'LeveLab Academy',
    kind: 'academy',
    tagline: 'Conteúdo educativo',
    description: 'Editorial e futuro catálogo de aprendizagem.',
    path: '/conteudos',
    status: 'soon',
  },
  {
    id: 'club',
    name: 'LeveLab Club',
    kind: 'club',
    tagline: 'Comunidade',
    description: 'Comunidade e continuidade entre participantes (em breve).',
    path: '/conteudos',
    status: 'soon',
  },
];

export type TrustItem = { id: string; label: string; description: string };

export const trustStrip: TrustItem[] = [
  { id: 'acompanhamento', label: 'Acompanhamento', description: 'Método e presença ao longo do tempo.' },
  { id: 'conteudo', label: 'Conteúdo educativo', description: 'Aprendizado claro, calmo e prático.' },
  { id: 'ia-humano', label: 'IA + apoio humano', description: 'LIA e pessoas do lado de cá.' },
  { id: 'privacidade', label: 'Privacidade', description: 'Cuidado com os seus dados.' },
  { id: 'rotina', label: 'Rotina real', description: 'Para a vida real, não para o ideal.' },
];

export type HowStep = { n: number; title: string; description: string };

export const howItWorks: HowStep[] = [
  { n: 1, title: 'Avaliação', description: 'Uma conversa curta para entender o seu momento.' },
  { n: 2, title: 'LIA', description: 'Conversas práticas sobre rotina e bem-estar.' },
  { n: 3, title: 'Programa', description: 'Aprendizado estruturado em semanas ou dias.' },
  { n: 4, title: 'Progresso', description: 'Microaulas, leitura, exercícios e check-ins.' },
  { n: 5, title: 'Apoio humano', description: 'Ana e a equipa para tirar dúvidas e continuar.' },
  { n: 6, title: 'Continuidade', description: 'Um plano que segue depois do programa.' },
];

export type MethodPrinciple = {
  /** Single-letter key (F/O/R/T/E) shown inside the gold circle. */
  key: string;
  id: string;
  title: string;
  description: string;
};

/**
 * O Método F.O.R.T.E. — five pillars.
 * Spec source: levelab-zai-ui-spec-v1.0.json → pages.home.method_copy.pillars.
 */
export const methodPrinciples: MethodPrinciple[] = [
  {
    key: 'F',
    id: 'forca',
    title: 'Força',
    description: 'Músculos, ossos e capacidade funcional.',
  },
  {
    key: 'O',
    id: 'organizacao',
    title: 'Organização',
    description: 'Rotina, ambiente e planeamento.',
  },
  {
    key: 'R',
    id: 'recuperacao',
    title: 'Recuperação',
    description: 'Sono, gestão do stress e tempo para regenerar.',
  },
  {
    key: 'T',
    id: 'transformacao',
    title: 'Transformação alimentar',
    description: 'Alimentação equilibrada, flexível e prazerosa.',
  },
  {
    key: 'E',
    id: 'emocoes',
    title: 'Emoções e mentalidade',
    description: 'Autoconhecimento, motivação e relação consciente com o corpo.',
  },
];

/**
 * AI transparency disclosure — rendered on the LIA page (ai_transparency section)
 * and on legal pages. LIA must always be identified as an AI assistant.
 * Spec source: levelab-zai-ui-spec-v1.0.json → lia.transparency_copy.
 */
export const aiTransparencyCopy =
  'A LIA é uma assistente virtual de bem-estar e não substitui profissionais de saúde.';

export type ReservedTestimonial = { id: string; topic: string; role: string };

/**
 * Testimonials are RESERVED slots. Real, consented stories will be loaded from
 * the backend after explicit consent. We do NOT invent testimonials.
 */
export const reservedTestimonials: ReservedTestimonial[] = [
  { id: 't1', topic: 'Constância na rotina', role: 'Participante do programa' },
  { id: 't2', topic: 'Mais clareza e energia', role: 'Participante do programa' },
  { id: 't3', topic: 'Continuidade depois do programa', role: 'Participante do programa' },
];

export type FaqItem = { id: string; q: string; a: string };

export const liaFaq: FaqItem[] = [
  {
    id: 'o-que-e',
    q: 'O que é a LIA?',
    a: 'A LIA é a assistente virtual de bem-estar da LeveLab. Conversa sobre rotina, alimentação, movimento, sono e hábitos — sempre identificada como inteligência artificial.',
  },
  {
    id: 'medica',
    q: 'A LIA dá conselhos médicos ou receitas?',
    a: 'Não. A LIA é educativa e de bem-estar. Não faz diagnóstico, prescrição ou tratamento. Para decisões clínicas, procure um profissional de saúde.',
  },
  {
    id: 'privacidade',
    q: 'Como funciona a privacidade?',
    a: 'No modo público, a LIA tem memória curta e não guarda dados sensíveis. A persistência de conta e progresso chega numa próxima fase, com a sua autorização.',
  },
  {
    id: 'idiomas',
    q: 'Em que idiomas a LIA fala?',
    a: 'Português do Brasil é o idioma principal. Outros idiomas serão adicionados progressivamente.',
  },
  {
    id: 'whatsapp',
    q: 'Posso continuar no WhatsApp?',
    a: 'Sim. Pode continuar a conversa no WhatsApp e falar com a equipa de apoio humano da LeveLab.',
  },
  {
    id: 'lancamento',
    q: 'Quando a LIA estreia?',
    a: 'Lançamento em breve — a data oficial é confirmada na página da LIA. Entre no grupo de lançamento para receber o acesso em primeira mão.',
  },
];

export type LiaCapability = { id: string; label: string; description: string };

/**
 * LIA public capabilities — 8 items per spec
 * (levelab-zai-ui-spec-v1.0.json → lia.capabilities_for_public_copy):
 * rotina, hábitos, alimentação geral, movimento, sono e bem-estar,
 * navegação dos conteúdos LeveLab, check-ins, handoff para atendimento humano.
 */
export const liaCapabilities: LiaCapability[] = [
  {
    id: 'rotina',
    label: 'Rotina',
    description: 'Montar uma rotina realista e calma que cabe no seu dia.',
  },
  {
    id: 'habitos',
    label: 'Hábitos',
    description: 'Construir pequenos hábitos que ficam no tempo.',
  },
  {
    id: 'alimentacao-geral',
    label: 'Alimentação geral',
    description: 'Conversas práticas sobre organização das refeições — sem prescrição clínica.',
  },
  {
    id: 'movimento',
    label: 'Movimento',
    description: 'Encaixar movimento que soma, no seu ritmo.',
  },
  {
    id: 'sono-bem-estar',
    label: 'Sono e bem-estar',
    description: 'Sono, descanso e recuperação como parte do progresso.',
  },
  {
    id: 'navegacao-conteudos',
    label: 'Conteúdos LeveLab',
    description: 'Navegar pelos programas, guias e conteúdos da LeveLab.',
  },
  {
    id: 'check-ins',
    label: 'Check-ins',
    description: 'Check-ins curtos para acompanhar o seu percurso.',
  },
  {
    id: 'handoff-humano',
    label: 'Apoio humano',
    description: 'Handoff para atendimento humano quando precisar de mais.',
  },
];

export type LiaQuickAction = { id: string; label: string };

export const liaQuickActions: LiaQuickAction[] = [
  { id: 'planejar-dia', label: 'Planejar meu dia' },
  { id: 'refeicao', label: 'Organizar uma refeição' },
  { id: 'movimento', label: 'Movimento de hoje' },
  { id: 'sono', label: 'Como dormi' },
  { id: 'voltar-rotina', label: 'Preciso voltar à rotina' },
  { id: 'corpo-forte', label: 'Conhecer o Corpo Forte' },
  { id: 'ana', label: 'Falar com Ana' },
];

export type ChatMessage = { role: 'lia' | 'user'; text: string };

export const liaMockConversation: ChatMessage[] = [
  {
    role: 'lia',
    text: 'Olá! Sou a LIA, assistente de bem-estar da LeveLab. Posso ajudar com rotina, alimentação, movimento e hábitos. Por onde quer começar?',
  },
  { role: 'user', text: 'Queria organizar melhor a minha rotina da manhã.' },
  {
    role: 'lia',
    text: 'Boa escolha. Que tal começarmos por um pequeno hábito: beber água e definir uma intenção para o dia? Posso ajudar a montar isso passo a passo.',
  },
];

export type AnaInfo = { name: string; role: string; blurb: string; placeholder: string };

export const anaInfo: AnaInfo = {
  name: 'Ana Gomes',
  role: 'Gerente Comercial',
  blurb:
    'Ajuda em dúvidas comerciais, onboarding e suporte premium. Falar com a Ana é ter uma pessoa do lado de cá.',
  placeholder: '/placeholders/ana-gomes-placeholder.svg',
};

export const liaInfo = {
  /** Headline on the LIA page hero (spec: lia.headline). */
  tagline: 'Bem-estar que conversa com você.',
  /** Subheadline on the LIA page hero (spec: lia.subheadline). */
  subheadline:
    'Conheça a LIA, assistente virtual da LeveLab Care para rotina, hábitos, conteúdos e acompanhamento de bem-estar.',
  identity: 'LIA é uma assistente virtual de bem-estar da LeveLab.',
  placeholder: '/placeholders/lia-placeholder.svg',
  statusLabel: 'Online em breve',
};
