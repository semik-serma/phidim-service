import { useState } from "react";
import { X, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
export const ContactModal = ({ isOpen, onClose }) => {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState({ name: "", phone: "", message: "" });
  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {
    /* Backdrop */
  }
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in" />

      {
    /* Modal Dialog */
  }
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-sm">
              PHIDIM SERVICE SUPPORT
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">
              Contact Us
            </h3>
          </div>
          <button
    onClick={onClose}
    className="p-1 rounded-full hover:bg-white/20 text-gray-300 transition-colors cursor-pointer"
  >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <Phone className="w-5 h-5 text-green-600 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Helpline</span>
                <span className="font-extrabold text-gray-900">+977 986-2772457</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <MapPin className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Address</span>
                <span className="font-extrabold text-gray-900">Phidim Ward 1, Panchthar</span>
              </div>
            </div>
          </div>

          {sent ? <div className="p-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto animate-bounce" />
              <h4 className="font-bold text-base text-gray-900">Message Sent!</h4>
              <p className="text-xs text-gray-500">Our Phidim customer support team will get back to you shortly.</p>
            </div> : <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                <input
    type="text"
    required
    placeholder="e.g. Shyam Karki"
    value={msg.name}
    onChange={(e) => setMsg({ ...msg, name: e.target.value })}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600"
  />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number</label>
                <input
    type="tel"
    required
    placeholder="98XXXXXXXX"
    value={msg.phone}
    onChange={(e) => setMsg({ ...msg, phone: e.target.value })}
    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600"
  />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Inquiry / Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ask about Fiber Net setup, CCTV camera quote, AC repair, or doorstep technician service..."
                  value={msg.message}
                  onChange={(e) => setMsg({ ...msg, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-hidden focus:border-green-600"
                />
              </div>

              <button
    type="submit"
    className="w-full py-3 bg-[#8cc63f] hover:bg-[#7db333] text-gray-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
  >
                <Send className="w-4 h-4" />
                <span>SEND MESSAGE</span>
              </button>
            </form>}
        </div>

      </div>
    </div>;
};
