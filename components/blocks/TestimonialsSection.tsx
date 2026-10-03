import { Quote } from 'lucide-react';
import { reservedTestimonials } from '@/lib/content/brand';
import { SectionHeading } from '@/components/ui/Section';
import { Leaf } from '@/components/blocks/ProductVisual';

/**
 * Social proof section. Testimonials are RESERVED slots — real, consented
 * stories will be loaded from the backend. We do NOT invent testimonials.
 */
export function TestimonialsSection() {
  return (
    <section className="bg-cream/70 py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Prova social"
          title="Histórias reais reservadas"
          intro="As histórias reais aparecem aqui após consentimento explícito dos participantes. Não inventamos testemunhos."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reservedTestimonials.map((t) => (
            <article
              key={t.id}
              className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-forest/10 bg-white p-7 shadow-soft"
            >
              <Leaf className="absolute -right-8 -top-8 h-32 w-32 text-forest/5" />
              <Quote className="relative h-8 w-8 text-gold/50" />
              <p className="relative font-display text-xl font-medium italic leading-snug text-ink">
                {t.topic}
              </p>
              <p className="relative text-sm text-muted">{t.role}</p>
              <span className="relative mt-auto inline-flex w-fit rounded-full border border-forest/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-forest/70">
                História real em breve
              </span>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          As histórias reais serão carregadas a partir do backend após consentimento explícito.
        </p>
      </div>
    </section>
  );
}
