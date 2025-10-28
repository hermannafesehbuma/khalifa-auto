'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Mail, Shield, AlertCircle } from 'lucide-react';
import Image from 'next/image';

function AdminLoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Debug Supabase configuration
  console.log('🔧 Supabase client:', supabase);
  console.log('🌐 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    '🔑 Supabase Anon Key exists:',
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      console.log('🔍 Checking authentication...');
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        console.log('📊 Session data:', session);
        console.log('❌ Session error:', error);

        if (error) {
          console.error('❌ Error getting session:', error);
          return;
        }

        if (session) {
          console.log('✅ User is authenticated');
          console.log('👤 User ID:', session.user.id);
          console.log('📧 User email:', session.user.email);

          const allowedAdminId = 'c539433a-a617-48cc-83af-25bae3e731f7';
          console.log('🔑 Allowed admin ID:', allowedAdminId);
          console.log('🔍 ID match:', session.user.id === allowedAdminId);

          if (session.user.id === allowedAdminId) {
            console.log('✅ User is authorized, redirecting to admin...');
            router.push('/admin');
          } else {
            console.log('❌ User is not authorized');
            setError('You are not authorized to access the admin panel.');
          }
        } else {
          console.log('❌ No session found');
        }
      } catch (err) {
        console.error('❌ Error in checkAuth:', err);
      }
    };
    checkAuth();

    // Check for error parameter
    const errorParam = searchParams.get('error');
    console.log('🔍 Error param:', errorParam);
    if (errorParam === 'unauthorized') {
      setError('You are not authorized to access the admin panel.');
    }
  }, [router, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Starting login process...');
    console.log('📧 Email:', email);
    console.log('🔑 Password length:', password.length);

    setLoading(true);
    setError('');

    try {
      console.log('🔐 Attempting to sign in with Supabase...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('📊 Login response data:', data);
      console.log('❌ Login error:', error);

      if (error) {
        console.error('❌ Login failed:', error.message);
        setError(error.message);
        return;
      }

      if (data.user) {
        console.log('✅ Login successful!');
        console.log('👤 User ID:', data.user.id);
        console.log('📧 User email:', data.user.email);
        console.log('🔑 User metadata:', data.user.user_metadata);

        const allowedAdminId = 'c539433a-a617-48cc-83af-25bae3e731f7';
        console.log('🔑 Allowed admin ID:', allowedAdminId);
        console.log('🔍 ID match:', data.user.id === allowedAdminId);

        if (data.user.id === allowedAdminId) {
          console.log('✅ User is authorized, redirecting to admin...');
          router.push('/admin');
        } else {
          console.log('❌ User is not authorized');
          setError('You are not authorized to access the admin panel.');
          console.log('🚪 Signing out unauthorized user...');
          await supabase.auth.signOut();
        }
      } else {
        console.log('❌ No user data returned');
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Unexpected error during login:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      console.log('🏁 Login process completed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center space-x-3 mb-6">
            <Image
              src="/logok.png"
              alt="Khalifa Auto Logo"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Admin Login
              </h2>
              <p className="text-sm text-gray-600">
                Sign in to access the Khalifa Auto admin panel
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Authentication Required
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="admin@khalifaauto.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>

              {/* Debug button */}
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={async () => {
                  console.log('🧪 Testing Supabase connection...');
                  try {
                    const { data, error } = await supabase.auth.getSession();
                    console.log('🧪 Test session result:', { data, error });
                    alert(
                      `Supabase test: ${
                        error
                          ? 'Error: ' + error.message
                          : 'Success - Session: ' +
                            (data.session ? 'Found' : 'None')
                      }`
                    );
                  } catch (err) {
                    console.error('🧪 Test error:', err);
                    alert('Supabase test failed: ' + err);
                  }
                }}
              >
                Test Supabase Connection
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Only authorized administrators can access this panel.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="text-sm"
          >
            ← Back to Website
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminLoginContent />
    </Suspense>
  );
}
