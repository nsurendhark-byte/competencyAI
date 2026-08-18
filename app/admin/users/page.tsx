'use client';

import { useState, useEffect } from 'react';
import { Users, Search, CheckCircle2, AlertCircle, Eye, Shield, Trash2, Check, X, ShieldCheck } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [actionMessage, setActionMessage] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    const res = await safeFetch('/api/admin/users');
    if (res.ok && res.data?.users) {
      setUsers(res.data.users);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleVerified = async (user: any) => {
    setActionMessage('');
    const newStatus = !user.isVerified;
    const res = await safeFetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVerified: newStatus })
    });

    if (res.ok) {
      setActionMessage(`User ${user.email} status updated to ${newStatus ? 'VERIFIED' : 'UNVERIFIED'}.`);
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isVerified: newStatus } : u));
      if (selectedUser?.id === user.id) {
        setSelectedUser({ ...selectedUser, isVerified: newStatus });
      }
    } else {
      setActionMessage(`Failed to update status: ${res.data?.error || 'Server error'}`);
    }
  };

  const handleDeleteUser = async (user: any) => {
    if (!confirm(`Are you sure you want to permanently delete user ${user.email}?`)) return;

    setActionMessage('');
    const res = await safeFetch(`/api/admin/users/${user.id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setActionMessage(`User ${user.email} deleted successfully.`);
      setUsers(prev => prev.filter(u => u.id !== user.id));
      if (selectedUser?.id === user.id) {
        setSelectedUser(null);
      }
    } else {
      setActionMessage(`Failed to delete user: ${res.data?.error || 'Server error'}`);
    }
  };

  const filtered = users.filter(u =>
    u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="py-16 text-center font-mono text-xs text-cyan-400 animate-pulse">LOADING USERS DIRECTORY...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
        <div>
          <div className="text-xs text-cyan-400 mb-1">USER MANAGEMENT ENGINE</div>
          <h1 className="text-2xl font-bold text-white">Learner Accounts Directory ({users.length})</h1>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email or name..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-cyan-950/80 border border-cyan-500/50 rounded-lg text-xs font-mono text-cyan-300 flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage('')} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden font-mono text-xs shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
                <th className="p-4">USER NAME</th>
                <th className="p-4">EMAIL / MOBILE</th>
                <th className="p-4">ROLE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">READINESS</th>
                <th className="p-4 text-right">MANAGEMENT ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-950/60 transition-colors">
                  <td className="p-4 font-bold text-white">{u.fullName}</td>
                  <td className="p-4">
                    <div className="text-cyan-400">{u.email}</div>
                    {u.mobile && <div className="text-[10px] text-slate-500">{u.mobile}</div>}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.role === 'ADMIN' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {u.isVerified ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> PENDING
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-cyan-400">{u.readinessPercent || 0}%</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-cyan-400 rounded hover:bg-slate-700 transition-colors"
                      title="Inspect user details"
                    >
                      INSPECT
                    </button>
                    <button
                      onClick={() => handleToggleVerified(u)}
                      className={`px-2.5 py-1 border rounded transition-colors ${
                        u.isVerified
                          ? 'bg-amber-950/40 border-amber-800 text-amber-300 hover:bg-amber-900/50'
                          : 'bg-emerald-950/40 border-emerald-800 text-emerald-300 hover:bg-emerald-900/50'
                      }`}
                      title={u.isVerified ? 'Deactivate verification' : 'Verify user'}
                    >
                      {u.isVerified ? 'DEACTIVATE' : 'ACTIVATE'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(u)}
                      className="px-2 py-1 bg-rose-950/40 border border-rose-800 text-rose-400 rounded hover:bg-rose-900/50 transition-colors"
                      title="Delete account"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>USER ACCOUNT TELEMETRY</span>
              </div>
              <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-lg space-y-1">
                <div className="text-slate-500 text-[10px]">ACCOUNT ID</div>
                <div className="text-white font-mono">{selectedUser.id}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-lg space-y-1">
                  <div className="text-slate-500 text-[10px]">FULL NAME</div>
                  <div className="text-white font-bold">{selectedUser.fullName}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg space-y-1">
                  <div className="text-slate-500 text-[10px]">ROLE</div>
                  <div className="text-cyan-400 font-bold">{selectedUser.role}</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg space-y-1">
                <div className="text-slate-500 text-[10px]">EMAIL ADDRESS</div>
                <div className="text-white">{selectedUser.email}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-lg space-y-1">
                  <div className="text-slate-500 text-[10px]">DIAGNOSTIC score</div>
                  <div className="text-emerald-400 font-bold text-sm">{selectedUser.latestScore || 0}%</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg space-y-1">
                  <div className="text-slate-500 text-[10px]">CAREER READINESS</div>
                  <div className="text-cyan-400 font-bold text-sm">{selectedUser.readinessPercent || 0}%</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg space-y-1">
                <div className="text-slate-500 text-[10px]">CREATION TIMESTAMP</div>
                <div className="text-slate-400">{new Date(selectedUser.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
