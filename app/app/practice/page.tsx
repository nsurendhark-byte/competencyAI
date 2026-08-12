'use client';

import { useState } from 'react';
import { CheckSquare, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function PracticePage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const practiceQ = {
    title: 'JavaScript Async Microtask Execution Order',
    prompt: 'What will be logged to the console when the following code executes?',
    code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
    options: [
      '1, 2, 3, 4',
      '1, 4, 3, 2',
      '1, 3, 4, 2',
      '4, 3, 2, 1'
    ],
    correctIdx: 1,
    hint: 'Synchronous code runs first (1, 4). Promises enter the Microtask queue (3), and setTimeout enters the Macrotask queue (2).',
    explanation: 'Microtasks (Promises) execute before Macrotasks (setTimeout) in the event loop queue cycle.'
  };

  const isCorrect = selectedOption === practiceQ.correctIdx;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">PRACTICE EXERCISE • LEVEL 3</div>
          <h1 className="text-xl font-bold text-white">{practiceQ.title}</h1>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-cyan-400 text-xs font-mono rounded-lg flex items-center gap-1"
        >
          <HelpCircle className="w-4 h-4" /> HINT
        </button>
      </div>

      {showHint && (
        <div className="p-4 bg-cyan-950/60 border border-cyan-500/50 rounded-xl text-xs text-cyan-200 font-mono">
          {practiceQ.hint}
        </div>
      )}

      <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 sm:p-8 space-y-6">
        <p className="text-slate-300 text-sm font-semibold">{practiceQ.prompt}</p>

        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300">
          <pre>{practiceQ.code}</pre>
        </div>

        <div className="space-y-3">
          {practiceQ.options.map((opt, idx) => {
            const isSel = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => { setSelectedOption(idx); setSubmitted(false); }}
                className={`w-full text-left p-4 rounded-xl border text-sm font-mono transition-all flex items-center justify-between ${
                  isSel ? 'bg-cyan-950/60 border-cyan-500 text-white font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <span>{opt}</span>
                <div className={`w-4 h-4 rounded-full border ${isSel ? 'border-cyan-400 bg-cyan-500' : 'border-slate-700'}`} />
              </button>
            );
          })}
        </div>

        {selectedOption !== null && !submitted && (
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold font-mono text-xs rounded-xl hover:brightness-110"
          >
            SUBMIT ANSWER
          </button>
        )}

        {submitted && (
          <div className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
            isCorrect ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-rose-950/60 border-rose-500 text-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertCircle className="w-5 h-5 text-rose-400" />}
              <span>{isCorrect ? 'CORRECT ANSWER!' : 'INCORRECT'}</span>
            </div>
            <p>{practiceQ.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
