'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft, CheckCircle2, Sparkles, Wrench, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/toast';

import { useAuth } from '@/context/AuthContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const { register, loginWithGoogle, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
    agreeTerms: false,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (fieldErrors[name]) {
      setFieldErrors((f) => ({ ...f, [name]: undefined }));
    }
  };

  const validate = () => {
    const errors = {};
    const name = formData.fullName.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phoneNumber.trim();

    if (!name) {
      errors.fullName = 'Full name is required.';
    } else if (name.length < 3) {
      errors.fullName = 'Full name must be at least 3 characters.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!EMAIL_RE.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!phone) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^[+]?[\d\s-]{7,15}$/.test(phone)) {
      errors.phoneNumber = 'Please enter a valid phone number.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    } else if (formData.password.length > 100) {
      errors.password = 'Password must be at most 100 characters.';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = 'Please agree to the Terms of Service & Privacy Policy.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) {
      toast.error('Please fix the highlighted fields.');
      return;
    }

    setIsLoading(true);
    try {
      const account = await register({
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phoneNumber.trim(),
        password: formData.password,
        role: formData.role,
      });
      toast.success(`Account created successfully for ${account.name}! Redirecting...`);
    } catch (err) {
      const msg = err?.message || 'Registration failed. Please try again.';
      setServerError(msg);
      toast.error(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row overflow-hidden font-sans">
      
      {/* LEFT SIDE: Brand Presentation & Minimal CSS Shapes Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-950 p-12 flex-col justify-between overflow-hidden">
        
        {/* Subtle CSS Shapes Background & Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Green Gradient Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#16A34A]/25 rounded-full filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#22C55E]/15 rounded-full filter blur-[100px]" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#166534]/30 rounded-full filter blur-[90px]" />

          {/* CSS Geometric Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `radial-gradient(#16A34A 1px, transparent 1px)`, 
              backgroundSize: '24px 24px' 
            }} 
          />

          {/* Floating Blurred Rings & CSS Shapes */}
          <div className="absolute top-20 right-20 w-48 h-48 border border-[#16A34A]/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-24 right-24 w-40 h-40 border border-dashed border-[#22C55E]/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute bottom-32 left-16 w-72 h-72 border border-white/5 rounded-full" />
        </div>

        {/* Header Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#16A34A] shadow-lg p-0.5 bg-slate-900 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.png"
                alt="Phidim Service Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight leading-none group-hover:text-[#22C55E] transition-colors">
                PHIDIM SERVICE
              </h1>
              <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1">
                Panchthar • Koshi • Nepal
              </p>
            </div>
          </Link>
        </div>

        {/* Center Content & Glass Card Showcase */}
        <div className="relative z-10 my-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#22C55E] text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Panchthar&apos;s Premier Service Hub</span>
          </div>

          <h2 className="text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Start Your Journey with Phidim Service Today.
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Create an account to quickly request technician visits, order network equipment, monitor order statuses, and enjoy priority support.
          </p>

          {/* Feature Highlights Grid */}
          <div className="space-y-3.5">
            {[
              "Quick 1-click booking for home & office services",
              "Exclusive offers & transparent billing",
              "Direct messaging with certified technicians"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#16A34A]/20 border border-[#16A34A]/40 flex items-center justify-center text-[#22C55E] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Floating Subtle Decorative Badge (CSS Shape Card) */}
          <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#166534] flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Verified Security Guarantee</p>
              <p className="text-[11px] text-gray-400">Your data is safe and encrypted</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Phidim Service. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: Centered Authentication Card */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-12 bg-white min-h-screen relative overflow-y-auto py-8">
        
        {/* Top Back Navigation Link */}
        <div className="w-full max-w-[430px] flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#16A34A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Mobile Logo View */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-[#16A34A] p-0.5 bg-slate-900">
              <img src="/logo.png" alt="Phidim Service Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <span className="text-xs font-black text-[#111827] tracking-tight">PHIDIM SERVICE</span>
          </div>
        </div>

        {/* Auth Card Container (Max Width 430px, Rounded, Soft Shadow) */}
        <div className="w-full max-w-[430px] bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-xl shadow-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300 my-auto">
          
          {/* Card Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-50 border border-green-100 text-[#16A34A] mb-3 shadow-xs">
              <div className="relative w-9 h-9 rounded-full overflow-hidden p-0.5">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
              Create Account
            </h2>
<p className="text-sm text-[#6B7280] mt-1">
              Join Phidim Service to access all features &amp; services
            </p>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-5 animate-in fade-in slide-in-from-top-1 duration-200"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Role Selection Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, role: 'USER' }))}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                formData.role === 'USER'
                  ? 'bg-white text-[#16A34A] shadow-xs border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, role: 'TECHNICIAN' }))}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                formData.role === 'TECHNICIAN'
                  ? 'bg-white text-[#16A34A] shadow-xs border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Technician</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className={`relative group ${fieldErrors.fullName ? 'ring-2 ring-rose-400/60 rounded-[14px]' : ''}`}>
                <User className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${fieldErrors.fullName ? 'text-rose-500' : 'text-[#6B7280] group-focus-within:text-[#16A34A]'}`} />
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  disabled={isLoading}
                  onChange={handleChange}
                  className="w-full h-[56px] pl-12 pr-4 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>
              {fieldErrors.fullName && (
                <p className="mt-1.5 text-[11px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.fullName}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className={`relative group ${fieldErrors.email ? 'ring-2 ring-rose-400/60 rounded-[14px]' : ''}`}>
                <Mail className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${fieldErrors.email ? 'text-rose-500' : 'text-[#6B7280] group-focus-within:text-[#16A34A]'}`} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  disabled={isLoading}
                  onChange={handleChange}
                  className="w-full h-[56px] pl-12 pr-4 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1.5 text-[11px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
                Phone Number
              </label>
              <div className={`relative group ${fieldErrors.phoneNumber ? 'ring-2 ring-rose-400/60 rounded-[14px]' : ''}`}>
                <Phone className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${fieldErrors.phoneNumber ? 'text-rose-500' : 'text-[#6B7280] group-focus-within:text-[#16A34A]'}`} />
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  placeholder="+977 9800000000"
                  value={formData.phoneNumber}
                  disabled={isLoading}
                  onChange={handleChange}
                  className="w-full h-[56px] pl-12 pr-4 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
              </div>
              {fieldErrors.phoneNumber && (
                <p className="mt-1.5 text-[11px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.phoneNumber}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className={`relative group ${fieldErrors.password ? 'ring-2 ring-rose-400/60 rounded-[14px]' : ''}`}>
                <Lock className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${fieldErrors.password ? 'text-rose-500' : 'text-[#6B7280] group-focus-within:text-[#16A34A]'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  disabled={isLoading}
                  onChange={handleChange}
                  className="w-full h-[56px] pl-12 pr-12 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] p-1 focus:outline-none transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1.5 text-[11px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1.5 uppercase tracking-wider">
                Confirm Password
              </label>
              <div className={`relative group ${fieldErrors.confirmPassword ? 'ring-2 ring-rose-400/60 rounded-[14px]' : ''}`}>
                <Lock className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${fieldErrors.confirmPassword ? 'text-rose-500' : 'text-[#6B7280] group-focus-within:text-[#16A34A]'}`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  disabled={isLoading}
                  onChange={handleChange}
                  className="w-full h-[56px] pl-12 pr-12 rounded-[14px] border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder-[#6B7280]/50 focus:border-[#16A34A] focus:ring-4 focus:ring-[#16A34A]/15 focus:outline-none transition-all duration-200 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] p-1 focus:outline-none transition-colors cursor-pointer"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1.5 text-[11px] font-bold text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-1">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-4 h-4 mt-0.5 rounded border-[#E5E7EB] text-[#16A34A] focus:ring-[#16A34A] accent-[#16A34A] cursor-pointer"
              />
              <label htmlFor="agreeTerms" className={`ml-2.5 text-xs font-medium leading-normal ${fieldErrors.agreeTerms ? 'text-rose-600' : 'text-[#6B7280]'} cursor-pointer select-none`}>
                I agree to the{' '}
                <a href="#" className="font-bold text-[#16A34A] hover:underline">
                  Terms of Service
                </a>{' '}
                &amp;{' '}
                <a href="#" className="font-bold text-[#16A34A] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {fieldErrors.agreeTerms && (
              <p className="mt-1 -mt-2 text-[11px] font-bold text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {fieldErrors.agreeTerms}
              </p>
            )}

            {/* Green Create Account Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[56px] rounded-[14px] bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#22C55E] hover:to-[#16A34A] text-white font-bold text-base shadow-md shadow-[#16A34A]/20 hover:shadow-lg hover:shadow-[#16A34A]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:pointer-events-none mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-3 items-center my-1">
            <div className="flex-grow border-t border-[#E5E7EB]"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">OR</span>
            <div className="flex-grow border-t border-[#E5E7EB]"></div>
          </div>

          {/* Social Logins */}
          <div className="space-y-2.5">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => loginWithGoogle(formData.role)}
              className="w-full h-[56px] rounded-[14px] border border-[#E5E7EB] bg-white hover:bg-gray-50/80 text-[#111827] text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* GitHub Button */}
            <button
              type="button"
              onClick={() => toast.info('GitHub registration integration')}
              className="w-full h-[56px] rounded-[14px] border border-[#E5E7EB] bg-white hover:bg-gray-50/80 text-[#111827] text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs cursor-pointer"
            >
              <svg className="w-5 h-5 fill-[#111827]" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Bottom Navigation Switch */}
          <div className="mt-6 text-center text-xs text-[#6B7280]">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-bold text-[#16A34A] hover:text-[#22C55E] transition-colors ml-1"
            >
              Login
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
