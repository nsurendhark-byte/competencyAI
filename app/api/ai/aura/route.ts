import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { askAuraMentor } from '@/lib/ai';
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

    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 });

    const reply = await askAuraMentor(message, {
      currentSkill: 'JavaScript & Async Programming',
      lessonTitle: 'Understanding V8 Heap & Stack',
      weakAreas: ['Event Loop Microtasks', 'SQL Indexing']
    });

    const db = readDB();
    let conv = db.aiConversations.find(c => c.userId === session.id);
    if (!conv) {
      conv = {
        id: 'conv-' + crypto.randomUUID(),
        userId: session.id,
        topic: 'Aura Mentor',
        createdAt: new Date().toISOString()
      };
      db.aiConversations.push(conv);
    }

    db.aiMessages.push({
      id: 'msg-' + crypto.randomUUID(),
      conversationId: conv.id,
      sender: 'USER',
      content: message,
      createdAt: new Date().toISOString()
    });

    db.aiMessages.push({
      id: 'msg-' + crypto.randomUUID(),
      conversationId: conv.id,
      sender: 'AURA',
      content: reply,
      createdAt: new Date().toISOString()
    });

    writeDB(db);

    return NextResponse.json({ reply });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
