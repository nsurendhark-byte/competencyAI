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
  BookOpen
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

  return (
    <div className="space-y-6">
      {/* HERO BANNER CARD */}
      <div className="relative overflow-hidden rounded-2xl bg-[#11182B] border border-[#26314A] p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            LEARNING JOURNEY ACTIVE
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {user?.fullName || 'Demo Student'}! 👋
          </h1>
          <p className="text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
            Targeting <strong className="text-white font-semibold">Full Stack Developer</strong>. Your Knowledge Graph prerequisite engine has recalculated your roadmap based on recent activity.
          </p>
        </div>

        {/* METRICS ROW */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">OVERALL MASTERY</div>
            <div className="text-2xl font-extrabold text-white">{stats.overallScore || 38}%</div>
            <div className="text-[10px] text-[#20D9C2] flex items-center gap-1 font-medium">
              <TrendingUp className="w-3 h-3" /> +4% this week
            </div>
          </div>

          <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">READINESS SCORE</div>
            <div className="text-2xl font-extrabold text-[#22D3EE]">{stats.readinessPercent || 78}%</div>
            <div className="text-[10px] text-[#94A3B8]">Target: Full Stack</div>
          </div>

          <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">ACTIVE STREAK</div>
            <div className="text-2xl font-extrabold text-amber-400 flex items-center gap-1.5">
              <Flame className="w-5 h-5 fill-amber-400/20 text-amber-400" />
              7d
            </div>
            <div className="text-[10px] text-[#94A3B8]">Consistent practice</div>
          </div>

          <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">PREDICTIVE TARGET</div>
            <div className="text-2xl font-extrabold text-[#5B3DF5]">84%</div>
            <div className="text-[10px] text-[#94A3B8]">Pass probability</div>
          </div>
        </div>
      </div>

      {/* FOUR FEATURE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/app/knowledge-graph" className="group bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] p-5 rounded-2xl space-y-3 transition-all hover:shadow-lg hover:shadow-[#5B3DF5]/10">
          <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-[#22D3EE] group-hover:scale-105 transition-transform">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#22D3EE] transition-colors">Knowledge Graph</h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              Visualize topic prerequisite chains, skill dependencies, and unlock paths in real-time.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#5B3DF5] flex items-center gap-1 pt-1">
            Explore Graph <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/app/learning" className="group bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] p-5 rounded-2xl space-y-3 transition-all hover:shadow-lg hover:shadow-[#5B3DF5]/10">
          <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-[#5B3DF5] group-hover:scale-105 transition-transform">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#22D3EE] transition-colors">Personalized Roadmap</h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              Adaptive study sequence tailored dynamically to your pace, weekly hours, and assessment results.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#5B3DF5] flex items-center gap-1 pt-1">
            View Roadmap <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/app/career-readiness" className="group bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] p-5 rounded-2xl space-y-3 transition-all hover:shadow-lg hover:shadow-[#5B3DF5]/10">
          <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-[#20D9C2] group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#22D3EE] transition-colors">Career Readiness</h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              Benchmark your skills against real-world full-stack industry expectations and employer demands.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#5B3DF5] flex items-center gap-1 pt-1">
            Check Readiness <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/app/assessment" className="group bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] p-5 rounded-2xl space-y-3 transition-all hover:shadow-lg hover:shadow-[#5B3DF5]/10">
          <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#22D3EE] transition-colors">Predictive Success</h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              Generative AI evaluates assessment scores to classify competency gaps and test readiness.
            </p>
          </div>
          <div className="text-xs font-semibold text-[#5B3DF5] flex items-center gap-1 pt-1">
            Take Assessment <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* CURRENT RECOMMENDED TOPIC CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#22D3EE]" />
            CURRENT RECOMMENDED TOPIC
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            JavaScript ES6 Async Promises & Array Methods
          </h2>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Prerequisite unlocked via Knowledge Graph. Mastering this topic will boost your Full Stack readiness by +12%.
          </p>
        </div>

        <Link
          href="/app/learning"
          className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <span>Resume Topic Study</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
