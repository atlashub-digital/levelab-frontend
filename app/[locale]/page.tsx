import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/SiteNav';
import { copy, isLocale } from '@/lib/i18n';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];

  return (
    <>
      <SiteNav locale={locale} />
      <main>
        <section className="shell hero">
          <div>
            <div className="eyebrow">LeveLab Care • acompanhamento diário</div>
            <h1>{t.hero}</h1>
            <p className="lead">{t.lead}</p>
            <div className="actions">
              <Link className="button" href={`/${locale}/avaliacao`}>{t.primary}</Link>
              <Link className="button secondary" href={`/${locale}/lia`}>{t.secondary}</Link>
            </div>
          </div>

          <div className="lia-card" aria-label="Prévia da LIA">
            <div className="chat-head">
              <div className="avatar">LIA</div>
              <div>
                <strong>LIA</strong><br />
                <small><span className="status" />Assistente virtual LeveLab</small>
              </div>
            </div>
            <div className="chat">
              <div className="bubble">Oi 🌿 Eu sou a LIA. Posso ajudar você a organizar sua rotina e acompanhar sua jornada um dia de cada vez.</div>
              <div className="bubble user">Hoje tenho pouco tempo. Por onde começo?</div>
              <div className="bubble">Vamos simplificar. Posso montar um plano curto para alimentação, hidratação e 10 minutos de movimento. Como está sua energia de 0 a 10?</div>
            </div>
            <div className="composer">Escreva uma mensagem, envie áudio ou imagem…</div>
          </div>
        </section>

        <section id="como-funciona" className="section shell">
          <div className="eyebrow">Como funciona</div>
          <h2>Da primeira conversa à rotina que cabe na vida real.</h2>
          <div className="grid4">
            <article className="tile"><strong>1. Conhecer você</strong><p>Uma avaliação inicial e uma conversa simples sobre objetivos, rotina e preferências.</p></article>
            <article className="tile"><strong>2. Começar pequeno</strong><p>Plano de primeiros passos com foco em consistência, não perfeição.</p></article>
            <article className="tile"><strong>3. Acompanhar</strong><p>LIA acompanha check-ins, progresso, conteúdos e retomadas durante a jornada.</p></article>
            <article className="tile"><strong>4. Apoio humano</strong><p>Quando necessário, a conversa pode passar para Ana Gomes ou para o profissional adequado.</p></article>
          </div>
        </section>

        <section id="jornadas" className="section shell">
          <div className="eyebrow">Jornadas LeveLab</div>
          <h2>7 dias para começar. 21 para estruturar. 365 para continuar.</h2>
          <div className="grid4">
            <article className="tile"><strong>Leve 7</strong><p>Organização inicial de água, refeições, sono e movimento.</p></article>
            <article className="tile"><strong>Reset 21</strong><p>Construção guiada de hábitos durante 21 dias.</p></article>
            <article className="tile"><strong>Leve 90</strong><p>Consolidação e progressão da rotina.</p></article>
            <article className="tile"><strong>Leve 365</strong><p>Acompanhamento contínuo e assinatura anual.</p></article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-row">
          <div><strong>LeveLabCare</strong><br />uma marca do Grupo MTX Farma</div>
          <div>Privacidade • Termos • Cookies • Avisos de Saúde • Transparência da IA</div>
        </div>
      </footer>
    </>
  );
}
