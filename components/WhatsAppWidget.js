import { useState } from "react";
import { MessageCircle, X, Send, Bot, ExternalLink } from "lucide-react";
export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "\u0928\u092E\u0938\u094D\u0924\u0947! \u092E \u092B\u093F\u0926\u093F\u092E \u0938\u0930\u094D\u092D\u093F\u0938 (Phidim Service) \u0915\u094B \u090F\u0906\u0908 \u0938\u0939\u093E\u092F\u0915 \u0939\u0941\u0901\u0964 CCTV \u0915\u094D\u092F\u093E\u092E\u0947\u0930\u093E, \u0935\u093F\u0926\u094D\u092F\u0941\u0924 \u092E\u0930\u094D\u092E\u0924 \u0935\u093E Fiber Net \u0938\u092E\u094D\u092C\u0928\u094D\u0927\u0940 \u0915\u0947\u0939\u0940 \u0938\u094B\u0927\u094D\u0928\u0941 \u091B?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const whatsappNumber = "9779862772457";
  const openWhatsApp = (customText) => {
    const text = encodeURIComponent(customText || "Hello Phidim Service! I need assistance with your technical doorstep repair services.");
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const userQuery = inputText;
    setMessages((prev) => [...prev, { sender: "user", text: userQuery }]);
    setInputText("");
    setTimeout(() => {
      openWhatsApp(`Hello Phidim Service! ${userQuery}`);
    }, 500);
  };
  return <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      
      {
    /* Interactive Chat Box */
  }
      {isOpen && <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {
    /* Header */
  }
          <div className="bg-[#0f766e] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-800 flex items-center justify-center border border-teal-500">
                <Bot className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Phidim Service WhatsApp Support</h4>
                <div className="flex items-center gap-1 text-[10px] text-teal-200 font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>+977 986-2772457 • Phidim, Nepal</span>
                </div>
              </div>
            </div>
            <button
    onClick={() => setIsOpen(false)}
    className="p-1 rounded-full hover:bg-teal-800 text-teal-100 transition-colors cursor-pointer"
  >
              <X className="w-4 h-4" />
            </button>
          </div>

          {
    /* Quick Direct WhatsApp Button Banner */
  }
          <div className="p-2.5 bg-teal-50 border-b border-teal-100 flex items-center justify-between gap-2 text-xs">
            <span className="text-teal-900 font-bold">📲 Direct WhatsApp:</span>
            <button
    onClick={() => openWhatsApp()}
    className="bg-green-600 hover:bg-green-700 text-white font-extrabold px-3 py-1 rounded-lg text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
  >
              <span>+977 986-2772457</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {
    /* Messages Body */
  }
          <div className="p-3.5 h-56 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => <div
    key={idx}
    className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
  >
                {m.sender === "bot" && <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    PB
                  </div>}
                <div
    className={`p-2.5 rounded-xl max-w-[80%] leading-relaxed ${m.sender === "user" ? "bg-teal-700 text-white rounded-tr-none" : "bg-white text-gray-800 border border-gray-200 shadow-2xs rounded-tl-none"}`}
  >
                  {m.text}
                </div>
              </div>)}
          </div>

          {
    /* Input Form & Quick Options */
  }
          <div className="p-2 border-t border-gray-200 bg-white space-y-2">
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              <button
    onClick={() => openWhatsApp("Hello Phidim Service! I need Electrical Repair / Wiring.")}
    className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg font-bold text-left transition-colors cursor-pointer border border-amber-200 truncate"
  >
                ⚡ Electrical Service
              </button>
              <button
    onClick={() => openWhatsApp("Hello Phidim Service! I need CCTV Camera installation.")}
    className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg font-bold text-left transition-colors cursor-pointer border border-blue-200 truncate"
  >
                📹 CCTV Camera
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
    type="text"
    placeholder="Type your message for WhatsApp..."
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
    className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-xl focus:outline-hidden focus:border-teal-600"
  />
              <button
    type="submit"
    className="p-2 bg-[#0f766e] hover:bg-teal-800 text-white rounded-xl transition-colors cursor-pointer"
    title="Send via WhatsApp"
  >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>}

      {
    /* Floating Teal Button: "तपाईंलाई के सहयोग गर्न सक्छु ?" -> Opens WhatsApp directly */
  }
      <button
    onClick={() => openWhatsApp()}
    className="bg-[#2a9d8f] hover:bg-[#218377] text-white font-bold py-2.5 px-4 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-200 transform hover:scale-105 border border-white/20 cursor-pointer"
    title="Open WhatsApp Help (+977 986-2772457)"
  >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold tracking-tight">
          तपाईंलाई के सहयोग गर्न सक्छु ?
        </span>
      </button>

    </div>;
};
