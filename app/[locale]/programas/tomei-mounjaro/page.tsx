import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, Leaf, ShieldCheck } from 'lucide-react';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Tomei Mounjaro. E Agora? | Me Sentir Leve · LeveLab',
  description:
    'Conheça o eBook educativo independente Tomei Mounjaro. E Agora?: informação, segurança, força e continuidade. Não é aconselhamento médico.',
  // Esta rota não deve receber tráfego de aquisição antes da liberação do checkout.
  robots: { index: false, follow: false },
};

const topics = [
  {
    title: 'Entender o contexto',
    description: 'Expectativas, perguntas e fontes de informação para ler com espírito crítico.',
  },
  {
    title: 'Cuidar do quotidiano',
    description: 'Reflexões sobre rotina, alimentação geral, movimento e recuperação.',
  },
  {
    title: 'Conversar com profissionais',
    description: 'Como organizar dúvidas e observações para levar à equipa de saúde.',
  },
];

/** Landing editorial V2. Checkout e acesso ficam desligados até à homologação ARO. */
export default async function TomeiMounjaroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-forest/10 bg-cream/50">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-sage/30 blur-3xl" aria-hidden />
        <div className="shell relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Link href={`/${locale}/loja`} className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline">
              <ArrowLeft className="h-4 w-4" /> Voltar à biblioteca
            </Link>
            <p className="eyebrow mt-8">EspelhoMeu Editions · Coleção Me Sentir Leve</p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-forest">
              Tomei Mounjaro. E Agora?
            </h1>
            <p className="mt-6 font-display text-2xl italic text-forest-2">
              O peso pode mudar. Mas como cuidar de tudo o resto?
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Uma leitura educativa independente sobre informação, segurança,
              rotina, força e continuidade durante um tratamento acompanhado
              por profissionais de saúde.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-forest/15 bg-white/80 px-5 py-4 text-sm text-forest">
              <BookOpen className="h-5 w-5" />
              <span>eBook digital · Oferta ARO em preparação</span>
            </div>
          </div>
          <div className="relative mx-auto max-w-sm rounded-[2rem] border border-forest/15 bg-gradient-forest p-8 text-ivory shadow-card">
            <Leaf className="h-12 w-12 text-gold-soft" aria-hidden />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              Me Sentir Leve · Volume 01
            </p>
            <p className="mt-6 font-display text-4xl leading-tight">
              Uma leitura para levar perguntas melhores à conversa.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ivory/80">
              Material editorial educativo. Não é associado nem endossado
              pelo fabricante do medicamento.
            </p>
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <h2 className="font-display text-3xl text-ink md:text-4xl">O que encontra nesta leitura</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {topics.map((topic) => (
            <article key={topic.title} className="rounded-3xl border border-forest/10 bg-white p-7 shadow-soft">
              <h3 className="font-display text-xl text-forest">{topic.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{topic.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-3xl border border-gold/30 bg-cream/50 p-6 md:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-forest" />
            <div>
              <h3 className="font-display text-xl text-ink">Informação responsável</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Este material não ensina doses nem recomenda iniciar, suspender ou alterar
                medicamentos. Não substitui consulta, diagnóstico, prescrição ou
                orientação individualizada. Procure a sua equipa clínica para decisões
                relativas ao tratamento.
              </p>
            </div>
          </div>
        </div>
        <Link href={`/${locale}/loja`} className="mt-10 inline-flex items-center gap-2 font-semibold text-forest hover:underline">
          Explorar outros conteúdos da LeveLab <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
