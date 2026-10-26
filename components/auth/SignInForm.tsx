'use client';

import { useState } from 'react';
import { Mail, KeyRound, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

// Email OTP code is opt-in: requires a verified Supabase template/Resend delivery.
const emailCodeEnabled = process.env.NEXT_PUBLIC_LEVELAB_EMAIL_OTP_CODE_ENABLED === 'true';
type Mode = 'link' | 'password';

export function SignInForm({ next }: { next: string }) {
  const [mode, setMode] = useState<Mode>('link');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
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

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    if (!emailCodeEnabled || !/^\\d{6,8}$/.test(code.trim())) {
      setError('Introduza o código de 6 a 8 dígitos enviado por email.');
      return;
    }
    setBusy(true);
    setError(null);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: 'email',
    });
    setBusy(false);
    if (error) setError('Código inválido ou expirado. Peça um novo código e tente novamente.');
    else window.location.assign(next);
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-forest/10 bg-white p-8 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-10 w-10 text-forest" />
        <h2 className="mt-4 font-display text-2xl text-ink">Verifique o seu email</h2>
        <p className="mt-2 text-muted">
          Enviámos um link de acesso para <strong className="text-ink">{email}</strong>. Abra-o
          neste dispositivo para entrar. Se tiver recebido também um código,
          pode introduzi-lo abaixo.
        </p>
        {emailCodeEnabled ? (
          <form onSubmit={verifyCode} className="mt-6 text-left">
            <label htmlFor="email-otp-code" className="block text-sm font-semibold text-ink">
              Código de acesso recebido por email
            </label>
            <input
              id="email-otp-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6,8}"
              minLength={6}
              maxLength={8}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="000000"
              className="mt-2 h-12 w-full rounded-xl border border-forest/20 bg-cream/30 px-4 text-ink focus:border-forest focus:outline-none"
            />
            {error ? <p role="alert" className="mt-2 text-sm text-red-700">{error}</p> : null}
            <button type="submit" disabled={busy} className="mt-4 h-12 w-full rounded-full bg-forest font-semibold text-white disabled:opacity-50">
              {busy ? 'A verificar…' : 'Validar código e entrar'}
            </button>
          </form>
        ) : null}
        <button
          type="button"
          onClick={() => { setSent(false); setCode(''); setError(null); }}
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
          Sem senha: enviamos um link seguro para o seu email. O acesso por código fica disponível após a configuração do serviço de envio.
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
