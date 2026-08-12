import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const match = cookieHeader.match(/competency_admin_session=([^;]+)/);
    if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session || session.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const db = readDB();

    const stats = {
      totalUsers: db.users.length,
      verifiedUsers: db.users.filter(u => u.isVerified).length,
      activeUsers: db.users.length,
      assessmentAttempts: db.assessmentAttempts.length,
      codingSubmissions: db.codingSubmissions.length,
      practiceAttempts: db.practiceAttempts.length,
      issueReports: db.issueReports.length,
      aiConversations: db.aiConversations.length,
      publishedLessons: db.lessons.filter(l => l.status === 'PUBLISHED').length,
      publishedQuestions: db.questions.filter(q => q.status === 'PUBLISHED').length
    };

    return NextResponse.json({ stats, issues: db.issueReports });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
