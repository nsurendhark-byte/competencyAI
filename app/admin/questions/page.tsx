'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, FileText, CheckCircle2, AlertTriangle, Search, RefreshCw, X, FileCheck, Layers } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Single Question Form State
  const [prompt, setPrompt] = useState('');
  const [subject, setSubject] = useState('JavaScript');
  const [topic, setTopic] = useState('Async Programming');
  const [levelNumber, setLevelNumber] = useState(1);
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [explanation, setExplanation] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctOptionIdx, setCorrectOptionIdx] = useState(0);

  // Bulk Import State
  const [bulkFormat, setBulkFormat] = useState<'JSON' | 'CSV'>('JSON');
  const [bulkInput, setBulkInput] = useState('');
  const [importReport, setImportReport] = useState<any>(null);
  const [importing, setImporting] = useState(false);

  const subjects = ['ALL', 'C', 'C++', 'Java', 'HTML', 'SQL', 'JavaScript', 'Full Stack'];

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (subjectFilter !== 'ALL') query.set('subject', subjectFilter);
      if (difficultyFilter !== 'ALL') query.set('difficulty', difficultyFilter);
      if (searchTerm) query.set('search', searchTerm);

      const res = await safeFetch(`/api/admin/questions?${query.toString()}`);
      if (res.ok && res.data?.questions) {
        setQuestions(res.data.questions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [subjectFilter, difficultyFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchQuestions();
  };

  const handleSingleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !opt1.trim() || !opt2.trim()) return;

    const options = [
      { text: opt1, isCorrect: correctOptionIdx === 0 },
      { text: opt2, isCorrect: correctOptionIdx === 1 },
      { text: opt3, isCorrect: correctOptionIdx === 2 },
      { text: opt4, isCorrect: correctOptionIdx === 3 }
    ].filter(o => o.text.trim());

    const payload = {
      subject,
      topic,
      levelNumber,
      difficulty,
      prompt,
      codeSnippet: codeSnippet.trim() || null,
      explanation: explanation.trim() || 'Verified assessment item.',
      options
    };

    const res = await safeFetch('/api/admin/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setShowAddModal(false);
      setPrompt('');
      setCodeSnippet('');
      setExplanation('');
      setOpt1('');
      setOpt2('');
      setOpt3('');
      setOpt4('');
      fetchQuestions();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    const res = await safeFetch(`/api/admin/questions/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleBulkImportSubmit = async () => {
    if (!bulkInput.trim()) return;
    setImporting(true);
    setImportReport(null);

    try {
      let parsedItems: any[] = [];

      if (bulkFormat === 'JSON') {
        parsedItems = JSON.parse(bulkInput);
        if (!Array.isArray(parsedItems)) {
          parsedItems = [parsedItems];
        }
      } else {
        // Simple CSV parser
        const lines = bulkInput.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
          const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
          parsedItems = lines.slice(1).map(line => {
            const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            return {
              subject: cols[0] || 'JavaScript',
              topic: cols[1] || 'General',
              prompt: cols[2] || '',
              options: [
                { text: cols[3] || 'Option A', isCorrect: true },
                { text: cols[4] || 'Option B', isCorrect: false },
                { text: cols[5] || 'Option C', isCorrect: false },
                { text: cols[6] || 'Option D', isCorrect: false }
              ],
              explanation: cols[7] || 'CSV Imported question'
            };
          });
        }
      }

      const res = await safeFetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bulk_import', items: parsedItems })
      });

      if (res.ok && res.data) {
        setImportReport(res.data);
        fetchQuestions();
      }
    } catch (err: any) {
      setImportReport({
        total: 0,
        validCount: 0,
        invalidCount: 1,
        duplicateCount: 0,
        report: [{ index: 1, status: 'INVALID', reason: `Format error: ${err.message}` }]
      });
    } finally {
      setImporting(false);
    }
  };

  const sampleJsonTemplate = `[
  {
    "subject": "JavaScript",
    "topic": "Event Loop",
    "levelNumber": 2,
    "difficulty": "MEDIUM",
    "prompt": "Which queue has higher execution precedence in V8 event loop?",
    "explanation": "Microtasks execute before macrotasks.",
    "options": [
      { "text": "Microtask Queue (Promises)", "isCorrect": true },
      { "text": "Macrotask Queue (setTimeout)", "isCorrect": false },
      { "text": "Call Stack Garbage Collector", "isCorrect": false },
      { "text": "Render Queue", "isCorrect": false }
    ]
  }
]`;

  return (
    <div className="space-y-6 font-mono text-xs text-slate-100">
      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="text-cyan-400 font-bold tracking-wider text-[11px] flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            QUESTION BANK CMS & BULK IMPORT ENGINE
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Assessment Questions Directory</h1>
          <p className="text-slate-400 text-xs">
            Manage multi-subject questions across C, C++, Java, HTML, SQL, JavaScript, and Full Stack.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 font-bold rounded-xl flex items-center gap-2 transition-all shadow-md"
          >
            <Upload className="w-4 h-4 text-cyan-400" /> BULK IMPORT (JSON/CSV)
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> ADD QUESTION ITEM
          </button>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Subject pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSubjectFilter(sub)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all text-[11px] whitespace-nowrap ${
                subjectFilter === sub
                  ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 shadow-sm'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search prompt or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </form>
      </div>

      {/* QUESTIONS TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-[11px]">
              <th className="p-4">SUBJECT & TOPIC</th>
              <th className="p-4">QUESTION PROMPT</th>
              <th className="p-4">LEVEL & DIFFICULTY</th>
              <th className="p-4">CORRECT OPTION</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto mb-2" />
                  Loading Assessment Question Database...
                </td>
              </tr>
            ) : questions.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  No questions match your filter criteria. Try adding questions or importing via JSON/CSV.
                </td>
              </tr>
            ) : (
              questions.map((q) => {
                const correctOpt = q.options?.find((o: any) => o.isCorrect);
                return (
                  <tr key={q.id} className="hover:bg-slate-950/60 transition-colors">
                    <td className="p-4 min-w-[140px]">
                      <div className="font-bold text-cyan-400">{q.subject}</div>
                      <div className="text-[10px] text-slate-400 truncate">{q.topic || 'General'}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-white max-w-md line-clamp-2 leading-relaxed">{q.prompt}</div>
                      {q.codeSnippet && (
                        <div className="text-[10px] text-slate-400 font-mono mt-1 bg-slate-950 p-1.5 rounded border border-slate-800 max-w-md truncate">
                          {q.codeSnippet}
                        </div>
                      )}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300 text-[10px]">
                          Lvl {q.levelNumber || 1}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.difficulty === 'EASY' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          q.difficulty === 'HARD' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                          'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 max-w-xs truncate text-emerald-400 font-bold">
                      {correctOpt ? correctOpt.optionText : (q.options?.[0]?.optionText || 'Option 1')}
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-2 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg border border-rose-800 transition-colors"
                        title="Delete Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* SINGLE QUESTION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-2xl w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-sm tracking-wide">Create Assessment Question</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSingleAdd} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">SUBJECT</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {subjects.filter(s => s !== 'ALL').map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">TOPIC/COMPETENCY</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">DIFFICULTY</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">QUESTION PROMPT</label>
                <textarea
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  placeholder="e.g. What is the output of the following JavaScript snippet?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">OPTIONAL CODE SNIPPET</label>
                <textarea
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  rows={2}
                  placeholder="console.log(typeof NaN);"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 font-mono text-cyan-300 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* OPTIONS INPUTS */}
              <div className="space-y-2">
                <label className="block text-slate-400 font-bold">MULTIPLE CHOICE OPTIONS (Select correct radio)</label>
                {[setOpt1, setOpt2, setOpt3, setOpt4].map((setter, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctOptionIdx === idx}
                      onChange={() => setCorrectOptionIdx(idx)}
                      className="w-4 h-4 accent-emerald-500"
                    />
                    <input
                      type="text"
                      required={idx < 2}
                      placeholder={`Option ${idx + 1}`}
                      value={[opt1, opt2, opt3, opt4][idx]}
                      onChange={(e) => setter(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-slate-400 mb-1">EXPLANATION</label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explanation shown after user answers..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-extrabold rounded-xl hover:brightness-110"
                >
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK IMPORT MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-3xl w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-400" />
                <h3 className="font-extrabold text-white text-sm">Bulk Question Import Engine</h3>
              </div>
              <button onClick={() => setShowBulkModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setBulkFormat('JSON')}
                className={`px-4 py-1.5 rounded-xl font-bold transition-colors ${
                  bulkFormat === 'JSON' ? 'bg-cyan-950 border border-cyan-500 text-cyan-300' : 'bg-slate-950 border border-slate-800 text-slate-400'
                }`}
              >
                JSON Format
              </button>
              <button
                onClick={() => setBulkFormat('CSV')}
                className={`px-4 py-1.5 rounded-xl font-bold transition-colors ${
                  bulkFormat === 'CSV' ? 'bg-cyan-950 border border-cyan-500 text-cyan-300' : 'bg-slate-950 border border-slate-800 text-slate-400'
                }`}
              >
                CSV Format
              </button>
              <button
                onClick={() => setBulkInput(sampleJsonTemplate)}
                className="text-[10px] text-cyan-400 hover:underline ml-auto font-mono"
              >
                Load Sample JSON Template
              </button>
            </div>

            <textarea
              rows={8}
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder={bulkFormat === 'JSON' ? 'Paste JSON questions array...' : 'Subject, Topic, Prompt, OptionA, OptionB, OptionC, OptionD, Explanation'}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-3 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
            />

            {/* IMPORT REPORT RESULTS SUMMARY */}
            {importReport && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>IMPORT EXECUTION REPORT</span>
                  <span className="text-cyan-400">Total Records: {importReport.total}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400">
                    <div className="font-bold text-lg">{importReport.validCount}</div>
                    <div className="text-[10px]">Valid Imported</div>
                  </div>
                  <div className="p-2 rounded bg-rose-950/60 border border-rose-800 text-rose-400">
                    <div className="font-bold text-lg">{importReport.invalidCount}</div>
                    <div className="text-[10px]">Invalid / Errors</div>
                  </div>
                  <div className="p-2 rounded bg-amber-950/60 border border-amber-800 text-amber-400">
                    <div className="font-bold text-lg">{importReport.duplicateCount}</div>
                    <div className="text-[10px]">Duplicates Skipped</div>
                  </div>
                </div>

                {importReport.report && importReport.report.length > 0 && (
                  <div className="max-h-32 overflow-y-auto space-y-1 text-[10px] font-mono">
                    {importReport.report.map((item: any, idx: number) => (
                      <div key={idx} className={`p-1.5 rounded flex items-center justify-between ${
                        item.status === 'VALID' ? 'bg-emerald-950/40 text-emerald-300' :
                        item.status === 'DUPLICATE' ? 'bg-amber-950/40 text-amber-300' : 'bg-rose-950/40 text-rose-300'
                      }`}>
                        <span>Item #{item.index}: {item.status}</span>
                        <span>{item.reason || 'Successfully inserted into DB'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700"
              >
                Close
              </button>
              <button
                onClick={handleBulkImportSubmit}
                disabled={importing || !bulkInput.trim()}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-extrabold rounded-xl hover:brightness-110 disabled:opacity-50 flex items-center gap-2"
              >
                {importing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileCheck className="w-4 h-4" />}
                <span>Validate & Import Records</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
