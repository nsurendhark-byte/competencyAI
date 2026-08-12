'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Target, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedCareer, setSelectedCareer] = useState('career-fs-01');
  const [weeklyHours, setWeeklyHours] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    try {
      await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetCareerId: selectedCareer, weeklyHoursTarget: weeklyHours })
      });
      router.push('/app/assessment');
    } catch (e) {
      router.push('/app/assessment');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-cyan-950/80 border border-cyan-500/50 rounded-xl mx-auto flex items-center justify-center text-cyan-400 font-mono font-bold text-xl">
          <Compass className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Target Career Selection</h1>
        <p className="text-sm text-slate-400 font-mono">Select your target engineering profile to initialize your competency vector.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setSelectedCareer('career-fs-01')}
          className={`p-6 rounded-2xl border text-left transition-all space-y-3 ${
            selectedCareer === 'career-fs-01'
              ? 'bg-cyan-950/60 border-cyan-500 text-white ring-2 ring-cyan-500/40 shadow-xl'
              : 'bg-surface border-surfaceBorder text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="font-mono text-xs text-cyan-400">TRACK 01</div>
          <h3 className="font-bold text-lg text-white">Full-Stack Software Engineer</h3>
          <p className="text-xs text-slate-300">Master JavaScript, React, Node.js, SQL databases, system design, and deployment pipelines.</p>
        </button>

        <button
          onClick={() => setSelectedCareer('career-ai-01')}
          className={`p-6 rounded-2xl border text-left transition-all space-y-3 ${
            selectedCareer === 'career-ai-01'
              ? 'bg-cyan-950/60 border-cyan-500 text-white ring-2 ring-cyan-500/40 shadow-xl'
              : 'bg-surface border-surfaceBorder text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="font-mono text-xs text-indigo-400">TRACK 02</div>
          <h3 className="font-bold text-lg text-white">AI Systems Architect</h3>
          <p className="text-xs text-slate-300">Build enterprise LLM pipelines, autonomous agents, RAG vector stores, and model evaluation infrastructure.</p>
        </button>
      </div>

      <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
        <label className="block text-xs font-mono text-slate-300">WEEKLY LEARNING COMMITMENT: {weeklyHours} HOURS / WEEK</label>
        <input
          type="range"
          min={5}
          max={40}
          step={5}
          value={weeklyHours}
          onChange={(e) => setWeeklyHours(Number(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>

      <button
        onClick={handleComplete}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-sm font-mono rounded-xl hover:brightness-110 flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
      >
        INITIALIZE & PROCEED TO 100-Q DIAGNOSTIC <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
