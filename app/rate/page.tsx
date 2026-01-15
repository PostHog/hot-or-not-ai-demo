'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadCard } from '@/components/LeadCard';
import { RatingBox } from '@/components/RatingBox';
import type { LeadWithRating } from '@/lib/types';

interface UserInfo {
  name: string;
  email: string;
}

export default function RatePage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [currentLead, setCurrentLead] = useState<LeadWithRating | null>(null);
  const [skipIds, setSkipIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [justRated, setJustRated] = useState(false);
  const [ratingResult, setRatingResult] = useState<{ average: number; total: number } | null>(null);

  const fetchNextLead = useCallback(async (skipped: string[] = []) => {
    try {
      const res = await fetch('/api/leads/random', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skipIds: skipped }),
      });

      const data = await res.json();
      setCurrentLead(data.lead);
    } catch (error) {
      console.error('Error fetching lead:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if user is logged in (optional)
    const init = async () => {
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

      fetchNextLead();
    };

    init();
  }, [fetchNextLead]);

  const handleRate = async (score: number) => {
    if (!currentLead) return;

    try {
      const res = await fetch(`/api/leads/${currentLead.id}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score }),
      });

      if (res.ok) {
        const data = await res.json();
        setRatingResult({ average: data.averageRating, total: data.totalRatings });
        setJustRated(true);

        // Show result for 2 seconds, then fetch next lead
        setTimeout(() => {
          setJustRated(false);
          setRatingResult(null);
          fetchNextLead(skipIds);
        }, 2000);
      }
    } catch (error) {
      console.error('Error rating lead:', error);
    }
  };

  const handleSkip = () => {
    if (!currentLead) return;

    const newSkipIds = [...skipIds, currentLead.id];
    setSkipIds(newSkipIds);
    fetchNextLead(newSkipIds);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header userName={user?.name} />
        <main className="flex-1 flex items-center justify-center">
          <div className="retro-panel text-center p-8">
            <div className="text-lg font-bold">Loading leads...</div>
            <div className="text-xs text-gray-500 mt-2">
              Please wait while we find HOT leads for you!
            </div>
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
        <div className="max-w-2xl mx-auto px-4">
          {/* How it works section */}
          <div className="retro-panel mb-6">
            <div className="flex items-start gap-4">
              <div className="text-red-700 font-bold text-lg whitespace-nowrap">
                How It Works
              </div>
              <div className="text-xs leading-relaxed">
                <strong>1.</strong> Look at the lead below<br />
                <strong>2.</strong> In the yellow box, click to rate the lead<br />
                <strong>3.</strong> See what others thought on the left. Repeat
              </div>
            </div>
          </div>

          {currentLead ? (
            <>
              {/* Rating box */}
              <div className="mb-6">
                <RatingBox onRate={handleRate} onSkip={handleSkip} disabled={justRated} />
              </div>

              {/* Lead card */}
              <LeadCard
                lead={currentLead}
                averageRating={justRated && ratingResult ? ratingResult.average : currentLead.averageRating}
                totalRatings={justRated && ratingResult ? ratingResult.total : currentLead.totalRatings}
                showRating={justRated || (currentLead.totalRatings > 0)}
              />

              {/* Just rated feedback */}
              {justRated && (
                <div className="text-center mt-4">
                  <div className="retro-panel inline-block px-6 py-3">
                    <div className="text-green-700 font-bold">✓ Vote Recorded!</div>
                    <div className="text-xs text-gray-600">Loading next lead...</div>
                  </div>
                </div>
              )}

              {/* Share link */}
              <div className="text-center mt-6 text-xs text-gray-500">
                You can share this lead with a friend:<br />
                <span className="retro-link">
                  http://www.hotornotleads.com/r/?lid={currentLead.id}&key=ABC123
                </span>
              </div>
            </>
          ) : (
            <div className="retro-panel text-center p-8">
              <div className="text-xl font-bold text-gray-700 mb-2">
                🎉 All Leads Rated!
              </div>
              <div className="text-sm text-gray-600 mb-4">
                You&apos;ve rated all available leads. Check out the leaderboard to see the hottest ones!
              </div>
              <button
                onClick={() => {
                  setSkipIds([]);
                  fetchNextLead([]);
                }}
                className="retro-btn-primary"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
