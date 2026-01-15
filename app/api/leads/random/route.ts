import { NextResponse } from 'next/server';
import { getSessionOrAnonymous } from '@/lib/auth';
import { getRandomUnratedLead, calculateAverageRating } from '@/lib/leads';

export async function POST(request: Request) {
  try {
    const session = await getSessionOrAnonymous();
    const { skipIds = [] } = await request.json();

    const lead = getRandomUnratedLead(session.userId, skipIds);

    if (!lead) {
      return NextResponse.json({ lead: null, message: 'No more leads to rate!' });
    }

    const { average, total } = calculateAverageRating(lead.id);

    return NextResponse.json({
      lead: {
        ...lead,
        averageRating: average,
        totalRatings: total,
      },
    });
  } catch (error) {
    console.error('Error in /api/leads/random:', error);
    return NextResponse.json({ error: 'Failed to fetch lead' }, { status: 500 });
  }
}
