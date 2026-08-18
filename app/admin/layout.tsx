'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldAlert,
  LayoutDashboard,
  Users,
  Compass,
  BookOpen,
  HelpCircle,
  Code2,
  FolderGit2,
  Network,
  AlertTriangle,
  Sparkles,
  LineChart,
  LogOut,
  Cpu,
  FileCheck,
  History
} from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    safeFetch('/api/admin/me')
      .then(res => {
        if (res.ok && res.data?.authenticated) {
          setAdmin(res.data.admin);
        } else {
          router.push('/admin/login');
        }
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false));
  }, [pathname, isLoginPage, router]);

  const handleAdminLogout = async () => {
    await safeFetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (isLoginPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <ShieldAlert className="w-10 h-10 text-cyan-400 animate-spin" />
        <div className="font-mono text-xs text-cyan-400">VERIFYING SECURE ADMIN AUTHORIZATION...</div>
      </div>
    );
  }

  const adminNav = [
    { name: 'Operations Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Careers & Skills Engine', href: '/admin/careers', icon: Compass },
    { name: 'Curriculum & Lessons', href: '/admin/curriculum', icon: BookOpen },
    { name: '10-Level Question Bank', href: '/admin/assessments', icon: HelpCircle },
    { name: 'Coding & Projects Builder', href: '/admin/coding', icon: Code2 },
    { name: 'Knowledge Graph DAG', href: '/admin/knowledge-graph', icon: Network },
    { name: 'Issue Triage Desk', href: '/admin/issues', icon: AlertTriangle },
    { name: 'AI Content Generator', href: '/admin/ai', icon: Sparkles },
    { name: 'Analytics & Audit Logs', href: '/admin/analytics', icon: LineChart },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-xs font-bold text-white tracking-wider">COMPETENCY<span className="text-cyan-400">AI</span></div>
            <div className="font-mono text-[10px] text-cyan-400">ADMIN CONTROL CENTER</div>
          </div>
        </div>

        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span className="truncate">{admin?.email || 'ADMIN SESSION'}</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[9px]">SUPER</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button
            onClick={handleAdminLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>EXIT ADMIN SYSTEM</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
