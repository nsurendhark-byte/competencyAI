import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB, writeDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    const tokenMatch = cookieHeader?.match(/competency_session=([^;]+)/);
    const session = tokenMatch ? parseSessionToken(tokenMatch[1]) : null;

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const subject = searchParams.get('subject') || 'ALL';
    const difficulty = searchParams.get('difficulty') || 'ALL';
    const search = searchParams.get('search') || '';

    const db = readDB();
    let questions = db.questions || [];

    if (subject !== 'ALL') {
      questions = questions.filter((q: any) => (q.subject || '').toUpperCase() === subject.toUpperCase());
    }

    if (difficulty !== 'ALL') {
      questions = questions.filter((q: any) => (q.difficulty || '').toUpperCase() === difficulty.toUpperCase());
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      questions = questions.filter((q: any) =>
        (q.title || '').toLowerCase().includes(query) ||
        (q.prompt || '').toLowerCase().includes(query) ||
        (q.topic || '').toLowerCase().includes(query)
      );
    }

    // Attach question options
    const enrichedQuestions = questions.map((q: any) => {
      const options = (db.questionOptions || []).filter((o: any) => o.questionId === q.id);
      return { ...q, options };
    });

    return NextResponse.json({
      total: enrichedQuestions.length,
      questions: enrichedQuestions
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    const tokenMatch = cookieHeader?.match(/competency_session=([^;]+)/);
    const session = tokenMatch ? parseSessionToken(tokenMatch[1]) : null;

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const db = readDB();
    db.questions = db.questions || [];
    db.questionOptions = db.questionOptions || [];

    // BULK IMPORT ACTION
    if (body.action === 'bulk_import') {
      const rawItems = Array.isArray(body.items) ? body.items : [];
      let validCount = 0;
      let invalidCount = 0;
      let duplicateCount = 0;
      const report: any[] = [];

      for (let i = 0; i < rawItems.length; i++) {
        const item = rawItems[i];
        const index = i + 1;

        if (!item.prompt || !item.subject || !Array.isArray(item.options) || item.options.length < 2) {
          invalidCount++;
          report.push({ index, status: 'INVALID', reason: 'Missing required prompt, subject, or minimum 2 options' });
          continue;
        }

        const hasCorrect = item.options.some((o: any) => o.isCorrect === true || o.correct === true);
        if (!hasCorrect) {
          invalidCount++;
          report.push({ index, status: 'INVALID', reason: 'No option marked as correct answer' });
          continue;
        }

        const isDuplicate = db.questions.some((q: any) => q.prompt.toLowerCase() === item.prompt.toLowerCase());
        if (isDuplicate) {
          duplicateCount++;
          report.push({ index, status: 'DUPLICATE', reason: 'Question prompt already exists in database' });
          continue;
        }

        // Insert Valid Question
        const questionId = 'q-imp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
        const newQ = {
          id: questionId,
          subject: item.subject,
          topic: item.topic || 'General Competency',
          levelNumber: item.levelNumber || 1,
          difficulty: (item.difficulty || 'MEDIUM').toUpperCase(),
          type: item.type || 'MCQ',
          title: item.title || item.prompt.substring(0, 50),
          prompt: item.prompt,
          codeSnippet: item.codeSnippet || null,
          explanation: item.explanation || 'Baseline verified competency item.',
          status: 'PUBLISHED',
          createdAt: new Date().toISOString()
        };

        db.questions.push(newQ);

        item.options.forEach((opt: any, optIdx: number) => {
          db.questionOptions.push({
            id: `opt-${questionId}-${optIdx + 1}`,
            questionId,
            optionText: typeof opt === 'string' ? opt : opt.text || opt.optionText || '',
            isCorrect: typeof opt === 'object' ? !!(opt.isCorrect || opt.correct) : (optIdx === 0)
          });
        });

        validCount++;
        report.push({ index, status: 'VALID', questionId });
      }

      writeDB(db);

      return NextResponse.json({
        total: rawItems.length,
        validCount,
        invalidCount,
        duplicateCount,
        report
      });
    }

    // SINGLE QUESTION CREATION
    const { subject, topic, levelNumber, difficulty, title, prompt, codeSnippet, explanation, options } = body;

    if (!prompt || !subject || !Array.isArray(options) || options.length < 2) {
      return NextResponse.json({ error: 'Prompt, subject, and at least 2 options are required' }, { status: 400 });
    }

    const questionId = 'q-adm-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const newQuestion = {
      id: questionId,
      subject,
      topic: topic || 'General Competency',
      levelNumber: Number(levelNumber) || 1,
      difficulty: (difficulty || 'MEDIUM').toUpperCase(),
      type: 'MCQ',
      title: title || prompt.substring(0, 50),
      prompt,
      codeSnippet: codeSnippet || null,
      explanation: explanation || 'Admin created question.',
      status: 'PUBLISHED',
      createdAt: new Date().toISOString()
    };

    db.questions.push(newQuestion);

    options.forEach((opt: any, idx: number) => {
      db.questionOptions.push({
        id: `opt-${questionId}-${idx + 1}`,
        questionId,
        optionText: typeof opt === 'string' ? opt : opt.text || opt.optionText || '',
        isCorrect: typeof opt === 'object' ? !!opt.isCorrect : (idx === 0)
      });
    });

    writeDB(db);

    return NextResponse.json({ success: true, question: newQuestion });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
