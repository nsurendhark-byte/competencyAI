import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return jsonError('Unauthorized admin access', 401, { authenticated: false });

    const match = cookieHeader.match(/competency_admin_session=([^;]+)/);
    if (!match) return jsonError('Unauthorized admin access', 401, { authenticated: false });

    const session = parseSessionToken(match[1]);
    if (!session || session.role !== 'ADMIN') return jsonError('Forbidden admin access', 403, { authenticated: false });

    return jsonSuccess({ authenticated: true, admin: session });
  } catch (e: any) {
    return jsonError(e.message || 'Admin session check error', 500, { authenticated: false });
  }
}
