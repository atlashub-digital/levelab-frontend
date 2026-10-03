import { Leaf } from '@/components/blocks/ProductVisual';
import { methodPrinciples } from '@/lib/content/brand';
import { SectionHeading } from '@/components/ui/Section';

/**
 * O Método F.O.R.T.E. — five pillars.
 * Spec source: levelab-zai-ui-spec-v1.0.json → pages.home.method_copy.
 */
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
              Método estruturado
            </p>
            <p className="relative mt-4 max-w-md font-display text-[clamp(2rem,3.5vw,3rem)] font-medium leading-[1.05]">
              O Método F.O.R.T.E.
            </p>
            <p className="relative mt-4 max-w-md text-ivory/80">
              Cinco pilares que sustentam uma rotina mais leve, consciente e
              sustentável — sem extremismos, sem promessas clínicas.
            </p>
            <p className="relative mt-8 font-display text-2xl italic text-gold-soft">
              Saúde de hoje. Um amanhã com mais vida.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Cinco pilares"
            title="O Método F.O.R.T.E."
            intro="O método LeveLab junta acolhimento e cuidado — sem pressa e sem pressão. Cada pilar é educativo e calmo."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {methodPrinciples.map((p) => (
              <li
                key={p.id}
                className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-5 transition-colors hover:bg-forest/[0.03]"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-display text-lg font-medium text-ink">
                  {p.key}
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
