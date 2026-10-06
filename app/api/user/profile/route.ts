import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB, writeDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const match = cookieHeader.match(/competency_session=([^;]+)/);
    if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = readDB();
    const user = db.users.find((u: any) => u.id === session.id || u.email.toLowerCase() === session.email.toLowerCase());
    const profile = db.profiles.find((p: any) => p.userId === (user?.id || session.id));

    return NextResponse.json({
      user: {
        id: user?.id || session.id,
        fullName: user?.fullName || session.fullName,
        email: user?.email || session.email,
        bio: profile?.bio || '',
        avatarUrl: profile?.avatarUrl || null,
        targetCareerId: profile?.targetCareerId || 'career-fs-01',
        weeklyHoursTarget: profile?.weeklyHoursTarget || 10
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const match = cookieHeader.match(/competency_session=([^;]+)/);
    if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { fullName, email, bio, targetCareerId, weeklyHoursTarget } = body;

    const db = readDB();
    const userIndex = db.users.findIndex((u: any) => u.id === session.id || u.email.toLowerCase() === session.email.toLowerCase());

    if (userIndex >= 0) {
      if (fullName) db.users[userIndex].fullName = fullName.trim();
      if (email) db.users[userIndex].email = email.trim().toLowerCase();
      db.users[userIndex].updatedAt = new Date().toISOString();
    }

    const userId = userIndex >= 0 ? db.users[userIndex].id : session.id;
    let profileIndex = db.profiles.findIndex((p: any) => p.userId === userId);

    if (profileIndex >= 0) {
      if (bio !== undefined) db.profiles[profileIndex].bio = bio;
      if (targetCareerId) db.profiles[profileIndex].targetCareerId = targetCareerId;
      if (weeklyHoursTarget) db.profiles[profileIndex].weeklyHoursTarget = Number(weeklyHoursTarget);
      db.profiles[profileIndex].updatedAt = new Date().toISOString();
    } else {
      db.profiles.push({
        id: 'prof-' + userId,
        userId,
        bio: bio || '',
        targetCareerId: targetCareerId || 'career-fs-01',
        weeklyHoursTarget: Number(weeklyHoursTarget) || 10,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    writeDB(db);

    const updatedUser = {
      id: userId,
      fullName: userIndex >= 0 ? db.users[userIndex].fullName : fullName,
      email: userIndex >= 0 ? db.users[userIndex].email : email,
      role: session.role || 'LEARNER'
    };

    return NextResponse.json({
      success: true,
      user: updatedUser
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
