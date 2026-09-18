'use client';

import { useState } from 'react';
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
  CheckSquare,
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
  const [showHint, setShowHint] = useState(false);

  const resources = [
    {
      id: 'res-1',
      title: 'V8 Engine Memory Lifecycle & GC Deep Dive',
      skill: 'JavaScript Engine',
      type: 'Video Track',
      difficulty: 'Advanced',
      duration: '45 mins',
      progress: 80,
      icon: Video,
      link: 'https://v8.dev'
    },
    {
      id: 'res-2',
      title: 'MDN Complete Guide to CSS Grid & Flexbox',
      skill: 'CSS Layouts',
      type: 'Documentation',
      difficulty: 'Intermediate',
      duration: '30 mins',
      progress: 100,
      icon: FileText,
      link: 'https://developer.mozilla.org'
    },
    {
      id: 'res-3',
      title: 'React 19 Server Components & Actions Architecture',
      skill: 'React.js',
      type: 'Course',
      difficulty: 'Advanced',
      duration: '90 mins',
      progress: 40,
      icon: BookOpen,
      link: '#'
    },
    {
      id: 'res-4',
      title: 'Async Event Loop & Microtask Debugging Sandbox',
      skill: 'Async JS',
      type: 'Practice',
      difficulty: 'Intermediate',
      duration: '60 mins',
      progress: 25,
      icon: Code2,
      link: '#'
    }
  ];

  const quizzes = [
    {
      id: 'q-1',
      title: 'JavaScript Async Microtask & Macro Queue',
      skill: 'JavaScript Runtime',
      difficulty: 'Level 3',
      questionsCount: 10,
      timeLimit: '15 mins',
      progress: 0,
      score: null,
      status: 'AVAILABLE',
      exercise: {
        title: 'JavaScript Async Microtask Execution Order',
        prompt: 'What will be logged to the console when the following code executes?',
        code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
        options: ['1, 2, 3, 4', '1, 4, 3, 2', '1, 3, 4, 2', '4, 3, 2, 1'],
        correctIdx: 1,
        hint: 'Synchronous code runs first (1, 4). Promises enter the Microtask queue (3), and setTimeout enters the Macrotask queue (2).',
        explanation: 'Microtasks (Promises) execute before Macrotasks (setTimeout) in the event loop queue cycle.'
      }
    },
    {
      id: 'q-2',
      title: 'React Fiber Reconciliation & Hook Mechanics',
      skill: 'React Component Life',
      difficulty: 'Level 4',
      questionsCount: 12,
      timeLimit: '20 mins',
      progress: 60,
      score: 85,
      status: 'RECOMMENDED',
      exercise: {
        title: 'React Custom Hook State Isolation',
        prompt: 'How does React isolate state when a custom hook is invoked in multiple components?',
        code: `function useCounter() {
  const [count, setCount] = useState(0);
  return { count, increment: () => setCount(c => c + 1) };
}`,
        options: [
          'State is shared globally between components',
          'Each component invocation receives its own separate state instance',
          'State is merged into context root',
          'State requires explicit redux dispatch'
        ],
        correctIdx: 1,
        hint: 'Custom hooks reuse stateful logic, not state itself.',
        explanation: 'Every call to a custom hook gets completely isolated state variables.'
      }
    },
    {
      id: 'q-3',
      title: 'SQL Relational Indexing & Join Query Optimization',
      skill: 'Database Design',
      difficulty: 'Level 5',
      questionsCount: 15,
      timeLimit: '25 mins',
      progress: 100,
      score: 92,
      status: 'COMPLETED',
      exercise: null
    }
  ];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || res.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = resourceFilter === 'ALL' || res.type.toUpperCase().includes(resourceFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER BANNER CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">
              PRACTICE & RESOURCE HUB
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Learning Resources & Interactive Quizzes
            </h1>
          </div>

          {/* SECTION SWITCH TABS */}
          <div className="flex items-center gap-1 bg-[#050A19] p-1.5 rounded-xl border border-[#26314A]">
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'resources'
                  ? 'bg-[#5B3DF5] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Learning Resources
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'quizzes'
                  ? 'bg-[#5B3DF5] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Interactive Quizzes
            </button>
          </div>
        </div>
      </div>

      {/* TABS CONTENT 1: LEARNING RESOURCES */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* SEARCH & FILTERS TOOLBAR */}
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources by title or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#050A19] border border-[#26314A] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              {['ALL', 'VIDEO', 'DOCUMENTATION', 'COURSE', 'PRACTICE'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setResourceFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
                    resourceFilter === cat
                      ? 'bg-[#5B3DF5]/20 text-[#22D3EE] border border-[#5B3DF5]/40'
                      : 'bg-[#050A19] text-[#94A3B8] border border-[#26314A] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* RESOURCE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((res) => {
              const IconComp = res.icon;
              return (
                <div
                  key={res.id}
                  className="bg-[#11182B] border border-[#26314A] hover:border-[#3B82F6] rounded-2xl p-6 space-y-4 transition-all shadow-lg flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-[#050A19] border border-[#26314A] text-[#22D3EE] text-[10px] font-bold">
                        {res.skill}
                      </span>
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                        {res.difficulty}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#26314A] flex items-center justify-center text-[#5B3DF5] shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-snug">{res.title}</h3>
                        <p className="text-xs text-[#94A3B8] mt-1">{res.type} • {res.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#26314A]">
                    <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                      <span>Progress</span>
                      <span className="font-semibold text-white">{res.progress}%</span>
                    </div>
                    <div className="w-full bg-[#050A19] h-2 rounded-full overflow-hidden border border-[#26314A]">
                      <div className="bg-[#00E6A7] h-full rounded-full" style={{ width: `${res.progress}%` }} />
                    </div>

                    <a
                      href={res.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 bg-[#050A19] border border-[#26314A] hover:border-[#5B3DF5] text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
                    >
                      <span>Open Learning Resource</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#22D3EE]" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TABS CONTENT 2: QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quizzes.map((quiz) => {
              const isCompleted = quiz.status === 'COMPLETED';
              const isRecommended = quiz.status === 'RECOMMENDED';

              return (
                <div
                  key={quiz.id}
                  className={`bg-[#11182B] border rounded-2xl p-6 space-y-4 transition-all shadow-lg flex flex-col justify-between ${
                    isRecommended
                      ? 'border-[#5B3DF5] shadow-lg shadow-[#5B3DF5]/10'
                      : 'border-[#26314A]'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        isCompleted ? 'bg-[#00E6A7]/10 text-[#00E6A7] border border-[#00E6A7]/30' : 'bg-[#5B3DF5]/20 text-[#22D3EE] border border-[#5B3DF5]/40'
                      }`}>
                        {quiz.status}
                      </span>
                      <span className="text-[10px] text-[#64748B] font-bold">{quiz.difficulty}</span>
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-base leading-snug">{quiz.title}</h3>
                      <p className="text-xs text-[#94A3B8] mt-1">{quiz.skill}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                      <div className="p-2.5 bg-[#050A19] border border-[#26314A] rounded-xl text-center">
                        <div className="text-[10px] text-[#64748B] font-bold">QUESTIONS</div>
                        <div className="font-bold text-white mt-0.5">{quiz.questionsCount}</div>
                      </div>
                      <div className="p-2.5 bg-[#050A19] border border-[#26314A] rounded-xl text-center">
                        <div className="text-[10px] text-[#64748B] font-bold">TIME</div>
                        <div className="font-bold text-[#22D3EE] mt-0.5">{quiz.timeLimit}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#26314A]">
                    {quiz.score !== null && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#94A3B8]">Last Score</span>
                        <span className="font-extrabold text-[#00E6A7] text-sm">{quiz.score}%</span>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if (quiz.exercise) {
                          setActiveQuizModal(quiz);
                          setSelectedOption(null);
                          setSubmitted(false);
                          setShowHint(false);
                        }
                      }}
                      className="w-full py-2.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span>{isCompleted ? 'Review Quiz' : quiz.progress > 0 ? 'Continue Quiz' : 'Start Quiz'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ACTIVE QUIZ EXERCISE MODAL / HARNESS */}
      {activeQuizModal && activeQuizModal.exercise && (
        <div className="fixed inset-0 z-50 bg-[#020617]/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#26314A] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">
                  {activeQuizModal.title}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">{activeQuizModal.exercise.title}</h2>
              </div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 bg-[#050A19] border border-[#26314A] text-[#22D3EE] text-xs font-semibold rounded-lg hover:border-[#5B3DF5] flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" /> Hint
              </button>
            </div>

            {showHint && (
              <div className="p-4 bg-[#050A19] border border-[#22D3EE]/40 rounded-xl text-xs text-[#22D3EE] leading-relaxed">
                {activeQuizModal.exercise.hint}
              </div>
            )}

            <div className="space-y-4 text-xs">
              <p className="text-white font-semibold text-sm">{activeQuizModal.exercise.prompt}</p>

              {activeQuizModal.exercise.code && (
                <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl font-mono text-xs text-[#22D3EE]">
                  <pre>{activeQuizModal.exercise.code}</pre>
                </div>
              )}

              <div className="space-y-2.5 pt-2">
                {activeQuizModal.exercise.options.map((opt: string, idx: number) => {
                  const isSel = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => { setSelectedOption(idx); setSubmitted(false); }}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                        isSel
                          ? 'bg-[#050A19] border-[#5B3DF5] text-white font-semibold ring-1 ring-[#5B3DF5]'
                          : 'bg-[#050A19] border-[#26314A] text-[#94A3B8] hover:text-white hover:border-[#3B82F6]'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-4 h-4 rounded-full border ${isSel ? 'border-[#5B3DF5] bg-[#5B3DF5]' : 'border-[#26314A]'}`} />
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && !submitted && (
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30"
                >
                  Submit Answer
                </button>
              )}

              {submitted && (
                <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                  selectedOption === activeQuizModal.exercise.correctIdx
                    ? 'bg-emerald-950/40 border-[#00E6A7]/50 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedOption === activeQuizModal.exercise.correctIdx ? (
                      <CheckCircle2 className="w-5 h-5 text-[#00E6A7]" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <span>{selectedOption === activeQuizModal.exercise.correctIdx ? 'CORRECT ANSWER!' : 'INCORRECT'}</span>
                  </div>
                  <p>{activeQuizModal.exercise.explanation}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#26314A] flex justify-end">
              <button
                onClick={() => setActiveQuizModal(null)}
                className="px-5 py-2 bg-[#050A19] border border-[#26314A] text-xs font-semibold text-[#94A3B8] hover:text-white rounded-xl"
              >
                Close Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

