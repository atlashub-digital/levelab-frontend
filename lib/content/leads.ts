/**
 * Lead capture adapter.
 *
 * Spec source: levelab-zai-ui-spec-v1.0.json →
 *   architecture.data_adapters → LeadCaptureProvider.
 *   architecture.phase_1 = "mock/config providers with real PDFs and real
 *   visual assets" → phase_2 swaps in the LeveLab Backend lead/CRM.
 *
 * The V1 MockLeadCaptureProvider is a MOCK submit — NO backend, NO network.
 * It does not store anything to localStorage. The future API provider will
 * POST to the LeveLab Backend lead endpoint (server-side only, with explicit
 * consent for any sensitive fields like assessment answers).
 *
 * Used by:
 *   - AssessmentFunnel (captureAssessment)
 *   - ContactForm (captureContact)
 *   - NewsletterCTA (captureNewsletter)
 */

export type AssessmentPayload = {
  /** Answers from the AssessmentFunnel — non-clinical heuristic only. */
  answers: Record<string, string | string[]>;
  /** Attribution persisted client-side by AssessmentFunnel (utm_* + landing_variant). */
  attribution?: Record<string, string>;
  locale: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  /** Optional attribution. */
  attribution?: Record<string, string>;
  locale: string;
};

export type NewsletterPayload = {
  email: string;
  locale: string;
  /** Optional attribution. */
  attribution?: Record<string, string>;
};

export type LeadResult = {
  ok: boolean;
  /** Mock id; the backend returns a real lead id in phase 2. */
  id?: string;
  message?: string;
};

export interface LeadCaptureProvider {
  captureAssessment(payload: AssessmentPayload): Promise<LeadResult>;
  captureContact(payload: ContactPayload): Promise<LeadResult>;
  captureNewsletter(payload: NewsletterPayload): Promise<LeadResult>;
}

/**
 * Mock lead capture — V1. NO backend, NO network. Simulates an async submit
 * (useful for client UX demos: success state, loading state). Returns a mock
 * id so the calling component can show a success state without code changes
 * when phase 2 swaps in the real provider.
 */
export class MockLeadCaptureProvider implements LeadCaptureProvider {
  private async mockDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 400));
  }

  async captureAssessment(payload: AssessmentPayload): Promise<LeadResult> {
    await this.mockDelay();
    // NO backend in V1 — log to console.debug for demo only.
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[MockLeadCaptureProvider] captureAssessment', payload);
    }
    return {
      ok: true,
      id: `mock-assessment-${Date.now()}`,
      message: 'Avaliação registada (demo). A integração com o backend chega em breve.',
    };
  }

  async captureContact(payload: ContactPayload): Promise<LeadResult> {
    await this.mockDelay();
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[MockLeadCaptureProvider] captureContact', payload);
    }
    return {
      ok: true,
      id: `mock-contact-${Date.now()}`,
      message: 'Mensagem registada (demo). Em breve, enviada para a equipa.',
    };
  }

  async captureNewsletter(payload: NewsletterPayload): Promise<LeadResult> {
    await this.mockDelay();
    if (process.env.NODE_ENV !== 'production') {
      console.debug('[MockLeadCaptureProvider] captureNewsletter', payload);
    }
    return {
      ok: true,
      id: `mock-newsletter-${Date.now()}`,
      message: 'Inscrição registada (demo). A integração com o backend chega em breve.',
    };
  }
}

/**
 * Future API provider — wired to the LeveLab Backend lead endpoint.
 * Server-side only (route handlers / server actions). Never expose service
 * keys in the browser.
 */
export class ApiLeadCaptureProvider implements LeadCaptureProvider {
  constructor(private baseUrl: string) {}

  async captureAssessment(payload: AssessmentPayload): Promise<LeadResult> {
    // TODO(integration): POST `${baseUrl}/leads/assessment`
    void payload;
    return { ok: false, message: 'Not implemented.' };
  }

  async captureContact(payload: ContactPayload): Promise<LeadResult> {
    // TODO(integration): POST `${baseUrl}/leads/contact`
    void payload;
    return { ok: false, message: 'Not implemented.' };
  }

  async captureNewsletter(payload: NewsletterPayload): Promise<LeadResult> {
    // TODO(integration): POST `${baseUrl}/leads/newsletter`
    void payload;
    return { ok: false, message: 'Not implemented.' };
  }
}

export const leadCapture: LeadCaptureProvider = new MockLeadCaptureProvider();
