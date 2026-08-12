import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { hashPassword, ensureSeededData } from '@/lib/seed-data';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    ensureSeededData();
    const body = await req.json();
    const { fullName, email, mobile, password, confirmPassword } = body;

    // Strict Validation
    if (!fullName || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address format.' }, { status: 400 });
    }

    if (mobile && !/^\+?[0-[#9]\d{7,14}$/.test(mobile.replace(/[\s-]/g, ''))) {
      return NextResponse.json({ error: 'Invalid mobile phone number format.' }, { status: 400 });
    }

    const db = readDB();

    // Check existing email
    if (db.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json({ error: 'Account with this email already exists.' }, { status: 409 });
    }

    // Check existing mobile
    if (mobile && db.users.some(u => u.mobile === mobile)) {
      return NextResponse.json({ error: 'Account with this mobile number already exists.' }, { status: 409 });
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
      isVerified: false,
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

    return NextResponse.json({
      message: 'Account registered successfully. Please verify your email.',
      userId,
      email: newUser.email,
      verificationToken
    }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error during registration' }, { status: 500 });
  }
}
