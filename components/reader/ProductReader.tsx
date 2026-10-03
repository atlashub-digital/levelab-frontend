import Link from 'next/link';
import { Lock, Sparkles, Check, LogIn, ChevronRight, ShieldCheck } from 'lucide-react';
import { ReaderApp } from '@/components/reader/ReaderApp';
import { ScriptAccent } from '@/components/ui/ScriptAccent';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { siteConfig } from '@/config/site';
import { libraryAssets, offers, type LibraryAsset } from '@/lib/content/library';
import { coverSrc, manifests } from '@/lib/content/manifests';
import { getSession } from '@/lib/supabase/server';
import { getLibrary } from '@/lib/levelab-api';
import { cn } from '@/lib/utils';

const programNames: Record<string, string> = {
  'corpo-forte': 'Corpo Forte',
  'forca-na-caneta': 'Força na Caneta',
};

/**
 * Premium reader. Members with access read the full PDF; everyone else reads
 * the free opening (cover, preface, index) and then the offer.
 */
export async function ProductReader({
  locale,
  asset,
  initialPage,
}: {
  locale: string;
  asset: LibraryAsset;
  initialPage?: number;
}) {
  const session = await getSession();
  const library = session ? await getLibrary(session.accessToken) : null;
  const hasAccess = Boolean(library?.find((item) => item.id === asset.id)?.hasAccess);
  const manifest = manifests[asset.id];
  const readerPath = `/${locale}/programas/${asset.product}/reader`;
  const siblings = libraryAssets.filter((a) => a.product === asset.product);
  const related = siblings.find((a) => a.id !== asset.id);
  const programName = programNames[asset.product] ?? asset.title;
  const docLabel = asset.doc === 'workbook' ? 'Workbook Premium' : 'Guia Premium';

  return (
    <div className="bg-paper">
      {/* Program banner */}
      <header className="relative overflow-hidden bg-gradient-forest text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_80%_20%,rgba(200,184,146,0.28),transparent_28rem),radial-gradient(circle_at_10%_120%,rgba(183,154,91,0.22),transparent_24rem)]"
        />
        <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto] md:py-10">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-white/65">
              <Link href={`/${locale}/programas`} className="hover:text-white">Programas</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/${locale}/programas/${asset.product}`} className="hover:text-white">{programName}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">Reader</span>
            </nav>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              {manifest.eyebrow}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-[1.02]">
                {programName}
              </h1>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
                  hasAccess ? 'bg-gold text-ink' : 'bg-white/10 text-gold-soft ring-1 ring-gold-soft/40',
                )}
              >
                {hasAccess ? <ShieldCheck className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                {hasAccess ? `${docLabel} · acesso completo` : `${docLabel} · pré-visualização`}
              </span>
            </div>
            <p className="mt-3 max-w-2xl font-display text-lg italic text-white/85">{manifest.tagline}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">{manifest.description}</p>

            {siblings.length > 1 ? (
              <nav className="mt-6 inline-flex gap-1 rounded-full bg-white/10 p-1 backdrop-blur" aria-label="Documentos">
                {siblings.map((s) => (
                  <Link
                    key={s.id}
                    href={`${readerPath}?doc=${s.doc}`}
                    className={cn(
                      'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                      s.id === asset.id ? 'bg-ivory text-forest' : 'text-white/80 hover:text-white',
                    )}
                  >
                    {s.doc === 'workbook' ? 'Workbook' : 'Guia'}
                    <span className="ml-1.5 text-xs font-normal opacity-70">{s.totalPages} p.</span>
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>

          <div className="relative hidden md:block">
            <ScriptAccent className="absolute right-full top-6 mr-8 hidden w-44 text-right text-2xl leading-tight text-gold-soft lg:block">
              {manifest.script}
            </ScriptAccent>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverSrc(asset.id)}
              alt={`Capa — ${asset.title}`}
              className="h-56 w-auto rotate-[3deg] rounded-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/20 lg:h-64"
            />
          </div>
        </div>
      </header>

      <ReaderApp
        key={asset.id + String(hasAccess)}
        locale={locale}
        asset={asset}
        manifest={manifest}
        src={hasAccess ? `/api/content/${asset.id}` : asset.previewPath}
        hasAccess={hasAccess}
        related={related}
        initialPage={initialPage}
      />

      {hasAccess ? null : (
        <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 sm:px-6">
          <Paywall
            locale={locale}
            asset={asset}
            signedIn={Boolean(session)}
            next={`${readerPath}?doc=${asset.doc}`}
          />
        </div>
      )}
    </div>
  );
}

function Paywall({
  locale,
  asset,
  signedIn,
  next,
}: {
  locale: string;
  asset: LibraryAsset;
  signedIn: boolean;
  next: string;
}) {
  const cards = [asset.offerId, 'levelab-premium'];
  return (
    <section
      id="desbloquear"
      className="mx-auto mt-6 max-w-4xl scroll-mt-24 rounded-3xl border border-forest/10 bg-white p-6 shadow-soft sm:p-10"
    >
      <div className="text-center">
        <Lock className="mx-auto h-8 w-8 text-gold" />
        <h2 className="mt-3 font-display text-3xl font-medium text-ink">
          Continue a leitura
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          Leu a abertura de {asset.title}. As restantes {asset.totalPages - asset.previewPages}{' '}
          páginas estão disponíveis para membros.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map((id, i) => {
          const offer = offers[id];
          return (
            <div
              key={id}
              className={cn(
                'flex flex-col rounded-2xl border p-6',
                i === 1 ? 'border-gold/50 bg-cream/40' : 'border-forest/10',
              )}
            >
              {i === 1 ? (
                <span className="mb-2 inline-flex w-fit items-center gap-1 rounded-full bg-gradient-gold px-3 py-1 text-xs font-semibold text-ink">
                  <Sparkles className="h-3 w-3" /> Acesso a tudo
                </span>
              ) : null}
              <h3 className="font-display text-xl text-ink">{offer.title}</h3>
              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm text-muted">
                {offer.includes.map((line) => (
                  <li key={line} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                    {line}
                  </li>
                ))}
              </ul>
              <WhatsAppCTA
                phone={siteConfig.commercialWhatsappNumber}
                text={`Olá! Quero adquirir: ${offer.title}.`}
                variant={i === 1 ? 'gold' : 'primary'}
                className="mt-6 w-full justify-center"
              >
                Quero este acesso
              </WhatsAppCTA>
            </div>
          );
        })}
      </div>

      {signedIn ? (
        <p className="mt-6 text-center text-sm text-muted">
          Já comprou e ainda não vê o conteúdo? Fale connosco pelo WhatsApp e libertamos o acesso no
          seu email.
        </p>
      ) : (
        <p className="mt-6 text-center text-sm text-muted">
          Já é membro?{' '}
          <Link
            href={`/${locale}/entrar?next=${encodeURIComponent(next)}`}
            className="inline-flex items-center gap-1 font-semibold text-forest hover:underline"
          >
            <LogIn className="h-4 w-4" /> Entrar
          </Link>
        </p>
      )}
    </section>
  );
}
