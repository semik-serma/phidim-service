import { useState } from "react";
import { X, UserCheck, MoreVertical, ShieldCheck, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState("LOGIN");
  const [role, setRole] = useState("USER"); // 'USER' | 'ADMIN'
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrPhone || !password) return;
    setIsSubmitted(true);
    if (role === "ADMIN") {
      await login({ emailOrPhone, password, role: "ADMIN" });
    } else if (mode === "LOGIN") {
      await login({ emailOrPhone, password, role: "USER" });
    } else {
      await register({ name: "Customer User", email: emailOrPhone, phone: emailOrPhone, password, role: "USER" });
    }
    onClose();
  };

  const handleQuickFillAdmin = () => {
    setEmailOrPhone("admin@phidim.np");
    setPassword("password123");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-gray-100">
        
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between relative">
          <div>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-sm">
              PHIDIM SERVICE ACCOUNT
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">
              {role === "ADMIN"
                ? "Admin Control Access"
                : mode === "LOGIN"
                ? "Login to Your Account"
                : "Register New Account"}
            </h3>
          </div>
          
          <div className="flex items-center gap-1">
            {/* 3-Dot Options Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAdminMenu((v) => !v)}
                className="p-1.5 rounded-full hover:bg-white/20 text-gray-300 transition-colors cursor-pointer"
                title="Options"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {showAdminMenu && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setShowAdminMenu(false)} />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-slate-950 text-white rounded-xl shadow-2xl border border-slate-800 p-1.5 z-30 animate-in fade-in zoom-in-95">
                    <button
                      type="button"
                      onClick={() => {
                        setRole("ADMIN");
                        setMode("LOGIN");
                        handleQuickFillAdmin();
                        setShowAdminMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-xs font-bold text-rose-400 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>Admin Portal Login</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-gray-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-bounce">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Welcome Back!</h4>
            <p className="text-xs text-gray-500">Successfully authenticated. Welcome to Phidim Service!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {role === "ADMIN" && (
              <div className="bg-slate-900 text-white p-3 rounded-xl border border-rose-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Admin Security Mode</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRole("USER")}
                  className="text-[10px] text-gray-400 hover:text-white underline cursor-pointer"
                >
                  Back to User Login
                </button>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {role === "ADMIN" ? "Admin Email or Username" : "Mobile Number or Email Address"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={role === "ADMIN" ? "admin@phidim.np" : "e.g. 9800000000 or ram@gmail.com"}
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 ${
                role === "ADMIN"
                  ? "bg-slate-900 hover:bg-slate-800 text-rose-400 border border-rose-500/30"
                  : "bg-[#8cc63f] hover:bg-[#7db333] text-gray-950"
              } font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer mt-2 flex items-center justify-center gap-2`}
            >
              {role === "ADMIN" ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>SIGN IN TO ADMIN CONTROL</span>
                </>
              ) : mode === "LOGIN" ? (
                "LOG IN"
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>

            {role !== "ADMIN" && (
              <button
                type="button"
                onClick={() => {
                  loginWithGoogle("USER");
                  onClose();
                }}
                className="w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            )}

            <div className="text-center pt-2 text-xs text-gray-600">
              {role === "ADMIN" ? (
                <button
                  type="button"
                  onClick={() => setRole("USER")}
                  className="text-slate-600 font-bold hover:underline cursor-pointer"
                >
                  Exit Admin Mode
                </button>
              ) : mode === "LOGIN" ? (
                <p>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("REGISTER")}
                    className="text-green-600 font-bold hover:underline cursor-pointer"
                  >
                    Register Here
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("LOGIN")}
                    className="text-green-600 font-bold hover:underline cursor-pointer"
                  >
                    Login Here
                  </button>
                </p>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

