'use client';

import { useState } from 'react';
import { Calendar, Plus, CheckCircle2, Trash2, Clock, Sparkles } from 'lucide-react';

export default function StudyPlannerPage() {
  const [sessions, setSessions] = useState([
    { id: 1, title: 'Async JS & Event Loop Microtasks', date: 'Today, 6:00 PM', duration: 60, completed: true },
    { id: 2, title: 'React Hooks & State Architecture', date: 'Tomorrow, 7:00 PM', duration: 90, completed: false },
    { id: 3, title: 'Coding Challenge: Custom Debounce', date: 'Aug 14, 5:00 PM', duration: 45, completed: false }
  ]);
  const [newTitle, setNewTitle] = useState('');

  const toggleComplete = (id: number) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const deleteSession = (id: number) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const addSession = () => {
    if (!newTitle.trim()) return;
    setSessions([...sessions, { id: Date.now(), title: newTitle, date: 'Upcoming', duration: 60, completed: false }]);
    setNewTitle('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl flex items-center justify-between glow-cyan">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">SCHEDULE ENGINE</div>
          <h1 className="text-2xl font-bold text-white">Study Planner & Calendar</h1>
          <p className="text-xs text-slate-300 mt-1">Organize study sessions to maintain your 7-day streak target.</p>
        </div>
      </div>

      <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4 font-mono text-xs">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add new study session topic..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={addSession}
            className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:brightness-110 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> ADD SESSION
          </button>
        </div>

        <div className="space-y-3 pt-2">
          {sessions.map((s) => (
            <div
              key={s.id}
              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                s.completed ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <button onClick={() => toggleComplete(s.id)}>
                  <CheckCircle2 className={`w-5 h-5 ${s.completed ? 'text-emerald-400' : 'text-slate-700'}`} />
                </button>
                <div>
                  <div className={`font-bold text-sm ${s.completed ? 'line-through' : 'text-white'}`}>{s.title}</div>
                  <div className="text-[10px] text-slate-400">{s.date} • {s.duration} mins</div>
                </div>
              </div>

              <button onClick={() => deleteSession(s.id)} className="text-rose-400 hover:text-rose-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
