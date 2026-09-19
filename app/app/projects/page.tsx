'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FolderGit2, Upload, CheckCircle2, Star, ArrowRight, Clock, Code2, Award, ExternalLink, PlayCircle, AlertCircle } from 'lucide-react';

export default function ProjectsPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTier, setActiveTier] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const projects = [
    // Beginner Tiers
    {
      id: 'proj-b1',
      title: 'Personal Developer Portfolio & Resume Site',
      tier: 'Beginner',
      description: 'Craft a pixel-perfect, accessible portfolio displaying project cards, GitHub activity, and responsive layout CSS.',
      difficulty: 'Beginner',
      status: 'COMPLETED',
      progress: 100,
      estimatedTime: '6 Hours',
      prerequisites: ['HTML5 & Semantic Layouts', 'CSS Flexbox/Grid'],
      skills: ['HTML5', 'CSS Grid', 'Responsive Design', 'Git'],
      requirements: ['Semantic HTML tags', 'Responsive mobile breakpoint (<768px)', 'Valid CSS animation transitions'],
      milestones: ['Header & Hero Section', 'Projects Grid', 'Contact Form & Footer']
    },
    {
      id: 'proj-b2',
      title: 'Interactive To-Do & Task Management App',
      tier: 'Beginner',
      description: 'Build a task dashboard with state persistence in localStorage, category filtering, and task status toggles.',
      difficulty: 'Beginner',
      status: 'ACTIVE',
      progress: 60,
      estimatedTime: '8 Hours',
      prerequisites: ['JavaScript ES6 Primitives', 'DOM Events'],
      skills: ['JavaScript', 'DOM Manipulation', 'LocalStorage API'],
      requirements: ['Task CRUD functionality', 'Filter by Completed / Pending', 'LocalStorage persistence'],
      milestones: ['Task Entry Form', 'Local Storage Sync', 'Status Filter Toggles']
    },

    // Intermediate Tiers
    {
      id: 'proj-i1',
      title: 'JWT Authentication & Role Security System',
      tier: 'Intermediate',
      description: 'Architect secure authentication with bcrypt password hashing, JWT access/refresh tokens, and protected routes.',
      difficulty: 'Intermediate',
      status: 'RECOMMENDED',
      progress: 0,
      estimatedTime: '12 Hours',
      prerequisites: ['Node.js & Express Pipeline', 'Async JS'],
      skills: ['Node.js', 'Express', 'JWT', 'Bcrypt', 'Cookies'],
      requirements: ['HTTP-only cookie handling', 'Role-based access guard', 'Password strength validation'],
      milestones: ['User Registration API', 'Login Route & JWT Token', 'Protected Admin Route Guard']
    },
    {
      id: 'proj-i2',
      title: 'E-Commerce Product Catalog & Cart Pipeline',
      tier: 'Intermediate',
      description: 'Create an e-commerce catalog with React state management, checkout simulation, and search filtering.',
      difficulty: 'Intermediate',
      status: 'AVAILABLE',
      progress: 0,
      estimatedTime: '14 Hours',
      prerequisites: ['React Component Architecture', 'REST APIs'],
      skills: ['React.js', 'Context API', 'REST API', 'Tailwind CSS'],
      requirements: ['Add / remove cart items', 'Calculate total checkout price', 'Search & category filter'],
      milestones: ['Product Grid Component', 'Cart Context Provider', 'Checkout Modal']
    },

    // Advanced Tiers
    {
      id: 'proj-a1',
      title: 'Distributed E-Commerce Microservices Engine',
      tier: 'Advanced',
      description: 'Build microservices with API Gateway, JWT Auth, Redis Caching, PostgreSQL transactions, and Docker containerization.',
      difficulty: 'Advanced',
      status: 'RECOMMENDED',
      progress: 0,
      estimatedTime: '25 Hours',
      prerequisites: ['Node.js REST API', 'PostgreSQL', 'Docker'],
      skills: ['Node.js', 'Redis', 'PostgreSQL', 'Docker', 'JWT'],
      requirements: ['Distributed API gateway routing', 'Redis response caching layer', 'Docker Compose deployment'],
      milestones: ['Auth Microservice', 'Product Catalog Service', 'Docker Container Harness']
    },
    {
      id: 'proj-a2',
      title: 'Real-Time Collaborative App with WebSockets',
      tier: 'Advanced',
      description: 'Implement live multi-user editing, operational transformation for state sync, and syntax highlighting.',
      difficulty: 'Advanced',
      status: 'AVAILABLE',
      progress: 0,
      estimatedTime: '20 Hours',
      prerequisites: ['React Hooks', 'Node.js Event Loop', 'WebSockets'],
      skills: ['React.js', 'WebSockets', 'Express', 'Monaco Editor'],
      requirements: ['Bi-directional WebSocket connection', 'Multi-user cursor position sync', 'Code execution runner'],
      milestones: ['WebSocket Server Setup', 'Collaborative Editor UI', 'Code Execution Pipeline']
    }
  ];

  const handleSubmitRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;
    setSubmitted(true);
  };

  const filteredProjects = projects.filter(p => activeTier === 'all' || p.tier.toLowerCase() === activeTier);

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#22D3EE] uppercase tracking-wider">
              VERIFIABLE PORTFOLIO HARNESS
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Capstone Projects &amp; Evaluation
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Build real projects connected to your Knowledge Graph journey to boost your Career Readiness Index.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#050A19] p-1.5 rounded-xl border border-[#26314A] overflow-x-auto">
            {['all', 'beginner', 'intermediate', 'advanced'].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTier(t as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                  activeTier === t
                    ? 'bg-[#5B3DF5] text-white shadow-md'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => {
          const isCompleted = p.status === 'COMPLETED';
          const isActive = p.status === 'ACTIVE';

          return (
            <div
              key={p.id}
              className={`bg-[#11182B] border rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all ${
                isCompleted
                  ? 'border-[#00E6A7]/40'
                  : isActive
                  ? 'border-[#5B3DF5]'
                  : 'border-[#26314A] hover:border-[#3B82F6]/50'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-[#050A19] border border-[#26314A] text-[10px] font-mono text-[#22D3EE] font-bold">
                    {p.tier} Tier
                  </span>
                  {isCompleted ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] border border-[#00E6A7]/30 text-[10px] font-bold">
                      COMPLETED
                    </span>
                  ) : isActive ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#5B3DF5]/20 text-[#22D3EE] border border-[#5B3DF5]/40 text-[10px] font-bold">
                      IN PROGRESS ({p.progress}%)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#050A19] text-[#64748B] border border-[#26314A] text-[10px] font-bold">
                      AVAILABLE
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-white leading-snug">{p.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">{p.description}</p>

                <div className="flex items-center justify-between text-xs text-[#64748B] pt-1">
                  <span>Est: {p.estimatedTime}</span>
                  <span className="text-[#22D3EE] font-semibold">{p.prerequisites.length} Prerequisites</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.skills.map((sk) => (
                    <span key={sk} className="px-2 py-0.5 rounded bg-[#050A19] border border-[#26314A] text-[10px] text-[#22D3EE] font-mono">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedProject(p);
                  setRepoUrl('');
                  setSubmitted(false);
                }}
                className="w-full py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#5B3DF5]/30 transition-all"
              >
                <span>View Details &amp; Submit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#020617]/90 flex items-center justify-center p-4">
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-[#26314A] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#22D3EE] font-bold">{selectedProject.tier} Capstone Project</span>
                <h3 className="font-bold text-lg text-white">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs text-[#94A3B8] hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">PROJECT OVERVIEW</div>
                <p className="text-white leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl space-y-2">
                  <div className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">REQUIREMENTS</div>
                  <ul className="space-y-1 text-[#94A3B8] list-disc list-inside">
                    {selectedProject.requirements?.map((req: string, i: number) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl space-y-2">
                  <div className="text-[10px] font-bold text-[#00E6A7] uppercase tracking-wider">MILESTONES</div>
                  <ul className="space-y-1 text-[#94A3B8] list-disc list-inside">
                    {selectedProject.milestones?.map((m: string, i: number) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SUBMISSION FORM */}
              <div className="p-5 bg-[#050A19] border border-[#26314A] rounded-2xl space-y-4 pt-4">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#3B82F6]" /> Submit Project Repository
                </div>

                {submitted ? (
                  <div className="p-3 bg-[#00E6A7]/10 border border-[#00E6A7] text-[#00E6A7] rounded-xl flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Project submitted! Automated AI rubric evaluation queued for Career Readiness Index update.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitRepo} className="space-y-3">
                    <input
                      type="url"
                      required
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/username/project-repo"
                      className="w-full bg-[#11182B] border border-[#26314A] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B3DF5]"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl transition-all shadow-md"
                    >
                      Submit for AI Evaluation
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
