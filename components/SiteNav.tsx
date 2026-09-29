import Link from 'next/link';

export function SiteNav({ locale }: { locale: string }) {
  return (
    <header className="shell nav">
      <Link href={`/${locale}`} className="brand">LeveLab<span>Care</span></Link>
      <nav className="navlinks" aria-label="Navegação principal">
        <Link href={`/${locale}#como-funciona`}>Como funciona</Link>
        <Link href={`/${locale}#jornadas`}>Jornadas</Link>
        <Link href={`/${locale}/lia`}>LIA</Link>
        <Link href={`/${locale}#sobre`}>Sobre</Link>
      </nav>
      <Link className="button" href={`/${locale}/avaliacao`}>Avaliação</Link>
    </header>
  );
}
