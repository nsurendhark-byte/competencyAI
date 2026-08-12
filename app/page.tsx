'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import {
  ArrowRight,
  Brain,
  Code2,
  GitBranch,
  LineChart,
  Lock,
  Sparkles,
  Target,
  CheckCircle2,
  Zap,
  Terminal,
  Layers,
  Compass,
  UserCheck,
  Briefcase
} from 'lucide-react';

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(2);

  const competencyFlow = [
    { title: 'Career Goal', desc: 'Select target industry profile (e.g. Full-Stack Engineer)' },
    { title: 'Skill Assessment', desc: '100-question diagnostic across 10 levels' },
    { title: 'Competency Analysis', desc: 'Identify Strong, Partial & Missing competencies' },
    { title: 'Knowledge Graph', desc: 'Map skill dependency prerequisite DAGs' },
    { title: 'Learning Roadmap', desc: 'Dynamic week-by-week curriculum generation' },
    { title: 'Career Readiness', desc: 'Algorithmic readiness metric & Career Twin' },
  ];

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col">
      <PublicNavbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-tech-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-background pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAREER INTELLIGENCE OS V2.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
              TURN YOUR SKILLS <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
                INTO YOUR CAREER.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              CompetencyAI understands what you know, identifies what you're missing, builds your personalized learning path, and measures your progress toward your career goal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-base hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
              >
                START YOUR JOURNEY
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-lg bg-surface border border-surfaceBorder text-slate-200 font-semibold text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                SEE HOW IT WORKS
              </Link>
            </div>
          </div>

          {/* INTERACTIVE HERO COMPETENCY VISUALIZATION */}
          <div className="mt-16 bg-surface/90 border border-surfaceBorder rounded-2xl p-6 sm:p-8 shadow-2xl glow-cyan">
            <div className="flex items-center justify-between border-b border-surfaceBorder pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs text-slate-400">competency_flow_engine.dag</span>
              </div>
              <span className="font-mono text-xs text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                LIVE ENGINE VERIFIED
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              {competencyFlow.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(idx)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-cyan-950/40 border-cyan-500 text-white ring-1 ring-cyan-500'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-mono text-xs text-cyan-400 mb-1">0{idx + 1}</div>
                    <div className="font-semibold text-sm text-slate-100 mb-1">{step.title}</div>
                    <div className="text-xs text-slate-400 line-clamp-2">{step.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-sm font-semibold text-white">Active Vector: {competencyFlow[activeStep].title}</div>
                  <div className="text-xs text-slate-400">{competencyFlow[activeStep].desc}</div>
                </div>
              </div>
              <Link href="/register" className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1">
                EXECUTE FLOW <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-20 bg-slate-950 border-t border-surfaceBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">The Problem with Traditional LMS</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Generic Courses Ignore What You Already Know.
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Traditional platforms force learners through linear videos and fake quiz numbers. They don't test actual 10-level competency, map prerequisite knowledge graphs, or execute real code test-cases.
              </p>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Coursera / Udemy: Linear videos with static certificates</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>No true knowledge graph prerequisite DAG enforcement</span>
                </div>
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CompetencyAI: Real Database Data & 100-Question 10-Level Diagnostic</span>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
              <div className="font-mono text-xs text-slate-400 border-b border-surfaceBorder pb-3">DIAGNOSTIC MATRIX COMPARISON</div>
              <div className="space-y-3">
                <div className="p-3 rounded bg-slate-900/60 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Skill Competency Granularity</span>
                  <span className="font-mono text-cyan-400">10 Discrete Levels</span>
                </div>
                <div className="p-3 rounded bg-slate-900/60 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Assessment Depth</span>
                  <span className="font-mono text-cyan-400">100 Real Questions</span>
                </div>
                <div className="p-3 rounded bg-slate-900/60 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Code Execution Sandbox</span>
                  <span className="font-mono text-emerald-400">VM Isolated Harness</span>
                </div>
                <div className="p-3 rounded bg-slate-900/60 flex items-center justify-between text-xs">
                  <span className="text-slate-300">AI Context Integration</span>
                  <span className="font-mono text-indigo-400">Aura Mentor Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE GRAPH FEATURE SECTION */}
      <section className="py-20 bg-background border-t border-surfaceBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="font-mono text-xs text-indigo-400 uppercase tracking-widest">AUTONOMOUS DAG NAVIGATION</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Interactive Skill Knowledge Graph</h2>
            <p className="text-slate-400">
              Prerequisites unlock automatically as you prove mastery. Every node connects skills, levels, theory lessons, coding challenges, and readiness metrics.
            </p>
          </div>

          <div className="bg-surface border border-surfaceBorder rounded-2xl p-8 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left">
                <div className="text-xs font-mono text-slate-500 mb-1">NODE 01</div>
                <div className="font-bold text-white text-sm">JavaScript Syntax</div>
                <div className="text-xs text-emerald-400 font-mono mt-2">VERIFIED (100%)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left">
                <div className="text-xs font-mono text-slate-500 mb-1">NODE 02</div>
                <div className="font-bold text-white text-sm">Async Promises</div>
                <div className="text-xs text-emerald-400 font-mono mt-2">MASTERED (92%)</div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/60 border border-cyan-500/60 text-left glow-cyan">
                <div className="text-xs font-mono text-cyan-400 mb-1">CURRENT NODE</div>
                <div className="font-bold text-white text-sm">React Architecture</div>
                <div className="text-xs text-cyan-400 font-mono mt-2">IN PROGRESS (45%)</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-left opacity-75">
                <div className="text-xs font-mono text-slate-500 mb-1">NODE 04</div>
                <div className="font-bold text-slate-300 text-sm">Node.js REST API</div>
                <div className="text-xs text-amber-400 font-mono mt-2">AVAILABLE</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800 text-left opacity-50">
                <div className="text-xs font-mono text-slate-500 mb-1">NODE 05</div>
                <div className="font-bold text-slate-400 text-sm">System Design</div>
                <div className="text-xs text-slate-500 font-mono mt-2">LOCKED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AURA AI MENTOR SHOWCASE */}
      <section className="py-20 bg-slate-950 border-t border-surfaceBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-surfaceBorder pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200 font-bold">AURA AI MENTOR CONVERSATION</span>
                </div>
                <span className="text-slate-500">CONTEXT: LEVEL 5 ASYNC JS</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  <span className="text-cyan-400 font-bold">Learner:</span> Why does my async function return a Pending Promise inside the event loop?
                </div>

                <div className="p-3 rounded bg-cyan-950/40 border border-cyan-800/60 text-slate-200">
                  <span className="text-indigo-400 font-bold">Aura:</span> An <code className="text-cyan-300">async</code> function automatically wraps returned values in a resolved Promise. If you evaluate it synchronously without <code className="text-cyan-300">await</code>, the microtask queue has not executed yet.
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">CONTEXTUAL AI ASSISTANCE</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Meet Aura — Your Personal AI Career Mentor</h2>
              <p className="text-slate-300 leading-relaxed">
                Aura knows your target career, active lesson, exact code submissions, and weak areas. During learning, Aura provides educational hints without spoiling answers.
              </p>
              <Link href="/register" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 font-mono">
                TRY AURA MENTOR <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-cyan-950 via-slate-950 to-indigo-950 border-t border-surfaceBorder text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Ready to Build Your Career OS?</h2>
          <p className="text-slate-300 text-lg">
            Create your account today, complete the 100-question competency diagnostic, and receive your personalized learning roadmap.
          </p>
          <div className="flex justify-center">
            <Link
              href="/register"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-base hover:brightness-110 transition-all shadow-xl shadow-cyan-500/20"
            >
              CREATE FREE ACCOUNT NOW
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
