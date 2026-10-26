import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  NotebookPen,
  ShieldCheck,
  Leaf,
} from 'lucide-react';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Corpo Forte — Além da Balança | eBook + Workbook · LeveLab',
  description:
    'Conheça Corpo Forte — Além da Balança e o workbook O Meu Corpo em Construção. Dois materiais digitais, um único produto, oito semanas de reflexão.',
  // Publicar/indexar depois de o checkout e o Reader V3.1 passarem os gates.
  robots: { index: false, follow: false },
};

const pillars = [
  ['F', 'Força', 'Reconhecer capacidades e preservar autonomia.'],
  ['O', 'Organização', 'Encontrar espaço para escolhas possíveis na rotina.'],
  ['R', 'Recuperação', 'Dar valor ao sono, às pausas e ao descanso.'],
  ['T', 'Trajetória', 'Observar o percurso sem exigir perfeição.'],
  ['E', 'Evolução', 'Aprender, adaptar e continuar no próprio ritmo.'],
] as const;

export default async function CorpoFortePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-forest/10 bg-cream/50">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-3xl" aria-hidden />
        <div className="shell relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          <div>
            <Link href={`/${locale}/loja`} className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline">
              <ArrowLeft className="h-4 w-4" /> Voltar à loja
            </Link>
            <p className="eyebrow mt-8">EspelhoMeu Editions · Me Sentir Leve · 8 semanas</p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[1.01] text-forest">
              Corpo Forte — Além da Balança
            </h1>
            <p className="mt-6 max-w-2xl font-display text-2xl italic text-forest-2">
              Seu corpo é muito mais do que um número.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Uma leitura educativa de oito semanas sobre força, organização,
              recuperação, escolhas e continuidade. O workbook
              <strong> O Meu Corpo em Construção </strong>
              acompanha o livro integralmente — sem compra adicional.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <span className="font-display text-4xl text-forest">R$ 39,90</span>
              <span className="rounded-full border border-forest/15 bg-white px-4 py-2 text-xs font-semibold text-forest">
                Pagamento único · 2 materiais digitais
              </span>
            </div>
            <p role="status" className="mt-5 text-sm text-muted">
              Checkout PIX via ARO em preparação. A compra será disponibilizada
              após o teste do acesso completo.
            </p>
          </div>
          <div className="rounded-[2rem] border border-forest/10 bg-gradient-forest p-8 text-ivory shadow-card">
            <Leaf className="h-12 w-12 text-gold-soft" aria-hidden />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              Corpo Forte · Oferta completa
            </p>
            <div className="mt-6 flex items-start gap-3">
              <BookOpen className="mt-1 h-6 w-6 shrink-0 text-gold-soft" />
              <div>
                <h2 className="font-display text-2xl">eBook principal</h2>
                <p className="mt-1 text-sm leading-relaxed text-ivory/75">
                  Corpo Forte — Além da Balança, Método F.O.R.T.E. em oito semanas.
                </p>
              </div>
            </div>
            <div className="mt-7 flex items-start gap-3 border-t border-white/15 pt-7">
              <NotebookPen className="mt-1 h-6 w-6 shrink-0 text-gold-soft" />
              <div>
                <h2 className="font-display text-2xl">Workbook incluído</h2>
                <p className="mt-1 text-sm leading-relaxed text-ivory/75">
                  O Meu Corpo em Construção, com exercícios e páginas de reflexão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <p className="eyebrow">Método F.O.R.T.E.</p>
        <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
          Cinco pilares para uma leitura que acompanha a vida real.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map(([letter, title, description]) => (
            <article key={letter} className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft">
              <span className="font-display text-4xl text-gold">{letter}</span>
              <h3 className="mt-3 font-display text-xl text-forest">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream/40">
        <div className="shell py-14">
          <div className="flex items-start gap-3 rounded-3xl border border-forest/10 bg-white p-6 sm:p-8">
            <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-forest" />
            <div>
              <h2 className="font-display text-2xl text-ink">Cuidado responsável</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Conteúdo digital educativo. Não é programa de exercício
                individualizado, dieta prescrita nem acompanhamento clínico.
                A leitura e as atividades são opcionais; decisões relacionadas
                com a saúde devem ser acompanhadas por profissionais habilitados.
                A assinatura LIA+ não integra esta compra.
              </p>
              <Link href={`/${locale}/loja`} className="mt-5 inline-flex items-center gap-2 font-semibold text-forest hover:underline">
                Explorar a biblioteca <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
