'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import PublicNavbar from '@/components/PublicNavbar';
import PublicFooter from '@/components/PublicFooter';
import { Sparkles, ArrowRight, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { safeFetch } from '@/lib/api-response';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams ? searchParams.get('token') || '' : '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      const res = await safeFetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 2500);
      } else {
        throw new Error(res.data?.error || res.data?.message || 'Password reset failed.');
      }
    } catch (err: any) {
      setError(err.message || 'Error updating password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[380px] bg-[#11182B] border border-[#26314A] rounded-2xl p-7 space-y-6 shadow-2xl">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-[#050A19] border border-[#3B82F6]/40 flex items-center justify-center text-[#22D3EE] mx-auto shadow-sm shadow-[#22D3EE]/20">
          <Sparkles className="w-5 h-5 text-[#22D3EE]" />
        </div>
        <h1 className="text-xl font-extrabold text-[#F8FAFC] tracking-tight">
          Create New Password
        </h1>
        <p className="text-xs text-[#94A3B8] font-normal">
          Enter your new account password below.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Password updated successfully! Redirecting to login...</span>
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
              New Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-[#64748B]" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full bg-[#050A19] border border-[#26314A] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#5B3DF5] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
              Confirm New Password
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
            {loading ? 'Updating Password...' : 'Save New Password'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      <div className="text-center text-xs text-[#94A3B8] pt-2 border-t border-[#26314A]">
        <Link href="/login" className="text-[#3B82F6] hover:underline font-semibold">
          Return to Sign In
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-[#F8FAFC] flex flex-col font-poppins antialiased">
      <PublicNavbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Suspense fallback={<div className="text-xs text-[#94A3B8]">Loading reset form...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </main>
      <PublicFooter />
    </div>
  );
}
