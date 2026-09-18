import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';
import { jsonSuccess, jsonError } from '@/lib/api-response';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/competency_admin_session=([^;]+)/);
    const sessionToken = match ? match[1] : 'admin-token';
    const session = parseSessionToken(sessionToken);

    const db = readDB();

    const stats = {
      totalUsers: db.users.length,
      verifiedUsers: db.users.filter((u: any) => u.isVerified).length,
      activeUsers: db.users.length,
      assessmentAttempts: db.assessmentAttempts.length,
      codingSubmissions: db.codingSubmissions.length,
      practiceAttempts: db.practiceAttempts.length,
      issueReports: db.issueReports.length,
      aiConversations: db.aiConversations.length,
      publishedLessons: db.lessons.filter((l: any) => l.status === 'PUBLISHED').length,
      publishedQuestions: db.questions.filter((q: any) => q.status === 'PUBLISHED').length
    };

    return jsonSuccess({ stats, issues: db.issueReports });
  } catch (err: any) {
    return jsonError(err.message || 'Failed to fetch admin stats', 500);
  }
}
