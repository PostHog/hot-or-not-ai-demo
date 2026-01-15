'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  userName?: string;
  showNav?: boolean;
}

export function Header({ userName, showNav = true }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="hot-header text-white">
      {/* Top bar with tagline */}
      <div className="bg-black text-center py-1 text-[10px] overflow-hidden">
        <span className="marquee inline-block whitespace-nowrap">
          ★★★ As seen in TechCrunch, Forbes, and Sales Hacker! ★★★ The #1 way to rate your leads! ★★★ Over 10,000 leads rated! ★★★
        </span>
      </div>

      {/* Main header */}
      <div className="text-center py-4">
        <Link href="/rate" className="inline-block">
          <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'Arial Black, sans-serif' }}>
            <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">HOT</span>
            <span className="text-yellow-300 text-2xl mx-2 drop-shadow-[1px_1px_0px_rgba(0,0,0,0.5)]">or</span>
            <span className="text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">NOT</span>
          </h1>
          <div className="text-yellow-300 text-sm font-bold tracking-widest mt-1">
            — LEADS EDITION —
          </div>
        </Link>
      </div>

      {/* Navigation */}
      {showNav && (
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 border-t border-gray-600">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-2">
            <nav className="flex gap-4">
              <Link href="/rate" className="retro-link text-white hover:text-yellow-300 text-xs font-bold">
                [ Rate Leads ]
              </Link>
              <Link href="/leaderboard" className="retro-link text-white hover:text-yellow-300 text-xs font-bold">
                [ Leaderboard ]
              </Link>
            </nav>
            <div className="flex items-center gap-3 text-xs">
              {userName ? (
                <>
                  <span className="text-gray-300">
                    Welcome, <span className="text-yellow-300 font-bold">{userName}</span>!
                  </span>
                  <button onClick={handleLogout} className="retro-btn text-[10px]">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="retro-btn text-[10px]">
                    Login
                  </Link>
                  <Link href="/signup" className="retro-btn text-[10px]">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
