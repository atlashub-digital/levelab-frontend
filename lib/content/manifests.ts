/**
 * Chapter maps of the premium PDFs (v2.0 FINAL), extracted from each
 * document's table of contents and section openers. `page` is the 1-based
 * page where the chapter starts; `thumb` is the page used as its thumbnail
 * (public/content/thumbs/<asset>-pNNN.webp). Update when a PDF changes.
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

const guia: ReaderManifest = {
  assetId: 'corpo-forte-guia',
  eyebrow: 'Programa de 8 semanas',
  tagline: 'Força, alimentação, movimento e recuperação para o corpo que você está construindo.',
  description:
    'O guia completo do Método F.O.R.T.E.: oito semanas de leitura, prática e continuidade, com apêndices de apoio.',
  script: 'Corpo forte, hoje e sempre.',
  sections: [
    { id: 'inicio', label: 'Início', sub: 'Manifesto e método' },
    { id: 's1', label: 'Semana 1', sub: 'Além do número' },
    { id: 's2', label: 'Semana 2', sub: 'Músculo' },
    { id: 's3', label: 'Semana 3', sub: 'Ficar forte' },
    { id: 's4', label: 'Semana 4', sub: 'Alimentação' },
    { id: 's5', label: 'Semana 5', sub: 'Movimento' },
    { id: 's6', label: 'Semana 6', sub: 'Recuperação' },
    { id: 's7', label: 'Semana 7', sub: 'Identidade' },
    { id: 's8', label: 'Semana 8', sub: 'Continuidade' },
    { id: 'apoio', label: 'Apoio', sub: 'FAQ e apêndices' },
  ],
  chapters: [
    { n: '00', title: 'Capa, Manifesto & Como Usar', page: 4, thumb: 5, section: 'inicio', summary: 'Corpo Forte não é um tipo de corpo: é uma capacidade. O que este guia é, o que não é, e como usá-lo com a LIA.' },
    { n: '01', title: 'Método F.O.R.T.E.', page: 8, thumb: 9, section: 'inicio', summary: 'Cinco pilares que se conectam — da Força à Evolução — para uma transformação que consegue continuar.' },
    { n: '02', title: 'Módulo 0 — Antes de começar', page: 13, thumb: 14, section: 'inicio', summary: 'O ponto de partida: objetivos, contexto e o Mapa Inicial F.O.R.T.E. no Workbook.' },
    { n: '03', title: 'Semana 1 — Mais do que um número', page: 18, thumb: 19, section: 's1', summary: 'O peso é informação, não identidade. Novas formas de medir progresso para além da balança.' },
    { n: '04', title: 'Semana 2 — O músculo que leva a sua vida', page: 26, thumb: 27, section: 's2', summary: 'Músculo não é aparência: é capacidade para subir escadas, carregar, levantar e viver com autonomia.' },
    { n: '05', title: 'Semana 3 — Aprender a ficar forte', page: 33, thumb: 34, section: 's3', summary: 'Séries, repetições e progressão sem mistério. Desafio é necessário; sofrimento não é método.' },
    { n: '06', title: 'Semana 4 — Alimentar um Corpo Forte', page: 40, thumb: 41, section: 's4', summary: 'Comer menos não é automaticamente comer melhor. Proteína, saciedade e organização alimentar.' },
    { n: '07', title: 'Semana 5 — Movimento que soma', page: 48, thumb: 49, section: 's5', summary: 'O treino é uma parte do movimento; o dia inteiro também conta. Como somar movimento à rotina.' },
    { n: '08', title: 'Semana 6 — Recuperar também faz parte', page: 55, thumb: 56, section: 's6', summary: 'Sono, pausas e recuperação: o corpo também melhora quando descansa.' },
    { n: '09', title: 'Semana 7 — A mulher dentro da transformação', page: 62, thumb: 63, section: 's7', summary: 'Imagem corporal, linguagem interna e relação com a comida durante a transformação.' },
    { n: '10', title: 'Semana 8 — O corpo que continua', page: 69, thumb: 70, section: 's8', summary: 'O objetivo não é nunca sair da rotina: é saber voltar. O plano de continuidade.' },
    { n: '11', title: 'Fecho, Continuidade & Referências', page: 77, thumb: 78, section: 'apoio', summary: 'Oito semanas concluídas. O que levar consigo e as referências que sustentam o programa.' },
    { n: '15', title: 'FAQ — 25 Perguntas Reais', page: 82, thumb: 83, section: 'apoio', summary: 'As perguntas que uma participante realmente faz, respondidas com clareza.' },
    { n: '17', title: 'GLP-1 Companion — Guia Seguro', page: 88, thumb: 89, section: 'apoio', summary: 'Quando o tratamento muda o apetite, o cuidado continua inteiro. Contexto educativo, nunca prescrição.' },
    { n: '18', title: 'Movimento, Acessibilidade & Limitações', page: 92, thumb: 93, section: 'apoio', summary: 'Corpo Forte não exige um corpo sem limitações: adaptações para cada realidade.' },
    { n: '19', title: 'Glossário & Conversa com Profissionais', page: 95, thumb: 96, section: 'apoio', summary: 'Os termos essenciais e como preparar a conversa com a sua equipa de saúde.' },
    { n: '20', title: 'Como Ler Promessas de Saúde', page: 97, thumb: 98, section: 'apoio', summary: 'Como não se perder entre hacks, promessas e certezas da internet.' },
    { n: '21', title: 'Força, Osso, Equilíbrio & Envelhecimento Ativo', page: 101, thumb: 102, section: 'apoio', summary: 'Força, osso e equilíbrio para sustentar capacidade ao longo da vida.' },
  ],
};

const workbook: ReaderManifest = {
  assetId: 'corpo-forte-workbook',
  eyebrow: 'Caderno de aplicação',
  tagline: 'O seu caderno de força, rotina e evolução.',
  description:
    'Exercícios semanais, trackers, check-ins e o Plano de 90 Dias — para transformar leitura em decisão.',
  script: 'Escreva a sua própria força.',
  sections: [
    { id: 'inicio', label: 'Início', sub: 'Mapa inicial' },
    { id: 's1', label: 'Semana 1' },
    { id: 's2', label: 'Semana 2' },
    { id: 's3', label: 'Semana 3' },
    { id: 's4', label: 'Semana 4' },
    { id: 's5', label: 'Semana 5' },
    { id: 's6', label: 'Semana 6' },
    { id: 's7', label: 'Semana 7' },
    { id: 's8', label: 'Semana 8' },
    { id: 'ferramentas', label: 'Ferramentas', sub: 'Trackers e plano' },
  ],
  chapters: [
    { n: '00', title: 'Como usar + Mapa Inicial F.O.R.T.E.', page: 4, thumb: 5, section: 'inicio', summary: 'Não é uma prova. O seu ponto de partida em cada pilar, e como quer ser acompanhada pela LIA.' },
    { n: '01', title: 'Semana 1 — Progresso além da balança', page: 8, thumb: 9, section: 's1', summary: 'Exercícios para registar sinais de progresso que a balança não mostra.' },
    { n: '02', title: 'Semana 2 — Capacidade e força', page: 14, thumb: 15, section: 's2', summary: 'As capacidades que quer construir e o seu mínimo viável de força.' },
    { n: '03', title: 'Semana 3 — Rotina de força', page: 19, thumb: 20, section: 's3', summary: 'Planeie e registe a sua rotina de treino, com progressão segura.' },
    { n: '04', title: 'Semana 4 — Organização alimentar', page: 23, thumb: 24, section: 's4', summary: 'Organize refeições, proteína e saciedade sem regras rígidas.' },
    { n: '05', title: 'Semana 5 — Movimento', page: 28, thumb: 29, section: 's5', summary: 'Mapeie e some movimento ao longo do dia.' },
    { n: '06', title: 'Semana 6 — Recuperação', page: 33, thumb: 34, section: 's6', summary: 'Sono, pausas e sinais de recuperação.' },
    { n: '07', title: 'Semana 7 — Linguagem, corpo e identidade', page: 38, thumb: 39, section: 's7', summary: 'A forma como fala consigo e com o seu corpo.' },
    { n: '08', title: 'Semana 8 — Continuidade', page: 43, thumb: 44, section: 's8', summary: 'O seu plano para continuar — e para voltar quando sair da rotina.' },
    { n: '09', title: 'Painel Corpo Forte & Trackers', page: 49, thumb: 50, section: 'ferramentas', summary: 'Trackers para acompanhar as oito semanas.' },
    { n: '10', title: 'Plano de 90 Dias', page: 52, thumb: 53, section: 'ferramentas', summary: 'Depois das 8 semanas: o seu plano de continuidade, construído com a LIA.' },
    { n: '11', title: 'Cartões, Consulta & Carta Futura', page: 58, thumb: 59, section: 'ferramentas', summary: 'Cartões de apoio, preparação de consultas e uma carta para o seu eu futuro.' },
    { n: '12', title: 'Experimentos de 7 Dias', page: 63, thumb: 64, section: 'ferramentas', summary: 'Pequenos testes para descobrir o que funciona para si.' },
    { n: '13', title: 'Laboratório de Barreiras & Ambiente', page: 68, thumb: 69, section: 'ferramentas', summary: 'Identifique barreiras e ajuste o ambiente a seu favor.' },
    { n: '14', title: 'Check-in Semanal', page: 71, thumb: 72, section: 'ferramentas', summary: 'O ritual semanal de revisão e compromisso.' },
    { n: '15', title: 'Mapa de Apoio', page: 74, thumb: 75, section: 'ferramentas', summary: 'Quem e o que a apoia nesta jornada.' },
  ],
};

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
    { id: 'receitas', label: 'Receitas', sub: '10 receitas' },
    { id: 'continuar', label: 'Continuar', sub: 'Check-in e LIA' },
  ],
  chapters: [
    { n: '01', title: 'Bem-vinda ao seu novo começo', page: 2, thumb: 2, section: 'comecar', summary: 'Um guia para mulheres reais, com uma vida real.' },
    { n: '02', title: 'Antes de começar', page: 4, thumb: 4, section: 'comecar', summary: 'Um guia educativo, não uma prescrição.' },
    { n: '03', title: 'Navegador de apetite', page: 5, thumb: 5, section: 'comecar', summary: 'Como está o seu apetite hoje? Escolha o cenário mais próximo.' },
    { n: '04', title: 'O Método 4P', page: 6, thumb: 6, section: 'comecar', summary: 'Quatro ideias simples para decidir sem transformar a alimentação numa cobrança.' },
    { n: '05', title: 'Proteína sem complicação', page: 7, thumb: 7, section: 'comecar', summary: 'Reconhecer boas fontes de proteína sem decorar números.' },
    { n: '06', title: 'Monte uma pequena refeição', page: 8, thumb: 8, section: 'comecar', summary: 'Combinações, não perfeição.' },
    { n: '07', title: 'Seu mapa de 7 dias', page: 9, thumb: 9, section: 'semana', summary: 'Sete dias, sete atmosferas — inspiração, não obrigação.' },
    { n: '08', title: 'Preparação da semana', page: 10, thumb: 10, section: 'semana', summary: 'Deixe o fácil mais fácil, com lista de compras.' },
    { n: '09', title: 'Dia 1 — Comece sem pressão', page: 12, thumb: 12, section: 'semana' },
    { n: '10', title: 'Dia 2 — Pequeno, mas nutritivo', page: 13, thumb: 13, section: 'semana' },
    { n: '11', title: 'Dia 3 — Dia corrido', page: 14, thumb: 14, section: 'semana' },
    { n: '12', title: 'Dia 4 — Experimente variar', page: 15, thumb: 15, section: 'semana' },
    { n: '13', title: 'Dia 5 — Comida que acolhe', page: 16, thumb: 16, section: 'semana' },
    { n: '14', title: 'Dia 6 — Praticidade primeiro', page: 17, thumb: 17, section: 'semana' },
    { n: '15', title: 'Dia 7 — Feche com leveza', page: 18, thumb: 18, section: 'semana' },
    { n: '16', title: 'Plano B para dias de pouca fome', page: 19, thumb: 19, section: 'semana', summary: 'Quando a fome quase some: simplifique.' },
    { n: '17', title: 'Trocas inteligentes', page: 20, thumb: 20, section: 'semana', summary: 'Adaptar sem confundir.' },
    { n: '18', title: '10 receitas para repetir', page: 21, thumb: 21, section: 'receitas', summary: 'Poucos ingredientes, preparo rápido e porções pequenas.' },
    { n: '19', title: 'Movimento', page: 32, thumb: 32, section: 'continuar', summary: 'A alimentação é uma parte da história; força e função também contam.' },
    { n: '20', title: 'Sinais de atenção', page: 33, thumb: 33, section: 'continuar', summary: 'Alguns sinais pedem ajuda profissional.' },
    { n: '21', title: 'Check-in de 7 dias', page: 34, thumb: 34, section: 'continuar', summary: 'Antes de olhar para a balança, olhe para a sua semana.' },
    { n: '22', title: 'LIA, sempre com você', page: 35, thumb: 35, section: 'continuar', summary: 'O guia continua na conversa com a LIA.' },
    { n: '23', title: 'Daqui para frente', page: 36, thumb: 36, section: 'continuar', summary: 'Você terminou os primeiros 7 dias. E agora?' },
    { n: '24', title: 'Recursos e próximos passos', page: 37, thumb: 37, section: 'continuar' },
  ],
};

export const manifests: Record<string, ReaderManifest> = {
  [guia.assetId]: guia,
  [workbook.assetId]: workbook,
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
