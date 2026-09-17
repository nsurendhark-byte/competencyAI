import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';

export default function OurTeamPage() {
  const team = [
    { name: 'SURENDHAR KUMAR' },
    { name: 'SOWBHAGAYA LAKSHMI' },
    { name: 'PRADHIKSHA' },
  ];

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col">
      <PublicNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest">ENGINEERING EXCELLENCE</div>
          <h1 className="text-4xl font-extrabold text-white">Behind CompetencyAI</h1>
          <p className="text-slate-300 text-lg">
            Built by engineers and system architects dedicated to deterministic skill readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((m) => (
            <div key={m.name} className="bg-surface border border-surfaceBorder rounded-xl p-8 space-y-4 text-center flex flex-col items-center justify-center shadow-xl">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-cyan-500/40 mx-auto flex items-center justify-center font-mono text-xl font-bold text-cyan-400">
                {m.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">{m.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
