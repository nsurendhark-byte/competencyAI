import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import { verifyPassword, ensureSeededData } from '@/lib/seed-data';
import { createSessionToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    ensureSeededData();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Admin Email and Password are required.' }, { status: 400 });
    }

    const db = readDB();
    const admin = db.adminUsers.find(a => a.email.toLowerCase() === email.toLowerCase());

    if (!admin) {
      return NextResponse.json({ error: 'Invalid admin credentials.' }, { status: 401 });
    }

    if (!verifyPassword(password, admin.passwordHash)) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    const token = createSessionToken({
      id: admin.id,
      email: admin.email,
      fullName: admin.fullName,
      role: 'ADMIN',
      isVerified: true
    });

    const response = NextResponse.json({
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
