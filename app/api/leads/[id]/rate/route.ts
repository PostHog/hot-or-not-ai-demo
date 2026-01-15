import { NextResponse } from 'next/server';
import { getSessionOrAnonymous } from '@/lib/auth';
import { addRating, getLead, calculateAverageRating } from '@/lib/leads';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionOrAnonymous();
    const { id } = await params;
    const { score } = await request.json();

    if (!score || score < 1 || score > 10) {
      return NextResponse.json(
        { error: 'Score must be between 1 and 10' },
        { status: 400 }
      );
    }

    const lead = getLead(id);
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    addRating(id, session.userId, score);

    const { average, total } = calculateAverageRating(id);

    return NextResponse.json({
      success: true,
      averageRating: average,
      totalRatings: total,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to rate lead' }, { status: 500 });
  }
}
