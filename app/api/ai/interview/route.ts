import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB, writeDB } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const match = cookieHeader.match(/competency_session=([^;]+)/);
    if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { mode, answers } = await req.json();
    const db = readDB();

    const sessionId = 'int-' + crypto.randomUUID();
    const score = 86.5;

    const resultData = {
      score,
      mode: mode || 'TECHNICAL',
      knowledgeRating: '9.0/10',
      problemSolvingRating: '8.5/10',
      communicationRating: '8.5/10',
      weakAreas: ['Microtask vs Macrotask Event Loop Timing', 'Distributed Lock Implementation'],
      recommendations: [
        'Review Level 5 Async Promises theory lesson',
        'Solve System Design Practice Challenge: Redis Cache Lock'
      ]
    };

    db.interviewSessions.push({
      id: sessionId,
      userId: session.id,
      mode: mode || 'TECHNICAL',
      status: 'COMPLETED',
      createdAt: new Date().toISOString()
    });

    db.interviewResults.push({
      id: 'ir-' + crypto.randomUUID(),
      interviewSessionId: sessionId,
      score,
      feedback: JSON.stringify(resultData),
      createdAt: new Date().toISOString()
    });

    writeDB(db);

    return NextResponse.json(resultData);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
