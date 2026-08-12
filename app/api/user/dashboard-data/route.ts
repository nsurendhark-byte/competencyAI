import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const match = cookieHeader.match(/competency_session=([^;]+)/);
    if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = readDB();
    const userId = session.id;

    // Real database queries for user activity
    const attempts = db.assessmentAttempts.filter(a => a.userId === userId && a.status === 'COMPLETED');
    const masteries = db.skillMasteries.filter(m => m.userId === userId);
    const codingSubs = db.codingSubmissions.filter(c => c.userId === userId);
    const practiceAtts = db.practiceAttempts.filter(p => p.userId === userId);
    const userAch = db.userAchievements.filter(ua => ua.userId === userId);
    const readiness = db.careerReadiness.find(cr => cr.userId === userId);
    const activeRoadmap = db.roadmaps.find(r => r.userId === userId && r.status === 'ACTIVE');

    const latestAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;

    const stats = {
      assessmentCompleted: attempts.length > 0,
      overallScore: latestAttempt ? latestAttempt.overallScore : 0,
      skillsMasteredCount: masteries.filter(m => m.status === 'MASTERED' || m.status === 'VERIFIED').length,
      totalSkillsCount: db.skills.length,
      codingSubmissionsCount: codingSubs.length,
      codingPassedCount: codingSubs.filter(c => c.status === 'PASSED').length,
      practiceAttemptsCount: practiceAtts.length,
      achievementsCount: userAch.length,
      readinessPercent: readiness ? readiness.readinessPercent : 0,
      hasRoadmap: !!activeRoadmap
    };

    return NextResponse.json({ stats, latestAttempt, activeRoadmap });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
