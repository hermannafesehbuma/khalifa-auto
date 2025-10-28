import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Temporarily disable middleware to allow login redirect to work
  return NextResponse.next();

  // TODO: Re-enable proper auth checking after login flow is working
  /*
  const res = NextResponse.next();

  // Check if the request is for the admin directory
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Skip auth check for login page
    if (req.nextUrl.pathname === '/admin/login') {
      return res;
    }

    // Check for Supabase session cookies
    const supabaseAccessToken = req.cookies.get(
      'sb-fsalnqlipvgtjtauytzh-auth-token'
    );
    const supabaseRefreshToken = req.cookies.get(
      'sb-fsalnqlipvgtjtauytzh-auth-token'
    );

    // Debug logging
    console.log('🔍 Middleware check for:', req.nextUrl.pathname);
    console.log('🍪 Supabase access token exists:', !!supabaseAccessToken);
    console.log(
      '🍪 All cookies:',
      req.cookies.getAll().map((c) => c.name)
    );

    // If no session cookies found, redirect to login
    if (!supabaseAccessToken) {
      console.log('❌ No session found, redirecting to login');
      const redirectUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(redirectUrl);
    }

    console.log('✅ Session found, allowing access');
  }

  return res;
  */
}

export const config = {
  matcher: ['/admin/:path*'],
};
