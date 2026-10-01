import { Plus } from 'lucide-react';
import type { FaqItem } from '@/lib/content/brand';

export function FAQ({
  items,
  eyebrow,
  title,
  intro,
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="bg-cream/70 py-20 md:py-28">
      <div className="shell">
        <div className="mx-auto max-w-3xl">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          {title ? (
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-ink">
              {title}
            </h2>
          ) : null}
          {intro ? <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p> : null}
          <div className="mt-10 flex flex-col gap-3">
            {items.map((item) => (
              <details
                key={item.id}
                className="group rounded-2xl border border-forest/10 bg-white p-5 transition-colors open:bg-forest/[0.03]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium text-ink">
                  {item.q}
                  <Plus className="h-5 w-5 shrink-0 text-forest transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
