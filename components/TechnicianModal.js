import { useState } from "react";
import { X, Wrench, HardHat, MapPin, Cable } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const TechnicianModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("LOGIN");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [techIdOrPhone, setTechIdOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState("LAN Networking & Fiber Splicing");
  const [ward, setWard] = useState("Phidim Ward 1 (Main Bazar)");
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!techIdOrPhone || !password) return;
    try {
      if (mode === "LOGIN") {
        await login({ emailOrPhone: techIdOrPhone, password, role: "TECHNICIAN" });
      } else {
        const cleanEmail = techIdOrPhone.includes("@")
          ? techIdOrPhone
          : `${techIdOrPhone.toLowerCase().replace(/[^a-z0-9]/g, "")}@phidim.np`;
        await register({
          name: fullName || "Field Technician",
          email: cleanEmail,
          phone: techIdOrPhone,
          password,
          role: "TECHNICIAN",
        });
      }
      setIsLoggedIn(true);
      if (typeof window !== "undefined") {
        window.location.href = "/technician/dashboard";
      }
    } catch (err) {
      console.error(err);
    }
  };
  const activeTickets = [
    { id: "TKT-9081", customer: "Himalayan Hotel & Cafe", location: "Phidim Ward 1, Main Road", service: "Cat6 LAN Cable Cabling & Switch Setup", status: "Pending", time: "Today, 2:30 PM" },
    { id: "TKT-9084", customer: "Suman Shrestha", location: "Phidim Ward 3, Bharapa", service: "Dish Home Fiber Drop Wire & Router Config", status: "In Progress", time: "Today, 4:00 PM" },
    { id: "TKT-9088", customer: "Panchthar Mart", location: "Phidim Ward 2, Buspark", service: "Dahua 4-Cam CCTV NVR Wiring & Online Setup", status: "Assigned", time: "Tomorrow, 10:00 AM" }
  ];
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {
    /* Backdrop */
  }
      <div onClick={onClose} className="fixed inset-0 bg-black/65 backdrop-blur-xs animate-in fade-in" />

      {
    /* Modal Dialog */
  }
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 border border-gray-200">
        
        {
    /* Header */
  }
        <div className="p-5 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-sm">
                  PHIDIM SERVICE TECH PORTAL
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-white mt-0.5">
                {isLoggedIn ? "Technician Field Dashboard" : mode === "LOGIN" ? "Technician Login" : "Register as Field Technician"}
              </h3>
            </div>
          </div>
          <button
    onClick={onClose}
    className="p-1.5 rounded-full hover:bg-white/20 text-gray-300 transition-colors cursor-pointer"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Content Body */
  }
        {isLoggedIn ? <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-black">
                  <HardHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900">
                    {fullName || "Technician ID: PB-TECH-402"}
                  </h4>
                  <p className="text-xs text-gray-600 font-medium">
                    {specialty} • {ward}
                  </p>
                </div>
              </div>
              <span className="bg-green-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                ACTIVE ON DUTY
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Cable className="w-4 h-4 text-blue-600" />
                  <span>Assigned Phidim Field Tickets</span>
                </h5>
                <span className="text-xs text-blue-600 font-bold">3 Active Jobs</span>
              </div>

              <div className="space-y-2.5">
                {activeTickets.map((tkt) => <div key={tkt.id} className="bg-gray-50 hover:bg-gray-100/80 border border-gray-200 rounded-xl p-3.5 space-y-2 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900 bg-gray-200 px-2 py-0.5 rounded-md">
                        {tkt.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tkt.status === "In Progress" ? "bg-amber-100 text-amber-800 border border-amber-300" : "bg-blue-100 text-blue-800 border border-blue-200"}`}>
                        {tkt.status}
                      </span>
                    </div>
                    <div className="text-xs font-extrabold text-gray-800">{tkt.customer}</div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{tkt.location}</span>
                    </div>
                    <div className="text-xs text-green-700 font-semibold bg-green-50/60 p-2 rounded-lg border border-green-100 flex items-center justify-between">
                      <span>{tkt.service}</span>
                      <span className="text-[10px] font-bold text-gray-500">{tkt.time}</span>
                    </div>
                  </div>)}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <button
    onClick={() => setIsLoggedIn(false)}
    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
  >
                Log Out Technician
              </button>
              <button
    onClick={onClose}
    className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 cursor-pointer"
  >
                Close Dashboard
              </button>
            </div>
          </div> : <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {mode === "REGISTER" && <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
    type="text"
    required
    placeholder="e.g. Ramesh Rai"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600 font-medium"
  />
              </div>}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Technician ID / Mobile Number
              </label>
              <input
    type="text"
    required
    placeholder="e.g. TECH-402 or 9842400000"
    value={techIdOrPhone}
    onChange={(e) => setTechIdOrPhone(e.target.value)}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600 font-medium"
  />
            </div>

            {mode === "REGISTER" && <>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Primary Service Area
                  </label>
                  <select
    value={ward}
    onChange={(e) => setWard(e.target.value)}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600 font-medium bg-white"
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
                    Technical Specialty
                  </label>
                  <select
    value={specialty}
    onChange={(e) => setSpecialty(e.target.value)}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600 font-medium bg-white"
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
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600"
  />
            </div>

            <button
    type="submit"
    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer mt-2 flex items-center justify-center gap-2"
  >
              <Wrench className="w-4 h-4" />
              <span>{mode === "LOGIN" ? "CONTINUE AS TECHNICIAN" : "REGISTER TECHNICIAN"}</span>
            </button>

            <div className="text-center pt-2 text-xs text-gray-600">
              {mode === "LOGIN" ? <p>
                  New installer in Panchthar?{" "}
                  <button
    type="button"
    onClick={() => setMode("REGISTER")}
    className="text-green-600 font-bold hover:underline cursor-pointer"
  >
                    Register as Technician
                  </button>
                </p> : <p>
                  Already registered?{" "}
                  <button
    type="button"
    onClick={() => setMode("LOGIN")}
    className="text-green-600 font-bold hover:underline cursor-pointer"
  >
                    Technician Login
                  </button>
                </p>}
            </div>

          </form>}

      </div>
    </div>;
};
