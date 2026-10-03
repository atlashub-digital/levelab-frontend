'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

/** Real opt-in: posts to /api/newsletter (→ LeveLab backend, consent recorded). */
export function NewsletterForm({
  locale,
  labels,
}: {
  locale: string;
  labels: { placeholder: string; consent: string; cta: string; ok: string; error: string };
}) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('busy');
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), consent, locale }),
    }).catch(() => null);
    setState(res?.ok ? 'ok' : 'error');
  }

  if (state === 'ok') {
    return (
      <p role="status" className="mt-6 flex items-center gap-2 text-sm font-medium text-forest">
        <CheckCircle2 className="h-5 w-5" /> {labels.ok}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          {labels.placeholder}
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.placeholder}
          className="h-12 flex-1 rounded-md border border-forest/20 bg-ivory px-4 text-[15px] text-ink placeholder:text-muted focus:border-forest/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === 'busy' || !consent}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-forest px-6 text-[15px] font-semibold text-ivory transition-colors hover:bg-forest-2 disabled:opacity-50"
        >
          {labels.cta} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-ink/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-forest"
          required
        />
        {labels.consent}
      </label>
      {state === 'error' ? (
        <p role="alert" className="mt-3 text-sm text-red-800">
          {labels.error}
        </p>
      ) : null}
    </form>
  );
}
