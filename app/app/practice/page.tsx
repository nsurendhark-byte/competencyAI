'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  HelpCircle,
  Search,
  Filter,
  Video,
  FileText,
  Code2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  PlayCircle,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState<'resources' | 'quizzes'>('resources');
  const [resourceFilter, setResourceFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Active quiz solver state
  const [activeQuizModal, setActiveQuizModal] = useState<any | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const resources = [
    {
      id: 'res-1',
      title: 'MDN Web Docs: Asynchronous JavaScript & Event Loop',
      skill: 'JavaScript Engine',
      type: 'Documentation',
      provider: 'MDN Web Docs',
      difficulty: 'Intermediate',
      duration: '35 mins',
      progress: 85,
      icon: FileText,
      link: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous'
    },
    {
      id: 'res-2',
      title: 'freeCodeCamp: Full JavaScript & React Course',
      skill: 'React.js',
      type: 'Video Track',
      provider: 'freeCodeCamp',
      difficulty: 'Beginner',
      duration: '120 mins',
      progress: 100,
      icon: Video,
      link: 'https://www.freecodecamp.org/news/javascript-full-course/'
    },
    {
      id: 'res-3',
      title: 'Microsoft Learn: PostgreSQL Database Query Optimization',
      skill: 'SQL & Databases',
      type: 'Course',
      provider: 'Microsoft Learn',
      difficulty: 'Advanced',
      duration: '90 mins',
      progress: 40,
      icon: BookOpen,
      link: 'https://learn.microsoft.com/en-us/training/modules/optimize-postgresql-queries/'
    },
    {
      id: 'res-4',
      title: 'Docker Documentation: Containerizing Node.js Microservices',
      skill: 'Docker & DevOps',
      type: 'Documentation',
      provider: 'Docker Docs',
      difficulty: 'Intermediate',
      duration: '45 mins',
      progress: 60,
      icon: Code2,
      link: 'https://docs.docker.com/language/nodejs/'
    },
    {
      id: 'res-5',
      title: 'OWASP Top 10 Web Application Security Risks',
      skill: 'Cybersecurity',
      type: 'Documentation',
      provider: 'OWASP Foundation',
      difficulty: 'Advanced',
      duration: '60 mins',
      progress: 30,
      icon: FileText,
      link: 'https://owasp.org/www-project-top-ten/'
    },
    {
      id: 'res-6',
      title: 'PyTorch Official Tutorials: Deep Learning Fundamentals',
      skill: 'AI / Machine Learning',
      type: 'Guide',
      provider: 'PyTorch Docs',
      difficulty: 'Advanced',
      duration: '90 mins',
      progress: 10,
      icon: BookOpen,
      link: 'https://pytorch.org/tutorials/beginner/basics/intro.html'
    }
  ];

  const quizzes = [
    {
      id: 'q-1',
      title: 'JavaScript Async Microtask & Event Loop',
      skill: 'JavaScript Runtime',
      difficulty: 'Intermediate',
      questionsCount: 10,
      timeLimit: '15 mins',
      score: 90,
      status: 'COMPLETED',
      exercise: {
        title: 'JavaScript Async Microtask Execution Order',
        prompt: 'What will be logged to the console when the following code executes?',
        code: `console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');`,
        options: ['1, 2, 3, 4', '1, 4, 3, 2', '1, 3, 4, 2', '4, 3, 2, 1'],
        correctIdx: 1,
        explanation: 'Microtasks (Promises) execute before Macrotasks (setTimeout) in the event loop queue cycle.'
      }
    },
    {
      id: 'q-2',
      title: 'React Custom Hooks & State Encapsulation',
      skill: 'React.js',
      difficulty: 'Intermediate',
      questionsCount: 12,
      timeLimit: '20 mins',
      score: null,
      status: 'AVAILABLE',
      exercise: {
        title: 'React Custom Hook Re-render Trigger',
        prompt: 'When does a component using a custom hook re-render?',
        code: `function useCounter() {\n  const [count, setCount] = useState(0);\n  return { count, increment: () => setCount(c => c + 1) };\n}`,
        options: [
          'Only when props change',
          'Whenever internal state inside the hook updates',
          'Only on initial mounting',
          'Never'
        ],
        correctIdx: 1,
        explanation: 'State changes inside custom hooks trigger re-renders in every component consuming that hook.'
      }
    }
  ];

  const filteredResources = resources.filter(res => {
    const matchesFilter = resourceFilter === 'ALL' || res.type.toLowerCase().includes(resourceFilter.toLowerCase());
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || res.skill.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#22D3EE]" />
              VERIFIED CURATED RESOURCES &amp; QUIZZES
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resource Library &amp; Technical Quizzes
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Access verified documentation from MDN, freeCodeCamp, Microsoft Learn, PyTorch, and Docker Docs.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#050A19] p-1.5 rounded-xl border border-[#26314A]">
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'resources'
                  ? 'bg-[#5B3DF5] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Curated Resources
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'quizzes'
                  ? 'bg-[#5B3DF5] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Technical Quizzes
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skills, topics, docs..."
            className="w-full bg-[#050A19] border border-[#26314A] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5]"
          />
        </div>

        {activeTab === 'resources' && (
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar w-full sm:w-auto">
            {['ALL', 'Documentation', 'Video', 'Course', 'Guide'].map((type) => (
              <button
                key={type}
                onClick={() => setResourceFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  resourceFilter === type
                    ? 'bg-[#22D3EE] text-[#020617]'
                    : 'bg-[#050A19] border border-[#26314A] text-[#94A3B8] hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: CURATED RESOURCES GRID */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-[#050A19] border border-[#26314A] text-[10px] font-mono text-[#22D3EE] font-bold">
                    {res.skill}
                  </span>
                  <span className="text-[11px] text-[#64748B] font-mono">{res.provider}</span>
                </div>

                <h3 className="font-bold text-base text-white group-hover:text-[#22D3EE] transition-colors leading-snug">
                  {res.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Type: {res.type}</span>
                  <span>Est: {res.duration}</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-[#94A3B8]">
                    <span>User Progress</span>
                    <span className="font-bold text-white">{res.progress}%</span>
                  </div>
                  <div className="w-full bg-[#050A19] h-1.5 rounded-full overflow-hidden border border-[#26314A]">
                    <div className="bg-[#5B3DF5] h-full rounded-full" style={{ width: `${res.progress}%` }} />
                  </div>
                </div>
              </div>

              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#050A19] border border-[#26314A] hover:bg-[#5B3DF5] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Open Resource</span> <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: TECHNICAL QUIZZES GRID */}
      {activeTab === 'quizzes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-[#050A19] border border-[#26314A] text-[10px] font-mono text-[#22D3EE] font-bold">
                    {quiz.skill}
                  </span>
                  {quiz.status === 'COMPLETED' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#00E6A7]/10 border border-[#00E6A7]/30 text-[#00E6A7] font-bold text-[10px]">
                      COMPLETED ({quiz.score}%)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#5B3DF5]/20 border border-[#5B3DF5]/40 text-[#22D3EE] font-bold text-[10px]">
                      AVAILABLE
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-white">{quiz.title}</h3>

                <div className="grid grid-cols-2 gap-2 text-xs text-[#94A3B8] bg-[#050A19] p-3 rounded-xl border border-[#26314A]">
                  <div>Questions: <strong className="text-white">{quiz.questionsCount}</strong></div>
                  <div>Time Limit: <strong className="text-white">{quiz.timeLimit}</strong></div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveQuizModal(quiz);
                  setSelectedOption(null);
                  setSubmitted(false);
                }}
                className="w-full py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#5B3DF5]/30 transition-all"
              >
                <span>{quiz.status === 'COMPLETED' ? 'Retake Quiz' : 'Start Technical Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* QUIZ MODAL */}
      {activeQuizModal && (
        <div className="fixed inset-0 z-50 bg-[#020617]/90 flex items-center justify-center p-4">
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#26314A] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#22D3EE] font-bold">{activeQuizModal.skill}</span>
                <h3 className="font-bold text-base text-white">{activeQuizModal.exercise.title}</h3>
              </div>
              <button
                onClick={() => setActiveQuizModal(null)}
                className="text-xs text-[#94A3B8] hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-white font-medium">{activeQuizModal.exercise.prompt}</p>

              {activeQuizModal.exercise.code && (
                <pre className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl font-mono text-[#22D3EE] overflow-x-auto">
                  {activeQuizModal.exercise.code}
                </pre>
              )}

              <div className="space-y-2">
                {activeQuizModal.exercise.options.map((opt: string, idx: number) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === activeQuizModal.exercise.correctIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => !submitted && setSelectedOption(idx)}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
                        submitted
                          ? isCorrect
                            ? 'bg-[#00E6A7]/20 border-[#00E6A7] text-[#00E6A7]'
                            : isSelected
                            ? 'bg-rose-950/40 border-rose-500 text-rose-300'
                            : 'bg-[#050A19] border-[#26314A] text-[#94A3B8]'
                          : isSelected
                          ? 'bg-[#5B3DF5] text-white border-[#5B3DF5]'
                          : 'bg-[#050A19] border-[#26314A] text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl text-xs space-y-1">
                  <div className="font-bold text-white">Explanation:</div>
                  <p className="text-[#94A3B8]">{activeQuizModal.exercise.explanation}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {!submitted ? (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={() => setActiveQuizModal(null)}
                  className="px-6 py-2.5 bg-[#00E6A7] text-[#020617] font-bold text-xs rounded-xl shadow-md"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
