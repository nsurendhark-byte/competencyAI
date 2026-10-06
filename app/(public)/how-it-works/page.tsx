import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Layers,
  Compass,
  Target,
  GitBranch,
  BookOpen,
  Award,
  FolderGit2,
  LineChart,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Choose Your Career Vector',
      desc: 'Select from enterprise engineering tracks including Full-Stack Developer, AI Systems Architect, Data Engineer, Cloud & DevOps.',
      icon: Compass,
      color: '#5B3DF5'
    },
    {
      num: '02',
      title: 'Complete Baseline Diagnostic',
      desc: 'Take an initial 10-level assessment evaluating syntax, execution context, debugging, output prediction, and scenario modeling.',
      icon: Target,
      color: '#22D3EE'
    },
    {
      num: '03',
      title: 'AI Constructs Knowledge Graph DAG',
      desc: 'Generative AI and prerequisite knowledge graphs construct an adaptive DAG matching your exact competency gaps.',
      icon: GitBranch,
      color: '#00E6A7'
    },
    {
      num: '04',
      title: 'Personalized Learning Journey',
      desc: 'Access curated MDN documentation, interactive code snippets, video tracks, and structured lessons targeting your gaps.',
      icon: BookOpen,
      color: '#F59E0B'
    },
    {
      num: '05',
      title: 'Adaptive Topic Assessments & Quizzes',
      desc: 'Validate learning with adaptive topic assessments requiring >= 70% score to unlock downstream nodes.',
      icon: Award,
      color: '#EC4899'
    },
    {
      num: '06',
      title: 'Isolated Coding Arena & Projects',
      desc: 'Solve algorithm challenges in an isolated VM execution sandbox and build real-world microservice capstone projects.',
      icon: FolderGit2,
      color: '#8B5CF6'
    },
    {
      num: '07',
      title: 'Career Readiness & AI Mock Interviews',
      desc: 'Simulate technical, behavioral, and system design interviews while tracking database evidence of hiring readiness.',
      icon: LineChart,
      color: '#10B981'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-sans antialiased">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-20 space-y-16">
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05091A] border border-[#26314A] text-[11px] font-mono font-semibold tracking-wider text-[#22D3EE]">
            <Cpu className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>THE ARCHITECTURE & DATA FLOW</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#F8FAFC]">
            How CompetencyAI{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#5B3DF5] to-[#22D3EE] bg-clip-text text-transparent">
              Engineers Your Growth
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal">
            From initial career target to verified hiring readiness — driven continuously by real database evidence, knowledge graph DAGs, and AI mentors.
          </p>
        </div>

        {/* WORKFLOW STEPS GRID */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl relative overflow-hidden transition-all group hover:shadow-xl"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#22D3EE]/10 transition-colors" />

              <div className="flex items-start sm:items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                  <step.icon className="w-6 h-6" style={{ color: step.color }} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#64748B] px-2 py-0.5 rounded bg-[#050A19] border border-[#26314A]">
                      STEP {step.num}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-white text-lg sm:text-xl tracking-tight group-hover:text-[#22D3EE] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex items-center text-[#5B3DF5] group-hover:text-[#22D3EE] transition-colors shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CTA CARD */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
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
