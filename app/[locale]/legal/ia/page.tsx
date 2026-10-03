import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Bot } from 'lucide-react';
import { SectionHeading, Section } from '@/components/ui/Section';
import { CTABanner } from '@/components/blocks/CTABanner';
import { LegalProse, LegalRevisionNote } from '@/components/blocks/LegalProse';
import { siteConfig } from '@/config/site';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Transparência em IA',
  description:
    'Transparência em IA da LeveLab — a LIA é uma assistente virtual baseada em IA; limites, privacidade e identificação.',
  alternates: { canonical: '/pt-br/legal/ia' },
};

export default async function IaPage({
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
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-medium text-ink">
              A LIA é uma assistente virtual baseada em IA.
            </p>
            <p className="mt-1 text-sm text-muted">
              Sempre identificada. Educativa. Nunca clínica.
            </p>
          </div>
        </div>
      </div>

      <Section className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Legal"
          title="Transparência em IA"
          intro="Esta página explica, em linguagem simples, o que a LIA é, o que faz e os limites que respeita."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <LegalProse>
            <h2>1. O que é a LIA</h2>
            <p>
              A LIA é uma <strong>assistente virtual de bem-estar</strong> da
              LeveLab, baseada em inteligência artificial. Conversa sobre
              rotina, alimentação, movimento, sono e hábitos — com tom calmo,
              prático e educativo.
            </p>

            <h2>2. Como se identifica</h2>
            <p>
              A LIA é <strong>sempre apresentada como IA</strong>. Não
              simula ser humana, não assume papel de profissional de saúde,
              não usa nome ou biografia de pessoas reais. A imagem pública
              da LIA é um avatar de marca — não um rosto humano inventado.
            </p>

            <h2>3. O que NÃO faz</h2>
            <ul>
              <li>· Não faz diagnóstico clínico.</li>
              <li>· Não prescreve medicamentos, suplementos ou dietas.</li>
              <li>· Não substitui acompanhamento humano ou clínico.</li>
              <li>· Não promete resultados de saúde.</li>
              <li>· Não decide por si — apenas sugere caminhos educativos.</li>
            </ul>

            <h2>4. Limites técnicos</h2>
            <p>
              Como todo o sistema de IA, a LIA pode cometer erros, gerar
              respostas imperfeitas ou sugerir caminhos que não se aplicam ao
              seu caso. As suas respostas não devem ser tratadas como verdade
              final. Use o bom senso e, em caso de dúvida, pergunte à equipe
              humana ou a um profissional de saúde.
            </p>

            <h2>5. Privacidade</h2>
            <p>
              Em modo público, a LIA tem memória curta e não guarda dados
              sensíveis no navegador. A persistência de conta, conversa e
              progresso chega numa próxima fase, sempre com a sua autorização
              — e explicada de forma clara.
            </p>

            <h2>6. Apoio humano</h2>
            <p>
              Sempre que precisar, pode continuar a conversa com a equipe
              humana da LeveLab (Ana Gomes, gestão comercial) ouvirá a sua
              dúvida e indicará o caminho seguinte.
            </p>

            <LegalRevisionNote />
          </LegalProse>

          <aside className="lg:border-l lg:border-forest/10 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
              Em resumo
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              <li>· LIA = IA, sempre identificada</li>
              <li>· Educativa, não clínica</li>
              <li>· Sem prescrição</li>
              <li>· Memória curta em modo público</li>
              <li>· Apoio humano disponível</li>
            </ul>
            <div className="mt-6 rounded-2xl border border-forest/10 bg-cream/40 p-4 text-xs text-muted">
              <p>
                <strong>{siteConfig.name}</strong> · marca do {siteConfig.group}.
              </p>
              <p className="mt-1">
                {siteConfig.liaLaunchLabel}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <CTABanner
        eyebrow="Continuar"
        title="Conhecer a LIA"
        description="Converse com a LIA no modo visitante — sem compromisso, sem dados sensíveis guardados."
        primaryLabel="Ir para a LIA"
        primaryHref={`/${locale}/lia`}
        secondaryLabel="Aviso de saúde"
        secondaryHref={`/${locale}/legal/saude`}
        tone="forest"
      />
    </>
  );
}
