'use client';

import { useState, useEffect } from 'react';
import { LineChart, Target, Code2, CheckCircle2, Clock } from 'lucide-react';

export default function ProgressPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/dashboard-data')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-16 text-center font-mono text-xs text-cyan-400">LOADING PROGRESS ANALYTICS...</div>;

  const stats = data?.stats || {};

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl glow-cyan">
        <div className="font-mono text-xs text-cyan-400 mb-1">VERIFIED EVIDENCE PROGRESS</div>
        <h1 className="text-2xl font-bold text-white">Learning & Skill Progress Analytics</h1>
        <p className="text-xs text-slate-300 mt-1">Real database records of skill mastery, coding submissions, and study hours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-surface border border-surfaceBorder rounded-2xl space-y-2">
          <div className="font-mono text-xs text-slate-400">ASSESSMENT SCORE</div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats.overallScore || 0}%</div>
          <p className="text-xs text-slate-400">Diagnostic 100-question evaluation accuracy</p>
        </div>

        <div className="p-6 bg-surface border border-surfaceBorder rounded-2xl space-y-2">
          <div className="font-mono text-xs text-slate-400">CODING CHALLENGES PASSED</div>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono">{stats.codingPassedCount || 0}</div>
          <p className="text-xs text-slate-400">Verified by isolated sandbox harness</p>
        </div>

        <div className="p-6 bg-surface border border-surfaceBorder rounded-2xl space-y-2">
          <div className="font-mono text-xs text-slate-400">KNOWLEDGE DAG NODES</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">{stats.skillsMasteredCount || 0} / {stats.totalSkillsCount || 5}</div>
          <p className="text-xs text-slate-400">Skills mastered across 10 levels</p>
        </div>
      </div>
    </div>
  );
}
