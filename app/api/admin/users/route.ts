import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return jsonError('Unauthorized admin access', 401);

    const match = cookieHeader.match(/competency_admin_session=([^;]+)/);
    if (!match) return jsonError('Unauthorized admin access', 401);

    const session = parseSessionToken(match[1]);
    if (!session || session.role !== 'ADMIN') return jsonError('Forbidden - Admin access required', 403);

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

    return jsonSuccess({ users });
  } catch (err: any) {
    return jsonError(err.message || 'Failed to fetch users', 500);
  }
}
