'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GitBranch, CheckCircle2, Circle, ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/dashboard-data')
      .then(res => res.json())
      .then(data => {
        setRoadmap(data.activeRoadmap);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-xs font-mono text-cyan-400">
        GENERATING PERSONALIZED COMPETENCY ROADMAP...
      </div>
    );
  }

  const weeks = [
    { week: 1, title: 'JavaScript Execution Context & Heap Stack', desc: 'V8 internals, scope chain, closure memory lifecycle.', status: 'ACTIVE' },
    { week: 2, title: 'Asynchronous JS, Promises & Microtasks', desc: 'Event loop, async/await queue resolution, event emitters.', status: 'QUEUED' },
    { week: 3, title: 'React Architecture & Custom Hook Design', desc: 'Virtual DOM diffing, fiber tree reconciliation, state machines.', status: 'QUEUED' },
    { week: 4, title: 'Node.js REST Engine & Middleware Pipelines', desc: 'Stream I/O, JWT security, express middleware design.', status: 'QUEUED' },
    { week: 5, title: 'SQL Relational Schemas & Indexing Strategies', desc: 'ACID transactions, B-Tree indexes, foreign key constraints.', status: 'QUEUED' },
    { week: 6, title: 'Distributed Systems & Load Balancing', desc: 'Caching algorithms, microservice architecture, CAP theorem.', status: 'QUEUED' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface border border-surfaceBorder p-6 rounded-2xl glow-cyan">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">DYNAMIC LEARNING PATH</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Personalized Competency Roadmap</h1>
          <p className="text-xs text-slate-400 mt-1">Generated dynamically from diagnostic gap analysis & weekly commitment target.</p>
        </div>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {weeks.map((item) => {
          const isActive = item.status === 'ACTIVE';
          return (
            <div
              key={item.week}
              className={`p-6 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isActive
                  ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500 shadow-lg'
                  : 'bg-surface border-surfaceBorder text-slate-400 opacity-80'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`font-mono text-sm font-bold w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                  isActive ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}>
                  W{item.week}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{item.title}</span>
                    {isActive && <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-400 text-[10px] font-mono">ACTIVE FOCUS</span>}
                  </div>
                  <p className="text-xs text-slate-300">{item.desc}</p>
                </div>
              </div>

              {isActive ? (
                <Link
                  href="/app/learning"
                  className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold font-mono text-xs rounded-lg hover:brightness-110 flex items-center gap-1 shrink-0"
                >
                  START LESSON <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-xs font-mono text-slate-500 shrink-0">LOCKED (COMPLETE W{item.week - 1})</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
