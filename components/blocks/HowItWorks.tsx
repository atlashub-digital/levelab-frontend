import { howItWorks } from '@/lib/content/brand';
import { SectionHeading } from '@/components/ui/Section';

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Como funciona"
          title="Da conversa à continuidade"
          intro="Um caminho simples: entender, conversar, aprender, progredir e continuar — com LIA e apoio humano."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {howItWorks.map((step) => (
            <li
              key={step.n}
              className="relative flex flex-col gap-2 rounded-3xl border border-forest/10 bg-white p-6 shadow-soft"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-forest font-display text-xl font-medium text-ivory">
                {String(step.n).padStart(2, '0')}
              </span>
              <p className="mt-3 font-display text-xl font-medium text-ink">{step.title}</p>
              <p className="text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
