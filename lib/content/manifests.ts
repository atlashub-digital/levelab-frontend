/**
 * Reader manifests for the INSTALLED EspelhoMeu Editions (MSL A5 v1.0,
 * approved for distribution 2026-10-26). Page offsets are OBSERVED landmarks
 * of the installed files (pdftotext scan), replacing the v2.0 assumptions
 * (105/77 pages) per LEVELAB_V2_EXECUTION.md G1. Update when a PDF changes.
 */
export type Chapter = {
  n: string;
  title: string;
  page: number;
  thumb: number;
  /** Section tab this chapter belongs to (see ReaderManifest.sections). */
  section: string;
  summary?: string;
};

export type ReaderManifest = {
  assetId: string;
  eyebrow: string;
  tagline: string;
  description: string;
  script: string;
  sections: { id: string; label: string; sub?: string }[];
  chapters: Chapter[];
};

const msl002: ReaderManifest = {
  assetId: 'msl002-corpo-forte',
  eyebrow: 'Série Me Sentir Leve · MSL-002 · Edição 3.1',
  tagline: 'Força, cuidado e continuidade — para além da balança.',
  description:
    'Oito semanas com o método F.O.R.T.E., organizadas em quatro atos, com laboratório de aplicação e caderno especial da vida real.',
  script: 'Corpo forte, hoje e sempre.',
  sections: [
    { id: 'inicio', label: 'Início', sub: 'Abertura e método' },
    { id: 'atos', label: 'As oito semanas', sub: 'Atos I–IV' },
    { id: 'continuar', label: 'Continuidade', sub: 'Próximo ciclo de 90 dias' },
    { id: 'aplicacao', label: 'Aplicação', sub: 'Laboratório e caderno' },
  ],
  chapters: [
    { n: '00', title: 'Abertura — O corpo que acompanha a sua vida', page: 4, thumb: 5, section: 'inicio', summary: 'Antes de falar de força e movimento: o corpo que chegou até aqui.' },
    { n: '01', title: 'Como usar esta edição', page: 7, thumb: 7, section: 'inicio', summary: 'Leitura digital em oito semanas e materiais complementares.' },
    { n: '02', title: 'O método F.O.R.T.E.', page: 9, thumb: 9, section: 'inicio', summary: 'De Força a Evolução: cinco pilares que se ligam.' },
    { n: '03', title: 'As oito semanas — Atos I a IV', page: 13, thumb: 13, section: 'atos', summary: 'Reconhecer, construir, sustentar e continuar, semana a semana.' },
    { n: '04', title: 'O próximo ciclo: 90 dias de continuidade', page: 42, thumb: 42, section: 'continuar', summary: 'O objetivo não é sair da rotina: é saber voltar.' },
    { n: '05', title: 'Laboratório de aplicação — oito semanas em contexto', page: 44, thumb: 44, section: 'aplicacao', summary: 'O que fazer com o que acabámos de ler.' },
    { n: '06', title: 'Caderno especial — o Corpo Forte na vida real', page: 52, thumb: 52, section: 'aplicacao', summary: 'Perguntas reais, aplicadas a semanas reais.' },
    { n: '07', title: 'Informações de edição', page: 79, thumb: 79, section: 'aplicacao' },
  ],
};

const msl003: ReaderManifest = {
  assetId: 'msl003-corpo-em-construcao',
  eyebrow: 'Série Me Sentir Leve · MSL-003',
  tagline: 'O caderno de trabalho das oito semanas.',
  description:
    'Workbook incluído na compra de Corpo Forte: ponto de partida, check-outs semanais, exercícios extra e o plano de 90 dias.',
  script: 'Uma página de cada vez.',
  sections: [
    { id: 'comecar', label: 'Começar', sub: 'Carta e ponto de partida' },
    { id: 'semanas', label: 'Semanas 1–8', sub: 'Check-out por semana' },
    { id: 'carta', label: 'A carta de 90 dias', sub: 'Continuidade' },
    { id: 'extras', label: 'Caderno de continuidade', sub: 'Exercícios extra' },
  ],
  chapters: [
    { n: '00', title: 'O meu corpo em construção', page: 2, thumb: 2, section: 'comecar' },
    { n: '01', title: 'A minha carta de 90 dias (abertura)', page: 3, thumb: 3, section: 'comecar', summary: 'Escreve primeiro, revisitares depois.' },
    { n: '02', title: 'Como usar', page: 5, thumb: 5, section: 'comecar' },
    { n: '03', title: 'O meu ponto de partida', page: 7, thumb: 7, section: 'comecar' },
    { n: '04', title: 'Semanas 1–8 — check-outs', page: 10, thumb: 10, section: 'semanas', summary: 'Uma semana de cada vez, com check-out no fim.' },
    { n: '05', title: 'A minha carta de 90 dias', page: 34, thumb: 34, section: 'carta' },
    { n: '06', title: 'Caderno de continuidade e exercícios extra (01–08)', page: 37, thumb: 37, section: 'extras' },
    { n: '07', title: 'Plano de 90 dias — uma página', page: 54, thumb: 54, section: 'extras' },
    { n: '08', title: 'Fecho editorial', page: 57, thumb: 57, section: 'extras' },
  ],
};

const msl001: ReaderManifest = {
  assetId: 'msl001-tomei-mounjaro',
  eyebrow: 'Série Me Sentir Leve · MSL-001',
  tagline: 'Um guia honesto para quem começou (ou pensa começar) um GLP-1.',
  description:
    'Doze capítulos: expectativa versus realidade, fome e saciedade, segurança, imagem corporal, continuidade e a consulta como conversa.',
  script: 'Sem promessas, com informação.',
  sections: [
    { id: 'inicio', label: 'Início', sub: 'Convite à leitura' },
    { id: 'capitulos', label: 'Capítulos 01–06', sub: 'Do início ao corpo que muda' },
    { id: 'continuar', label: 'Capítulos 07–12', sub: 'Comida, continuidade e consulta' },
    { id: 'ferramentas', label: 'Ferramentas', sub: 'Ficha e cartas' },
  ],
  chapters: [
    { n: '00', title: 'Um convite à leitura', page: 6, thumb: 6, section: 'inicio' },
    { n: '01', title: 'Capítulo 01 — A pergunta que raramente aparece', page: 9, thumb: 9, section: 'capitulos' },
    { n: '02', title: 'Capítulo 02 — Fome e saciedade', page: 15, thumb: 15, section: 'capitulos' },
    { n: '03', title: 'Capítulo 03 — Perguntas para a vida real', page: 22, thumb: 22, section: 'capitulos' },
    { n: '04', title: 'Capítulo 04 — O que os estudos dizem (e não dizem)', page: 30, thumb: 30, section: 'capitulos' },
    { n: '05', title: 'Capítulo 05 — Segurança e sinais', page: 37, thumb: 37, section: 'capitulos' },
    { n: '06', title: 'Capítulo 06 — O corpo que muda', page: 44, thumb: 44, section: 'capitulos' },
    { n: '07', title: 'Capítulo 07 — Comida e rotina', page: 51, thumb: 51, section: 'continuar' },
    { n: '08', title: 'Capítulo 08 — Resultados e promessas', page: 58, thumb: 58, section: 'continuar' },
    { n: '09', title: 'Capítulo 09 — Continuidade e retirada', page: 65, thumb: 65, section: 'continuar' },
    { n: '10', title: 'Capítulo 10 — Comentários e roupa', page: 72, thumb: 72, section: 'continuar' },
    { n: '11', title: 'Capítulo 11 — A consulta como conversa', page: 79, thumb: 79, section: 'continuar' },
    { n: '12', title: 'Capítulo 12 — A vida que se adia', page: 86, thumb: 86, section: 'ferramentas' },
    { n: '13', title: 'Uma carta para a pessoa que continua', page: 92, thumb: 92, section: 'ferramentas' },
    { n: '14', title: 'Um pequeno filtro contra promessas', page: 94, thumb: 94, section: 'ferramentas' },
  ],
};

// PRESERVED, NOT PUBLISHED (NAO_PUBLICAR): historical 7-day guide, kept for
// future editorial release. Not returned by the backend library.
const forca: ReaderManifest = {
  assetId: 'forca-na-caneta',
  eyebrow: 'Guia de 7 dias',
  tagline: 'Pequenas escolhas. Grandes mudanças.',
  description:
    'Refeições pequenas, proteína e rotina para dias de pouca fome — um plano simples, saboroso e sustentável.',
  script: 'Pequeno, mas nutritivo.',
  sections: [
    { id: 'comecar', label: 'Começar', sub: 'Orientação e método' },
    { id: 'semana', label: '7 dias', sub: 'Plano diário' },
  ],
  chapters: [
    { n: '01', title: 'Bem-vinda ao seu novo começo', page: 2, thumb: 2, section: 'comecar' },
    { n: '02', title: 'O Método 4P', page: 6, thumb: 6, section: 'comecar' },
    { n: '03', title: 'Seu mapa de 7 dias', page: 9, thumb: 9, section: 'semana' },
  ],
};

export const manifests: Record<string, ReaderManifest> = {
  [msl002.assetId]: msl002,
  [msl003.assetId]: msl003,
  [msl001.assetId]: msl001,
  [forca.assetId]: forca,
};

/** Chapter containing a page (last chapter starting at or before it). */
export function chapterForPage(manifest: ReaderManifest, page: number): Chapter | undefined {
  let found: Chapter | undefined;
  for (const chapter of manifest.chapters) if (chapter.page <= page) found = chapter;
  return found;
}

export const thumbSrc = (assetId: string, page: number) =>
  `/content/thumbs/${assetId}-p${String(page).padStart(3, '0')}.webp`;

export const coverSrc = (assetId: string) => `/content/thumbs/cover-${assetId}-p001.webp`;
