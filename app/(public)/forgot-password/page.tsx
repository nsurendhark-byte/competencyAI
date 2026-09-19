'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { Sparkles, ArrowRight, AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await safeFetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setMessage('Password reset instructions have been sent to your email.');
      } else {
        throw new Error(res.data?.error || res.data?.message || 'Request failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Error processing request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-poppins antialiased">
      <PublicNavbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[380px] bg-[#11182B] border border-[#26314A] rounded-2xl p-7 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#3B82F6]/40 flex items-center justify-center text-[#22D3EE] mx-auto shadow-sm shadow-[#22D3EE]/20">
              <Sparkles className="w-5 h-5 text-[#22D3EE]" />
            </div>
            <h1 className="text-xl font-extrabold text-[#F8FAFC] tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs text-[#94A3B8] font-normal">
              Enter your email address to receive password reset instructions.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@university.edu"
                  className="w-full bg-[#050A19] border border-[#26314A] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5B3DF5] hover:bg-[#633BFF] text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#5B3DF5]/30 disabled:opacity-50 mt-2"
            >
              {loading ? 'Sending Instructions...' : 'Send Reset Link'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="text-center text-xs text-[#94A3B8] pt-2 border-t border-[#26314A]">
            Remembered your password?{' '}
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
