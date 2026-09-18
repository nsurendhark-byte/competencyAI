'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  Brain,
  Sparkles,
  BarChart3,
  Target,
  ArrowRight,
  Code2
} from 'lucide-react';

import { safeFetch } from '@/lib/api-response';
import { questionsData } from '@/lib/questions-data';

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

  const getFallbackQuestions = () => {
    return questionsData.map(q => ({
      id: q.id,
      levelNumber: q.levelNumber,
      skillId: `skill-${q.subject.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      subject: q.subject,
      topic: q.topic,
      type: q.type,
      title: q.title,
      prompt: q.prompt,
      codeSnippet: q.codeSnippet,
      difficulty: q.difficulty,
      options: q.options.map((opt, idx) => ({
        id: `opt-${q.id}-${idx + 1}`,
        optionText: opt.text
      }))
    }));
  };

  useEffect(() => {
    safeFetch('/api/assessment/questions')
      .then(res => {
        if (res.ok && Array.isArray(res.data?.questions) && res.data.questions.length > 0) {
          setQuestions(res.data.questions);
        } else {
          setQuestions(getFallbackQuestions());
        }
      })
      .catch(() => {
        setQuestions(getFallbackQuestions());
      })
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

  const evaluateFallbackResults = () => {
    let correctCount = 0;
    const levelStats: Record<number, { total: number; correct: number }> = {};
    for (let l = 1; l <= 10; l++) levelStats[l] = { total: 0, correct: 0 };

    const subjectStats: Record<string, { total: number; correct: number }> = {
      'HTML': { total: 0, correct: 0 },
      'CSS': { total: 0, correct: 0 },
      'JavaScript': { total: 0, correct: 0 },
      'SQL': { total: 0, correct: 0 },
      'Java': { total: 0, correct: 0 },
      'Full Stack': { total: 0, correct: 0 }
    };

    questionsData.forEach(q => {
      const userOptId = answers[q.id];
      const correctOptIndex = q.options.findIndex(o => o.isCorrect);
      const correctOptId = `opt-${q.id}-${correctOptIndex + 1}`;
      const isCorrect = userOptId === correctOptId;

      const subj = q.subject || 'Full Stack';
      if (!subjectStats[subj]) subjectStats[subj] = { total: 0, correct: 0 };
      subjectStats[subj].total++;

      if (isCorrect) {
        correctCount++;
        if (levelStats[q.levelNumber]) levelStats[q.levelNumber].correct++;
        subjectStats[subj].correct++;
      }
      if (levelStats[q.levelNumber]) levelStats[q.levelNumber].total++;
    });

    const totalAnswered = Object.keys(answers).length || questions.length || 10;
    const overallScore = Math.round((correctCount / Math.max(totalAnswered, 1)) * 100);

    return {
      success: true,
      overallScore,
      levelStats,
      subjectStats,
      totalCorrect: correctCount,
      totalQuestions: totalAnswered
    };
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await safeFetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      if (res.ok && res.data?.overallScore !== undefined) {
        setResultData(res.data);
      } else {
        setResultData(evaluateFallbackResults());
      }
    } catch (e) {
      setResultData(evaluateFallbackResults());
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center space-y-4 font-sans">
        <div className="w-12 h-12 bg-[#11182B] border border-[#26314A] rounded-2xl mx-auto flex items-center justify-center text-[#22D3EE] animate-pulse">
          <Brain className="w-6 h-6" />
        </div>
        <div className="text-xs font-semibold text-[#94A3B8] tracking-wide">
          Loading Competency Evaluation Matrix...
        </div>
      </div>
    );
  }

  if (submitting && !resultData) {
    return (
      <div className="py-24 text-center space-y-6 max-w-md mx-auto font-sans">
        <div className="w-14 h-14 bg-[#11182B] border border-[#5B3DF5] rounded-2xl mx-auto flex items-center justify-center text-[#5B3DF5] animate-spin">
          <Sparkles className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Analyzing Competencies...</h2>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          Evaluating skill vectors & mapping prerequisite nodes in real-time...
        </p>
      </div>
    );
  }

  if (resultData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-4 font-sans">
        <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-8 space-y-6 shadow-xl">
          <div className="text-center space-y-3">
            <div className="w-24 h-24 bg-[#050A19] border-2 border-[#5B3DF5] rounded-2xl mx-auto flex items-center justify-center text-[#22D3EE] text-3xl font-extrabold shadow-lg shadow-[#5B3DF5]/30">
              {resultData.overallScore}%
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Assessment Completed</h1>
            <p className="text-xs text-[#94A3B8]">
              Answered {resultData.totalCorrect} of {resultData.totalQuestions} questions correctly.
            </p>
          </div>

          <div className="border-t border-[#26314A] pt-6 space-y-4">
            <h3 className="text-xs font-bold text-[#64748B] uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#22D3EE]" />
              SUBJECT COMPETENCY BREAKDOWN
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(resultData.subjectStats || {}).map(([subj, stat]: [string, any]) => {
                const pct = Math.round((stat.correct / Math.max(stat.total, 1)) * 100);
                return (
                  <div key={subj} className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl space-y-1">
                    <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{subj}</div>
                    <div className="text-xl font-extrabold text-[#00E6A7]">{pct}%</div>
                    <div className="text-[10px] text-[#94A3B8]">{stat.correct}/{stat.total} Correct</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => router.push('/app/knowledge-graph')}
              className="flex-1 py-3 bg-[#050A19] border border-[#26314A] hover:border-[#5B3DF5] text-white font-semibold text-xs rounded-xl transition-all"
            >
              Inspect Knowledge Graph
            </button>
            <button
              onClick={() => router.push('/app/learning')}
              className="flex-1 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center justify-center gap-2"
            >
              <span>View Updated Roadmap</span>
              <ArrowRight className="w-4 h-4" />
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

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      {/* HEADER CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-wider">
              COMPETENCY ASSESSMENT TEST
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Full Stack Developer Skill Verification
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleFlag}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                flagged[currentQ?.id]
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-400'
                  : 'bg-[#050A19] border-[#26314A] text-[#94A3B8] hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{flagged[currentQ?.id] ? 'Flagged' : 'Flag'}</span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#050A19] border border-[#26314A] text-white font-bold text-xs">
              <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="font-semibold text-white">Question {currentIndex + 1} of {questions.length} · Type: MCQ</span>
            <span className="font-semibold text-[#22D3EE]">{progressPercent}% Complete</span>
          </div>

          <div className="w-full bg-[#050A19] h-2 rounded-full overflow-hidden border border-[#26314A]">
            <div
              className="bg-[#5B3DF5] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* QUESTION CARD */}
      <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 bg-[#050A19] border border-[#3B82F6]/30 rounded-full text-[#22D3EE] text-[10px] font-bold uppercase tracking-wider">
            {currentQ?.subject || 'FULL STACK'} COMPETENCY
          </span>

          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ?.prompt || currentQ?.title}
          </h2>
        </div>

        {currentQ?.codeSnippet && (
          <div className="p-4 bg-[#050A19] border border-[#26314A] rounded-xl font-mono text-xs text-[#22D3EE] overflow-x-auto space-y-1">
            <div className="text-[10px] text-[#64748B] flex items-center gap-1 mb-1">
              <Code2 className="w-3 h-3 text-[#3B82F6]" /> CODE SNIPPET
            </div>
            <pre>{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* SELECTABLE ANSWER CARDS */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {currentQ?.options?.map((opt: any, idx: number) => {
            const isSelected = answers[currentQ.id] === opt.id;
            const letter = String.fromCharCode(65 + idx);
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#050A19] border-[#5B3DF5] text-white font-semibold shadow-lg shadow-[#5B3DF5]/20 ring-1 ring-[#5B3DF5]'
                    : 'bg-[#050A19] border-[#26314A] text-[#94A3B8] hover:border-[#3B82F6] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border ${
                    isSelected ? 'bg-[#5B3DF5] text-white border-[#633BFF]' : 'bg-[#11182B] text-[#64748B] border-[#26314A]'
                  }`}>
                    {letter}
                  </span>
                  <span>{opt.optionText}</span>
                </div>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-[#5B3DF5] bg-[#5B3DF5] text-white' : 'border-[#26314A]'
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          className="px-4 py-2.5 bg-[#11182B] border border-[#26314A] text-xs font-semibold text-[#94A3B8] hover:text-white rounded-xl disabled:opacity-40 flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className="text-xs text-[#64748B] font-semibold">
          Answered {Object.keys(answers).length} of {questions.length}
        </div>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all"
          >
            Submit Assessment
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            className="px-5 py-2.5 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl shadow-lg shadow-[#5B3DF5]/30 transition-all flex items-center gap-1.5"
          >
            <span>Next Question</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}


