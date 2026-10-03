import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { V2Copy } from '@/lib/i18n-v2';

type ProgramCardData = {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  image: string;
  imageAlt: string;
  meta?: string;
  soon?: boolean;
  imagePosition?: string;
};

/** "Os nossos programas" — editorial horizontal cards (Maquete Home). */
export function ProgramsRow({ locale, copy }: { locale: string; copy: V2Copy }) {
  const t = copy.home;
  const cards: ProgramCardData[] = [
    {
      eyebrow: 'Programa',
      title: 'Corpo Forte',
      text: 'Força, alimentação, movimento e recuperação para um corpo que leva você mais longe.',
      meta: '8 semanas · Guia + Workbook',
      href: `/${locale}/programas/corpo-forte`,
      image: '/images/programs/corpo-forte-card.webp',
      imageAlt: 'Mulher sorridente ao ar livre',
    },
    {
      eyebrow: 'Guia',
      title: 'Força na Caneta',
      text: 'Sete dias para mais energia, com refeições pequenas e proteína sem complicação.',
      meta: '7 dias · E-book',
      href: `/${locale}/programas/forca-na-caneta`,
      image: '/images/programs/forca-na-caneta-card.webp',
      imageAlt: 'Mulher sorridente de camisa branca entre folhas',
    },
    {
      eyebrow: 'Acompanhamento',
      title: 'Jornada 8 Semanas',
      text: 'Um programa completo com método, comunidade e suporte contínuo.',
      meta: 'Com acompanhamento',
      href: `/${locale}/programas`,
      image: '/images/programs/jornada-8-semanas-card.webp',
      imageAlt: 'Mulher de costas a contemplar as montanhas ao pôr do sol',
      soon: true,
    },
    {
      eyebrow: 'Assistente virtual',
      title: 'LIA',
      text: 'A sua aliada no dia a dia: tira dúvidas, organiza a rotina e mantém o foco.',
      meta: 'Conversa 24/7',
      href: `/${locale}/lia`,
      image: '/images/people/lia/lia-portrait.webp',
      imageAlt: 'LIA, assistente virtual LeveLab',
      imagePosition: '50% 18%',
    },
  ];

  return (
    <section className="bg-ivory py-16 lg:py-20" aria-labelledby="programas-title">
      <div className="shell-wide">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <h2 id="programas-title" className="eyebrow border-b border-forest/40 pb-1 text-ink">
              {t.programsEyebrow}
            </h2>
            <p className="font-script -rotate-2 text-[1.7rem] text-gold">{t.programsScript}</p>
          </div>
          <Link
            href={`/${locale}/programas`}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-forest underline-offset-4 hover:underline"
          >
            {t.programsAll} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative grid min-h-[12.5rem] grid-cols-[1.2fr_0.8fr] overflow-hidden rounded-lg bg-paper shadow-soft ring-1 ring-line transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="relative z-10 flex flex-col p-5">
                <p className="font-display text-[0.95rem] italic text-gold">{c.eyebrow}</p>
                <h3 className="mt-0.5 font-display text-[1.6rem] leading-[1.02] text-ink">{c.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/70">{c.text}</p>
                <p className="mt-auto pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-2">
                  {c.soon ? t.soon : c.meta}
                </p>
              </div>
              <div className="relative">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 15vw, (min-width: 768px) 25vw, 45vw"
                  className={cn('object-cover transition-transform duration-700 group-hover:scale-[1.04]', c.soon && 'grayscale-[35%]')}
                  style={{ objectPosition: c.imagePosition ?? '50% 30%' }}
                />
                <div aria-hidden className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-paper to-transparent" />
              </div>
              <span className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/95 text-forest shadow-soft transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
              {c.soon ? (
                <span className="absolute right-3 top-3 z-10 rounded-full bg-forest/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ivory">
                  {t.soon}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
