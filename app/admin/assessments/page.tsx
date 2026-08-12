'use client';

import { useState } from 'react';
import { Target, Plus, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminAssessmentsPage() {
  const [levelFilter, setLevelFilter] = useState<number | null>(null);

  const questions = Array.from({ length: 10 }).map((_, idx) => ({
    id: `q-${idx + 1}`,
    level: idx + 1,
    title: `Level ${idx + 1} Assessment Vector Question`,
    type: idx % 2 === 0 ? 'MCQ' : 'CODE_OUTPUT',
    skill: 'JavaScript'
  }));

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-cyan-400 mb-1">100-QUESTION ASSESSMENT ENGINE</div>
          <h1 className="text-2xl font-bold text-white">10-Level Question Bank Builder</h1>
        </div>

        <button className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:brightness-110 flex items-center gap-1">
          <Plus className="w-4 h-4" /> ADD QUESTION
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setLevelFilter(null)}
          className={`px-3 py-1.5 rounded border ${levelFilter === null ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
        >
          ALL LEVELS
        </button>
        {Array.from({ length: 10 }).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setLevelFilter(i + 1)}
            className={`px-3 py-1.5 rounded border ${levelFilter === i + 1 ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
          >
            LVL {i + 1}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
              <th className="p-4">LEVEL</th>
              <th className="p-4">QUESTION TITLE</th>
              <th className="p-4">TYPE</th>
              <th className="p-4">SKILL</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {questions.filter(q => levelFilter === null || q.level === levelFilter).map((q) => (
              <tr key={q.id} className="hover:bg-slate-950/60">
                <td className="p-4 font-bold text-cyan-400">Level {q.level}</td>
                <td className="p-4 font-bold text-white">{q.title}</td>
                <td className="p-4">{q.type}</td>
                <td className="p-4">{q.skill}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded hover:text-white">EDIT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
