'use client';

import { useState } from 'react';
import { Settings, Lock, Bell, Shield, User, Sparkles, BookOpen, Check } from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('ACCOUNT');
  const [saved, setSaved] = useState(false);

  // Form State
  const [email, setEmail] = useState('demo.student@college.edu');
  const [learningStyle, setLearningStyle] = useState('Hands-on & Video');
  const [aiAutonomy, setAiAutonomy] = useState('Proactive Mentoring');
  const [notifications, setNotifications] = useState({
    emailStreakAlerts: true,
    quizReminders: true,
    weeklyDigest: false
  });
  const [privacy, setPrivacy] = useState({
    shareGraphProgress: true,
    publicLeaderboard: true
  });
  const [password, setPassword] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections = [
    { id: 'ACCOUNT', name: 'Account Information', icon: User },
    { id: 'LEARNING', name: 'Learning Preferences', icon: BookOpen },
    { id: 'AI', name: 'AI Preferences', icon: Sparkles },
    { id: 'NOTIFICATIONS', name: 'Notifications', icon: Bell },
    { id: 'PRIVACY', name: 'Privacy Settings', icon: Shield },
    { id: 'SECURITY', name: 'Security & Password', icon: Lock }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-2 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
            <Settings className="w-3.5 h-3.5 text-[#22D3EE]" />
            SYSTEM CONTROL CENTER
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Account & Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Configure account security, learning style preferences, AI mentoring behavior, and notifications.
        </p>
      </div>

      {/* MAIN SETTINGS LAYOUT (SIDEBAR NAV + CONTENT CARD) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* NAV CARDS */}
        <div className="space-y-1.5">
          {sections.map((sec) => {
            const IconComp = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#5B3DF5] text-white shadow-lg shadow-[#5B3DF5]/30'
                    : 'bg-[#11182B] border border-[#26314A] text-[#94A3B8] hover:text-white hover:bg-[#050A19]'
                }`}
              >
                <IconComp className="w-4 h-4 shrink-0 text-[#22D3EE]" />
                <span>{sec.name}</span>
              </button>
            );
          })}
        </div>

        {/* CONTENT FORM CARD */}
        <div className="md:col-span-2 bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <form onSubmit={handleSave} className="space-y-5 text-xs">
            {activeSection === 'ACCOUNT' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#26314A] pb-3">
                  ACCOUNT INFORMATION
                </h3>
                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] font-semibold">Primary Account Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5B3DF5]"
                  />
                </div>
              </div>
            )}

            {activeSection === 'LEARNING' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#26314A] pb-3">
                  LEARNING PREFERENCES
                </h3>
                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] font-semibold">Preferred Learning Modality</label>
                  <select
                    value={learningStyle}
                    onChange={(e) => setLearningStyle(e.target.value)}
                    className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5B3DF5]"
                  >
                    <option value="Hands-on & Video">Hands-on Code + Short Video</option>
                    <option value="Deep Documentation">Deep Documentation & Specs</option>
                    <option value="Quiz Centric">Quiz & Practice Problem First</option>
                  </select>
                </div>
              </div>
            )}

            {activeSection === 'AI' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#26314A] pb-3">
                  AI MENTOR PREFERENCES
                </h3>
                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] font-semibold">Aura AI Behavior</label>
                  <select
                    value={aiAutonomy}
                    onChange={(e) => setAiAutonomy(e.target.value)}
                    className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5B3DF5]"
                  >
                    <option value="Proactive Mentoring">Proactive Gap Alerts & Hints</option>
                    <option value="On-Demand Only">Respond Only When Asked</option>
                  </select>
                </div>
              </div>
            )}

            {activeSection === 'NOTIFICATIONS' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#26314A] pb-3">
                  NOTIFICATION PREFERENCES
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3.5 bg-[#050A19] border border-[#26314A] rounded-xl cursor-pointer">
                    <span className="text-white font-medium">Streak & Progress Alerts</span>
                    <input
                      type="checkbox"
                      checked={notifications.emailStreakAlerts}
                      onChange={(e) => setNotifications({ ...notifications, emailStreakAlerts: e.target.checked })}
                      className="accent-[#5B3DF5] w-4 h-4 cursor-pointer"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3.5 bg-[#050A19] border border-[#26314A] rounded-xl cursor-pointer">
                    <span className="text-white font-medium">Daily Quiz Reminders</span>
                    <input
                      type="checkbox"
                      checked={notifications.quizReminders}
                      onChange={(e) => setNotifications({ ...notifications, quizReminders: e.target.checked })}
                      className="accent-[#5B3DF5] w-4 h-4 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeSection === 'PRIVACY' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#26314A] pb-3">
                  PRIVACY SETTINGS
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3.5 bg-[#050A19] border border-[#26314A] rounded-xl cursor-pointer">
                    <span className="text-white font-medium">Public Knowledge Graph Vector</span>
                    <input
                      type="checkbox"
                      checked={privacy.shareGraphProgress}
                      onChange={(e) => setPrivacy({ ...privacy, shareGraphProgress: e.target.checked })}
                      className="accent-[#5B3DF5] w-4 h-4 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeSection === 'SECURITY' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#26314A] pb-3">
                  PASSWORD & SECURITY
                </h3>
                <div className="space-y-1.5">
                  <label className="text-[#94A3B8] font-semibold">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5B3DF5]"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 flex items-center justify-end border-t border-[#26314A]">
              <button
                type="submit"
                className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center gap-2"
              >
                {saved ? <Check className="w-4 h-4 text-[#00E6A7]" /> : <Settings className="w-4 h-4" />}
                <span>{saved ? 'Preferences Saved!' : 'Save Settings'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

