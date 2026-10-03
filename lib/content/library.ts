/**
 * Premium library shown in the Reader and member area. Asset ids match the
 * backend catalog (levelab-backend src/access/access.catalog.ts). Preview
 * PDFs contain only the free pages (cover, preface, index) and are public.
 */
export type LibraryAsset = {
  id: string;
  product: 'corpo-forte' | 'forca-na-caneta';
  doc: 'guia' | 'workbook';
  title: string;
  totalPages: number;
  previewPages: number;
  previewPath: string;
  offerId: string;
};

export const libraryAssets: LibraryAsset[] = [
  {
    id: 'corpo-forte-guia',
    product: 'corpo-forte',
    doc: 'guia',
    title: 'Corpo Forte — Guia Premium',
    totalPages: 105,
    previewPages: 7,
    previewPath: '/content/previews/corpo-forte-guia-preview.pdf',
    offerId: 'guia-corpo-forte',
  },
  {
    id: 'corpo-forte-workbook',
    product: 'corpo-forte',
    doc: 'workbook',
    title: 'Corpo Forte — Workbook Premium',
    totalPages: 77,
    previewPages: 5,
    previewPath: '/content/previews/corpo-forte-workbook-preview.pdf',
    offerId: 'guia-corpo-forte',
  },
  {
    id: 'forca-na-caneta',
    product: 'forca-na-caneta',
    doc: 'guia',
    title: 'Força na Caneta — Premium',
    totalPages: 38,
    previewPages: 4,
    previewPath: '/content/previews/forca-na-caneta-preview.pdf',
    offerId: 'guia-forca-na-caneta',
  },
];

export function findAsset(product: string, doc: string | undefined) {
  return (
    libraryAssets.find((a) => a.product === product && a.doc === (doc ?? 'guia')) ??
    libraryAssets.find((a) => a.product === product)
  );
}

export const offers: Record<string, { title: string; includes: string[] }> = {
  'guia-corpo-forte': {
    title: 'Corpo Forte + LeveLab+',
    includes: [
      'Guia Premium (105 páginas) e Workbook (77 páginas)',
      'Programa completo de 8 semanas — Método F.O.R.T.E.',
      'LeveLab+ com a LIA a acompanhar a sua jornada',
    ],
  },
  'guia-forca-na-caneta': {
    title: 'Força na Caneta + LeveLab+',
    includes: [
      'Guia Premium de 7 dias (38 páginas)',
      'Refeições pequenas, proteína e rotina para dias de pouca fome',
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
