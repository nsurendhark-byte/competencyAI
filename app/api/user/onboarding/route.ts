import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB, writeDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const match = cookieHeader.match(/competency_session=([^;]+)/);
    if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { targetCareerId, weeklyHoursTarget } = await req.json();
    const db = readDB();
    let profile = db.profiles.find(p => p.userId === session.id);

    if (profile) {
      profile.targetCareerId = targetCareerId || 'career-fs-01';
      profile.weeklyHoursTarget = Number(weeklyHoursTarget) || 10;
      profile.onboardingCompleted = true;
    }

    writeDB(db);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
