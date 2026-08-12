'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Target,
  Code2,
  AlertTriangle,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  LineChart
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-16 text-center font-mono text-xs text-cyan-400">CONNECTING TO ADMIN TELEMETRY DATABASE...</div>;

  const stats = data?.stats || {};
  const issues = data?.issues || [];

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">OPERATIONS CONSOLE V2.0</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CompetencyAI Control Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time database statistics & content publishing engine.</p>
        </div>

        <Link
          href="/admin/ai"
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-mono font-bold text-xs rounded-lg hover:brightness-110 flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" /> AI CONTENT BUILDER
        </Link>
      </div>

      {/* Real Data Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>TOTAL USERS</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalUsers || 0}</div>
          <div className="text-[10px] text-emerald-400">{stats.verifiedUsers || 0} VERIFIED</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>DIAGNOSTIC ATTEMPTS</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.assessmentAttempts || 0}</div>
          <div className="text-[10px] text-slate-500">100-Q Diagnostic</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>CODING SUBMISSIONS</span>
            <Code2 className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.codingSubmissions || 0}</div>
          <div className="text-[10px] text-slate-500">Sandbox runs</div>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>ISSUE REPORTS</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.issueReports || 0}</div>
          <div className="text-[10px] text-rose-400">Triage Desk</div>
        </div>
      </div>

      {/* Content Publishing Lifecycle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" /> PUBLISHED CONTENT LIFECYCLE
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <span>PUBLISHED LESSONS</span>
              <span className="text-cyan-400 font-bold">{stats.publishedLessons || 0} Active</span>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <span>10-LEVEL QUESTIONS</span>
              <span className="text-cyan-400 font-bold">{stats.publishedQuestions || 0} Published</span>
            </div>
          </div>
        </div>

        {/* Issue Triage Desk Snapshot */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> ISSUE TRIAGE QUEUE
            </h3>
            <Link href="/admin/issues" className="text-cyan-400 hover:underline text-[10px]">VIEW ALL ISSUES</Link>
          </div>

          {issues.length > 0 ? (
            <div className="space-y-2">
              {issues.slice(0, 3).map((iss: any) => (
                <div key={iss.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                  <div className="font-bold text-white">{iss.contentType}: {iss.issueType}</div>
                  <div className="text-slate-400">{iss.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500">No active issue reports reported by learners yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
