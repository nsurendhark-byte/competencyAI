'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cpu, ArrowRight } from 'lucide-react';

export default function PublicNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Product', href: '/' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Features', href: '/features' },
    { name: 'Careers', href: '/careers' },
    { name: 'Our Team', href: '/our-team' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-surfaceBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-black font-bold shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="w-5 h-5 text-slate-950" />
          </div>
          <span className="font-mono text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
            COMPETENCY<span className="text-cyan-400">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                  isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2 transition-colors"
          >
            LOGIN
          </Link>
          <Link
            href="/register"
            className="text-sm font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 px-4 py-2 rounded-md hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/10"
          >
            GET STARTED
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
