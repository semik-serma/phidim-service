'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/toast';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('New password is required.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password.length > 100) {
      setError('Password must be at most 100 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to reset password.');
        setIsLoading(false);
        return;
      }
      setDone(true);
      toast.success('Password reset successfully. Please sign in.');
      setIsLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-500">
          <AlertCircle className="w-6 h-6" />
        </div>
        <p className="text-sm text-[#4B5563] font-medium">Invalid or missing reset token.</p>
        <Link
          href="/forgot-password"
          className="inline-block text-xs font-bold text-[#16A34A] hover:text-[#22C55E] transition-colors"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 border border-green-100 text-[#16A34A] mb-3 shadow-xs">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-[#111827] tracking-tight">Set a New Password</h2>
        <p className="text-xs text-[#6B7280] mt-1">Choose a strong password for your account.</p>
      </div>

      {done ? (
        <div className="space-y-4 text-center animate-in fade-in duration-200">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 border border-green-200 text-[#16A34A]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-sm text-[#4B5563] font-medium">Your password has been updated successfully.</p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full h-[48px] rounded-[14px] bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-bold text-sm transition-all hover:from-[#22C55E]"
          >
            Go to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">New Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Minimum 8 characters"
                value={password}
                disabled={isLoading}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[52px] pl-12 pr-12 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] p-1 transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">Confirm Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Re-enter new password"
                value={confirmPassword}
                disabled={isLoading}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-[52px] pl-12 pr-4 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 font-medium"
              />
            </div>
          </div>

          {error && (
            <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[52px] rounded-[14px] bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#22C55E] hover:to-[#16A34A] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Resetting...</span>
              </>
            ) : (
              'Reset Password'
            )}
          </button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#16A34A] hover:text-[#22C55E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xl shadow-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-[#16A34A] animate-spin" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}