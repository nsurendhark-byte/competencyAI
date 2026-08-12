import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';
import { generateAiCompetencyGapAnalysis } from '@/lib/ai';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const match = cookieHeader.match(/competency_session=([^;]+)/);
    if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = readDB();
    const attempts = db.assessmentAttempts.filter(a => a.userId === session.id);
    const score = attempts.length > 0 ? attempts[attempts.length - 1].overallScore : 65;

    const analysis = await generateAiCompetencyGapAnalysis(
      'Full-Stack Software Engineer',
      [{ name: 'JavaScript', level: 4 }, { name: 'React', level: 3 }],
      score,
      ['Asynchronous Event Loop', 'SQL Indexing', 'System Design']
    );

    return NextResponse.json(analysis);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
