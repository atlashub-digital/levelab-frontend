/**
 * LeveLab store / content catalogue (mock).
 * Prices are placeholders for the V1 layout; the future LeveLab Store will
 * pull live catalog + entitlements from the backend API.
 */
import type { Locale } from '@/lib/i18n';

export type ProductCategory =
  | 'programas'
  | 'e-books'
  | 'workbooks'
  | 'guias'
  | 'receitas'
  | 'assinaturas'
  | 'em-breve';

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  format: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  tagline: string;
  description: string;
  /** locale-relative path */
  path: string;
  accent: 'forest' | 'olive' | 'gold' | 'sage';
  status: 'live' | 'soon';
};

export const productCategories: { id: ProductCategory | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos os conteúdos' },
  { id: 'programas', label: 'Programas' },
  { id: 'e-books', label: 'E-books' },
  { id: 'workbooks', label: 'Workbooks' },
  { id: 'guias', label: 'Guias' },
  { id: 'receitas', label: 'Receitas' },
  { id: 'assinaturas', label: 'Assinaturas' },
  { id: 'em-breve', label: 'Em breve' },
];

export const products: Product[] = [
  {
    id: 'corpo-forte',
    slug: 'corpo-forte',
    title: 'Corpo Forte',
    subtitle: 'Programa Interativo · 8 Semanas',
    category: 'programas',
    format: 'Programa + Reader + Workbook',
    price: 497,
    compareAtPrice: 697,
    badge: 'Premium',
    tagline: 'Corpo Forte não é um tipo de corpo. É uma capacidade.',
    description:
      'Programa interativo de 8 semanas com aprendizado, aplicação, experimentos semanais e workbook.',
    path: '/programas/corpo-forte',
    accent: 'forest',
    status: 'live',
  },
  {
    id: 'forca-na-caneta',
    slug: 'forca-na-caneta',
    title: 'Força na Caneta',
    subtitle: 'Guia Educativo · 7 Dias',
    category: 'guias',
    format: 'Guia + Reader',
    price: 127,
    badge: 'Novo',
    tagline: 'Olhar para o apetite com clareza — 7 dias práticos.',
    description:
      'Guia educativo de 7 dias sobre organização de refeições, apetite e escolhas.',
    path: '/programas/forca-na-caneta',
    accent: 'olive',
    status: 'live',
  },
  {
    id: 'workbook-corpo-forte',
    slug: 'workbook-corpo-forte',
    title: 'Workbook Corpo Forte',
    subtitle: 'Material de aplicação · 77 páginas',
    category: 'workbooks',
    format: 'Workbook PDF',
    price: 97,
    badge: 'Premium',
    tagline: 'Onde o aprendizado vira prática.',
    description:
      'Workbook premium para acompanhar o programa — exercícios, check-ins e espaço de escrita.',
    path: '/programas/corpo-forte',
    accent: 'sage',
    status: 'live',
  },
  {
    id: 'plano-8-semanas',
    slug: 'plano-8-semanas',
    title: 'Plano 8 Semanas',
    subtitle: 'Acompanhamento · 8 semanas',
    category: 'programas',
    format: 'Acompanhamento + LIA',
    price: 897,
    compareAtPrice: 1197,
    badge: 'Premium',
    tagline: 'Programa + acompanhamento e LIA ao longo das 8 semanas.',
    description:
      'O programa Corpo Forte com acompanhamento estendido e LIA ao longo das 8 semanas.',
    path: '/programas/corpo-forte',
    accent: 'forest',
    status: 'live',
  },
  {
    id: 'receitas-levelab',
    slug: 'receitas-levelab',
    title: 'Receitas LeveLab',
    subtitle: 'Receitas · coleção',
    category: 'receitas',
    format: 'E-book de receitas',
    price: 67,
    tagline: 'Refeições que sustentam o dia — simples e acolhentes.',
    description:
      'Coleção de receitas para organizar refeições que sustentam energia e rotina.',
    path: '/conteudos',
    accent: 'olive',
    status: 'live',
  },
  {
    id: 'guia-do-sono',
    slug: 'guia-do-sono',
    title: 'Guia do Sono',
    subtitle: 'Guia · descanso e recuperação',
    category: 'guias',
    format: 'E-book',
    price: 57,
    tagline: 'Um ritual calmo para descansar melhor.',
    description:
      'Guia educativo sobre sono, descanso e recuperação como parte do progresso.',
    path: '/conteudos',
    accent: 'sage',
    status: 'live',
  },
  {
    id: 'lia-companion',
    slug: 'lia-companion',
    title: 'LIA Companion',
    subtitle: 'Assinatura · bem-estar acompanhado',
    category: 'assinaturas',
    format: 'Assinatura mensal',
    price: 39,
    badge: 'Em breve',
    tagline: 'A LIA no seu dia, todos os dias.',
    description:
      'Assinatura com LIA no dia a dia — rotina, alimentação, movimento e motivação.',
    path: '/lia',
    accent: 'gold',
    status: 'soon',
  },
  {
    id: 'pequenos-habitos',
    slug: 'pequenos-habitos',
    title: 'Pequenos Hábitos, Grandes Mudanças',
    subtitle: 'E-book · hábitos e constância',
    category: 'e-books',
    format: 'E-book',
    price: 47,
    tagline: 'Pequenos hábitos que sustentam grandes mudanças.',
    description:
      'E-book sobre construir hábitos pequenos, sustentáveis e constância no tempo.',
    path: '/conteudos',
    accent: 'olive',
    status: 'live',
  },
];

export type Bundle = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice: number;
  discountLabel: string;
  includes: string[];
  path: string;
};

export const featuredBundle: Bundle = {
  id: 'corpo-forte-completo',
  title: 'Corpo Forte — Coleção Completa',
  subtitle: 'Guia Premium + Workbook + Plano 8 Semanas',
  description:
    'A experiência completa do Corpo Forte: o guia premium, o workbook de aplicação e o plano de 8 semanas com acompanhamento e LIA.',
  price: 997,
  compareAtPrice: 1291,
  discountLabel: '-23%',
  includes: [
    'Guia Premium · 105 páginas',
    'Workbook Premium · 77 páginas',
    'Plano 8 Semanas com acompanhamento',
    'LIA ao longo de todo o programa',
  ],
  path: '/programas/corpo-forte',
};

export function filterProducts(category: ProductCategory | 'todos'): Product[] {
  if (category === 'todos') return products;
  return products.filter((p) => p.category === category);
}

export function getCurrencyForLocale(locale: Locale): { locale: string; currency: string } {
  if (locale === 'en') return { locale: 'en-US', currency: 'USD' };
  if (locale === 'es') return { locale: 'es-ES', currency: 'EUR' };
  return { locale: 'pt-BR', currency: 'BRL' };
}
