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

    const { answers } = await req.json(); // { questionId: selectedOptionId }
    const db = readDB();
    const userId = session.id;

    let correctCount = 0;
    const levelStats: Record<number, { total: number; correct: number }> = {};
    for (let l = 1; l <= 10; l++) levelStats[l] = { total: 0, correct: 0 };

    const attemptId = 'att-' + crypto.randomUUID();

    // Evaluate answers
    Object.entries(answers).forEach(([qId, optId]) => {
      const q = db.questions.find(item => item.id === qId);
      if (q) {
        const correctOpt = db.questionOptions.find(o => o.questionId === qId && o.isCorrect);
        const isCorrect = correctOpt && correctOpt.id === optId;

        if (isCorrect) {
          correctCount++;
          if (levelStats[q.levelNumber]) levelStats[q.levelNumber].correct++;
        }
        if (levelStats[q.levelNumber]) levelStats[q.levelNumber].total++;

        db.assessmentAnswers.push({
          id: 'ans-' + crypto.randomUUID(),
          attemptId,
          questionId: qId,
          selectedOptionId: String(optId),
          userCode: null,
          isCorrect: !!isCorrect,
          timeTakenSeconds: 15,
          createdAt: new Date().toISOString()
        });
      }
    });

    const totalAnswered = Object.keys(answers).length || 100;
    const overallScore = Math.round((correctCount / Math.max(totalAnswered, 1)) * 100);

    // Record assessment attempt
    db.assessmentAttempts.push({
      id: attemptId,
      userId,
      assessmentId: 'assessment-baseline-100',
      overallScore,
      status: 'COMPLETED',
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    });

    // Update Skill Masteries per skill
    db.skills.forEach(skill => {
      let masteryIdx = db.skillMasteries.findIndex(m => m.userId === userId && m.skillId === skill.id);
      const level10Proficiency = Math.min(10, Math.max(1, Math.floor(overallScore / 10)));

      if (masteryIdx >= 0) {
        db.skillMasteries[masteryIdx].levelMastered = level10Proficiency;
        db.skillMasteries[masteryIdx].masteryPercentage = overallScore;
        db.skillMasteries[masteryIdx].status = overallScore >= 80 ? 'MASTERED' : overallScore >= 50 ? 'IN_PROGRESS' : 'AVAILABLE';
      } else {
        db.skillMasteries.push({
          id: 'sm-' + crypto.randomUUID(),
          userId,
          skillId: skill.id,
          levelMastered: level10Proficiency,
          masteryPercentage: overallScore,
          status: overallScore >= 80 ? 'MASTERED' : overallScore >= 50 ? 'IN_PROGRESS' : 'AVAILABLE',
          updatedAt: new Date().toISOString()
        });
      }
    });

    // Update Career Readiness
    let readinessIdx = db.careerReadiness.findIndex(cr => cr.userId === userId);
    const readinessData = {
      id: readinessIdx >= 0 ? db.careerReadiness[readinessIdx].id : 'cr-' + crypto.randomUUID(),
      userId,
      readinessPercent: Math.round(overallScore * 0.85),
      skillScore: overallScore,
      codingScore: 75.0,
      projectScore: 60.0,
      interviewScore: 70.0,
      breakdown: JSON.stringify({ overallScore, levelStats }),
      updatedAt: new Date().toISOString()
    };

    if (readinessIdx >= 0) db.careerReadiness[readinessIdx] = readinessData;
    else db.careerReadiness.push(readinessData);

    // Auto-generate initial roadmap if not present
    if (!db.roadmaps.some(r => r.userId === userId)) {
      const roadmapId = 'rm-' + crypto.randomUUID();
      db.roadmaps.push({
        id: roadmapId,
        userId,
        careerId: 'career-fs-01',
        title: 'Personalized Full-Stack Mastery Roadmap',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      const weeks = [
        { week: 1, skill: 'JavaScript', title: 'Execution Context & Memory Management' },
        { week: 2, skill: 'JavaScript', title: 'Asynchronous Event Loop & Promises' },
        { week: 3, skill: 'React', title: 'Virtual DOM & Custom Hook Architecture' },
        { week: 4, skill: 'Node.js', title: 'RESTful API & Middleware Pipelines' },
        { week: 5, skill: 'SQL', title: 'Relational Schema Design & Indexing' },
        { week: 6, skill: 'System Design', title: 'Distributed Caching & Load Balancing' },
      ];

      weeks.forEach(w => {
        db.roadmapItems.push({
          id: 'rmi-' + crypto.randomUUID(),
          roadmapId,
          weekNumber: w.week,
          skillName: w.skill,
          title: w.title,
          description: `Focus on closing level gaps in ${w.skill}.`,
          isCompleted: false,
          createdAt: new Date().toISOString()
        });
      });
    }

    // Unlock Achievement if high score
    if (!db.userAchievements.some(ua => ua.userId === userId && ua.achievementId === 'ach-1')) {
      db.userAchievements.push({
        id: 'ua-' + crypto.randomUUID(),
        userId,
        achievementId: 'ach-1',
        unlockedAt: new Date().toISOString()
      });
    }

    writeDB(db);

    return NextResponse.json({
      success: true,
      attemptId,
      overallScore,
      levelStats,
      totalCorrect: correctCount,
      totalQuestions: totalAnswered
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
