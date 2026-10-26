import Link from 'next/link';
import { ArrowUpRight, BookOpen, Heart, NotebookPen } from 'lucide-react';

const editorialVolumes = [
  {
    code: 'P01',
    title: '7 Dias Para Me Escolher',
    subtitle: 'Uma leitura para começar por si',
    href: 'https://espelho.lia.doctor/7-dias-para-me-escolher',
  },
  {
    code: 'P02',
    title: 'Eu Sou Bela — Do Meu Jeito',
    subtitle: 'Expressão pessoal e identidade',
    href: 'https://espelho.lia.doctor/eu-sou-bela-do-meu-jeito',
  },
  {
    code: 'P03',
    title: '21 Dias — Meu Melhor Reflexo',
    subtitle: 'Reflexão ao seu ritmo',
    href: 'https://espelho.lia.doctor/21-dias-meu-melhor-reflexo',
  },
  {
    code: 'P04',
    title: 'Recomeçar Depois dos 40',
    subtitle: 'Novos capítulos e possibilidades',
    href: 'https://espelho.lia.doctor/recomecar-depois-dos-40',
  },
  {
    code: 'P05',
    title: 'Diário de Amor-Próprio',
    subtitle: '30 encontros consigo mesma',
    href: 'https://espelho.lia.doctor/diario-de-amor-proprio',
  },
] as const;

/**
 * Cross-brand editorial showcase. EspelhoMeu sales, checkout, members and
 * entitlements remain exclusively on espelho.lia.doctor in Phase 1.
 */
export function EspelhoMeuSection() {
  return (
    <section id="espelhomeu" aria-labelledby="espelhomeu-heading" className="border-t border-[#83452D]/10 bg-[#F8F1E9] py-16 md:py-20">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.19em] text-[#83452D]">
              <Heart aria-hidden className="h-4 w-4" />
              Outra coleção do nosso ecossistema editorial
            </span>
            <h2 id="espelhomeu-heading" className="mt-4 font-display text-[clamp(2.1rem,4.5vw,3.7rem)] font-medium leading-tight text-[#65301E]">
              EspelhoMeu — Biblioteca de Leituras
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#61493B]">
              Cinco livros digitais com leituras, cadernos e atividades de reflexão
              sobre escolhas, expressão pessoal, amor-próprio e novos começos.
              Encontre a próxima leitura no seu ritmo.
            </p>
            <p className="mt-3 text-sm text-[#755345]">
              O EspelhoMeu mantém a sua própria loja, checkout e área de membros.
              O acesso LeveLab não inclui automaticamente estes títulos.
            </p>
          </div>
          <a
            href="https://espelho.lia.doctor/colecao"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#83452D] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#65301E]"
          >
            Conhecer a coleção completa <ArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {editorialVolumes.map((volume) => (
            <article key={volume.code} className="flex min-h-[250px] flex-col rounded-3xl border border-[#D9C5B6] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold tracking-[0.12em] text-[#83452D]">
                <span>{volume.code}</span>
                <BookOpen aria-hidden className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl leading-snug text-[#65301E]">
                {volume.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#755345]">{volume.subtitle}</p>
              <a href={volume.href} className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-[#83452D] hover:underline">
                Ver livro no EspelhoMeu <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#D9C5B6] bg-white/70 p-5 text-sm text-[#61493B]">
          <NotebookPen aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#83452D]" />
          <p>
            Cada compra e os seus materiais complementares são geridos pela loja onde
            o produto foi adquirido. A integração entre bibliotecas ficará para a
            segunda fase.
          </p>
        </div>
      </div>
    </section>
  );
}
