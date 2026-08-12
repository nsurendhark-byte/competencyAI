'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Network, Lock, CheckCircle2, PlayCircle, ShieldCheck, BookOpen, Code2, ArrowRight } from 'lucide-react';

export default function KnowledgeGraphPage() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/knowledge-graph')
      .then(res => res.json())
      .then(data => {
        setNodes(data.nodes || []);
        if (data.nodes?.length > 0) setSelectedNode(data.nodes[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-xs font-mono text-cyan-400">
        INITIALIZING KNOWLEDGE GRAPH DAG INTERACTION...
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'MASTERED':
      case 'VERIFIED':
        return <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-400 font-mono text-[10px]">VERIFIED (100%)</span>;
      case 'IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-400 font-mono text-[10px]">IN PROGRESS</span>;
      case 'LOCKED':
        return <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-400 font-mono text-[10px]">LOCKED</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400 font-mono text-[10px]">AVAILABLE</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface border border-surfaceBorder p-6 rounded-2xl">
        <div>
          <div className="font-mono text-xs text-cyan-400 mb-1">INTERACTIVE SKILL DAG</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Competency Knowledge Graph</h1>
          <p className="text-xs text-slate-400 mt-1">Prerequisite navigation graph driven by assessment & code execution proof.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Visual Graph Canvas Representation */}
        <div className="lg:col-span-2 bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-6 min-h-[420px] relative flex flex-col justify-between glow-cyan">
          <div className="flex items-center justify-between border-b border-surfaceBorder pb-3">
            <span className="font-mono text-xs text-slate-400">GRAPH CANVAS • 5 ACTIVE DOMAIN NODES</span>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-400" /> MASTERED</span>
              <span className="flex items-center gap-1 text-cyan-400"><div className="w-2 h-2 rounded-full bg-cyan-400" /> ACTIVE</span>
              <span className="flex items-center gap-1 text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-500" /> LOCKED</span>
            </div>
          </div>

          {/* Node Grid Map */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-5 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-500 text-white ring-2 ring-cyan-500/40 shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-slate-500">{node.category}</span>
                    {getStatusBadge(node.status)}
                  </div>
                  <div className="font-bold text-sm text-white mb-1">{node.name}</div>
                  <div className="text-xs text-slate-400 line-clamp-2">{node.description}</div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                    <span>LEVEL {node.levelMastered} / 10</span>
                    <span>{node.masteryPercentage}%</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400 font-mono">
            SELECT A NODE TO INSPECT PREREQUISITE DEPENDENCIES AND STUDY RESOURCES.
          </div>
        </div>

        {/* Selected Node Details Sheet */}
        {selectedNode && (
          <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-6">
            <div className="space-y-2 border-b border-surfaceBorder pb-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400">{selectedNode.category}</span>
                {getStatusBadge(selectedNode.status)}
              </div>
              <h2 className="text-xl font-bold text-white">{selectedNode.name}</h2>
              <p className="text-xs text-slate-300">{selectedNode.description}</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="text-slate-400">CURRENT PROFICIENCY:</div>
                <div className="text-lg font-bold text-cyan-400">Level {selectedNode.levelMastered} of 10</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <div className="text-slate-400">PREREQUISITE NODES:</div>
                <div className="text-slate-200">
                  {selectedNode.prerequisites?.length > 0 ? selectedNode.prerequisites.join(', ') : 'None (Baseline Node)'}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/app/learning"
                className="w-full py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs font-mono rounded-lg hover:brightness-110 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> STUDY MATERIAL
              </Link>
              <Link
                href="/app/coding"
                className="w-full py-2.5 bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs font-mono rounded-lg hover:border-cyan-500 flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4" /> CODING ARENA
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
