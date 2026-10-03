import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionHeading, Section } from '@/components/ui/Section';
import { CTABanner } from '@/components/blocks/CTABanner';
import { LegalProse, LegalRevisionNote } from '@/components/blocks/LegalProse';
import { legalConfig } from '@/config/legal';
import { siteConfig } from '@/config/site';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Termos de Uso da LeveLab — aceitação, natureza educativa do conteúdo, limites de responsabilidade, propriedade e regras de uso.',
  alternates: { canonical: '/pt-br/legal/termos' },
};

export default async function TermosPage({
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
          eyebrow="Legal"
          title="Termos de Uso"
          intro="Estes termos explicam como pode usar o site e os conteúdos LeveLab. São claros, calmos e sem letras miúdas escondidas."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <LegalProse>
            <h2>1. Aceitação</h2>
            <p>
              Ao usar este site, aceita os presentes termos. Se não concordar,
              por favor não utilize os serviços. Sempre que houver alterações
              materiais, iremos avisar com clareza.
            </p>

            <h2>2. Natureza do conteúdo</h2>
            <p>
              Todo o conteúdo LeveLab — incluindo programas, guias, e-books,
              workbooks, receitas, assinaturas e a LIA — é{' '}
              <strong>educativo e de bem-estar</strong>. Não constitui
              aconselhamento médico, diagnóstico, prescrição ou tratamento.
              Para decisões de saúde, consulte um profissional de saúde.
            </p>

            <h2>3. A LIA</h2>
            <p>
              A LIA é uma <strong>assistente virtual de bem-estar</strong>{' '}
              baseada em inteligência artificial. Conversa sobre rotina,
              alimentação, movimento, sono e hábitos, mas{' '}
              <strong>não substitui</strong> acompanhamento humano ou clínico.
              Em modo público, tem memória curta e não guarda dados sensíveis.
            </p>

            <h2>4. Limites de responsabilidade</h2>
            <p>
              A LeveLab não se responsabiliza por decisões tomadas com base
              apenas no conteúdo educativo. As informações são oferecidas de
              boa-fé, mas cada usuário é responsável pelas próprias
              escolhas de saúde e bem-estar.
            </p>

            <h2>5. Propriedade</h2>
            <p>
              Marcas, textos, design e conteúdo pertencem à LeveLab (ou ao{' '}
              {siteConfig.group}) e estão protegidos. Não pode copiar,
              reproduzir ou explorar comercialmente sem autorização expressa.
            </p>

            <h2>6. Pagamentos e acesso</h2>
            <p>
              A LeveLab Store oficial — com checkout, pagamentos e acesso a
              entitlements — ainda não está ativa. Quando estiver, regras
              adicionais de compra, reembolso e cancelamento serão publicadas
              e ligadas a esta página.
            </p>

            <h2>7. Alterações</h2>
            <p>
              Podemos atualizar estes termos. A versão em vigor é sempre a
              publicada nesta página, com a data de revisão visível.
            </p>

            <LegalRevisionNote />
          </LegalProse>

          <aside className="lg:border-l lg:border-forest/10 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
              Em resumo
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              <li>· Conteúdo educativo, não clínico</li>
              <li>· LIA = assistente virtual de IA</li>
              <li>· Sem promessas de resultado</li>
              <li>· Loja oficial ainda em breve</li>
              <li>· Decisões de saúde: profissional</li>
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
        eyebrow="Continuar"
        title="Pronto para começar?"
        description="Comece pela avaliação ou pela conversa com a LIA — sem compromisso."
        primaryLabel="Começar avaliação"
        primaryHref={`/${locale}/avaliacao`}
        secondaryLabel="Aviso de saúde"
        secondaryHref={`/${locale}/legal/saude`}
        tone="light"
      />
    </>
  );
}
