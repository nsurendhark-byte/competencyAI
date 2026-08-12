'use client';

import { Award, Target, Code2, Network, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AchievementsPage() {
  const achievements = [
    { title: 'Diagnostic Pioneer', desc: 'Completed your first 100-Question Diagnostic Assessment.', code: 'FIRST_ASSESSMENT', icon: Target, unlocked: true },
    { title: 'Code Maestro', desc: 'Passed all test cases on an isolated sandbox coding challenge.', code: 'CODING_MAESTRO', icon: Code2, unlocked: true },
    { title: 'Knowledge Architect', desc: 'Mapped out 5 competency nodes on your Knowledge Graph.', code: 'GRAPH_EXPLORER', icon: Network, unlocked: true },
    { title: 'Career Ready 70%', desc: 'Attained a 70%+ aggregate Career Readiness Index.', code: 'CAREER_READY_70', icon: Award, unlocked: false },
    { title: 'Interview Master', desc: 'Scored 85%+ on AI Technical Mock Interview.', code: 'INTERVIEW_READY', icon: ShieldCheck, unlocked: false }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl glow-cyan">
        <div className="font-mono text-xs text-cyan-400 mb-1">VERIFIABLE MILESTONES</div>
        <h1 className="text-2xl font-bold text-white">Competency Achievements</h1>
        <p className="text-xs text-slate-300 mt-1">Unlocked through real activity proof on the platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div
            key={ach.code}
            className={`p-6 rounded-2xl border flex items-start gap-4 transition-all ${
              ach.unlocked
                ? 'bg-cyan-950/40 border-cyan-500 text-white'
                : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
              ach.unlocked ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-800 text-slate-600 border-slate-700'
            }`}>
              <ach.icon className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{ach.title}</span>
                {ach.unlocked && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </div>
              <p className="text-xs text-slate-300">{ach.desc}</p>
              <div className="font-mono text-[10px] text-slate-400 pt-1">
                {ach.unlocked ? 'UNLOCKED' : 'LOCKED'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
