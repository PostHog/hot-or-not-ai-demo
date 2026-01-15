import { NextResponse } from 'next/server';
import { getLeadsWithRatings } from '@/lib/leads';

export async function GET() {
  try {
    const leads = getLeadsWithRatings();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
