'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Network, Lock, CheckCircle2, PlayCircle, ShieldCheck, BookOpen, Code2, Search, ZoomIn, ZoomOut, RotateCcw, ArrowRight, Sparkles, Layers } from 'lucide-react';

export default function KnowledgeGraphPage() {
  const initialNodes = [
    {
      id: "node-1",
      name: "HTML5 & Semantic Layouts",
      category: "Frontend Fundamentals",
      status: "MASTERED",
      levelMastered: 8,
      masteryPercentage: 92,
      score: 92,
      description: "Semantic page structure, accessibility standards, SEO tags, and DOM tree hierarchy.",
      prerequisites: ["Web Basics"],
      dependentSkills: ["CSS3 Flexbox/Grid", "DOM Manipulation"],
      resources: ["MDN Semantic HTML Guide", "W3C Accessibility Standards"]
    },
    {
      id: "node-2",
      name: "CSS3 & Modern Responsive Layouts",
      category: "Frontend Fundamentals",
      status: "VERIFIED",
      levelMastered: 9,
      masteryPercentage: 95,
      score: 95,
      description: "Flexbox, CSS Grid, custom properties, responsive breakpoints, and animations.",
      prerequisites: ["HTML5 & Semantic Layouts"],
      dependentSkills: ["Tailwind CSS", "React Component UI"],
      resources: ["CSS Tricks Grid Complete Guide", "Flexbox Froggy Practice"]
    },
    {
      id: "node-3",
      name: "JavaScript Async & Execution Context",
      category: "Core Language Engine",
      status: "IN_PROGRESS",
      levelMastered: 6,
      masteryPercentage: 68,
      score: 68,
      description: "Call stack, event loop, promises, async/await, closures, and V8 heap management.",
      prerequisites: ["JS ES6 Fundamentals"],
      dependentSkills: ["React State Architecture", "Express Middleware"],
      resources: ["JavaScript Info Async Guide", "V8 Engine Internals Video Track"]
    },
    {
      id: "node-4",
      name: "React State & Lifecycle Engines",
      category: "Frontend Frameworks",
      status: "AVAILABLE",
      levelMastered: 4,
      masteryPercentage: 45,
      score: 45,
      description: "Virtual DOM reconciliation, state machines, custom hooks, and context propagation.",
      prerequisites: ["JavaScript Async & Execution Context"],
      dependentSkills: ["Next.js App Router", "Redux State Engine"],
      resources: ["Official React Docs", "Advanced Custom Hook Patterns"]
    },
    {
      id: "node-5",
      name: "Node.js Microservices & Express Pipeline",
      category: "Backend Engineering",
      status: "LOCKED",
      levelMastered: 0,
      masteryPercentage: 0,
      score: 0,
      description: "RESTful architecture, JWT security, middleware chains, and stream pipelines.",
      prerequisites: ["JavaScript Async & Execution Context"],
      dependentSkills: ["PostgreSQL & Prisma ORM", "Docker Deployment"],
      resources: ["Node.js Security Best Practices", "Express API Architecture"]
    }
  ];

  const [nodes] = useState(initialNodes);
  const [selectedNode, setSelectedNode] = useState(initialNodes[2]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [zoomLevel, setZoomLevel] = useState(100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'MASTERED':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#00E6A7]/10 text-[#00E6A7] border border-[#00E6A7]/30 text-[10px] font-bold">MASTERED</span>;
      case 'VERIFIED':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 text-[10px] font-bold">VERIFIED</span>;
      case 'IN_PROGRESS':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#5B3DF5]/20 text-[#22D3EE] border border-[#5B3DF5]/40 text-[10px] font-bold">IN PROGRESS</span>;
      case 'LOCKED':
        return <span className="px-2.5 py-0.5 rounded-full bg-[#050A19] text-[#64748B] border border-[#26314A] text-[10px] font-bold">LOCKED</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-[#11182B] text-white border border-[#26314A] text-[10px] font-bold">AVAILABLE</span>;
    }
  };

  const filteredNodes = nodes.filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase()) || node.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || node.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-2 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
            <Network className="w-3.5 h-3.5 text-[#22D3EE]" />
            PREREQUISITE DEPENDENCY GRAPH
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Knowledge Graph Engine
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-3xl leading-relaxed">
          Interactive competency map displaying topic prerequisite chains, skill dependencies, and topic unlock vectors.
        </p>
      </div>

      {/* SEARCH, CONTROLS & LEGEND TOOLBAR */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050A19] border border-[#26314A] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#050A19] border border-[#26314A] rounded-xl px-3 py-2 text-xs text-[#94A3B8] focus:outline-none focus:border-[#5B3DF5]"
          >
            <option value="ALL">All States</option>
            <option value="MASTERED">Mastered</option>
            <option value="VERIFIED">Verified</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="AVAILABLE">Available</option>
            <option value="LOCKED">Locked</option>
          </select>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-[#94A3B8] overflow-x-auto w-full md:w-auto">
          <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#00E6A7]" /> Mastered</span>
          <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> Verified</span>
          <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#5B3DF5]" /> In Progress</span>
          <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#64748B]" /> Locked</span>
        </div>
      </div>

      {/* MAIN GRAPH CANVAS & SIDE DETAILS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GRAPH CANVAS / NODES GRID */}
        <div className="lg:col-span-2 bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#26314A] pb-3">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#22D3EE]" /> FULL STACK COMPETENCY DAG ({filteredNodes.length} NODES)
            </span>
            <div className="flex items-center gap-1 text-[#94A3B8]">
              <button onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))} className="p-1.5 bg-[#050A19] border border-[#26314A] rounded-lg hover:text-white"><ZoomIn className="w-3.5 h-3.5" /></button>
              <button onClick={() => setZoomLevel(prev => Math.max(70, prev - 10))} className="p-1.5 bg-[#050A19] border border-[#26314A] rounded-lg hover:text-white"><ZoomOut className="w-3.5 h-3.5" /></button>
              <button onClick={() => setZoomLevel(100)} className="p-1.5 bg-[#050A19] border border-[#26314A] rounded-lg hover:text-white"><RotateCcw className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 transition-transform duration-200 origin-top-left"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            {filteredNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-5 rounded-2xl border text-left transition-all space-y-3 relative ${
                    isSelected
                      ? "bg-[#050A19] border-[#5B3DF5] shadow-xl shadow-[#5B3DF5]/20 ring-1 ring-[#5B3DF5]"
                      : "bg-[#050A19] border-[#26314A] hover:border-[#3B82F6]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{node.category}</span>
                    {getStatusBadge(node.status)}
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base">{node.name}</h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-2 mt-1 leading-relaxed">{node.description}</p>
                  </div>

                  <div className="pt-2 border-t border-[#26314A] flex items-center justify-between text-xs">
                    <span className="text-[#64748B] font-medium">Proficiency</span>
                    <span className="font-bold text-[#22D3EE]">{node.masteryPercentage}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SELECTED NODE DETAILS SHEET */}
        {selectedNode && (
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="space-y-3 border-b border-[#26314A] pb-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{selectedNode.category}</span>
                {getStatusBadge(selectedNode.status)}
              </div>
              <h2 className="text-xl font-bold text-white">{selectedNode.name}</h2>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{selectedNode.description}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">ASSESSMENT SCORE & PROFICIENCY</div>
                <div className="text-lg font-bold text-white">{selectedNode.score}% <span className="text-xs font-normal text-[#94A3B8]">(Level {selectedNode.levelMastered}/10)</span></div>
              </div>

              <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">PREREQUISITES</div>
                <div className="text-white font-medium">
                  {selectedNode.prerequisites?.length > 0 ? selectedNode.prerequisites.join(", ") : "None (Baseline Skill)"}
                </div>
              </div>

              <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-1">
                <div className="text-[10px] font-bold text-[#00E6A7] uppercase tracking-wider">DEPENDENT UNLOCK PATHS</div>
                <div className="text-white font-medium">
                  {selectedNode.dependentSkills?.length > 0 ? selectedNode.dependentSkills.join(", ") : "Terminal Node"}
                </div>
              </div>

              <div className="bg-[#050A19] border border-[#26314A] p-4 rounded-xl space-y-2">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">RECOMMENDED RESOURCES</div>
                <ul className="space-y-1.5">
                  {selectedNode.resources?.map((res, i) => (
                    <li key={i} className="text-xs text-[#22D3EE] flex items-center gap-1.5 hover:underline cursor-pointer">
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href="/app/learning"
                className="w-full py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Study Topic Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


