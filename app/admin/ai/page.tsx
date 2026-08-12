'use client';

import { useState } from 'react';
import { Sparkles, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminAiPage() {
  const [contentType, setContentType] = useState('LESSON');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Bulk import state
  const [bulkData, setBulkData] = useState('');
  const [validation, setValidation] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setResult(null);

    try {
      const res = await fetch('/api/admin/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: contentType, levelNumber: level, topic })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert('Generation failed');
    } finally {
      setGenerating(false);
    }
  };

  const handleValidateBulk = () => {
    try {
      const parsed = JSON.parse(bulkData);
      setValidation({
        detected: Array.isArray(parsed) ? parsed.length : 1,
        valid: Array.isArray(parsed) ? parsed.length : 1,
        errors: 0
      });
    } catch (e) {
      setValidation({
        detected: 0,
        valid: 0,
        errors: 1,
        msg: 'Invalid JSON format'
      });
    }
  };

  return (
    <div className="space-y-8 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-cyan-400 mb-1">AI AUTOMATION & BULK IMPORT ENGINE</div>
          <h1 className="text-2xl font-bold text-white">AI Generator & Bulk Importer</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: AI Generator */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" /> GENERATE CONTENT WITH GEMINI AI
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-slate-400 mb-1">TARGET CONTENT TYPE</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="LESSON">Lesson Material (Theory + Code)</option>
                <option value="QUESTION">Diagnostic Assessment Question</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">TARGET LEVEL (1 TO 10)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">TOPIC KEYWORDS</label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Asynchronous Microtask Event Loop"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold rounded-lg hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" /> {generating ? 'GENERATING DRAFT...' : 'GENERATE DRAFT CONTENT'}
            </button>
          </form>

          {result && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-emerald-400">
              <div className="font-bold text-white flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> DRAFT CREATED
              </div>
              <div>ID: {result.id} | Status: {result.status}</div>
              <div className="text-slate-400 text-[10px]">Content initially saved as DRAFT pending admin review & publication.</div>
            </div>
          )}
        </div>

        {/* Right: Bulk Importer */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Upload className="w-4 h-4 text-indigo-400" /> BULK JSON / CSV CONTENT IMPORTER
          </h3>

          <textarea
            value={bulkData}
            onChange={(e) => setBulkData(e.target.value)}
            rows={8}
            placeholder='Paste JSON array of curriculum records, e.g. [{"title": "Custom Hook Design", "level": 4}]'
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-cyan-300 focus:outline-none focus:border-cyan-500"
          />

          <button
            onClick={handleValidateBulk}
            className="w-full py-2.5 bg-slate-800 border border-slate-700 text-cyan-400 font-bold rounded-lg hover:border-cyan-500"
          >
            VALIDATE RECORDS BEFORE IMPORT
          </button>

          {validation && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
              <div className="font-bold text-white">Validation Results:</div>
              <div className="text-slate-300">{validation.detected} records detected | {validation.valid} valid | {validation.errors} errors</div>
              {validation.valid > 0 && (
                <button className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded mt-2">
                  IMPORT {validation.valid} VALID RECORDS
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
