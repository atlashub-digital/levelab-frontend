import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Accessibility } from 'lucide-react';
import { SectionHeading, Section } from '@/components/ui/Section';
import { CTABanner } from '@/components/blocks/CTABanner';
import { LegalProse, LegalRevisionNote } from '@/components/blocks/LegalProse';
import { siteConfig } from '@/config/site';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Acessibilidade',
  description:
    'Compromisso de acessibilidade da LeveLab — princípios, navegação por teclado, contraste, leitores de tela e como reportar barreiras.',
  alternates: { canonical: '/pt-br/acessibilidade' },
};

export default async function AcessibilidadePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      {/* Hero banner */}
      <div className="border-b border-gold/30 bg-cream/60">
        <div className="shell flex items-start gap-4 py-6 md:py-8">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-ink">
            <Accessibility className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-medium text-ink">
              A LeveLab quer ser para todas as pessoas.
            </p>
            <p className="mt-1 text-sm text-muted">
              Trabalhamos por uma web calma, legível e navegável — incluindo
              para quem usa tecnologias de apoio.
            </p>
          </div>
        </div>
      </div>

      <Section className="py-16 md:py-20">
        <SectionHeading
          eyebrow="Compromisso"
          title="Acessibilidade na LeveLab"
          intro="Esta página explica o nosso compromisso, o que já está implementado e como reportar barreiras."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
          <LegalProse>
            <h2>1. Princípios</h2>
            <p>
              Buscamos seguir as diretrizes WCAG (Web Content Accessibility
              Guidelines) no nível AA como referência. Acessibilidade é um
              processo contínuo — melhoramos a cada versão.
            </p>

            <h2>2. O que já está implementado</h2>
            <ul>
              <li>· Navegação completa por teclado (Tab, Enter, Esc).</li>
              <li>· Foco visível em elementos interativos.</li>
              <li>· Contraste de texto adequado em modo claro.</li>
              <li>· Tipografia legível (Inter para corpo, Fraunces para títulos).</li>
              <li>· HTML semântico (<code>main</code>, <code>nav</code>, <code>section</code>).</li>
              <li>· Imagens com texto alternativo (ou marcadas como decorativas).</li>
              <li>· Respeito a <code>prefers-reduced-motion</code>.</li>
              <li>· Suporte a 4 idiomas (PT-BR, PT-PT, EN, ES).</li>
            </ul>

            <h2>3. O que está em curso</h2>
            <ul>
              <li>· Modo escuro polido (a definir).</li>
              <li>· Mais opções de tamanho de texto.</li>
              <li>· Legendas/transcrições em futuros conteúdos em vídeo/áudio.</li>
              <li>· Refinamento de navegação em leitores de tela.</li>
            </ul>

            <h2>4. Como reportar barreiras</h2>
            <p>
              Encontrou uma barreira? Por favor, descreva o que aconteceu
              (página, dispositivo, leitor de tela, se aplicável) e envie pelo
              canal de contacto. Lemos cada relato e trabalhamos para corrigir.
            </p>

            <LegalRevisionNote />
          </LegalProse>

          <aside className="lg:border-l lg:border-forest/10 lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
              Em resumo
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-muted">
              <li>· WCAG AA como referência</li>
              <li>· Navegação por teclado</li>
              <li>· Foco visível</li>
              <li>· HTML semântico</li>
              <li>· 4 idiomas</li>
              <li>· reduced-motion respeitado</li>
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
        eyebrow="Encontrou uma barreira?"
        title="Reporte — lemos cada relato"
        description="A sua ajuda torna a LeveLab mais acessível para todas as pessoas."
        primaryLabel="Ir para contacto"
        primaryHref={`/${locale}/contato`}
        secondaryLabel="Voltar ao início"
        secondaryHref={`/${locale}`}
        tone="forest"
      />
    </>
  );
}
