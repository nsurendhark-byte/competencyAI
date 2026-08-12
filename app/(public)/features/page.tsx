import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { Target, Code2, Brain, Network, Compass, Video } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    { title: '100-Question 10-Level Diagnostic', icon: Target, desc: 'Assess proficiency across 10 levels with 10 targeted questions per level.' },
    { title: 'Interactive Knowledge Graph', icon: Network, desc: 'Skill dependency DAG showing locked, in-progress, and mastered competencies.' },
    { title: 'Aura AI Mentor', icon: Brain, desc: 'Context-aware AI guide offering step-by-step hints without revealing direct answers during assessments.' },
    { title: 'Isolated Coding Arena', icon: Code2, desc: 'Execute JavaScript/Python user code against hidden test cases in an isolated VM sandbox.' },
    { title: 'Career Twin Comparison', icon: Compass, desc: 'Side-by-side gap analysis between your current skill graph and target benchmark job profiles.' },
    { title: 'AI Mock Interview Simulator', icon: Video, desc: 'Practice Technical, Behavioral, System Design, and HR interviews with AI scoring.' },
  ];

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col">
      <PublicNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">PLATFORM CAPABILITIES</div>
          <h1 className="text-4xl font-extrabold text-white">Engineered for Technical Mastery</h1>
          <p className="text-slate-300 text-lg">
            Every feature on CompetencyAI connects to real database data flows — zero placeholder numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-surface border border-surfaceBorder rounded-xl p-6 space-y-4 hover:border-cyan-500/50 transition-colors">
              <f.icon className="w-8 h-8 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
