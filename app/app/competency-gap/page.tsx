'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, HelpCircle, ArrowRight, Brain, Sparkles } from 'lucide-react';

export default function CompetencyGapPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/gap-analysis')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-xs font-semibold text-[#94A3B8] space-y-3 font-sans">
        <div className="w-12 h-12 bg-[#11182B] border border-[#26314A] rounded-2xl mx-auto flex items-center justify-center text-[#22D3EE] animate-pulse">
          <Brain className="w-6 h-6" />
        </div>
        <div>AI ENGINE EVALUATING COMPETENCY MATRIX...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
            <Brain className="w-3.5 h-3.5 text-[#22D3EE]" />
            AI COMPETENCY MATRIX EVALUATION
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Competency Gap Diagnostics
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          {data?.summary || 'Automated evaluation of skill coverage and prerequisite prerequisite dependencies for Full Stack Developer.'}
        </p>
      </div>

      {/* CATEGORY CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.categories?.map((cat: any, idx: number) => {
          const isStrong = cat.status === 'STRONG';
          const isPartial = cat.status === 'PARTIAL';
          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl border space-y-3 shadow-lg transition-all ${
                isStrong
                  ? 'bg-[#11182B] border-[#00E6A7]/50'
                  : isPartial
                  ? 'bg-[#11182B] border-amber-500/50'
                  : 'bg-[#11182B] border-rose-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  isStrong
                    ? 'bg-[#00E6A7]/10 text-[#00E6A7] border border-[#00E6A7]/30'
                    : isPartial
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                }`}>
                  {cat.status}
                </span>
              </div>
              <h3 className="font-bold text-base text-white">{cat.skill}</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{cat.detail}</p>
            </div>
          );
        })}
      </div>

      {/* RECOMMENDED ACTION ITEMS */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
          RECOMMENDED ACTION ITEMS
        </h3>
        <div className="space-y-2.5">
          {data?.recommendations?.map((rec: string, idx: number) => (
            <div key={idx} className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl flex items-center justify-between gap-4 text-xs text-white font-medium">
              <span>0{idx + 1}. {rec}</span>
              <Link
                href="/app/learning"
                className="px-3.5 py-1.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-[11px] rounded-lg transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Execute</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

