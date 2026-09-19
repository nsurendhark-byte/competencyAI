'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Plus, CheckCircle2, Trash2, Clock, Sparkles, Award, PlayCircle, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';

export default function StudyPlannerPage() {
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [preferredDays, setPreferredDays] = useState<string[]>(['Monday', 'Wednesday', 'Friday', 'Sunday']);
  const [preferredTime, setPreferredTime] = useState('Evening');
  const [selectedWeek, setSelectedWeek] = useState('Week 1');
  const [rescheduledAlert, setRescheduledAlert] = useState(false);

  const [sessions, setSessions] = useState([
    { id: 1, week: 'Week 1', day: 'Monday', time: 'Evening (6:00 PM)', topic: 'JavaScript Async Programming & Event Loop', duration: 60, skill: 'JavaScript', priority: 'HIGH', status: 'IN_PROGRESS' },
    { id: 2, week: 'Week 1', day: 'Wednesday', time: 'Evening (7:00 PM)', topic: 'React Custom Hooks & State Encapsulation', duration: 90, skill: 'React.js', priority: 'HIGH', status: 'QUEUED' },
    { id: 3, week: 'Week 1', day: 'Friday', time: 'Evening (6:00 PM)', topic: 'Async JS Sandbox & Debugging Practice', duration: 60, skill: 'JavaScript', priority: 'MEDIUM', status: 'QUEUED' },
    { id: 4, week: 'Week 1', day: 'Sunday', time: 'Evening (5:00 PM)', topic: 'Topic Assessment & Mastery Check', duration: 45, skill: 'Assessment', priority: 'HIGH', status: 'QUEUED' },

    { id: 5, week: 'Week 2', day: 'Monday', time: 'Evening (6:00 PM)', topic: 'Node.js Express Middleware Architecture', duration: 60, skill: 'Node.js', priority: 'HIGH', status: 'QUEUED' },
    { id: 6, week: 'Week 2', day: 'Wednesday', time: 'Evening (7:00 PM)', topic: 'JWT Session Auth & Password Hashing', duration: 90, skill: 'Security', priority: 'HIGH', status: 'QUEUED' },
    { id: 7, week: 'Week 2', day: 'Friday', time: 'Evening (6:00 PM)', topic: 'PostgreSQL Relational Schema & B-Tree Indexing', duration: 60, skill: 'SQL', priority: 'MEDIUM', status: 'QUEUED' },

    { id: 8, week: 'Week 3', day: 'Monday', time: 'Evening (6:00 PM)', topic: 'TypeScript Strict Types & Interface Design', duration: 60, skill: 'TypeScript', priority: 'HIGH', status: 'QUEUED' },
    { id: 9, week: 'Week 3', day: 'Wednesday', time: 'Evening (7:00 PM)', topic: 'Docker Containerization for Microservices', duration: 90, skill: 'DevOps', priority: 'HIGH', status: 'QUEUED' }
  ]);

  const toggleDay = (day: string) => {
    if (preferredDays.includes(day)) {
      if (preferredDays.length > 1) {
        setPreferredDays(preferredDays.filter(d => d !== day));
      }
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  const toggleSessionComplete = (id: number) => {
    setSessions(prev =>
      prev.map(s => {
        if (s.id === id) {
          const isComp = s.status === 'COMPLETED';
          return { ...s, status: isComp ? 'IN_PROGRESS' : 'COMPLETED' };
        }
        return s;
      })
    );
  };

  const handleRescheduleMissed = () => {
    setRescheduledAlert(true);
    setTimeout(() => setRescheduledAlert(false), 4000);
  };

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const filteredSessions = sessions.filter(s => s.week === selectedWeek);
  const completedCount = sessions.filter(s => s.status === 'COMPLETED').length;
  const totalCount = sessions.length;

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER BANNER */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#22D3EE] uppercase tracking-wider">
              ADAPTIVE SCHEDULING ENGINE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Adaptive Study Planner
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Automatically recalculates study timeline when sessions are completed or missed.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#050A19] px-4 py-3 rounded-xl border border-[#26314A] text-xs font-semibold text-[#22D3EE]">
            <Clock className="w-4 h-4 text-[#5B3DF5]" />
            <span>Target: {weeklyHours} Hours / Week</span>
          </div>
        </div>
      </div>

      {/* ADAPTIVE CONTROLS PANEL */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#26314A] pb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" /> Schedule Configuration
          </h2>
          <button
            onClick={handleRescheduleMissed}
            className="px-3 py-1.5 rounded-lg bg-[#050A19] border border-[#26314A] hover:border-[#22D3EE] text-xs font-semibold text-[#22D3EE] flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Auto-Reschedule Missed Tasks
          </button>
        </div>

        {rescheduledAlert && (
          <div className="p-3 rounded-xl bg-[#00E6A7]/10 border border-[#00E6A7] text-xs text-[#00E6A7] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Study planner recalculated! Remaining tasks dynamically redistributed across {preferredDays.length} study days.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Slider for Hours */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-[#94A3B8]">Weekly Target Hours</span>
              <span className="text-white font-bold">{weeklyHours} hrs/week</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={5}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(Number(e.target.value))}
              className="w-full h-2 bg-[#050A19] border border-[#26314A] rounded-lg appearance-none cursor-pointer accent-[#5B3DF5]"
            />
            <div className="flex justify-between text-[10px] text-[#64748B]">
              <span>5 hrs (Casual)</span>
              <span>15 hrs (Recommended)</span>
              <span>30 hrs (Boot Camp)</span>
            </div>
          </div>

          {/* Days Selection */}
          <div className="space-y-2">
            <span className="text-[#94A3B8] font-semibold block">Preferred Study Days</span>
            <div className="flex flex-wrap gap-1.5">
              {daysList.map((day) => {
                const isSel = preferredDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      isSel ? 'bg-[#5B3DF5] text-white' : 'bg-[#050A19] text-[#64748B] border border-[#26314A]'
                    }`}
                  >
                    {day.substring(0, 3)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Preference */}
          <div className="space-y-2">
            <span className="text-[#94A3B8] font-semibold block">Preferred Time Block</span>
            <div className="grid grid-cols-2 gap-2">
              {['Morning', 'Afternoon', 'Evening', 'Night'].map((timeSlot) => (
                <button
                  key={timeSlot}
                  onClick={() => setPreferredTime(timeSlot)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    preferredTime === timeSlot
                      ? 'bg-[#22D3EE] text-[#020617] border-[#22D3EE]'
                      : 'bg-[#050A19] border-[#26314A] text-[#94A3B8]'
                  }`}
                >
                  {timeSlot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WEEK SELECTION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
        {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((wk) => (
          <button
            key={wk}
            onClick={() => setSelectedWeek(wk)}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
              selectedWeek === wk
                ? 'bg-[#5B3DF5] text-white shadow-lg shadow-[#5B3DF5]/30'
                : 'bg-[#11182B] border border-[#26314A] text-[#94A3B8] hover:text-white'
            }`}
          >
            {wk}
          </button>
        ))}
      </div>

      {/* SCHEDULED SESSIONS LIST */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#26314A] pb-3">
          <h3 className="font-bold text-sm text-white">Scheduled Sessions — {selectedWeek}</h3>
          <span className="text-xs text-[#94A3B8]">
            Completed: <strong className="text-[#00E6A7]">{completedCount}</strong> / {totalCount} total
          </span>
        </div>

        <div className="space-y-3">
          {filteredSessions.map((sess) => {
            const isDone = sess.status === 'COMPLETED';
            return (
              <div
                key={sess.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  isDone
                    ? 'bg-[#050A19] border-[#00E6A7]/40 opacity-80'
                    : 'bg-[#050A19] border-[#26314A] hover:border-[#3B82F6]/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleSessionComplete(sess.id)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isDone ? 'bg-[#00E6A7] border-[#00E6A7] text-[#020617]' : 'border-[#64748B] hover:border-white'
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{sess.topic}</span>
                      <span className="px-2 py-0.5 rounded bg-[#11182B] border border-[#26314A] text-[10px] text-[#22D3EE] font-mono">
                        {sess.skill}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#64748B] flex items-center gap-3">
                      <span>Day: {sess.day}</span>
                      <span>&bull;</span>
                      <span>Time: {sess.time}</span>
                      <span>&bull;</span>
                      <span>Duration: {sess.duration} mins</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/app/learning"
                  className="px-4 py-2 bg-[#5B3DF5] hover:bg-[#633BFF] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 self-start sm:self-center transition-all shrink-0"
                >
                  <span>Start Session</span> <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
