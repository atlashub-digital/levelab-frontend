'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { WhatsAppCTA } from '@/components/blocks/WhatsAppCTA';
import { ProductCard } from '@/components/blocks/ProductCard';
import { products } from '@/lib/content/store';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/lib/i18n';

type StepId =
  | 'objective'
  | 'difficulty'
  | 'routine'
  | 'support'
  | 'channel'
  | 'name'
  | 'consent';

type Option = {
  id: string;
  label: string;
  desc?: string;
};

type Step = {
  id: StepId;
  question: string;
  helper?: string;
  options?: Option[];
  input?: 'text' | 'consent';
  placeholder?: string;
};

const STEPS: Step[] = [
  {
    id: 'objective',
    question: 'Qual é o seu principal objetivo agora?',
    helper: 'Sem compromisso. Sem promessas clínicas.',
    options: [
      { id: 'organizar-rotina', label: 'Organizar minha rotina' },
      { id: 'mais-disposicao', label: 'Ter mais disposição' },
      { id: 'voltar-cuidar', label: 'Voltar a me cuidar' },
      { id: 'sono-descanso', label: 'Dormir e descansar melhor' },
      { id: 'outro', label: 'Outro' },
    ],
  },
  {
    id: 'difficulty',
    question: 'O que tem sido mais difícil na rotina?',
    options: [
      { id: 'tempo', label: 'Falta de tempo' },
      { id: 'constancia', label: 'Falta de constância' },
      { id: 'sono', label: 'Sono e recuperação' },
      { id: 'alimentacao', label: 'Organização das refeições' },
      { id: 'movimento', label: 'Movimento no dia' },
      { id: 'sozinho', label: 'Fazer tudo sozinho' },
    ],
  },
  {
    id: 'routine',
    question: 'Como descreveria a sua rotina hoje?',
    options: [
      { id: 'calma', label: 'Calma e organizada' },
      { id: 'estruturada', label: 'Estruturada, mas intensa' },
      { id: 'caotica', label: 'Caótica' },
      { id: 'em-construcao', label: 'Em construção' },
    ],
  },
  {
    id: 'support',
    question: 'Que tipo de acompanhamento prefere?',
    options: [
      { id: 'lia', label: 'Conversas com a LIA' },
      { id: 'lia-humano', label: 'LIA + apoio humano' },
      { id: 'humano', label: 'Só apoio humano' },
      { id: 'conteudo', label: 'Conteúdo para ler no meu tempo' },
    ],
  },
  {
    id: 'channel',
    question: 'Onde prefere continuar a conversa?',
    options: [
      { id: 'web', label: 'Aqui no site' },
      { id: 'whatsapp', label: 'WhatsApp' },
      { id: 'mobile', label: 'Aplicativo (no futuro)' },
    ],
  },
  {
    id: 'name',
    input: 'text',
    question: 'Como podemos chamar por si?',
    helper: 'Apenas o primeiro nome — para a conversa ficar mais humana.',
    placeholder: 'O seu primeiro nome',
  },
  {
    id: 'consent',
    input: 'consent',
    question: 'Quer ser contactado pela equipa?',
    helper:
      'Pode partilhar WhatsApp ou email. Esta é uma demonstração de frontend — nada é enviado agora.',
    placeholder: 'WhatsApp ou email (opcional)',
  },
];

type Attribution = {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  landing_variant?: string | null;
};

const ATTR_KEYS: (keyof Attribution)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'landing_variant',
];

/**
 * Assessment funnel — frontend demo.
 * - NO clinical scoring, NO weight-loss promises, NO medication language.
 * - Step answers live ONLY in component state — never in localStorage.
 * - UTM attribution params are non-sensitive and DO get persisted to
 *   localStorage under `levelab.attribution`.
 * - A future backend (/api/assessment) will receive the final payload.
 */
export function AssessmentFunnel({ locale }: { locale: Locale }) {
  const total = STEPS.length;
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<StepId, string>>({
    objective: '',
    difficulty: '',
    routine: '',
    support: '',
    channel: '',
    name: '',
    consent: '',
  });
  const [attribution, setAttribution] = useState<Attribution>({});
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Read UTM/landing params on mount and persist non-sensitive attribution.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const next: Attribution = {};
    for (const k of ATTR_KEYS) {
      const v = params.get(k);
      if (v) next[k] = v;
    }
    setAttribution(next);
    try {
      if (Object.keys(next).length > 0) {
        const prevRaw = window.localStorage.getItem('levelab.attribution');
        const prev = prevRaw ? (JSON.parse(prevRaw) as Attribution) : {};
        const merged = { ...prev, ...next };
        window.localStorage.setItem(
          'levelab.attribution',
          JSON.stringify(merged),
        );
      }
    } catch {
      // localStorage unavailable — silently ignore (no health data is involved).
    }
  }, []);

  const step = STEPS[stepIdx];
  const isResult = submitted;
  const progress = isResult ? 100 : Math.round((stepIdx / total) * 100);

  function canAdvance(): boolean {
    if (!step) return false;
    if (step.input === 'text') return answers[step.id].trim().length > 0;
    if (step.input === 'consent') return agreed;
    return Boolean(answers[step.id]);
  }

  function next() {
    if (!canAdvance()) return;
    if (stepIdx === total - 1) {
      setSubmitted(true);
      return;
    }
    setStepIdx((i) => Math.min(i + 1, total - 1));
  }

  function back() {
    if (stepIdx === 0) return;
    setStepIdx((i) => Math.max(i - 1, 0));
  }

  function selectOption(optId: string) {
    if (!step) return;
    setAnswers((prev) => ({ ...prev, [step.id]: optId }));
  }

  function writeText(value: string) {
    if (!step) return;
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
  }

  return (
    <div className="relative">
      {/* Demo notice */}
      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-forest/10 bg-cream/50 px-4 py-2 text-[11px] text-muted">
        <ShieldCheck className="h-3.5 w-3.5 text-forest-2" />
        Demonstração de frontend — nenhuma resposta é enviada a backend.
        Perguntas educativas, sem valor clínico.
      </div>

      {!isResult ? (
        <FunnelCard
          stepIdx={stepIdx}
          total={total}
          progress={progress}
          question={step.question}
          helper={step.helper}
          canAdvance={canAdvance()}
          onBack={back}
          onNext={next}
        >
          {step.options ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {step.options.map((opt) => {
                const selected = answers[step.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectOption(opt.id)}
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:shadow-soft',
                      selected
                        ? 'border-forest bg-forest/[0.04] shadow-soft'
                        : 'border-forest/15 bg-white',
                    )}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={cn(
                        'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                        selected
                          ? 'border-forest bg-forest text-white'
                          : 'border-forest/30 text-transparent',
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                  </button>
                );
              })}
            </div>
          ) : step.input === 'text' ? (
            <input
              type="text"
              autoFocus
              value={answers[step.id]}
              onChange={(e) => writeText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && canAdvance()) next();
              }}
              placeholder={step.placeholder}
              className="h-12 w-full rounded-2xl border border-forest/15 bg-white px-4 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-forest/50 focus:outline-none focus:ring-2 focus:ring-forest/15"
            />
          ) : step.input === 'consent' ? (
            <ConsentInput
              value={answers.consent}
              onChange={writeText}
              placeholder={step.placeholder}
              agreed={agreed}
              onAgreedChange={setAgreed}
            />
          ) : null}
        </FunnelCard>
      ) : (
        <ResultCard
          answers={answers}
          attribution={attribution}
          locale={locale}
        />
      )}
    </div>
  );
}

function FunnelCard({
  stepIdx,
  total,
  progress,
  question,
  helper,
  canAdvance,
  onBack,
  onNext,
  children,
}: {
  stepIdx: number;
  total: number;
  progress: number;
  question: string;
  helper?: string;
  canAdvance: boolean;
  onBack: () => void;
  onNext: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-card">
      {/* Progress bar */}
      <div className="border-b border-forest/10 bg-cream/50">
        <div className="flex items-center justify-between px-6 py-3 text-xs font-semibold uppercase tracking-wider text-forest-2">
          <span>
            Passo {stepIdx + 1} de {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-forest/10">
          <div
            className="h-full bg-gradient-forest transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-6 md:p-10">
        <h2 className="text-balance font-display text-[clamp(1.5rem,3vw,2.2rem)] font-medium leading-tight text-ink">
          {question}
        </h2>
        {helper ? (
          <p className="mt-2 text-sm text-muted">{helper}</p>
        ) : null}

        <div className="mt-6">{children}</div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onBack}
            disabled={stepIdx === 0}
            className={stepIdx === 0 ? 'opacity-0' : ''}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button
            type="button"
            size="md"
            onClick={onNext}
            disabled={!canAdvance}
          >
            {stepIdx === total - 1 ? 'Ver resultado' : 'Continuar'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ConsentInput({
  value,
  onChange,
  placeholder,
  agreed,
  onAgreedChange,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  agreed: boolean;
  onAgreedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-forest/15 bg-white px-4 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-forest/50 focus:outline-none focus:ring-2 focus:ring-forest/15"
      />
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-forest/15 bg-white p-4 text-sm text-ink">
        <span
          className={cn(
            'mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors',
            agreed
              ? 'border-forest bg-forest text-white'
              : 'border-forest/30 text-transparent',
          )}
        >
          <Check className="h-3 w-3" />
        </span>
        <input
          type="checkbox"
          className="sr-only"
          checked={agreed}
          onChange={(e) => onAgreedChange(e.target.checked)}
        />
        <span className="leading-relaxed">
          Entendo que esta é uma demonstração de frontend. Quando o backend
          existir, autorizo a equipa comercial a entrar em contacto — apenas
          com fins comerciais. Nenhum dado de saúde é recolhido aqui.
        </span>
      </label>
      {agreed ? null : (
        <p className="text-[11px] text-muted">
          Marque a caixa para concluir o resumo.
        </p>
      )}
    </div>
  );
}

function ResultCard({
  answers,
  attribution,
  locale,
}: {
  answers: Record<StepId, string>;
  attribution: Attribution;
  locale: Locale;
}) {
  const firstName = answers.name.trim().split(' ')[0] || 'Olá';
  const reco = useMemo(() => recommend(answers), [answers]);

  const originParts = ATTR_KEYS
    .map((k) => attribution[k])
    .filter(Boolean) as string[];
  const origin = originParts.length > 0 ? originParts.join(' · ') : 'direto';

  return (
    <div className="overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-card">
      <div className="relative overflow-hidden bg-gradient-forest p-6 text-ivory md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.1] [background:radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:18px_18px]"
        />
        <div className="relative">
          <Badge variant="gold">Resumo</Badge>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium leading-tight">
            {firstName}, o seu ponto de entrada sugerido:
          </h2>
          <p className="mt-3 max-w-xl text-ivory/85">{reco.headline}</p>
        </div>
      </div>

      <div className="p-6 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          {/* Profile summary */}
          <div className="rounded-2xl border border-forest/10 bg-cream/40 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
              Perfil (apenas indicativo)
            </p>
            <dl className="mt-4 flex flex-col gap-2.5 text-sm">
              <SummaryRow label="Objetivo" value={labelFor('objective', answers.objective)} />
              <SummaryRow label="Dificuldade" value={labelFor('difficulty', answers.difficulty)} />
              <SummaryRow label="Rotina" value={labelFor('routine', answers.routine)} />
              <SummaryRow label="Acompanhamento" value={labelFor('support', answers.support)} />
              <SummaryRow label="Canal" value={labelFor('channel', answers.channel)} />
              <SummaryRow label="Origem" value={origin} />
            </dl>
            <p className="mt-4 text-[11px] text-muted">
              Este perfil é educativo e não clínico. Não gera diagnóstico nem
              prescrição. Apenas ajuda a sugerir um ponto de entrada na LeveLab.
            </p>
          </div>

          {/* Recommendation */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-forest/10 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest-2">
                Recomendado para si
              </p>
              <p className="mt-2 font-display text-xl font-medium text-ink">
                {reco.entry}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {reco.reason}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href={`/${locale}/lia`} variant="primary">
                <Sparkles className="h-4 w-4" />
                Conversar com a LIA
              </Button>
              <WhatsAppCTA
                phone={siteConfig.liaWhatsappNumber}
                text="Olá! Acabei de fazer a avaliação LeveLab e quero continuar."
                variant="gold"
              >
                Continuar no WhatsApp
              </WhatsAppCTA>
            </div>
            <p className="text-[11px] text-muted">
              Continuar não envia os seus dados agora — é uma demonstração. A
              LIA conversa no modo visitante, sem memória persistente.
            </p>
          </div>
        </div>

        {/* Optional product card */}
        <div className="mt-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-forest-2">
            Programa em destaque
          </p>
          <div className="mx-auto max-w-md">
            <ProductCard product={products[0]} locale={locale} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-forest/10 pt-6">
          <Link
            href={`/${locale}/contato`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline"
          >
            <Send className="h-3.5 w-3.5" />
            Preferir falar com a Ana?
          </Link>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:underline"
          >
            Voltar ao início
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}

function labelFor(stepId: StepId, value: string): string {
  if (!value) return '—';
  const step = STEPS.find((s) => s.id === stepId);
  if (!step || !step.options) return value;
  const opt = step.options.find((o) => o.id === value);
  return opt ? opt.label : value;
}

type Recommendation = {
  entry: string;
  reason: string;
  headline: string;
};

function recommend(answers: Record<StepId, string>): Recommendation {
  const { objective, difficulty, support, channel } = answers;

  // Heuristic — strictly educational, non-clinical.
  if (support === 'humano' || channel === 'whatsapp') {
    return {
      entry: 'Falar com a Ana',
      reason:
        'Pelo seu perfil, o apoio humano é o melhor começo. A Ana esclarece dúvidas comerciais e ajuda a montar o seu plano de entrada na LeveLab.',
      headline:
        'Que tal começar com uma conversa humana com a Ana? Ela ajuda a montar o seu ponto de entrada.',
    };
  }
  if (difficulty === 'alimentacao' || objective === 'organizar-rotina') {
    return {
      entry: 'Força na Caneta · Guia de 7 dias',
      reason:
        'Para olhar para o apetite e a organização das refeições com clareza — em 7 dias práticos e calmos.',
      headline:
        'Para organizar refeições e rotina, o guia Força na Caneta (7 dias) é um começo leve e prático.',
    };
  }
  if (support === 'conteudo') {
    return {
      entry: 'Conteúdos LeveLab',
      reason:
        'Pelo seu perfil, prefere avançar no seu ritmo — os programas e guias da LeveLab são ideais para acompanhar no seu tempo.',
      headline:
        'Prefere ler no seu tempo? Os conteúdos LeveLab são o ponto de entrada ideal.',
    };
  }
  // Default — LIA + Corpo Forte.
  return {
    entry: 'Conversar com a LIA',
    reason:
      'A LIA ajuda a montar pequenos hábitos, organizar a rotina e encontrar o próximo passo — sempre educativa, nunca clínica.',
    headline:
      'A LIA é a próxima conversa — ela ajuda a montar pequenos hábitos e a escolher o programa ideal.',
  };
}
