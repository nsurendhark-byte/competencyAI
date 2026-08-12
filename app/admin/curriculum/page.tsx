'use client';

import { useState } from 'react';
import { BookOpen, Plus, Edit3, Trash2, CheckCircle2, Eye, Sparkles } from 'lucide-react';

export default function AdminCurriculumPage() {
  const [status, setStatus] = useState('PUBLISHED');
  const [lessons, setLessons] = useState([
    { id: 'l-1', title: 'Understanding V8 Heap & Call Stack', skill: 'JavaScript', level: 1, status: 'PUBLISHED' },
    { id: 'l-2', title: 'Async Promises & Microtask Event Loop', skill: 'JavaScript', level: 5, status: 'PUBLISHED' },
    { id: 'l-3', title: 'React Hooks & Virtual DOM Reconciliation', skill: 'React', level: 4, status: 'DRAFT' }
  ]);

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-cyan-400 mb-1">CONTENT PUBLISHING LIFE CYCLE</div>
          <h1 className="text-2xl font-bold text-white">Curriculum & Lesson Manager</h1>
        </div>

        <button className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:brightness-110 flex items-center gap-1">
          <Plus className="w-4 h-4" /> CREATE LESSON
        </button>
      </div>

      <div className="flex gap-2">
        {['PUBLISHED', 'DRAFT', 'IN_REVIEW', 'ARCHIVED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatus(st)}
            className={`px-3 py-1.5 rounded border transition-colors ${
              status === st ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
              <th className="p-4">LESSON TITLE</th>
              <th className="p-4">SKILL</th>
              <th className="p-4">LEVEL</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {lessons.filter(l => l.status === status).map((l) => (
              <tr key={l.id} className="hover:bg-slate-950/60">
                <td className="p-4 font-bold text-white">{l.title}</td>
                <td className="p-4 text-cyan-400">{l.skill}</td>
                <td className="p-4">Level {l.level}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">{l.status}</span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded hover:text-white">EDIT</button>
                  <button className="px-2.5 py-1 bg-rose-950 text-rose-400 rounded hover:bg-rose-900">DELETE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
