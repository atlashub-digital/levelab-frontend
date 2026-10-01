import Link from 'next/link';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { LIAAvatar } from '@/components/blocks/LIAAvatar';
import { ChatMockup } from '@/components/blocks/ChatMockup';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { liaInfo } from '@/lib/content/brand';
import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/Section';
import type { LocaleCopy } from '@/lib/i18n';

export function LiaSection({ locale, copy }: { locale: string; copy: LocaleCopy }) {
  return (
    <section className="py-20 md:py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-forest opacity-[0.08] blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-forest/10 bg-cream p-10 text-center shadow-card">
            <div className="mx-auto flex max-w-xs flex-col items-center gap-5">
              <LIAAvatar size={140} />
              <div>
                <p className="font-display text-3xl font-medium text-ink">LIA</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-forest-2">
                  Assistente de bem-estar
                </p>
              </div>
              <p className="font-display text-lg italic text-ink/80">{liaInfo.tagline}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-forest">
                {liaInfo.statusLabel}
              </span>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Conheça a LIA"
            title="A sua companheira de conversas"
            intro={liaInfo.identity}
          />
          <div className="mt-8 max-w-md">
            <ChatMockup />
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/lia`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-sm font-semibold text-white shadow-soft transition-all hover:bg-forest-2 hover:shadow-lift"
            >
              <Sparkles className="h-4 w-4" />
              Testar LIA
            </Link>
            <WhatsAppCTA
              phone={siteConfig.liaWhatsappNumber}
              text="Olá! Quero conversar com a LIA."
              variant="secondary"
            >
              <MessageCircle className="h-4 w-4" />
              {copy.common.continueWhatsapp}
            </WhatsAppCTA>
            <Link
              href={`/${locale}/lia`}
              className="inline-flex h-12 items-center gap-1.5 px-2 text-sm font-semibold text-forest"
            >
              Saber mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
