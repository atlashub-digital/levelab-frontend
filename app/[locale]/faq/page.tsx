import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, SectionHeading, Section } from '@/components/ui/Section';
import { FAQ } from '@/components/blocks/FAQ';
import { CTABanner } from '@/components/blocks/CTABanner';
import { liaFaq } from '@/lib/content/brand';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Perguntas frequentes',
  description:
    'FAQ LeveLab — sobre a marca, programas, LIA, pagamentos futuros, idiomas e limites educativos.',
  alternates: { canonical: '/pt-br/faq' },
};

const generalFaq = [
  {
    id: 'o-que-e-levelab',
    q: 'O que é a LeveLab?',
    a: 'A LeveLab é uma marca do Grupo MTX Farma dedicada a saúde, bem-estar e longevidade. Oferece acompanhamento de rotina, conteúdo educativo, programas estruturados e a LIA — assistente de bem-estar. Tudo com método e apoio humano.',
  },
  {
    id: 'programas-como-funcionam',
    q: 'Como funcionam os programas?',
    a: 'Cada programa é estruturado em semanas (Corpo Forte, 8 semanas) ou dias (Força na Caneta, 7 dias), com leitura, microaulas, exercícios, check-ins e workbook. Alguns bundles incluem acompanhamento humano e a LIA ao longo do percurso.',
  },
  {
    id: 'pagamentos-futuros',
    q: 'Quando vão existir pagamentos?',
    a: 'A LeveLab Store oficial — com checkout, meios de pagamento e acesso a entitlements — chega em breve. Por enquanto o catálogo é uma pré-visualização; pode reservar ou tirar dúvidas diretamente com a equipa.',
  },
  {
    id: 'idiomas',
    q: 'Em que idiomas a LeveLab está disponível?',
    a: 'O português do Brasil é o idioma principal de conteúdo editorial e da LIA. Outros idiomas (PT-PT, EN, ES) serão adicionados progressivamente — a interface já está preparada para suportá-los.',
  },
  {
    id: 'limites-educativos',
    q: 'A LeveLab dá conselhos médicos?',
    a: 'Não. Todo o conteúdo LeveLab é educativo e de bem-estar. Não substitui acompanhamento clínico, diagnóstico ou prescrição. Para decisões de saúde, procure um profissional de saúde.',
  },
];

export default async function FaqPage({
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
          eyebrow="FAQ"
          title="Perguntas frequentes"
          intro="O essencial sobre a LeveLab, os programas, a LIA, pagamentos futuros, idiomas e os limites educativos do nosso conteúdo."
        />
      </Section>

      <FAQ
        eyebrow="Sobre a LeveLab"
        title="Perguntas gerais"
        intro="Sobre a marca, programas, pagamentos e idiomas."
        items={generalFaq}
      />

      <FAQ
        eyebrow="LIA"
        title="Perguntas sobre a LIA"
        intro="A assistente de bem-estar da LeveLab — o que é, o que não faz, privacidade e limites."
        items={liaFaq}
      />

      <CTABanner
        eyebrow="Ainda com dúvidas?"
        title="Fale com a Ana ou com a LIA"
        description="A Ana responde a dúvidas comerciais; a LIA conversa sobre rotina, alimentação, movimento e hábitos."
        primaryLabel="Ir para contacto"
        primaryHref={`/${locale}/contato`}
        secondaryLabel="Conversar com a LIA"
        secondaryHref={`/${locale}/lia`}
        tone="forest"
      />
    </>
  );
}
