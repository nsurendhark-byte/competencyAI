'use client';

import Link from 'next/link';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { ArrowRight, GitBranch, Sparkles, Compass } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-poppins antialiased">
      <PublicNavbar />

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-16 sm:py-24 max-w-7xl mx-auto w-full space-y-12">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#05091A] border border-[#26314A] text-[11px] font-semibold tracking-wider text-[#94A3B8] shadow-sm shadow-[#5B3DF5]/10">
          <span className="text-[#22D3EE]">✦</span>
          <span>GENERATIVE AI &amp; KNOWLEDGE GRAPH POWERED</span>
        </div>

        {/* Main Hero Heading matching screenshot */}
        <div className="text-center max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-[#F8FAFC]">
            Automated Competency-
            <br />
            Based{' '}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#633BFF] to-[#8B5CF6] bg-clip-text text-transparent">
              Learning Journey
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#20D9C2] bg-clip-text text-transparent">
              Designer
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-normal">
            Eliminate career ambiguity. CompetencyAI analyzes your career goals, tests your existing skills, models prerequisite dependencies with a Knowledge Graph, and generates a personalized adaptive roadmap.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5B3DF5]/30 hover:shadow-[#5B3DF5]/50"
            >
              Build My Learning Journey <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/app/onboarding"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#11182B] border border-[#26314A] text-[#F8FAFC] font-semibold text-sm hover:bg-[#05091A] transition-all flex items-center justify-center gap-2"
            >
              Explore Interactive Demo
            </Link>
          </div>
        </div>

        {/* THREE FEATURE CARDS */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {/* Card 1 */}
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 flex flex-col space-y-4 hover:border-[#3B82F6]/50 transition-all shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#05091A] border border-[#26314A] flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-[#633BFF]" />
            </div>
            <h3 className="text-base font-bold text-[#F8FAFC]">
              Interactive Knowledge Graph
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Visualizes topic prerequisite chains, skill dependencies, and unlock paths so you never waste time studying advanced concepts before mastering foundations.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 flex flex-col space-y-4 hover:border-[#22D3EE]/50 transition-all shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#05091A] border border-[#26314A] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#22D3EE]" />
            </div>
            <h3 className="text-base font-bold text-[#F8FAFC]">
              AI Competency Gap Analysis
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Generative AI evaluates assessment scores to classify your competencies into Strong, Partial, Missing, and Priority focus areas.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#11182B] border border-[#26314A] rounded-2xl p-6 flex flex-col space-y-4 hover:border-[#20D9C2]/50 transition-all shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-[#05091A] border border-[#26314A] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#20D9C2]" />
            </div>
            <h3 className="text-base font-bold text-[#F8FAFC]">
              Adaptive Learning Roadmaps
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Dynamically updates your study plan, resources, dynamic quizzes, and mini projects based on your ongoing weekly performance.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
