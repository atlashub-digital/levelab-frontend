import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionHeading, Section } from '@/components/ui/Section';
import { CTABanner } from '@/components/blocks/CTABanner';
import { LegalProse, LegalRevisionNote } from '@/components/blocks/LegalProse';
import { siteConfig } from '@/config/site';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description:
    'Política de Cookies da LeveLab — tipos, finalidade, armazenamento local e como gerir preferências.',
  alternates: { canonical: '/pt-br/legal/cookies' },
};

export default async function CookiesPage({
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
          title="Política de Cookies"
          intro="A LeveLab usa o mínimo necessário de armazenamento local. Sem rastreamento comercial intrusivo, sem dados sensíveis."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <LegalProse>
            <h2>1. O que são cookies e armazenamento local</h2>
            <p>
              Cookies são pequenos ficheiros guardados no seu navegador.
              Armazenamento local (como <code>localStorage</code>) funciona
              de forma semelhante, mas é controlado por páginas do site. A
              LeveLab usa sobretudo armazenamento local para preferências
              simples e atribuição de campanha.
            </p>

            <h2>2. O que usamos</h2>
            <ul>
              <li>
                <strong>Preferências</strong> — idioma e tema, por exemplo,
                para que o site se lembre da sua escolha.
              </li>
              <li>
                <strong>Atribuição (UTM)</strong> — parâmetros não-sensíveis
                de origem/campanha, guardados em{' '}
                <code>levelab.attribution</code> para entender como chegou
                até nós.
              </li>
              <li>
                <strong>LIA — modo visitante</strong> — memória curta apenas,
                sem dados sensíveis guardados no navegador.
              </li>
            </ul>

            <h2>3. O que NÃO usamos</h2>
            <ul>
              <li>· Cookies publicitários de terceiros.</li>
              <li>· Rastreamento entre sites.</li>
              <li>· Perfilamento comercial intrusivo.</li>
              <li>· Quaisquer dados clínicos ou de saúde.</li>
            </ul>

            <h2>4. Gerir preferências</h2>
            <p>
              Pode limpar o armazenamento local nas definições do seu
              navegador. A LeveLab continuará a funcionar — apenas perdendo as
              preferências locais.
            </p>

            <LegalRevisionNote />
          </LegalProse>

          <aside className="lg:border-l lg:border-forest/10 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
              Em resumo
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              <li>· Apenas armazenamento local mínimo</li>
              <li>· Preferências de idioma/tema</li>
              <li>· Atribuição UTM não-sensível</li>
              <li>· Sem cookies de terceiros</li>
              <li>· Sem dados de saúde</li>
            </ul>
            <div className="mt-6 rounded-2xl border border-forest/10 bg-cream/40 p-4 text-xs text-muted">
              <p>
                <strong>{siteConfig.name}</strong> · marca do {siteConfig.group}.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <CTABanner
        eyebrow="Privacidade"
        title="Questões sobre dados?"
        description="Consulte a Política de Privacidade ou fale com a equipe."
        primaryLabel="Política de privacidade"
        primaryHref={`/${locale}/legal/privacidade`}
        secondaryLabel="Ir para contacto"
        secondaryHref={`/${locale}/contato`}
        tone="light"
      />
    </>
  );
}
