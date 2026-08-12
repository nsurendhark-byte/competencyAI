'use client';

import { useState, useEffect } from 'react';
import { Users, Search, CheckCircle2, AlertCircle, Eye, Shield } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data.users || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="py-16 text-center font-mono text-xs text-cyan-400">LOADING USERS DIRECTORY...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
        <div>
          <div className="text-xs text-cyan-400 mb-1">USER MANAGEMENT ENGINE</div>
          <h1 className="text-2xl font-bold text-white">Learner Accounts Directory</h1>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email or name..."
            className="bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden font-mono text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
              <th className="p-4">USER NAME</th>
              <th className="p-4">EMAIL</th>
              <th className="p-4">VERIFIED</th>
              <th className="p-4">DIAGNOSTIC SCORE</th>
              <th className="p-4">READINESS</th>
              <th className="p-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-slate-950/60">
                <td className="p-4 font-bold text-white">{u.fullName}</td>
                <td className="p-4 text-cyan-400">{u.email}</td>
                <td className="p-4">
                  {u.isVerified ? (
                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED</span>
                  ) : (
                    <span className="text-amber-400">PENDING</span>
                  )}
                </td>
                <td className="p-4 font-bold">{u.latestScore}%</td>
                <td className="p-4 font-bold text-cyan-400">{u.readinessPercent}%</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedUser(u)}
                    className="px-3 py-1 bg-slate-800 border border-slate-700 text-cyan-400 rounded hover:bg-slate-700"
                  >
                    INSPECT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
