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
    <div className="space-y-6 font-sans">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#11182B] border border-[#26314A] p-6 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">
            ISOLATED VM CODE SANDBOX
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Coding Arena — Two Sum Challenge</h1>
          <p className="text-xs text-[#94A3B8]">Level 2 JavaScript & Algorithmic Array Processing.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleGetHint}
            className="px-3.5 py-2 bg-[#050A19] border border-[#26314A] text-[#22D3EE] text-xs font-semibold rounded-xl hover:border-[#5B3DF5] flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#22D3EE]" /> <span>Get Hint</span>
          </button>
          <button
            onClick={handleRunCode}
            disabled={executing}
            className="px-5 py-2 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 flex items-center gap-2 disabled:opacity-50 transition-all"
          >
            <Play className="w-4 h-4 fill-white" /> <span>{executing ? 'Executing VM...' : 'Run Tests'}</span>
          </button>
        </div>
      </div>

      {auraHint && (
        <div className="p-4 bg-[#050A19] border border-[#22D3EE]/40 rounded-xl text-xs text-[#22D3EE] flex items-start gap-2 shadow-md">
          <Sparkles className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
          <span>{auraHint}</span>
        </div>
      )}

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Problem & Constraints */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="space-y-2 border-b border-[#26314A] pb-4">
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">CHALLENGE SPECIFICATION</span>
            <h3 className="font-bold text-white text-lg">Problem Statement</h3>
            <p className="text-[#94A3B8] text-xs leading-relaxed">
              Given an array of integers <code className="text-[#22D3EE] font-mono px-1 py-0.5 rounded bg-[#050A19]">nums</code> and an integer <code className="text-[#22D3EE] font-mono px-1 py-0.5 rounded bg-[#050A19]">target</code>, return indices of the two numbers such that they add up to target.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl space-y-1.5 font-mono">
              <div className="text-[10px] text-[#64748B] font-bold">EXAMPLE 1:</div>
              <div className="text-white">Input: nums = [2, 7, 11, 15], target = 9</div>
              <div className="text-[#00E6A7] font-bold">Output: [0, 1]</div>
            </div>

            <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl space-y-1.5 font-mono">
              <div className="text-[10px] text-[#64748B] font-bold">CONSTRAINTS:</div>
              <div className="text-[#94A3B8]">• 1 &lt;= nums.length &lt;= 10^4</div>
              <div className="text-[#94A3B8]">• Target can be negative or positive</div>
              <div className="text-[#94A3B8]">• Time complexity target: O(N)</div>
            </div>
          </div>
        </div>

        {/* Right: Code Editor & Console */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#26314A] pb-3">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-[#22D3EE]" /> JavaScript (Node.js ES2022)
              </span>
              <button
                onClick={() => setCode(`function twoSum(nums, target) {\n  return [];\n}`)}
                className="text-[11px] font-semibold text-[#64748B] hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset Code
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={12}
              className="w-full bg-[#050A19] border border-[#26314A] rounded-xl p-4 font-mono text-xs text-[#22D3EE] focus:outline-none focus:border-[#5B3DF5] leading-relaxed"
            />
          </div>

          {/* Test Harness Results Output */}
          {result && (
            <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-[#26314A] pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#22D3EE]" /> EXECUTION HARNESS
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  result.status === 'PASSED' ? 'bg-[#00E6A7]/10 text-[#00E6A7] border border-[#00E6A7]/30' : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {result.status} ({result.testsPassed} / {result.totalTests} PASSED)
                </span>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {result.testResults?.map((tr: any, idx: number) => (
                  <div key={idx} className="p-2.5 bg-[#11182B] rounded-lg border border-[#26314A] flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-[#64748B]">INPUT: {tr.input}</span>
                      <div className="text-white">EXPECTED: {tr.expected} | ACTUAL: {tr.actual}</div>
                    </div>
                    {tr.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#00E6A7] shrink-0" />
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

