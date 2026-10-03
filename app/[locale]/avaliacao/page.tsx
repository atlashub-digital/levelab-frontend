import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionHeading, Section } from '@/components/ui/Section';
import { AssessmentFunnel } from '@/components/blocks/AssessmentFunnel';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Avaliação inicial',
  description:
    'Avaliação LeveLab — 7 passos curtos para sugerir o seu ponto de entrada. Sem pontuação clínica. Sem promessas de resultado.',
  alternates: { canonical: '/pt-br/avaliacao' },
  openGraph: {
    title: 'Avaliação inicial · LeveLab',
    description:
      '7 passos curtos para a LIA sugerir o ponto de entrada. Educativo, não clínico.',
    url: '/pt-br/avaliacao',
  },
};

export default async function AvaliacaoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Section className="py-16 md:py-20">
        <SectionHeading
          align="center"
          eyebrow="Avaliação inicial"
          title="Vamos entender o que faria a sua rotina ficar mais leve?"
          intro="Em poucos passos, conte o seu momento. A próxima etapa é sugerida a partir das suas respostas — sempre educativa, sem pontuação clínica, sem promessas de resultado."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <AssessmentFunnel locale={locale} />
        </div>
      </Section>
    </>
  );
}
