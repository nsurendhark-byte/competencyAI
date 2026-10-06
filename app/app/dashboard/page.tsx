'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Target,
  Network,
  GitBranch,
  Code2,
  Sparkles,
  ArrowRight,
  Flame,
  Compass,
  CheckCircle2,
  TrendingUp,
  Award,
  BookOpen,
  HelpCircle,
  Play
} from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/dashboard-data')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats || {};
  const user = data?.user || {};
  const recommendedTopic = data?.recommendedTopic || null;
  const hasAssessment = stats.assessmentCompleted;

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 bg-slate-900/60 rounded-2xl border border-slate-800" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-36 bg-slate-900/60 rounded-2xl border border-slate-800" />
          <div className="h-36 bg-slate-900/60 rounded-2xl border border-slate-800" />
          <div className="h-36 bg-slate-900/60 rounded-2xl border border-slate-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* HERO BANNER CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0A0F1D]/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#5B3DF5]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-[11px] font-mono font-semibold tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                LEARNER DASHBOARD
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.fullName || 'Learner'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Target Career Vector: <strong className="text-white font-semibold">{user?.targetCareerTitle || 'Full-Stack Software Engineer'}</strong>.
            </p>
          </div>

          {!hasAssessment && (
            <Link
              href="/app/assessment/diagnostic"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border border-cyan-400/40"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Diagnostic Assessment</span>
            </Link>
          )}
        </div>

        {/* METRICS ROW - REAL DB DATA OR PROFESSIONAL EMPTY STATES */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* OVERALL MASTERY */}
          <div className="bg-[#050A19]/90 border border-slate-800 p-4 rounded-2xl space-y-1 relative group hover:border-indigo-500/40 transition-all">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">OVERALL MASTERY</div>
            {stats.overallScore !== null && stats.overallScore !== undefined ? (
              <>
                <div className="text-2xl font-extrabold text-white">{stats.overallScore}%</div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium font-mono">
                  <TrendingUp className="w-3 h-3" /> Verified DB Score
                </div>
              </>
            ) : (
              <>
                <div className="text-base font-bold text-slate-300">Pending Test</div>
                <div className="text-[10px] text-slate-400 font-mono">Complete assessment to unlock</div>
              </>
            )}
          </div>

          {/* READINESS SCORE */}
          <div className="bg-[#050A19]/90 border border-slate-800 p-4 rounded-2xl space-y-1 relative group hover:border-cyan-500/40 transition-all">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">READINESS SCORE</div>
            {stats.readinessPercent !== null && stats.readinessPercent !== undefined && stats.readinessPercent > 0 ? (
              <>
                <div className="text-2xl font-extrabold text-[#22D3EE]">{stats.readinessPercent}%</div>
                <div className="text-[10px] text-slate-400 font-mono">Industry Target Match</div>
              </>
            ) : (
              <>
                <div className="text-base font-bold text-cyan-400">Uncalculated</div>
                <div className="text-[10px] text-slate-400 font-mono">Take test to evaluate fit</div>
              </>
            )}
          </div>

          {/* ACTIVE STREAK */}
          <div className="bg-[#050A19]/90 border border-slate-800 p-4 rounded-2xl space-y-1 relative group hover:border-amber-500/40 transition-all">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">ACTIVE STREAK</div>
            <div className="text-2xl font-extrabold text-amber-400 flex items-center gap-1.5">
              <Flame className="w-5 h-5 fill-amber-400/20 text-amber-400" />
              {stats.streakDays > 0 ? `${stats.streakDays}d` : '0d'}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {stats.streakDays > 0 ? 'Active study activity' : 'Complete 1 session today'}
            </div>
          </div>

          {/* PREDICTIVE TARGET */}
          <div className="bg-[#050A19]/90 border border-slate-800 p-4 rounded-2xl space-y-1 relative group hover:border-violet-500/40 transition-all">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">PREDICTIVE TARGET</div>
            {stats.predictiveTarget ? (
              <>
                <div className="text-2xl font-extrabold text-[#818CF8]">{stats.predictiveTarget}%</div>
                <div className="text-[10px] text-slate-400 font-mono">Pass probability</div>
              </>
            ) : (
              <>
                <div className="text-base font-bold text-indigo-400">Requires Data</div>
                <div className="text-[10px] text-slate-400 font-mono">Complete initial quiz</div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* THREE FEATURE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/app/knowledge-graph" className="group bg-[#0A0F1D]/80 border border-slate-800 hover:border-[#5B3DF5] p-6 rounded-2xl space-y-3 transition-all hover:shadow-xl hover:shadow-[#5B3DF5]/10">
          <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-slate-800 flex items-center justify-center text-[#22D3EE] group-hover:scale-105 transition-transform">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#22D3EE] transition-colors">Knowledge Graph</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Visualize topic prerequisite chains, skill dependencies, and unlock paths in real-time.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#5B3DF5] flex items-center gap-1 pt-1">
            <span>Explore Graph</span> <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/app/learning" className="group bg-[#0A0F1D]/80 border border-slate-800 hover:border-[#5B3DF5] p-6 rounded-2xl space-y-3 transition-all hover:shadow-xl hover:shadow-[#5B3DF5]/10">
          <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-slate-800 flex items-center justify-center text-[#5B3DF5] group-hover:scale-105 transition-transform">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#22D3EE] transition-colors">Personalized Roadmap</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Adaptive study sequence tailored dynamically to your pace, weekly hours, and mastery results.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#5B3DF5] flex items-center gap-1 pt-1">
            <span>View Roadmap</span> <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/app/career-readiness" className="group bg-[#0A0F1D]/80 border border-slate-800 hover:border-[#5B3DF5] p-6 rounded-2xl space-y-3 transition-all hover:shadow-xl hover:shadow-[#5B3DF5]/10">
          <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-slate-800 flex items-center justify-center text-[#20D9C2] group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#22D3EE] transition-colors">Career Readiness</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Benchmark your skills against real-world full-stack industry expectations and employer demands.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#5B3DF5] flex items-center gap-1 pt-1">
            <span>Check Readiness</span> <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* CURRENT RECOMMENDED TOPIC CARD — DYNAMIC OR PROFESSIONAL EMPTY STATE */}
      <div className="bg-[#0A0F1D]/90 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        {recommendedTopic ? (
          <>
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <BookOpen className="w-4 h-4 text-[#22D3EE]" />
                CURRENT RECOMMENDED TOPIC
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {recommendedTopic.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {recommendedTopic.description || 'Prerequisite topic generated dynamically from your knowledge graph.'}
              </p>
            </div>

            <Link
              href={recommendedTopic.href || "/app/learning"}
              className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>Resume Topic Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <>
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                RECOMMENDED TOPIC PENDING
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Complete your diagnostic assessment to receive recommendations
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                The CompetencyAI Knowledge Graph engine maps your specific skill gaps and prerequisites once your initial diagnostic is evaluated.
              </p>
            </div>

            <Link
              href="/app/assessment/diagnostic"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <span>Take Diagnostic Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
