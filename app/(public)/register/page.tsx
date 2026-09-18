'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { Sparkles, ArrowRight, AlertCircle, Lock, Mail, User } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await safeFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, confirmPassword })
      });

      if (res.ok) {
        // Auto login session setup
        const loginRes = await safeFetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: email, password })
        });

        const sessionUser = {
          id: res.data?.userId || 'usr-' + Date.now(),
          email: email.toLowerCase(),
          fullName: fullName,
          role: 'LEARNER'
        };

        if (typeof window !== 'undefined') {
          localStorage.setItem('competency_user_session', JSON.stringify(sessionUser));
          if (loginRes.ok && loginRes.data?.token) {
            document.cookie = `competency_session=${loginRes.data.token}; path=/; max-age=604800; SameSite=Lax`;
          } else {
            document.cookie = `competency_session=user-token; path=/; max-age=86400; SameSite=Lax`;
          }
        }

        window.location.href = '/app/onboarding';
        return;
      }

      throw new Error(res.data?.error || res.data?.message || 'Registration failed.');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-poppins antialiased">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[380px] bg-[#11182B] border border-[#26314A] rounded-2xl p-7 space-y-6 shadow-2xl">
          {/* Header Logo */}
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#3B82F6]/40 flex items-center justify-center text-[#22D3EE] mx-auto shadow-sm shadow-[#22D3EE]/20">
              <Sparkles className="w-5 h-5 text-[#22D3EE]" />
            </div>
            <h1 className="text-xl font-extrabold text-[#F8FAFC] tracking-tight">
              Create Your CompetencyAI Account
            </h1>
            <p className="text-xs text-[#94A3B8] font-normal">
              Start your Knowledge Graph and adaptive competency learning.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Demo Student"
                  className="w-full bg-[#050A19] border border-[#26314A] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo.student@college.edu"
                  className="w-full bg-[#050A19] border border-[#26314A] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full bg-[#050A19] border border-[#26314A] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full bg-[#050A19] border border-[#26314A] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#5B3DF5]/30 disabled:opacity-50 mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="text-center text-xs text-[#94A3B8] pt-2 border-t border-[#26314A]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#3B82F6] hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
