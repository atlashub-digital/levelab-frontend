import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, Check, Clock } from 'lucide-react';
import { OliveBranch } from '@/components/blocks/OliveBranch';
import { MethodPillars } from '@/components/home/MethodPillars';
import { LiaFeature } from '@/components/home/LiaFeature';
import { FinalCTA } from '@/components/home/FinalCTA';
import { isLocale } from '@/lib/i18n';
import { getV2Copy } from '@/lib/i18n-v2';

export const metadata: Metadata = {
  title: 'Programas',
  description:
    'Programas LeveLab: Corpo Forte (8 semanas) e Força na Caneta (7 dias), com Reader, Workbook e a LIA. Próximas jornadas: Leve 7, Reset 21, Leve 90 e Leve 365.',
  alternates: { canonical: '/pt-br/programas' },
};

const featured = [
  {
    id: 'corpo-forte',
    eyebrow: 'Programa · 8 semanas',
    title: 'Corpo Forte',
    text: 'Força, alimentação, movimento e recuperação para o corpo que você está construindo — com o Método F.O.R.T.E.',
    includes: ['Guia Premium · 105 páginas', 'Workbook · 77 páginas', 'LIA a acompanhar cada semana'],
    image: '/images/programs/corpo-forte-card.webp',
    cover: '/content/thumbs/cover-corpo-forte-guia-p001.webp',
    alt: 'Mulher sorridente ao ar livre',
  },
  {
    id: 'forca-na-caneta',
    eyebrow: 'Guia · 7 dias',
    title: 'Força na Caneta',
    text: 'Refeições pequenas, proteína e rotina para dias de pouca fome — simples, saboroso e sustentável.',
    includes: ['Guia Premium · 38 páginas', '10 receitas para repetir', 'Plano B para dias de pouca fome'],
    image: '/images/programs/forca-na-caneta-card.webp',
    cover: '/content/thumbs/cover-forca-na-caneta-p001.webp',
    alt: 'Mulher sorridente de camisa branca entre folhas',
  },
];

const roadmap = [
  { n: '7', unit: 'dias', title: 'Leve 7', text: 'Uma semana para voltar ao que importa.' },
  { n: '21', unit: 'dias', title: 'Reset 21', text: 'Três semanas para reorganizar a rotina.' },
  { n: '90', unit: 'dias', title: 'Leve 90', text: 'Três meses para construir continuidade.' },
  { n: '365', unit: 'dias', title: 'Leve 365', text: 'Um ano de constância e cuidado.' },
];

export default async function ProgramasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getV2Copy(locale);

  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <OliveBranch className="pointer-events-none absolute -left-12 -top-6 hidden h-56 w-56 text-forest lg:block" thin />
        <div className="shell-wide relative py-14 lg:py-20">
          <p className="eyebrow">Programas LeveLab</p>
          <h1 className="display-xl mt-4 max-w-3xl text-balance">
            Programas para cada momento da sua <em className="italic text-gold">jornada.</em>
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink/75">
            Percursos com método, leitura, prática e acompanhamento. Comece pela abertura gratuita de cada guia e avance
            no seu ritmo, com a LIA ao lado.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-14 lg:py-20" aria-label="Programas em destaque">
        <div className="shell-wide grid gap-8 lg:grid-cols-2">
          {featured.map((p) => (
            <article key={p.id} className="group grid overflow-hidden rounded-lg bg-paper ring-1 ring-line sm:grid-cols-[1fr_0.85fr]">
              <div className="flex flex-col p-7 sm:p-8">
                <p className="font-display text-base italic text-gold">{p.eyebrow}</p>
                <h2 className="mt-1 font-display text-[2.6rem] leading-none text-ink">{p.title}</h2>
                <p className="mt-4 text-[14.5px] leading-relaxed text-ink/75">{p.text}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink/80">
                  {p.includes.map((line) => (
                    <li key={line} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" /> {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  <Link
                    href={`/${locale}/programas/${p.id}`}
                    className="inline-flex h-11 items-center gap-2 rounded-md bg-forest px-5 text-sm font-semibold text-ivory hover:bg-forest-2"
                  >
                    Conhecer o programa <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${locale}/programas/${p.id}/reader`}
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-forest/30 px-5 text-sm font-semibold text-forest hover:border-forest"
                  >
                    <BookOpen className="h-4 w-4" /> Ler a abertura
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[16rem]">
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 22vw, 90vw" className="object-cover object-[50%_30%] transition-transform duration-700 group-hover:scale-[1.03]" />
                <div aria-hidden className="absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r from-paper to-transparent sm:block" />
                <div className="absolute bottom-5 right-5 h-32 w-[5.6rem] rotate-3 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.5)]">
                  <Image src={p.cover} alt="" fill sizes="90px" className="rounded-[2px] object-cover" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper py-14 lg:py-20" aria-labelledby="proximas">
        <div className="shell-wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Em preparação
              </p>
              <h2 id="proximas" className="display-lg mt-2">Próximas jornadas.</h2>
            </div>
            <p className="max-w-md text-sm text-ink/65">
              Do primeiro passo à continuidade de um ano. Avisamos quando cada jornada abrir.
            </p>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((r) => (
              <li key={r.title} className="bg-ivory p-7">
                <p className="font-display leading-none text-gold">
                  <span className="text-[4rem]">{r.n}</span> <span className="text-xl italic">{r.unit}</span>
                </p>
                <h3 className="mt-4 font-display text-[1.6rem] text-ink">{r.title}</h3>
                <p className="mt-1 text-sm text-ink/65">{r.text}</p>
                <span className="mt-5 inline-flex rounded-full bg-sage/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-forest">
                  Em breve
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <MethodPillars copy={copy} />
      <LiaFeature locale={locale} copy={copy} />
      <FinalCTA
        locale={locale}
        title="Encontre o seu ponto de partida."
        lead="Uma avaliação curta ajuda a escolher o programa certo para este momento."
        primary="Começar avaliação"
        secondary="Conversar com a LIA"
      />
    </>
  );
}
