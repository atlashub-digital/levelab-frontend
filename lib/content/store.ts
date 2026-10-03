/**
 * LeveLab store / content catalogue (mock).
 *
 * Spec source: levelab-zai-ui-spec-v1.0.json → pages.store.cards_initial +
 *   non_negotiables ("Do not hard-code unconfirmed prices").
 *
 * V1 commerce phase: catalogue_ready_checkout_later. Prices are NOT set —
 * `price` and `compareAtPrice` remain `undefined` until the LeveLab Backend
 * Store API is wired (phase_2). The ProductCard component renders nothing
 * for price when `product.price` is undefined.
 *
 * The future LeveLab Store will pull live catalog + entitlements from the
 * backend via the `ProductCatalogProvider` adapter exported below.
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
  /** Price is OPTIONAL and intentionally UNSET in V1. Do not hard-code. */
  price?: number;
  compareAtPrice?: number;
  badge?: string;
  tagline: string;
  description: string;
  /** locale-relative path */
  path: string;
  accent: 'forest' | 'olive' | 'gold' | 'sage';
  status: 'live' | 'soon';
  /** Optional flag for "coming soon" cards (no path / no checkout). */
  comingSoon?: boolean;
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
    badge: 'Novo',
    tagline: 'Pequenas escolhas. Grandes mudanças.',
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
    badge: 'Premium',
    tagline: 'Onde o aprendizado vira prática.',
    description:
      'Workbook premium para acompanhar o programa — exercícios, check-ins e espaço de escrita.',
    path: '/programas/corpo-forte',
    accent: 'sage',
    status: 'live',
  },
  {
    id: 'leve-7',
    slug: 'leve-7',
    title: 'Leve 7',
    subtitle: 'Programa · 7 dias',
    category: 'programas',
    format: 'Programa curto',
    badge: 'Em breve',
    tagline: 'Uma semana para voltar ao que importa.',
    description:
      'Programa curto de 7 dias — pequenos hábitos, acompanhamento e LIA. Em breve.',
    path: '/programas',
    accent: 'gold',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'reset-21',
    slug: 'reset-21',
    title: 'Reset 21',
    subtitle: 'Programa · 21 dias',
    category: 'programas',
    format: 'Programa de 3 semanas',
    badge: 'Em breve',
    tagline: 'Três semanas para reorganizar a rotina.',
    description:
      'Programa de 21 dias com foco em rotina, alimentação, movimento e recuperação. Em breve.',
    path: '/programas',
    accent: 'forest',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'leve-90',
    slug: 'leve-90',
    title: 'Leve 90',
    subtitle: 'Programa · 90 dias',
    category: 'programas',
    format: 'Programa trimestral',
    tagline: 'Três meses para construir continuidade.',
    description:
      'Programa trimestral com acompanhamento estendido, LIA e apoio humano. Em breve.',
    path: '/programas',
    accent: 'gold',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'leve-365',
    slug: 'leve-365',
    title: 'Leve 365',
    subtitle: 'Programa · 365 dias',
    category: 'programas',
    format: 'Programa anual',
    tagline: 'Um ano inteiro de constância e cuidado.',
    description:
      'Programa anual com acompanhamento, LIA e conteúdo contínuo. Em breve.',
    path: '/programas',
    accent: 'forest',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'lia-companion',
    slug: 'lia-companion',
    title: 'LIA Companion',
    subtitle: 'Assinatura · bem-estar acompanhado',
    category: 'assinaturas',
    format: 'Assinatura mensal',
    badge: 'Em breve',
    tagline: 'A LIA no seu dia, todos os dias.',
    description:
      'Assinatura com LIA no dia a dia — rotina, alimentação, movimento e motivação. Em breve.',
    path: '/lia',
    accent: 'gold',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'receitas-levelab',
    slug: 'receitas-levelab',
    title: 'Receitas LeveLab',
    subtitle: 'Receitas · coleção',
    category: 'receitas',
    format: 'E-book de receitas',
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
    tagline: 'Um ritual calmo para descansar melhor.',
    description:
      'Guia educativo sobre sono, descanso e recuperação como parte do progresso.',
    path: '/conteudos',
    accent: 'sage',
    status: 'live',
  },
  {
    id: 'pequenos-habitos',
    slug: 'pequenos-habitos',
    title: 'Pequenos Hábitos, Grandes Mudanças',
    subtitle: 'E-book · hábitos e constância',
    category: 'e-books',
    format: 'E-book',
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
  /** Price intentionally UNSET in V1 (spec: no hard-coded unconfirmed prices). */
  price?: number;
  compareAtPrice?: number;
  discountLabel: string;
  includes: string[];
  path: string;
};

export const featuredBundle: Bundle = {
  id: 'bundle-levelab-essencial',
  title: 'Bundle LeveLab Essencial',
  subtitle: 'Programa + Workbook + Conteúdos',
  description:
    'A experiência essencial da LeveLab: o programa Corpo Forte, o workbook de aplicação e conteúdos editoriais para acompanhar a sua rotina.',
  discountLabel: '-20%',
  includes: [
    'Programa Corpo Forte · 8 semanas',
    'Workbook Premium · 77 páginas',
    'Conteúdos editoriais LeveLab',
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

/* -------------------------------------------------------------------------- */
/*  Data adapter — ProductCatalogProvider                                     */
/*  Phase 1 (mock/config) → Phase 2 (LeveLab Backend Store API).              */
/* -------------------------------------------------------------------------- */

export interface ProductCatalogProvider {
  listProducts(): Promise<Product[]>;
  getBundle(): Promise<Bundle | undefined>;
}

/**
 * Mock catalog provider. Returns the static `products` and `featuredBundle`
 * defined above. Phase 2 swaps in `ApiProductCatalogProvider` calling the
 * LeveLab Backend Store endpoint; component surface (`locale`) is unchanged.
 */
export class MockProductCatalogProvider implements ProductCatalogProvider {
  async listProducts(): Promise<Product[]> {
    return products;
  }

  async getBundle(): Promise<Bundle | undefined> {
    return featuredBundle;
  }
}

/**
 * Future API provider — wired to the LeveLab Backend Store API.
 * Never call service-role secrets from the browser.
 */
export class ApiProductCatalogProvider implements ProductCatalogProvider {
  constructor(private baseUrl: string) {}

  async listProducts(): Promise<Product[]> {
    // TODO(integration): GET `${baseUrl}/store/products`
    return new MockProductCatalogProvider().listProducts();
  }

  async getBundle(): Promise<Bundle | undefined> {
    // TODO(integration): GET `${baseUrl}/store/bundle/featured`
    return new MockProductCatalogProvider().getBundle();
  }
}

export const productCatalog: ProductCatalogProvider = new MockProductCatalogProvider();
