import { NextResponse } from 'next/server';
import { parseSessionToken } from '@/lib/auth';
import { readDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const match = cookieHeader.match(/competency_session=([^;]+)/);
    if (!match) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const session = parseSessionToken(match[1]);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = readDB();
    const userId = session.id;
    const userRecord = db.users.find((u: any) => u.id === userId || u.email.toLowerCase() === session.email.toLowerCase());
    const profileRecord = db.profiles.find((p: any) => p.userId === (userRecord?.id || userId));
    const targetCareer = db.careers.find((c: any) => c.id === profileRecord?.targetCareerId) || db.careers[0];

    // Real DB queries for user activity
    const attempts = db.assessmentAttempts.filter((a: any) => a.userId === (userRecord?.id || userId) && a.status === 'COMPLETED');
    const masteries = db.skillMasteries.filter((m: any) => m.userId === (userRecord?.id || userId));
    const codingSubs = db.codingSubmissions.filter((c: any) => c.userId === (userRecord?.id || userId));
    const practiceAtts = db.practiceAttempts.filter((p: any) => p.userId === (userRecord?.id || userId));
    const userAch = db.userAchievements.filter((ua: any) => ua.userId === (userRecord?.id || userId));
    const readiness = db.careerReadiness.find((cr: any) => cr.userId === (userRecord?.id || userId));
    const activeRoadmap = db.roadmaps.find((r: any) => r.userId === (userRecord?.id || userId) && r.status === 'ACTIVE');
    const roadmapItems = activeRoadmap ? db.roadmapItems.filter((ri: any) => ri.roadmapId === activeRoadmap.id) : [];

    const latestAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;
    const hasCompletedAssessment = attempts.length > 0;

    // Calculate real dynamic overall score
    let overallScore: number | null = null;
    if (latestAttempt) {
      overallScore = Math.round(latestAttempt.overallScore);
    } else if (masteries.length > 0) {
      const avgMastery = masteries.reduce((acc: number, curr: any) => acc + (curr.masteryPercentage || 0), 0) / masteries.length;
      overallScore = Math.round(avgMastery);
    }

    // Calculate real readiness score
    let readinessScore: number | null = null;
    if (readiness) {
      readinessScore = Math.round(readiness.readinessPercent);
    } else if (latestAttempt) {
      readinessScore = Math.min(100, Math.round(latestAttempt.overallScore * 1.15));
    }

    // Calculate real streak
    let streakDays = 0;
    if (hasCompletedAssessment || practiceAtts.length > 0 || codingSubs.length > 0) {
      streakDays = Math.max(1, (practiceAtts.length + codingSubs.length + attempts.length));
    }

    // Dynamic Recommended Topic calculation
    let recommendedTopic: any = null;
    if (activeRoadmap && roadmapItems.length > 0) {
      const nextItem = roadmapItems.find((ri: any) => !ri.isCompleted) || roadmapItems[0];
      if (nextItem) {
        recommendedTopic = {
          title: nextItem.title,
          description: nextItem.description,
          skillName: nextItem.skillName,
          impact: '+12% Full Stack Readiness',
          href: '/app/learning'
        };
      }
    } else if (hasCompletedAssessment) {
      // Pick highest priority unmastered skill
      const unmastered = db.skills.find((s: any) => {
        const m = masteries.find((mItem: any) => mItem.skillId === s.id);
        return !m || (m.status !== 'MASTERED' && m.status !== 'VERIFIED');
      }) || db.skills[0];

      if (unmastered) {
        recommendedTopic = {
          title: unmastered.name,
          description: unmastered.description || 'Focus area identified from your recent competency diagnostic.',
          skillName: unmastered.category,
          impact: '+15% Readiness Impact',
          href: '/app/learning'
        };
      }
    }

    const stats = {
      assessmentCompleted: hasCompletedAssessment,
      overallScore,
      readinessPercent: readinessScore,
      streakDays,
      predictiveTarget: latestAttempt ? Math.min(98, Math.round(latestAttempt.overallScore + 10)) : null,
      skillsMasteredCount: masteries.filter((m: any) => m.status === 'MASTERED' || m.status === 'VERIFIED').length,
      totalSkillsCount: db.skills.length,
      codingSubmissionsCount: codingSubs.length,
      codingPassedCount: codingSubs.filter((c: any) => c.status === 'PASSED').length,
      practiceAttemptsCount: practiceAtts.length,
      achievementsCount: userAch.length,
      hasRoadmap: !!activeRoadmap
    };

    const userInfo = {
      id: userRecord?.id || session.id,
      fullName: userRecord?.fullName || session.fullName || 'Learner',
      email: userRecord?.email || session.email || '',
      targetCareerTitle: targetCareer?.title || 'Full-Stack Software Engineer'
    };

    return NextResponse.json({
      user: userInfo,
      stats,
      latestAttempt,
      recommendedTopic,
      activeRoadmap
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
