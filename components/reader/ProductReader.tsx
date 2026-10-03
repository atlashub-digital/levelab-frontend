import Link from 'next/link';
import { Lock, Sparkles, Check, LogIn, BookOpen } from 'lucide-react';
import { PdfViewer } from '@/components/reader/PdfViewer';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { siteConfig } from '@/config/site';
import { libraryAssets, offers, type LibraryAsset } from '@/lib/content/library';
import { getSession } from '@/lib/supabase/server';
import { getLibrary } from '@/lib/levelab-api';
import { cn } from '@/lib/utils';

/**
 * Reader for a premium asset. Members with access read the full PDF; everyone
 * else reads the free preview (cover, preface, index) followed by the offer.
 */
export async function ProductReader({ locale, asset }: { locale: string; asset: LibraryAsset }) {
  const session = await getSession();
  const library = session ? await getLibrary(session.accessToken) : null;
  const hasAccess = Boolean(library?.find((item) => item.id === asset.id)?.hasAccess);
  const readerPath = `/${locale}/programas/${asset.product}/reader`;
  const siblings = libraryAssets.filter((a) => a.product === asset.product);

  return (
    <div className="bg-cream/30">
      <div className="shell py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow inline-flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5" />
              {hasAccess ? 'Acesso completo' : `Pré-visualização gratuita · ${asset.previewPages} de ${asset.totalPages} páginas`}
            </span>
            <h1 className="mt-2 font-display text-3xl font-medium text-ink md:text-4xl">
              {asset.title}
            </h1>
          </div>
          {siblings.length > 1 ? (
            <nav className="flex gap-1 rounded-full bg-white p-1 shadow-soft" aria-label="Documentos">
              {siblings.map((s) => (
                <Link
                  key={s.id}
                  href={`${readerPath}?doc=${s.doc}`}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium',
                    s.id === asset.id ? 'bg-forest text-white' : 'text-forest hover:bg-forest/5',
                  )}
                >
                  {s.doc === 'workbook' ? 'Workbook' : 'Guia'}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="mt-8">
          <PdfViewer
            key={asset.id + String(hasAccess)}
            src={hasAccess ? `/api/content/${asset.id}` : asset.previewPath}
            title={asset.title}
          />
        </div>

        {hasAccess ? null : (
          <Paywall locale={locale} asset={asset} signedIn={Boolean(session)} next={`${readerPath}?doc=${asset.doc}`} />
        )}
      </div>
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
      className="mx-auto mt-10 max-w-4xl rounded-3xl border border-forest/10 bg-white p-6 shadow-soft sm:p-10"
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
