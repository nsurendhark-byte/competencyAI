import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      return jsonError('Unauthenticated', 401, { authenticated: false });
    }

    const match = cookieHeader.match(/competency_session=([^;]+)/);
    if (!match) {
      return jsonError('Unauthenticated', 401, { authenticated: false });
    }

    const session = parseSessionToken(match[1]);
    if (!session) {
      return jsonError('Invalid or expired session', 401, { authenticated: false });
    }

    const db = readDB();
    const user = db.users.find(u => u.id === session.id);
    const profile = db.profiles.find(p => p.userId === session.id);

    if (!user) {
      return jsonError('User account not found', 401, { authenticated: false });
    }

    return jsonSuccess({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isVerified: user.isVerified,
        onboardingCompleted: profile ? profile.onboardingCompleted : false,
        targetCareerId: profile ? profile.targetCareerId : 'career-fs-01'
      }
    });
  } catch (e: any) {
    return jsonError(e.message || 'Session verification error', 500, { authenticated: false });
  }
}
