'use client';

import { Network, Plus, GitBranch } from 'lucide-react';

export default function AdminKnowledgeGraphPage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-cyan-400 mb-1">SKILL PREREQUISITE DAG</div>
          <h1 className="text-2xl font-bold text-white">Knowledge Graph Rules Manager</h1>
        </div>

        <button className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:brightness-110 flex items-center gap-1">
          <Plus className="w-4 h-4" /> ADD DEPENDENCY EDGE
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-white text-sm">ACTIVE PREREQUISITE EDGES</h3>
        <div className="space-y-2">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
            <span>React & Frontend Architecture</span>
            <span className="text-cyan-400 font-bold">PREREQUISITE: JavaScript & Async</span>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
            <span>Node.js REST Architecture</span>
            <span className="text-cyan-400 font-bold">PREREQUISITE: JavaScript & Async</span>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
            <span>System Design & Architecture</span>
            <span className="text-cyan-400 font-bold">PREREQUISITE: Node.js & SQL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
