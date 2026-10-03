import Image from 'next/image';
import { BarChart3, BookOpenCheck, Feather, Heart } from 'lucide-react';
import { OliveBranch } from '@/components/blocks/OliveBranch';

/** Photographic catalog hero (Maquete Loja). */
export function CatalogHero({
  title,
  accent,
  lead,
  script,
  badge,
}: {
  title: string;
  accent: string;
  lead: string;
  script: string;
  badge: string;
}) {
  const features = [
    { icon: BookOpenCheck, label: 'Conteúdos baseados em ciência' },
    { icon: Feather, label: 'Ferramentas práticas para o dia a dia' },
    { icon: Heart, label: 'Mais saúde, energia e bem-estar real' },
    { icon: BarChart3, label: 'Acesso imediato na sua jornada' },
  ];
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="relative h-56 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[52%]">
        <Image
          src="/images/lifestyle/hero-conteudos.webp"
          alt="Mulher sorridente a descansar ao sol"
          fill
          priority
          sizes="(min-width: 1024px) 52vw, 100vw"
          className="object-cover object-[60%_35%] lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_26%)]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream lg:hidden" />
        <p className="font-script absolute left-6 top-6 hidden max-w-[13rem] rotate-[-6deg] text-[1.9rem] text-gold md:block lg:left-[5%] lg:top-[10%]">
          {script}
        </p>
        <div className="absolute bottom-6 right-8 hidden h-32 w-32 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#e6d3a3,#c7a866_55%,#a87839)] p-4 text-center shadow-card md:flex">
          <span className="font-display text-[1.05rem] italic leading-tight text-forest-dark">{badge}</span>
        </div>
      </div>
      <OliveBranch className="pointer-events-none absolute -left-12 -top-8 hidden h-56 w-56 text-forest lg:block" thin />
      <div className="shell-wide relative">
        <div className="max-w-[36rem] py-8 lg:py-16">
          <h1 className="display-xl text-ink">
            {title} <em className="font-display italic text-gold">{accent}</em>
          </h1>
          <p className="mt-5 max-w-[32rem] text-[1.05rem] leading-relaxed text-ink/75">{lead}</p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-start gap-2 text-[12.5px] leading-snug text-ink/70 sm:items-center sm:text-center">
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.3} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
