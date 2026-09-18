'use client';

import { useState } from 'react';
import { Compass, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Cpu, Award, Sparkles, BarChart2 } from 'lucide-react';

export default function CareerTwinPage() {
  const currentSkills = [
    { name: 'JavaScript & Async Runtime', level: 6, target: 9, growth: '+34%' },
    { name: 'React Architecture', level: 5, target: 8, growth: '+42%' },
    { name: 'Node.js REST Engine', level: 4, target: 8, growth: '+28%' },
    { name: 'SQL Database Design', level: 3, target: 7, growth: '+19%' },
    { name: 'System Design & Microservices', level: 2, target: 8, growth: '+55%' }
  ];

  const emergingSkills = [
    { name: 'TypeScript 5.x', demand: 'Very High', trend: '+62% YOY' },
    { name: 'Next.js App Router', demand: 'High', trend: '+48% YOY' },
    { name: 'Vector DBs (Pinecone/pgvector)', demand: 'Explosive', trend: '+120% YOY' },
    { name: 'Docker & Kubernetes', demand: 'High', trend: '+35% YOY' }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-[#22D3EE]" />
              INDUSTRY TRENDS & CAREER INTELLIGENCE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Career Twin & Market Alignment
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Side-by-side gap analysis between your verified capabilities and live tech benchmark profiles.
            </p>
          </div>

          <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl text-center">
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">INDUSTRY ALIGNMENT</div>
            <div className="text-2xl font-extrabold text-[#00E6A7] mt-0.5">85% Fit</div>
          </div>
        </div>
      </div>

      {/* EMERGING & TRENDING SKILLS SECTION */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#26314A] pb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#22D3EE]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              CURRENT TECHNOLOGY DEMAND & EMERGING SKILLS
            </h3>
          </div>
          <span className="text-xs text-[#00E6A7] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Market Demand High
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergingSkills.map((sk) => (
            <div key={sk.name} className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl space-y-2">
              <div className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">{sk.demand} DEMAND</div>
              <div className="font-bold text-white text-sm">{sk.name}</div>
              <div className="text-[11px] text-[#00E6A7] font-semibold">{sk.trend}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CAREER TWIN COMPARISON GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Verified Profile */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#26314A] pb-3">
            <span className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#22D3EE]" /> CURRENT VERIFIED PROFILE
            </span>
            <span className="text-xs font-bold text-white">SCORE: 68 / 100</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {currentSkills.map((s) => (
              <div key={s.name} className="p-3.5 bg-[#050A19] border border-[#26314A] rounded-xl space-y-1.5">
                <div className="flex justify-between text-white font-semibold">
                  <span>{s.name}</span>
                  <span className="text-[#22D3EE] font-bold">Lvl {s.level} / 10</span>
                </div>
                <div className="w-full bg-[#11182B] h-2 rounded-full overflow-hidden border border-[#26314A]">
                  <div className="bg-[#22D3EE] h-full rounded-full" style={{ width: `${(s.level / 10) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benchmark Job Twin */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#26314A] pb-3">
            <span className="text-xs font-bold text-[#5B3DF5] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#5B3DF5]" /> BENCHMARK SENIOR FULL-STACK TWIN
            </span>
            <span className="text-xs font-bold text-white">BENCHMARK: 85 / 100</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {currentSkills.map((s) => (
              <div key={s.name} className="p-3.5 bg-[#050A19] border border-[#26314A] rounded-xl space-y-1.5">
                <div className="flex justify-between text-[#94A3B8] font-semibold">
                  <span>{s.name}</span>
                  <span className="text-[#5B3DF5] font-bold">Target Lvl {s.target} / 10</span>
                </div>
                <div className="w-full bg-[#11182B] h-2 rounded-full overflow-hidden border border-[#26314A]">
                  <div className="bg-[#5B3DF5] h-full rounded-full" style={{ width: `${(s.target / 10) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

