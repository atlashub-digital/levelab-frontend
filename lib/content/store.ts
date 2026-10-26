/**
 * LeveLab store / content catalogue (mock).
 *
 * Spec source: levelab-zai-ui-spec-v1.0.json → pages.store.cards_initial +
 *   non_negotiables ("Do not hard-code unconfirmed prices").
 *
 * LeveLab V2: a precificação exibida de Corpo Forte (R$ 39,90) foi aprovada
 * pela Direção em 26/10/2026. Não constitui ativação de checkout ARO.
 * Outros preços continuam indefinidos. O catálogo ARO é autoritativo
 * sobre o valor cobrado em checkout, não os cartões desta vitrine.
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
    title: 'Corpo Forte — Além da Balança',
    subtitle: 'eBook + workbook O Meu Corpo em Construção',
    category: 'e-books',
    format: 'Livro digital + Workbook',
    price: 39.90,
    badge: 'Livro + Workbook',
    tagline: 'O corpo é muito mais do que um número na balança.',
    description:
      'Leitura educativa de oito semanas com o Método F.O.R.T.E. e workbook integral incluído. Compra única; acompanhamento LIA não incluído nesta oferta.',
    path: '/programas/corpo-forte',
    accent: 'forest',
    status: 'live',
  },
  {
    id: 'tomei-mounjaro',
    slug: 'tomei-mounjaro',
    title: 'Tomei Mounjaro. E Agora?',
    subtitle: 'eBook educativo · Série Me Sentir Leve',
    category: 'e-books',
    format: 'eBook digital',
    badge: 'Em preparação',
    tagline: 'O peso pode mudar. Mas como cuidar de tudo o resto?',
    description:
      'Uma leitura educativa independente sobre dúvidas e cuidados que podem acompanhar o tratamento, sem indicação, prescrição ou promessa de resultados.',
    path: '/programas/tomei-mounjaro',
    accent: 'sage',
    status: 'soon',
    comingSoon: true,
  },
  {
    id: 'forca-na-caneta',
    slug: 'forca-na-caneta',
    title: 'Força na Caneta',
    subtitle: 'Guia educativo · 7 dias',
    category: 'guias',
    format: 'Guia digital',
    badge: 'Em revisão editorial',
    tagline: 'Pequenas escolhas. Grandes mudanças.',
    description:
      'Título do catálogo anterior em revisão editorial. O leitor demonstrativo mantém-se, sem nova oferta comercial até à homologação.',
    path: '/programas/forca-na-caneta',
    accent: 'olive',
    status: 'soon',
    comingSoon: true,
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
    status: 'soon',
    comingSoon: true,
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
    status: 'soon',
    comingSoon: true,
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
    status: 'soon',
    comingSoon: true,
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
  id: 'corpo-forte-com-workbook',
  title: 'Corpo Forte — Além da Balança',
  subtitle: 'Livro digital + workbook incluído',
  description:
    'Uma única compra inclui o eBook Corpo Forte e o caderno complementar O Meu Corpo em Construção. Leitura e exercícios opcionais durante oito semanas.',
  price: 39.90,
  discountLabel: 'Workbook incluído',
  includes: [
    'eBook Corpo Forte — Além da Balança',
    'Workbook O Meu Corpo em Construção incluído',
    'Oito semanas de leituras e propostas de reflexão',
    'Pagamento único — sem assinatura ou LIA+ incluída',
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
