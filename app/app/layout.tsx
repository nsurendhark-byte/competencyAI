'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Target,
  Network,
  GitBranch,
  BookOpen,
  CheckSquare,
  Code2,
  FolderGit2,
  LineChart,
  Award,
  Sparkles,
  Calendar,
  Compass,
  Video,
  User,
  Settings,
  LogOut,
  Cpu,
  Flame,
  Search,
  Menu,
  X,
  AlertTriangle
} from 'lucide-react';

export default function LearnerAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setUser(data.user);
        } else {
          router.push('/login');
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const navItems = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Target Career', href: '/app/career', icon: Compass },
    { name: '100-Q Assessment', href: '/app/assessment', icon: Target },
    { name: 'Knowledge Graph', href: '/app/knowledge-graph', icon: Network },
    { name: 'Competency Gap', href: '/app/competency-gap', icon: AlertTriangle },
    { name: 'Learning Roadmap', href: '/app/roadmap', icon: GitBranch },
    { name: 'Study Lessons', href: '/app/learning', icon: BookOpen },
    { name: 'Practice Sets', href: '/app/practice', icon: CheckSquare },
    { name: 'Coding Arena', href: '/app/coding', icon: Code2 },
    { name: 'Projects', href: '/app/projects', icon: FolderGit2 },
    { name: 'Progress Analytics', href: '/app/progress', icon: LineChart },
    { name: 'Career Readiness', href: '/app/career-readiness', icon: Target },
    { name: 'Career Twin', href: '/app/career-twin', icon: Compass },
    { name: 'AI Mock Interview', href: '/app/interview', icon: Video },
    { name: 'Study Planner', href: '/app/study-planner', icon: Calendar },
    { name: 'Achievements', href: '/app/achievements', icon: Award },
    { name: 'Aura AI Mentor', href: '/app/aura', icon: Sparkles },
    { name: 'Profile', href: '/app/profile', icon: User },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Cpu className="w-10 h-10 text-cyan-400 animate-spin" />
        <div className="font-mono text-xs text-cyan-400">INITIALIZING CAREER INTELLIGENCE SESSION...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-slate-100">
      {/* LAPTOP / DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-surfaceBorder shrink-0 h-screen sticky top-0">
        {/* Brand Header */}
        <div className="p-4 border-b border-surfaceBorder flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold text-white tracking-wider">COMPETENCY<span className="text-cyan-400">AI</span></div>
            <div className="font-mono text-[10px] text-slate-400">LEARNER OS V2.0</div>
          </div>
        </div>

        {/* User Telemetry Mini Badge */}
        {user && (
          <div className="px-4 py-3 bg-slate-900/80 border-b border-surfaceBorder flex items-center justify-between">
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">{user.fullName}</div>
              <div className="text-[10px] font-mono text-cyan-400">{user.email}</div>
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-mono text-xs font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
              <Flame className="w-3.5 h-3.5" />
              <span>7d</span>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Action */}
        <div className="p-3 border-t border-surfaceBorder">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>TERMINATE SESSION</span>
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-surfaceBorder sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Cpu className="w-6 h-6 text-cyan-400" />
          <span className="font-mono text-sm font-bold text-white">COMPETENCYAI</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE OVERLAY NAVIGATION */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/95 p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between border-b border-surfaceBorder pb-4">
            <span className="font-mono text-sm font-bold text-white">LEARNER MENU NAVIGATION</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 bg-surface border border-surfaceBorder rounded-lg text-xs text-slate-200 min-h-[44px]"
              >
                <item.icon className="w-4 h-4 text-cyan-400" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-8">
        {children}
      </main>

      {/* MOBILE TOUCH BOTTOM NAVIGATION (Requirement 41) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-surfaceBorder flex items-center justify-around z-40 px-2">
        <Link href="/app/dashboard" className="flex flex-col items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-cyan-400 min-w-[44px]">
          <LayoutDashboard className="w-5 h-5 text-cyan-400" />
          <span>HOME</span>
        </Link>
        <Link href="/app/learning" className="flex flex-col items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-cyan-400 min-w-[44px]">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>LEARN</span>
        </Link>
        <Link href="/app/practice" className="flex flex-col items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-cyan-400 min-w-[44px]">
          <CheckSquare className="w-5 h-5 text-emerald-400" />
          <span>PRACTICE</span>
        </Link>
        <Link href="/app/aura" className="flex flex-col items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-cyan-400 min-w-[44px]">
          <Sparkles className="w-5 h-5 text-violet-400" />
          <span>AURA</span>
        </Link>
        <Link href="/app/progress" className="flex flex-col items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-cyan-400 min-w-[44px]">
          <LineChart className="w-5 h-5 text-amber-400" />
          <span>PROGRESS</span>
        </Link>
      </div>
    </div>
  );
}
