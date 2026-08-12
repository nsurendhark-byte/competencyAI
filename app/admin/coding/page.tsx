'use client';

import { useState } from 'react';
import { Code2, Plus, Edit3, Trash2 } from 'lucide-react';

export default function AdminCodingPage() {
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-cyan-400 mb-1">CODING & PROJECTS BUILDER</div>
          <h1 className="text-2xl font-bold text-white">Coding Challenges & Capstone Manager</h1>
        </div>

        <button className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:brightness-110 flex items-center gap-1">
          <Plus className="w-4 h-4" /> CREATE CHALLENGE
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-white text-sm">PUBLISHED CODING ARENA CHALLENGES</h3>
        <div className="space-y-3">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Two Sum Competency Challenge</div>
              <div className="text-slate-400">Level 2 JavaScript Array Processing • 3 Test Cases</div>
            </div>
            <button className="px-3 py-1 bg-slate-800 text-cyan-400 rounded">EDIT TEST CASES</button>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Custom Debounce Implementation</div>
              <div className="text-slate-400">Level 4 Higher Order Function • 2 Test Cases</div>
            </div>
            <button className="px-3 py-1 bg-slate-800 text-cyan-400 rounded">EDIT TEST CASES</button>
          </div>
        </div>
      </div>
    </div>
  );
}
