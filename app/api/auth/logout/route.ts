import { NextResponse } from 'next/server';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function POST() {
  try {
    const response = jsonSuccess({ authenticated: false }, 'Logged out successfully');
    
    // Clear session cookie
    response.cookies.set('competency_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    });

    return response;
  } catch (err: any) {
    return jsonError(err.message || 'Logout failed', 500);
  }
}
