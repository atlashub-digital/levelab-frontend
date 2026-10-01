import { notFound } from 'next/navigation';
import { SiteNav } from '@/components/SiteNav';
import { isLocale } from '@/lib/i18n';

export default async function Assessment({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <SiteNav locale={locale} />
      <main className="shell section">
        <div className="eyebrow">Avaliação inicial</div>
        <h1 style={{ maxWidth: 850 }}>Vamos entender o que faria sua rotina ficar mais leve?</h1>
        <p className="lead">Em poucos passos, conte seu objetivo e as principais dificuldades. A próxima etapa será personalizada a partir das suas respostas.</p>
        <div className="lia-card" style={{ marginTop: 34, maxWidth: 760 }}>
          <strong>Etapa 1 de 5</strong>
          <h2 style={{ fontSize: 32, marginTop: 16 }}>Qual é seu principal objetivo agora?</h2>
          <div className="actions">
            <button className="button secondary">Organizar minha rotina</button>
            <button className="button secondary">Controle de peso</button>
            <button className="button secondary">Ter mais disposição</button>
            <button className="button secondary">Voltar a me cuidar</button>
          </div>
        </div>
      </main>
    </>
  );
}
