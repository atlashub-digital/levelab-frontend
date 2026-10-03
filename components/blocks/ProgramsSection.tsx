import { ProgramCard, type ProgramCardItem } from '@/components/blocks/ProgramCard';
import { SectionHeading } from '@/components/ui/Section';
import type { LocaleCopy } from '@/lib/i18n';

const items: ProgramCardItem[] = [
  {
    name: 'Corpo Forte',
    duration: '8 semanas',
    tagline: 'Corpo Forte não é um tipo de corpo. É uma capacidade.',
    description: 'Programa interativo de 8 semanas com aprendizado, aplicação e progresso.',
    path: '/programas/corpo-forte',
    accent: 'forest',
    badge: 'Premium',
    kind: 'Programa',
  },
  {
    name: 'Força na Caneta',
    duration: '7 dias',
    tagline: 'Olhar para o apetite com clareza — um guia educativo e calmo.',
    description: 'Guia educativo de 7 dias sobre apetite e organização das refeições.',
    path: '/programas/forca-na-caneta',
    accent: 'olive',
    badge: 'Novo',
    kind: 'Guia',
  },
  {
    name: 'Acompanhamento 8 Semanas',
    duration: '8 semanas',
    tagline: 'Programa + LIA e acompanhamento humano ao longo do percurso.',
    description: 'Corpo Forte com acompanhamento estendido, LIA e apoio da equipa.',
    path: '/programas/corpo-forte',
    accent: 'gold',
    badge: 'Premium',
    kind: 'Acompanhamento',
  },
  {
    name: 'LIA',
    duration: 'no seu dia',
    tagline: 'A tua companheira de conversas para um bem-estar real e duradouro.',
    description: 'Assistente de bem-estar: rotina, alimentação, movimento e hábitos.',
    path: '/lia',
    accent: 'sage',
    kind: 'Assistente',
  },
];

export function ProgramsSection({ locale, copy }: { locale: string; copy: LocaleCopy }) {
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Programas"
          title="Escolha o seu próximo passo"
          intro="Cada programa é educativo, calmo e estruturado — com LIA e apoio humano do lado de cá."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ProgramCard key={item.name} item={item} locale={locale} copy={copy} />
          ))}
        </div>
      </div>
    </section>
  );
}
