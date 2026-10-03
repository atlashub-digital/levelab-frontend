import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { LeafMark } from '@/components/brand/BrandLogo';

export function FinalCTA({
  locale,
  title,
  lead,
  primary,
  secondary,
}: {
  locale: string;
  title: string;
  lead: string;
  primary: string;
  secondary: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest text-ivory">
      <LeafMark className="pointer-events-none absolute -right-10 -top-10 h-80 w-80 text-champagne/10" />
      <div className="shell relative py-16 text-center lg:py-20">
        <div className="mx-auto h-px w-14 bg-champagne" />
        <h2 className="display-lg mx-auto mt-6 max-w-3xl text-balance text-ivory">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-ivory/75">{lead}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href={`/${locale}/avaliacao`}
            className="inline-flex h-12 items-center gap-2 rounded-md bg-ivory px-6 text-[15px] font-semibold text-forest transition-colors hover:bg-cream"
          >
            {primary} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/${locale}/lia/chat`}
            className="inline-flex h-12 items-center gap-2 rounded-md border border-champagne/50 px-6 text-[15px] font-semibold text-ivory transition-colors hover:border-champagne"
          >
            <MessageCircle className="h-4 w-4" /> {secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
