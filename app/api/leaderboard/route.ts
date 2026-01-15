import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/leads';

export async function GET() {
  try {
    const leaderboard = getLeaderboard();
    return NextResponse.json({ leaderboard });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
