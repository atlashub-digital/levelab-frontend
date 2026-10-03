import Image from 'next/image';
import { Check, Infinity as InfinityIcon, MessageCircle, Sparkles, Zap } from 'lucide-react';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { OliveBranch } from '@/components/blocks/OliveBranch';
import { siteConfig } from '@/config/site';

/**
 * Featured offer (Maquete Loja → featured bundle). Uses the real offer
 * (LeveLab Premium) and real covers; access is granted by the team until a
 * payment provider is connected — no price, no fake discount.
 */
export function PremiumFeature() {
  const covers = [
    { src: '/content/thumbs/cover-forca-na-caneta-p001.webp', alt: 'Capa Força na Caneta', cls: '-rotate-6 translate-x-6 translate-y-3' },
    { src: '/content/thumbs/cover-corpo-forte-workbook-p001.webp', alt: 'Capa Workbook Corpo Forte', cls: 'rotate-3 -translate-x-6 translate-y-2' },
    { src: '/content/thumbs/cover-corpo-forte-guia-p001.webp', alt: 'Capa Corpo Forte', cls: 'z-10 -translate-y-1' },
  ];
  return (
    <section id="premium" className="shell-wide scroll-mt-28">
      <div className="relative grid overflow-hidden rounded-lg bg-[linear-gradient(120deg,#f8f2e6,#efe3cb)] ring-1 ring-line lg:grid-cols-[1.25fr_1fr]">
        <OliveBranch className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 text-forest" thin />
        <div className="relative p-7 sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-[3px] bg-forest px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory">
            <Sparkles className="h-3 w-3" /> Acesso completo
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.3rem)] leading-[0.98] text-ink">
            LeveLab <em className="italic text-gold">Premium</em>
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink/75">
            Corpo Forte (Guia + Workbook), Força na Caneta e todos os próximos lançamentos — com a LIA a acompanhar a
            sua jornada.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-ink/80 sm:grid-cols-2">
            {['Toda a biblioteca LeveLab', 'Novos lançamentos incluídos', 'LIA+ com acompanhamento', 'Leitura no Reader, em qualquer tela'].map(
              (line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" /> {line}
                </li>
              ),
            )}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <WhatsAppCTA
              phone={siteConfig.commercialWhatsappNumber}
              text="Olá! Quero saber mais sobre o LeveLab Premium."
              className="!rounded-md"
            >
              Quero o acesso completo
            </WhatsAppCTA>
            <ul className="flex flex-wrap gap-4 text-xs text-ink/65">
              <li className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-gold" /> Acesso no seu e-mail</li>
              <li className="flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5 text-gold" /> Atendimento humano</li>
              <li className="flex items-center gap-1.5"><InfinityIcon className="h-3.5 w-3.5 text-gold" /> Jornada completa</li>
            </ul>
          </div>
        </div>
        <div className="relative hidden items-center justify-center p-8 lg:flex">
          {covers.map((c) => (
            <div key={c.src} className={`relative h-64 w-[11.3rem] shrink-0 -ml-16 first:ml-0 shadow-[0_24px_40px_-16px_rgba(32,48,42,0.55)] ${c.cls}`}>
              <Image src={c.src} alt={c.alt} fill sizes="180px" className="rounded-[2px] object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
