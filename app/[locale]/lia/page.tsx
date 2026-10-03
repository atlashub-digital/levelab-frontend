import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Apple,
  ArrowRight,
  BookOpenCheck,
  CalendarHeart,
  Flower2,
  HeartHandshake,
  Leaf,
  MessageCircleHeart,
  MessagesSquare,
  Puzzle,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { LIAAvatar } from '@/components/blocks/LIAAvatar';
import { OliveBranch } from '@/components/blocks/OliveBranch';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { FAQ } from '@/components/blocks/FAQ';
import { FinalCTA } from '@/components/home/FinalCTA';
import { NewsletterForm } from '@/components/home/NewsletterForm';
import { liaFaq } from '@/lib/content/brand';
import { getLiaLaunchGroupUrl } from '@/config/site';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'LIA — Assistente virtual LeveLab',
  description:
    'Conheça a LIA, a assistente virtual da LeveLab: conversas sobre rotina, alimentação, movimento e bem-estar, com apoio humano quando faz diferença.',
  alternates: { canonical: '/pt-br/lia' },
};

const sample = [
  { from: 'lia', text: 'Olá! Sou a LIA, a sua companheira de bem-estar. Como posso ajudar hoje?' },
  { from: 'user', text: 'Queria ideias práticas de café da manhã para a minha rotina.' },
  { from: 'lia', text: 'Boa escolha! Que tal começarmos por três combinações simples, com proteína e fruta? Posso montar uma lista para a semana.' },
] as const;

const does = [
  { icon: MessagesSquare, title: 'Acompanhamento diário', text: 'Conversa sempre que precisar, com respostas práticas e no seu ritmo.' },
  { icon: Apple, title: 'Alimentação consciente', text: 'Ideias de refeições e organização alimentar, sem regras rígidas.' },
  { icon: CalendarHeart, title: 'Rotina e motivação', text: 'Ajuda a criar hábitos, rever compromissos e retomar depois de pausas.' },
  { icon: Flower2, title: 'Bem-estar integral', text: 'Sono, estresse e recuperação, numa abordagem educativa e holística.' },
  { icon: Puzzle, title: 'Integração LeveLab', text: 'Ligada aos programas e conteúdos: explica capítulos e o próximo passo.' },
  { icon: HeartHandshake, title: 'Apoio humano', text: 'Quando faz diferença, a equipe LeveLab entra na conversa.' },
];

const doesNot = [
  'Não diagnostica doenças nem interpreta sintomas',
  'Não prescreve nem altera medicação ou doses',
  'Não cria dietas terapêuticas individualizadas',
  'Não substitui médicos, nutricionistas ou outros profissionais',
];

export default async function LiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const groupUrl = getLiaLaunchGroupUrl();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream">
        <OliveBranch className="pointer-events-none absolute -left-12 -top-6 hidden h-60 w-60 text-forest lg:block" thin />
        <OliveBranch orientation="right" className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 text-forest" thin />
        <div className="shell-wide relative grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="eyebrow tracking-[0.3em]">LIA • Assistente virtual LeveLab</p>
            <h1 className="display-xl mt-5 text-balance">
              A sua companheira de conversas para um bem-estar{' '}
              <em className="italic text-gold">real e duradouro.</em>
            </h1>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
              A LIA é a assistente virtual da LeveLab, criada para acompanhar o seu dia a dia com orientação educativa,
              base científica e um olhar humano. Converse sobre <strong className="font-semibold text-ink">alimentação</strong>,
              movimento, rotina, sono e muito mais.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {[
                { icon: Leaf, label: 'Conteúdo baseado em evidências' },
                { icon: Sparkles, label: 'Orientação personalizada' },
                { icon: Users, label: 'Sempre ao seu lado' },
                { icon: Flower2, label: 'Mais equilíbrio todos os dias' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-start gap-2 text-[13px] leading-snug text-ink/70 sm:items-center sm:text-center">
                  <Icon className="h-7 w-7 text-gold" strokeWidth={1.2} />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/lia/chat`}
                className="inline-flex h-12 items-center gap-2 rounded-md bg-forest px-6 text-[15px] font-semibold text-ivory shadow-soft hover:bg-forest-2"
              >
                Conversar com a LIA <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex h-12 items-center rounded-md border border-forest/30 bg-ivory/60 px-6 text-[15px] font-semibold text-forest hover:border-forest"
              >
                Como funciona
              </a>
            </div>
          </div>

          {/* Portrait + sample conversation */}
          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="relative ml-auto aspect-[4/5] w-[72%] overflow-hidden rounded-t-[10rem] rounded-b-lg ring-1 ring-champagne/40">
              <Image
                src="/images/people/lia/lia-portrait.webp"
                alt="LIA, assistente virtual da LeveLab"
                fill
                priority
                sizes="(min-width: 1024px) 24rem, 70vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <div className="absolute -bottom-6 left-0 w-[64%] min-w-[16rem] rounded-[1.6rem] bg-ivory p-3 shadow-card ring-1 ring-line">
              <div className="flex items-center gap-2.5 border-b border-line px-2 pb-2.5">
                <LIAAvatar size={34} ring={false} />
                <div>
                  <p className="font-display text-lg leading-none text-ink">LIA</p>
                  <p className="text-[11px] text-ink/60">Sua companheira de jornada</p>
                </div>
                <span className="ml-auto rounded-full bg-sage px-2 py-0.5 text-[10px] font-semibold text-forest">Exemplo</span>
              </div>
              <ul className="space-y-2 px-1 py-3">
                {sample.map((m, i) => (
                  <li key={i} className={m.from === 'user' ? 'flex justify-end' : 'flex'}>
                    <p
                      className={
                        m.from === 'user'
                          ? 'max-w-[85%] rounded-xl rounded-br-sm bg-forest px-3 py-2 text-[12.5px] leading-snug text-ivory'
                          : 'max-w-[88%] rounded-xl rounded-bl-sm bg-paper px-3 py-2 text-[12.5px] leading-snug text-ink ring-1 ring-line'
                      }
                    >
                      {m.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What LIA does */}
      <section className="border-b border-line bg-ivory py-14 lg:py-16" aria-labelledby="faz-title">
        <div className="shell-wide grid gap-10 lg:grid-cols-[1.1fr_repeat(6,minmax(0,1fr))] lg:gap-0">
          <div className="lg:pr-8">
            <h2 id="faz-title" className="font-display text-[2.3rem] leading-[1.02] text-ink">
              O que a LIA faz por você
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70">
              Uma aliada inteligente, próxima e disponível para apoiar o seu bem-estar, todos os dias.
            </p>
          </div>
          {does.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border-line lg:border-l lg:px-5">
              <Icon className="h-8 w-8 text-gold" strokeWidth={1.15} />
              <h3 className="mt-3 font-display text-[1.25rem] leading-tight text-ink">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink/65">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works + limits */}
      <section id="como-funciona" className="scroll-mt-24 bg-paper py-16 lg:py-24">
        <div className="shell-wide grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Como funciona</p>
            <h2 className="display-lg mt-3">Conversa, orientação e pessoas reais.</h2>
            <ol className="mt-8 space-y-7">
              {[
                ['Converse', 'Escreva como falaria com alguém de confiança. A LIA responde em segundos, 24 horas por dia.'],
                ['Receba orientação educativa', 'Explicações claras, ideias práticas e o próximo passo possível — com base nos conteúdos LeveLab.'],
                ['Quando faz diferença, a equipe entra', 'Para dúvidas sobre acesso, programas ou acompanhamento, a equipe LeveLab assume a conversa.'],
              ].map(([title, text], i) => (
                <li key={title} className="flex gap-5">
                  <span className="font-display text-[2.6rem] leading-none text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-[1.5rem] leading-tight text-ink">{title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink/70">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg bg-ivory p-7 ring-1 ring-line sm:p-9">
            <p className="flex items-center gap-2 text-sm font-semibold text-forest">
              <ShieldCheck className="h-5 w-5 text-gold" /> Limites claros, por princípio
            </p>
            <h3 className="mt-3 font-display text-[1.9rem] leading-tight text-ink">
              A LIA é uma assistente virtual. Não é médica.
            </h3>
            <ul className="mt-6 space-y-3">
              {doesNot.map((line) => (
                <li key={line} className="flex gap-3 text-[14.5px] text-ink/80">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {line}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex gap-3 rounded-md bg-cream/70 p-4 text-[13.5px] leading-relaxed text-ink/75">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              Em caso de sintomas graves ou urgência, procure imediatamente um serviço de saúde. Na conversa como
              visitante, a LIA não guarda os seus dados pessoais.
            </p>
            <Link href={`/${locale}/legal/ia`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:underline">
              <BookOpenCheck className="h-4 w-4" /> Transparência da IA
            </Link>
          </div>
        </div>
      </section>

      {/* WhatsApp */}
      <section className="bg-ivory py-16" aria-labelledby="whatsapp-title">
        <div className="shell-wide grid items-center gap-10 rounded-lg bg-sage-2 p-8 ring-1 ring-line sm:p-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-script -rotate-2 text-[1.9rem] text-gold">Faça parte desta nova etapa conosco.</p>
            <h2 id="whatsapp-title" className="mt-2 font-display text-[2.1rem] leading-tight text-ink">
              A LIA no WhatsApp
            </h2>
            <p className="mt-3 max-w-lg text-ink/70">
              {groupUrl
                ? 'Entre no grupo oficial para receber dicas, novidades e conversar com a comunidade LeveLab.'
                : 'O grupo oficial está a ser preparado. Deixe o seu e-mail para receber o convite em primeira mão.'}
            </p>
            {groupUrl ? (
              <WhatsAppCTA href={groupUrl} className="mt-6 !rounded-md">
                Entrar no grupo da LIA
              </WhatsAppCTA>
            ) : (
              <div className="max-w-md">
                <NewsletterForm
                  locale={locale}
                  labels={{
                    placeholder: 'O seu melhor e-mail',
                    consent: 'Aceito receber o convite e comunicações da LeveLab. Posso cancelar a qualquer momento.',
                    cta: 'Quero o convite',
                    ok: 'Combinado! Avisamos assim que o grupo abrir.',
                    error: 'Não foi possível concluir. Tente novamente daqui a pouco.',
                  }}
                />
              </div>
            )}
          </div>
          <ul className="space-y-3 text-[14.5px] text-ink/80">
            {['Aviso no momento do lançamento', 'Dicas exclusivas da LIA', 'Conteúdos especiais de bem-estar', 'Comunidade LeveLab'].map((l) => (
              <li key={l} className="flex items-center gap-3">
                <MessageCircleHeart className="h-5 w-5 text-gold" strokeWidth={1.4} /> {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quote band */}
      <section className="grid md:grid-cols-[1.4fr_1fr]">
        <figure className="relative flex min-h-[15rem] items-center overflow-hidden">
          <Image
            src="/images/lifestyle/quote-horizon.webp"
            alt="Mulher de costas a contemplar montanhas ao pôr do sol"
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover object-[70%_50%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-forest-dark/80 via-forest-dark/40 to-transparent" />
          <blockquote className="relative max-w-md px-8 font-display text-[1.9rem] italic leading-snug text-ivory sm:px-12">
            “Conversas de hoje para uma versão mais leve de amanhã.”
          </blockquote>
        </figure>
        <div className="flex items-center bg-cream px-8 py-10 sm:px-12">
          <p className="font-display text-[1.7rem] leading-snug text-ink">
            A mesma filosofia LeveLab. <em className="italic text-gold">Agora, também em conversa.</em>
          </p>
        </div>
      </section>

      <FAQ eyebrow="Perguntas frequentes" title="Sobre a LIA" intro="Transparência sobre o que a LIA é e como funciona." items={liaFaq} />
      <FinalCTA
        locale={locale}
        title="Experimente conversar com a LIA."
        lead="Sem cadastro, em modo visitante. Comece por uma pergunta simples."
        primary="Começar avaliação"
        secondary="Conversar com a LIA"
      />
    </>
  );
}
