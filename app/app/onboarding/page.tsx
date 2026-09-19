'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, User, Layers, CheckSquare, ArrowRight, ArrowLeft, CheckCircle2, Clock, BookOpen, Code2, Shield, Cpu, Activity, Award } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1: Profile Details State
  const [fullName, setFullName] = useState('Alex Morgan');
  const [institution, setInstitution] = useState('Institute of Technology');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState('3rd Year');
  const [semester, setSemester] = useState('Semester 6');
  const [weeklyHours, setWeeklyHours] = useState(15);
  const [learningStyle, setLearningStyle] = useState('Hands-on');
  const [cgpa, setCgpa] = useState('8.5');
  const [graduationYear, setGraduationYear] = useState('2027');

  // Step 2: Target Career State
  const [selectedCareer, setSelectedCareer] = useState('Full-Stack Developer');

  // Step 3: Skill Ratings State
  const [skillsRatings, setSkillsRatings] = useState<Record<string, string>>({
    'HTML5 & CSS Layouts': 'Advanced',
    'JavaScript ES6+': 'Intermediate',
    'TypeScript': 'Beginner',
    'React.js': 'Intermediate',
    'Node.js & Express': 'Beginner',
    'SQL Databases': 'Intermediate'
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
      id: 'Software Developer',
      title: 'Software Developer',
      description: 'Master core CS fundamentals, algorithms, object-oriented design, C++/Java/Python, and system design.',
      tags: ['Java', 'C++', 'Python', 'Algorithms', 'DBMS'],
      duration: '6 Months',
      difficulty: 'Intermediate'
    },
    {
      id: 'Full-Stack Developer',
      title: 'Full-Stack Developer',
      description: 'Build modern end-to-end web apps with client UIs, REST APIs, databases, authentication, and Docker.',
      tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      duration: '6 Months',
      difficulty: 'Advanced'
    },
    {
      id: 'Data Analyst',
      title: 'Data Analyst',
      description: 'Transform raw datasets into actionable insights using SQL, Python, Pandas, Tableau, and PowerBI dashboards.',
      tags: ['SQL', 'Python', 'Pandas', 'Power BI', 'Excel'],
      duration: '4 Months',
      difficulty: 'Beginner'
    },
    {
      id: 'AI/ML Engineer',
      title: 'AI/ML Engineer',
      description: 'Develop deep neural networks, ML algorithms, PyTorch pipelines, RAG systems, and LLM fine-tuning.',
      tags: ['PyTorch', 'TensorFlow', 'Python', 'LLMs', 'Vector DB'],
      duration: '8 Months',
      difficulty: 'Advanced'
    },
    {
      id: 'Cloud Engineer',
      title: 'Cloud Engineer',
      description: 'Design and deploy resilient cloud infrastructure on AWS/GCP using Terraform, Kubernetes, and Linux.',
      tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Linux'],
      duration: '5 Months',
      difficulty: 'Intermediate'
    },
    {
      id: 'Cybersecurity Engineer',
      title: 'Cybersecurity Engineer',
      description: 'Protect enterprise networks, audit OWASP vulnerabilities, conduct ethical hacking, and manage SOC triage.',
      tags: ['Networking', 'Ethical Hacking', 'SOC', 'Zero Trust'],
      duration: '6 Months',
      difficulty: 'Advanced'
    },
    {
      id: 'DevOps Engineer',
      title: 'DevOps Engineer',
      description: 'Automate CI/CD pipelines with GitHub Actions, manage Kubernetes clusters, and monitor microservices.',
      tags: ['GitHub Actions', 'Jenkins', 'Kubernetes', 'Docker', 'Prometheus'],
      duration: '6 Months',
      difficulty: 'Advanced'
    },
    {
      id: 'QA / Automation Tester',
      title: 'QA / Automation Tester',
      description: 'Implement automated test suites using Selenium, Cypress, Playwright, API testing, and CI/CD integration.',
      tags: ['Selenium', 'Cypress', 'Playwright', 'Postman', 'SQL'],
      duration: '4 Months',
      difficulty: 'Intermediate'
    },
    {
      id: 'UI/UX Developer',
      title: 'UI/UX Developer',
      description: 'Design intuitive interfaces in Figma, translate wireframes into React/Tailwind components, and run usability tests.',
      tags: ['Figma', 'React', 'Tailwind CSS', 'Accessibility', 'Wireframing'],
      duration: '4 Months',
      difficulty: 'Beginner'
    },
    {
      id: 'Business / IT Analyst',
      title: 'Business / IT Analyst',
      description: 'Bridge business strategy and IT with requirements engineering, process mapping, SQL data modeling, and BI charts.',
      tags: ['Requirements Analysis', 'Process Mapping', 'SQL', 'Power BI', 'Agile'],
      duration: '4 Months',
      difficulty: 'Beginner'
    }
  ];

  const careerSkillTaxonomies: Record<string, string[]> = {
    'Software Developer': ['Java', 'Python', 'C++', 'Data Structures', 'Algorithms', 'DBMS & SQL', 'Operating Systems', 'System Design', 'Git & GitHub'],
    'Full-Stack Developer': ['HTML5 & CSS Layouts', 'JavaScript ES6+', 'TypeScript', 'React.js', 'Next.js', 'Node.js & Express', 'SQL Databases', 'MongoDB', 'Docker & CI/CD'],
    'Data Analyst': ['Advanced Excel', 'SQL Queries', 'Python Data Cleaning', 'Pandas & NumPy', 'Data Visualization', 'Power BI', 'Tableau', 'Business Analytics'],
    'AI/ML Engineer': ['Python Programming', 'NumPy & Pandas', 'Statistics & Probability', 'Supervised Learning', 'Deep Learning & PyTorch', 'NLP & Embeddings', 'Vector Databases & RAG'],
    'Cloud Engineer': ['Linux Administration', 'Networking Fundamentals', 'AWS Core Services', 'Docker Containers', 'Kubernetes Orchestration', 'Terraform IaC', 'Cloud Security'],
    'Cybersecurity Engineer': ['Network Protocols & Security', 'Linux Command Line', 'OWASP Top 10', 'Vulnerability Assessment', 'Ethical Hacking & Pen Testing', 'SIEM & SOC Operations'],
    'DevOps Engineer': ['Linux & Shell Scripting', 'Git & Version Control', 'Docker Containerization', 'Kubernetes Clusters', 'CI/CD Pipelines (GitHub Actions)', 'Infrastructure as Code (Terraform)'],
    'QA / Automation Tester': ['Software Testing Principles', 'Manual Test Case Writing', 'SQL Querying', 'API Testing (Postman)', 'Selenium / Playwright Automation', 'CI/CD Integration'],
    'UI/UX Developer': ['Figma Wireframing', 'UI/UX Design Systems', 'HTML5 & Responsive CSS', 'JavaScript & DOM', 'React Component Architecture', 'Web Accessibility (WCAG)'],
    'Business / IT Analyst': ['Business Requirements Analysis', 'Process Mapping & Flowcharts', 'SQL Data Querying', 'Power BI Dashboards', 'Excel Financial Modeling', 'Agile & Scrum Methodologies']
  };

  const activeSkills = careerSkillTaxonomies[selectedCareer] || careerSkillTaxonomies['Full-Stack Developer'];

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
          learningStyle,
          cgpa,
          graduationYear,
          academicInfo: { fullName, institution, department, academicYear, semester },
          skillsRatings
        })
      });
      router.push('/app/assessment/diagnostic');
    } catch (e) {
      router.push('/app/assessment/diagnostic');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] font-poppins py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* SHARED ONBOARDING HEADER CARD */}
        <div className="bg-[#05091A] border border-[#26314A] rounded-2xl p-6 text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#11182B] border border-[#26314A] text-[11px] font-semibold text-[#94A3B8]">
            <span className="text-[#5B3DF5]">✦</span>
            <span>STUDENT ONBOARDING &bull; STEP {step} OF 3</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC]">
            Setup Your Personal Learning Profile
          </h1>

          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            We use these details to compute your skill gaps, construct your Knowledge Graph prerequisite DAG, and calculate adaptive study schedules.
          </p>

          {/* PROGRESS STEPS INDICATOR */}
          <div className="flex items-center justify-center gap-3 pt-2 text-xs font-semibold">
            {/* Step 1 */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full ${step === 1 ? 'bg-[#5B3DF5] text-white' : step > 1 ? 'bg-[#11182B] text-[#5B3DF5] border border-[#5B3DF5]' : 'bg-[#11182B] text-[#64748B]'}`}>
              <span className="w-5 h-5 rounded-full bg-[#05091A] flex items-center justify-center text-[11px]">1</span>
              <span>Profile Details</span>
            </div>

            <div className="w-8 h-[2px] bg-[#26314A]" />

            {/* Step 2 */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full ${step === 2 ? 'bg-[#5B3DF5] text-white' : step > 2 ? 'bg-[#11182B] text-[#5B3DF5] border border-[#5B3DF5]' : 'bg-[#11182B] text-[#64748B]'}`}>
              <span className="w-5 h-5 rounded-full bg-[#05091A] flex items-center justify-center text-[11px]">2</span>
              <span>Target Career</span>
            </div>

            <div className="w-8 h-[2px] bg-[#26314A]" />

            {/* Step 3 */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full ${step === 3 ? 'bg-[#5B3DF5] text-white' : 'bg-[#11182B] text-[#64748B]'}`}>
              <span className="w-5 h-5 rounded-full bg-[#05091A] flex items-center justify-center text-[11px]">3</span>
              <span>Existing Skills</span>
            </div>
          </div>
        </div>

        {/* STEP 1 CONTENT: PROFILE DETAILS */}
        {step === 1 && (
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC]">
                <User className="w-4 h-4 text-[#3B82F6]" />
                <span>Academic &amp; Learning Preferences</span>
              </div>
              <button
                onClick={() => router.push('/')}
                className="px-3 py-1.5 rounded-lg bg-[#050A19] border border-[#26314A] hover:bg-[#11182B] text-xs text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
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

              <div>
                <label className="block text-[#94A3B8] font-semibold mb-1.5">Preferred Learning Style</label>
                <select
                  value={learningStyle}
                  onChange={(e) => setLearningStyle(e.target.value)}
                  className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-3 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#5B3DF5]"
                >
                  <option value="Video">Video Lessons &amp; Screencasts</option>
                  <option value="Reading">Reading Documentation &amp; Articles</option>
                  <option value="Hands-on">Hands-on Coding &amp; Practice Sandbox</option>
                  <option value="Mixed">Mixed Multimodal (Recommended)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1.5">CGPA (Optional)</label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="e.g. 8.5"
                    className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-3 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#5B3DF5]"
                  />
                </div>

                <div>
                  <label className="block text-[#94A3B8] font-semibold mb-1.5">Graduation Year</label>
                  <input
                    type="text"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    placeholder="e.g. 2027"
                    className="w-full bg-[#050A19] border border-[#26314A] rounded-xl px-3 py-3 text-[#F8FAFC] focus:outline-none focus:border-[#5B3DF5]"
                  />
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
                <span>Next: Select Target Career</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 CONTENT: TARGET CAREER */}
        {step === 2 && (
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC]">
                <Layers className="w-4 h-4 text-[#3B82F6]" />
                <span>Select Your Primary Career Goal</span>
              </div>
              <button
                onClick={() => setStep(1)}
                className="px-3 py-1.5 rounded-lg bg-[#050A19] border border-[#26314A] hover:bg-[#11182B] text-xs text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Step 1
              </button>
            </div>

            {/* CAREER CARDS GRID */}
            <div className="max-h-[460px] overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-4 custom-scrollbar">
              {careersList.map((career) => {
                const isSelected = selectedCareer === career.title;
                return (
                  <button
                    key={career.id}
                    onClick={() => setSelectedCareer(career.title)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-[#5B3DF5]/15 border-[#5B3DF5] shadow-lg shadow-[#5B3DF5]/20'
                        : 'bg-[#05091A] border-[#26314A] hover:border-[#3B82F6]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-sm text-[#F8FAFC]">{career.title}</h4>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#5B3DF5] shrink-0" />}
                    </div>

                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">{career.description}</p>

                    <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-1 border-t border-[#26314A]">
                      <span>Est: {career.duration}</span>
                      <span className="px-2 py-0.5 rounded bg-[#11182B] text-[#22D3EE] font-mono text-[10px]">
                        {career.difficulty}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
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
                <span>Next: Rate Skill Familiarity</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 CONTENT: EXISTING SKILLS */}
        {step === 3 && (
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC] mb-1">
                  <CheckSquare className="w-4 h-4 text-[#3B82F6]" />
                  <span>Rate Your Initial Familiarity Level</span>
                </div>
                <p className="text-xs text-[#94A3B8]">
                  Target Career: <strong className="text-white">{selectedCareer}</strong>. Skills rated below will seed your baseline profile before the diagnostic evaluation.
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="px-3 py-1.5 rounded-lg bg-[#050A19] border border-[#26314A] hover:bg-[#11182B] text-xs text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Step 2
              </button>
            </div>

            {/* SKILLS GRID */}
            <div className="max-h-[420px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {activeSkills.map((skill) => {
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
                {submitting ? 'Submitting Profile...' : 'Launch Diagnostic Assessment'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
