'use client';

import { useState } from 'react';
import { Calendar, Plus, CheckCircle2, Trash2, Clock, Sparkles, Award, PlayCircle, ArrowRight, Check } from 'lucide-react';

export default function StudyPlannerPage() {
  const [availableHours, setAvailableHours] = useState(15);
  const [selectedWeek, setSelectedWeek] = useState('Week 1');
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState(60);

  const [sessions, setSessions] = useState([
    { id: 1, week: 'Week 1', topic: 'Async JS & Event Loop Microtasks', duration: 60, skill: 'JavaScript', priority: 'HIGH', status: 'IN_PROGRESS', date: 'Today, 6:00 PM' },
    { id: 2, week: 'Week 1', topic: 'React Hooks & State Architecture', duration: 90, skill: 'React.js', priority: 'HIGH', status: 'RECOMMENDED', date: 'Tomorrow, 7:00 PM' },
    { id: 3, week: 'Week 2', topic: 'Express Middleware & REST API Design', duration: 45, skill: 'Node.js', priority: 'MEDIUM', status: 'QUEUED', date: 'Upcoming' },
    { id: 4, week: 'Week 1', topic: 'HTML5 Semantic Layout & Accessibility', duration: 30, skill: 'HTML', priority: 'LOW', status: 'COMPLETED', date: 'Completed' }
  ]);

  const toggleStatus = (id: number) => {
    setSessions(sessions.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const deleteSession = (id: number) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const addSession = () => {
    if (!newTitle.trim()) return;
    setSessions([
      ...sessions,
      {
        id: Date.now(),
        week: selectedWeek,
        topic: newTitle,
        duration: newDuration,
        skill: 'General',
        priority: 'MEDIUM',
        status: 'QUEUED',
        date: 'Scheduled'
      }
    ]);
    setNewTitle('');
  };

  const filteredSessions = sessions.filter(s => s.week === selectedWeek);
  const completedCount = sessions.filter(s => s.status === 'COMPLETED').length;
  const inProgressCount = sessions.filter(s => s.status === 'IN_PROGRESS').length;

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">
              SMART SCHEDULING ENGINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Study Planner & Timeline
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Organize topics week-by-week to maintain your 7-day streak target.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#050A19] px-4 py-3 rounded-xl border border-[#26314A] text-xs font-semibold text-[#22D3EE]">
            <Clock className="w-4 h-4 text-[#5B3DF5]" />
            <span>Target: {availableHours} Hours / Week</span>
          </div>
        </div>
      </div>

      {/* TIMELINE STATS ROW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#11182B] border border-[#26314A] p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">WEEKLY TIMELINE</div>
          <div className="text-xl font-extrabold text-white">4 Weeks</div>
        </div>
        <div className="bg-[#11182B] border border-[#26314A] p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">IN PROGRESS</div>
          <div className="text-xl font-extrabold text-[#22D3EE]">{inProgressCount} Topics</div>
        </div>
        <div className="bg-[#11182B] border border-[#26314A] p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">COMPLETED</div>
          <div className="text-xl font-extrabold text-[#00E6A7]">{completedCount} Topics</div>
        </div>
        <div className="bg-[#11182B] border border-[#26314A] p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">AVAILABLE HOURS</div>
          <div className="text-xl font-extrabold text-[#5B3DF5]">{availableHours} hrs/wk</div>
        </div>
      </div>

      {/* WEEK TABS & ADD SESSION BAR */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#26314A] pb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((wk) => (
              <button
                key={wk}
                onClick={() => setSelectedWeek(wk)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedWeek === wk
                    ? 'bg-[#5B3DF5] text-white shadow-md'
                    : 'bg-[#050A19] text-[#94A3B8] border border-[#26314A] hover:text-white'
                }`}
              >
                {wk}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Add study topic to plan..."
              className="flex-1 md:w-64 bg-[#050A19] border border-[#26314A] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5]"
            />
            <button
              onClick={addSession}
              className="px-4 py-2 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" /> <span>Add</span>
            </button>
          </div>
        </div>

        {/* STUDY ITEMS LIST */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
            PLANNED TOPICS FOR {selectedWeek.toUpperCase()}
          </div>

          <div className="space-y-2.5">
            {filteredSessions.map((s) => {
              const isCompleted = s.status === 'COMPLETED';
              const isInProgress = s.status === 'IN_PROGRESS';

              return (
                <div
                  key={s.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                    isCompleted
                      ? 'bg-[#050A19]/50 border-[#26314A] opacity-75'
                      : isInProgress
                      ? 'bg-[#050A19] border-[#5B3DF5]'
                      : 'bg-[#050A19] border-[#26314A]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleStatus(s.id)} className="text-[#94A3B8] hover:text-white shrink-0">
                      <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-[#00E6A7]' : 'text-[#26314A]'}`} />
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${isCompleted ? 'line-through text-[#64748B]' : 'text-white'}`}>
                          {s.topic}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#11182B] border border-[#26314A] text-[10px] font-semibold text-[#22D3EE]">
                          {s.skill}
                        </span>
                      </div>
                      <div className="text-[10px] text-[#94A3B8] mt-0.5 flex items-center gap-2">
                        <span><Clock className="w-3 h-3 inline text-[#64748B]" /> {s.duration} mins</span>
                        <span>• {s.date}</span>
                        <span className={`font-bold ${s.priority === 'HIGH' ? 'text-amber-400' : 'text-[#94A3B8]'}`}>
                          Priority: {s.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-0 border-[#26314A] pt-2 sm:pt-0">
                    <button
                      onClick={() => toggleStatus(s.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isCompleted
                          ? 'bg-[#00E6A7]/10 text-[#00E6A7] border border-[#00E6A7]/30'
                          : 'bg-[#5B3DF5] text-white hover:bg-[#633BFF]'
                      }`}
                    >
                      {isCompleted ? 'Completed' : isInProgress ? 'Continue' : 'Start'}
                    </button>

                    <button
                      onClick={() => deleteSession(s.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

