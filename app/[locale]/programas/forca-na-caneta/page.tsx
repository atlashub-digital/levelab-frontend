import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Sparkles,
  MessageCircle,
  BookOpen,
  Salad,
  CalendarHeart,
  Compass,
  ClipboardCheck,
  Repeat,
  Star,
} from 'lucide-react';
import { forcaNaCaneta } from '@/lib/content/programs';
import { WeekTimeline } from '@/components/blocks/WeekTimeline';
import { CTABanner } from '@/components/blocks/CTABanner';
import { Badge, Card } from '@/components/ui/Card';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getLocaleCopy, isLocale } from '@/lib/i18n';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Força na Caneta · LeveLab',
  description:
    'Guia educativo LeveLab de 7 dias sobre apetite, organização das refeições e escolhas. Educativo, não prescritivo — com LIA e apoio humano.',
  alternates: { canonical: '/pt-br/programas/forca-na-caneta' },
  openGraph: {
    title: 'Força na Caneta · LeveLab',
    description:
      'Guia educativo de 7 dias — apetite e organização das refeições, com LIA e apoio humano.',
    url: `${siteConfig.url}/pt-br/programas/forca-na-caneta`,
  },
};

const positioning = [
  {
    icon: BookOpen,
    title: 'Guia educativo',
    description:
      'Um guia LeveLab para olhar o apetite com clareza — não um protocolo clínico, não uma receita.',
  },
  {
    icon: CalendarHeart,
    title: 'Prático, 7 dias',
    description:
      'Sete dias curtos e calmos — cada um com um pequeno experimento possível de aplicar.',
  },
  {
    icon: Salad,
    title: 'Apetite e refeições',
    description:
      'Foco em organizar refeições e observar o apetite — sem culpa, sem prescrição clínica.',
  },
  {
    icon: Compass,
    title: 'Educativo, não prescritivo',
    description:
      'O guia educa e organiza. Não substitui orientação clínica individual nem indica medicação.',
  },
];

export default async function ForcaNaCanetaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);
  const readerPath = `/${locale}/programas/forca-na-caneta/reader`;
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
              Guia Educativo · 7 Dias
            </span>
            <h1 className="mt-4 text-balance font-display text-[clamp(2.6rem,6vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.03em] text-ink">
              Força na Caneta
            </h1>
            <p className="mt-5 max-w-xl font-display text-pretty text-[clamp(1.2rem,2.2vw,1.6rem)] italic leading-snug text-forest-2">
              {forcaNaCaneta.tagline}
            </p>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              {forcaNaCaneta.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={readerPath}
                className="inline-flex h-14 items-center gap-2 rounded-full bg-forest px-8 text-base font-semibold text-white shadow-soft transition-all hover:bg-forest-2 hover:shadow-lift"
              >
                <BookOpen className="h-4 w-4" />
                Abrir Reader
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
                7 dias · 38 páginas
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-forest-2" />
                LIA + apoio humano
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-olive" />
                Educativo, não prescritivo
              </div>
            </dl>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.75rem] bg-gradient-gold opacity-[0.14] blur-2xl"
            />
            <div className="relative mx-auto flex max-w-md flex-col gap-5 rounded-[2.5rem] border border-forest/10 bg-white/85 p-8 shadow-card backdrop-blur">
              <div className="flex items-center justify-between">
                <Badge variant="gold">
                  <Star className="h-3 w-3" /> {forcaNaCaneta.seal}
                </Badge>
                <span className="text-xs text-muted">{forcaNaCaneta.duration}</span>
              </div>
              <div className="rounded-3xl border border-forest/10 bg-cream/60 p-5">
                <p className="eyebrow">O que você encontra</p>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-ink/85">
                  <li className="flex items-center gap-2">
                    <Compass className="h-4 w-4 text-forest" />
                    Observação do apetite ao longo do dia
                  </li>
                  <li className="flex items-center gap-2">
                    <Salad className="h-4 w-4 text-forest" />
                    Uma estrutura simples para o prato
                  </li>
                  <li className="flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-forest" />
                    Diferenças entre fome, vontade e escolha
                  </li>
                  <li className="flex items-center gap-2">
                    <Repeat className="h-4 w-4 text-forest" />
                    Continuidade para depois dos 7 dias
                  </li>
                </ul>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                Guia educativo de bem-estar. Não substitui orientação clínica
                individual e não indica nem anuncia medicação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posicionamento */}
      <Section className="bg-cream/40">
        <SectionHeading
          align="center"
          eyebrow="Posicionamento"
          title="O que este guia é — e o que não é"
          intro="Um guia educativo e calmo, focado em observar e organizar — não em prescrever, prometer ou substituir acompanhamento profissional."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {positioning.map((item) => {
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
        <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-forest/10 bg-white p-5 text-sm text-muted">
          <p>
            <span className="font-semibold text-forest">Aviso educativo:</span> o
            conteúdo do guia é de bem-estar e organização de rotina. Não oferece
            diagnóstico, não indica medicação e não promete perda de peso. Para
            decisões clínicas, converse com Ana ou com o profissional de saúde
            responsável.
          </p>
        </div>
      </Section>

      {/* 7-day roadmap */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Roadmap"
          title="Os sete dias"
          intro="Um percurso curto e calmo — do primeiro olhar para o apetite até a continuidade no dia a dia."
        />
        <WeekTimeline
          weeks={forcaNaCaneta.days!}
          locale={locale}
          basePath="/programas/forca-na-caneta"
          label="Dia"
        />
      </Section>

      {/* Reader CTA */}
      <CTABanner
        eyebrow="Reader Força na Caneta"
        title="Abra o Reader do guia"
        description="Veja como o Reader apresenta o guia premium — navegação por dia, marcadores, zoom e atalhos para a LIA em cada tema."
        primaryLabel="Abrir Reader"
        primaryHref={readerPath}
        secondaryLabel={copy.common.talkToLia}
        secondaryHref={liaPath}
        tone="gold"
      />
    </>
  );
}
