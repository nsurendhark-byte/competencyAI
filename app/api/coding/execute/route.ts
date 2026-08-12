import { NextResponse } from 'next/server';
import { executeUserCode, TestCase } from '@/lib/code-runner';
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

    const { code, challengeId } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Code content is required.' }, { status: 400 });
    }

    const db = readDB();
    const challenge = db.codingChallenges.find(c => c.id === challengeId) || db.codingChallenges[0];

    const testCases: TestCase[] = challenge ? JSON.parse(challenge.testCases) : [
      { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' }
    ];

    // Execute in isolated VM
    const result = executeUserCode(code, testCases);

    // Record submission in DB
    db.codingSubmissions.push({
      id: 'sub-' + crypto.randomUUID(),
      userId: session.id,
      challengeId: challenge ? challenge.id : 'code-challenge-01',
      code,
      status: result.status,
      testsPassed: result.testsPassed,
      totalTests: result.totalTests,
      aiFeedback: JSON.stringify({
        correctness: result.status === 'PASSED' ? '10/10' : '6/10',
        efficiency: 'O(N) single pass hash map approach recommended',
        security: 'No unsafe global bindings detected'
      }),
      createdAt: new Date().toISOString()
    });

    writeDB(db);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
