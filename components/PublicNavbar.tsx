'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Menu, X } from 'lucide-react';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Skills', href: '/skills' },
    { name: 'Features', href: '/features' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-md border-b border-[#26314A] h-14 flex items-center px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Brand Logo & Desktop Nav Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#94A3B8] hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#050A19] border border-[#3B82F6]/40 flex items-center justify-center text-[#22D3EE] shadow-sm shadow-[#22D3EE]/20 group-hover:border-[#22D3EE] transition-all">
              <Sparkles className="w-4 h-4 text-[#22D3EE]" />
            </div>
            <span className="font-poppins text-lg font-bold tracking-tight text-[#F8FAFC]">
              CompetencyAI
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium text-[#94A3B8]">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-[#F8FAFC] transition-colors">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 font-poppins">
          <Link
            href="/login"
            className="text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors px-2 py-1"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="text-xs font-semibold bg-[#5B3DF5] hover:bg-[#633BFF] text-white px-3.5 sm:px-4 py-2 rounded-full transition-all flex items-center gap-1.5 shadow-lg shadow-[#5B3DF5]/25 hover:shadow-[#5B3DF5]/40 whitespace-nowrap shrink-0"
          >
            <span>Get Started</span> <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bg-[#020617]/98 border-b border-[#26314A] p-5 shadow-2xl space-y-4">
          <nav className="flex flex-col space-y-3 font-poppins text-sm font-medium text-[#94A3B8]">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#11182B] hover:text-[#22D3EE] transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#11182B] hover:text-[#22D3EE] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 mt-2 bg-[#5B3DF5] text-white rounded-xl text-center font-bold text-xs"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
