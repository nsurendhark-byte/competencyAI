import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB, writeDB } from '@/lib/db';
import { jsonSuccess, jsonError } from '@/lib/api-response';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return jsonError('Unauthorized admin access', 401);

    const match = cookieHeader.match(/competency_admin_session=([^;]+)/);
    if (!match) return jsonError('Unauthorized admin access', 401);

    const session = parseSessionToken(match[1]);
    if (!session || session.role !== 'ADMIN') return jsonError('Forbidden admin access', 403);

    const { type, skillId, levelNumber, topic } = await req.json();
    const db = readDB();

    const newId = 'ai-gen-' + crypto.randomUUID();

    if (type === 'LESSON') {
      const newLesson = {
        id: newId,
        moduleId: 'mod-js-1',
        skillId: skillId || 'skill-js',
        levelNumber: Number(levelNumber) || 1,
        title: `AI Generated Lesson: ${topic || 'Advanced Patterns'}`,
        description: `Generated draft lesson covering ${topic} at Level ${levelNumber}.`,
        theory: `### AI Generated Content Draft\n\nDeep dive into ${topic} theory and V8 engine execution lifecycle.`,
        codeExamples: JSON.stringify([{ label: 'Example', code: '// Sample code snippet' }]),
        estimatedTimeMinutes: 30,
        status: 'DRAFT',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.lessons.push(newLesson);
    } else if (type === 'QUESTION') {
      const newQuestion = {
        id: newId,
        skillId: skillId || 'skill-js',
        levelNumber: Number(levelNumber) || 1,
        type: 'MCQ',
        title: `AI Generated Level ${levelNumber} Assessment Question`,
        prompt: `Evaluate the runtime complexity of ${topic}.`,
        explanation: 'Detailed AI generated explanation.',
        difficulty: 'MEDIUM',
        status: 'DRAFT',
        createdAt: new Date().toISOString()
      };
      db.questions.push(newQuestion);
      db.questionOptions.push(
        { id: 'opt-ai-1', questionId: newId, optionText: 'O(N) linear execution time', isCorrect: true },
        { id: 'opt-ai-2', questionId: newId, optionText: 'O(N^2) quadratic nested loops', isCorrect: false }
      );
    }

    writeDB(db);

    return jsonSuccess({
      id: newId,
      status: 'DRAFT'
    }, 'AI Content generated successfully in DRAFT state.');
  } catch (err: any) {
    return jsonError(err.message || 'Failed to generate AI content', 500);
  }
}
