import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BookOpen, Crown } from 'lucide-react';
import { CatalogHero } from '@/components/catalog/CatalogHero';
import { ContentCard } from '@/components/catalog/ContentCard';
import { FinalCTA } from '@/components/home/FinalCTA';
import { isLocale } from '@/lib/i18n';
import { products, type ProductCategory } from '@/lib/content/store';

export const metadata: Metadata = {
  title: 'Conteúdos',
  description:
    'A biblioteca LeveLab: e-books, workbooks, guias, receitas e programas — com leitura gratuita da abertura no Reader.',
  alternates: { canonical: '/pt-br/conteudos' },
};

const groups: { title: string; lead: string; categories: ProductCategory[] }[] = [
  { title: 'Programas e jornadas', lead: 'Percursos estruturados, semana a semana.', categories: ['programas'] },
  { title: 'E-books e guias', lead: 'Leituras práticas para decisões do dia a dia.', categories: ['e-books', 'guias'] },
  { title: 'Workbooks', lead: 'Onde a leitura vira prática.', categories: ['workbooks'] },
  { title: 'Receitas', lead: 'Refeições simples e nutritivas.', categories: ['receitas'] },
  { title: 'Assinaturas', lead: 'Acesso contínuo e acompanhamento.', categories: ['assinaturas'] },
];

export default async function ConteudosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = { preview: 'Ler pré-visualização', soon: 'Em breve' };
  const readable = products.filter((p) => p.status === 'live' && p.readerPath);

  return (
    <>
      <CatalogHero
        title="Biblioteca"
        accent="LeveLab"
        lead="E-books, workbooks, guias e programas com método — para ler, aplicar e voltar sempre que precisar."
        script="Aprender. Aplicar. Evoluir."
        badge="Conhecimento que se transforma em prática."
      />

      <section className="bg-ivory py-14" aria-labelledby="ler-agora">
        <div className="shell-wide">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" /> Leitura gratuita
              </p>
              <h2 id="ler-agora" className="display-lg mt-2">Comece a ler agora.</h2>
              <p className="mt-2 max-w-xl text-ink/70">
                A capa, a abertura e o índice são livres. O guia completo abre na sua área de membros.
              </p>
            </div>
            <Link
              href={`/${locale}/loja#premium`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline hover:underline-offset-4"
            >
              <Crown className="h-4 w-4 text-gold" /> Acesso completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {readable.map((p) => (
              <li key={p.id}>
                <ContentCard product={p} locale={locale} labels={labels} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="border-t border-line bg-paper">
        {groups.map((g) => {
          const items = products.filter((p) => g.categories.includes(p.category));
          if (!items.length) return null;
          return (
            <section key={g.title} className="shell-wide border-b border-line py-12 last:border-b-0">
              <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
                <div>
                  <h2 className="font-display text-[2rem] leading-tight text-ink">{g.title}</h2>
                  <p className="mt-2 text-sm text-ink/65">{g.lead}</p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((p) => (
                    <li key={p.id}>
                      <ContentCard product={p} locale={locale} labels={labels} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <FinalCTA
        locale={locale}
        title="Leve a leitura para a prática."
        lead="A LIA ajuda a transformar cada capítulo em pequenos passos possíveis."
        primary="Começar avaliação"
        secondary="Conversar com a LIA"
      />
    </>
  );
}
