import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Target,
  Cpu,
  Award,
  ShieldCheck,
  CheckCircle2,
  Compass,
  Layers,
  Network
} from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      title: 'Competency-Based Evaluation',
      icon: Target,
      color: '#3B82F6',
      desc: 'Moving past simple video views. Every skill is decomposed into 10 discrete mastery levels verified by test cases, code sandbox execution, and diagnostic analytics.'
    },
    {
      title: 'Prerequisite Knowledge Graph DAG',
      icon: Network,
      color: '#5B3DF5',
      desc: 'Autonomous DAG navigator enforcing skill prerequisites so learners never face advanced architectural topics without solid foundations.'
    },
    {
      title: 'Verifiable Hiring Readiness',
      icon: Award,
      color: '#00E6A7',
      desc: 'Algorithmic readiness metrics derived strictly from real database evidence: assessment accuracy, sandbox execution scores, and AI mock interview ratings.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-sans antialiased">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-20 space-y-16">
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05091A] border border-[#26314A] text-[11px] font-mono font-semibold tracking-wider text-[#22D3EE]">
            <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>ABOUT COMPETENCYAI ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#F8FAFC]">
            The Autonomous{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#5B3DF5] to-[#22D3EE] bg-clip-text text-transparent">
              Career Intelligence Engine
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal">
            CompetencyAI bridges the gap between raw skill practice and enterprise career readiness through dynamic competency analytics, isolated code execution, and contextual AI mentoring.
          </p>
        </div>

        {/* THREE CORE PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] p-8 rounded-3xl space-y-4 shadow-2xl relative overflow-hidden transition-all group hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#22D3EE]/10 transition-colors" />

              <div className="w-12 h-12 rounded-2xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                <p.icon className="w-6 h-6" style={{ color: p.color }} />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-extrabold text-white text-lg group-hover:text-[#22D3EE] transition-colors tracking-tight">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MISSION & ARCHITECTURE BANNER */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#5B3DF5]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono font-bold text-[#22D3EE] uppercase tracking-wider">OUR MISSION</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Eliminating Skill Gaps with Dynamic Knowledge Graphs
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Traditional education platforms rely on fixed static video playlists with no verification of actual understanding. CompetencyAI evaluates syntax, execution context, debugging, output prediction, and scenario modeling to ensure engineering candidates possess verifiable skills required by top technology employers.
            </p>
          </div>
        </div>

        {/* BOTTOM CTA CARD */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Ready to Build Your Engineering Career Roadmap?
          </h2>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Join CompetencyAI today and take your baseline diagnostic assessment to generate your personalized Knowledge Graph.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-full shadow-lg shadow-[#5B3DF5]/30 transition-all"
          >
            <span>Start Your Learning Journey</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
