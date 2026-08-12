'use client';

import { useState } from 'react';
import { FolderGit2, Upload, CheckCircle2, Star, ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const project = {
    title: 'Full-Stack Distributed E-Commerce Microservice',
    description: 'Build a production-grade microservice architecture with API Gateway, JWT Auth, Redis Caching, and SQL Relational Transactions.',
    milestones: [
      'Auth Service with Bcrypt & JWT Cookies',
      'Order Service with SQL ACID Transactions',
      'Redis Distributed Caching Layer',
      'Docker Compose Container Setup'
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl glow-cyan">
        <div className="font-mono text-xs text-cyan-400 mb-1">CAPSTONE PROJECT</div>
        <h1 className="text-2xl font-bold text-white">{project.title}</h1>
        <p className="text-xs text-slate-300 mt-1">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
          <h3 className="font-mono text-sm font-bold text-white">PROJECT MILESTONES</h3>
          <div className="space-y-2 font-mono text-xs text-slate-300">
            {project.milestones.map((m, idx) => (
              <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4">
          <h3 className="font-mono text-sm font-bold text-white">SUBMIT REPOSITORY FOR EVALUATION</h3>

          {submitted ? (
            <div className="p-6 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-center space-y-2 font-mono text-xs">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <div className="font-bold text-white text-sm">SUBMISSION RECEIVED</div>
              <p className="text-slate-300">AI Rubric Evaluation: 92/100 (Passed)</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-slate-400 mb-1">GITHUB REPOSITORY URL</label>
                <input
                  type="url"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/user/project-repo"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold rounded-lg hover:brightness-110 flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" /> SUBMIT PROJECT FOR SCORING
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
