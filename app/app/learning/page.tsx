'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Code2, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, FileText, ExternalLink } from 'lucide-react';

export default function LearningPage() {
  const [completed, setCompleted] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface border border-surfaceBorder p-6 rounded-2xl">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">MODULE 1 • LESSON 1.1</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Understanding V8 Heap, Stack & Memory Lifecycle</h1>
          <p className="text-xs text-slate-400 mt-1">Enterprise JavaScript & Modern Runtime Systems Track.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowReportModal(true)}
            className="px-3 py-2 bg-slate-900 border border-slate-700 text-rose-400 text-xs font-mono rounded-lg hover:border-rose-500 flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" /> REPORT PROBLEM
          </button>

          <Link
            href="/app/aura"
            className="px-3 py-2 bg-slate-900 border border-slate-700 text-violet-400 text-xs font-mono rounded-lg hover:border-violet-500 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> ASK AURA
          </Link>

          <button
            onClick={() => setCompleted(true)}
            className={`px-5 py-2 font-mono font-bold text-xs rounded-lg transition-all flex items-center gap-2 ${
              completed
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-cyan-500 text-slate-950 hover:brightness-110'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> {completed ? 'LESSON COMPLETED' : 'MARK COMPLETE'}
          </button>
        </div>
      </div>

      {showReportModal && (
        <div className="p-4 bg-rose-950/60 border border-rose-500/50 rounded-xl text-xs text-rose-200 flex items-center justify-between">
          <span>Problem report log dispatched to Admin Control Center triage queue.</span>
          <button onClick={() => setShowReportModal(false)} className="text-rose-400 font-mono underline">DISMISS</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson Theory & Code Content */}
        <div className="lg:col-span-2 bg-surface border border-surfaceBorder rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
            <h3 className="text-white text-lg font-bold">1. Memory Allocation in JavaScript</h3>
            <p>
              JavaScript automatically manages memory allocation using a garbage collector based on mark-and-sweep algorithms. Primitive types are stored directly in Call Stack memory, while object references live in the Heap.
            </p>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300 space-y-2">
              <div className="text-slate-500">// Stack vs Heap Reference Allocation</div>
              <pre>{`let primitiveVal = 42; // Call Stack allocation
let userObj = { id: 101, role: "Engineer" }; // Reference stored on Stack, object on Heap`}</pre>
            </div>

            <h3 className="text-white text-lg font-bold">2. V8 Garbage Collection Cycle</h3>
            <p>
              V8 divides memory into Young and Old generations. Scavenger algorithms clean short-lived allocations quickly, while full GC sweeps the Old Space periodically to prevent memory leaks.
            </p>
          </div>

          <div className="pt-4 border-t border-surfaceBorder flex items-center justify-between">
            <Link href="/app/practice" className="px-4 py-2 bg-indigo-600 text-white font-mono font-bold text-xs rounded-lg hover:brightness-110 flex items-center gap-1.5">
              PRACTICE EXERCISES <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Resources & Navigation */}
        <div className="space-y-4">
          <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-3">
            <h4 className="font-mono text-xs font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" /> LESSON RESOURCES
            </h4>
            <div className="space-y-2 text-xs">
              <a href="https://v8.dev" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-slate-300 hover:text-cyan-400">
                <span>V8 Engine Memory Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer" className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-slate-300 hover:text-cyan-400">
                <span>MDN Memory Management</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
