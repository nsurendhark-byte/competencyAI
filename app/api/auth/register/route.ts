import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { hashPassword, ensureSeededData } from '@/lib/seed-data';
import { jsonSuccess, jsonError } from '@/lib/api-response';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    ensureSeededData();
    const body = await req.json();
    const { fullName, email, mobile, password, confirmPassword } = body;

    // Strict Validation
    if (!fullName || !email || !password) {
      return jsonError('Full Name, Email, and Password are required.', 400);
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return jsonError('Passwords do not match.', 400);
    }

    if (password.length < 8) {
      return jsonError('Password must be at least 8 characters long.', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return jsonError('Invalid email address format.', 400);
    }

    if (mobile && !/^\+?[0-9]\d{7,14}$/.test(mobile.replace(/[\s-]/g, ''))) {
      return jsonError('Invalid mobile phone number format.', 400);
    }

    const db = readDB();

    // Check existing email
    if (db.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return jsonError('Account with this email already exists.', 409);
    }

    // Check existing mobile
    if (mobile && db.users.some(u => u.mobile === mobile)) {
      return jsonError('Account with this mobile number already exists.', 409);
    }

    const userId = 'usr-' + crypto.randomUUID();
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const passwordHash = hashPassword(password);

    const newUser = {
      id: userId,
      email: email.toLowerCase(),
      mobile: mobile || null,
      passwordHash,
      fullName,
      role: 'LEARNER',
      isVerified: true, // Auto verify registered users for seamless onboarding
      verificationToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.users.push(newUser);

    // Create user profile
    db.profiles.push({
      id: 'prof-' + crypto.randomUUID(),
      userId,
      bio: null,
      avatarUrl: null,
      targetCareerId: 'career-fs-01',
      weeklyHoursTarget: 10,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    writeDB(db);

    return jsonSuccess(
      {
        userId,
        email: newUser.email,
        verificationToken
      },
      'Account registered successfully.',
      201
    );

  } catch (err: any) {
    return jsonError(err.message || 'Server error during registration', 500);
  }
}
