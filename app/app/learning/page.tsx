'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GitBranch,
  Calendar,
  Sparkles,
  Network,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink,
  Code2,
  Award
} from 'lucide-react';

export default function LearningPage() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    'w1-l1': true
  });
  const [showReportModal, setShowReportModal] = useState(false);

  const toggleLessonComplete = (id: string) => {
    setCompletedLessons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const weeks = [
    {
      week: 1,
      topic: 'JavaScript Fundamentals & Async Mastery',
      status: 'IN PROGRESS',
      hours: '15 Hours',
      skillsUnlocked: ['Promises', 'Event Loop', 'V8 Heap', 'Closures'],
      whyRequired: 'Essential prerequisite for React state reconciliation and Node.js asynchronous event loop management.',
      practiceActivity: 'Build custom Promise implementations and solve 5 async event loop debugging scenarios.',
      lessons: [
        { id: 'w1-l1', title: '1.1 Understanding V8 Heap, Stack & Memory Lifecycle', duration: '45 mins', type: 'Theory & Code' },
        { id: 'w1-l2', title: '1.2 Event Loop, Microtask vs Macrotask Queue', duration: '60 mins', type: 'Interactive VM' },
        { id: 'w1-l3', title: '1.3 Advanced Closures & Lexical Environment', duration: '45 mins', type: 'Video + Quiz' }
      ]
    },
    {
      week: 2,
      topic: 'React Component Architecture & State Engines',
      status: 'QUEUED',
      hours: '15 Hours',
      skillsUnlocked: ['Custom Hooks', 'Virtual DOM', 'Context API', 'State Machines'],
      whyRequired: 'Prerequisite for frontend application lifecycle, custom hook state isolation, and virtual DOM diffing.',
      practiceActivity: 'Create interactive real-time dashboard components using custom hooks and context API.',
      lessons: [
        { id: 'w2-l1', title: '2.1 Fiber Reconciler & Virtual DOM Mechanics', duration: '50 mins', type: 'Theory' },
        { id: 'w2-l2', title: '2.2 Custom Hooks & State Encapsulation', duration: '60 mins', type: 'Hands-on Code' }
      ]
    },
    {
      week: 3,
      topic: 'Node.js REST API Architecture & Express Middleware',
      status: 'QUEUED',
      hours: '15 Hours',
      skillsUnlocked: ['Express.js', 'JWT Auth', 'Middleware Pipeline', 'Stream API'],
      whyRequired: 'Core backend competency required to design scalable REST endpoints, JWT auth flow, and error pipelines.',
      practiceActivity: 'Architect complete REST API with rate limiting, input validation, and JWT session guard.',
      lessons: [
        { id: 'w3-l1', title: '3.1 Express Router & Middleware Chain Architecture', duration: '60 mins', type: 'Hands-on Code' },
        { id: 'w3-l2', title: '3.2 JWT Session Authentication & Bcrypt Hashing', duration: '75 mins', type: 'Security Lab' }
      ]
    },
    {
      week: 4,
      topic: 'Relational Database Design & PostgreSQL Optimization',
      status: 'QUEUED',
      hours: '15 Hours',
      skillsUnlocked: ['SQL Joins', 'B-Tree Indexing', 'Prisma ORM', 'ACID Transactions'],
      whyRequired: 'Database data integrity foundation required for backend schema migrations and query indexing.',
      practiceActivity: 'Design normalized database schema with foreign key constraints, B-Tree indexes, and complex joins.',
      lessons: [
        { id: 'w4-l1', title: '4.1 Relational Schema Normalization (1NF to 3NF)', duration: '45 mins', type: 'Theory' },
        { id: 'w4-l2', title: '4.2 Query Execution Plan & Indexing Strategy', duration: '60 mins', type: 'SQL Lab' }
      ]
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* TOP HEADER CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            AI-GENERATED ADAPTIVE ROADMAP
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personalized Learning Journey: Full Stack Developer
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Calculated for Demo Student • 15 Hours/Week • Video + Hands-on Preference
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/app/study-planner"
              className="px-4 py-2.5 bg-[#050A19] border border-[#26314A] hover:border-[#5B3DF5] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#22D3EE]" />
              <span>Open Smart Study Planner</span>
            </Link>

            <Link
              href="/app/aura"
              className="px-4 py-2.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white text-xs font-semibold rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Ask AI Mentor</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KNOWLEDGE GRAPH ADJUSTMENT BANNER */}
      <div className="bg-[#050A19] border border-[#26314A] rounded-2xl p-5 flex items-start gap-4 shadow-lg">
        <div className="w-10 h-10 rounded-xl bg-[#11182B] border border-[#26314A] flex items-center justify-center text-[#22D3EE] shrink-0">
          <Network className="w-5 h-5" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Knowledge Graph Adaptive Adjustment
            </h3>
            <span className="text-[10px] font-bold text-[#00E6A7] bg-[#00E6A7]/10 px-2 py-0.5 rounded border border-[#00E6A7]/30">
              LIVE SYNCHRONIZED
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Your roadmap was dynamically recalculated. Prerequisite node <strong className="text-[#22D3EE]">"JavaScript Fundamentals"</strong> has been prioritized before <strong className="text-white">"React Architecture"</strong> based on your diagnostic evaluation score.
          </p>
        </div>
      </div>

      {/* REPORT PROBLEM MODAL NOTIFICATION */}
      {showReportModal && (
        <div className="p-4 bg-rose-950/60 border border-rose-500/50 rounded-xl text-xs text-rose-200 flex items-center justify-between">
          <span>Problem report log dispatched to Admin Control Center triage queue.</span>
          <button onClick={() => setShowReportModal(false)} className="text-rose-400 font-semibold underline">DISMISS</button>
        </div>
      )}

      {/* WEEKLY LEARNING ROADMAP CARDS */}
      <div className="space-y-4">
        {weeks.map((item) => {
          const isInProgress = item.status === 'IN PROGRESS';
          const isExpanded = expandedWeek === item.week;

          return (
            <div
              key={item.week}
              className={`bg-[#11182B] border rounded-2xl transition-all overflow-hidden ${
                isInProgress
                  ? 'border-[#5B3DF5] shadow-xl shadow-[#5B3DF5]/10'
                  : 'border-[#26314A] opacity-90'
              }`}
            >
              {/* CARD TOP HEADER BAR */}
              <div
                onClick={() => setExpandedWeek(isExpanded ? null : item.week)}
                className="p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none hover:bg-[#050A19]/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-sm border shrink-0 ${
                    isInProgress ? 'bg-[#5B3DF5] text-white border-[#633BFF] shadow-md' : 'bg-[#050A19] text-[#94A3B8] border-[#26314A]'
                  }`}>
                    W{item.week}
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">WEEK {item.week} TOPIC</div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      {item.topic}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-[#26314A] pt-3 sm:pt-0">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isInProgress ? 'bg-[#5B3DF5]/20 text-[#22D3EE] border border-[#5B3DF5]/40' : 'bg-[#050A19] text-[#64748B] border border-[#26314A]'
                  }`}>
                    {item.status}
                  </span>

                  <span className="text-xs text-[#94A3B8] font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                    {item.hours}
                  </span>

                  <div className="w-7 h-7 rounded-lg bg-[#050A19] border border-[#26314A] flex items-center justify-center text-[#94A3B8]">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* EXPANDABLE SECTION CONTENT */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-[#26314A] space-y-5 bg-[#080B12]/50">
                  {/* WHY & PRACTICE ACTIVITY GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                    <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
                      <div className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">WHY IT IS REQUIRED</div>
                      <p className="text-[#94A3B8] leading-relaxed">{item.whyRequired}</p>
                    </div>

                    <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
                      <div className="text-[10px] font-bold text-[#00E6A7] uppercase tracking-wider">PRACTICE ACTIVITY</div>
                      <p className="text-[#94A3B8] leading-relaxed">{item.practiceActivity}</p>
                    </div>
                  </div>

                  {/* UNLOCKED SKILLS BADGES */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">SKILLS UNLOCKED IN THIS MODULE</div>
                    <div className="flex flex-wrap gap-2">
                      {item.skillsUnlocked.map(skill => (
                        <span key={skill} className="px-2.5 py-1 rounded-lg bg-[#11182B] border border-[#26314A] text-xs font-semibold text-[#22D3EE] flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#5B3DF5]" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* LESSON MODULE LIST & INTERACTIVE LESSON VIEWER */}
                  <div className="space-y-3 pt-2">
                    <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">WEEKLY LESSON MODULES</div>
                    <div className="space-y-2">
                      {item.lessons.map(lesson => {
                        const isDone = completedLessons[lesson.id];
                        return (
                          <div
                            key={lesson.id}
                            className="p-3.5 bg-[#050A19] border border-[#26314A] rounded-xl flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <button onClick={() => toggleLessonComplete(lesson.id)} className="text-[#94A3B8] hover:text-white">
                                <CheckCircle2 className={`w-5 h-5 ${isDone ? 'text-[#00E6A7]' : 'text-[#26314A]'}`} />
                              </button>
                              <div>
                                <span className={`font-semibold ${isDone ? 'line-through text-[#64748B]' : 'text-white'}`}>{lesson.title}</span>
                                <div className="text-[10px] text-[#94A3B8]">{lesson.type} • {lesson.duration}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Link
                                href="/app/practice"
                                className="px-3 py-1.5 bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] text-[#22D3EE] text-[11px] font-semibold rounded-lg flex items-center gap-1"
                              >
                                Practice <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* FEATURED THEORY & CODE SNIPPET AREA */}
                  {item.week === 1 && (
                    <div className="bg-[#050A19] border border-[#26314A] rounded-xl p-5 space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b border-[#26314A] pb-3">
                        <span className="font-bold text-white flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-[#22D3EE]" /> FEATURED THEORY: V8 Heap & Call Stack Memory Allocation
                        </span>
                        <button
                          onClick={() => setShowReportModal(true)}
                          className="px-2.5 py-1 bg-[#11182B] border border-[#26314A] text-rose-400 hover:border-rose-500 rounded-lg text-[10px] font-semibold flex items-center gap-1"
                        >
                          <AlertTriangle className="w-3 h-3" /> Report Problem
                        </button>
                      </div>

                      <p className="text-[#94A3B8] leading-relaxed">
                        JavaScript automatically manages memory allocation using garbage collection based on mark-and-sweep algorithms. Primitive types are stored directly in Call Stack memory, while object references live in the Heap.
                      </p>

                      <div className="p-4 bg-[#020617] border border-[#26314A] rounded-xl font-mono text-[11px] text-[#22D3EE] space-y-1">
                        <div className="text-[#64748B]">// Stack vs Heap Reference Allocation Example</div>
                        <div>let primitiveVal = 42; <span className="text-[#64748B]">// Stored on Call Stack</span></div>
                        <div>let userObj = &#123; id: 101, role: "FullStackEng" &#125;; <span className="text-[#64748B]">// Reference on Stack, Object on Heap</span></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

