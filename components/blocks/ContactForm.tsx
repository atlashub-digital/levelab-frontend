'use client';

import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'submitting' | 'success';

/**
 * Contact form — frontend demo only.
 * Mock submit with a success state. A future /api/contact route
 * will wire this to email/CRM. No health data is collected here.
 */
export function ContactForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting' || status === 'success') return;
    setStatus('submitting');
    // Mock async — simulate network latency.
    await new Promise((r) => setTimeout(r, 700));
    setStatus('success');
  }

  function handleReset() {
    setForm({ name: '', email: '', message: '' });
    setStatus('idle');
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-forest/10 bg-white p-8 text-center shadow-soft">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage text-forest">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-2xl font-medium text-ink">
          Mensagem registada
        </h3>
        <p className="mt-2 text-sm text-muted">
          Obrigado, {form.name.split(' ')[0] || 'tudo bem'}. Esta é uma
          demonstração de frontend — nenhuma mensagem foi realmente enviada.
          Quando o backend estiver pronto, a equipe comercial receberá a sua
          mensagem e responderá por email.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={handleReset} variant="secondary" size="sm">
            Enviar outra mensagem
          </Button>
        </div>
      </div>
    );
  }

  const fieldCls =
    'h-12 w-full rounded-2xl border border-forest/15 bg-white px-4 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-forest/50 focus:outline-none focus:ring-2 focus:ring-forest/15';
  const labelCls =
    'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-forest-2';

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-forest/10 bg-white p-6 shadow-soft md:p-8"
      noValidate
    >
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className={labelCls}>
            Nome
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Como podemos chamar por si?"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="o.seu@email.com"
            className={fieldCls}
          />
        </div>
        <div>
          <label htmlFor="message" className={labelCls}>
            Mensagem
          </label>
          <textarea
            id="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder="Conte-nos o seu momento ou a sua dúvida. Não partilhe dados clínicos aqui."
            className={cn(
              fieldCls,
              'h-auto min-h-[140px] resize-y py-3 leading-relaxed',
            )}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button
            type="submit"
            size="md"
            disabled={status === 'submitting'}
          >
            <Send className="h-4 w-4" />
            {status === 'submitting' ? 'A enviar...' : 'Enviar mensagem'}
          </Button>
          <p className="text-[11px] text-muted">
            Demonstração de frontend — sem backend neste momento.
          </p>
        </div>
      </div>
    </form>
  );
}
