'use client';

import { useState } from 'react';
import { Mail, KeyRound, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

type Mode = 'link' | 'password';

export function SignInForm({ next }: { next: string }) {
  const [mode, setMode] = useState<Mode>('link');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();

    if (mode === 'link') {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      setBusy(false);
      if (error) setError('Não foi possível enviar o link. Verifique o email e tente de novo.');
      else setSent(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (error) setError('Email ou password incorretos.');
    else window.location.assign(next);
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-forest/10 bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-10 w-10 text-forest" />
        <h2 className="mt-4 font-display text-2xl text-ink">Verifique o seu email</h2>
        <p className="mt-2 text-muted">
          Enviámos um link de acesso para <strong className="text-ink">{email}</strong>. Abra-o
          neste dispositivo para entrar.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-medium text-forest underline-offset-4 hover:underline"
        >
          Usar outro email
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="grid grid-cols-2 gap-1 rounded-full bg-cream/60 p-1 text-sm font-medium">
        {(
          [
            ['link', 'Link por email'],
            ['password', 'Email e password'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={cn(
              'h-10 rounded-full transition-colors',
              mode === value ? 'bg-forest text-white' : 'text-forest hover:bg-forest/5',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <label className="mt-6 block text-sm font-medium text-ink" htmlFor="email">
        Email
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-full border border-forest/15 px-4 focus-within:border-forest/40">
        <Mail className="h-4 w-4 text-muted" />
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 flex-1 bg-transparent text-ink focus:outline-none"
          placeholder="o.seu@email.com"
        />
      </div>

      {mode === 'password' ? (
        <>
          <label className="mt-4 block text-sm font-medium text-ink" htmlFor="password">
            Password
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-full border border-forest/15 px-4 focus-within:border-forest/40">
            <KeyRound className="h-4 w-4 text-muted" />
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 flex-1 bg-transparent text-ink focus:outline-none"
            />
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm text-muted">
          Sem password: enviamos um link seguro para o seu email.
        </p>
      )}

      {error ? (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-forest text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-forest-2 disabled:opacity-50"
      >
        {busy ? 'Um momento…' : mode === 'link' ? 'Enviar link de acesso' : 'Entrar'}
      </button>
    </form>
  );
}
