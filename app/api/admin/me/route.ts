import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ authenticated: false }, { status: 401 });

    const match = cookieHeader.match(/competency_admin_session=([^;]+)/);
    if (!match) return NextResponse.json({ authenticated: false }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session || session.role !== 'ADMIN') return NextResponse.json({ authenticated: false }, { status: 401 });

    return NextResponse.json({ authenticated: true, admin: session });
  } catch (e) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
