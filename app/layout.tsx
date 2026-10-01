import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LeveLab — Bem-estar acompanhado',
  description: 'Acompanhamento de rotina, bem-estar e saúde metabólica com LIA e suporte humano.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
