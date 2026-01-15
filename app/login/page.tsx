'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/rate');
      router.refresh();
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showNav={false} />

      <main className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-sm">
          {/* Login box styled like the original */}
          <div className="retro-panel">
            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white text-center py-2 -mx-2 -mt-2 mb-4 font-bold">
              User Login
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-xs font-bold mb-1 text-gray-700">
                  Username (Email):
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="retro-input w-full"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold mb-1 text-gray-700">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="retro-input w-full"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 text-xs p-2 mb-4">
                  {error}
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="retro-btn-primary disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <div className="text-center mt-3 text-xs">
                <a href="#" className="retro-link">
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>

          {/* Demo credentials box */}
          <div className="retro-panel mt-4">
            <div className="text-xs text-gray-600 mb-2 font-bold">Demo Credentials:</div>
            <div className="retro-panel-inset text-xs">
              <div><strong>Email:</strong> demo@hotornot.com</div>
              <div><strong>Password:</strong> demo123</div>
            </div>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-4">
            <div className="retro-panel inline-block px-4 py-2">
              <span className="text-xs">New user? </span>
              <Link href="/signup" className="retro-link text-xs font-bold">
                Sign up FREE!
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
