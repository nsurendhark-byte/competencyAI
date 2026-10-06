import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB, writeDB } from '@/lib/db';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieHeader = req.headers.get('cookie');
    const tokenMatch = cookieHeader?.match(/competency_session=([^;]+)/);
    const session = tokenMatch ? parseSessionToken(tokenMatch[1]) : null;

    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized admin access required' }, { status: 403 });
    }

    const questionId = params.id;
    const db = readDB();

    db.questions = (db.questions || []).filter((q: any) => q.id !== questionId);
    db.questionOptions = (db.questionOptions || []).filter((o: any) => o.questionId !== questionId);
    db.assessmentQuestions = (db.assessmentQuestions || []).filter((aq: any) => aq.questionId !== questionId);

    writeDB(db);

    return NextResponse.json({ success: true, message: 'Question deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
