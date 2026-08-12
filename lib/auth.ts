import { readDB, writeDB } from './db';
import { hashPassword, verifyPassword } from './seed-data';
import crypto from 'crypto';

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  role: 'LEARNER' | 'ADMIN';
  mobile?: string;
  isVerified: boolean;
}

// Generate simple secure session token
export function createSessionToken(user: UserSession): string {
  const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + 86400000 * 7 })).toString('base64url');
  const secret = process.env.AUTH_SECRET || 'competency_ai_jwt_secret_key_prod_ready';
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function parseSessionToken(token: string): UserSession | null {
  try {
    const [payloadStr, signature] = token.split('.');
    if (!payloadStr || !signature) return null;

    const secret = process.env.AUTH_SECRET || 'competency_ai_jwt_secret_key_prod_ready';
    const expectedSignature = crypto.createHmac('sha256', secret).update(payloadStr).digest('base64url');

    if (signature !== expectedSignature) return null;

    const data = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8'));
    if (data.exp && Date.now() > data.exp) return null;

    return {
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      mobile: data.mobile,
      isVerified: data.isVerified
    };
  } catch (e) {
    return null;
  }
}
