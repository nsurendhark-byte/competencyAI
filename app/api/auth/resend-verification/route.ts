import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }

    const db = readDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json({ error: 'User with this email does not exist.' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: 'Email is already verified.' }, { status: 200 });
    }

    // Check SMTP / Email Provider Configuration (Requirement 8)
    const emailProviderKey = process.env.EMAIL_PROVIDER_KEY;
    if (!emailProviderKey) {
      return NextResponse.json({
        error: 'Email Service Provider Error: EMAIL_PROVIDER_KEY is not configured in application environment variables. Verification email cannot be sent automatically. Please use manual code verification or configure provider key.'
      }, { status: 503 });
    }

    return NextResponse.json({ message: 'Verification email dispatched successfully.' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing request' }, { status: 500 });
  }
}
