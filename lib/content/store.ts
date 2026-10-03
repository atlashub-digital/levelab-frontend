/**
 * LeveLab catalog — single source for Loja, Conteúdos, Home and Programas.
 *
 * Truth rules (V2 brief §38):
 *  - `status: 'live'` only for what a person can actually get today: the
 *    three premium PDFs (Reader + member access) and LeveLab Premium
 *    (granted manually until a payment provider is chosen).
 *  - Everything else is `soon` and is shown as "Em breve".
 *  - No prices until the commerce layer is connected; no fake discounts.
 */
import type { Locale } from '@/lib/i18n';

export type ProductCategory =
  | 'programas'
  | 'e-books'
  | 'workbooks'
  | 'guias'
  | 'receitas'
  | 'assinaturas';

export type ProductGoal = 'energia' | 'forca' | 'alimentacao' | 'bem-estar' | 'habitos';
export type ProductFormat = 'digital' | 'acompanhamento';

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  format: string;
  formatType: ProductFormat;
  goals: ProductGoal[];
  /** Price stays unset until the commerce layer is connected. */
  price?: number;
  badge?: string;
  tagline: string;
  description: string;
  /** Locale-relative path of the product/program page. */
  path: string;
  /** Locale-relative Reader path when there is a free preview. */
  readerPath?: string;
  image: { src: string; kind: 'cover' | 'photo'; alt: string };
  accent: 'forest' | 'olive' | 'gold' | 'sage';
  status: 'live' | 'soon';
  comingSoon?: boolean;
};

export const productCategories: { id: ProductCategory | 'todos' | 'em-breve'; label: string }[] = [
  { id: 'todos', label: 'Todos os conteúdos' },
  { id: 'programas', label: 'Programas' },
  { id: 'e-books', label: 'E-books' },
  { id: 'workbooks', label: 'Workbooks' },
  { id: 'guias', label: 'Guias' },
  { id: 'receitas', label: 'Receitas' },
  { id: 'assinaturas', label: 'Assinaturas' },
  { id: 'em-breve', label: 'Em breve' },
];

export const goalLabels: Record<ProductGoal, string> = {
  energia: 'Mais energia',
  forca: 'Força e movimento',
  alimentacao: 'Alimentação equilibrada',
  'bem-estar': 'Bem-estar e mente',
  habitos: 'Organização e hábitos',
};

export const products: Product[] = [
  {
    id: 'corpo-forte',
    slug: 'corpo-forte',
    title: 'Corpo Forte',
    subtitle: 'Programa · 8 semanas',
    category: 'programas',
    format: 'Guia Premium (105 p.) + Workbook (77 p.) + LIA',
    formatType: 'digital',
    goals: ['forca', 'energia', 'habitos'],
    badge: 'Programa',
    tagline: 'Força, alimentação, movimento e recuperação para o corpo que você está construindo.',
    description:
      'Programa de 8 semanas com o Método F.O.R.T.E.: leitura, aplicação no Workbook e acompanhamento da LIA.',
    path: '/programas/corpo-forte',
    readerPath: '/programas/corpo-forte/reader',
    image: { src: '/images/programs/corpo-forte-card.webp', kind: 'photo', alt: 'Mulher sorridente ao ar livre' },
    accent: 'forest',
    status: 'live',
  },
  {
    id: 'forca-na-caneta',
    slug: 'forca-na-caneta',
    title: 'Força na Caneta',
    subtitle: 'Guia · 7 dias',
    category: 'guias',
    format: 'Guia Premium (38 p.) + LIA',
    formatType: 'digital',
    goals: ['alimentacao', 'energia'],
    badge: 'E-book',
    tagline: 'Pequenas escolhas. Grandes mudanças.',
    description:
      'Refeições pequenas, proteína e rotina para dias de pouca fome — um plano simples, saboroso e sustentável.',
    path: '/programas/forca-na-caneta',
    readerPath: '/programas/forca-na-caneta/reader',
    image: { src: '/content/thumbs/cover-forca-na-caneta-p001.webp', kind: 'cover', alt: 'Capa do guia Força na Caneta' },
    accent: 'olive',
    status: 'live',
  },
  {
    id: 'workbook-corpo-forte',
    slug: 'workbook-corpo-forte',
    title: 'Workbook Corpo Forte',
    subtitle: 'Workbook · 77 páginas',
    category: 'workbooks',
    format: 'Workbook Premium (incluído no Corpo Forte)',
    formatType: 'digital',
    goals: ['habitos', 'forca'],
    badge: 'Workbook',
    tagline: 'Onde a leitura vira decisão.',
    description: 'Exercícios semanais, trackers, check-ins e o Plano de 90 Dias.',
    path: '/programas/corpo-forte',
    readerPath: '/programas/corpo-forte/reader?doc=workbook',
    image: { src: '/content/thumbs/cover-corpo-forte-workbook-p001.webp', kind: 'cover', alt: 'Capa do Workbook Corpo Forte' },
    accent: 'sage',
    status: 'live',
  },
  {
    id: 'levelab-premium',
    slug: 'levelab-premium',
    title: 'LeveLab Premium',
    subtitle: 'Acesso completo',
    category: 'assinaturas',
    format: 'Toda a biblioteca + LIA+',
    formatType: 'acompanhamento',
    goals: ['energia', 'forca', 'alimentacao', 'bem-estar', 'habitos'],
    badge: 'Acesso completo',
    tagline: 'Toda a biblioteca LeveLab, com a LIA ao seu lado.',
    description:
      'Acesso a todos os guias e workbooks, novos lançamentos e acompanhamento contínuo com a LIA.',
    path: '/loja#premium',
    image: { src: '/content/thumbs/cover-corpo-forte-guia-p001.webp', kind: 'cover', alt: 'Capa do Corpo Forte' },
    accent: 'gold',
    status: 'live',
  },
  // ---- Em breve ----------------------------------------------------------
  {
    id: 'jornada-8-semanas',
    slug: 'jornada-8-semanas',
    title: 'Jornada 8 Semanas',
    subtitle: 'Acompanhamento · 8 semanas',
    category: 'programas',
    format: 'Programa com acompanhamento',
    formatType: 'acompanhamento',
    goals: ['habitos', 'bem-estar'],
    badge: 'Programa',
    tagline: 'Método, comunidade e suporte contínuo.',
    description: 'Um programa completo com acompanhamento humano, comunidade e a LIA.',
    path: '/programas',
    image: { src: '/images/programs/jornada-8-semanas-card.webp', kind: 'photo', alt: 'Mulher de costas a contemplar montanhas ao pôr do sol' },
    accent: 'forest',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'receitas-levelab',
    slug: 'receitas-levelab',
    title: 'Receitas LeveLab',
    subtitle: 'E-book de receitas',
    category: 'receitas',
    format: 'E-book',
    formatType: 'digital',
    goals: ['alimentacao'],
    badge: 'Receitas',
    tagline: 'Pequenas mudanças, grandes resultados.',
    description: 'Receitas simples, nutritivas e deliciosas para o dia a dia.',
    path: '/conteudos',
    image: { src: '/images/content/receitas-levelab.webp', kind: 'photo', alt: 'Taça com fruta e granola' },
    accent: 'olive',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'plano-alimentacao',
    slug: 'plano-alimentacao',
    title: 'Plano de Alimentação Semanal',
    subtitle: 'Guia · organização',
    category: 'guias',
    format: 'Guia',
    formatType: 'digital',
    goals: ['alimentacao', 'habitos'],
    badge: 'Guia',
    tagline: 'Organização e praticidade para o seu dia a dia.',
    description: 'Planejamento semanal de refeições, simples de seguir.',
    path: '/conteudos',
    image: { src: '/images/content/plano-alimentacao.webp', kind: 'photo', alt: 'Caderno de plano de alimentação' },
    accent: 'sage',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'diario-evolucao',
    slug: 'diario-evolucao',
    title: 'Diário da Minha Evolução',
    subtitle: 'Workbook · registo',
    category: 'workbooks',
    format: 'Workbook',
    formatType: 'digital',
    goals: ['habitos', 'bem-estar'],
    badge: 'Workbook',
    tagline: 'Mais foco, mais consciência.',
    description: 'Um diário para registrar progresso, energia e aprendizagens.',
    path: '/conteudos',
    image: { src: '/images/content/diario-evolucao.webp', kind: 'photo', alt: 'Caderno aberto com anotações' },
    accent: 'gold',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'guia-do-sono',
    slug: 'guia-do-sono',
    title: 'Guia do Sono LeveLab',
    subtitle: 'E-book · recuperação',
    category: 'e-books',
    format: 'E-book',
    formatType: 'digital',
    goals: ['bem-estar', 'energia'],
    badge: 'E-book',
    tagline: 'Um ritual calmo para descansar melhor.',
    description: 'Sono, descanso e recuperação como parte do progresso.',
    path: '/conteudos',
    image: { src: '/images/content/guia-do-sono.webp', kind: 'photo', alt: 'Guia do sono sobre a cama' },
    accent: 'sage',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'pequenos-habitos',
    slug: 'pequenos-habitos',
    title: 'Pequenos Hábitos, Grandes Mudanças',
    subtitle: 'E-book · constância',
    category: 'e-books',
    format: 'E-book',
    formatType: 'digital',
    goals: ['habitos'],
    badge: 'E-book',
    tagline: 'Um guia prático para criar rotinas que transformam.',
    description: 'Construir hábitos pequenos, sustentáveis e constantes.',
    path: '/conteudos',
    image: { src: '/images/content/pequenos-habitos.webp', kind: 'photo', alt: 'Livro Pequenos Hábitos entre plantas' },
    accent: 'olive',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'lia-companion',
    slug: 'lia-companion',
    title: 'LIA Companion',
    subtitle: 'Assinatura · LIA no dia a dia',
    category: 'assinaturas',
    format: 'Assinatura',
    formatType: 'acompanhamento',
    goals: ['bem-estar', 'habitos'],
    badge: 'Assinatura',
    tagline: 'A sua aliada com orientações e conteúdos exclusivos.',
    description: 'A LIA no seu dia, todos os dias, como assinatura própria.',
    path: '/lia',
    image: { src: '/images/people/lia/lia-portrait.webp', kind: 'photo', alt: 'LIA, assistente virtual LeveLab' },
    accent: 'gold',
    status: 'soon',
    comingSoon: true,
  },
];

export const liveProducts = products.filter((p) => p.status === 'live');

export function filterProducts(category: ProductCategory | 'todos' | 'em-breve'): Product[] {
  if (category === 'todos') return products;
  if (category === 'em-breve') return products.filter((p) => p.status === 'soon');
  return products.filter((p) => p.category === category);
}

export function getCurrencyForLocale(locale: Locale): { locale: string; currency: string } {
  if (locale === 'en') return { locale: 'en-US', currency: 'USD' };
  if (locale === 'es') return { locale: 'es-ES', currency: 'EUR' };
  return { locale: 'pt-BR', currency: 'BRL' };
}
