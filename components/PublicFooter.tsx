import React from 'react';
import Link from 'next/link';
import CompetencyLogo from '@/components/CompetencyLogo';

export default function PublicFooter() {
  return (
    <footer className="bg-[#020617] border-t border-[#26314A] py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-poppins text-xs text-[#64748B]">
        <div className="space-y-1">
          <CompetencyLogo size="sm" />
          <p className="text-[#94A3B8] font-semibold text-[11px] pt-1">
            CompetencyAI &copy; 2026 &bull; Adaptive Competency-Based Learning Journey Platform
          </p>
          <p className="text-[10px] text-[#64748B]">
            Knowledge Graph Prerequisite DAG Engine
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#22D3EE] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#22D3EE] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
