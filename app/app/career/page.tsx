'use client';

import { Compass, CheckCircle2, ArrowRight, Award, Target, Sparkles } from 'lucide-react';

export default function TargetCareerPage() {
  const competencies = [
    { name: 'JavaScript & Async Runtime Architecture', requiredLevel: 'Level 8 Required', status: 'IN_PROGRESS' },
    { name: 'React Component & Custom Hook Lifecycle', requiredLevel: 'Level 7 Required', status: 'IN_PROGRESS' },
    { name: 'Node.js REST Engine & Express Middleware', requiredLevel: 'Level 7 Required', status: 'QUEUED' },
    { name: 'SQL Relational Schema & B-Tree Indexing', requiredLevel: 'Level 6 Required', status: 'QUEUED' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
            TARGET CAREER VECTOR
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Full-Stack Software Engineer Target
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          Master front-end, back-end architecture, relational databases, web security, and cloud deployment requirements.
        </p>
      </div>

      {/* COMPETENCY LEVEL BREAKDOWN CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
          REQUIRED CORE COMPETENCIES & TARGET LEVELS
        </h3>

        <div className="space-y-3">
          {competencies.map((comp) => (
            <div
              key={comp.name}
              className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#11182B] border border-[#26314A] flex items-center justify-center text-[#5B3DF5]">
                  <Target className="w-4 h-4 text-[#5B3DF5]" />
                </div>
                <span className="font-bold text-white">{comp.name}</span>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#5B3DF5]/20 text-[#22D3EE] border border-[#5B3DF5]/40 text-[11px] font-bold whitespace-nowrap">
                {comp.requiredLevel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

