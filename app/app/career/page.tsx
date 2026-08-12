'use client';

import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TargetCareerPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl glow-cyan">
        <div className="font-mono text-xs text-cyan-400 mb-1">TARGET CAREER VECTOR</div>
        <h1 className="text-2xl font-bold text-white">Full-Stack Software Engineer</h1>
        <p className="text-xs text-slate-300 mt-1">Master front-end, back-end architecture, relational databases, web security, and cloud deployment.</p>
      </div>

      <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4 font-mono text-xs">
        <h3 className="font-bold text-white text-sm">REQUIRED CORE COMPETENCIES</h3>
        <div className="space-y-2 text-slate-300">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
            <span>JavaScript & Async Programming</span>
            <span className="text-cyan-400 font-bold">LEVEL 8 REQUIRED</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
            <span>React & Frontend Architecture</span>
            <span className="text-cyan-400 font-bold">LEVEL 7 REQUIRED</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
            <span>Node.js & Microservices</span>
            <span className="text-cyan-400 font-bold">LEVEL 7 REQUIRED</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
            <span>SQL Relational Schema Design</span>
            <span className="text-cyan-400 font-bold">LEVEL 6 REQUIRED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
