import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ecosystem } from '@/lib/content/brand';
import { Badge } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/Section';

export function EcosystemGrid({ locale }: { locale: string }) {
  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="O ecossistema LeveLab"
          title="Tudo o que precisa, num só método"
          intro="Da conversa inicial à continuidade — programas, conteúdo e acompanhamento pensados para a vida real."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystem.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}${item.path}`}
              className="group relative flex flex-col gap-3 overflow-hidden rounded-3xl border border-forest/10 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-forest/8 font-display text-lg font-medium text-forest">
                  {item.name.charAt(0)}
                </span>
                {item.status === 'soon' ? (
                  <Badge variant="outline">Em breve</Badge>
                ) : (
                  <Badge variant="gold">Disponível</Badge>
                )}
              </div>
              <p className="mt-1 font-display text-xl font-medium text-ink">{item.name}</p>
              <p className="text-sm font-medium text-forest-2">{item.tagline}</p>
              <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                Explorar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
