'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function AdminIssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setIssues(data.issues || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-16 text-center font-mono text-xs text-cyan-400">LOADING ISSUE TRIAGE DESK...</div>;

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-rose-400 mb-1">ISSUE TRIAGE DESK</div>
          <h1 className="text-2xl font-bold text-white">Learner Problem Reports</h1>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400">
              <th className="p-4">CONTENT TYPE</th>
              <th className="p-4">ISSUE TYPE</th>
              <th className="p-4">DESCRIPTION</th>
              <th className="p-4">STATUS</th>
              <th className="p-4 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {issues.length > 0 ? (
              issues.map((iss) => (
                <tr key={iss.id} className="hover:bg-slate-950/60">
                  <td className="p-4 font-bold text-white">{iss.contentType}</td>
                  <td className="p-4 text-rose-400">{iss.issueType}</td>
                  <td className="p-4 text-slate-300">{iss.description}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">{iss.status}</span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="px-2 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">MARK FIXED</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No active issue reports. All curriculum content validated.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
