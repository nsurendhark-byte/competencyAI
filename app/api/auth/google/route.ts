import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { ensureSeededData } from '@/lib/seed-data';
import { createSessionToken } from '@/lib/auth';
import { jsonSuccess, jsonError } from '@/lib/api-response';
import { syncUserCredentialsToSupabase } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    ensureSeededData();
    const body = await req.json();
    const { email, fullName, image, googleId } = body;

    if (!email) {
      return jsonError('Email address is required for Google login.', 400);
    }

    const cleanEmail = email.trim().toLowerCase();
    const db = readDB();

    // Check whether user already exists
    let user = db.users.find((u: any) => u.email.toLowerCase() === cleanEmail);
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      const userId = 'usr-' + Date.now();
      const userName = fullName || cleanEmail.split('@')[0];

      user = {
        id: userId,
        email: cleanEmail,
        fullName: userName,
        mobile: null,
        passwordHash: 'GOOGLE_OAUTH_USER',
        role: 'LEARNER',
        isVerified: true,
        status: 'ACTIVE',
        provider: 'google',
        providerAccountId: googleId || 'g-' + crypto.randomUUID(),
        avatarUrl: image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      db.users.push(user);

      // Create associated learner profile
      db.profiles.push({
        id: 'prof-' + userId,
        userId: userId,
        targetCareerId: 'career-fs-01',
        collegeName: 'B.Tech IT College',
        degree: 'B.Tech Information Technology',
        graduationYear: 2026,
        onboardingCompleted: false,
        updatedAt: new Date().toISOString()
      });

      writeDB(db);
    } else {
      user.lastLoginAt = new Date().toISOString();
      user.updatedAt = new Date().toISOString();
      writeDB(db);
    }

    // Sync Google user credentials/session to Supabase
    syncUserCredentialsToSupabase({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }).catch(err => console.error('[Supabase Google Login Sync Error]', err));

    const profile = db.profiles.find((p: any) => p.userId === user.id);


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
      message: isNewUser ? 'Google account created successfully' : 'Google login successful',
      token,
      isNewUser,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isVerified: user.isVerified,
        avatarUrl: user.avatarUrl,
        onboardingCompleted: profile ? profile.onboardingCompleted : false
      },
      redirectTo: profile && profile.onboardingCompleted ? '/app/dashboard' : '/app/onboarding'
    });

    // Set secure HTTP-only cookie for session persistence
    response.cookies.set('competency_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return response;
  } catch (err: any) {
    return jsonError(err.message || 'Google authentication error', 500);
  }
}
