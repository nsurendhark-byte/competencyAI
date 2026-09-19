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

          {/* ANIMATED KNOWLEDGE GRAPH GRAPHIC */}
          <div className="w-full lg:w-[480px] bg-[#11182B] border border-[#26314A] rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#5B3DF5]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-[#26314A] pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F8FAFC]">
                <GitBranch className="w-4 h-4 text-[#22D3EE]" />
                <span>Competency Prerequisites DAG</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#050A19] text-[#00E6A7] border border-[#00E6A7]/40">
                ACTIVE
              </span>
            </div>

            {/* SVG Visual Graph Node Chains */}
            <div className="relative h-64 w-full flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full stroke-[#26314A] stroke-2 fill-none pointer-events-none">
                <line x1="20%" y1="20%" x2="50%" y2="45%" strokeDasharray="4 4" className="animate-pulse" />
                <line x1="80%" y1="20%" x2="50%" y2="45%" strokeDasharray="4 4" />
                <line x1="50%" y1="45%" x2="30%" y2="80%" />
                <line x1="50%" y1="45%" x2="70%" y2="80%" />
              </svg>

              {/* Node 1: Mastered */}
              <div className="absolute top-4 left-[10%] p-3 rounded-xl bg-[#050A19] border border-[#00E6A7] shadow-lg flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E6A7] animate-ping" />
                <span className="font-bold text-white">JavaScript ES6</span>
              </div>

              {/* Node 2: Mastered */}
              <div className="absolute top-4 right-[10%] p-3 rounded-xl bg-[#050A19] border border-[#00E6A7] shadow-lg flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E6A7]" />
                <span className="font-bold text-white">HTML5 & CSS Grid</span>
              </div>

              {/* Central Node: In Progress */}
              <div className="absolute top-[40%] left-[30%] right-[30%] p-3.5 rounded-xl bg-[#5B3DF5] border-2 border-[#22D3EE] shadow-xl text-center space-y-1">
                <div className="text-[10px] font-extrabold text-[#22D3EE] uppercase tracking-wider">CURRENT FOCUS</div>
                <div className="font-bold text-xs text-white">React Component Architecture</div>
              </div>

              {/* Bottom Downstream 1 */}
              <div className="absolute bottom-4 left-[15%] p-3 rounded-xl bg-[#050A19] border border-[#26314A] opacity-75 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <span className="text-[#94A3B8]">Node.js REST API</span>
              </div>

              {/* Bottom Downstream 2 */}
              <div className="absolute bottom-4 right-[15%] p-3 rounded-xl bg-[#050A19] border border-[#26314A] opacity-75 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <span className="text-[#94A3B8]">Docker Microservices</span>
              </div>
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
