'use client';

import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // V1: local only. Backend capture arrives in the next pass.
    setDone(true);
  }

  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-forest/10 bg-gradient-forest px-6 py-12 text-ivory shadow-card md:px-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12] [background:radial-gradient(rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:22px_22px]"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                Newsletter
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight">
                Receba o ritmo certo para a sua semana.
              </h2>
              <p className="mt-3 max-w-md text-ivory/80">
                Conteúdo educativo, novidades dos programas e o caminho da LIA — com calma, sem
                ruído.
              </p>
            </div>
            <div>
              {done ? (
                <div className="flex items-center gap-3 rounded-2xl border border-ivory/20 bg-ivory/10 px-5 py-4 text-ivory">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink">
                    <Check className="h-5 w-5" />
                  </span>
                  <p className="text-sm">
                    Obrigado! Vamos guardar o seu e-mail e voltaremos com calma.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="news-email" className="sr-only">
                    E-mail
                  </label>
                  <div className="flex flex-1 items-center gap-2 rounded-full border border-ivory/25 bg-ivory/10 px-4">
                    <Mail className="h-4 w-4 text-ivory/70" />
                    <input
                      id="news-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="O seu e-mail"
                      className="h-12 flex-1 bg-transparent text-sm text-ivory placeholder:text-ivory/60 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-gold px-6 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
                  >
                    Subscrever
                  </button>
                </form>
              )}
              <p className="mt-3 text-[11px] text-ivory/60">
                Sem spam. Pode cancelar a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
