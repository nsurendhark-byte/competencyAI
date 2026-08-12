import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    { num: '01', title: 'Career Goal Selection', desc: 'Select your target engineering profile (e.g. Full-Stack Engineer, AI Systems Architect).' },
    { num: '02', title: '100-Question Diagnostic Assessment', desc: 'Complete our 10-level diagnostic evaluating syntax, debugging, output prediction, and scenario modeling.' },
    { num: '03', title: 'Competency Analysis & Knowledge Graph', desc: 'The AI engine evaluates answers, highlights missing prerequisites, and generates your interactive skill DAG.' },
    { num: '04', title: 'Personalized Roadmap & Study Material', desc: 'Access published lessons, interactive code snippets, and practice problems tailored to your gaps.' },
    { num: '05', title: 'Coding Arena & Project Verification', desc: 'Solve algorithm challenges evaluated in an isolated execution sandbox and submit capstone projects.' },
    { num: '06', title: 'Career Twin & AI Mock Interview', desc: 'Simulate technical interviews, refine your readiness score, and demonstrate hiring readiness.' },
  ];

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col">
      <PublicNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">THE DATA FLOW</div>
          <h1 className="text-4xl font-extrabold text-white">How CompetencyAI Operates</h1>
          <p className="text-slate-300 text-lg">
            From initial assessment to career readiness — driven entirely by real database records.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.num} className="bg-surface border border-surfaceBorder rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="font-mono text-3xl font-extrabold text-cyan-400 bg-slate-900 border border-slate-800 w-14 h-14 rounded-lg flex items-center justify-center shrink-0">
                {s.num}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-sm text-slate-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
