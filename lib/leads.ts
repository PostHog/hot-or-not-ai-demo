import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Lead, Rating, LeadWithRating } from './types';

const leadsPath = join(process.cwd(), 'lib/data/leads.json');
const ratingsPath = join(process.cwd(), 'lib/data/ratings.json');

export function getLeads(): Lead[] {
  const data = readFileSync(leadsPath, 'utf-8');
  return JSON.parse(data).leads;
}

export function getLead(id: string): Lead | undefined {
  const leads = getLeads();
  return leads.find((lead) => lead.id === id);
}

export function getRatings(): Record<string, Rating[]> {
  try {
    const data = readFileSync(ratingsPath, 'utf-8');
    return JSON.parse(data).ratings || {};
  } catch {
    return {};
  }
}

export function saveRatings(ratings: Record<string, Rating[]>): void {
  writeFileSync(ratingsPath, JSON.stringify({ ratings }, null, 2));
}

export function addRating(leadId: string, userId: string, score: number): void {
  const ratings = getRatings();

  if (!ratings[leadId]) {
    ratings[leadId] = [];
  }

  // Check if user already rated this lead
  const existingIndex = ratings[leadId].findIndex((r) => r.userId === userId);

  const newRating: Rating = {
    userId,
    leadId,
    score,
    ratedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    // Update existing rating
    ratings[leadId][existingIndex] = newRating;
  } else {
    // Add new rating
    ratings[leadId].push(newRating);
  }

  saveRatings(ratings);
}

export function getLeadRatings(leadId: string): Rating[] {
  const ratings = getRatings();
  return ratings[leadId] || [];
}

export function calculateAverageRating(leadId: string): { average: number | null; total: number } {
  const ratings = getLeadRatings(leadId);

  if (ratings.length === 0) {
    return { average: null, total: 0 };
  }

  const sum = ratings.reduce((acc, r) => acc + r.score, 0);
  return {
    average: Math.round((sum / ratings.length) * 10) / 10,
    total: ratings.length,
  };
}

export function getLeadsWithRatings(): LeadWithRating[] {
  const leads = getLeads();

  return leads.map((lead) => {
    const { average, total } = calculateAverageRating(lead.id);
    return {
      ...lead,
      averageRating: average,
      totalRatings: total,
    };
  });
}

export function getLeaderboard(): LeadWithRating[] {
  const leadsWithRatings = getLeadsWithRatings();

  // Sort by average rating (descending), then by total ratings (descending)
  return leadsWithRatings
    .filter((lead) => lead.averageRating !== null)
    .sort((a, b) => {
      if (b.averageRating !== a.averageRating) {
        return (b.averageRating || 0) - (a.averageRating || 0);
      }
      return b.totalRatings - a.totalRatings;
    });
}

export function getRandomUnratedLead(userId: string, skipIds: string[] = []): Lead | null {
  const leads = getLeads();
  const ratings = getRatings();

  // Get leads not rated by this user and not in skip list
  const unratedLeads = leads.filter((lead) => {
    const leadRatings = ratings[lead.id] || [];
    const hasUserRated = leadRatings.some((r) => r.userId === userId);
    const isSkipped = skipIds.includes(lead.id);
    return !hasUserRated && !isSkipped;
  });

  if (unratedLeads.length === 0) {
    // If all leads are rated or skipped, return a random lead not in skip list
    const availableLeads = leads.filter((lead) => !skipIds.includes(lead.id));
    if (availableLeads.length === 0) {
      // If all leads are skipped, reset and return any random lead
      return leads[Math.floor(Math.random() * leads.length)] || null;
    }
    return availableLeads[Math.floor(Math.random() * availableLeads.length)] || null;
  }

  // Return a random unrated lead
  return unratedLeads[Math.floor(Math.random() * unratedLeads.length)] || null;
}

export function hasUserRatedLead(userId: string, leadId: string): boolean {
  const ratings = getRatings();
  const leadRatings = ratings[leadId] || [];
  return leadRatings.some((r) => r.userId === userId);
}
