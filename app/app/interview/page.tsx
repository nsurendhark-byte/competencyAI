'use client';

import { useState } from 'react';
import { Video, Mic, Send, CheckCircle2, Sparkles, Brain, ArrowRight } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl flex items-center justify-between glow-cyan">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">AI MOCK INTERVIEW SIMULATOR</div>
          <h1 className="text-2xl font-bold text-white">Technical & Behavioral Interview Agent</h1>
          <p className="text-xs text-slate-300 mt-1">Real-time AI evaluation of problem solving, domain depth, and communication.</p>
        </div>
      </div>

      <div className="flex gap-2 font-mono text-xs overflow-x-auto pb-1">
        {['TECHNICAL', 'HR', 'CODING', 'BEHAVIORAL', 'SYSTEM_DESIGN'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              mode === m ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-surface border-surfaceBorder text-slate-400'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI Question Prompt */}
        <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-indigo-400">
            <Sparkles className="w-4 h-4" /> AI INTERVIEWER PROMPT ({mode})
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm leading-relaxed">
            "Explain how the V8 JavaScript engine handles asynchronous microtasks versus macrotasks when processing high-concurrency Node.js event loops."
          </div>

          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            rows={8}
            placeholder="Type your response here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />

          <button
            onClick={handleSimulate}
            disabled={evaluating}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-mono font-bold text-xs rounded-xl hover:brightness-110 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> {evaluating ? 'EVALUATING RESPONSES...' : 'SUBMIT ANSWER FOR EVALUATION'}
          </button>
        </div>

        {/* Right: AI Scorecard */}
        <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
          <h3 className="font-mono text-sm font-bold text-white">AI EVALUATION SCORECARD</h3>

          {evalResult ? (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 bg-slate-900 border border-cyan-500/50 rounded-xl flex items-center justify-between">
                <span>INTERVIEW SCORE</span>
                <span className="text-2xl font-bold text-cyan-400">{evalResult.score} / 100</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Domain Knowledge:</span>
                  <span className="text-emerald-400">{evalResult.knowledgeRating}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Problem Solving:</span>
                  <span className="text-cyan-400">{evalResult.problemSolvingRating}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Communication:</span>
                  <span className="text-indigo-400">{evalResult.communicationRating}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-surfaceBorder space-y-1">
                <div className="text-slate-400 font-bold">WEAK AREAS IDENTIFIED:</div>
                {evalResult.weakAreas?.map((wa: string, idx: number) => (
                  <div key={idx} className="text-rose-400">• {wa}</div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              Submit your response to generate your AI interview evaluation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
