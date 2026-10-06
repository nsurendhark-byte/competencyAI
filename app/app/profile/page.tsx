'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Building, GraduationCap, Compass, Clock, Save, Check, Sparkles, CheckCircle2 } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [targetCareerId, setTargetCareerId] = useState('career-fs-01');
  const [weeklyHours, setWeeklyHours] = useState(10);
  const [bio, setBio] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    safeFetch('/api/user/profile')
      .then(res => {
        if (res.ok && res.data?.user) {
          const u = res.data.user;
          setUser(u);
          setFullName(u.fullName || '');
          setEmail(u.email || '');
          setBio(u.bio || '');
          if (u.targetCareerId) setTargetCareerId(u.targetCareerId);
          if (u.weeklyHoursTarget) setWeeklyHours(u.weeklyHoursTarget);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const res = await safeFetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName,
        email,
        bio,
        targetCareerId,
        weeklyHoursTarget: weeklyHours
      })
    });

    if (res.ok && res.data?.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('competency_user_session', JSON.stringify(res.data.user));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-xs font-mono text-cyan-400 animate-pulse">
        LOADING ACCOUNT PROFILE DATA...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* TOP PROFILE HEADER CARD */}
      <div className="bg-[#0A0F1D]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#5B3DF5]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-indigo-600/30 shrink-0 border border-cyan-400/30">
          {fullName.charAt(0)?.toUpperCase() || 'U'}
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">{fullName}</h1>
            <span className="px-3 py-1 rounded-full bg-[#050A19] border border-cyan-500/30 text-[#22D3EE] text-xs font-mono font-semibold">
              Full-Stack Software Engineer Track
            </span>
          </div>
          <p className="text-xs text-slate-400">{email}</p>
        </div>
      </div>

      {/* EDIT PROFILE FORM */}
      <div className="bg-[#0A0F1D]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">
              ACCOUNT PROFILE & LEARNING PREFERENCES
            </h2>
          </div>

          {saved && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully!
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#050A19] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050A19] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Weekly Target Study Hours</label>
              <select
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full bg-[#050A19] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value={5}>5 Hours / Week</option>
                <option value={10}>10 Hours / Week</option>
                <option value={15}>15 Hours / Week</option>
                <option value={20}>20 Hours / Week</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Target Career Track</label>
              <select
                value={targetCareerId}
                onChange={(e) => setTargetCareerId(e.target.value)}
                className="w-full bg-[#050A19] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="career-fs-01">Full-Stack Software Engineer</option>
                <option value="career-ai-01">AI Systems Architect</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Bio / Career Goal Summary</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell us about your target engineering role..."
              className="w-full bg-[#050A19] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
