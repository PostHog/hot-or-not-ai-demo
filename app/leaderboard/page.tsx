'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import type { LeadWithRating } from '@/lib/types';

interface UserInfo {
  name: string;
  email: string;
}

export default function LeaderboardPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeadWithRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // Check if user is logged in (optional)
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
        // Don't redirect if not logged in - allow anonymous access
      } catch {
        // Ignore auth errors - continue as guest
      }

      // Fetch leaderboard
      try {
        const res = await fetch('/api/leaderboard');
        if (res.ok) {
          const data = await res.json();
          setLeaderboard(data.leaderboard);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const getScoreClass = (score: number) => {
    if (score >= 7) return 'score-hot';
    if (score >= 4) return 'score-warm';
    return 'score-cold';
  };

  const getRankDisplay = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const getHotnessBar = (score: number) => {
    const percentage = (score / 10) * 100;
    return (
      <div className="w-20 h-3 bg-gray-300 border border-gray-400 relative">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header userName={user?.name} />
        <main className="flex-1 flex items-center justify-center">
          <div className="retro-panel text-center p-8">
            <div className="text-lg font-bold">Loading leaderboard...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header userName={user?.name} />

      <main className="flex-1 py-6">
        <div className="max-w-4xl mx-auto px-4">
          {/* Title section */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-red-600">🔥 HOTTEST</span>{' '}
              <span className="text-gray-800">LEADS</span>{' '}
              <span className="text-red-600">🔥</span>
            </h1>
            <div className="text-sm text-gray-600 mt-1">
              Ranked by average hotness score
            </div>
          </div>

          {leaderboard.length === 0 ? (
            <div className="retro-panel text-center p-8">
              <div className="text-lg font-bold text-gray-700 mb-2">
                No Ratings Yet!
              </div>
              <div className="text-sm text-gray-600">
                Be the first to rate some leads and see them appear here.
              </div>
            </div>
          ) : (
            <div className="retro-panel overflow-x-auto">
              <table className="retro-table w-full">
                <thead>
                  <tr>
                    <th className="w-12">Rank</th>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Interest</th>
                    <th className="text-center">Size</th>
                    <th className="text-center w-24">Hotness</th>
                    <th className="text-center w-16">Score</th>
                    <th className="text-center w-16">Votes</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((lead, index) => (
                    <tr key={lead.id} className={index < 3 ? 'font-bold' : ''}>
                      <td className="text-center text-lg">
                        {getRankDisplay(index)}
                      </td>
                      <td>
                        <div className="font-bold">{lead.companyName}</div>
                        <div className="text-[10px] text-gray-500">{lead.industry}</div>
                      </td>
                      <td>
                        <div>{lead.contactName}</div>
                        <div className="text-[10px]">
                          <a href={`mailto:${lead.contactEmail}`} className="retro-link">
                            {lead.contactEmail}
                          </a>
                        </div>
                      </td>
                      <td className="text-green-700">{lead.productInterest}</td>
                      <td className="text-center text-[10px]">{lead.companySize}</td>
                      <td className="text-center">
                        {getHotnessBar(lead.averageRating || 0)}
                      </td>
                      <td className={`text-center text-lg ${getScoreClass(lead.averageRating || 0)}`}>
                        {lead.averageRating?.toFixed(1)}
                      </td>
                      <td className="text-center text-gray-600">
                        {lead.totalRatings}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Legend */}
          <div className="retro-panel mt-4">
            <div className="text-xs font-bold mb-2">Score Legend:</div>
            <div className="flex gap-6 text-xs">
              <div className="flex items-center gap-2">
                <span className="score-hot">7.0 - 10.0</span>
                <span>= 🔥 HOT!</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="score-warm">4.0 - 6.9</span>
                <span>= 😐 Lukewarm</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="score-cold">1.0 - 3.9</span>
                <span>= ❄️ Cold</span>
              </div>
            </div>
          </div>

          {/* Stats box */}
          <div className="retro-panel mt-4 text-center">
            <div className="text-xs text-gray-600">
              Total leads rated: <span className="font-bold">{leaderboard.length}</span> |
              Total votes cast: <span className="font-bold">{leaderboard.reduce((acc, l) => acc + l.totalRatings, 0)}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
