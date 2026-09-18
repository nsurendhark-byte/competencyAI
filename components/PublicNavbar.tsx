'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-md border-b border-[#26314A] h-14 flex items-center px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#050A19] border border-[#3B82F6]/40 flex items-center justify-center text-[#22D3EE] shadow-sm shadow-[#22D3EE]/20 group-hover:border-[#22D3EE] transition-all">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" />
          </div>
          <span className="font-poppins text-lg font-bold tracking-tight text-[#F8FAFC]">
            CompetencyAI
          </span>
        </Link>

        {/* Action Buttons matching screenshot */}
        <div className="flex items-center gap-5 font-poppins">
          <Link
            href="/login"
            className="text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-xs font-semibold bg-[#5B3DF5] hover:bg-[#633BFF] text-white px-4 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-lg shadow-[#5B3DF5]/25 hover:shadow-[#5B3DF5]/40"
          >
            Start Free Journey <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
