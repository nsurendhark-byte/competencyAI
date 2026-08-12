'use client';

import { useState } from 'react';
import { LineChart, ShieldCheck, History, FileText } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const auditLogs = [
    { id: 1, action: 'ADMIN_LOGIN', details: 'adminssp.it@gmail.com logged in successfully', date: '2026-08-11 15:50' },
    { id: 2, action: 'CONTENT_PUBLISH', details: 'Published Lesson: Understanding V8 Heap & Call Stack', date: '2026-08-11 16:02' },
    { id: 3, action: 'AI_CONTENT_GENERATE', details: 'Generated Draft Lesson: Async Promises', date: '2026-08-11 16:15' }
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="text-cyan-400 mb-1">SYSTEM AUDIT & VERSION HISTORY</div>
          <h1 className="text-2xl font-bold text-white">Platform Analytics & Audit Trail</h1>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" /> SYSTEM AUDIT LOGS
        </h3>

        <div className="space-y-2">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-bold text-cyan-400">[{log.action}]</span> <span className="text-slate-200">{log.details}</span>
              </div>
              <span className="text-slate-500 text-[10px]">{log.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
