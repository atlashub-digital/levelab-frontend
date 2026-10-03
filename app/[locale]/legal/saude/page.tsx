import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { SectionHeading, Section } from '@/components/ui/Section';
import { CTABanner } from '@/components/blocks/CTABanner';
import { LegalProse, LegalRevisionNote } from '@/components/blocks/LegalProse';
import { legalConfig } from '@/config/legal';
import { siteConfig } from '@/config/site';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Aviso de Saúde',
  description:
    'Aviso de saúde da LeveLab — conteúdo educativo, não substitui acompanhamento clínico, diagnóstico ou prescrição.',
  alternates: { canonical: '/pt-br/legal/saude' },
};

export default async function SaudePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      {/* Hero / disclaimer banner */}
      <div className="border-b border-gold/30 bg-cream/60">
        <div className="shell flex items-start gap-4 py-6 md:py-8">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-ink">
            <ShieldAlert className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-medium text-ink">
              Conteúdo educativo — não conselho médico.
            </p>
            <p className="mt-1 text-sm text-muted">
              A LeveLab não faz diagnóstico, prescrição ou tratamento. Para
              decisões de saúde, consulte um profissional de saúde.
            </p>
          </div>
        </div>
      </div>

      <Section className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Legal"
          title="Aviso de Saúde"
          intro="Ler com calma. Este aviso explica, em linguagem simples, o que o conteúdo LeveLab é — e o que não é."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <LegalProse>
            <h2>1. Natureza educativa</h2>
            <p>
              Todos os conteúdos da LeveLab — programas, guias, e-books,
              workbooks, receitas, assinaturas, conversas com a LIA e qualquer
              material editorial — são{' '}
              <strong>estritamente educativos e de bem-estar</strong>.
            </p>

            <h2>2. O que NÃO é</h2>
            <ul>
              <li>
                <strong>Não é diagnóstico.</strong> A LeveLab não identifica
                doenças, condições ou transtornos.
              </li>
              <li>
                <strong>Não é prescrição.</strong> A LeveLab não receita
                medicamentos, suplementos, dietas ou protocolos clínicos.
              </li>
              <li>
                <strong>Não é tratamento.</strong> A LeveLab não substitui
                acompanhamento médico, psicológico, nutricional ou de
                fisioterapia.
              </li>
              <li>
                <strong>Não é promessa de resultado.</strong> Não prometemos
                perda de peso, ganho de massa, cura ou qualquer desfecho
                clínico específico.
              </li>
            </ul>

            <h2>3. A LIA</h2>
            <p>
              A LIA é uma <strong>assistente virtual de bem-estar</strong>{' '}
              baseada em inteligência artificial. Conversa sobre rotina,
              alimentação, movimento, sono e hábitos. Não fornece diagnóstico
              nem prescrição. Para dúvidas clínicas, procure um profissional
              de saúde.
            </p>

            <h2>4. Quando consultar um profissional</h2>
            <p>
              Procure sempre um profissional de saúde para: avaliação clínica,
              diagnóstico, prescrição, dúvidas sobre medicamentos, condições de
              saúde pré-existentes, gravidez, amamentação, ou qualquer
              preocupação clínica aguda ou crónica.
            </p>

            {legalConfig.healthResponsibleName ? (
              <p>
                <strong>Responsável técnico de saúde:</strong>{' '}
                {legalConfig.healthResponsibleName}
                {legalConfig.healthResponsibleRegistration
                  ? ` · registro ${legalConfig.healthResponsibleRegistration}`
                  : ''}
              </p>
            ) : (
              <p>
                <strong>Responsável técnico de saúde:</strong> a ser publicado
                aqui assim que configurado. A LeveLab não inventa credenciais.
              </p>
            )}

            <LegalRevisionNote />
          </LegalProse>

          <aside className="lg:border-l lg:border-forest/10 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
              Em resumo
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              <li>· Educativo, não clínico</li>
              <li>· Sem diagnóstico</li>
              <li>· Sem prescrição</li>
              <li>· Sem promessa de resultado</li>
              <li>· LIA = IA, não médica</li>
            </ul>
            <div className="mt-6 rounded-2xl border border-forest/10 bg-cream/40 p-4 text-xs text-muted">
              <p>
                <strong>{siteConfig.name}</strong> · marca do {siteConfig.group}.
              </p>
              {legalConfig.legalName ? (
                <p className="mt-1">{legalConfig.legalName}</p>
              ) : null}
              {legalConfig.cnpj ? <p>CNPJ: {legalConfig.cnpj}</p> : null}
              {legalConfig.address ? <p>{legalConfig.address}</p> : null}
            </div>
          </aside>
        </div>
      </Section>

      <CTABanner
        eyebrow="Está em dúvida?"
        title="Para decisões de saúde, fale com um profissional"
        description="A LeveLab é educativa. Para diagnóstico, prescrição ou tratamento, procure acompanhamento clínico qualificado."
        primaryLabel="Ver programas educativos"
        primaryHref={`/${locale}/programas`}
        secondaryLabel="Ir para contacto"
        secondaryHref={`/${locale}/contato`}
        tone="light"
      />
    </>
  );
}
