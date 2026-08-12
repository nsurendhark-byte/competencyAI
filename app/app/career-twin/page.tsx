'use client';

import { useState } from 'react';
import { Compass, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CareerTwinPage() {
  const currentSkills = [
    { name: 'JavaScript & Async Runtime', level: 6, target: 9 },
    { name: 'React Architecture', level: 5, target: 8 },
    { name: 'Node.js REST Engine', level: 4, target: 8 },
    { name: 'SQL Database Design', level: 3, target: 7 },
    { name: 'System Design & Load Balancing', level: 2, target: 8 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl glow-cyan">
        <div className="font-mono text-xs text-cyan-400 mb-1">DIGITAL TWIN COMPARISON</div>
        <h1 className="text-2xl font-bold text-white">Career Twin Competency Alignment</h1>
        <p className="text-xs text-slate-300 mt-1">Side-by-side gap analysis between your current verified capabilities and benchmark Senior Full-Stack job profiles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Profile */}
        <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <span className="font-mono text-xs text-cyan-400 font-bold">CURRENT PROFILE (VERIFIED)</span>
            <span className="font-mono text-xs text-slate-400">SCORE: 68/100</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {currentSkills.map((s) => (
              <div key={s.name} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                <div className="flex justify-between text-white font-bold">
                  <span>{s.name}</span>
                  <span className="text-cyan-400">Lvl {s.level} / 10</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full" style={{ width: `${(s.level / 10) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Senior Profile */}
        <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <span className="font-mono text-xs text-indigo-400 font-bold">BENCHMARK JOB TWIN (SENIOR FS)</span>
            <span className="font-mono text-xs text-slate-400">BENCHMARK: 85/100</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {currentSkills.map((s) => (
              <div key={s.name} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                <div className="flex justify-between text-slate-300 font-bold">
                  <span>{s.name}</span>
                  <span className="text-indigo-400">Target Lvl {s.target} / 10</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full" style={{ width: `${(s.target / 10) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
