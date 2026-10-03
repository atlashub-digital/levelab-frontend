import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CatalogHero } from '@/components/catalog/CatalogHero';
import { CatalogBrowser } from '@/components/catalog/CatalogBrowser';
import { PremiumFeature } from '@/components/catalog/PremiumFeature';
import { FAQ } from '@/components/blocks/FAQ';
import { FinalCTA } from '@/components/home/FinalCTA';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Conteúdos e Loja',
  description:
    'Programas, guias, e-books e workbooks LeveLab — com pré-visualização gratuita no Reader e acompanhamento da LIA.',
  alternates: { canonical: '/pt-br/loja' },
};

const storeFaq = [
  {
    id: 'como-comprar',
    q: 'Como tenho acesso a um conteúdo?',
    a: 'Fale conosco pelo WhatsApp: liberamos o acesso no seu e-mail e você começa a ler no Reader, na sua área de membros. A compra online direta chega em breve.',
  },
  {
    id: 'previa',
    q: 'Posso ver antes de decidir?',
    a: 'Sim. Corpo Forte, o seu Workbook e Força na Caneta têm a capa, a abertura e o índice livres no Reader.',
  },
  {
    id: 'em-breve',
    q: 'O que significa “Em breve”?',
    a: 'São conteúdos em preparação. Só aparecem como disponíveis quando pode realmente acessá-los.',
  },
  {
    id: 'educativo',
    q: 'Os conteúdos substituem acompanhamento profissional?',
    a: 'Não. Todos os conteúdos LeveLab são educativos e de bem-estar: não substituem consulta, diagnóstico ou prescrição.',
  },
];

export default async function LojaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <CatalogHero
        title="Conteúdos e"
        accent="Loja"
        lead="Conhecimento, ferramentas e programas para uma vida mais leve, saudável e com mais sentido — com a metodologia LeveLab."
        script="Mais conhecimento. Mais escolhas. Mais vida."
        badge="Aprenda, aplique e transforme."
      />
      <div className="pt-8">
        <PremiumFeature />
      </div>
      <CatalogBrowser locale={locale} />
      <FAQ
        eyebrow="Perguntas frequentes"
        title="Sobre a loja"
        intro="O essencial sobre acesso, pré-visualizações e limites educativos."
        items={storeFaq}
      />
      <FinalCTA
        locale={locale}
        title="Não sabe por onde começar?"
        lead="Uma avaliação curta ou uma conversa com a LIA ajudam a encontrar o ponto de partida certo."
        primary="Começar avaliação"
        secondary="Conversar com a LIA"
      />
    </>
  );
}
