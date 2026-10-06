import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Target,
  Code2,
  Brain,
  Network,
  Compass,
  Video,
  Layers,
  LineChart,
  CheckCircle2
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      title: '100-Question 10-Level Diagnostic',
      icon: Target,
      color: '#3B82F6',
      desc: 'Evaluate syntax, debugging, output prediction, and scenario modeling across 10 difficulty tiers with 10 questions per level.'
    },
    {
      title: 'Interactive Knowledge Graph DAG',
      icon: Network,
      color: '#22D3EE',
      desc: 'Visualize real-time skill dependency chains showing locked, available, in-progress, mastered, and verified competency states.'
    },
    {
      title: 'Aura AI Mentor & Assistant',
      icon: Brain,
      color: '#5B3DF5',
      desc: 'Context-aware AI mentor providing hints, explaining prerequisite gaps, and creating personalized study strategies securely.'
    },
    {
      title: 'Isolated VM Coding Sandbox',
      icon: Code2,
      color: '#00E6A7',
      desc: 'Execute JavaScript/Node user algorithms evaluated against hidden test suites with runtime performance profiling.'
    },
    {
      title: 'Career Readiness & Gap Analysis',
      icon: Compass,
      color: '#F59E0B',
      desc: 'Benchmark your skill graph against real-world full-stack industry job benchmarks and employer hiring rubrics.'
    },
    {
      title: 'AI Mock Interview Simulator',
      icon: Video,
      color: '#EC4899',
      desc: 'Practice interactive Technical, Behavioral, System Design, and HR interviews with AI scoring and feedback reports.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-sans antialiased">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-20 space-y-16">
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05091A] border border-[#26314A] text-[11px] font-mono font-semibold tracking-wider text-[#22D3EE]">
            <Layers className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>ENTERPRISE PLATFORM CAPABILITIES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#F8FAFC]">
            Engineered for{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#5B3DF5] to-[#22D3EE] bg-clip-text text-transparent">
              Verifiable Technical Mastery
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal">
            Every feature on CompetencyAI connects directly to database analytics and knowledge graph engines — zero mock data or placeholder numbers.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] p-7 rounded-3xl space-y-4 shadow-2xl relative overflow-hidden transition-all group hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#22D3EE]/10 transition-colors" />

              <div className="w-12 h-12 rounded-2xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-extrabold text-white text-lg group-hover:text-[#22D3EE] transition-colors tracking-tight">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA CARD */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#22D3EE]/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Experience the Future of Career Intelligence
          </h2>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Create your account today, evaluate your baseline diagnostic, and let AI map your optimal path to target career readiness.
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
