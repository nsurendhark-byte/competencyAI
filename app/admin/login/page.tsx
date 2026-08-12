'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, ArrowRight, AlertCircle, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Admin authentication failed.');
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-2xl glow-cyan">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-950 border border-indigo-500/50 rounded-xl mx-auto flex items-center justify-center text-indigo-400 font-mono font-bold text-xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Control Center</h1>
          <p className="text-xs text-slate-400 font-mono">Secure Server Authorization Required</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-lg text-xs text-rose-300 flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-400 mb-1">ADMINISTRATOR EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adminssp.it@gmail.com"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">SECURE PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-slate-950 font-bold text-xs rounded-lg hover:brightness-110 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {loading ? 'VERIFYING CREDENTIALS...' : 'AUTHENTICATE ADMIN SESSION'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
