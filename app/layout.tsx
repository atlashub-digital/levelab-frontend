import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://levelab.org'),
  title: {
    default: 'LeveLab — Saúde • Bem-estar • Longevidade',
    template: '%s · LeveLab',
  },
  description:
    'Acompanhamento de rotina, bem-estar e longevidade com método, LIA e apoio humano. Uma marca do Grupo MTX Farma.',
  keywords: [
    'LeveLab',
    'bem-estar',
    'longevidade',
    'Corpo Forte',
    'Força na Caneta',
    'LIA',
    'saúde',
    'rotina',
    'hábitos',
  ],
  authors: [{ name: 'LeveLab' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'LeveLab',
    title: 'LeveLab — Saúde • Bem-estar • Longevidade',
    description:
      'Acompanhamento de rotina, bem-estar e longevidade com método, LIA e apoio humano.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeveLab',
    description: 'Saúde • Bem-estar • Longevidade',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
