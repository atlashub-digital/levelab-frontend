import { Leaf } from '@/components/blocks/ProductVisual';
import { methodPrinciples } from '@/lib/content/brand';
import { SectionHeading } from '@/components/ui/Section';

export function MethodSection() {
  return (
    <section className="bg-cream/70 py-20 md:py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-forest opacity-[0.06] blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-forest/10 bg-gradient-forest p-10 text-ivory shadow-card">
            <Leaf className="absolute -right-12 -top-12 h-64 w-64 text-ivory/10" />
            <Leaf className="absolute -bottom-16 -left-12 h-56 w-56 text-ivory/8 [transform:rotate(180deg)]" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              O Método LeveLab
            </p>
            <p className="relative mt-4 max-w-md font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.1]">
              Leve, com método e acompanhado.
            </p>
            <p className="relative mt-4 max-w-md text-ivory/80">
              Sem extremismos. Pequenos hábitos, aprendizado real e presença — para a constância
              valer mais que a intensidade.
            </p>
            <p className="relative mt-8 font-display text-2xl italic text-gold-soft">
              Saúde de hoje. Um amanhã com mais vida.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Como pensamos"
            title="Quatro princípios que sustentam tudo"
            intro="O método LeveLab junta acolhimento e cuidado — sem pressa e sem pressão."
          />
          <ul className="mt-8 flex flex-col gap-4">
            {methodPrinciples.map((p, i) => (
              <li key={p.id} className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-display text-lg font-medium text-ink">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg font-medium text-ink">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
