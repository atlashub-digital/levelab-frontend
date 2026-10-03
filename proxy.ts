import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Keeps the Supabase session cookie fresh on member routes. Authorization
 * itself happens in the pages/route handlers and in the LeveLab backend.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refreshes an expired access token when needed.
  await supabase.auth.getClaims();

  return response;
}

export const config = {
  matcher: [
    '/:locale/conta/:path*',
    '/:locale/entrar',
    '/:locale/programas/:program/reader',
    '/api/content/:path*',
    '/auth/:path*',
  ],
};
