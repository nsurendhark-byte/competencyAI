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

    const userMasteries = db.skillMasteries.filter(sm => sm.userId === userId);

    const nodes = db.skills.map(s => {
      const mastery = userMasteries.find(m => m.skillId === s.id);
      const prereqs = db.skillDependencies.filter(d => d.skillId === s.id).map(d => d.prerequisiteId);

      return {
        id: s.id,
        name: s.name,
        category: s.category,
        description: s.description,
        prerequisites: prereqs,
        levelMastered: mastery ? mastery.levelMastered : 1,
        masteryPercentage: mastery ? mastery.masteryPercentage : 0,
        status: mastery ? mastery.status : 'AVAILABLE'
      };
    });

    return NextResponse.json({ nodes, edges: db.skillDependencies });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
