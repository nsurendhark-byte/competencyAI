import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import { verifyPassword, ensureSeededData } from '@/lib/seed-data';
import { createSessionToken } from '@/lib/auth';
import { jsonSuccess, jsonError } from '@/lib/api-response';
import { syncUserCredentialsToSupabase } from '@/lib/supabase';

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
    const user = db.users.find((u: any) => u.email.toLowerCase() === query || u.mobile === query);

    if (!user) {
      return jsonError('Invalid credentials. User not found.', 401);
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return jsonError('Invalid password.', 401);
    }

    // Sync user credentials to Supabase backend on login
    syncUserCredentialsToSupabase({
      id: user.id,
      email: user.email,
      password: password,
      fullName: user.fullName,
      role: user.role,
      mobile: user.mobile
    }).catch(err => console.error('[Supabase Portal Sync Error]', err));

    const profile = db.profiles.find((p: any) => p.userId === user.id);


    const token = createSessionToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as 'LEARNER' | 'ADMIN',
      mobile: user.mobile,
      isVerified: user.isVerified
    });

    const isHttps = req.headers.get('x-forwarded-proto') === 'https';

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
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
      secure: isHttps,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return response;
  } catch (err: any) {
    return jsonError(err.message || 'Authentication error', 500);
  }
}
