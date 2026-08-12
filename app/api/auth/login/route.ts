import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import { verifyPassword, ensureSeededData } from '@/lib/seed-data';
import { createSessionToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    ensureSeededData();
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json({ error: 'Email/Mobile and Password are required.' }, { status: 400 });
    }

    const db = readDB();
    const query = identifier.trim().toLowerCase();

    // Match Email or Mobile
    const user = db.users.find(u => u.email === query || u.mobile === query);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials. User not found.' }, { status: 401 });
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    const profile = db.profiles.find(p => p.userId === user.id);

    const token = createSessionToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as 'LEARNER' | 'ADMIN',
      mobile: user.mobile,
      isVerified: user.isVerified
    });

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isVerified: user.isVerified,
        onboardingCompleted: profile ? profile.onboardingCompleted : false
      },
      redirectTo: profile && profile.onboardingCompleted ? '/app/dashboard' : '/app/onboarding'
    });

    // Set secure HTTP-only cookie
    response.cookies.set('competency_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Authentication error' }, { status: 500 });
  }
}
