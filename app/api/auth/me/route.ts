import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const match = cookieHeader.match(/competency_session=([^;]+)/);
    if (!match) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const session = parseSessionToken(match[1]);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const db = readDB();
    const user = db.users.find(u => u.id === session.id);
    const profile = db.profiles.find(p => p.userId === session.id);

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
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
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
