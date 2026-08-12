import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { Target, Cpu, ShieldCheck, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col">
      <PublicNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">ABOUT COMPETENCYAI</div>
          <h1 className="text-4xl font-extrabold text-white">The Autonomous Career Intelligence Platform</h1>
          <p className="text-slate-300 text-lg">
            CompetencyAI bridges the gap between raw skill practice and enterprise career readiness through dynamic competency analytics, isolated code execution, and contextual AI mentoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-surfaceBorder rounded-xl p-6 space-y-3">
            <Target className="w-8 h-8 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">Competency-Based Engine</h3>
            <p className="text-sm text-slate-400">
              Moving past simple video views. Every skill is decomposed into 10 discrete mastery levels verified by test cases and assessment analytics.
            </p>
          </div>

          <div className="bg-surface border border-surfaceBorder rounded-xl p-6 space-y-3">
            <Cpu className="w-8 h-8 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Prerequisite Knowledge Graph</h3>
            <p className="text-sm text-slate-400">
              Autonomous DAG navigator enforcing skill prerequisites so learners never face advanced topics without solid foundations.
            </p>
          </div>

          <div className="bg-surface border border-surfaceBorder rounded-xl p-6 space-y-3">
            <Award className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Verifiable Career Readiness</h3>
            <p className="text-sm text-slate-400">
              Algorithmic readiness metrics derived from real database evidence: assessment accuracy, code execution score, and AI mock interview rating.
            </p>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
