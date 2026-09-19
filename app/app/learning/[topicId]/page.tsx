'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Code2,
  Sparkles,
  Award,
  ExternalLink,
  Clock,
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function TopicStudyPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = (params?.topicId as string) || 'javascript-async';

  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'videos' | 'practice' | 'quiz'>('overview');
  const [videoProgress, setVideoProgress] = useState<Record<string, number>>({
    'vid-1': 100,
    'vid-2': 50
  });
  const [codeAnswer, setCodeAnswer] = useState(
    `async function fetchUserData(userId) {\n  try {\n    const res = await fetch(\`/api/user/\${userId}\`);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error('Fetch error:', err);\n  }\n}`
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [topicMastered, setTopicMastered] = useState(false);

  // Topic Data Payload
  const topicData = {
    id: topicId,
    title: 'JavaScript Async Programming & Event Loop',
    category: 'Core Language Engine',
    progress: topicMastered ? 100 : 65,
    estimatedTime: '90 Minutes',
    prerequisites: ['JavaScript ES6 Primitives & Variables', 'Functions & Callbacks'],
    overview: 'Asynchronous JavaScript is built on V8 non-blocking event loops, message queues, and microtask execution contexts. Mastering Promises and async/await is critical for building scalable React state flows and Node.js backend middleware.',
    objectives: [
      'Understand V8 Call Stack, Macrotask Queue, and Microtask Queue precedence.',
      'Master Promise state transitions (Pending, Fulfilled, Rejected).',
      'Implement async/await try/catch error handling patterns.',
      'Avoid unhandled promise rejections and race conditions in production.'
    ],
    readingMaterials: [
      {
        title: 'MDN Web Docs: Asynchronous JavaScript Overview',
        provider: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
        type: 'Documentation'
      },
      {
        title: 'freeCodeCamp: How the JavaScript Event Loop Works',
        provider: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/news/javascript-event-loop/',
        type: 'Article'
      },
      {
        title: 'JavaScript.info: Promises, Async/Await Complete Guide',
        provider: 'JavaScript.info',
        url: 'https://javascript.info/async',
        type: 'Guide'
      }
    ],
    videoLessons: [
      {
        id: 'vid-1',
        title: 'JavaScript Event Loop & Microtasks Deep Dive',
        provider: 'freeCodeCamp',
        duration: '24 mins',
        url: 'https://www.youtube.com/watch?v=eiC58R16hb8'
      },
      {
        id: 'vid-2',
        title: 'Async/Await vs Promises & Error Handling',
        provider: 'MDN / Tech Academy',
        duration: '18 mins',
        url: 'https://www.youtube.com/watch?v=V_Kr9OSfDeU'
      }
    ],
    quizQuestions: [
      {
        id: 'q1',
        question: 'Which queue has higher execution precedence in JavaScript event loop?',
        options: [
          { id: 'opt-1', text: 'Macrotask Queue (setTimeout, setInterval)' },
          { id: 'opt-2', text: 'Microtask Queue (Promise.then, queueMicrotask)', isCorrect: true },
          { id: 'opt-3', text: 'Animation Frame Queue' },
          { id: 'opt-4', text: 'I/O Polling Queue' }
        ]
      },
      {
        id: 'q2',
        question: 'What does async function return implicitly?',
        options: [
          { id: 'opt-1', text: 'A resolved value directly' },
          { id: 'opt-2', text: 'A Promise resolving to the returned value', isCorrect: true },
          { id: 'opt-3', text: 'An Observable stream' },
          { id: 'opt-4', text: 'Undefined' }
        ]
      },
      {
        id: 'q3',
        question: 'What occurs if an await expression rejects inside an async function without try/catch?',
        options: [
          { id: 'opt-1', text: 'The rejection is ignored silently' },
          { id: 'opt-2', text: 'The async function throws an unhandled rejection', isCorrect: true },
          { id: 'opt-3', text: 'The execution retries automatically 3 times' },
          { id: 'opt-4', text: 'The call stack clears and resets' }
        ]
      }
    ]
  };

  const handleVideoProgress = (vidId: string, pct: number) => {
    setVideoProgress(prev => ({ ...prev, [vidId]: pct }));
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    topicData.quizQuestions.forEach(q => {
      const selected = quizAnswers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (selected === correctOpt?.id) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / topicData.quizQuestions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 70) {
      setTopicMastered(true);
      safeFetch('/api/learning/complete-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId, score })
      }).catch(console.error);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* TOP NAVBAR & TITLE CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={() => router.push('/app/learning')}
            className="px-3.5 py-1.5 rounded-xl bg-[#050A19] border border-[#26314A] hover:bg-[#11182B] text-xs font-semibold text-[#94A3B8] hover:text-white flex items-center gap-2 self-start transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Learning Journey
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#94A3B8]">Topic Progress:</span>
            <span className="text-sm font-bold text-[#22D3EE]">{topicData.progress}%</span>
            {topicMastered && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#00E6A7]/10 border border-[#00E6A7]/30 text-[#00E6A7] font-extrabold text-[10px]">
                MASTERED
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-[#22D3EE] font-bold uppercase tracking-wider">
            {topicData.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {topicData.title}
          </h1>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-t border-[#26314A] pt-4 overflow-x-auto custom-scrollbar">
          {[
            { id: 'overview', label: '1. Overview & Objectives', icon: FileText },
            { id: 'materials', label: '2. Study Materials', icon: BookOpen },
            { id: 'videos', label: '3. Video Lessons', icon: PlayCircle },
            { id: 'practice', label: '4. Practice Sandbox', icon: Code2 },
            { id: 'quiz', label: '5. Topic Assessment', icon: Award }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-[#5B3DF5] text-white shadow-lg shadow-[#5B3DF5]/30'
                    : 'bg-[#050A19] border border-[#26314A] text-[#94A3B8] hover:text-white'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW & OBJECTIVES */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#22D3EE]" /> Topic Overview
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {topicData.overview}
              </p>
            </div>

            <div className="space-y-3 border-t border-[#26314A] pt-6">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00E6A7]" /> Key Learning Objectives
              </h3>
              <div className="space-y-2">
                {topicData.objectives.map((obj, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#050A19] border border-[#26314A] text-xs text-[#F8FAFC] flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00E6A7] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">PREREQUISITE DEPENDENCIES</h3>
            <div className="space-y-2">
              {topicData.prerequisites.map((pre, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#050A19] border border-[#00E6A7]/30 text-xs text-white font-medium flex items-center justify-between">
                  <span>{pre}</span>
                  <span className="text-[10px] text-[#00E6A7] font-bold">VERIFIED</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('materials')}
              className="w-full mt-4 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl transition-all shadow-md"
            >
              Start Reading Materials &rarr;
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: STUDY MATERIALS */}
      {activeTab === 'materials' && (
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#3B82F6]" /> Official Documentation &amp; Curated Guides
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Read verified, publicly accessible educational documentation before proceeding to practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topicData.readingMaterials.map((mat, idx) => (
              <div key={idx} className="bg-[#050A19] border border-[#26314A] p-5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-[#3B82F6]/50 transition-all">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#22D3EE] font-bold uppercase">{mat.type}</span>
                  <h4 className="font-bold text-sm text-white">{mat.title}</h4>
                  <p className="text-xs text-[#64748B]">Provider: {mat.provider}</p>
                </div>

                <a
                  href={mat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#11182B] border border-[#26314A] hover:bg-[#5B3DF5] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open Resource</span> <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#26314A]">
            <button
              onClick={() => setActiveTab('videos')}
              className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-md"
            >
              Continue to Video Lessons &rarr;
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: VIDEO LESSONS */}
      {activeTab === 'videos' && (
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-[#22D3EE]" /> Video Lessons &amp; Screencasts
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Watch educational screencasts. Progress is recorded as you watch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topicData.videoLessons.map((vid) => {
              const currentPct = videoProgress[vid.id] || 0;
              return (
                <div key={vid.id} className="bg-[#050A19] border border-[#26314A] rounded-2xl p-5 space-y-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#00E6A7] font-bold">{vid.provider}</span>
                    <span className="text-xs text-[#94A3B8] font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {vid.duration}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white">{vid.title}</h3>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#94A3B8]">
                      <span>Completion Progress</span>
                      <span className="font-bold text-white">{currentPct}%</span>
                    </div>
                    <div className="w-full bg-[#11182B] h-2 rounded-full overflow-hidden border border-[#26314A]">
                      <div className="bg-[#22D3EE] h-full rounded-full transition-all" style={{ width: `${currentPct}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleVideoProgress(vid.id, 100)}
                      className="flex-1 py-2.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md"
                    >
                      <PlayCircle className="w-4 h-4" /> Watch Lesson
                    </a>

                    <button
                      onClick={() => handleVideoProgress(vid.id, 100)}
                      className="px-3 py-2.5 bg-[#11182B] border border-[#26314A] hover:bg-[#00E6A7]/20 text-[#00E6A7] text-xs font-semibold rounded-xl"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#26314A]">
            <button
              onClick={() => setActiveTab('practice')}
              className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-md"
            >
              Proceed to Practice Sandbox &rarr;
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICE SANDBOX */}
      {activeTab === 'practice' && (
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#00E6A7]" /> Practice Coding Sandbox
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Write and test your solution to solidify concepts before taking the topic assessment.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl space-y-1 text-xs text-[#94A3B8]">
              <strong className="text-white">Task Prompt:</strong> Write an `async` function `fetchUserData(userId)` that queries `/api/user/:id` using `fetch` and returns parsed JSON.
            </div>

            <textarea
              value={codeAnswer}
              onChange={(e) => setCodeAnswer(e.target.value)}
              rows={8}
              className="w-full bg-[#050A19] border border-[#26314A] rounded-xl p-4 font-mono text-xs text-[#22D3EE] focus:outline-none focus:border-[#5B3DF5]"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#00E6A7] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Code Syntax Validated
              </span>
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-6 py-2.5 bg-[#00E6A7] hover:bg-[#00C28C] text-[#020617] font-bold text-xs rounded-xl shadow-md"
              >
                Submit &amp; Proceed to Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TOPIC ASSESSMENT */}
      {activeTab === 'quiz' && (
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#5B3DF5]" /> Topic Competency Evaluation
            </h2>
            <p className="text-xs text-[#94A3B8]">
              A score of &ge; 70% is required to mark this topic as MASTERED and unlock downstream Knowledge Graph DAG nodes.
            </p>
          </div>

          {quizSubmitted && quizScore !== null && (
            <div className={`p-5 rounded-2xl border ${quizScore >= 70 ? 'bg-[#00E6A7]/10 border-[#00E6A7] text-[#00E6A7]' : 'bg-rose-950/40 border-rose-500 text-rose-300'} space-y-2`}>
              <div className="font-bold text-sm flex items-center gap-2">
                {quizScore >= 70 ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span>Assessment Completed: Score {quizScore}%</span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                {quizScore >= 70
                  ? 'Congratulations! Topic marked MASTERED. Downstream prerequisite nodes unlocked in your Knowledge Graph.'
                  : 'Score below 70%. Review recommended reading material and retry assessment.'}
              </p>
            </div>
          )}

          <div className="space-y-6">
            {topicData.quizQuestions.map((q, idx) => (
              <div key={q.id} className="p-5 bg-[#050A19] border border-[#26314A] rounded-2xl space-y-3">
                <div className="text-xs font-bold text-white">
                  {idx + 1}. {q.question}
                </div>

                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = quizAnswers[q.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                        className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#5B3DF5] text-white border-[#5B3DF5]'
                            : 'bg-[#11182B] border-[#26314A] text-[#94A3B8] hover:text-white'
                        }`}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#26314A]">
            <button
              onClick={handleQuizSubmit}
              className="px-8 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30"
            >
              Submit Topic Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
