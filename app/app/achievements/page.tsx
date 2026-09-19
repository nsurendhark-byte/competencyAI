'use client';

import { Award, Target, Code2, Network, ShieldCheck, CheckCircle2, Flame, Sparkles, FolderGit2, Lock } from 'lucide-react';

export default function AchievementsPage() {
  const achievements = [
    { title: 'Diagnostic Pioneer', desc: 'Completed your first skill evaluation and profile setup.', code: 'FIRST_ASSESSMENT', icon: Target, unlocked: true, xp: 150, date: 'Unlocked Sep 12' },
    { title: 'Code Maestro', desc: 'Passed all test cases on an isolated sandbox coding challenge.', code: 'CODING_MAESTRO', icon: Code2, unlocked: true, xp: 200, date: 'Unlocked Sep 14' },
    { title: 'Knowledge Architect', desc: 'Mapped out 5 competency nodes on your Knowledge Graph.', code: 'GRAPH_EXPLORER', icon: Network, unlocked: true, xp: 200, date: 'Unlocked Sep 16' },
    { title: 'Career Ready 70%', desc: 'Attained a 70%+ aggregate Career Readiness Index.', code: 'CAREER_READY_70', icon: Award, unlocked: false, xp: 300, date: 'Locked' },
    { title: 'Interview Master', desc: 'Scored 85%+ on AI Technical Mock Interview.', code: 'INTERVIEW_READY', icon: ShieldCheck, unlocked: false, xp: 250, date: 'Locked' }
  ];

  const earnedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050A19] border border-[#3B82F6]/30 text-[#22D3EE] text-xs font-semibold tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#22D3EE]" />
              VERIFIABLE MILESTONE REWARDS
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Competency Badges & XP Achievements
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Earn XP and unlock badges through real skill activity proof across quizzes, coding sandbox, and projects.
            </p>
          </div>
        </div>
      </div>

      {/* TOP STATS COUNTERS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[#11182B] border border-[#26314A] p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">TOTAL XP</div>
          <div className="text-2xl font-extrabold text-[#5B3DF5]">550 XP</div>
        </div>
        <div className="bg-[#11182B] border border-[#26314A] p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">ACTIVE STREAK</div>
          <div className="text-2xl font-extrabold text-amber-400 flex items-center gap-1">
            <Flame className="w-4 h-4 fill-amber-400/20 text-amber-400" /> 7d
          </div>
        </div>
        <div className="bg-[#11182B] border border-[#26314A] p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">EARNED BADGES</div>
          <div className="text-2xl font-extrabold text-[#22D3EE]">{earnedAchievements.length} Badges</div>
        </div>
        <div className="bg-[#11182B] border border-[#26314A] p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">QUIZZES</div>
          <div className="text-2xl font-extrabold text-white">1 Completed</div>
        </div>
        <div className="bg-[#11182B] border border-[#26314A] p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">PROJECTS</div>
          <div className="text-2xl font-extrabold text-[#00E6A7]">1 Scored</div>
        </div>
      </div>

      {/* SECTION 1: UNLOCKED / EARNED ACHIEVEMENTS */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#22D3EE] uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#22D3EE]" /> UNLOCKED ACHIEVEMENTS ({earnedAchievements.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {earnedAchievements.map((ach) => (
            <div
              key={ach.code}
              className="p-6 rounded-2xl bg-[#11182B] border border-[#5B3DF5] shadow-lg shadow-[#5B3DF5]/10 flex items-start gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#050A19] border border-[#5B3DF5] flex items-center justify-center text-[#22D3EE] shrink-0 shadow-md">
                <ach.icon className="w-6 h-6 text-[#22D3EE]" />
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-white">{ach.title}</span>
                  <span className="text-xs font-extrabold text-[#5B3DF5] px-2 py-0.5 rounded bg-[#050A19] border border-[#5B3DF5]/40">
                    +{ach.xp} XP
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{ach.desc}</p>
                <div className="flex items-center justify-between text-[10px] text-[#00E6A7] font-semibold pt-1">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> UNLOCKED</span>
                  <span className="text-[#64748B]">{ach.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: LOCKED ACHIEVEMENTS */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#64748B]" /> LOCKED ACHIEVEMENTS ({lockedAchievements.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lockedAchievements.map((ach) => (
            <div
              key={ach.code}
              className="p-6 rounded-2xl bg-[#050A19] border border-[#26314A] opacity-75 flex items-start gap-4 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#11182B] border border-[#26314A] flex items-center justify-center text-[#64748B] shrink-0">
                <ach.icon className="w-6 h-6" />
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-white">{ach.title}</span>
                  <span className="text-xs font-semibold text-[#64748B] px-2 py-0.5 rounded bg-[#11182B] border border-[#26314A]">
                    +{ach.xp} XP
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{ach.desc}</p>
                <div className="text-[10px] text-[#64748B] font-semibold pt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> LOCKED
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

