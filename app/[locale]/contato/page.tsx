import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Sparkles, Phone } from 'lucide-react';
import { Container, SectionHeading, Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/blocks/ContactForm';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { CTABanner } from '@/components/blocks/CTABanner';
import { anaInfo } from '@/lib/content/brand';
import { siteConfig } from '@/config/site';
import { getLocaleCopy, isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Fale com a LeveLab. LIA, grupo de lançamento WhatsApp, apoio comercial com a Ana e canais oficiais.',
  alternates: { canonical: '/pt-br/contato' },
};

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getLocaleCopy(locale);

  return (
    <>
      {/* Hero */}
      <Section className="py-16 md:py-24">
        <SectionHeading
          align="center"
          eyebrow="Contacto"
          title="Estamos do lado de cá"
          intro="Escolha o canal mais confortável para si. A LIA está em lançamento; a Ana e a equipe respondem às dúvidas comerciais."
        />
      </Section>

      {/* WhatsApp cards */}
      <section className="pb-4">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <WhatsAppCard
              eyebrow="LIA · Lançamento"
              title="Grupo de lançamento da LIA"
              text={siteConfig.liaLaunchLabel}
              phone={siteConfig.liaWhatsappNumber}
              cta="Entrar no grupo"
              prefill="Quero entrar no grupo de lançamento da LIA."
              note="O link final do grupo será inserido antes de 12/10/2026."
              tone="gold"
            />
            <WhatsAppCard
              eyebrow="Comercial · Ana"
              title={`Falar com ${anaInfo.name}`}
              text={anaInfo.blurb}
              phone={siteConfig.commercialWhatsappNumber}
              cta={copy.common.talkToAna}
              prefill="Olá Ana! Preciso de ajuda com a LeveLab."
              note="Número temporário de teste — será substituído pelo oficial."
              tone="forest"
            />
          </div>
        </Container>
      </section>

      {/* Ana card + form */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            {/* Ana card */}
            <div className="rounded-3xl border border-forest/10 bg-white p-6 shadow-card md:p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative mx-auto overflow-hidden rounded-2xl border border-forest/10">
                  <Image
                    src={anaInfo.placeholder}
                    alt={`${anaInfo.name} — ${anaInfo.role}`}
                    width={260}
                    height={260}
                    className="h-auto w-full max-w-[220px]"
                  />
                </div>
                <p className="mt-4 font-display text-2xl font-medium text-ink">
                  {anaInfo.name}
                </p>
                <p className="text-sm font-semibold uppercase tracking-wider text-forest-2">
                  {anaInfo.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {anaInfo.blurb}
                </p>
                <div className="mt-5 flex flex-col gap-2 self-stretch">
                  <WhatsAppCTA
                    phone={siteConfig.commercialWhatsappNumber}
                    text="Olá Ana! Preciso de ajuda com a LeveLab."
                    variant="primary"
                  >
                    {copy.common.talkToAna}
                    <ArrowRight className="h-4 w-4" />
                  </WhatsAppCTA>
                  <p className="inline-flex items-center justify-center gap-1.5 text-[11px] text-muted">
                    <Phone className="h-3 w-3" />
                    {siteConfig.commercialWhatsappNumber} · teste
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <SectionHeading
                eyebrow="Mensagem"
                title="Envie uma mensagem"
                intro="Preferimos conversa humana. Esta é uma demonstração de frontend — quando o backend estiver pronto, a sua mensagem chega à equipe comercial."
              />
              <div className="mt-6">
                <ContactForm locale={locale} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Social */}
      <section className="bg-cream/70 py-12 md:py-16">
        <Container>
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="eyebrow">Seguir a LeveLab</span>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-medium text-ink">
              Acompanhe o lançamento da LIA e os próximos conteúdos
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {siteConfig.social.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-forest/20 bg-white px-5 text-sm font-semibold text-forest transition-all hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-soft"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {s.label}
                </Link>
              ))}
            </div>
            <p className="max-w-md text-xs text-muted">
              Os links sociais oficiais serão publicados aqui assim que estiverem
              ativos. Por enquanto, os botões redirecionam para um placeholder.
            </p>
          </div>
        </Container>
      </section>

      <CTABanner
        eyebrow="Prefere começar pela avaliação?"
        title="Em 2 minutos, a LIA sugere um ponto de entrada"
        description="Conversa curta, sem compromisso. A LIA é sempre identificada como inteligência artificial."
        primaryLabel="Começar avaliação"
        primaryHref={`/${locale}/avaliacao`}
        secondaryLabel="Conversar com a LIA"
        secondaryHref={`/${locale}/lia`}
        tone="forest"
      />
    </>
  );
}

function WhatsAppCard({
  eyebrow,
  title,
  text,
  phone,
  cta,
  prefill,
  note,
  tone,
}: {
  eyebrow: string;
  title: string;
  text: string;
  phone: string;
  cta: string;
  prefill: string;
  note: string;
  tone: 'gold' | 'forest';
}) {
  const toneCls =
    tone === 'gold'
      ? 'border-gold/20 bg-gradient-gold text-ink'
      : 'border-forest/10 bg-gradient-forest text-ivory';
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border p-6 shadow-card md:p-8 ${toneCls}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-80">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-display text-2xl font-medium leading-tight">{title}</h3>
      <p className="mt-2 text-sm opacity-80">{text}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <WhatsAppCTA
          phone={phone}
          text={prefill}
          variant={tone === 'gold' ? 'gold' : 'primary'}
        >
          <MessageCircle className="h-4 w-4" />
          {cta}
        </WhatsAppCTA>
      </div>
      <p className="mt-3 text-[11px] opacity-70">{note}</p>
    </div>
  );
}
