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

    const db = readDB();
    const skills = db.skills || [];
    const dependencies = db.skillDependencies || [];

    const enrichedDependencies = dependencies.map((dep: any) => {
      const targetSkill = skills.find((s: any) => s.id === dep.skillId);
      const prereqSkill = skills.find((s: any) => s.id === dep.prerequisiteId);
      return {
        ...dep,
        targetSkillName: targetSkill ? targetSkill.name : dep.skillId,
        prerequisiteSkillName: prereqSkill ? prereqSkill.name : dep.prerequisiteId
      };
    });

    return NextResponse.json({
      skills,
      dependencies: enrichedDependencies
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
    db.skills = db.skills || [];
    db.skillDependencies = db.skillDependencies || [];

    // ACTION 1: CREATE SKILL NODE
    if (body.action === 'create_skill') {
      const { name, category, description } = body;
      if (!name || !category) {
        return NextResponse.json({ error: 'Name and category are required' }, { status: 400 });
      }

      const newId = 'skill-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
      const newSkill = {
        id: newId,
        careerId: db.careers[0]?.id || 'career-fs-01',
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        category,
        description: description || 'Knowledge graph node item.',
        status: 'PUBLISHED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      db.skills.push(newSkill);
      writeDB(db);

      return NextResponse.json({ success: true, skill: newSkill });
    }

    // ACTION 2: CREATE DEPENDENCY EDGE
    if (body.action === 'create_edge') {
      const { skillId, prerequisiteId } = body;
      if (!skillId || !prerequisiteId || skillId === prerequisiteId) {
        return NextResponse.json({ error: 'Target skill and prerequisite skill must be different' }, { status: 400 });
      }

      const existing = db.skillDependencies.find(d => d.skillId === skillId && d.prerequisiteId === prerequisiteId);
      if (existing) {
        return NextResponse.json({ error: 'Dependency edge already exists' }, { status: 400 });
      }

      const edgeId = 'dep-' + Date.now();
      const newEdge = { id: edgeId, skillId, prerequisiteId };
      db.skillDependencies.push(newEdge);
      writeDB(db);

      return NextResponse.json({ success: true, edge: newEdge });
    }

    // ACTION 3: DELETE DEPENDENCY EDGE
    if (body.action === 'delete_edge') {
      const { edgeId } = body;
      db.skillDependencies = db.skillDependencies.filter(d => d.id !== edgeId);
      writeDB(db);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
