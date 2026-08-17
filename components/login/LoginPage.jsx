'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  User,
  Wrench,
  HardHat,
  MapPin,
  Cable,
  CheckCircle2,
  LifeBuoy,
  MoreVertical,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/toast';
import { useAuth, DEMO_ACCOUNTS } from '@/context/AuthContext';
import { FloatingField } from '@/components/login/FloatingField';
import { BrandPanel } from '@/components/login/BrandPanel';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLE_TABS = [
  {
    key: 'USER',
    label: 'Customer Account',
    icon: User,
    active: 'bg-emerald-600 text-white shadow-md font-black',
    inactive: 'text-slate-500 hover:text-slate-800 font-semibold',
  },
  {
    key: 'TECHNICIAN',
    label: 'Technician Portal',
    icon: Wrench,
    active: 'bg-slate-900 text-emerald-400 shadow-md font-black',
    inactive: 'text-slate-500 hover:text-slate-800 font-semibold',
  },
];

const ADMIN_TAB = {
  key: 'ADMIN',
  label: 'Admin Portal',
  icon: ShieldCheck,
  active: 'bg-slate-900 text-rose-400 shadow-md font-black border border-rose-500/30',
  inactive: 'text-slate-500 hover:text-slate-800 font-semibold',
};

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
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
  );
}

export default function LoginPage() {
  const { user, isAuthenticated, login, register, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [role, setRole] = useState('USER'); // 'USER' | 'TECHNICIAN' | 'ADMIN'
  const [techMode, setTechMode] = useState('LOGIN'); // 'LOGIN' | 'REGISTER'
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  // If already authenticated, redirect immediately to their dashboard
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const target =
        user.role === 'ADMIN'
          ? '/admin/dashboard'
          : user.role === 'TECHNICIAN'
          ? '/technician/dashboard'
          : '/user/dashboard';
      if (typeof window !== 'undefined') {
        window.location.href = target;
      }
    }
  }, [isAuthenticated, user]);

  // Standard Customer fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Admin fields
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Technician fields
  const [techIdOrPhone, setTechIdOrPhone] = useState('');
  const [techPassword, setTechPassword] = useState('');
  const [techFullName, setTechFullName] = useState('');
  const [techWard, setTechWard] = useState('Phidim Ward 1 (Main Bazar)');
  const [techSpecialty, setTechSpecialty] = useState('LAN Networking & Fiber Splicing');

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic role tabs (shows ADMIN tab only when unlocked/selected)
  const tabsToRender = useMemo(() => {
    if (role === 'ADMIN') {
      return [...ROLE_TABS, ADMIN_TAB];
    }
    return ROLE_TABS;
  }, [role]);

  // Read initial role tab from URL params (?role=TECHNICIAN or ?role=ADMIN) & surface OAuth errors
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    const queryRole = params.get('role') || params.get('tab') || params.get('type');
    const isAdmin = params.get('admin') === 'true' || params.get('callbackUrl')?.includes('/admin');

    if (isAdmin || (queryRole && queryRole.toUpperCase() === 'ADMIN')) {
      setRole('ADMIN');
      setAdminEmail('');
      setAdminPassword('');
    } else if (queryRole && queryRole.toUpperCase() === 'TECHNICIAN') {
      setRole('TECHNICIAN');
    }

    const oauthError = params.get('error');
    if (!oauthError) return;
    const messages = {
      OAuthAccessDenied: 'You cancelled Google sign-in. Please try again.',
      NoCodeProvided: 'Google did not return an authorization code. Please try again.',
      TokenExchangeFailed: 'Google sign-in failed during token exchange. Please try again.',
      ProfileFetchFailed: 'Google sign-in could not load your profile. Please try again.',
      SignupFailed: 'Could not create your account. Please try again.',
      CallbackException: 'Google sign-in hit an unexpected error. Please try again.',
      InvalidOAuthState: 'Google sign-in verification failed. Please try again.',
    };
    setServerError(messages[oauthError] || 'Google sign-in failed. Please try again.');
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  const validateUserForm = () => {
    const errors = {};
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      errors.email = 'Email / phone is required.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateTechForm = () => {
    const errors = {};
    if (!techIdOrPhone.trim()) {
      errors.techIdOrPhone = 'Technician ID or phone is required.';
    }
    if (!techPassword) {
      errors.techPassword = 'Password is required.';
    } else if (techPassword.length < 6) {
      errors.techPassword = 'Password must be at least 6 characters.';
    }
    if (techMode === 'REGISTER' && !techFullName.trim()) {
      errors.techFullName = 'Full name is required for registration.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateAdminForm = () => {
    const errors = {};
    const trimmed = adminEmail.trim().toLowerCase();
    if (!trimmed) {
      errors.adminEmail = 'Admin email or username is required.';
    }
    if (!adminPassword) {
      errors.adminPassword = 'Password is required.';
    } else if (adminPassword.length < 6) {
      errors.adminPassword = 'Password must be at least 6 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validateUserForm()) return;
    setIsSubmitting(true);
    try {
      const account = await login({
        emailOrPhone: email.trim().toLowerCase(),
        password,
        rememberMe,
        role: 'USER',
      });
      
      const targetDashboard =
        account?.role === 'ADMIN'
          ? '/admin/dashboard'
          : account?.role === 'TECHNICIAN'
          ? '/technician/dashboard'
          : '/user/dashboard';

      if (typeof window !== 'undefined') {
        window.location.href = targetDashboard;
      }
    } catch (err) {
      const msg = err?.message || 'Customer login failed. Please check your credentials.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTechSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validateTechForm()) return;
    setIsSubmitting(true);
    try {
      const idOrPhone = techIdOrPhone.trim();
      let account;

      if (techMode === 'LOGIN') {
        account = await login({
          emailOrPhone: idOrPhone,
          password: techPassword,
          rememberMe,
          role: 'TECHNICIAN',
        });
      } else {
        const cleanEmail = idOrPhone.includes('@')
          ? idOrPhone
          : `${idOrPhone.toLowerCase().replace(/[^a-z0-9]/g, '')}@phidim.np`;
        account = await register({
          name: techFullName || 'Field Technician',
          email: cleanEmail,
          phone: idOrPhone,
          password: techPassword,
          role: 'TECHNICIAN',
        });
      }

      toast.success(`Welcome Technician ${account.name}! Redirecting to Technician Dashboard...`);
      if (typeof window !== 'undefined') {
        window.location.href = '/technician/dashboard';
      }
    } catch (err) {
      const msg = err?.message || 'Technician authentication failed. Please check your details.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validateAdminForm()) return;
    setIsSubmitting(true);
    try {
      const account = await login({
        emailOrPhone: adminEmail.trim().toLowerCase(),
        password: adminPassword,
        rememberMe,
        role: 'ADMIN',
      });
      toast.success(`Welcome System Admin ${account.name}! Redirecting to Admin Dashboard...`);
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/dashboard';
      }
    } catch (err) {
      const msg = err?.message || 'Admin authentication failed. Please check your credentials.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (selectedRole) => {
    const roleToUse = selectedRole;
    setRole(roleToUse);
    const demo = DEMO_ACCOUNTS[roleToUse] || DEMO_ACCOUNTS.USER;
    setServerError('');
    setIsSubmitting(true);
    try {
      const account = await login({ emailOrPhone: demo.email, password: 'password123', rememberMe, role: roleToUse });
      const targetDashboard =
        roleToUse === 'ADMIN'
          ? '/admin/dashboard'
          : roleToUse === 'TECHNICIAN'
          ? '/technician/dashboard'
          : '/user/dashboard';
      toast.success(`Signed in as ${account.name}. Redirecting to ${targetDashboard}...`);
      if (typeof window !== 'undefined') {
        window.location.href = targetDashboard;
      }
    } catch (err) {
      const msg = err?.message || 'Demo login error';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-[#f4f8f6]">
      {/* LEFT: Brand showcase (desktop only) */}
      <BrandPanel isLoading={isSubmitting} onDemoLogin={handleDemoLogin} />

      {/* RIGHT: Centered authentication card */}
      <main className="w-full lg:flex-1 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-10 bg-[radial-gradient(circle_at_100%_0%,rgba(34,197,94,0.12),transparent_30%),linear-gradient(135deg,#ffffff_0%,#f7fbf8_55%,#effaf4_100%)] relative overflow-hidden">
        {/* Ambient light background */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#22C55E]/10 blur-[120px]" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-[#14B8A6]/10 blur-[110px]" />
        </div>

        {/* Top navigation */}
        <div className="relative w-full max-w-[480px] flex items-center justify-between mb-6 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#16A34A] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/40 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Main Website</span>
          </Link>

          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#16A34A] p-0.5 bg-slate-900">
              <img
                src="/logo.png"
                alt="Phidim Service Logo"
                className="w-full h-full object-contain rounded-full"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-black text-[#111827] tracking-tight">PHIDIM SERVICE</span>
          </div>
        </div>

        {/* Main Auth Card */}
        <div className="relative w-full max-w-[480px] bg-white/90 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border border-slate-200/70 shadow-[0_24px_60px_rgba(6,78,59,0.12)] animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          
          {/* Top Right 3-Dot Hidden Options Menu */}
          <div className="absolute top-5 right-5 z-20">
            <button
              type="button"
              onClick={() => setShowAdminMenu((v) => !v)}
              className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              title="More Options"
              aria-label="More Options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showAdminMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowAdminMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">System Options</span>
                    <button
                      type="button"
                      onClick={() => setShowAdminMenu(false)}
                      className="text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-slate-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRole('ADMIN');
                      setShowAdminMenu(false);
                      setAdminEmail('');
                      setAdminPassword('');
                      setServerError('');
                      setFieldErrors({});
                      toast.success('Admin portal sign-in mode activated');
                    }}
                    className="w-full mt-1 text-left px-3 py-2.5 rounded-xl hover:bg-slate-800/90 flex items-center gap-3 transition-colors cursor-pointer group"
                  >
                    <div className="p-2 rounded-xl bg-rose-500/15 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-black text-white group-hover:text-rose-400 transition-colors flex items-center justify-between">
                        <span>Admin Login</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold uppercase tracking-wider">Hidden</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                        Access system dashboard &amp; control panel
                      </div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Card Header */}
          <div className="text-center space-y-2.5 pr-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#16A34A]/10 to-[#22C55E]/10 border border-[#16A34A]/20 shadow-xs mx-auto">
              {role === 'USER' ? (
                <User className="w-7 h-7 text-emerald-600" />
              ) : role === 'TECHNICIAN' ? (
                <HardHat className="w-7 h-7 text-slate-900" />
              ) : (
                <ShieldCheck className="w-7 h-7 text-rose-600" />
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
              {role === 'USER'
                ? 'Customer Account Sign In'
                : role === 'TECHNICIAN'
                ? 'Field Technician Portal'
                : 'System Administrator Access'}
            </h2>
            <p className="text-xs text-[#6B7280] font-medium max-w-sm mx-auto">
              {role === 'USER'
                ? 'Sign in to request home services, manage orders & track technicians in Panchthar.'
                : role === 'TECHNICIAN'
                ? 'Fill out your technician identity & assigned ward details to launch your Technician Command Interface.'
                : 'Authenticate with master admin credentials to manage Phidim Service operations & users.'}
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div
            className={`grid ${tabsToRender.length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-1.5 p-1.5 rounded-2xl bg-slate-100 text-xs font-bold border border-slate-200`}
            role="tablist"
            aria-label="Account type"
          >
            {tabsToRender.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={role === tab.key}
                onClick={() => {
                  setRole(tab.key);
                  setServerError('');
                  setFieldErrors({});
                }}
                className={`py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  role === tab.key ? tab.active : tab.inactive
                }`}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-in fade-in slide-in-from-top-1 duration-200"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{serverError}</span>
            </div>
          )}

          {/* ================= FORM 1: CUSTOMER (USER) ================= */}
          {role === 'USER' && (
            <form onSubmit={handleUserSubmit} className="space-y-5" noValidate>
              <FloatingField
                id="customer-email"
                label="Mobile Phone or Email Address"
                name="email"
                icon={Mail}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((f) => ({ ...f, email: undefined }));
                }}
                error={fieldErrors.email}
                disabled={isSubmitting}
                autoComplete="username"
              />

              <FloatingField
                id="customer-password"
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((f) => ({ ...f, password: undefined }));
                }}
                error={fieldErrors.password}
                disabled={isSubmitting}
                autoComplete="current-password"
                right={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    disabled={isSubmitting}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 accent-[#16A34A]"
                  />
                  <span className="text-xs text-slate-600 font-medium">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-xs font-bold text-[#16A34A] hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[54px] rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing into Customer Portal...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>LOG IN TO CUSTOMER ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            </form>
          )}

          {/* ================= FORM 2: FIELD TECHNICIAN ================= */}
          {role === 'TECHNICIAN' && (
            <form onSubmit={handleTechSubmit} className="space-y-4" noValidate>
              {/* Tech Login / Register Mode Switch */}
              <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 pl-1">
                  <HardHat className="w-4 h-4 text-emerald-600" />
                  <span>{techMode === 'LOGIN' ? 'Technician Sign In' : 'Register Field Installer'}</span>
                </span>
                <div className="flex items-center gap-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setTechMode('LOGIN')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      techMode === 'LOGIN' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tech Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setTechMode('REGISTER')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      techMode === 'REGISTER' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Tech Register
                  </button>
                </div>
              </div>

              {/* Technician Register Fields */}
              {techMode === 'REGISTER' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Technician Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Rai"
                    value={techFullName}
                    onChange={(e) => setTechFullName(e.target.value)}
                    className="w-full px-4 py-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold"
                  />
                  {fieldErrors.techFullName && <p className="text-[11px] text-rose-600 font-bold mt-1">{fieldErrors.techFullName}</p>}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Technician ID / Mobile Phone Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TECH-402 or 9842109842"
                  value={techIdOrPhone}
                  onChange={(e) => {
                    setTechIdOrPhone(e.target.value);
                    if (fieldErrors.techIdOrPhone) setFieldErrors((f) => ({ ...f, techIdOrPhone: undefined }));
                  }}
                  className="w-full px-4 py-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold"
                />
                {fieldErrors.techIdOrPhone && <p className="text-[11px] text-rose-600 font-bold mt-1">{fieldErrors.techIdOrPhone}</p>}
              </div>

              {techMode === 'REGISTER' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Service Area Ward</label>
                    <select
                      value={techWard}
                      onChange={(e) => setTechWard(e.target.value)}
                      className="w-full px-4 py-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold bg-white"
                    >
                      <option value="Phidim Ward 1 (Main Bazar)">Phidim Ward 1 (Main Bazar)</option>
                      <option value="Phidim Ward 2 (Buspark Area)">Phidim Ward 2 (Buspark Area)</option>
                      <option value="Phidim Ward 3 (Bharapa Area)">Phidim Ward 3 (Bharapa Area)</option>
                      <option value="Phidim Ward 4 (Chokmagu Area)">Phidim Ward 4 (Chokmagu Area)</option>
                      <option value="Panchthar Rural District Coverage">Panchthar Rural District Coverage</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Technical Specialization</label>
                    <select
                      value={techSpecialty}
                      onChange={(e) => setTechSpecialty(e.target.value)}
                      className="w-full px-4 py-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold bg-white"
                    >
                      <option value="LAN Networking & Fiber Splicing">LAN Networking & Fiber Splicing</option>
                      <option value="CCTV Security Camera Setup">CCTV Security Camera Setup</option>
                      <option value="DishHome DTH Technician">DishHome DTH Technician</option>
                      <option value="Electrical & Smart Home Wiring">Electrical & Smart Home Wiring</option>
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={techPassword}
                  onChange={(e) => {
                    setTechPassword(e.target.value);
                    if (fieldErrors.techPassword) setFieldErrors((f) => ({ ...f, techPassword: undefined }));
                  }}
                  className="w-full px-4 py-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 font-semibold"
                />
                {fieldErrors.techPassword && <p className="text-[11px] text-rose-600 font-bold mt-1">{fieldErrors.techPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[54px] rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Connecting Technician Interface...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-emerald-400" />
                    <span>{techMode === 'LOGIN' ? 'CONTINUE TO TECHNICIAN DASHBOARD' : 'REGISTER NEW TECHNICIAN'}</span>
                  </span>
                )}
              </button>
            </form>
          )}

          {/* ================= FORM 3: SYSTEM ADMIN ================= */}
          {role === 'ADMIN' && (
            <form onSubmit={handleAdminSubmit} className="space-y-5 animate-in fade-in duration-300" noValidate>
              <div className="bg-slate-950 text-white p-3.5 rounded-2xl border border-rose-500/30 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-white block">System Admin Security Mode</span>
                    <span className="text-[10px] text-slate-400 font-medium block">Authorized personnel only</span>
                  </div>
                </div>
              </div>

              <FloatingField
                id="admin-email"
                label="Admin Email or Username"
                name="adminEmail"
                icon={Mail}
                value={adminEmail}
                onChange={(e) => {
                  setAdminEmail(e.target.value);
                  if (fieldErrors.adminEmail) setFieldErrors((f) => ({ ...f, adminEmail: undefined }));
                }}
                error={fieldErrors.adminEmail}
                disabled={isSubmitting}
                autoComplete="username"
              />

              <FloatingField
                id="admin-password"
                label="Admin Master Password"
                name="adminPassword"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  if (fieldErrors.adminPassword) setFieldErrors((f) => ({ ...f, adminPassword: undefined }));
                }}
                error={fieldErrors.adminPassword}
                disabled={isSubmitting}
                autoComplete="current-password"
                right={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    disabled={isSubmitting}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 accent-slate-900"
                  />
                  <span className="text-xs text-slate-600 font-medium">Remember admin session</span>
                </label>
                <button
                  type="button"
                  onClick={() => setRole('USER')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline cursor-pointer"
                >
                  Exit Admin Mode
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[54px] rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 hover:from-slate-800 hover:to-slate-700 text-rose-400 font-black text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 border border-rose-500/30"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-rose-400/40 border-t-rose-400 rounded-full animate-spin" />
                    Authenticating Admin Session...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose-400" />
                    <span>SIGN IN TO ADMIN CONTROL CENTER</span>
                    <ArrowRight className="w-4 h-4 text-rose-400" />
                  </span>
                )}
              </button>
            </form>
          )}

          {/* Social Google OAuth (Customer tab) */}
          {role === 'USER' && (
            <>
              <div className="relative flex py-1 items-center" aria-hidden="true">
                <div className="flex-grow border-t border-slate-200" />
                <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-[#E5E7EB]" />
              </div>

              <button
                type="button"
                onClick={() => loginWithGoogle('USER')}
                disabled={isSubmitting}
                className="w-full h-[50px] rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 text-xs font-bold flex items-center justify-center gap-3 transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                <GoogleIcon className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>
            </>
          )}

          {/* Support Link */}
          <div className="text-center text-xs text-slate-500 pt-1 space-y-2">
            <a
              href="https://wa.me/9779862772457"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 font-semibold transition-colors"
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              Need Help? Phidim Service 24/7 Support
            </a>
          </div>
        </div>

        <p className="relative mt-8 text-center text-[11px] text-slate-400">
          &copy; {new Date().getFullYear()} Phidim Service • Panchthar, Koshi, Nepal
        </p>
      </main>
    </div>
  );
}
