import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  CalendarHeart,
  Moon,
  Activity,
  Repeat,
  Salad,
  ListChecks,
  Headset,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { LiaChat } from '@/components/lia/LiaChat';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { QRPlaceholder } from '@/components/blocks/QRPlaceholder';
import { LIAAvatar } from '@/components/blocks/LIAAvatar';
import { FAQ } from '@/components/blocks/FAQ';
import { SectionHeading, Section, Container } from '@/components/ui/Section';
import { liaCapabilities, liaFaq, liaInfo, aiTransparencyCopy } from '@/lib/content/brand';
import { siteConfig, getLiaLaunchGroupUrl } from '@/config/site';
import { getLocaleCopy, isLocale } from '@/lib/i18n';

/**
 * LIA page — pre-launch visual webchat.
 *
 * Spec (levelab-zai-ui-spec-v1.0.json → pages.lia.sections_order):
 *   hero_with_canonical_LIA → coming_soon_banner → webchat_visual_demo →
 *   capabilities_grid → whatsapp_launch_group → ai_transparency → faq → footer.
 *
 * WhatsApp launch group:
 *   - URL comes from getLiaLaunchGroupUrl() (NEXT_PUBLIC_LIA_LAUNCH_GROUP_URL).
 *   - When set: render an active WhatsAppCTA linking to it + a REAL QR image
 *     built from the same URL (render_fake_qr: false).
 *   - When null (current default): render the DISABLED QRPlaceholder +
 *     a disabled WhatsAppCTA labeled 'Link do grupo em breve'. NEVER fake QR.
 *
 * Launch text comes from siteConfig.liaLaunchLabel (config-driven). We do NOT
 * independently assert the weekday — the user-provided text is preserved
 * verbatim (see config/site.ts date_validation_warning note).
 */
export const metadata: Metadata = {
  title: 'LIA — Assistente de bem-estar · LeveLab',
  description:
    'Conheça a LIA, assistente virtual de bem-estar da LeveLab Care. Conversas sobre rotina, hábitos, conteúdos e acompanhamento — com handoff para atendimento humano.',
  alternates: { canonical: '/pt-br/lia' },
};

const capabilityIcons = [
  CalendarHeart, // rotina
  Repeat, // hábitos
  Salad, // alimentação geral
  Activity, // movimento
  Moon, // sono e bem-estar
  ListChecks, // navegação dos conteúdos / check-ins (overlapping by design)
  ListChecks,
  Headset, // handoff para atendimento humano
];

export default async function LiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);

  // Config-driven launch group URL. null in V1 (env var not set).
  const launchGroupUrl = getLiaLaunchGroupUrl();

  return (
    <>
      {/* coming_soon_banner (config-driven) */}
      <div className="bg-gradient-gold text-ink">
        <div className="shell flex flex-col items-center justify-between gap-3 py-3 text-center md:flex-row md:text-left">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            {siteConfig.liaLaunchLabel}
          </p>
          {launchGroupUrl ? (
            <WhatsAppCTA
              href={launchGroupUrl}
              variant="primary"
              size="sm"
              className="!bg-forest !text-white"
            >
              Entrar no Grupo WhatsApp do Lançamento
            </WhatsAppCTA>
          ) : (
            <WhatsAppCTA disabled variant="primary" size="sm" className="!bg-forest !text-white">
              Link do grupo em breve
            </WhatsAppCTA>
          )}
        </div>
      </div>

      {/* hero_with_canonical_LIA */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_85%_0%,rgba(183,154,91,0.18),transparent_30rem),radial-gradient(circle_at_0%_30%,rgba(21,61,49,0.05),transparent_24rem)]"
        />
        <div className="shell grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              {liaInfo.identity}
            </span>
            <h1 className="mt-4 text-balance font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-medium leading-[1] text-ink">
              {liaInfo.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              {liaInfo.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#conversar"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-white shadow-soft transition-all hover:bg-forest-2 hover:shadow-lift"
              >
                <Sparkles className="h-4 w-4" />
                Testar a LIA agora
              </a>
              {launchGroupUrl ? (
                <WhatsAppCTA href={launchGroupUrl} variant="secondary" size="md">
                  Entrar no grupo
                </WhatsAppCTA>
              ) : (
                <span className="inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-sm font-medium text-forest/60">
                  <MessageCircle className="h-4 w-4" />
                  Link do grupo em breve
                </span>
              )}
            </div>
            <p className="mt-3 text-xs text-muted">
              Receba o acesso em primeira mão — o link oficial sai no grupo de lançamento.
            </p>
          </div>

          {/* LIA avatar placeholder (canonical placeholder — DO NOT generate a face) */}
          <div className="relative">
            <div className="relative mx-auto flex max-w-sm flex-col items-center gap-5 rounded-[2.5rem] border border-forest/10 bg-white/80 p-8 text-center shadow-card backdrop-blur">
              <LIAAvatar size={120} />
              <p className="font-display text-2xl font-medium text-ink">LIA</p>
              <p className="text-sm text-muted">{liaInfo.identity}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-forest">
                {liaInfo.statusLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* webchat_visual_demo */}
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

      {/* capabilities_grid (8 capabilities) */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            align="center"
            eyebrow="Capacidades"
            title="A LIA ajuda no seu dia"
            intro="Oito áreas onde a LIA pode conversar com você — sempre educativa, nunca clínica."
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

      {/* whatsapp_launch_group */}
      <section className="bg-cream/70 py-20 md:py-28">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Grupo de lançamento"
              title="Receba o acesso em primeira mão"
              intro="Entre no grupo de lançamento da LIA para receber o link oficial, novidades e o acesso antes de todos."
            />
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {launchGroupUrl ? (
                <>
                  <WhatsAppCTA href={launchGroupUrl} variant="primary" size="md">
                    Entrar no Grupo WhatsApp do Lançamento
                  </WhatsAppCTA>
                  <Link
                    href={`/${locale}/contato`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
                  >
                    Falar com a Ana
                  </Link>
                </>
              ) : (
                <>
                  <WhatsAppCTA disabled variant="primary" size="md">
                    Link do grupo em breve
                  </WhatsAppCTA>
                  <Link
                    href={`/${locale}/contato`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
                  >
                    Falar com a Ana
                  </Link>
                </>
              )}
            </div>
            <p className="mt-3 text-xs text-muted">
              O link e o QR code reais serão publicados assim que o grupo
              oficial for aberto. Nunca geramos um QR falso.
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 rounded-[2.5rem] border border-forest/10 bg-white p-8 text-center shadow-card">
            {launchGroupUrl ? (
              // Real QR (render_fake_qr: false). Built from the same URL via
              // a public QR generation API — TODO(integration): swap to a
              // local QR library (e.g. `qrcode`) to avoid the external call.
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=8&data=${encodeURIComponent(launchGroupUrl)}`}
                  alt="QR code para o grupo de lançamento da LIA no WhatsApp"
                  width={184}
                  height={184}
                  className="rounded-2xl border border-forest/10 bg-ivory p-3"
                />
                <p className="max-w-[15rem] text-xs text-muted">
                  Escaneie para entrar no grupo oficial.
                </p>
              </>
            ) : (
              <>
                <QRPlaceholder size={184} />
                <p className="max-w-[15rem] text-xs text-muted">
                  Link do grupo em breve. O QR real será exibido aqui assim que
                  o link oficial estiver disponível.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ai_transparency */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-forest/10 bg-gradient-forest p-8 text-ivory shadow-card md:p-10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-gold text-ink">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                Transparência em IA
              </p>
            </div>
            <p className="mt-4 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-tight">
              {aiTransparencyCopy}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/80">
              A LIA não faz diagnóstico, prescrição, ajuste de dose nem substitui
              médico, nutricionista ou outro profissional qualificado. Em casos
              clínicos, procure atendimento humano.
            </p>
          </div>
        </Container>
      </section>

      {/* faq */}
      <FAQ
        eyebrow="FAQ"
        title="Perguntas frequentes sobre a LIA"
        intro="O essencial sobre a LIA, privacidade e limites."
        items={liaFaq}
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
