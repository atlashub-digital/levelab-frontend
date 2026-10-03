/**
 * Server-only calls to the LeveLab backend on behalf of the signed-in member.
 * The member's Supabase access token is forwarded; the backend verifies it.
 */
import 'server-only';

export type LibraryItem = {
  id: string;
  product: string;
  kind: 'guia' | 'workbook';
  title: string;
  totalPages: number;
  previewPages: number;
  requires: string;
  hasAccess: boolean;
};

export type MeResponse = {
  member: { id: string; email: string | null; displayName: string | null };
  access: { keys: string[]; premium: boolean };
};

export function levelabApiUrl(path: string) {
  const base = (process.env.LEVELAB_API_URL ?? 'https://api.levelab.org/api/v1').replace(/\/$/, '');
  return `${base}${path}`;
}

async function get<T>(path: string, accessToken: string): Promise<T | null> {
  const res = await fetch(levelabApiUrl(path), {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);
  if (!res?.ok) return null;
  return (await res.json()) as T;
}

export const getMe = (token: string) => get<MeResponse>('/me', token);
export const getLibrary = (token: string) => get<LibraryItem[]>('/me/library', token);
