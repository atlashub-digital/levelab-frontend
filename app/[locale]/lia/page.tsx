import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Salad,
  CalendarHeart,
  Moon,
  Activity,
  Repeat,
  Flame,
  Headset,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { LiaChat } from '@/components/lia/LiaChat';
import { ChatMockup } from '@/components/blocks/ChatMockup';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { QRPlaceholder } from '@/components/blocks/QRPlaceholder';
import { LIAAvatar } from '@/components/blocks/LIAAvatar';
import { FAQ } from '@/components/blocks/FAQ';
import { CTABanner } from '@/components/blocks/CTABanner';
import { SectionHeading } from '@/components/ui/Section';
import { liaCapabilities, liaFaq, liaInfo } from '@/lib/content/brand';
import { siteConfig } from '@/config/site';
import { getLocaleCopy, isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'LIA — Assistente de bem-estar',
  description:
    'LIA é a assistente virtual de bem-estar da LeveLab. Conversas sobre rotina, alimentação, movimento e hábitos. Lançamento em 12/10/2026.',
  alternates: { canonical: '/pt-br/lia' },
};

const capabilityIcons = [Salad, CalendarHeart, Moon, Activity, Repeat, Flame, Headset];

export default async function LiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);

  return (
    <>
      {/* Launch banner */}
      <div className="bg-gradient-gold text-ink">
        <div className="shell flex flex-col items-center justify-between gap-3 py-3 text-center md:flex-row md:text-left">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            {siteConfig.liaLaunchLabel}
          </p>
          <WhatsAppCTA
            phone={siteConfig.liaWhatsappNumber}
            text="Quero entrar no grupo de lançamento da LIA."
            variant="primary"
            size="sm"
            className="!bg-forest !text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Entrar no grupo de lançamento
          </WhatsAppCTA>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_85%_0%,rgba(183,154,91,0.18),transparent_30rem),radial-gradient(circle_at_0%_30%,rgba(21,61,49,0.05),transparent_24rem)]"
        />
        <div className="shell grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Assistente de bem-estar
            </span>
            <h1 className="mt-4 text-balance font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-medium leading-[1] text-ink">
              {liaInfo.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              {liaInfo.identity} Conversa sobre rotina, alimentação, movimento, sono e hábitos —
              com método LeveLab e apoio humano quando precisar.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <WhatsAppCTA
                phone={siteConfig.liaWhatsappNumber}
                text="Quero entrar no grupo de lançamento da LIA."
                variant="primary"
              >
                <MessageCircle className="h-4 w-4" />
                Entrar no grupo WhatsApp
              </WhatsAppCTA>
              <a
                href="#conversar"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
              >
                <Sparkles className="h-4 w-4" />
                Testar a LIA agora
              </a>
            </div>
            <p className="mt-3 text-xs text-muted">
              O link final do grupo será inserido aqui antes do lançamento. QR code abaixo.
            </p>
          </div>

          <div className="relative">
            <div className="relative mx-auto flex max-w-sm flex-col items-center gap-5 rounded-[2.5rem] border border-forest/10 bg-white/80 p-8 text-center shadow-card backdrop-blur">
              <LIAAvatar size={120} />
              <p className="font-display text-2xl font-medium text-ink">LIA</p>
              <p className="text-sm text-muted">{liaInfo.identity}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-forest">
                {liaInfo.statusLabel}
              </span>
              <div className="mt-2 flex flex-col items-center gap-3 border-t border-forest/10 pt-5">
                <QRPlaceholder size={150} />
                <p className="max-w-[15rem] text-xs text-muted">
                  Escaneie para entrar no grupo de lançamento. Link final disponível em breve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive chat */}
      <section id="conversar" className="border-t border-forest/10 bg-cream/40">
        <div className="shell py-12">
          <SectionHeading
            align="center"
            eyebrow="Conversar com a LIA"
            title="Experimente a LIA"
            intro="Modo visitante, memória curta e sem dados sensíveis. A conta e a persistência chegam numa próxima fase."
          />
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-forest/10 bg-ivory shadow-card">
            <LiaChat locale={locale} copy={copy} />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="Capacidades"
            title="A LIA ajuda no seu dia"
            intro="Sete áreas onde a LIA pode conversar com você — sempre educativa, nunca clínica."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {liaCapabilities.map((c, i) => {
              const Icon = capabilityIcons[i % capabilityIcons.length];
              return (
                <li
                  key={c.id}
                  className="flex flex-col gap-3 rounded-3xl border border-forest/10 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-forest text-ivory">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="font-display text-lg font-medium text-ink">{c.label}</p>
                  <p className="text-sm leading-relaxed text-muted">{c.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream/70 py-20 md:py-28">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] border border-forest/10 bg-white p-6 shadow-card">
              <ChatMockup />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Benefícios"
              title="Mais do que respostas — continuidade"
              intro="A LIA não é uma busca. É uma companheira que ajuda a montar o dia, voltar à rotina e manter o que importa."
            />
            <ul className="mt-8 flex flex-col gap-3">
              {[
                'Conversas práticas, sem jargão clínico.',
                'Ajudar a montar pequenos hábitos que ficam.',
                'Continuar no WhatsApp com a sua equipa.',
                'Sempre identificada como inteligência artificial.',
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-white p-4">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-[11px] font-bold text-ink">
                    ✓
                  </span>
                  <p className="text-sm text-ink/85">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQ
        eyebrow="FAQ"
        title="Perguntas frequentes sobre a LIA"
        intro="O essencial sobre a LIA, privacidade e limites."
        items={liaFaq}
      />

      <CTABanner
        eyebrow="Não fique de fora"
        title="Entre no grupo de lançamento da LIA"
        description="Receba o acesso em primeira mão no sábado, 12/10/2026, às 20h. O link final será partilhado no grupo."
        primaryLabel="Entrar no grupo WhatsApp"
        primaryHref={siteConfig.liaWhatsappGroupUrl}
        secondaryLabel="Falar com Ana"
        secondaryHref={`/${locale}/contato`}
        tone="forest"
      />

      <div className="pb-20 text-center">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:underline"
        >
          Voltar ao início
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
