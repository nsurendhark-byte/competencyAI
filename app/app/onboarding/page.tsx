'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, User, Layers, CheckSquare, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: Profile Details State
  const [fullName, setFullName] = useState('Demo Student');
  const [institution, setInstitution] = useState('Institute of Technology');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState('3rd Year');
  const [semester, setSemester] = useState('Semester 6');
  const [weeklyHours, setWeeklyHours] = useState(15);

  // Step 2: Target Career State
  const [selectedCareer, setSelectedCareer] = useState('Full Stack Developer');

  // Step 3: Existing Skills State
  const [skillsRatings, setSkillsRatings] = useState<Record<string, string>>({
    'HTML5': 'Advanced',
    'CSS3 & Flexbox/Grid': 'Intermediate',
    'JavaScript ES6+': 'Beginner',
    'TypeScript': 'Beginner',
    'React.js': 'Intermediate',
    'Node.js Runtime': 'Beginner'
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('competency_user_session');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          if (user?.fullName) setFullName(user.fullName);
        } catch (e) {}
      }
    }
  }, []);

  const careersList = [
    {
      id: 'Full Stack Developer',
      title: 'Full Stack Developer',
      description: 'Build modern end-to-end web applications with client interfaces, REST/GraphQL APIs, databases, and automation.',
      tags: ['React', 'TypeScript', 'Node.js', 'MongoDB']
    },
    {
      id: 'Frontend Developer',
      title: 'Frontend Developer',
      description: 'Craft intuitive, highly responsive, pixel-perfect user interfaces with React, CSS frameworks, and state management.',
      tags: ['React 19', 'Next.js', 'Tailwind CSS', 'TypeScript']
    },
    {
      id: 'Backend Developer',
      title: 'Backend Developer',
      description: 'Architect robust server systems, database query engines, microservices, and high-security REST/gRPC APIs.',
      tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker']
    },
    {
      id: 'Data Scientist',
      title: 'Data Scientist',
      description: 'Extract insights from complex data using Python, statistics, predictive modeling, machine learning, and visualization.',
      tags: ['Python', 'PyTorch', 'Pandas', 'Scikit-Learn']
    },
    {
      id: 'Data Analyst',
      title: 'Data Analyst',
      description: 'Transform raw data into business intelligence through SQL queries, statistical charts, Excel, and PowerBI dashboards.',
      tags: ['SQL', 'Power BI', 'Python', 'Tableau']
    },
    {
      id: 'AI/ML Engineer',
      title: 'AI/ML Engineer',
      description: 'Develop neural networks, deep learning models, LLM pipelines, computer vision, and scalable AI infrastructure.',
      tags: ['PyTorch', 'Gemini API', 'LangChain', 'Vector DB']
    },
    {
      id: 'Cloud Engineer',
      title: 'Cloud Engineer',
      description: 'Design, deploy, and automate resilient cloud infrastructure on AWS/GCP using Infrastructure as Code (Terraform) and Kubernetes.',
      tags: ['AWS', 'Kubernetes', 'Terraform', 'Docker']
    },
    {
      id: 'Cybersecurity Engineer',
      title: 'Cybersecurity Engineer',
      description: 'Protect enterprise networks, conduct vulnerability audits, manage threat monitoring, and implement encryption security.',
      tags: ['Ethical Hacking', 'Zero Trust', 'SOC Operations', 'Cloud Security']
    },
    {
      id: 'Software Engineer',
      title: 'Software Engineer',
      description: 'Master core computer science fundamentals, data structures, algorithms, object-oriented design, and system architecture.',
      tags: ['Data Structures', 'Systems Design', 'Clean Architecture', 'TypeScript']
    },
    {
      id: 'DevOps Engineer',
      title: 'DevOps Engineer',
      description: 'Automate CI/CD pipelines, monitor microservices, enforce infrastructure policy, and optimize deployment reliability.',
      tags: ['GitHub Actions', 'Docker', 'Kubernetes', 'ArgoCD']
    }
  ];

  const skillOptions = [
    'HTML5',
    'CSS3 & Flexbox/Grid',
    'JavaScript ES6+',
    'TypeScript',
    'React.js',
    'Tailwind CSS',
    'Node.js Runtime',
    'Express.js',
    'SQL & Database Indexing',
    'Git & Version Control'
  ];

  const handleSkillRatingChange = (skill: string, rating: string) => {
    setSkillsRatings(prev => ({ ...prev, [skill]: rating }));
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    try {
      await safeFetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetCareerId: selectedCareer,
          weeklyHoursTarget: weeklyHours,
          academicInfo: { fullName, institution, department, academicYear, semester },
          skillsRatings
        })
      });
      router.push('/app/assessment');
    } catch (e) {
      router.push('/app/assessment');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] font-poppins py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* SHARED HEADER CARD - MATCHING SCREENSHOTS #3, #4, #5 */}
        <div className="bg-[#05091A] border border-[#26314A] rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11182B] border border-[#26314A] text-[11px] font-semibold text-[#94A3B8]">
            <span className="text-[#5B3DF5]">✦</span>
            <span>STUDENT ONBOARDING &bull; STEP {step} OF 3</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
            Setup Your Personal Learning Profile
          </h1>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            We use these details to calculate competency gaps, construct Knowledge Graph prerequisite paths, and customize study schedules.
          </p>

          {/* PROGRESS STEPS INDICATOR */}
          <div className="flex items-center justify-center gap-3 pt-2 text-xs font-semibold">
            {/* Step 1 */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${step === 1 ? 'bg-[#5B3DF5] text-white' : step > 1 ? 'bg-[#11182B] text-[#5B3DF5] border border-[#5B3DF5]' : 'bg-[#11182B] text-[#64748B]'}`}>
              <span className="w-5 h-5 rounded-full bg-[#05091A] flex items-center justify-center text-[11px]">1</span>
              <span>Profile Details</span>
            </div>

            <div className="w-8 h-[2px] bg-[#26314A]" />

            {/* Step 2 */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${step === 2 ? 'bg-[#5B3DF5] text-white' : step > 2 ? 'bg-[#11182B] text-[#5B3DF5] border border-[#5B3DF5]' : 'bg-[#11182B] text-[#64748B]'}`}>
              <span className="w-5 h-5 rounded-full bg-[#05091A] flex items-center justify-center text-[11px]">2</span>
              <span>Target Career</span>
            </div>

            <div className="w-8 h-[2px] bg-[#26314A]" />

            {/* Step 3 */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${step === 3 ? 'bg-[#5B3DF5] text-white' : 'bg-[#11182B] text-[#64748B]'}`}>
              <span className="w-5 h-5 rounded-full bg-[#05091A] flex items-center justify-center text-[11px]">3</span>
              <span>Existing Skills</span>
            </div>
          </div>
        </div>

        {/* STEP 1 CONTENT: PROFILE DETAILS (SCREENSHOT #4) */}
        {step === 1 && (
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC]">
              <User className="w-4 h-4 text-[#3B82F6]" />
              <span>Academic Information</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-[#94A3B8] font-semibold mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              <div>
                <label className="block text-[#94A3B8] font-semibold mb-1.5">College / Institution</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              <div>
                <label className="block text-[#94A3B8] font-semibold mb-1.5">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-4 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#5B3DF5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1.5">Academic Year</label>
                  <select
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-3 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#5B3DF5]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1.5">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-3 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#5B3DF5]"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                  </select>
                </div>
              </div>
            </div>

            {/* WEEKLY STUDY HOURS SLIDER */}
            <div className="space-y-3 pt-4 border-t border-[#26314A]">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-[#94A3B8]">Weekly Available Study Hours ({weeklyHours} hrs/week)</span>
              </div>
              <input
                type="range"
                min={5}
                max={40}
                step={5}
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full h-2 bg-[#050A19] border border-[#26314A] rounded-lg appearance-none cursor-pointer accent-[#5B3DF5]"
              />
              <div className="flex justify-between text-[11px] text-[#64748B]">
                <span>5 hrs (Casual)</span>
                <span>15 hrs (Recommended)</span>
                <span>40 hrs (Intensive Boot Camp)</span>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-[#5B3DF5]/30 transition-all"
              >
                Next: Select Career Goal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 CONTENT: TARGET CAREER (SCREENSHOTS #3 & #5) */}
        {step === 2 && (
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC]">
                <Layers className="w-4 h-4 text-[#3B82F6]" />
                <span>Select Your Target Career Path</span>
              </div>
              <span className="text-xs text-[#94A3B8]">
                Selected: <strong className="text-[#F8FAFC]">{selectedCareer}</strong>
              </span>
            </div>

            {/* SCROLLABLE CAREER GRID MATCHING SCREENSHOT */}
            <div className="max-h-[420px] overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {careersList.map((career) => {
                const isSelected = selectedCareer === career.id;
                return (
                  <button
                    key={career.id}
                    onClick={() => setSelectedCareer(career.id)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-[#5B3DF5]/10 border-[#5B3DF5] shadow-lg shadow-[#5B3DF5]/20'
                        : 'bg-[#05091A] border-[#26314A] hover:border-[#3B82F6]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-sm text-[#F8FAFC]">{career.title}</h4>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#5B3DF5] shrink-0" />}
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">{career.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {career.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-[#11182B] border border-[#26314A] text-[10px] text-[#22D3EE] font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#26314A]">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 bg-[#050A19] border border-[#26314A] hover:bg-[#11182B] text-xs font-semibold text-[#F8FAFC] rounded-xl flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-[#5B3DF5]/30 transition-all"
              >
                Next: Input Existing Skills <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 CONTENT: EXISTING SKILLS */}
        {step === 3 && (
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC] mb-1">
                <CheckSquare className="w-4 h-4 text-[#3B82F6]" />
                <span>What Skills Do You Already Know?</span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Select skills you have previously studied and rate your level. Skills you select will be used in competency-gap analysis.
              </p>
            </div>

            {/* SCROLLABLE SKILLS GRID */}
            <div className="max-h-[420px] overflow-y-auto pr-2 space-y-3">
              {skillOptions.map((skill) => {
                const currentRating = skillsRatings[skill] || 'Beginner';
                return (
                  <div key={skill} className="p-4 rounded-xl bg-[#05091A] border border-[#26314A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="font-semibold text-xs text-[#F8FAFC]">{skill}</span>
                    <div className="flex items-center gap-1 bg-[#11182B] p-1 rounded-xl border border-[#26314A]">
                      {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                        const isSelected = currentRating === lvl;
                        return (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleSkillRatingChange(skill, lvl)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                              isSelected
                                ? 'bg-[#5B3DF5] text-white shadow-md'
                                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#26314A]">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-[#050A19] border border-[#26314A] hover:bg-[#11182B] text-xs font-semibold text-[#F8FAFC] rounded-xl flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              <button
                onClick={handleFinalSubmit}
                disabled={submitting}
                className="px-6 py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-[#5B3DF5]/30 transition-all disabled:opacity-50"
              >
                {submitting ? 'Initializing Assessment...' : 'Continue to Learning Style Assessment'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
