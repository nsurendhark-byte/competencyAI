'use client';

import { useState } from 'react';
import { Plus, Edit3, Trash2, CheckCircle2, HelpCircle } from 'lucide-react';

export default function AdminQuestionsPage() {
  const [difficultyFilter, setDifficultyFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  const [questions, setQuestions] = useState([
    {
      id: 'q-101',
      question: 'Which queue has higher execution precedence in JavaScript event loop?',
      skill: 'JavaScript',
      difficulty: 'Medium',
      optionsCount: 4,
      correctAnswer: 'Microtask Queue (Promise.then)',
      explanation: 'Microtasks execute before Macrotasks in V8 event loop cycle.',
      status: 'PUBLISHED'
    },
    {
      id: 'q-102',
      question: 'What implicitly happens when an async function resolves?',
      skill: 'JavaScript',
      difficulty: 'Easy',
      optionsCount: 4,
      correctAnswer: 'Returns a Promise resolving to the value',
      explanation: 'Async functions always wrap return values in a resolved Promise.',
      status: 'PUBLISHED'
    },
    {
      id: 'q-103',
      question: 'What is the purpose of React custom hooks?',
      skill: 'React',
      difficulty: 'Hard',
      optionsCount: 4,
      correctAnswer: 'Encapsulate and reuse stateful logic',
      explanation: 'Hooks allow sharing stateful logic without changing component hierarchy.',
      status: 'DRAFT'
    }
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [newSkill, setNewSkill] = useState('JavaScript');
  const [newDifficulty, setNewDifficulty] = useState('Medium');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctIdx, setCorrectIdx] = useState(0);
  const [explanation, setExplanation] = useState('');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const opts = [opt1, opt2, opt3, opt4].filter(Boolean);
    const correctText = opts[correctIdx] || opt1;

    setQuestions([
      ...questions,
      {
        id: 'q-' + Date.now(),
        question: newQuestion,
        skill: newSkill,
        difficulty: newDifficulty,
        optionsCount: opts.length || 4,
        correctAnswer: correctText,
        explanation: explanation || 'Valid baseline evaluation item.',
        status: 'PUBLISHED'
      }
    ]);

    setNewQuestion('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setOpt4('');
    setExplanation('');
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const filtered = questions.filter(q => difficultyFilter === 'ALL' || q.difficulty.toUpperCase() === difficultyFilter);

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-cyan-400 mb-1">ADAPTIVE QUESTION BANK CMS</div>
          <h1 className="text-2xl font-bold text-white">Assessment Question Editor</h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold rounded-lg hover:brightness-110 flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> CREATE QUESTION ITEM
        </button>
      </div>

      <div className="flex gap-2">
        {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((d) => (
          <button
            key={d}
            onClick={() => setDifficultyFilter(d)}
            className={`px-3 py-1.5 rounded border transition-colors ${
              difficultyFilter === d ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
              <th className="p-4">QUESTION PROMPT</th>
              <th className="p-4">SKILL</th>
              <th className="p-4">DIFFICULTY</th>
              <th className="p-4">CORRECT ANSWER</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((q) => (
              <tr key={q.id} className="hover:bg-slate-950/60 transition-colors">
                <td className="p-4 font-bold text-white max-w-xs truncate">{q.question}</td>
                <td className="p-4 text-cyan-400 font-bold">{q.skill}</td>
                <td className="p-4 font-bold">{q.difficulty}</td>
                <td className="p-4 text-emerald-400 max-w-xs truncate">{q.correctAnswer}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">{q.status}</span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleDelete(q.id)}
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

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm">Add Question Bank Item</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">QUESTION PROMPT</label>
                <textarea
                  required
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  rows={3}
                  placeholder="e.g. What occurs if an await expression rejects inside an async function without try/catch?"
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
                  <label className="block text-slate-400 mb-1">DIFFICULTY</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-slate-400">OPTIONS</label>
                <input type="text" required value={opt1} onChange={(e) => setOpt1(e.target.value)} placeholder="Option 1" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" />
                <input type="text" required value={opt2} onChange={(e) => setOpt2(e.target.value)} placeholder="Option 2" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" />
                <input type="text" value={opt3} onChange={(e) => setOpt3(e.target.value)} placeholder="Option 3" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" />
                <input type="text" value={opt4} onChange={(e) => setOpt4(e.target.value)} placeholder="Option 4" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white" />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">CORRECT OPTION INDEX</label>
                <select
                  value={correctIdx}
                  onChange={(e) => setCorrectIdx(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value={0}>Option 1</option>
                  <option value={1}>Option 2</option>
                  <option value={2}>Option 3</option>
                  <option value={3}>Option 4</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">EXPLANATION</label>
                <input
                  type="text"
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explanation of the correct answer..."
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold rounded hover:brightness-110 mt-2"
              >
                SAVE QUESTION TO BANK
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
