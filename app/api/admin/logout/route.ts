import { NextResponse } from 'next/server';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function POST() {
  try {
    const response = jsonSuccess({ authenticated: false }, 'Admin logged out successfully');
    
    // Clear admin session cookie
    response.cookies.set('competency_admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    return response;
  } catch (err: any) {
    return jsonError(err.message || 'Admin logout failed', 500);
  }
}
