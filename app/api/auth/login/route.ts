import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import { verifyPassword, ensureSeededData } from '@/lib/seed-data';
import { createSessionToken } from '@/lib/auth';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function POST(req: Request) {
  try {
    ensureSeededData();
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return jsonError('Email/Mobile and Password are required.', 400);
    }

    const db = readDB();
    const query = identifier.trim().toLowerCase();

    // Match Email or Mobile
    const user = db.users.find(u => u.email.toLowerCase() === query || u.mobile === query);

    if (!user) {
      return jsonError('Invalid credentials. User not found.', 401);
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return jsonError('Invalid password.', 401);
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
      success: true,
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
    return jsonError(err.message || 'Authentication error', 500);
  }
}
