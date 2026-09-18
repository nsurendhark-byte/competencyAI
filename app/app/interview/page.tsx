'use client';

import { useState } from 'react';
import { Video, Mic, Send, CheckCircle2, Sparkles, Brain, ArrowRight, ShieldCheck } from 'lucide-react';

export default function MockInterviewPage() {
  const [mode, setMode] = useState('TECHNICAL');
  const [userResponse, setUserResponse] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<any>(null);

  const handleSimulate = async () => {
    setEvaluating(true);
    try {
      const res = await fetch('/api/ai/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, answers: userResponse })
      });
      const data = await res.json();
      setEvalResult(data);
    } catch (e) {
      alert('Simulation error');
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              AI MOCK INTERVIEW SIMULATOR
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Technical & Behavioral Interview Agent
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Real-time AI evaluation of problem solving, domain depth, and communication vectors.
            </p>
          </div>
        </div>

        {/* MODE SELECTOR TABS */}
        <div className="flex gap-2 overflow-x-auto pt-2">
          {['TECHNICAL', 'HR', 'CODING', 'BEHAVIORAL', 'SYSTEM_DESIGN'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                mode === m
                  ? 'bg-[#5B3DF5] text-white border-[#633BFF] shadow-md'
                  : 'bg-[#050A19] border-[#26314A] text-[#94A3B8] hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI Question Prompt */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#22D3EE]">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" /> AI INTERVIEWER PROMPT ({mode})
          </div>

          <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl text-white text-xs leading-relaxed font-medium">
            "Explain how the V8 JavaScript engine handles asynchronous microtasks versus macrotasks when processing high-concurrency Node.js event loops."
          </div>

          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            rows={8}
            placeholder="Type your structured technical response here..."
            className="w-full bg-[#050A19] border border-[#26314A] rounded-xl p-4 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5] leading-relaxed"
          />

          <button
            onClick={handleSimulate}
            disabled={evaluating}
            className="w-full py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-white" />
            <span>{evaluating ? 'Evaluating Responses...' : 'Submit Answer for AI Evaluation'}</span>
          </button>
        </div>

        {/* Right: AI Scorecard */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#26314A] pb-3">
            <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              AI EVALUATION SCORECARD
            </h3>
          </div>

          {evalResult ? (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#050A19] border border-[#5B3DF5] rounded-xl flex items-center justify-between">
                <span className="text-[#94A3B8] font-semibold">INTERVIEW SCORE</span>
                <span className="text-2xl font-extrabold text-[#22D3EE]">{evalResult.score} / 100</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between text-[#94A3B8] p-2 bg-[#050A19] rounded-lg border border-[#26314A]">
                  <span>Domain Knowledge:</span>
                  <span className="font-bold text-[#00E6A7]">{evalResult.knowledgeRating}</span>
                </div>
                <div className="flex justify-between text-[#94A3B8] p-2 bg-[#050A19] rounded-lg border border-[#26314A]">
                  <span>Problem Solving:</span>
                  <span className="font-bold text-[#22D3EE]">{evalResult.problemSolvingRating}</span>
                </div>
                <div className="flex justify-between text-[#94A3B8] p-2 bg-[#050A19] rounded-lg border border-[#26314A]">
                  <span>Communication:</span>
                  <span className="font-bold text-[#5B3DF5]">{evalResult.communicationRating}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#26314A] space-y-1.5">
                <div className="text-[#64748B] font-bold uppercase text-[10px]">WEAK AREAS IDENTIFIED:</div>
                {evalResult.weakAreas?.map((wa: string, idx: number) => (
                  <div key={idx} className="text-rose-400">• {wa}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#94A3B8] space-y-2">
              <Brain className="w-8 h-8 text-[#64748B] mx-auto animate-pulse" />
              <p>Submit your response to generate your AI interview evaluation scorecard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

