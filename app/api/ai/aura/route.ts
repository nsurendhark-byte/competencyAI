import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { askAuraMentor } from '@/lib/ai';
import { readDB, writeDB } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/competency_session=([^;]+)/);
    const sessionToken = match ? match[1] : 'user-token';
    const session = parseSessionToken(sessionToken);

    const body = await req.json().catch(() => ({}));
    const message = body.message || body.prompt;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const db = readDB();
    const userId = session?.id || body.userId || 'usr-demo-01';
    const user = db.users.find(u => u.id === userId);
    const profile = db.profiles.find(p => p.userId === userId);
    const attempts = db.assessmentAttempts.filter(a => a.userId === userId);
    const latestAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;
    const readiness = db.careerReadiness.find(cr => cr.userId === userId);
    const masteries = db.skillMasteries.filter(sm => sm.userId === userId);

    const userName = user?.fullName || session?.fullName || 'Learner';
    const readinessScore = readiness ? readiness.readinessPercent : (latestAttempt ? Math.round(latestAttempt.overallScore * 0.85) : 65);

    const masteredSkills = masteries
      .filter(m => m.status === 'MASTERED' || m.masteryPercentage >= 70)
      .map(m => m.skillId.replace('skill-', '').toUpperCase());

    const weakAreas = masteries
      .filter(m => m.status === 'AVAILABLE' || m.masteryPercentage < 50)
      .map(m => m.skillId.replace('skill-', '').toUpperCase());

    if (weakAreas.length === 0) {
      weakAreas.push('Async Event Loop', 'SQL Indexing', 'System Design Optimization');
    }

    const reply = await askAuraMentor(message, {
      userName,
      career: 'Full-Stack Software Engineer',
      readinessScore,
      currentSkill: 'Full-Stack Vector',
      weakAreas,
      masteredSkills
    });

    // Save conversation log
    let conv = db.aiConversations.find(c => c.userId === userId);
    if (!conv) {
      conv = {
        id: 'conv-' + crypto.randomUUID(),
        userId: userId,
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
    console.error('[Aura Route Error]:', err);
    return NextResponse.json({ error: 'AI provider error', details: err.message }, { status: 500 });
  }
}
