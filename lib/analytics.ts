/**
 * Analytics adapter (V1 stub).
 *
 * Spec source: levelab-zai-ui-spec-v1.0.json → analytics_events (13 events)
 *   + non_negotiables ("Do not call OpenAI/OpenRouter directly from browser
 *   code" — same spirit applies: no third-party analytics SDK in V1).
 *
 * V1: NO real analytics SDK. The `track()` function no-ops (or logs to
 * `console.debug` in development). The 13-event union makes the contract
 * explicit so that a future provider (LeveLab Backend analytics, or a
 * consented vendor) can plug in without touching call sites.
 *
 * Call sites will use `track('reader_open', { product: 'corpo-forte', week: 'semana-1' })`
 * once the analytics instrumentation is rolled out across the app.
 */

export type AnalyticsEvent =
  | 'page_view'
  | 'program_view'
  | 'reader_open'
  | 'reader_page_view'
  | 'reader_complete'
  | 'workbook_open'
  | 'lia_page_view'
  | 'lia_waitlist_click'
  | 'whatsapp_launch_group_click'
  | 'assessment_start'
  | 'assessment_complete'
  | 'store_product_view'
  | 'cart_ui_add';

export type AnalyticsPayload = Record<string, string | number | boolean | undefined | null>;

/**
 * Track an analytics event. V1 stub — no network, no SDK. Logs to
 * `console.debug` in development so the event contract is observable
 * during local dev. A future provider replaces this body.
 */
export function track(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[analytics]', event, payload ?? {});
  }
  // TODO(integration): forward to the LeveLab Backend analytics endpoint or
  // a consented vendor SDK. Always gate third-party calls behind explicit
  // consent (see /legal/cookies + /legal/ia).
}

/**
 * Typed convenience helpers (optional, keeps call sites short).
 */
export const analytics = {
  pageView(path: string) {
    track('page_view', { path });
  },
  programView(slug: string) {
    track('program_view', { slug });
  },
  readerOpen(product: string, weekSlug: string) {
    track('reader_open', { product, week: weekSlug });
  },
  readerPageView(product: string, weekSlug: string, page: number) {
    track('reader_page_view', { product, week: weekSlug, page });
  },
  readerComplete(product: string, weekSlug: string) {
    track('reader_complete', { product, week: weekSlug });
  },
  workbookOpen(product: string) {
    track('workbook_open', { product });
  },
  liaPageView(locale: string) {
    track('lia_page_view', { locale });
  },
  liaWaitlistClick(locale: string) {
    track('lia_waitlist_click', { locale });
  },
  whatsappLaunchGroupClick(locale: string, source: string) {
    track('whatsapp_launch_group_click', { locale, source });
  },
  assessmentStart(locale: string) {
    track('assessment_start', { locale });
  },
  assessmentComplete(locale: string) {
    track('assessment_complete', { locale });
  },
  storeProductView(productId: string) {
    track('store_product_view', { productId });
  },
  cartUiAdd(productId: string) {
    track('cart_ui_add', { productId });
  },
};
