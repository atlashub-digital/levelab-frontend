/**
 * LeveLab site configuration.
 * Public, non-secret values only. Never put API keys or service tokens here.
 *
 * Spec source: levelab-zai-ui-spec-v1.0.json → lia.launch + non_negotiables.
 *
 * NOTE on launch date (spec date_validation_warning): the user-provided
 * launch text "Lançamento em Breve - Sabado 12/10/2026 20H" is preserved
 * verbatim as `liaLaunchLabel`. 12/10/2026 falls on a MONDAY, not Saturday.
 * We do NOT independently assert the weekday in code or copy — the label is
 * config-driven and the placeholder stays neutral elsewhere.
 */
export const siteConfig = {
  name: 'LeveLab',
  care: 'LeveLab Care',
  tagline: 'Saúde • Bem-estar • Longevidade',
  group: 'Grupo MTX Farma',
  closingLine: 'Saúde de hoje. Um amanhã com mais vida.',
  url: 'https://levelab.org',

  /**
   * V1 commerce phase (spec pages.store.commerce_phase):
   *   "catalogue_ready_checkout_later" + "Do not hard-code the Euro prices".
   * Until the LeveLab Store API is wired, prices are NOT shown anywhere.
   */
  showPrices: false,

  // LIA launch — public date label + contact. The label is the user-provided
  // text (config-driven per spec lia.launch.must_be_config_driven = true).
  liaLaunchDate: '2026-10-12T20:00:00-03:00',
  liaLaunchLabel: 'Lançamento em Breve - Sabado 12/10/2026 20H',
  liaWhatsappNumber: '+55 15 98138-3291',
  // The WhatsApp community invite link is intentionally null until the
  // official link is supplied via NEXT_PUBLIC_LIA_LAUNCH_GROUP_URL
  // (spec: lia.launch.whatsapp_group_url = null, qr_code_value = null).
  // When the env var is set, getLiaLaunchGroupUrl() returns it and the
  // LIA page renders a real QR + active CTA. When null, the page renders
  // the disabled placeholder per spec lia.launch.when_missing_link.
  liaWhatsappGroupUrl: null as string | null,

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

/**
 * Returns the LIA launch WhatsApp group invite URL from the environment
 * (NEXT_PUBLIC_LIA_LAUNCH_GROUP_URL) or null when not configured.
 * Spec: lia.whatsapp_launch_group.url_from_env_or_config.
 */
export function getLiaLaunchGroupUrl(): string | null {
  const env = process.env.NEXT_PUBLIC_LIA_LAUNCH_GROUP_URL;
  return env && env.trim().length > 0 ? env.trim() : null;
}

export type SiteConfig = typeof siteConfig;
