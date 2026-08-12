'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Brain,
  Sparkles,
  Target,
  BarChart3
} from 'lucide-react';

export default function AssessmentPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 mins
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/assessment/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data.questions || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = (optionId: string) => {
    const qId = questions[currentIndex]?.id;
    if (qId) {
      setAnswers(prev => ({ ...prev, [qId]: optionId }));
    }
  };

  const toggleFlag = () => {
    const qId = questions[currentIndex]?.id;
    if (qId) {
      setFlagged(prev => ({ ...prev, [qId]: !prev[qId] }));
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      if (res.ok) {
        setResultData(data);
      } else {
        alert(data.error || 'Submission failed.');
        setSubmitting(false);
      }
    } catch (e) {
      alert('Network error submitting assessment.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center space-y-4">
        <Brain className="w-10 h-10 text-cyan-400 animate-pulse mx-auto" />
        <div className="font-mono text-xs text-cyan-400">LOADING 100-QUESTION COMPETENCY MATRIX...</div>
      </div>
    );
  }

  if (submitting && !resultData) {
    return (
      <div className="py-24 text-center space-y-6 max-w-md mx-auto">
        <Sparkles className="w-14 h-14 text-cyan-400 animate-spin mx-auto" />
        <h2 className="text-2xl font-bold text-white tracking-tight">Analyzing Competencies...</h2>
        <p className="text-xs text-slate-400 font-mono">Evaluating 10 level vectors & mapping skill gap prerequisites...</p>
      </div>
    );
  }

  if (resultData) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-6">
        <div className="bg-surface border border-surfaceBorder rounded-2xl p-8 space-y-6 glow-cyan">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-cyan-950/80 border border-cyan-500/50 rounded-2xl mx-auto flex items-center justify-center text-cyan-400 font-mono text-2xl font-bold">
              {resultData.overallScore}%
            </div>
            <h1 className="text-3xl font-extrabold text-white">Assessment Complete</h1>
            <p className="text-xs font-mono text-slate-400">
              Answered {resultData.totalCorrect} / {resultData.totalQuestions} questions correctly.
            </p>
          </div>

          <div className="border-t border-surfaceBorder pt-6 space-y-4">
            <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              10-LEVEL PROFICIENCY BREAKDOWN
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, idx) => {
                const lvl = idx + 1;
                const stat = resultData.levelStats?.[lvl] || { correct: 0, total: 10 };
                const pct = Math.round((stat.correct / Math.max(stat.total, 1)) * 100);

                return (
                  <div key={lvl} className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-1">
                    <div className="text-[10px] font-mono text-slate-400">LEVEL {lvl}</div>
                    <div className="text-lg font-bold text-cyan-400 font-mono">{pct}%</div>
                    <div className="text-[10px] text-slate-500 font-mono">{stat.correct}/{stat.total}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => router.push('/app/knowledge-graph')}
              className="flex-1 py-3 bg-cyan-500 text-slate-950 font-bold text-xs font-mono rounded-lg hover:brightness-110"
            >
              VIEW KNOWLEDGE GRAPH
            </button>
            <button
              onClick={() => router.push('/app/roadmap')}
              className="flex-1 py-3 bg-indigo-600 text-white font-bold text-xs font-mono rounded-lg hover:brightness-110"
            >
              GENERATE ROADMAP
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Telemetry Header Bar */}
      <div className="bg-surface border border-surfaceBorder p-4 rounded-xl flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold">QUESTION {currentIndex + 1} / {questions.length}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">LEVEL {currentQ?.levelNumber || 1} PROFICIENCY</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleFlag}
            className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
              flagged[currentQ?.id] ? 'bg-amber-950/80 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{flagged[currentQ?.id] ? 'FLAGGED' : 'FLAG'}</span>
          </button>

          <div className="flex items-center gap-1 text-cyan-400 font-bold bg-slate-900 border border-slate-800 px-3 py-1 rounded">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
        <div
          className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Main Question Workspace */}
      <div className="bg-surface border border-surfaceBorder rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-block px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] font-mono text-cyan-400">
            TYPE: {currentQ?.type} • DIFFICULTY: {currentQ?.difficulty}
          </div>
          <h2 className="text-lg font-bold text-white leading-relaxed">{currentQ?.title}</h2>
          <p className="text-slate-300 text-sm">{currentQ?.prompt}</p>
        </div>

        {currentQ?.codeSnippet && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto">
            <pre>{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3 pt-2">
          {currentQ?.options?.map((opt: any) => {
            const isSelected = answers[currentQ.id] === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-500 text-white font-semibold shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{opt.optionText}</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950' : 'border-slate-700'
                }`}>
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 rounded-lg disabled:opacity-40 flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> PREVIOUS
        </button>

        <div className="text-xs font-mono text-slate-400">
          ANSWERED {Object.keys(answers).length} OF {questions.length}
        </div>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-mono font-bold text-xs rounded-lg hover:brightness-110 shadow-lg shadow-emerald-500/20"
          >
            SUBMIT ASSESSMENT
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            className="px-4 py-2 bg-cyan-500 text-slate-950 text-xs font-mono font-bold rounded-lg hover:brightness-110 flex items-center gap-1"
          >
            NEXT <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
