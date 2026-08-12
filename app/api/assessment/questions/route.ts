import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import { ensureSeededData } from '@/lib/seed-data';

export async function GET(req: Request) {
  try {
    ensureSeededData();
    const db = readDB();

    // Fetch baseline 100 questions ordered by level (1 to 10)
    const questions = db.questions.map(q => {
      const options = db.questionOptions
        .filter(o => o.questionId === q.id)
        .map(o => ({ id: o.id, optionText: o.optionText }));

      return {
        id: q.id,
        levelNumber: q.levelNumber,
        skillId: q.skillId,
        type: q.type,
        title: q.title,
        prompt: q.prompt,
        codeSnippet: q.codeSnippet,
        difficulty: q.difficulty,
        options
      };
    });

    return NextResponse.json({ total: questions.length, questions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
