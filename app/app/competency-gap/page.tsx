'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, HelpCircle, ArrowRight, Brain } from 'lucide-react';

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
      <div className="py-16 text-center text-xs font-mono text-cyan-400">
        AI ENGINE EVALUATING COMPETENCY MATRIX...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl space-y-2 glow-cyan">
        <div className="font-mono text-xs text-cyan-400 flex items-center gap-1.5">
          <Brain className="w-4 h-4" /> AI COMPETENCY MATRIX EVALUATION
        </div>
        <h1 className="text-2xl font-bold text-white">Competency Gap Diagnostics</h1>
        <p className="text-sm text-slate-300">{data?.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.categories?.map((cat: any, idx: number) => {
          const isStrong = cat.status === 'STRONG';
          const isPartial = cat.status === 'PARTIAL';
          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl border space-y-3 ${
                isStrong
                  ? 'bg-emerald-950/40 border-emerald-500/50'
                  : isPartial
                  ? 'bg-amber-950/40 border-amber-500/50'
                  : 'bg-rose-950/40 border-rose-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                  isStrong ? 'bg-emerald-500 text-slate-950' : isPartial ? 'bg-amber-500 text-slate-950' : 'bg-rose-500 text-slate-950'
                }`}>
                  {cat.status}
                </span>
              </div>
              <h3 className="font-bold text-base text-white">{cat.skill}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{cat.detail}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
        <h3 className="font-mono text-sm font-bold text-white">RECOMMENDED ACTION ITEMS</h3>
        <div className="space-y-2">
          {data?.recommendations?.map((rec: string, idx: number) => (
            <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300">
              <span className="font-mono text-slate-400">0{idx + 1}. {rec}</span>
              <Link href="/app/learning" className="text-cyan-400 hover:underline font-mono text-[10px] flex items-center gap-1">
                EXECUTE <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
