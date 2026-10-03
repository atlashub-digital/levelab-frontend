import Link from 'next/link';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { siteConfig } from '@/config/site';
import type { LocaleCopy } from '@/lib/i18n';

export function FinalCTA({ locale, copy }: { locale: string; copy: LocaleCopy }) {
  const cards = [
    {
      label: copy.nav.assessment,
      desc: 'Uma conversa curta para entender o seu momento.',
      href: `/${locale}/avaliacao`,
      icon: Sparkles,
      accent: 'bg-gradient-forest text-ivory',
    },
    {
      label: copy.nav.lia,
      desc: 'Conversar com a LIA sobre rotina e hábitos.',
      href: `/${locale}/lia`,
      icon: MessageCircle,
      accent: 'bg-gradient-gold text-ink',
    },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Onde começar</span>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,4vw,3.2rem)] font-medium leading-tight text-ink text-balance">
            Comece pela conversa certa para você.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Avaliação ou LIA — os dois caminhos levam à mesma direção: acompanhamento real.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.label}
                href={c.href}
                className="group flex flex-col gap-4 rounded-3xl border border-forest/10 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${c.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p className="font-display text-2xl font-medium text-ink">{c.label}</p>
                <p className="text-sm text-muted">{c.desc}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                  Começar
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <WhatsAppCTA
            phone={siteConfig.commercialWhatsappNumber}
            text="Olá! Quero falar com a Ana sobre a LeveLab."
            variant="outline"
          >
            {copy.common.talkToAna}
          </WhatsAppCTA>
        </div>
      </div>
    </section>
  );
}
