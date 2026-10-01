/**
 * LeveLab site configuration.
 * Public, non-secret values only. Never put API keys or service tokens here.
 */
export const siteConfig = {
  name: 'LeveLab',
  care: 'LeveLab Care',
  tagline: 'Saúde • Bem-estar • Longevidade',
  group: 'Grupo MTX Farma',
  closingLine: 'Saúde de hoje. Um amanhã com mais vida.',
  url: 'https://levelab.org',

  // LIA launch — public group + contact
  liaLaunchDate: '2026-10-12T20:00:00-03:00',
  liaLaunchLabel: 'Lançamento em breve — Sábado 12/10/2026 às 20h',
  liaWhatsappNumber: '+55 15 98138-3291',
  // TODO(integration): replace with the final WhatsApp community invite link before 12/10/2026.
  liaWhatsappGroupUrl: 'https://chat.whatsapp.com/PLACEHOLDER-LIA-LAUNCH',

  // Commercial / human support — temporary test number (internal config only).
  commercialWhatsappNumber: '+55 62 99409-1930',

  social: [
    { label: 'Instagram', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Spotify', href: '#' },
  ],

  locales: ['pt-br', 'pt-pt', 'en', 'es'],
} as const;

export type SiteConfig = typeof siteConfig;
