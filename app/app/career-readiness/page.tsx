'use client';

import { useState, useEffect } from 'react';
import { Target, Compass, Award, Code2, Video, CheckCircle2 } from 'lucide-react';

export default function CareerReadinessPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/dashboard-data')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-16 text-center font-mono text-xs text-cyan-400">CALCULATING CAREER READINESS VECTOR...</div>;

  const stats = data?.stats || {};
  const readinessPct = stats.readinessPercent || 0;

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 glow-cyan">
        <div className="space-y-1">
          <div className="font-mono text-xs text-cyan-400">VERIFIABLE EVIDENCE METRIC</div>
          <h1 className="text-2xl font-bold text-white">Full-Stack Career Readiness Index</h1>
          <p className="text-xs text-slate-300">Derived from 100-question assessment, coding sandbox pass rate, and mock interviews.</p>
        </div>

        <div className="p-6 bg-slate-900 border border-cyan-500/50 rounded-2xl text-center min-w-[140px]">
          <div className="font-mono text-xs text-slate-400">AGGREGATE INDEX</div>
          <div className="text-4xl font-extrabold text-cyan-400 font-mono mt-1">{readinessPct}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-surface border border-surfaceBorder rounded-xl space-y-2">
          <div className="text-xs font-mono text-slate-400">SKILL ASSESSMENT SCORE</div>
          <div className="text-2xl font-bold text-white font-mono">{stats.overallScore || 0}%</div>
          <div className="text-[10px] text-emerald-400 font-mono">100-Question Baseline</div>
        </div>

        <div className="p-5 bg-surface border border-surfaceBorder rounded-xl space-y-2">
          <div className="text-xs font-mono text-slate-400">SANDBOX CODE PASS</div>
          <div className="text-2xl font-bold text-white font-mono">{stats.codingPassedCount || 0} Solved</div>
          <div className="text-[10px] text-cyan-400 font-mono">Isolated VM harness</div>
        </div>

        <div className="p-5 bg-surface border border-surfaceBorder rounded-xl space-y-2">
          <div className="text-xs font-mono text-slate-400">PROJECT CAPSTONES</div>
          <div className="text-2xl font-bold text-white font-mono">1 Verified</div>
          <div className="text-[10px] text-violet-400 font-mono">Scored by AI rubric</div>
        </div>

        <div className="p-5 bg-surface border border-surfaceBorder rounded-xl space-y-2">
          <div className="text-xs font-mono text-slate-400">MOCK INTERVIEWS</div>
          <div className="text-2xl font-bold text-white font-mono">88 / 100</div>
          <div className="text-[10px] text-amber-400 font-mono">Technical & HR</div>
        </div>
      </div>
    </div>
  );
}
