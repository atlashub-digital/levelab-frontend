import { HeartHandshake, BookOpen, Bot, ShieldCheck, CalendarCheck } from 'lucide-react';
import { trustStrip } from '@/lib/content/brand';

const icons = [HeartHandshake, BookOpen, Bot, ShieldCheck, CalendarCheck];

export function TrustStrip() {
  return (
    <section className="border-y border-forest/10 bg-cream/60">
      <ul className="shell grid grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-5 md:py-6">
        {trustStrip.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={item.id} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest/8 text-forest">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{item.label}</p>
                <p className="text-xs leading-snug text-muted">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
