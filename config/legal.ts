/**
 * Legal identification — nullable by design.
 * Rendered ONLY when configured. Do NOT invent CNPJ, registration numbers,
 * legal address, or medical registration numbers.
 *
 * Fill these in once the official LeveLab legal data is provided; the footer
 * and legal pages will pick them up automatically without code changes.
 */
export const legalConfig = {
  legalName: null as string | null,
  cnpj: null as string | null,
  address: null as string | null,
  supportEmail: null as string | null,
  commercialPhone: null as string | null,
  healthResponsibleName: null as string | null,
  healthResponsibleRegistration: null as string | null,
  refundPolicyUrl: null as string | null,
  shippingPolicyUrl: null as string | null,
} as const;

export type LegalConfig = typeof legalConfig;
