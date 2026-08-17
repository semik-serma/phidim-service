'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsLoading(false);
        return;
      }

      setSent(true);
      // In development a reset link is returned so the flow can be completed.
      setDevResetUrl(data.devResetUrl || null);
      if (data.devResetUrl) {
        setError('');
        toast.success('Reset link generated (development mode).');
      } else {
        toast.success('Reset instructions sent to your email.');
      }
      setIsLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xl shadow-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 border border-green-100 text-[#16A34A] mb-3 shadow-xs">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-[#111827] tracking-tight">Forgot Password?</h2>
          <p className="text-xs text-[#6B7280] mt-1">
            Enter the email address linked to your account and we&apos;ll send you a reset link.
          </p>
        </div>

        {sent ? (
          <div className="space-y-4 text-center animate-in fade-in duration-200">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 border border-green-200 text-[#16A34A]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm text-[#4B5563] font-medium">
              If the email <strong className="text-[#111827]">{email.trim().toLowerCase()}</strong> is registered, a reset
              link has been sent.
            </p>

            {devResetUrl && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-800 space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  Development mode: no mail server configured
                </p>
                <a
                  href={devResetUrl}
                  className="block break-all text-[#16A34A] font-bold hover:underline underline-offset-2"
                >
                  {devResetUrl}
                </a>
              </div>
            )}

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#16A34A] hover:text-[#22C55E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[52px] pl-12 pr-4 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 font-medium"
                />
              </div>
              {error && (
                <p className="mt-2 text-[11px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[52px] rounded-[14px] bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#22C55E] hover:to-[#16A34A] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                'Send Reset Link'
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
    </div>
  );
}