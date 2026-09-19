'use client';

import { useState } from 'react';
import { BookOpen, Plus, Edit3, Trash2, CheckCircle2, Eye, Sparkles, ExternalLink, Video, FileText } from 'lucide-react';

export default function AdminCurriculumPage() {
  const [statusFilter, setStatusFilter] = useState('PUBLISHED');
  const [showModal, setShowModal] = useState(false);

  const [lessons, setLessons] = useState([
    {
      id: 'l-1',
      title: 'Understanding V8 Heap & Call Stack Memory Lifecycle',
      skill: 'JavaScript',
      level: 1,
      type: 'DOCUMENTATION',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management',
      provider: 'MDN Web Docs',
      status: 'PUBLISHED'
    },
    {
      id: 'l-2',
      title: 'Async Promises & Microtask Event Loop Mechanics',
      skill: 'JavaScript',
      level: 5,
      type: 'VIDEO',
      url: 'https://www.freecodecamp.org/news/javascript-event-loop/',
      provider: 'freeCodeCamp',
      status: 'PUBLISHED'
    },
    {
      id: 'l-3',
      title: 'React Hooks & Virtual DOM Reconciliation',
      skill: 'React',
      level: 4,
      type: 'COURSE',
      url: 'https://react.dev/learn',
      provider: 'React Official Docs',
      status: 'DRAFT'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newSkill, setNewSkill] = useState('JavaScript');
  const [newLevel, setNewLevel] = useState(1);
  const [newType, setNewType] = useState('DOCUMENTATION');
  const [newUrl, setNewUrl] = useState('');
  const [newProvider, setNewProvider] = useState('MDN Web Docs');

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setLessons([
      ...lessons,
      {
        id: 'l-' + Date.now(),
        title: newTitle,
        skill: newSkill,
        level: newLevel,
        type: newType,
        url: newUrl || 'https://developer.mozilla.org',
        provider: newProvider,
        status: 'PUBLISHED'
      }
    ]);

    setNewTitle('');
    setNewUrl('');
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-cyan-400 mb-1">CONTENT PUBLISHING CMS</div>
          <h1 className="text-2xl font-bold text-white">Curriculum &amp; Learning Material Manager</h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold rounded-lg hover:brightness-110 flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> ADD LEARNING MATERIAL
        </button>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex gap-2">
        {['PUBLISHED', 'DRAFT', 'ARCHIVED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded border transition-colors ${
              statusFilter === st ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
              <th className="p-4">TITLE</th>
              <th className="p-4">SKILL</th>
              <th className="p-4">LEVEL</th>
              <th className="p-4">TYPE &amp; PROVIDER</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {lessons.filter(l => l.status === statusFilter).map((l) => (
              <tr key={l.id} className="hover:bg-slate-950/60 transition-colors">
                <td className="p-4 font-bold text-white">
                  <div>{l.title}</div>
                  <a href={l.url} target="_blank" rel="noreferrer" className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 mt-0.5">
                    <span>{l.url}</span> <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="p-4 text-cyan-400 font-bold">{l.skill}</td>
                <td className="p-4">Level {l.level}</td>
                <td className="p-4">
                  <span className="text-slate-300 font-bold">{l.type}</span>
                  <div className="text-[10px] text-slate-500">{l.provider}</div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">{l.status}</span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleDelete(l.id)}
                    className="px-2.5 py-1 bg-rose-950 text-rose-400 rounded hover:bg-rose-900"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Add Learning Material</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddLesson} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">MATERIAL TITLE</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Asynchronous Microtasks in V8 Engine"
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">SKILL</label>
                  <select
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="React">React</option>
                    <option value="Node.js">Node.js</option>
                    <option value="SQL">SQL</option>
                    <option value="Docker">Docker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">LEVEL (1 TO 10)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={newLevel}
                    onChange={(e) => setNewLevel(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">RESOURCE TYPE</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="DOCUMENTATION">Documentation</option>
                    <option value="VIDEO">Video Lesson</option>
                    <option value="COURSE">Course</option>
                    <option value="GUIDE">Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">PROVIDER</label>
                  <input
                    type="text"
                    value={newProvider}
                    onChange={(e) => setNewProvider(e.target.value)}
                    placeholder="e.g. MDN Web Docs"
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">PUBLIC RESOURCE URL</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://developer.mozilla.org/..."
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold rounded hover:brightness-110 mt-2"
              >
                PUBLISH LEARNING MATERIAL
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
