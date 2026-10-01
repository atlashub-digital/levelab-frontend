import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  BookOpen,
  GraduationCap,
  NotebookPen,
  ClipboardList,
  Lightbulb,
  CalendarCheck,
  TrendingUp,
  Repeat,
  Brain,
  PlayCircle,
  ListChecks,
  Target,
  ClipboardCheck,
  Star,
} from 'lucide-react';
import { corpoForte } from '@/lib/content/programs';
import { WeekTimeline } from '@/components/blocks/WeekTimeline';
import { CTABanner } from '@/components/blocks/CTABanner';
import { Badge, Card } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getLocaleCopy, isLocale } from '@/lib/i18n';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Corpo Forte · LeveLab',
  description:
    'Programa interativo LeveLab de 8 semanas: aprendizado, aplicação, workbook, experimentos semanais, check-ins e progresso — com LIA e apoio humano.',
  alternates: { canonical: '/pt-br/programas/corpo-forte' },
  openGraph: {
    title: 'Corpo Forte · LeveLab',
    description:
      'Programa interativo de 8 semanas — aprendizado, aplicação e progresso com LIA e apoio humano.',
    url: `${siteConfig.url}/pt-br/programas/corpo-forte`,
  },
};

const includes = [
  {
    icon: GraduationCap,
    title: 'Aprendizado',
    description:
      'Cada semana começa com uma microaula curta e calma — para entender o tema antes de aplicar.',
  },
  {
    icon: ClipboardList,
    title: 'Aplicação',
    description:
      'Um foco prático por semana, encaixado no dia a dia, sem exigir rotina perfeita.',
  },
  {
    icon: MessageCircle,
    title: 'LIA ao lado',
    description:
      'Conversas com a LIA para refletir, montar o dia e voltar à rotina quando escorregar.',
  },
  {
    icon: NotebookPen,
    title: 'Workbook',
    description:
      'Espaços de escrita para acompanhar o guia — 77 páginas de aplicação, sem pressão.',
  },
  {
    icon: Lightbulb,
    title: 'Experimentos semanais',
    description:
      'Um pequeno experimento por semana — simples, possível e observável, não clínico.',
  },
  {
    icon: CalendarCheck,
    title: 'Check-ins',
    description:
      'Check-in no início e check-out no fim de cada semana — para ver o que ficou.',
  },
  {
    icon: TrendingUp,
    title: 'Progresso',
    description:
      'Progresso que inclui energia, rotina, sono e constância — não só um número.',
  },
  {
    icon: Repeat,
    title: 'Continuidade',
    description:
      'Transformar as 8 semanas num plano que continua — com LIA e apoio humano.',
  },
];

const weeklyLoop = [
  {
    icon: PlayCircle,
    step: 'Microaula',
    description: 'Uma lição curta abre a semana e apresenta o foco.',
  },
  {
    icon: BookOpen,
    step: 'Leitura',
    description: 'Leitura das páginas premium do guia para a semana.',
  },
  {
    icon: NotebookPen,
    step: 'Exercício / Workbook',
    description: 'Aplicação no workbook — escrever, observar, decidir.',
  },
  {
    icon: MessageCircle,
    step: 'Conversar com LIA',
    description: 'Refletir com a LIA sobre o que apareceu na leitura.',
  },
  {
    icon: ListChecks,
    step: 'Quiz',
    description: 'Autochecagem leve, sem nota — só para fixar o essencial.',
  },
  {
    icon: Lightbulb,
    step: 'Experimento da semana',
    description: 'Um experimento pequeno, possível e calmo para testar.',
  },
  {
    icon: Target,
    step: 'Compromisso',
    description: 'Escolher o que se quer manter na próxima semana.',
  },
  {
    icon: ClipboardCheck,
    step: 'Check-out',
    description: 'Fechar a semana com progresso e próximo passo.',
  },
];

export default async function CorpoFortePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);
  const readerPath = `/${locale}/programas/corpo-forte/reader`;
  const liaPath = `/${locale}/lia`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_82%_-6%,rgba(183,154,91,0.22),transparent_34rem),radial-gradient(circle_at_0%_14%,rgba(21,61,49,0.06),transparent_28rem)]"
        />
        <div className="shell grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative">
            <span className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Programa Interativo · 8 Semanas
            </span>
            <h1 className="mt-4 text-balance font-display text-[clamp(2.6rem,6vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.03em] text-ink">
              Corpo Forte
            </h1>
            <p className="mt-5 max-w-xl font-display text-pretty text-[clamp(1.2rem,2.2vw,1.6rem)] italic leading-snug text-forest-2">
              {corpoForte.tagline}
            </p>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              {corpoForte.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={readerPath}
                className="inline-flex h-14 items-center gap-2 rounded-full bg-forest px-8 text-base font-semibold text-white shadow-soft transition-all hover:bg-forest-2 hover:shadow-lift"
              >
                <BookOpen className="h-4 w-4" />
                {copy.common.openReader}
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-forest/25 px-8 text-base font-semibold text-forest transition-colors hover:border-forest/50 hover:bg-forest/5"
              >
                <Sparkles className="h-4 w-4" />
                Ver como funciona
              </Link>
              <Link
                href={liaPath}
                className="inline-flex h-14 items-center gap-2 rounded-full border border-gold/40 bg-cream/40 px-8 text-base font-semibold text-forest transition-colors hover:bg-cream"
              >
                <MessageCircle className="h-4 w-4" />
                {copy.common.talkToLia}
              </Link>
            </div>
            <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-gold" />
                8 semanas de método
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-forest-2" />
                LIA + apoio humano
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-olive" />
                Guia + Workbook premium
              </div>
            </dl>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.75rem] bg-gradient-forest opacity-[0.06] blur-2xl"
            />
            <div className="relative mx-auto flex max-w-md flex-col gap-5 rounded-[2.5rem] border border-forest/10 bg-white/85 p-8 shadow-card backdrop-blur">
              <div className="flex items-center justify-between">
                <Badge variant="gold">
                  <Star className="h-3 w-3" /> {corpoForte.seal}
                </Badge>
                <span className="text-xs text-muted">{corpoForte.duration}</span>
              </div>
              <div className="rounded-3xl border border-forest/10 bg-cream/60 p-5">
                <p className="eyebrow">Conteúdo premium</p>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-ink/85">
                  <li className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-forest" />
                    Guia Premium · 105 páginas
                  </li>
                  <li className="flex items-center gap-2">
                    <NotebookPen className="h-4 w-4 text-forest" />
                    Workbook Premium · 77 páginas
                  </li>
                  <li className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-forest" />
                    8 semanas estruturadas
                  </li>
                  <li className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-forest" />
                    LIA + check-ins semanais
                  </li>
                </ul>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                Conteúdo educativo de bem-estar. Não substitui orientação clínica
                individual — converse com a LIA ou com Ana sempre que precisar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* O que inclui */}
      <Section className="bg-cream/40">
        <SectionHeading
          align="center"
          eyebrow="O que inclui"
          title="Um programa, oito fios condutores"
          intro="Aprendizado, aplicação e continuidade — em oito blocos que se conectam ao longo das semanas, com LIA e apoio humano."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {includes.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Card className="flex h-full flex-col gap-3 p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-forest text-ivory">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-display text-lg font-medium text-ink">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Eight-week visual roadmap */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Roadmap"
          title="As oito semanas"
          intro="Um percurso calmo e estruturado — do primeiro olhar para o progresso até a continuidade depois das 8 semanas."
        />
        <WeekTimeline
          weeks={corpoForte.weeks!}
          locale={locale}
          basePath="/programas/corpo-forte"
          label="Semana"
        />
      </Section>

      {/* Como funciona */}
      <Section id="como-funciona" className="bg-cream/40">
        <SectionHeading
          align="center"
          eyebrow="Como funciona"
          title="O ciclo semanal"
          intro="Cada semana segue um mesmo ciclo — calmo, repetível e focado em observar e aplicar, não em cobrar performance."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {weeklyLoop.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.step}>
                <Card className="flex h-full flex-col gap-3 p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-forest text-ivory">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-2xl font-medium text-forest/25">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="font-display text-lg font-medium text-ink">{item.step}</p>
                  <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                </Card>
              </li>
            );
          })}
        </ol>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={readerPath}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-white shadow-soft transition-all hover:bg-forest-2 hover:shadow-lift"
          >
            <BookOpen className="h-4 w-4" />
            {copy.common.openReader}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={liaPath}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
          >
            <MessageCircle className="h-4 w-4" />
            {copy.common.talkToLia}
          </Link>
        </div>
      </Section>

      {/* Reader CTA */}
      <CTABanner
        eyebrow="Reader Corpo Forte"
        title="Abra a demonstração do Reader"
        description="Veja como o Reader apresenta o guia premium — com navegação por semanas, marcadores, zoom e atalhos para a LIA em cada tema."
        primaryLabel={copy.common.openReader}
        primaryHref={readerPath}
        secondaryLabel={copy.common.talkToLia}
        secondaryHref={liaPath}
        tone="forest"
      />
    </>
  );
}
