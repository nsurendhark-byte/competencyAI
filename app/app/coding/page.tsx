'use client';

import { useState } from 'react';
import { Play, CheckCircle2, AlertCircle, RotateCcw, HelpCircle, Sparkles, Terminal, Code2 } from 'lucide-react';

export default function CodingArenaPage() {
  const [code, setCode] = useState(`function twoSum(nums, target) {
  // Hash map approach for O(N) complexity
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`);

  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [auraHint, setAuraHint] = useState('');

  const handleRunCode = async () => {
    setExecuting(true);
    setResult(null);

    try {
      const res = await fetch('/api/coding/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, challengeId: 'code-challenge-01' })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Execution failed');
    } finally {
      setExecuting(false);
    }
  };

  const handleGetHint = () => {
    setAuraHint("Aura Hint: Use a JavaScript Map() to store complement values (target - current) as you iterate. This avoids O(N^2) nested loops!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface border border-surfaceBorder p-6 rounded-2xl">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">ISOLATED VM CODE SANDBOX</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Coding Arena — Two Sum Challenge</h1>
          <p className="text-xs text-slate-400 mt-1">Level 2 JavaScript & Algorithmic Array Processing.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGetHint}
            className="px-3 py-2 bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono rounded-lg hover:border-cyan-500 flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" /> GET HINT
          </button>
          <button
            onClick={handleRunCode}
            disabled={executing}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-mono font-bold text-xs rounded-lg hover:brightness-110 flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            <Play className="w-4 h-4" /> {executing ? 'EXECUTING IN VM...' : 'RUN TESTS'}
          </button>
        </div>
      </div>

      {auraHint && (
        <div className="p-4 bg-cyan-950/60 border border-cyan-500/50 rounded-xl font-mono text-xs text-cyan-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>{auraHint}</span>
        </div>
      )}

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Problem & Constraints */}
        <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="font-bold text-white text-lg">Problem Statement</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Given an array of integers <code className="text-cyan-400">nums</code> and an integer <code className="text-cyan-400">target</code>, return indices of the two numbers such that they add up to target.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
              <div className="text-slate-400">EXAMPLE 1:</div>
              <div className="text-slate-200">Input: nums = [2, 7, 11, 15], target = 9</div>
              <div className="text-cyan-400 font-bold">Output: [0, 1]</div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
              <div className="text-slate-400">CONSTRAINTS:</div>
              <div className="text-slate-300">• 1 &lt;= nums.length &lt;= 10^4</div>
              <div className="text-slate-300">• Target can be negative or positive</div>
              <div className="text-slate-300">• Time complexity target: O(N)</div>
            </div>
          </div>
        </div>

        {/* Right: Code Editor & Console */}
        <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-surfaceBorder pb-2">
              <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-cyan-400" /> JavaScript (Node.js ES2022)
              </span>
              <button
                onClick={() => setCode(`function twoSum(nums, target) {\n  return [];\n}`)}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> RESET CODE
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={12}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-cyan-300 focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          {/* Test Harness Results Output */}
          {result && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-cyan-400" /> EXECUTION HARNESS
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  result.status === 'PASSED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {result.status} ({result.testsPassed} / {result.totalTests} PASSED)
                </span>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {result.testResults?.map((tr: any, idx: number) => (
                  <div key={idx} className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-slate-400">INPUT: {tr.input}</span>
                      <div className="text-slate-300">EXPECTED: {tr.expected} | ACTUAL: {tr.actual}</div>
                    </div>
                    {tr.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
