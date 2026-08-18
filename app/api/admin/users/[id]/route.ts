import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB, writeDB } from '@/lib/db';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export function generateStaticParams() {
  return [{ id: 'default' }];
}

function verifyAdminSession(req: Request) {
  const cookieHeader = req.headers.get('cookie');
  if (!cookieHeader) return null;

  const match = cookieHeader.match(/competency_admin_session=([^;]+)/);
  if (!match) return null;

  const session = parseSessionToken(match[1]);
  if (!session || session.role !== 'ADMIN') return null;

  return session;
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = verifyAdminSession(req);
    if (!session) {
      return jsonError('Unauthorized admin access', 401);
    }

    const userId = params.id;
    const body = await req.json();
    const db = readDB();

    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return jsonError('User account not found', 404);
    }

    // Update user properties
    if (typeof body.isVerified === 'boolean') {
      db.users[userIndex].isVerified = body.isVerified;
    }
    if (body.role && (body.role === 'LEARNER' || body.role === 'ADMIN')) {
      db.users[userIndex].role = body.role;
    }
    db.users[userIndex].updatedAt = new Date().toISOString();

    writeDB(db);

    const updatedUser = { ...db.users[userIndex] };
    delete updatedUser.passwordHash;

    return jsonSuccess({ user: updatedUser }, 'User status updated successfully');
  } catch (err: any) {
    return jsonError(err.message || 'Failed to update user', 500);
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = verifyAdminSession(req);
    if (!session) {
      return jsonError('Unauthorized admin access', 401);
    }

    const userId = params.id;
    const db = readDB();

    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return jsonError('User account not found', 404);
    }

    // Remove user and user profile
    db.users.splice(userIndex, 1);
    db.profiles = db.profiles.filter(p => p.userId !== userId);
    db.assessmentAttempts = db.assessmentAttempts.filter(a => a.userId !== userId);

    writeDB(db);

    return jsonSuccess({ deletedUserId: userId }, 'User deleted successfully');
  } catch (err: any) {
    return jsonError(err.message || 'Failed to delete user', 500);
  }
}
