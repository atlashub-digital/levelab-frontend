import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { anaInfo } from '@/lib/content/brand';
import { siteConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/Section';

export function AnaSection({ copy }: { copy: { common: { talkToAna: string } } }) {
  return (
    <section className="bg-cream/70 py-20 md:py-28">
      <div className="shell grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr]">
        <div className="relative mx-auto">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-gold opacity-20 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-forest/10 bg-white p-8 shadow-card">
            <Image
              src={anaInfo.placeholder}
              alt={`${anaInfo.name} — ${anaInfo.role}`}
              width={320}
              height={320}
              className="mx-auto h-auto w-full max-w-[280px] rounded-2xl"
            />
            <p className="mt-5 text-center font-display text-2xl font-medium text-ink">
              {anaInfo.name}
            </p>
            <p className="text-center text-sm font-semibold uppercase tracking-wider text-forest-2">
              {anaInfo.role}
            </p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Apoio humano"
            title="Tem uma pessoa do lado de cá"
            intro={anaInfo.blurb}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WhatsAppCTA
              phone={siteConfig.commercialWhatsappNumber}
              text="Olá Ana! Preciso de ajuda com a LeveLab."
              variant="primary"
            >
              {copy.common.talkToAna}
              <ArrowRight className="h-4 w-4" />
            </WhatsAppCTA>
            <p className="text-xs text-muted">
              Número temporário de teste · {siteConfig.commercialWhatsappNumber}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
