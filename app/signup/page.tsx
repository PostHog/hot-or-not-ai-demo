'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Signup failed');
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
          {/* How HOT are your leads section */}
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-red-600">
              How <span className="text-red-700 italic">HOT</span> are your leads?
            </div>
            <div className="text-lg font-bold text-blue-700">
              Sign up and find out!
            </div>
          </div>

          {/* Signup box */}
          <div className="retro-panel">
            <div className="bg-gradient-to-r from-green-700 to-green-800 text-white text-center py-2 -mx-2 -mt-2 mb-4 font-bold">
              Create Your FREE Account
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="block text-xs font-bold mb-1 text-gray-700">
                  Your Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="retro-input w-full"
                  placeholder="John Smith"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-xs font-bold mb-1 text-gray-700">
                  Email Address:
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

              <div className="mb-3">
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
                <div className="text-[10px] text-gray-500 mt-1">
                  (At least 6 characters)
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-bold mb-1 text-gray-700">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>

              <div className="text-[10px] text-gray-500 text-center mt-3">
                By signing up, you agree to our Terms of Service
                <br />
                and promise to rate leads fairly!
              </div>
            </form>
          </div>

          {/* Login link */}
          <div className="text-center mt-4">
            <div className="retro-panel inline-block px-4 py-2">
              <span className="text-xs">Already have an account? </span>
              <Link href="/login" className="retro-link text-xs font-bold">
                Login here
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
