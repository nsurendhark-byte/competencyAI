'use client';

import Link from 'next/link';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import {
  ArrowRight,
  GitBranch,
  Sparkles,
  Compass,
  CheckCircle2,
  BookOpen,
  FolderGit2,
  LineChart,
  Target,
  Award,
  Layers
} from 'lucide-react';

export default function HomePage() {
  const productSections = [
    {
      num: '01',
      title: 'How CompetencyAI Works',
      desc: 'Our platform maps your target engineering role to discrete mastery vectors and dynamic prerequisite paths.',
      icon: Layers,
      color: '#3B82F6'
    },
    {
      num: '02',
      title: 'Choose Your Career',
      desc: 'Select from 10+ industry engineering tracks including Full-Stack, AI/ML, Data Analysis, Cloud, and DevOps.',
      icon: Compass,
      color: '#5B3DF5'
    },
    {
      num: '03',
      title: 'Assess Your Current Skills',
      desc: 'Complete an initial diagnostic evaluating syntax, debugging, output prediction, and scenario modeling.',
      icon: Target,
      color: '#22D3EE'
    },
    {
      num: '04',
      title: 'AI Builds Your Learning Path',
      desc: 'Generative AI and Knowledge Graphs construct a personalized DAG matching your exact competency gaps.',
      icon: GitBranch,
      color: '#00E6A7'
    },
    {
      num: '05',
      title: 'Learn With Curated Resources',
      desc: 'Access verified MDN documentation, freeCodeCamp courses, official specs, and embedded video lessons.',
      icon: BookOpen,
      color: '#F59E0B'
    },
    {
      num: '06',
      title: 'Test Your Competency',
      desc: 'Validate learning with adaptive topic assessments requiring >= 70% score to unlock downstream nodes.',
      icon: Award,
      color: '#EC4899'
    },
    {
      num: '07',
      title: 'Build Real Projects',
      desc: 'Solve sandbox algorithm challenges and build microservices evaluated against automated test rubrics.',
      icon: FolderGit2,
      color: '#8B5CF6'
    },
    {
      num: '08',
      title: 'Track Career Readiness',
      desc: 'Monitor real database evidence across Technical Skills, Projects, Interview Simulator, and Industry Gap Fit.',
      icon: LineChart,
      color: '#10B981'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-poppins antialiased">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-20 space-y-20">
        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-4">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05091A] border border-[#26314A] text-[11px] font-semibold tracking-wider text-[#22D3EE]">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>OFFICIAL PRODUCT WORKFLOW V2.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#F8FAFC]">
              Build the skills your{' '}
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#5B3DF5] to-[#22D3EE] bg-clip-text text-transparent">
                career actually needs.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              CompetencyAI analyzes your current skills, identifies competency gaps, and builds an adaptive learning journey using knowledge graphs, curated resources, assessments, and real-world projects.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5B3DF5]/30 hover:shadow-[#5B3DF5]/50"
              >
                <span>Start Your Learning Journey</span> <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/skills"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#11182B] border border-[#26314A] text-[#F8FAFC] font-semibold text-xs hover:bg-[#05091A] transition-all flex items-center justify-center gap-2"
              >
                Explore Skills Taxonomy
              </Link>
            </div>
          </div>

          {/* ANIMATED KNOWLEDGE GRAPH GRAPHIC - ULTRA PREMIUM REDESIGN */}
          <div className="w-full lg:w-[500px] bg-[#0A0F1D]/90 border border-slate-800/90 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_-12px_rgba(99,102,241,0.25)] relative overflow-hidden group backdrop-blur-xl">
            {/* Multi-layered ambient background glows */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-gradient-to-tr from-purple-500/20 to-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Grid overlay background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-100 tracking-wide">Competency Prerequisites DAG</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Dynamic Skill Dependencies</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                ACTIVE
              </div>
            </div>

            {/* Graph Visual Area */}
            <div className="relative h-[290px] w-full flex flex-col justify-between py-1 relative z-10">
              {/* Curved SVG Lines connecting node centers cleanly */}
              <svg className="absolute inset-0 w-full h-full stroke-2 fill-none pointer-events-none overflow-visible">
                <defs>
                  <linearGradient id="gradient-top-left" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradient-top-right" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="gradient-bottom-left" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#475569" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="gradient-bottom-right" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#475569" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Top-Left to Center Path */}
                <path
                  d="M 110 36 C 110 80, 240 70, 240 100"
                  stroke="url(#gradient-top-left)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="animate-[pulse_3s_ease-in-out_infinite]"
                />
                {/* Top-Right to Center Path */}
                <path
                  d="M 370 36 C 370 80, 240 70, 240 100"
                  stroke="url(#gradient-top-right)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="animate-[pulse_3s_ease-in-out_infinite]"
                />

                {/* Center to Bottom-Left Path */}
                <path
                  d="M 240 180 C 240 210, 110 200, 110 244"
                  stroke="url(#gradient-bottom-left)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Center to Bottom-Right Path */}
                <path
                  d="M 240 180 C 240 210, 370 200, 370 244"
                  stroke="url(#gradient-bottom-right)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* TIER 1: TOP PREREQUISITES */}
              <div className="flex items-center justify-between gap-3 relative z-10 px-1">
                {/* Top Node 1 */}
                <div className="flex-1 max-w-[210px] p-3 rounded-2xl bg-[#080D1A]/95 border border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.12)] flex items-center justify-between gap-2 transition-transform hover:scale-105">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-100 truncate">JavaScript ES6</div>
                      <div className="text-[9px] font-mono text-emerald-400 font-medium">MASTERED</div>
                    </div>
                  </div>
                </div>

                {/* Top Node 2 */}
                <div className="flex-1 max-w-[210px] p-3 rounded-2xl bg-[#080D1A]/95 border border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.12)] flex items-center justify-between gap-2 transition-transform hover:scale-105">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-100 truncate">HTML5 & CSS Grid</div>
                      <div className="text-[9px] font-mono text-emerald-400 font-medium">MASTERED</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIER 2: CENTRAL FOCUS NODE */}
              <div className="flex justify-center relative z-10 my-2">
                <div className="w-[85%] sm:w-[320px] p-4 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 border border-cyan-400/60 shadow-[0_0_35px_rgba(99,102,241,0.45)] text-center space-y-2 relative group hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-extrabold text-cyan-300 uppercase tracking-widest bg-slate-950/50 py-0.5 px-3 rounded-full w-fit mx-auto border border-cyan-400/30 shadow-inner">
                    <Sparkles className="w-3 h-3 text-cyan-300" />
                    <span>CURRENT FOCUS NODE</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white tracking-tight">React Component Architecture</h4>
                    <p className="text-[10px] text-indigo-200 mt-0.5 font-medium">Custom Hooks & Lifecycle Engines</p>
                  </div>

                  {/* Progress Bar inside Node */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[9px] font-mono text-cyan-200">
                      <span>PROFICIENCY</span>
                      <span className="font-bold text-cyan-300">78%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950/60 rounded-full overflow-hidden p-0.5 border border-indigo-400/30">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full w-[78%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* TIER 3: BOTTOM DOWNSTREAM NODES */}
              <div className="flex items-center justify-between gap-3 relative z-10 px-1">
                {/* Bottom Node 1 */}
                <div className="flex-1 max-w-[210px] p-3 rounded-2xl bg-[#080D1A]/80 border border-slate-800 hover:border-indigo-500/40 shadow-md flex items-center justify-between gap-2 transition-all opacity-85 hover:opacity-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-slate-800/80 text-slate-400 flex items-center justify-center shrink-0 border border-slate-700/50">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-slate-300 truncate">Node.js REST API</div>
                      <div className="text-[9px] font-mono text-slate-400">QUEUED • DOWNSTREAM</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Node 2 */}
                <div className="flex-1 max-w-[210px] p-3 rounded-2xl bg-[#080D1A]/80 border border-slate-800 hover:border-indigo-500/40 shadow-md flex items-center justify-between gap-2 transition-all opacity-85 hover:opacity-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-slate-800/80 text-slate-400 flex items-center justify-center shrink-0 border border-slate-700/50">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold text-slate-300 truncate">Docker Microservices</div>
                      <div className="text-[9px] font-mono text-slate-400">QUEUED • DOWNSTREAM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer summary bar */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium relative z-10">
              <div className="flex items-center gap-3 font-mono text-[10px]">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_rgba(52,211,153,0.8)]" /> 2 Mastered</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shadow-[0_0_6px_rgba(34,211,238,0.8)]" /> 1 Focus</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block" /> 2 Queued</span>
              </div>
              <Link href="/knowledge-graph" className="text-[#22D3EE] hover:text-cyan-300 font-semibold text-[10px] flex items-center gap-1 transition-colors">
                <span>View Graph Engine</span> <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* 8 PRODUCT STEPS SECTION */}
        <div className="space-y-10 pt-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-bold text-[#22D3EE] uppercase tracking-widest font-mono">PRODUCT WORKFLOW</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              End-to-End Competency Architecture
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              From initial career target to verified hiring readiness — backed by database records and knowledge graphs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {productSections.map((sec) => (
              <div
                key={sec.num}
                className="bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] p-6 rounded-2xl space-y-4 transition-all hover:shadow-xl group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <sec.icon className="w-5 h-5" style={{ color: sec.color }} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#64748B]">{sec.num}</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-white text-base group-hover:text-[#22D3EE] transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Ready to Build Your Verifiable Engineering Competency?
          </h2>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Join CompetencyAI today. Setup your profile, take your diagnostic evaluation, and follow your dynamic Knowledge Graph roadmap.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-full shadow-lg shadow-[#5B3DF5]/30 transition-all"
          >
            <span>Get Started Free</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
