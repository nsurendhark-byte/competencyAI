import Link from 'next/link';
import { Cpu, Shield, Terminal, Globe } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-surface border-t border-surfaceBorder text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span className="font-mono text-lg font-bold text-white tracking-wider">COMPETENCYAI</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Career Intelligence OS — Autonomous competency assessment, personalized learning path optimization, and career readiness engine.
          </p>
          <div className="text-xs text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} CompetencyAI Inc. All rights reserved.
          </div>
        </div>

        <div>
          <h4 className="font-mono text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/features" className="hover:text-cyan-400 transition-colors">Skill Assessment</Link></li>
            <li><Link href="/how-it-works" className="hover:text-cyan-400 transition-colors">Knowledge Graph</Link></li>
            <li><Link href="/features" className="hover:text-cyan-400 transition-colors">Aura AI Mentor</Link></li>
            <li><Link href="/features" className="hover:text-cyan-400 transition-colors">Coding Arena</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
            <li><Link href="/our-team" className="hover:text-cyan-400 transition-colors">Engineering Team</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm font-semibold text-white uppercase tracking-wider mb-4">Security & Trust</h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Real Server Authorization</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Isolated Execution Sandbox</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>Enterprise Grade Security</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
