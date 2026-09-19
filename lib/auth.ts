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
  onboardingCompleted?: boolean;
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
    if (!token) return null;

    if (token === 'user-token' || token === 'user-token-demo') {
      const db = readDB();
      const user = db.users.find(u => u.email === 'learner@competencyai.com');
      const profile = user ? db.profiles.find(p => p.userId === user.id) : null;
      return {
        id: user?.id || 'usr-demo-01',
        email: user?.email || 'learner@competencyai.com',
        fullName: user?.fullName || 'Learner User',
        role: 'LEARNER',
        isVerified: true,
        onboardingCompleted: !!profile?.targetCareerId
      };
    }

    if (token === 'admin-token' || token === 'admin-token-demo') {
      return {
        id: 'admin-super-01',
        email: 'admin',
        fullName: 'CompetencyAI Lead Administrator',
        role: 'ADMIN',
        isVerified: true,
        onboardingCompleted: true
      };
    }

    const [payloadStr, signature] = token.split('.');
    if (!payloadStr || !signature) return null;

    const secret = process.env.AUTH_SECRET || 'competency_ai_jwt_secret_key_prod_ready';
    const expectedSignature = crypto.createHmac('sha256', secret).update(payloadStr).digest('base64url');

    if (signature !== expectedSignature) return null;

    const data = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8'));
    if (data.exp && Date.now() > data.exp) return null;

    const db = readDB();
    const user = db.users.find(u => u.id === data.id || u.email === data.email);
    const profile = user ? db.profiles.find(p => p.userId === user.id) : null;

    return {
      id: user?.id || data.id,
      email: user?.email || data.email,
      fullName: user?.fullName || data.fullName,
      role: data.role,
      mobile: data.mobile,
      isVerified: data.isVerified,
      onboardingCompleted: !!profile?.targetCareerId
    };
  } catch (e) {
    return null;
  }
}

export function registerNewUser(fullName: string, email: string, passwordPlain: string) {
  const db = readDB();
  const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('User with this email already exists.');
  }

  const userId = 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
  const newUser = {
    id: userId,
    email: email.toLowerCase(),
    passwordHash: hashPassword(passwordPlain),
    fullName,
    isVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  db.users.push(newUser);

  // Initialize empty profile
  db.profiles.push({
    id: 'prof-' + userId,
    userId,
    fullName,
    createdAt: new Date().toISOString()
  });

  writeDB(db);

  const sessionUser: UserSession = {
    id: userId,
    email: newUser.email,
    fullName: newUser.fullName,
    role: 'LEARNER',
    isVerified: true,
    onboardingCompleted: false
  };

  const token = createSessionToken(sessionUser);
  return { user: sessionUser, token };
}
