'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Target,
  Network,
  GitBranch,
  Code2,
  LineChart,
  Award,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Compass
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

  if (loading) {
    return (
      <div className="py-12 text-center text-xs font-mono text-cyan-400">
        LOADING REAL TIME USER DASHBOARD DATA...
      </div>
    );
  }

  const stats = data?.stats || {};

  return (
    <div className="space-y-8">
      {/* Header Telemetry Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface border border-surfaceBorder p-6 rounded-2xl shadow-xl glow-cyan">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">CAREER INTELLIGENCE DASHBOARD</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Full-Stack Career Telemetry</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time competency data calculated from database evidence.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/assessment"
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 text-xs font-bold font-mono rounded-lg hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Target className="w-4 h-4" />
            {stats.assessmentCompleted ? 'RETAKE ASSESSMENT' : 'TAKE 100-Q DIAGNOSTIC'}
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-surfaceBorder p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>CAREER READINESS</span>
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats.readinessPercent || 0}%</div>
          <div className="text-[10px] text-slate-500 font-mono">Algorithmic readiness metric</div>
        </div>

        <div className="bg-surface border border-surfaceBorder p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>DIAGNOSTIC SCORE</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats.overallScore || 0}%</div>
          <div className="text-[10px] text-slate-500 font-mono">100 Question evaluation</div>
        </div>

        <div className="bg-surface border border-surfaceBorder p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>SKILLS MASTERED</span>
            <Network className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats.skillsMasteredCount || 0} / {stats.totalSkillsCount || 5}</div>
          <div className="text-[10px] text-slate-500 font-mono font-mono">DAG nodes verified</div>
        </div>

        <div className="bg-surface border border-surfaceBorder p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>CODING PASSED</span>
            <Code2 className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats.codingPassedCount || 0}</div>
          <div className="text-[10px] text-slate-500 font-mono">Sandbox submissions</div>
        </div>
      </div>

      {/* Main Grid: Empty state or Active Roadmap */}
      {!stats.assessmentCompleted ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <Target className="w-12 h-12 text-cyan-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Your Learning Journey Starts Here</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Complete your 100-question baseline diagnostic to discover your competency profile, unlock your Knowledge Graph, and generate your custom learning roadmap.
          </p>
          <Link
            href="/app/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-slate-950 font-bold text-xs font-mono rounded-lg hover:brightness-110 transition-all"
          >
            START 100-QUESTION DIAGNOSTIC <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-surfaceBorder pb-3">
              <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-cyan-400" />
                ACTIVE ROADMAP SEQUENCE
              </h3>
              <Link href="/app/roadmap" className="text-xs font-mono text-cyan-400 hover:underline">VIEW FULL ROADMAP</Link>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-cyan-400">WEEK 1: ACTIVE</div>
                  <div className="text-sm font-bold text-white">JavaScript Async & Execution Context</div>
                  <div className="text-xs text-slate-400">Memory heap, call stack, microtask queue</div>
                </div>
                <Link href="/app/learning" className="px-3 py-1.5 bg-cyan-500 text-slate-950 text-xs font-mono font-bold rounded">
                  STUDY NOW
                </Link>
              </div>

              <div className="p-4 bg-slate-900/50 border border-slate-800/80 rounded-xl flex items-center justify-between opacity-75">
                <div>
                  <div className="text-xs font-mono text-slate-500">WEEK 2: NEXT UP</div>
                  <div className="text-sm font-bold text-slate-300">React State Architecture</div>
                  <div className="text-xs text-slate-500">Virtual DOM reconciliation & custom hooks</div>
                </div>
                <span className="text-xs font-mono text-slate-500">QUEUED</span>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
            <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              AURA RECOMMENDED ACTIONS
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                <div className="font-bold text-white">Solve Coding Challenge</div>
                <div className="text-slate-400">Custom Debounce Function Implementation</div>
                <Link href="/app/coding" className="text-cyan-400 font-mono hover:underline inline-block mt-1">OPEN CODING ARENA →</Link>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                <div className="font-bold text-white">Simulate Technical Interview</div>
                <div className="text-slate-400">Practice async JS technical interview scenario</div>
                <Link href="/app/interview" className="text-cyan-400 font-mono hover:underline inline-block mt-1">START INTERVIEW →</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
