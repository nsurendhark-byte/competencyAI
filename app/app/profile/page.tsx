'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Compass, ShieldCheck } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => { if (data.authenticated) setUser(data.user); });
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-surface border border-surfaceBorder p-6 rounded-2xl glow-cyan">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500 text-slate-950 font-bold font-mono text-2xl flex items-center justify-center">
            {user?.fullName?.split(' ').map((n: string) => n[0]).join('') || 'U'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{user?.fullName || 'Learner User'}</h1>
            <p className="text-xs font-mono text-cyan-400">{user?.email}</p>
            <p className="text-[10px] font-mono text-slate-500 mt-1">ROLE: {user?.role || 'LEARNER'}</p>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 space-y-4 font-mono text-xs">
        <h3 className="font-bold text-white text-sm">USER IDENTITY DETAILS</h3>
        <div className="space-y-3">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
            <span className="text-slate-400">EMAIL STATUS:</span>
            <span className="text-emerald-400 font-bold">VERIFIED</span>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
            <span className="text-slate-400">TARGET CAREER:</span>
            <span className="text-cyan-400 font-bold">Full-Stack Software Engineer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
