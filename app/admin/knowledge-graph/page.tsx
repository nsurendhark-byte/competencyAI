'use client';

import { useState, useEffect } from 'react';
import { Network, Plus, Trash2, GitBranch, Layers, ArrowRight, CheckCircle2, RefreshCw, X } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function AdminKnowledgeGraphPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [dependencies, setDependencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [showEdgeModal, setShowEdgeModal] = useState(false);

  // Node Form
  const [nodeName, setNodeName] = useState('');
  const [nodeCategory, setNodeCategory] = useState('Frontend');
  const [nodeDescription, setNodeDescription] = useState('');

  // Edge Form
  const [targetSkillId, setTargetSkillId] = useState('');
  const [prereqSkillId, setPrereqSkillId] = useState('');

  const loadGraphData = async () => {
    setLoading(true);
    try {
      const res = await safeFetch('/api/admin/knowledge-graph');
      if (res.ok && res.data) {
        setSkills(res.data.skills || []);
        setDependencies(res.data.dependencies || []);
        if (res.data.skills?.length > 1) {
          setTargetSkillId(res.data.skills[1]?.id || res.data.skills[0]?.id);
          setPrereqSkillId(res.data.skills[0]?.id);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGraphData();
  }, []);

  const handleCreateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nodeName.trim()) return;

    const res = await safeFetch('/api/admin/knowledge-graph', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_skill',
        name: nodeName,
        category: nodeCategory,
        description: nodeDescription
      })
    });

    if (res.ok) {
      setShowNodeModal(false);
      setNodeName('');
      setNodeDescription('');
      loadGraphData();
    }
  };

  const handleCreateEdge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetSkillId || !prereqSkillId) return;

    const res = await safeFetch('/api/admin/knowledge-graph', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_edge',
        skillId: targetSkillId,
        prerequisiteId: prereqSkillId
      })
    });

    if (res.ok) {
      setShowEdgeModal(false);
      loadGraphData();
    }
  };

  const handleDeleteEdge = async (edgeId: string) => {
    if (!confirm('Are you sure you want to remove this prerequisite relationship?')) return;
    const res = await safeFetch('/api/admin/knowledge-graph', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete_edge', edgeId })
    });
    if (res.ok) {
      setDependencies(prev => prev.filter(d => d.id !== edgeId));
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs text-slate-100">
      {/* HEADER BANNER */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="text-cyan-400 font-bold tracking-wider text-[11px] flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400" />
            KNOWLEDGE GRAPH PREREQUISITE DAG ENGINE
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Skill Nodes & Dependency Rules</h1>
          <p className="text-slate-400 text-xs">
            Manage competency nodes, prerequisites, and learning unlock paths across the graph.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNodeModal(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 font-bold rounded-xl flex items-center gap-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4 text-cyan-400" /> CREATE SKILL NODE
          </button>

          <button
            onClick={() => setShowEdgeModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
          >
            <GitBranch className="w-4 h-4" /> ADD DEPENDENCY EDGE
          </button>
        </div>
      </div>

      {/* NODES & DEPENDENCY EDGES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SKILL NODES LIST */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>SKILL NODES ({skills.length})</span>
            </div>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {skills.map((s) => (
              <div key={s.id} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-1 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{s.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    {s.category}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-2">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVE DEPENDENCY EDGES */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>ACTIVE PREREQUISITE EDGES ({dependencies.length})</span>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-cyan-400">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
              Loading Dependency Graph...
            </div>
          ) : (
            <div className="space-y-3">
              {dependencies.map((dep) => (
                <div key={dep.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-4 hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
                      {dep.targetSkillName}
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                      PREREQUISITE: {dep.prerequisiteSkillName}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteEdge(dep.id)}
                    className="p-2 bg-rose-950/80 text-rose-300 rounded-xl hover:bg-rose-900 border border-rose-800 transition-colors"
                    title="Remove Prerequisite Link"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CREATE NODE MODAL */}
      {showNodeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-sm">Create Skill Node</h3>
              <button onClick={() => setShowNodeModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateNode} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">SKILL NAME</label>
                <input
                  type="text"
                  required
                  value={nodeName}
                  onChange={(e) => setNodeName(e.target.value)}
                  placeholder="e.g. Next.js App Router"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">CATEGORY</label>
                <select
                  value={nodeCategory}
                  onChange={(e) => setNodeCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Architecture">Architecture</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">DESCRIPTION</label>
                <textarea
                  value={nodeDescription}
                  onChange={(e) => setNodeDescription(e.target.value)}
                  rows={3}
                  placeholder="Description of competency mastery requirements..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowNodeModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-extrabold rounded-xl">Create Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE EDGE MODAL */}
      {showEdgeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-white text-sm">Add Dependency Edge</h3>
              <button onClick={() => setShowEdgeModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleCreateEdge} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">TARGET SKILL (UNLOCKED BY PREREQUISITE)</label>
                <select
                  value={targetSkillId}
                  onChange={(e) => setTargetSkillId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                >
                  {skills.map(s => <option key={s.id} value={s.id}>{s.name} ({s.category})</option>)}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">PREREQUISITE SKILL (REQUIRED FIRST)</label>
                <select
                  value={prereqSkillId}
                  onChange={(e) => setPrereqSkillId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                >
                  {skills.map(s => <option key={s.id} value={s.id}>{s.name} ({s.category})</option>)}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowEdgeModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-extrabold rounded-xl">Add Edge</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
