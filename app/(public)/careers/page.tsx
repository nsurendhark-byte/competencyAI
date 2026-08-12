import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { Briefcase, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const openings = [
    { title: 'Senior AI Engineer', dept: 'Core Intelligence', loc: 'Remote / San Francisco', desc: 'Build LLM evaluation pipelines and autonomous competency DAG agents.' },
    { title: 'Full-Stack Platform Engineer', dept: 'Product Engineering', loc: 'Remote', desc: 'Scale Next.js, VM execution sandboxes, and database ORM layer.' },
    { title: 'Curriculum Architect (Systems)', dept: 'Learning Engineering', loc: 'Remote', desc: 'Design 10-level technical skill benchmarks and code evaluation test harnesses.' },
  ];

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col">
      <PublicNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">JOIN OUR TEAM</div>
          <h1 className="text-4xl font-extrabold text-white">Help Us Build the Future of Learning OS</h1>
          <p className="text-slate-300 text-lg">
            We are looking for engineers, researchers, and educators passionate about career readiness.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {openings.map((job) => (
            <div key={job.title} className="bg-surface border border-surfaceBorder rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-cyan-500/50 transition-colors">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  {job.title}
                </h3>
                <p className="text-xs font-mono text-slate-400">{job.dept} • {job.loc}</p>
                <p className="text-sm text-slate-300 mt-2">{job.desc}</p>
              </div>
              <button className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500 text-xs font-mono text-cyan-400 rounded-md transition-colors shrink-0">
                APPLY POSITION
              </button>
            </div>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
