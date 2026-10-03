import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Allura, Cormorant_Garamond, Inter } from 'next/font/google';

/** Display — editorial serif for headlines (never for UI or long body copy). */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

/** Body / UI — highly legible sans. */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

/** Accent — handwritten script, used sparingly for short emotional notes. */
const allura = Allura({
  subsets: ['latin'],
  variable: '--font-allura',
  display: 'swap',
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.levelab.org'),
  title: {
    default: 'LeveLab — Saúde, Bem-Estar e Acompanhamento',
    template: '%s · LeveLab',
  },
  description:
    'Programas, conteúdos e acompanhamento para uma rotina mais leve, com a LIA e suporte humano LeveLab.',
  applicationName: 'LeveLab',
  keywords: ['LeveLab', 'bem-estar', 'longevidade', 'Corpo Forte', 'Força na Caneta', 'LIA', 'rotina', 'hábitos'],
  authors: [{ name: 'LeveLab' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'LeveLab',
    title: 'LeveLab — Saúde, Bem-Estar e Acompanhamento',
    description:
      'Programas, conteúdos e acompanhamento para uma rotina mais leve, com a LIA e suporte humano LeveLab.',
    images: [{ url: '/images/lifestyle/hero-home.webp', width: 1220, height: 772, alt: 'LeveLab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeveLab — Saúde, Bem-Estar e Acompanhamento',
    description: 'Programas, conteúdos e acompanhamento para uma rotina mais leve.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#173c2f',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${inter.variable} ${allura.variable}`}>
      <body>{children}</body>
    </html>
  );
}
