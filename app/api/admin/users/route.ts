import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const match = cookieHeader.match(/competency_admin_session=([^;]+)/);
    if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const db = readDB();

    // Strip passwordHash before returning to admin
    const users = db.users.map(u => {
      const profile = db.profiles.find(p => p.userId === u.id);
      const attempts = db.assessmentAttempts.filter(a => a.userId === u.id);
      const readiness = db.careerReadiness.find(cr => cr.userId === u.id);

      return {
        id: u.id,
        email: u.email,
        mobile: u.mobile,
        fullName: u.fullName,
        role: u.role,
        isVerified: u.isVerified,
        createdAt: u.createdAt,
        targetCareerId: profile ? profile.targetCareerId : null,
        onboardingCompleted: profile ? profile.onboardingCompleted : false,
        attemptsCount: attempts.length,
        latestScore: attempts.length > 0 ? attempts[attempts.length - 1].overallScore : 0,
        readinessPercent: readiness ? readiness.readinessPercent : 0
      };
    });

    return NextResponse.json({ users });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
