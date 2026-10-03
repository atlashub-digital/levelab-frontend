import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionHeading, Section } from '@/components/ui/Section';
import { CTABanner } from '@/components/blocks/CTABanner';
import { LegalProse, LegalRevisionNote } from '@/components/blocks/LegalProse';
import { legalConfig } from '@/config/legal';
import { siteConfig } from '@/config/site';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Política de Privacidade da LeveLab — princípios, dados recolhidos, finalidade, retenção e direitos do titular.',
  alternates: { canonical: '/pt-br/legal/privacidade' },
};

export default async function PrivacidadePage({
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
          title="Política de Privacidade"
          intro="A LeveLab trata os seus dados com cuidado. Esta política explica, em linguagem simples, o que recolhemos, para quê, durante quanto tempo e quais os seus direitos."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <LegalProse>
            <h2>1. Princípios</h2>
            <p>
              Seguimos os princípios da boa-fé, da finalidade, da adequação, da
              necessidade, do livre acesso, da qualidade, da transparência, da
              segurança e da prevenção. Não partilhamos dados sensíveis sem
              consentimento explícito.
            </p>

            <h2>2. Dados recolhidos</h2>
            <ul>
              <li>
                <strong>Dados de navegação</strong> — quando visita o site
                (tipo de dispositivo, páginas vistas, referenciador). Em modo
                público, a LIA tem memória curta e não guarda dados sensíveis.
              </li>
              <li>
                <strong>Dados comerciais</strong> — apenas os que partilha
                voluntariamente (nome, email, WhatsApp) para contacto ou
                reservas.
              </li>
              <li>
                <strong>Atribuição (UTM)</strong> — guardamos parâmetros
                não-sensíveis (origem/campanha) em armazenamento local do
                navegador, para entender como chegou à LeveLab.
              </li>
            </ul>

            <h2>3. Finalidade</h2>
            <p>
              Os dados servem para: melhorar a experiência, responder a pedidos
              comerciais, sugerir um ponto de entrada adequado e — no futuro,
              com a sua autorização — guardar progresso de programas.
            </p>

            <h2>4. Retenção</h2>
            <p>
              Dados de navegação e de atribuição são efémeros ou locais ao
              navegador. Dados comerciais são mantidos apenas pelo tempo
              necessário para responder ao pedido ou cumprir obrigação legal.
            </p>

            <h2>5. Direitos do titular</h2>
            <p>
              Pode solicitar acesso, correção, eliminação, portabilidade ou
              oposição. Use o canal de contacto da LeveLab para exercer qualquer
              direito.
            </p>

            {legalConfig.supportEmail ? (
              <p>
                <strong>Contacto:</strong>{' '}
                <a href={`mailto:${legalConfig.supportEmail}`}>
                  {legalConfig.supportEmail}
                </a>
              </p>
            ) : (
              <p>
                <strong>Contacto:</strong> o canal oficial de email será
                publicado aqui assim que configurado. Por enquanto, utilize o
                WhatsApp da LIA ou da Ana.
              </p>
            )}

            <LegalRevisionNote />
          </LegalProse>

          <aside className="lg:border-l lg:border-forest/10 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
              Resumo rápido
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              <li>· Dados de navegação efémeros</li>
              <li>· Dados comerciais voluntários</li>
              <li>· Atribuição UTM não-sensível</li>
              <li>· LIA pública: sem dados sensíveis</li>
              <li>· Direitos do titular garantidos</li>
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
        eyebrow="Dúvidas?"
        title="Fale com a equipa"
        description="Para exercer um direito ou esclarecer uma dúvida de privacidade, use o canal de contacto."
        primaryLabel="Ir para contacto"
        primaryHref={`/${locale}/contato`}
        secondaryLabel="Aviso de saúde"
        secondaryHref={`/${locale}/legal/saude`}
        tone="light"
      />
    </>
  );
}
