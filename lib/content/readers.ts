/**
 * Reader content metadata + provider adapter.
 *
 * The V1 Reader uses the released premium PDFs as the authoritative reading
 * assets. The PDFs are NOT bundled in this repo (they live in the LeveLab
 * Drive DAM). The expected local asset paths are documented below so the
 * files can be dropped in WITHOUT code changes:
 *
 *   public/content/corpo-forte/guia-v2.pdf      (105 pages)
 *   public/content/corpo-forte/workbook-v2.pdf  (77 pages)
 *   public/content/forca-na-caneta/forca-na-caneta-v2.pdf (38 pages)
 *
 * Until the PDFs are present, the MockLearningContentProvider returns premium
 * editorial mock pages so the Reader shell is fully demoable. No lorem ipsum.
 */
import { corpoForte, forcaNaCaneta, type ProgramMeta, type ProgramWeek } from './programs';

export type ReaderAsset = {
  product: ProgramMeta['slug'];
  kind: 'guia' | 'workbook';
  title: string;
  totalPages: number;
  /** Path under /public — expected drop-in location for the real PDF. */
  pdfPath: string;
  status: 'released' | 'pending-injection';
  version: string;
};

export const readerAssets: ReaderAsset[] = [
  {
    product: 'corpo-forte',
    kind: 'guia',
    title: 'Corpo Forte — Guia Premium',
    totalPages: 105,
    pdfPath: '/content/corpo-forte/guia-v2.pdf',
    status: 'pending-injection',
    version: 'v2.0 FINAL',
  },
  {
    product: 'corpo-forte',
    kind: 'workbook',
    title: 'Corpo Forte — Workbook Premium',
    totalPages: 77,
    pdfPath: '/content/corpo-forte/workbook-v2.pdf',
    status: 'pending-injection',
    version: 'v2.0 FINAL',
  },
  {
    product: 'forca-na-caneta',
    kind: 'guia',
    title: 'Força na Caneta — Premium',
    totalPages: 38,
    pdfPath: '/content/forca-na-caneta/forca-na-caneta-v2.pdf',
    status: 'pending-injection',
    version: 'v2.0 FINAL',
  },
];

export function getReaderAsset(product: string, kind: 'guia' | 'workbook'): ReaderAsset | undefined {
  return readerAssets.find((a) => a.product === product && a.kind === kind);
}

export type ReaderPage = {
  index: number;
  title: string;
  /** locale-relative path or anchor */
  chapterSlug: string;
  /** Rendered mock content (editorial). Replaced by real PDF rendering later. */
  paragraphs: string[];
  callout?: { label: string; text: string };
};

export type ModuleContent = {
  program: ProgramMeta;
  week: ProgramWeek;
  pages: ReaderPage[];
};

export interface LearningContentProvider {
  getProgram(slug: string): Promise<ProgramMeta | undefined>;
  getModule(product: string, weekSlug: string): Promise<ModuleContent | undefined>;
}

/** Builds premium mock editorial pages for a given week — demoable Reader. */
function buildMockPages(week: ProgramWeek): ReaderPage[] {
  const start = week.pageStart;
  const end = week.pageEnd;
  const total = Math.max(2, end - start + 1);
  const pages: ReaderPage[] = [];
  for (let i = 0; i < total; i++) {
    const pageIndex = i;
    const absPage = start + i;
    pages.push({
      index: pageIndex,
      title: `${week.title} — página ${absPage}`,
      chapterSlug: week.slug,
      paragraphs: [
        i === 0
          ? `Semana ${week.n} · ${week.title}. ${week.summary}`
          : `Continuação de "${week.title}". Conteúdo editorial premium — a versão final do guia apresenta capítulos, espaços de escrita e tratamento calmo de cada tema.`,
        `Foco da semana: ${week.focus}. Experimento sugerido: ${week.experiment}`,
      ],
      callout:
        i === 0
          ? { label: 'Nota do programa', text: 'Conteúdo educativo de bem-estar. Não substitui orientação clínica individual.' }
          : undefined,
    });
  }
  return pages;
}

export class MockLearningContentProvider implements LearningContentProvider {
  async getProgram(slug: string): Promise<ProgramMeta | undefined> {
    return slug === 'corpo-forte' ? corpoForte : slug === 'forca-na-caneta' ? forcaNaCaneta : undefined;
  }

  async getModule(product: string, weekSlug: string): Promise<ModuleContent | undefined> {
    const program =
      product === 'corpo-forte' ? corpoForte : product === 'forca-na-caneta' ? forcaNaCaneta : undefined;
    if (!program) return undefined;
    const list = program.weeks ?? program.days ?? [];
    const week = list.find((w) => w.slug === weekSlug) ?? list[0];
    if (!week) return undefined;
    return { program, week, pages: buildMockPages(week) };
  }
}

/**
 * Future API provider — wired to the LeveLab Backend API.
 * Do not call private keys or DATABASE_URL from the browser.
 */
export class ApiLearningContentProvider implements LearningContentProvider {
  constructor(private baseUrl: string) {}

  async getProgram(slug: string): Promise<ProgramMeta | undefined> {
    // TODO(integration): GET `${baseUrl}/content/programs/${slug}`
    return new MockLearningContentProvider().getProgram(slug);
  }

  async getModule(product: string, weekSlug: string): Promise<ModuleContent | undefined> {
    // TODO(integration): GET `${baseUrl}/content/programs/${product}/modules/${weekSlug}`
    return new MockLearningContentProvider().getModule(product, weekSlug);
  }
}

export const learningContent: LearningContentProvider = new MockLearningContentProvider();
