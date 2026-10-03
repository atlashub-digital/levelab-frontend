import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { BookOpen, Lock, Sparkles, LogOut, MessageCircle } from 'lucide-react';
import { getSession } from '@/lib/supabase/server';
import { getLibrary, getMe } from '@/lib/levelab-api';
import { libraryAssets } from '@/lib/content/library';
import { isLocale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'A minha área · LeveLab',
  robots: { index: false },
};

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const session = await getSession();
  if (!session) redirect(`/${locale}/entrar?next=/${locale}/conta`);

  const [me, library] = await Promise.all([
    getMe(session.accessToken),
    getLibrary(session.accessToken),
  ]);
  const access = new Map(library?.map((item) => [item.id, item.hasAccess]) ?? []);
  const keys = me?.access.keys ?? [];
  const plan = keys.includes('premium')
    ? 'LeveLab Premium'
    : keys.includes('levelab-plus')
      ? 'LeveLab+'
      : 'Conta gratuita';

  return (
    <section className="shell py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow">Área de membros</span>
          <h1 className="mt-2 font-display text-4xl font-medium text-ink">A minha biblioteca</h1>
          <p className="mt-2 text-muted">
            {session.email} ·{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-forest">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> {plan}
            </span>
          </p>
        </div>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-forest/15 px-4 text-sm font-medium text-forest hover:bg-forest/5"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </form>
      </div>

      {library === null ? (
        <p role="alert" className="mt-8 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
          Não conseguimos carregar a sua biblioteca agora. Tente novamente daqui a pouco.
        </p>
      ) : null}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {libraryAssets.map((asset) => {
          const open = access.get(asset.id) ?? false;
          return (
            <Link
              key={asset.id}
              href={`/${locale}/programas/${asset.product}/reader?doc=${asset.doc}`}
              className={cn(
                'group flex flex-col rounded-3xl border bg-white p-6 shadow-soft transition-all hover:shadow-lift',
                open ? 'border-forest/15' : 'border-forest/5',
              )}
            >
              <span
                className={cn(
                  'inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
                  open ? 'bg-sage text-forest' : 'bg-cream text-muted',
                )}
              >
                {open ? <BookOpen className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                {open ? 'Disponível' : 'Pré-visualização'}
              </span>
              <h2 className="mt-4 font-display text-xl text-ink">{asset.title}</h2>
              <p className="mt-1 text-sm text-muted">
                {open
                  ? `${asset.totalPages} páginas`
                  : `${asset.previewPages} páginas gratuitas de ${asset.totalPages}`}
              </p>
              <span className="mt-6 text-sm font-semibold text-forest group-hover:underline">
                {open ? 'Ler agora →' : 'Ver e desbloquear →'}
              </span>
            </Link>
          );
        })}
      </div>

      {keys.includes('levelab-plus') ? (
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-gradient-forest p-6 text-white">
          <div>
            <p className="font-display text-xl">A LIA está consigo</p>
            <p className="text-sm text-white/80">
              O seu acesso LeveLab+ inclui acompanhamento com a LIA.
            </p>
          </div>
          <Link
            href={`/${locale}/lia`}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-forest"
          >
            <MessageCircle className="h-4 w-4" /> Falar com a LIA
          </Link>
        </div>
      ) : null}
    </section>
  );
}
