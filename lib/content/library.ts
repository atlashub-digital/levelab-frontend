/**
 * Premium library shown in the Reader and member area. Asset ids match the
 * backend catalog (levelab-backend src/access/access.catalog.ts) — the
 * INSTALLED EspelhoMeu Editions (MSL A5 v1.0, approved 2026-10-26).
 * Preview PDFs contain only the free pages and are public; full PDFs are
 * streamed by the backend behind an authoritative ARO entitlement check.
 */
export type LibraryProduct = 'corpo-forte' | 'tomei-mounjaro' | 'forca-na-caneta';

export type LibraryAsset = {
  id: string;
  product: LibraryProduct;
  doc: 'guia' | 'workbook';
  title: string;
  totalPages: number;
  previewPages: number;
  previewPath: string;
  offerId: string;
};

export const libraryAssets: LibraryAsset[] = [
  {
    id: 'msl002-corpo-forte',
    product: 'corpo-forte',
    doc: 'guia',
    title: 'Corpo Forte — Além da Balança',
    totalPages: 80,
    previewPages: 6,
    previewPath: '/content/previews/msl002-corpo-forte-preview.pdf',
    offerId: 'levelab-corpo-forte-br',
  },
  {
    id: 'msl003-corpo-em-construcao',
    product: 'corpo-forte',
    doc: 'workbook',
    title: 'O Meu Corpo em Construção',
    totalPages: 57,
    previewPages: 4,
    previewPath: '/content/previews/msl003-corpo-em-construcao-preview.pdf',
    offerId: 'levelab-corpo-forte-br',
  },
  {
    id: 'msl001-tomei-mounjaro',
    product: 'tomei-mounjaro',
    doc: 'guia',
    title: 'Tomei Mounjaro. E Agora?',
    totalPages: 97,
    previewPages: 5,
    previewPath: '/content/previews/msl001-tomei-mounjaro-preview.pdf',
    offerId: 'levelab-tomei-mounjaro-br', // NOT registered — price not decided
  },
  {
    id: 'forca-na-caneta',
    product: 'forca-na-caneta',
    doc: 'guia',
    title: 'Força na Caneta — Premium',
    totalPages: 38,
    previewPages: 4,
    previewPath: '/content/previews/forca-na-caneta-preview.pdf',
    offerId: 'nao-publicar', // NAO_PUBLICAR: no commercial offer
  },
];

export function findAsset(product: string, doc: string | undefined) {
  return (
    libraryAssets.find((a) => a.product === product && a.doc === (doc ?? 'guia')) ??
    libraryAssets.find((a) => a.product === product)
  );
}

export const offers: Record<string, { title: string; includes: string[] }> = {
  'levelab-corpo-forte-br': {
    title: 'Corpo Forte + LeveLab+',
    includes: [
      '«Corpo Forte — Além da Balança» (80 páginas A5) e o workbook «O Meu Corpo em Construção» (57 páginas A5)',
      'Programa completo de 8 semanas — Método F.O.R.T.E.',
      'LeveLab+ com a LIA a acompanhar a sua jornada',
    ],
  },
  'levelab-premium': {
    title: 'LeveLab Premium',
    includes: [
      'Toda a biblioteca LeveLab, incluindo novos lançamentos',
      'LIA+ com acompanhamento contínuo',
      'Comunidade premium e conteúdos exclusivos',
    ],
  },
};
