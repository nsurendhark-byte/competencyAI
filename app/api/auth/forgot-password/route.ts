import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import { jsonSuccess, jsonError } from '@/lib/api-response';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return jsonError('Email address is required.', 400);
    }

    const db = readDB();
    const user = db.users.find((u: any) => u.email.toLowerCase() === email.trim().toLowerCase());

    if (!user) {
      // Return success for security to avoid email enumeration
      return jsonSuccess(
        { sent: true },
        'If an account exists for this email, password reset instructions have been sent.'
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000).toISOString(); // 1 hour

    user.resetToken = resetToken;
    user.resetExpires = resetExpires;

    writeDB(db);

    return jsonSuccess(
      { sent: true, resetToken },
      'Password reset instructions sent successfully.'
    );
  } catch (err: any) {
    return jsonError(err.message || 'Error processing forgot password request', 500);
  }
}
