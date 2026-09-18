'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Building, GraduationCap, Compass, Clock, Save, Check } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState('Demo Student');
  const [email, setEmail] = useState('demo.student@college.edu');
  const [college, setCollege] = useState('Institute of Technology');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [targetCareer, setTargetCareer] = useState('Full Stack Developer');
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    safeFetch('/api/auth/me')
      .then(res => {
        if (res.ok && res.data?.user) {
          setUser(res.data.user);
          if (res.data.user.fullName) setFullName(res.data.user.fullName);
          if (res.data.user.email) setEmail(res.data.user.email);
        }
      });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* TOP PROFILE HEADER CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-[#5B3DF5] text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-[#5B3DF5]/30 shrink-0">
          {fullName.charAt(0) || 'D'}
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-white tracking-tight">{fullName}</h1>
          <p className="text-xs text-[#22D3EE] font-medium">
            {college} • {department} (3rd Year)
          </p>
          <p className="text-xs text-[#94A3B8]">{email}</p>
        </div>
      </div>

      {/* EDIT PROFILE & PREFERENCES FORM */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-[#26314A] pb-4">
          <h2 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            EDIT PROFILE & PREFERENCES
          </h2>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#94A3B8]">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B3DF5]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#94A3B8]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B3DF5]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#94A3B8]">College / Institution</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B3DF5]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#94A3B8]">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B3DF5]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#94A3B8]">Target Career Role</label>
            <input
              type="text"
              value={targetCareer}
              onChange={(e) => setTargetCareer(e.target.value)}
              className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#5B3DF5]"
            />
          </div>

          {/* WEEKLY HOURS SLIDER */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-white">Weekly Available Study Hours ({weeklyHours} hrs/week)</label>
              <span className="text-[#22D3EE] font-bold">{weeklyHours} hrs/week</span>
            </div>

            <input
              type="range"
              min={5}
              max={40}
              step={5}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full accent-[#5B3DF5] bg-[#050A19] rounded-lg h-2 cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-[#64748B] font-medium">
              <span>5 hrs (Casual)</span>
              <span>15 hrs (Recommended)</span>
              <span>40 hrs (Intensive Boot Camp)</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center gap-2"
            >
              {saved ? <Check className="w-4 h-4 text-[#00E6A7]" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Settings Saved!' : 'Save Profile Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

