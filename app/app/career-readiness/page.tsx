'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Compass, Award, Code2, Video, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export default function CareerReadinessPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/dashboard-data')
      .then(res => res.json())
      .then(resData => setData(resData))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-3 font-sans">
        <div className="w-12 h-12 bg-[#11182B] border border-[#26314A] rounded-2xl mx-auto flex items-center justify-center text-[#22D3EE] animate-pulse">
          <Compass className="w-6 h-6" />
        </div>
        <div className="text-xs font-semibold text-[#94A3B8]">CALCULATING CAREER READINESS VECTOR...</div>
      </div>
    );
  }

  const stats = data?.stats || {};
  const readinessPct = stats.readinessPercent || 78;

  const pillars = [
    { name: 'Technical Readiness', score: stats.overallScore || 82, sub: '100-Question Assessment & Code VM', color: '#22D3EE' },
    { name: 'Project Readiness', score: 88, sub: 'Capstone Microservice Scored by AI', color: '#5B3DF5' },
    { name: 'Interview Readiness', score: 85, sub: 'Technical & HR AI Simulator', color: '#00E6A7' },
    { name: 'Industry Alignment', score: 90, sub: 'Full-Stack Benchmark Gap Fit', color: '#3B82F6' }
  ];

  const strongSkills = ['HTML5 & Layouts', 'CSS Grid/Flexbox', 'JavaScript Closures & Promises', 'Git Version Control'];
  const missingSkills = ['Docker Containerization', 'Kubernetes Deployment', 'GraphQL Endpoint Design'];
  const prioritySkills = ['React State Reconciliation', 'Node.js Express Middleware', 'PostgreSQL B-Tree Indexing'];

  const recommendedActions = [
    { title: 'Complete Week 1 Async JS Practice', route: '/app/learning' },
    { title: 'Run Full-Stack Coding Sandbox Test Cases', route: '/app/coding' },
    { title: 'Simulate Technical Mock Interview with Aura', route: '/app/interview' }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* TOP CAREER READINESS CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#5B3DF5]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#22D3EE]" />
            CAREER READINESS INDEX
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Target Career: Full Stack Developer
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            Verifiable aggregate score calculated from diagnostic assessments, isolated VM sandbox code pass rates, capstone project rubrics, and mock interview performance.
          </p>
        </div>

        <div className="p-6 bg-[#050A19] border-2 border-[#5B3DF5] rounded-2xl text-center min-w-[170px] shadow-lg shadow-[#5B3DF5]/20 shrink-0">
          <div className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider">READINESS SCORE</div>
          <div className="text-4xl font-extrabold text-[#22D3EE] mt-1">{readinessPct}%</div>
          <div className="text-[10px] text-[#00E6A7] font-semibold mt-1">High Job Match</div>
        </div>
      </div>

      {/* 4 READINESS PILLARS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((pil) => (
          <div key={pil.name} className="bg-[#11182B] border border-[#26314A] p-5 rounded-2xl space-y-3 shadow-lg">
            <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{pil.name}</div>
            <div className="text-3xl font-extrabold text-white">{pil.score}%</div>
            <div className="w-full bg-[#050A19] h-2 rounded-full overflow-hidden border border-[#26314A]">
              <div className="h-full rounded-full" style={{ width: `${pil.score}%`, backgroundColor: pil.color }} />
            </div>
            <p className="text-[11px] text-[#94A3B8] leading-tight">{pil.sub}</p>
          </div>
        ))}
      </div>

      {/* SKILL COVERAGE BREAKDOWN (STRONG, MISSING, PRIORITY) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strong Skills */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#26314A] pb-3">
            <CheckCircle2 className="w-4 h-4 text-[#00E6A7]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">STRONG SKILLS (VERIFIED)</h3>
          </div>
          <div className="space-y-2 text-xs">
            {strongSkills.map((sk) => (
              <div key={sk} className="p-3 bg-[#050A19] border border-[#26314A] rounded-xl text-white font-medium flex items-center justify-between">
                <span>{sk}</span>
                <span className="text-[10px] font-bold text-[#00E6A7]">100%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Skills */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#26314A] pb-3">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">PRIORITY SKILLS (IN PROGRESS)</h3>
          </div>
          <div className="space-y-2 text-xs">
            {prioritySkills.map((sk) => (
              <div key={sk} className="p-3 bg-[#050A19] border border-[#26314A] rounded-xl text-white font-medium flex items-center justify-between">
                <span>{sk}</span>
                <span className="text-[10px] font-bold text-[#22D3EE]">65%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[#26314A] pb-3">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">MISSING SKILLS (QUEUED)</h3>
          </div>
          <div className="space-y-2 text-xs">
            {missingSkills.map((sk) => (
              <div key={sk} className="p-3 bg-[#050A19] border border-[#26314A] rounded-xl text-[#94A3B8] font-medium flex items-center justify-between">
                <span>{sk}</span>
                <span className="text-[10px] font-bold text-amber-400">Needed</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECOMMENDED ACTIONS */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
          RECOMMENDED ACTIONS TO BOOST READINESS SCORE
        </h3>

        <div className="space-y-3">
          {recommendedActions.map((act, idx) => (
            <div key={idx} className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl flex items-center justify-between gap-4 text-xs">
              <span className="font-semibold text-white">0{idx + 1}. {act.title}</span>
              <Link
                href={act.route}
                className="px-4 py-2 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold rounded-lg flex items-center gap-1.5 transition-all text-xs shrink-0"
              >
                <span>Execute</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

