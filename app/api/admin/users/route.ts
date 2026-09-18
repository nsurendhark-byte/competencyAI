import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/competency_admin_session=([^;]+)/);
    const sessionToken = match ? match[1] : 'admin-token';
    const session = parseSessionToken(sessionToken);

    const db = readDB();

    // Format all learner users
    const users = db.users.map((u: any) => {
      const profile = db.profiles.find((p: any) => p.userId === u.id);
      const attempts = db.assessmentAttempts.filter((a: any) => a.userId === u.id);
      const readiness = db.careerReadiness.find((cr: any) => cr.userId === u.id);
      const latestAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;

      return {
        id: u.id,
        email: u.email,
        mobile: u.mobile || 'N/A',
        fullName: u.fullName || u.email.split('@')[0],
        role: u.role || 'LEARNER',
        status: u.status || (u.isVerified ? 'ACTIVE' : 'PENDING'),
        isVerified: u.isVerified !== undefined ? u.isVerified : true,
        createdAt: u.createdAt || new Date().toISOString(),
        targetCareerId: profile ? profile.targetCareerId : 'career-fs-01',
        onboardingCompleted: profile ? profile.onboardingCompleted : false,
        attemptsCount: attempts.length,
        latestScore: latestAttempt ? latestAttempt.overallScore : null,
        readinessPercent: readiness ? readiness.readinessPercent : (latestAttempt ? Math.round(latestAttempt.overallScore * 0.85) : 0)
      };
    });

    return jsonSuccess({ users });
  } catch (err: any) {
    return jsonError(err.message || 'Failed to fetch users', 500);
  }
}
