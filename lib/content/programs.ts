/**
 * LeveLab programs — Corpo Forte (8 weeks) + Força na Caneta (7 days).
 * Educational/wellness framing only. No medical claims, no weight-loss promises.
 *
 * Spec source: levelab-zai-ui-spec-v1.0.json → content_catalog
 * - Corpo Forte: PROGRAM, subtitle "Programa Interativo LeveLab de 8 Semanas",
 *   seal "Guia Premium", Week 1 title "Mais do que um número".
 * - Força na Caneta: EBOOK, subtitle "Coleção LeveLab • Guia de 7 dias",
 *   tagline "Pequenas escolhas. Grandes mudanças.", seal "E-book Premium".
 */

export type ProgramWeek = {
  n: number;
  slug: string;
  title: string;
  focus: string;
  summary: string;
  experiment: string;
  /** Reader page range (1-indexed) — maps to the released PDF pages. */
  pageStart: number;
  pageEnd: number;
};

export type ProgramMeta = {
  slug: 'corpo-forte' | 'forca-na-caneta';
  name: string;
  /** Catalog type — PROGRAM (multi-week course) or EBOOK (short guide). */
  type: 'PROGRAM' | 'EBOOK';
  /** Editorial subtitle, shown on cards and hero blocks. */
  subtitle: string;
  kind: 'programa' | 'guia';
  duration: string;
  tagline: string;
  description: string;
  seal: string;
  weeks?: ProgramWeek[];
  days?: ProgramWeek[];
};

export const corpoForte: ProgramMeta = {
  slug: 'corpo-forte',
  name: 'Corpo Forte',
  type: 'PROGRAM',
  subtitle: 'Programa Interativo LeveLab de 8 Semanas',
  kind: 'programa',
  duration: '8 semanas',
  tagline: 'Corpo Forte não é um tipo de corpo. É uma capacidade.',
  description:
    'Programa interativo LeveLab de 8 semanas. Aprendizado, aplicação, workbook, experimentos semanais, check-ins e progresso — com a LIA ao lado.',
  seal: 'Guia Premium',
  weeks: [
    {
      n: 1,
      slug: 'semana-1',
      title: 'Mais do que um número',
      focus: 'Para além da balança',
      summary:
        'Olhar para o progresso de forma mais ampla — energia, rotina, sono e constância — em vez de depender só do número na balança.',
      experiment: 'Definir um marcador de progresso que não seja o peso.',
      pageStart: 1,
      pageEnd: 14,
    },
    {
      n: 2,
      slug: 'semana-2',
      title: 'Músculo e capacidade',
      focus: 'Capacidade funcional',
      summary:
        'Compreender o músculo como capacidade para a vida — levantar, carregar, continuar — num tom educativo e acessível.',
      experiment: 'Identificar um movimento da rotina que quer fortalecer.',
      pageStart: 15,
      pageEnd: 28,
    },
    {
      n: 3,
      slug: 'semana-3',
      title: 'Aprender força',
      focus: 'Técnica e progressão',
      summary: 'Aprender os princípios de força, técnica e progressão gradual, respeitando o próprio ritmo.',
      experiment: 'Ensaiar um movimento com atenção à técnica.',
      pageStart: 29,
      pageEnd: 42,
    },
    {
      n: 4,
      slug: 'semana-4',
      title: 'Alimentação que sustenta',
      focus: 'Organização das refeições',
      summary: 'Organização prática das refeições e da rotina alimentar — sem prescrição clínica.',
      experiment: 'Planejar uma refeição que sustenta a tarde.',
      pageStart: 43,
      pageEnd: 56,
    },
    {
      n: 5,
      slug: 'semana-5',
      title: 'Movimento que soma',
      focus: 'Movimento diário',
      summary: 'Encaixar movimento que soma, de forma realista, no dia a dia.',
      experiment: 'Adicionar 10 minutos de movimento ao dia.',
      pageStart: 57,
      pageEnd: 70,
    },
    {
      n: 6,
      slug: 'semana-6',
      title: 'Recuperação',
      focus: 'Sono e recuperação',
      summary: 'Sono, descanso e recuperação como parte do progresso — não como recompensa.',
      experiment: 'Criar um pequeno ritual de fim de dia.',
      pageStart: 71,
      pageEnd: 84,
    },
    {
      n: 7,
      slug: 'semana-7',
      title: 'Corpo e identidade',
      focus: 'Identidade e constância',
      summary: 'Relação com o corpo, identidade e continuidade — um olhar humano e calmo.',
      experiment: 'Escrever como se quer se sentir no próximo mês.',
      pageStart: 85,
      pageEnd: 96,
    },
    {
      n: 8,
      slug: 'semana-8',
      title: 'Continuidade',
      focus: 'Plano que continua',
      summary: 'Transformar o percurso das 8 semanas num plano que continua depois — com LIA e apoio humano.',
      experiment: 'Definir o próximo compromisso com a sua rotina.',
      pageStart: 97,
      pageEnd: 105,
    },
  ],
};

export const forcaNaCaneta: ProgramMeta = {
  slug: 'forca-na-caneta',
  name: 'Força na Caneta',
  type: 'EBOOK',
  subtitle: 'Coleção LeveLab • Guia de 7 dias',
  kind: 'guia',
  duration: '7 dias',
  tagline: 'Pequenas escolhas. Grandes mudanças.',
  description:
    'Guia educativo LeveLab de 7 dias sobre organização de refeições, apetite e escolhas. Educativo, não prescritivo.',
  seal: 'E-book Premium',
  days: [
    {
      n: 1,
      slug: 'dia-1',
      title: 'Olhar para o seu apetite',
      focus: 'Observação',
      summary: 'Começar por observar o próprio apetite — sem julgar.',
      experiment: 'Anotar os momentos de fome ao longo do dia.',
      pageStart: 1,
      pageEnd: 6,
    },
    {
      n: 2,
      slug: 'dia-2',
      title: 'Organizar o prato',
      focus: 'Estrutura',
      summary: 'Uma estrutura simples para organizar o prato com calma.',
      experiment: 'Montar um prato seguindo a estrutura proposta.',
      pageStart: 7,
      pageEnd: 12,
    },
    {
      n: 3,
      slug: 'dia-3',
      title: 'Decidir antes de comer',
      focus: 'Decisão',
      summary: 'Decidir antes — para reduzir escolhas no momento de fome.',
      experiment: 'Definir a refeição antes de sentir muita fome.',
      pageStart: 13,
      pageEnd: 18,
    },
    {
      n: 4,
      slug: 'dia-4',
      title: 'Fome, vontade e escolha',
      focus: 'Diferença',
      summary: 'Distinguir fome, vontade e escolha — sem culpa.',
      experiment: 'Nomear o que sente antes de comer.',
      pageStart: 19,
      pageEnd: 24,
    },
    {
      n: 5,
      slug: 'dia-5',
      title: 'Refeições que sustentam',
      focus: 'Saciedade',
      summary: 'Montar refeições que sustentam a tarde e a noite.',
      experiment: 'Incluir um elemento a mais de saciedade hoje.',
      pageStart: 25,
      pageEnd: 30,
    },
    {
      n: 6,
      slug: 'dia-6',
      title: 'Ambientes e gatilhos',
      focus: 'Ambiente',
      summary: 'Organizar o ambiente para facilitar as próximas escolhas.',
      experiment: 'Preparar um item saudável à mão.',
      pageStart: 31,
      pageEnd: 34,
    },
    {
      n: 7,
      slug: 'dia-7',
      title: 'Continuidade no dia a dia',
      focus: 'Continuidade',
      summary: 'Levar o aprendizado para a continuidade — com LIA e rotina.',
      experiment: 'Escolher o hábito que vai continuar amanhã.',
      pageStart: 35,
      pageEnd: 38,
    },
  ],
};

export const programs: ProgramMeta[] = [corpoForte, forcaNaCaneta];

export function getProgram(slug: string): ProgramMeta | undefined {
  return programs.find((p) => p.slug === slug);
}
