import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/SiteNav';
import { isLocale } from '@/lib/i18n';

export default async function LiaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="chat-page">
      <SiteNav locale={locale} />
      <div className="chat-layout">
        <aside className="chat-sidebar">
          <div className="eyebrow">LIA • modo teste</div>
          <h3>Nova conversa</h3>
          <p style={{ color: 'var(--muted)', lineHeight: 1.5 }}>
            A experiência pública usa memória curta e ferramentas limitadas.
          </p>
          <hr style={{ border: 0, borderTop: '1px solid rgba(21,61,49,.12)', margin: '24px 0' }} />
          <Link href={`/${locale}/avaliacao`}>Fazer avaliação</Link>
        </aside>

        <main className="chat-main">
          <div className="chat-stream">
            <div className="chat-head">
              <div className="avatar">LIA</div>
              <div>
                <strong>LIA</strong><br />
                <small><span className="status" />Assistente virtual de bem-estar</small>
              </div>
            </div>

            <div className="chat">
              <div className="bubble">
                Oi! Eu sou a LIA 🌿 Podemos conversar sobre sua rotina, alimentação geral, movimento, sono e bem-estar. Quer começar me contando o que você gostaria de mudar primeiro?
              </div>
            </div>
          </div>

          <div className="chat-composer-wrap">
            <div className="chat-composer-pro">
              <button className="icon-button" aria-label="Adicionar imagem">＋</button>
              <button className="icon-button" aria-label="Gravar áudio">🎙</button>
              <input aria-label="Mensagem para LIA" placeholder="Converse com a LIA…" />
              <button className="button">Enviar</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
