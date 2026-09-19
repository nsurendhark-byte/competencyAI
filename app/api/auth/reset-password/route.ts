import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { hashPassword } from '@/lib/seed-data';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return jsonError('Reset token and new password are required.', 400);
    }

    if (newPassword.length < 8) {
      return jsonError('Password must be at least 8 characters long.', 400);
    }

    const db = readDB();
    const user = db.users.find(
      (u: any) => u.resetToken === token && u.resetExpires && new Date(u.resetExpires) > new Date()
    );

    if (!user) {
      return jsonError('Invalid or expired reset token. Please request a new link.', 400);
    }

    user.passwordHash = hashPassword(newPassword);
    user.resetToken = null;
    user.resetExpires = null;
    user.updatedAt = new Date().toISOString();

    writeDB(db);

    return jsonSuccess({ reset: true }, 'Password reset successfully. You can now log in.');
  } catch (err: any) {
    return jsonError(err.message || 'Error processing password reset', 500);
  }
}
