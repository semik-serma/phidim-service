import { useState } from "react";
import {
  User,
  UserCheck,
  Wrench,
  HardHat,
  MapPin,
  Cable,
  CheckCircle2,
  Shield,
  Home,
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const AuthPage = ({ onNavigateHome, initialRole = "USER" }) => {
  const { login, register, isLoading } = useAuth();
  const [role, setRole] = useState(initialRole);
  const [mode, setMode] = useState("LOGIN");
  const [userContact, setUserContact] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [techIdOrPhone, setTechIdOrPhone] = useState("");
  const [techPassword, setTechPassword] = useState("");
  const [techFullName, setTechFullName] = useState("");
  const [techSpecialty, setTechSpecialty] = useState("LAN Networking & Fiber Splicing");
  const [techWard, setTechWard] = useState("Phidim Ward 1 (Main Bazar)");
  const [techLoggedIn, setTechLoggedIn] = useState(false);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!userContact || !userPassword) return;
    if (mode === "LOGIN") {
      await login({ emailOrPhone: userContact, password: userPassword, role: "USER" });
    } else {
      await register({ name: userName || "Customer User", email: userContact, phone: userContact, password: userPassword, role: "USER" });
    }
  };

  const handleTechSubmit = async (e) => {
    e.preventDefault();
    if (!techIdOrPhone || !techPassword) return;
    try {
      if (mode === "LOGIN") {
        await login({ emailOrPhone: techIdOrPhone, password: techPassword, role: "TECHNICIAN" });
      } else {
        const cleanEmail = techIdOrPhone.includes("@")
          ? techIdOrPhone
          : `${techIdOrPhone.toLowerCase().replace(/[^a-z0-9]/g, "")}@phidim.np`;
        await register({
          name: techFullName || "Field Technician",
          email: cleanEmail,
          phone: techIdOrPhone,
          password: techPassword,
          role: "TECHNICIAN",
        });
      }
      setTechLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };
  const activeTickets = [
    { id: "TKT-9081", customer: "Himalayan Hotel & Cafe", location: "Phidim Ward 1, Main Road", service: "Cat6 LAN Cable Cabling & Switch Setup", status: "Pending", time: "Today, 2:30 PM" },
    { id: "TKT-9084", customer: "Suman Shrestha", location: "Phidim Ward 3, Bharapa", service: "Dish Home Fiber Drop Wire & Router Config", status: "In Progress", time: "Today, 4:00 PM" },
    { id: "TKT-9088", customer: "Panchthar Mart", location: "Phidim Ward 2, Buspark", service: "Dahua 4-Cam CCTV NVR Wiring & Online Setup", status: "Assigned", time: "Tomorrow, 10:00 AM" }
  ];
  return <div className="bg-gray-50 min-h-screen pb-16">
      
      {
    /* Top Breadcrumb Bar */
  }
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-xs text-gray-600 font-medium">
          <button
    onClick={onNavigateHome}
    className="hover:text-green-600 flex items-center gap-1 cursor-pointer"
  >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">
            {role === "USER" ? "Customer Account" : "Technician Portal"}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {
    /* Top Header Card */
  }
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[11px] font-black text-green-400 uppercase tracking-widest border border-white/10">
              <Shield className="w-3.5 h-3.5" />
              <span>Phidim Service Authentication</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {role === "USER" ? "Customer Account Access" : "Certified Field Technician Portal"}
            </h1>
            <p className="text-xs md:text-sm text-gray-300">
              Manage your orders, book technical on-site services, track fiber installation, or view technician assignments in Panchthar.
            </p>
          </div>

          {
    /* Toggle Role Selector */
  }
          <div className="bg-white/10 p-1.5 rounded-2xl border border-white/10 flex items-center gap-1.5 shrink-0">
            <button
    onClick={() => {
      setRole("USER");
      setMode("LOGIN");
    }}
    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${role === "USER" ? "bg-green-600 text-white shadow-md" : "text-gray-300 hover:bg-white/10"}`}
  >
              <User className="w-4 h-4" />
              <span>Customer</span>
            </button>
            <button
    onClick={() => {
      setRole("TECHNICIAN");
      setMode("LOGIN");
    }}
    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${role === "TECHNICIAN" ? "bg-green-600 text-white shadow-md" : "text-gray-300 hover:bg-white/10"}`}
  >
              <Wrench className="w-4 h-4" />
              <span>Technician</span>
            </button>
          </div>
        </div>

        {
    /* ROLE 1: CUSTOMER AUTH PAGE */
  }
        {role === "USER" && <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {
    /* Form Column */
  }
            <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
              
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider">
                    {mode === "LOGIN" ? "Customer Login" : "Create New Customer Account"}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {mode === "LOGIN" ? "Access your orders & saved items" : "Quick account setup in under 1 minute"}
                  </p>
                </div>

                <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold">
                  <button
    onClick={() => setMode("LOGIN")}
    className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${mode === "LOGIN" ? "bg-slate-900 text-white shadow-xs" : "text-gray-600 hover:text-gray-900"}`}
  >
                    Login
                  </button>
                  <button
    onClick={() => setMode("REGISTER")}
    className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${mode === "REGISTER" ? "bg-slate-900 text-white shadow-xs" : "text-gray-600 hover:text-gray-900"}`}
  >
                    Register
                  </button>
                </div>
              </div>

              {userSubmitted ? <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto animate-bounce">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900">Welcome to Phidim Service!</h3>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    You have successfully signed in. You can now book technician appointments, view repair jobs, and chat with technical specialists.
                  </p>
                  <button
    onClick={onNavigateHome}
    className="bg-green-600 hover:bg-green-700 text-white font-black text-xs px-6 py-3 rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
  >
                    Return to Homepage
                  </button>
                </div> : <form onSubmit={handleUserSubmit} className="space-y-4">
                  
                  {mode === "REGISTER" && <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
    type="text"
    required
    placeholder="e.g. Suman Limbu"
    className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-hidden focus:border-green-600 font-medium"
  />
                    </div>}

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Phone Number or Email
                    </label>
                    <div className="relative">
                      <input
    type="text"
    required
    placeholder="e.g. 9862772457 or user@gmail.com"
    value={userContact}
    onChange={(e) => setUserContact(e.target.value)}
    className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-hidden focus:border-green-600 font-medium"
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
    value={userPassword}
    onChange={(e) => setUserPassword(e.target.value)}
    className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-hidden focus:border-green-600 font-medium"
  />
                  </div>

                  {mode === "LOGIN" && <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 cursor-pointer font-medium text-gray-600">
                        <input type="checkbox" className="rounded-xs text-green-600 focus:ring-green-500" defaultChecked />
                        <span>Remember me on this device</span>
                      </label>
                      <a href="https://wa.me/9779862772457" target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold hover:underline">
                        Forgot password?
                      </a>
                    </div>}

                  <button
    type="submit"
    className="w-full py-3.5 bg-[#8cc63f] hover:bg-[#7db333] text-gray-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer mt-2"
  >
                    {mode === "LOGIN" ? "LOG IN TO PHIDIM SERVICE" : "CREATE CUSTOMER ACCOUNT"}
                  </button>

                  <div className="text-center pt-2 text-xs text-gray-600 border-t border-gray-100">
                    {mode === "LOGIN" ? <p>
                        Don&apos;t have an account?{" "}
                        <button
    type="button"
    onClick={() => setMode("REGISTER")}
    className="text-green-600 font-black hover:underline cursor-pointer"
  >
                          Register New Account
                        </button>
                      </p> : <p>
                        Already have an account?{" "}
                        <button
    type="button"
    onClick={() => setMode("LOGIN")}
    className="text-green-600 font-black hover:underline cursor-pointer"
  >
                          Sign In Here
                        </button>
                      </p>}
                  </div>

                </form>}

            </div>

            {
    /* Side Benefits Column */
  }
            <div className="md:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-6 space-y-4">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span>Why Register with Phidim Service?</span>
                </h3>

                <ul className="space-y-3 text-xs text-gray-700 font-medium">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">1</span>
                    <span>Direct status tracking for on-site technician visits in Phidim Municipality.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">2</span>
                    <span>Exclusive local discounts on DishHome DTH & Dahua CCTV cameras.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5">3</span>
                    <span>Saved installation addresses for home, shop, office, or restaurant.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-6 text-center space-y-3 shadow-xs">
                <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">Are you a Field Technician?</h4>
                <p className="text-xs text-gray-600">
                  Access the Field Technician Portal to view assigned job tickets in Panchthar.
                </p>
                <button
    onClick={() => setRole("TECHNICIAN")}
    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
  >
                  Switch to Technician Portal
                </button>
              </div>
            </div>

          </div>}

        {
    /* ROLE 2: FIELD TECHNICIAN PORTAL */
  }
        {role === "TECHNICIAN" && <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black">
                  <HardHat className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider">
                    {techLoggedIn ? "Technician Active Dashboard" : mode === "LOGIN" ? "Technician Login" : "Register New Field Installer"}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Phidim Service certified field engineering team portal
                  </p>
                </div>
              </div>

              {!techLoggedIn && <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold self-start sm:self-auto">
                  <button
    onClick={() => setMode("LOGIN")}
    className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${mode === "LOGIN" ? "bg-slate-900 text-white shadow-xs" : "text-gray-600 hover:text-gray-900"}`}
  >
                    Tech Login
                  </button>
                  <button
    onClick={() => setMode("REGISTER")}
    className={`px-3 py-1.5 rounded-lg cursor-pointer transition-all ${mode === "REGISTER" ? "bg-slate-900 text-white shadow-xs" : "text-gray-600 hover:text-gray-900"}`}
  >
                    Tech Register
                  </button>
                </div>}
            </div>

            {techLoggedIn ? <div className="space-y-6">
                
                {
    /* Tech Profile Banner */
  }
                <div className="bg-gradient-to-r from-green-900 to-emerald-950 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-green-800">
                  <div className="flex items-center gap-3 text-center sm:text-left">
                    <div className="w-12 h-12 rounded-full bg-white text-green-950 flex items-center justify-center font-black text-lg">
                      PB
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white">
                        {techFullName || "Technician ID: PB-TECH-402"}
                      </h3>
                      <p className="text-xs text-green-300 font-medium">
                        {techSpecialty} • {techWard}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="/technician-dashboard"
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-lg transition-transform hover:scale-105"
                    >
                      🚀 Open Full Technician Dashboard UI
                    </a>
                    <span className="bg-green-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      ONLINE ON DUTY
                    </span>
                    <button
                      onClick={() => setTechLoggedIn(false)}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-lg border border-white/20 transition-colors cursor-pointer"
                    >
                      Log Out
                    </button>
                  </div>
                </div>

                {
    /* Tickets Table/Grid */
  }
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                    <Cable className="w-4 h-4 text-green-600" />
                    <span>Assigned Service & Fiber Job Tickets</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeTickets.map((tkt) => <div key={tkt.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2 hover:border-green-300 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-gray-900 bg-gray-200 px-2.5 py-0.5 rounded-md">
                            {tkt.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tkt.status === "In Progress" ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-blue-100 text-blue-800 border border-blue-200"}`}>
                            {tkt.status}
                          </span>
                        </div>
                        <div className="text-sm font-black text-gray-900">{tkt.customer}</div>
                        <div className="text-xs text-gray-600 flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{tkt.location}</span>
                        </div>
                        <div className="text-xs text-green-800 font-bold bg-green-50 p-2.5 rounded-xl border border-green-200/80 flex items-center justify-between">
                          <span>{tkt.service}</span>
                          <span className="text-[10px] font-bold text-gray-500">{tkt.time}</span>
                        </div>
                      </div>)}
                  </div>
                </div>

              </div> : <form onSubmit={handleTechSubmit} className="max-w-xl mx-auto space-y-4">
                
                {mode === "REGISTER" && <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Technician Full Name
                    </label>
                    <input
    type="text"
    required
    placeholder="e.g. Ramesh Rai"
    value={techFullName}
    onChange={(e) => setTechFullName(e.target.value)}
    className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-hidden focus:border-green-600 font-medium"
  />
                  </div>}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Technician ID or Mobile Phone Number
                  </label>
                  <input
    type="text"
    required
    placeholder="e.g. TECH-402 or 9842400000"
    value={techIdOrPhone}
    onChange={(e) => setTechIdOrPhone(e.target.value)}
    className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-hidden focus:border-green-600 font-medium"
  />
                </div>

                {mode === "REGISTER" && <>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Primary Service Area Ward
                      </label>
                      <select
    value={techWard}
    onChange={(e) => setTechWard(e.target.value)}
    className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-hidden focus:border-green-600 font-medium bg-white"
  >
                        <option value="Phidim Ward 1 (Main Bazar)">Phidim Ward 1 (Main Bazar)</option>
                        <option value="Phidim Ward 2 (Buspark Area)">Phidim Ward 2 (Buspark Area)</option>
                        <option value="Phidim Ward 3 (Bharapa Area)">Phidim Ward 3 (Bharapa Area)</option>
                        <option value="Phidim Ward 4 (Chokmagu Area)">Phidim Ward 4 (Chokmagu Area)</option>
                        <option value="Panchthar Rural District Coverage">Panchthar Rural District Coverage</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Technical Specialization
                      </label>
                      <select
    value={techSpecialty}
    onChange={(e) => setTechSpecialty(e.target.value)}
    className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-hidden focus:border-green-600 font-medium bg-white"
  >
                        <option value="LAN Networking & Fiber Splicing">LAN Networking & Fiber Splicing</option>
                        <option value="CCTV Security Camera Setup">CCTV Security Camera Setup</option>
                        <option value="DishHome DTH Technician">DishHome DTH Technician</option>
                        <option value="Electrical & Smart Home Wiring">Electrical & Smart Home Wiring</option>
                      </select>
                    </div>
                  </>}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Password
                  </label>
                  <input
    type="password"
    required
    placeholder="••••••••"
    value={techPassword}
    onChange={(e) => setTechPassword(e.target.value)}
    className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-hidden focus:border-green-600 font-medium"
  />
                </div>

                <button
    type="submit"
    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
  >
                  <Wrench className="w-4 h-4 text-green-400" />
                  <span>{mode === "LOGIN" ? "CONTINUE TO TECHNICIAN DASHBOARD" : "REGISTER NEW TECHNICIAN"}</span>
                </button>

              </form>}

          </div>}

      </div>
    </div>;
};
