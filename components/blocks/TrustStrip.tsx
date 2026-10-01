import { HeartHandshake, BookOpen, Bot, ShieldCheck, CalendarCheck } from 'lucide-react';
import { trustStrip } from '@/lib/content/brand';

const icons = [HeartHandshake, BookOpen, Bot, ShieldCheck, CalendarCheck];

/**
 * Trust strip — 5 spec items, maquette style: BIGGER outlined line-art
 * icons inside generous circles. Decorative, more breathing room.
 */
export function TrustStrip() {
  return (
    <section className="border-y border-forest/10 bg-cream/60">
      <ul className="shell grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-5 md:py-8">
        {trustStrip.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={item.id} className="flex items-start gap-4">
              <span className="inline-grid h-14 w-14 shrink-0 place-items-center rounded-full border border-forest/25 bg-white/70 text-forest shadow-soft">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{item.label}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
