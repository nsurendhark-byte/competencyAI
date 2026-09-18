'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GitBranch, Calendar, Sparkles, Network, ArrowRight, BookOpen, Clock, CheckCircle2 } from 'lucide-react';

export default function RoadmapPage() {
  const weeks = [
    {
      week: 1,
      topic: "JavaScript Fundamentals & Async Mastery",
      status: "IN PROGRESS",
      hours: "15 Hours",
      whyRequired: "Essential prerequisite for React state reconciliation and Node.js asynchronous event loop management.",
      practiceActivity: "Build custom Promise implementations and solve 5 async event loop debugging scenarios."
    },
    {
      week: 2,
      topic: "React Component Architecture & State Engines",
      status: "QUEUED",
      hours: "15 Hours",
      whyRequired: "Prerequisite for frontend application lifecycle, custom hook state isolation, and virtual DOM diffing.",
      practiceActivity: "Create interactive real-time dashboard components using custom hooks and context API."
    },
    {
      week: 3,
      topic: "Node.js REST API Architecture & Express Middleware",
      status: "QUEUED",
      hours: "15 Hours",
      whyRequired: "Core backend competency required to design scalable REST endpoints, JWT auth flow, and error pipelines.",
      practiceActivity: "Architect complete REST API with rate limiting, input validation, and JWT session guard."
    },
    {
      week: 4,
      topic: "Relational Database Design & PostgreSQL Optimization",
      status: "QUEUED",
      hours: "15 Hours",
      whyRequired: "Database data integrity foundation required for backend schema migrations and query indexing.",
      practiceActivity: "Design normalized database schema with foreign key constraints, B-Tree indexes, and complex joins."
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            AI-GENERATED ADAPTIVE ROADMAP
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Personalized Learning Journey: Full Stack Developer
            </h1>
            <p className="text-sm text-[#94A3B8]">
              Calculated for Demo Student • 15 Hours/Week • Video + Hands-on Preference
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app/study-planner"
              className="px-4 py-2.5 bg-[#11182B] border border-[#26314A] hover:border-[#5B3DF5] text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
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

      {/* KNOWLEDGE GRAPH ADJUSTMENT CARD */}
      <div className="bg-[#050A19] border border-[#26314A] rounded-2xl p-5 flex items-start gap-4 shadow-lg">
        <div className="w-9 h-9 rounded-xl bg-[#11182B] border border-[#26314A] flex items-center justify-center text-[#22D3EE] shrink-0">
          <Network className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            Knowledge Graph Adaptive Adjustment
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Your roadmap was dynamically recalculated. Prerequisite node <strong className="text-[#22D3EE]">"JavaScript Fundamentals"</strong> has been prioritized before <strong className="text-white">"React Architecture"</strong> based on your diagnostic evaluation score.
          </p>
        </div>
      </div>

      {/* WEEKLY ROADMAP CARDS */}
      <div className="space-y-4">
        {weeks.map((item) => {
          const isInProgress = item.status === "IN PROGRESS";
          return (
            <div
              key={item.week}
              className={`bg-[#11182B] border rounded-2xl p-6 transition-all space-y-4 ${
                isInProgress
                  ? "border-[#5B3DF5] shadow-lg shadow-[#5B3DF5]/10"
                  : "border-[#26314A] opacity-85"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#26314A] pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border ${
                    isInProgress ? "bg-[#5B3DF5] text-white border-[#633BFF]" : "bg-[#050A19] text-[#94A3B8] border-[#26314A]"
                  }`}>
                    W{item.week}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">WEEK {item.week} TOPIC</div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{item.topic}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    isInProgress ? "bg-[#5B3DF5]/20 text-[#22D3EE] border border-[#5B3DF5]/40" : "bg-[#050A19] text-[#64748B] border border-[#26314A]"
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-[#94A3B8] font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                    {item.hours}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
                  <div className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">WHY IT IS REQUIRED</div>
                  <p className="text-[#94A3B8] leading-relaxed">{item.whyRequired}</p>
                </div>

                <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
                  <div className="text-[10px] font-bold text-[#20D9C2] uppercase tracking-wider">PRACTICE ACTIVITY</div>
                  <p className="text-[#94A3B8] leading-relaxed">{item.practiceActivity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

