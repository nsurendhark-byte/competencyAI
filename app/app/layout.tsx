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
  Flame,
  Menu,
  X,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  HelpCircle
} from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function LearnerAppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    safeFetch('/api/auth/me')
      .then(res => {
        if (res.ok && res.data?.authenticated) {
          setUser(res.data.user);
          if (typeof window !== 'undefined') {
            localStorage.setItem('competency_user_session', JSON.stringify(res.data.user));
          }
        } else {
          const stored = typeof window !== 'undefined' ? localStorage.getItem('competency_user_session') : null;
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed && (parsed.email || parsed.id)) {
                setUser(parsed);
                return;
              }
            } catch (e) {}
          }
          router.push('/login');
        }
      })
      .catch(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('competency_user_session') : null;
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (parsed && (parsed.email || parsed.id)) {
              setUser(parsed);
              return;
            }
          } catch (e) {}
        }
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const navItems = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'My Learning Journey', href: '/app/learning', icon: GitBranch },
    { name: 'Knowledge Graph', href: '/app/knowledge-graph', icon: Network, badge: 'CORE' },
    { name: 'Resources', href: '/app/practice', icon: BookOpen },
    { name: 'AI Mentor', href: '/app/aura', icon: Sparkles, badge: 'AI' },
    { name: 'Quizzes', href: '/app/practice', icon: HelpCircle },
    { name: 'Projects', href: '/app/projects', icon: FolderGit2 },
    { name: 'Study Planner', href: '/app/study-planner', icon: Calendar },
    { name: 'Career Readiness', href: '/app/career-readiness', icon: Compass },
    { name: 'Industry Trends', href: '/app/career-twin', icon: TrendingUp },
    { name: 'Achievements', href: '/app/achievements', icon: Award },
    { name: 'Profile', href: '/app/profile', icon: User },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('competency_user_session');
      document.cookie = 'competency_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    await safeFetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const getPageTitle = (path: string) => {
    const found = navItems.find(item => item.href === path || (item.href !== '/app/dashboard' && path.startsWith(item.href)));
    return found ? found.name : 'Student Dashboard';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-xl bg-[#11182B] border border-[#26314A] flex items-center justify-center animate-pulse">
          <Sparkles className="w-5 h-5 text-[#22D3EE]" />
        </div>
        <div className="text-xs font-semibold text-[#94A3B8] tracking-wide">
          Loading CompetencyAI Platform...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-sans">
      {/* GLOBAL TOP HEADER */}
      <header className="h-14 bg-[#05091A] border-b border-[#26314A] flex items-center justify-between px-4 sm:px-6 shrink-0 z-30 sticky top-0">
        {/* Left Branding & Page Indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#94A3B8] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/app/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#050A19] border border-[#3B82F6]/40 flex items-center justify-center text-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">CompetencyAI</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#64748B]">
            <span className="text-[#26314A]">|</span>
            <span className="px-2 py-0.5 rounded bg-[#11182B] border border-[#26314A] text-[10px] font-semibold text-[#22D3EE] tracking-wider uppercase">
              Knowledge Graph
            </span>
            <span className="text-[#26314A]">|</span>
            <span className="text-[#94A3B8] font-medium">{getPageTitle(pathname)}</span>
          </div>
        </div>

        {/* Right User Telemetry & Status */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-[#11182B] border border-[#26314A] text-[#94A3B8] font-medium">
              Demo Scenario
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#11182B] border border-[#26314A] text-amber-400 font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              <span>7d</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#11182B] border border-[#26314A] text-[#22D3EE] font-semibold">
              550 XP
            </span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#26314A]">
            <div className="w-7 h-7 rounded-full bg-[#5B3DF5] text-white flex items-center justify-center font-bold text-xs shadow-md">
              {user?.fullName?.charAt(0) || 'D'}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-[#F8FAFC]">
              {user?.fullName || 'Demo Student'}
            </span>
          </div>
        </div>
      </header>

      {/* BODY WRAPPER: SIDEBAR + MAIN CONTENT */}
      <div className="flex-1 flex min-h-0 relative">
        {/* DESKTOP FIXED SIDEBAR */}
        <aside className="hidden md:flex flex-col w-60 bg-[#05091A] border-r border-[#26314A] shrink-0 h-[calc(100vh-3.5rem)] sticky top-14">
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#5B3DF5] text-white font-semibold shadow-lg shadow-[#5B3DF5]/30'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#11182B]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#11182B] text-[#22D3EE] border border-[#26314A]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* SIDEBAR BOTTOM CARD */}
          <div className="p-3 border-t border-[#26314A]">
            <div className="p-3 rounded-xl bg-[#11182B] border border-[#26314A] space-y-1.5">
              <div className="flex items-center gap-2">
                <Network className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span className="text-[11px] font-bold text-white tracking-wide">Knowledge Graph Engine</span>
              </div>
              <p className="text-[10px] text-[#94A3B8] leading-relaxed">
                Continuously adjusting prerequisites based on quiz performance and completed skills.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-950/30 transition-colors border border-transparent hover:border-rose-900/50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* MOBILE DRAWER NAVIGATION */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-[#020617]/95 p-4 overflow-y-auto space-y-3 pt-16">
            <div className="grid grid-cols-1 gap-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium ${
                      isActive ? 'bg-[#5B3DF5] text-white font-bold' : 'bg-[#11182B] text-[#94A3B8] border border-[#26314A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-[#22D3EE]" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#050A19] text-[#22D3EE] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0 bg-[#080B12] p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

