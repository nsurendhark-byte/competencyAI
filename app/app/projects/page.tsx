'use client';

import { useState } from 'react';
import { FolderGit2, Upload, CheckCircle2, Star, ArrowRight, Clock, Code2, Award, PlayCircle } from 'lucide-react';

export default function ProjectsPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState<'all' | 'active' | 'recommended' | 'completed'>('all');

  const projects = [
    {
      id: 'proj-1',
      title: 'Full-Stack Distributed E-Commerce Microservice',
      description: 'Build a production-grade microservice architecture with API Gateway, JWT Auth, Redis Caching, and SQL Relational Transactions.',
      difficulty: 'Advanced',
      status: 'ACTIVE',
      progress: 65,
      estimatedTime: '15 Hours',
      skills: ['Node.js', 'Redis', 'PostgreSQL', 'JWT'],
      category: 'active'
    },
    {
      id: 'proj-2',
      title: 'Real-Time Collaborative Code Editor with WebSockets',
      description: 'Implement operational transformation for live multi-user editing, syntax highlighting, and execution sandbox container integration.',
      difficulty: 'Intermediate',
      status: 'RECOMMENDED',
      progress: 0,
      estimatedTime: '12 Hours',
      skills: ['React.js', 'WebSockets', 'Express', 'Monaco Editor'],
      category: 'recommended'
    },
    {
      id: 'proj-3',
      title: 'Knowledge Graph Visualization Engine with D3.js',
      description: 'Design dynamic force-directed graph diagrams with interactive node filtering, prerequisite dependency resolution, and path highlighting.',
      difficulty: 'Advanced',
      status: 'COMPLETED',
      progress: 100,
      estimatedTime: '10 Hours',
      skills: ['TypeScript', 'D3.js', 'SVG', 'State Machines'],
      category: 'completed'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;
    setSubmitted(true);
  };

  const filteredProjects = projects.filter(p => activeSection === 'all' || p.category === activeSection);

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">
              PORTFOLIO BUILDER
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Capstone Engineering Projects
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Verified project capstones evaluated automatically by AI rubric scoring harness.
            </p>
          </div>

          {/* SECTION FILTER BUTTONS */}
          <div className="flex items-center gap-1 bg-[#050A19] p-1.5 rounded-xl border border-[#26314A] overflow-x-auto">
            {['all', 'recommended', 'active', 'completed'].map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                  activeSection === sec
                    ? 'bg-[#5B3DF5] text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((p) => {
          const isCompleted = p.status === 'COMPLETED';
          const isActive = p.status === 'ACTIVE';

          return (
            <div
              key={p.id}
              className={`bg-[#11182B] border rounded-2xl p-6 space-y-4 shadow-xl transition-all flex flex-col justify-between ${
                isActive
                  ? 'border-[#5B3DF5] shadow-lg shadow-[#5B3DF5]/10'
                  : 'border-[#26314A]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                    isCompleted
                      ? 'bg-[#00E6A7]/10 text-[#00E6A7] border border-[#00E6A7]/30'
                      : isActive
                      ? 'bg-[#5B3DF5]/20 text-[#22D3EE] border border-[#5B3DF5]/40'
                      : 'bg-[#050A19] text-[#94A3B8] border border-[#26314A]'
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-[10px] font-bold text-[#64748B] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {p.estimatedTime}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base leading-snug">{p.title}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">{p.description}</p>
                </div>

                {/* SKILLS TAGS */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-[#050A19] border border-[#26314A] text-[10px] font-semibold text-[#22D3EE]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#26314A]">
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Progress</span>
                  <span className="font-semibold text-white">{p.progress}%</span>
                </div>
                <div className="w-full bg-[#050A19] h-2 rounded-full overflow-hidden border border-[#26314A]">
                  <div className="bg-[#5B3DF5] h-full rounded-full" style={{ width: `${p.progress}%` }} />
                </div>

                <button className="w-full py-2.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/20 transition-all flex items-center justify-center gap-2">
                  <span>{isCompleted ? 'View Details' : isActive ? 'Continue Project' : 'Open Project'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* REPOSITORY SUBMISSION FORM CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 border-b border-[#26314A] pb-3">
          <FolderGit2 className="w-5 h-5 text-[#22D3EE]" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            SUBMIT GITHUB REPOSITORY FOR AUTOMATED SCORING
          </h2>
        </div>

        {submitted ? (
          <div className="p-6 bg-[#050A19] border border-[#00E6A7]/50 rounded-xl text-center space-y-2 text-xs">
            <CheckCircle2 className="w-10 h-10 text-[#00E6A7] mx-auto" />
            <div className="font-bold text-white text-sm">SUBMISSION RECEIVED & SCORED</div>
            <p className="text-[#94A3B8]">AI Rubric Evaluation: 92/100 (Passed unit tests & clean code standards)</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-[#94A3B8] font-semibold">GitHub Repository URL</label>
              <input
                type="url"
                required
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/user/project-repo"
                className="w-full bg-[#050A19] border border-[#26314A] rounded-xl p-3 text-white placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> <span>Submit Project for AI Rubric Scoring</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

