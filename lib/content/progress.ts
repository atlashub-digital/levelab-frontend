/**
 * Reader progress adapter.
 *
 * Spec source: levelab-zai-ui-spec-v1.0.json →
 *   pages.corpo_forte_reader.progress:
 *     phase_1 = "client-side demo only"
 *     phase_2 = "LeveLab Backend member progress"
 *     privacy = "Do not store sensitive wellness information in localStorage."
 *
 * PRIVACY RULE (non-negotiable):
 *   The V1 MockReaderProgressProvider stores ONLY NON-SENSITIVE reading
 *   position data — `(productId, weekSlug, pageIndex, updatedAt)`. It NEVER
 *   stores health, wellness, clinical, assessment or biometric data in
 *   localStorage. Sensitive data only ever leaves the browser through the
 *   future LeadCaptureProvider backend integration, with explicit user
 *   consent. This file documents and enforces the rule by type signature:
 *   the progress payload contains no free-form fields — only positional
 *   coordinates.
 *
 * Architecture: phase_1 (mock/config) → phase_2 (LeveLab Backend member
 *   progress API). Component surface unchanged.
 */

export type ReaderProgressPoint = {
  productId: string;
  weekSlug: string;
  /** 0-indexed page within the current week's mock pages. */
  pageIndex: number;
  /** ISO timestamp of the last read. */
  updatedAt: string;
};

export interface ReaderProgressProvider {
  getProgress(productId: string, weekSlug: string): Promise<ReaderProgressPoint | undefined>;
  setProgress(point: ReaderProgressPoint): Promise<void>;
}

const STORAGE_KEY = 'levelab.reader.progress';

/**
 * Mock reader-progress provider. Persists ONLY non-sensitive reading
 * position to localStorage. See module-level privacy rule.
 */
export class MockReaderProgressProvider implements ReaderProgressProvider {
  private readStore(): Record<string, ReaderProgressPoint> {
    if (typeof window === 'undefined') return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed as Record<string, ReaderProgressPoint>;
      return {};
    } catch {
      return {};
    }
  }

  private writeStore(store: Record<string, ReaderProgressPoint>): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // Silently ignore quota / privacy mode failures — progress is best-effort.
    }
  }

  private key(productId: string, weekSlug: string): string {
    return `${productId}::${weekSlug}`;
  }

  async getProgress(
    productId: string,
    weekSlug: string,
  ): Promise<ReaderProgressPoint | undefined> {
    return this.readStore()[this.key(productId, weekSlug)];
  }

  async setProgress(point: ReaderProgressPoint): Promise<void> {
    const store = this.readStore();
    store[this.key(point.productId, point.weekSlug)] = point;
    this.writeStore(store);
  }
}

/**
 * Future API provider — wired to the LeveLab Backend member progress API.
 * Never store sensitive wellness data in localStorage; route it through the
 * authenticated backend with explicit consent.
 */
export class ApiReaderProgressProvider implements ReaderProgressProvider {
  constructor(private baseUrl: string) {}

  async getProgress(
    productId: string,
    weekSlug: string,
  ): Promise<ReaderProgressPoint | undefined> {
    // TODO(integration): GET `${baseUrl}/reader/progress?productId=...&weekSlug=...`
    // (authenticated; reads member progress server-side only)
    return undefined;
  }

  async setProgress(point: ReaderProgressPoint): Promise<void> {
    // TODO(integration): POST `${baseUrl}/reader/progress`
    // (authenticated; writes member progress server-side only)
    void point;
  }
}

export const readerProgress: ReaderProgressProvider = new MockReaderProgressProvider();
