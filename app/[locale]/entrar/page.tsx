import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { SignInForm } from '@/components/auth/SignInForm';
import { getSession } from '@/lib/supabase/server';
import { isLocale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Entrar · LeveLab',
  description: 'Aceda à sua área de membros LeveLab: guias, workbooks e LIA.',
  robots: { index: false },
};

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string; erro?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { next, erro } = await searchParams;
  const target = next && next.startsWith('/') && !next.startsWith('//') ? next : `/${locale}/conta`;

  if (await getSession()) redirect(target);

  return (
    <section className="shell grid min-h-[70vh] items-center py-16">
      <div className="mx-auto w-full max-w-md">
        <span className="eyebrow">Área de membros</span>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight text-ink">
          Entrar na LeveLab
        </h1>
        <p className="mt-3 text-muted">
          Use o mesmo email da sua compra para aceder aos seus guias e à LIA.
        </p>
        {erro === 'link' ? (
          <p role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
            O link expirou ou já foi usado. Peça um novo abaixo.
          </p>
        ) : null}
        <div className="mt-8">
          <SignInForm next={target} />
        </div>
      </div>
    </section>
  );
}
