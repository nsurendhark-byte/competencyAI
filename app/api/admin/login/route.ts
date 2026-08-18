import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import { verifyPassword, ensureSeededData } from '@/lib/seed-data';
import { createSessionToken } from '@/lib/auth';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function POST(req: Request) {
  try {
    ensureSeededData();
    const { email, password } = await req.json();

    if (!email || !password) {
      return jsonError('Admin Email and Password are required.', 400);
    }

    const db = readDB();
    const admin = db.adminUsers.find(a => a.email.toLowerCase() === email.toLowerCase().trim());

    if (!admin) {
      return jsonError('Invalid administrator credentials.', 401);
    }

    if (!verifyPassword(password, admin.passwordHash)) {
      return jsonError('Invalid administrator password.', 401);
    }

    const token = createSessionToken({
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      role: 'ADMIN',
      isVerified: true
    });

    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful',
      mustChangePassword: admin.mustChangePassword,
      redirectTo: '/admin/dashboard'
    });

    response.cookies.set('competency_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/'
    });

    return response;
  } catch (err: any) {
    return jsonError(err.message || 'Admin authentication error', 500);
  }
}
