"use client";

import { useState, useEffect, useRef } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  SendHorizontal,
  Check,
  MessageCircle,
  MessageSquare,
  Lock,
  LogIn,
  ChevronDown,
  ChevronUp,
  CornerDownRight,
  Languages,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Flame,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Comprehensive multi-language comment discussions (Nepali & English only)
const INITIAL_COMMENTS = [
  {
    id: "cmt-1",
    author: {
      name: "DhanRaj Sherma",
      avatarUrl: "/dhanraj.png",
      role: "It Founder",
    },
    translations: {
      Nepali:
        "संसारमा प्रतिस्पर्धाले मात्र पैसा कमाइँदैन, पैसा कमाउन सहकार्य चाहिन्छ। त्यसैले हामीले बनाएको सहकार्यले संसार जोड्न सक्छ, रोजगारी सिर्जना हुन सक्छ अनि प्रयोगकर्ताले दक्ष जनशक्ति पाउँछ। मानिसको जीवनमा आवश्यक वस्तु उत्पादन गर्नुका साथै समयअनुसार अद्यावधिक (अपडेट) पनि हुनुपर्छ। समय, वस्तु, वातावरण र मानिसको प्रगति दिनप्रतिदिन आवश्यक बन्दै गएको छ। बाँकी आवश्यक सल्लाह सुझाव कमेन्ट गर्नुहोस्।",
      English:
        "In this world, competition alone doesn't make money; collaboration is required to create real value. That is why our collaborative platform can connect people globally, generate employment, and help users find certified skilled technicians. Beyond producing essential everyday goods, continuous innovation and updates are vital. As time, technology, and human progress evolve daily, your valuable suggestions and feedback in the comments are always welcome.",
    },
    likes: 42,
    dislikes: 1,
    createdAt: "Just now",
    founderBadges: true,
    isCardStyle: false,
    replies: [],
  },
  {
    id: "cmt-2",
    author: {
      name: "Ramesh Adhikari",
      avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      role: "Verified Customer",
    },
    translations: {
      Nepali:
        "एकदमै राम्रो विचार सर 🙌 प्रतिस्पर्धाभन्दा सहकार्य र आपसी सहयोगले नै नयाँ अवसर, रोजगारी र विकासका ढोकाहरू खोल्न सक्छ। सबै मिलेर अगाडि बढ्दा व्यक्ति मात्र होइन, समाज र देशकै प्रगति सम्भव हुन्छ। 🤝🚀",
      English:
        "Excellent perspective sir 🙌 Collaboration and teamwork open far more doors to new opportunities, jobs, and development than mere competition. When we move forward together, not just individuals but the entire society and nation prosper. 🤝🚀",
    },
    likes: 28,
    dislikes: 0,
    createdAt: "10 mins ago",
    isCardStyle: true,
    replies: [
      {
        id: "rep-2",
        author: {
          name: "Sunil Sherpa",
          avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
          role: "Verified Electrician",
        },
        translations: {
          Nepali: "धन्यवाद रमेश जी! हामी प्राविधिकहरू घरदैलोमै उच्च गुणस्तरको सेवा दिन सदैव तत्पर छौं। 🙏⚡",
          English: "Thank you Ramesh ji! As certified technicians, we are always ready to deliver premium doorstep service. 🙏⚡",
        },
        likes: 8,
        createdAt: "2 mins ago",
      },
    ],
  },
  {
    id: "cmt-3",
    author: {
      name: "Sita Subedi",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      role: "Phidim Resident",
    },
    translations: {
      Nepali:
        "फिदिम सेवाले गर्दा अब घरमै बसेर दक्ष इलेक्ट्रिसियन र प्लम्बर बोलाउन निकै सजिलो भएको छ। स्थानीय स्तरमा यस्तो डिजिटल सहकार्यको थालनी गरेकोमा सम्पूर्ण टिमलाई हार्दिक शुभकामना! 🙏",
      English:
        "Phidim Service has made booking verified electricians and plumbers at home so effortless. Warm congratulations to the entire team for bringing this collaborative tech platform to our local community! 🙏",
    },
    likes: 19,
    dislikes: 0,
    createdAt: "1 hour ago",
    isCardStyle: true,
    replies: [],
  },
  {
    id: "cmt-4",
    author: {
      name: "Alex Sharma",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      role: "Tech Consultant",
    },
    translations: {
      Nepali:
        "पाँचथर जिल्लाका लागि अत्यन्तै क्रान्तिकारी पहल! स्थानीय प्राविधिक र घरपरिवारलाई सहजै जोड्नुका साथै सहकार्यको भावनालाई अगाडि बढाएको छ। फिदिमको यो डिजिटल प्रगति देखेर धेरै खुसी लाग्यो।",
      English:
        "A revolutionary initiative for Panchthar district! Connecting local technicians with households seamlessly while fostering true collaboration instead of friction. Proud to see Phidim advancing digitally.",
    },
    likes: 35,
    dislikes: 0,
    createdAt: "2 hours ago",
    isCardStyle: false,
    replies: [],
  },
  {
    id: "cmt-5",
    author: {
      name: "Bikash Thapa",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      role: "Shop Owner, Main Bazaar",
    },
    translations: {
      Nepali:
        "मुख्य बजारको पसलमा ८ वटा क्यामेरा भएको सीसीटीभी जडान गराएको, मोबाइलमा प्रत्यक्ष दृश्य निकै सफा आउँछ। प्राविधिक समयमै आइपुग्नुभयो। फिदिममा यस्तो भरपर्दो सेवा पाएकोमा धन्यवाद! 📹✨",
      English:
        "Installed an 8-channel CCTV security system at our shop in Main Bazaar. Mobile remote streaming works crystal clear. Technicians arrived right on time. Outstanding local service in Phidim! 📹✨",
    },
    likes: 24,
    dislikes: 0,
    createdAt: "4 hours ago",
    isCardStyle: true,
    replies: [],
  },
  {
    id: "cmt-6",
    author: {
      name: "Rajesh Tamang",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      role: "Senior AC Field Technician",
    },
    translations: {
      Nepali:
        "हामी कार्यक्षेत्रमा वास्तविक समस्याहरूको समाधान गर्छौं। एसी ग्यास रिफिल, कपर पाइप सोल्डरिङ र एसी जडानमा स्पष्ट तथा पारदर्शी शुल्क पाउँदा ग्राहकहरू निकै सन्तुष्ट हुनुहुन्छ। पाँचथरमा सेवा गर्न पाउँदा खुसी लाग्छ! ❄️🔧",
      English:
        "We solve real hands-on technical issues in the field. Customers appreciate transparent upfront pricing for AC gas recharging, copper piping, and split unit installations. Proud to serve Panchthar! ❄️🔧",
    },
    likes: 31,
    dislikes: 0,
    createdAt: "6 hours ago",
    isCardStyle: false,
    replies: [],
  },
  {
    id: "cmt-7",
    author: {
      name: "Pooja Karki",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      role: "Ward 4 Resident",
    },
    translations: {
      Nepali:
        "डिसहोम अप्टिकल फाइबर इन्टरनेट जोडेको, २०० एमबीपीएसको गति निरन्तर स्थिर आइरहेको छ। भिडियो कल र घरबाट काम गर्न निकै सहज भएको छ। सेमिक सर र धनराज सरलाई धेरै धेरै धन्यवाद! 📡🌐",
      English:
        "Connected DishHome optical fiber internet; getting consistent 200 Mbps speed throughout the day. Video conferencing and remote work run smoothly. Thank you Semik sir and DhanRaj sir! 📡🌐",
    },
    likes: 22,
    dislikes: 0,
    createdAt: "12 hours ago",
    isCardStyle: true,
    replies: [],
  },
];

export function HomepageCommentSection() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const inputRef = useRef(null);

  // Available language tabs: Only Nepali and English (Neplish removed)
  const [activeLang, setActiveLang] = useState("Nepali");
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState("");
  const [reactions, setReactions] = useState({}); // { [id]: 'like' | 'dislike' }
  const [copiedId, setCopiedId] = useState(null);
  const [showToast, setShowToast] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Comments thread expansion state - default true (comments visible by default)
  const [showComments, setShowComments] = useState(true);

  // Post text truncation expansion state
  const [isPostExpanded, setIsPostExpanded] = useState(false);

  // Add Comment input toggle state
  const [isAddingComment, setIsAddingComment] = useState(false);

  // Pagination state for comments: Initially 5 comments visible by default, loads 5 more on each "Read more" click
  const [visibleCount, setVisibleCount] = useState(5);

  // Active reply state: { parentCommentId: string | null }
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyInputText, setReplyInputText] = useState("");

  // Restore saved comments & reactions
  useEffect(() => {
    try {
      const stored = localStorage.getItem("phidim_homepage_comments_v7");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (parsed[0]?.author) {
            parsed[0].author.avatarUrl = "/dhanraj.png";
          }
          setComments(parsed);
        }
      }
      const storedReactions = localStorage.getItem("phidim_homepage_comment_reactions");
      if (storedReactions) {
        setReactions(JSON.parse(storedReactions));
      }

      // Check if user came back from login with a pending comment draft
      const pendingDraft = sessionStorage.getItem("phidim_pending_comment_draft");
      if (pendingDraft) {
        setNewCommentText(pendingDraft);
        setShowComments(true);
        sessionStorage.removeItem("phidim_pending_comment_draft");
        if (isAuthenticated) {
          triggerToast("Welcome back! Your comment draft is ready to submit. ✨");
        }
      }
    } catch (e) {
      console.error("Failed to load stored comments", e);
    }
  }, [isAuthenticated]);

  const saveComments = (updated) => {
    setComments(updated);
    try {
      localStorage.setItem("phidim_homepage_comments_v7", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save comments", e);
    }
  };

  // Helper to extract text for current selected language (Nepali or English)
  const getCommentText = (item, lang) => {
    if (item.translations) {
      if (item.translations[lang]) return item.translations[lang];
      if (item.translations["Nepali"]) return item.translations["Nepali"];
      if (item.translations["English"]) return item.translations["English"];
    }
    return item.text || "";
  };

  const handleInputFocus = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
    }
  };

  const redirectToLogin = () => {
    if (newCommentText.trim()) {
      try {
        sessionStorage.setItem("phidim_pending_comment_draft", newCommentText.trim());
      } catch (e) { }
    }
    triggerToast("Please log in to post your comment...");
    setTimeout(() => {
      window.location.href = "/login?redirect=/?action=comment";
    }, 400);
  };

  const handleAddComment = (e) => {
    if (e) e.preventDefault();

    if (!isAuthenticated || !user) {
      setShowLoginPrompt(true);
      redirectToLogin();
      return;
    }

    const trimmed = newCommentText.trim();
    if (!trimmed) return;

    const newCmt = {
      id: `cmt-${Date.now()}`,
      author: {
        name: user?.displayName || user?.name || "Verified Member",
        avatarUrl:
          user?.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        role: user?.role || "USER",
      },
      translations: {
        Nepali: trimmed,
        English: trimmed,
      },
      text: trimmed,
      likes: 1,
      dislikes: 0,
      createdAt: "Just now",
      isCardStyle: true,
      replies: [],
    };

    const updated = [comments[0], newCmt, ...comments.slice(1)];
    saveComments(updated);
    setNewCommentText("");
    setShowComments(true);

    const updatedReactions = { ...reactions, [newCmt.id]: "like" };
    setReactions(updatedReactions);
    try {
      localStorage.setItem("phidim_homepage_comment_reactions", JSON.stringify(updatedReactions));
    } catch (err) { }

    triggerToast("Your comment has been posted to the discussion! 🎉");
  };

  const handleAddReply = (parentCommentId) => {
    if (!isAuthenticated || !user) {
      setShowLoginPrompt(true);
      redirectToLogin();
      return;
    }

    const trimmed = replyInputText.trim();
    if (!trimmed) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: {
        name: user?.displayName || user?.name || "Verified Member",
        avatarUrl:
          user?.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        role: user?.role || "USER",
      },
      translations: {
        Nepali: trimmed,
        English: trimmed,
      },
      text: trimmed,
      likes: 1,
      createdAt: "Just now",
    };

    const updatedComments = comments.map((c) => {
      if (c.id === parentCommentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply],
        };
      }
      return c;
    });

    saveComments(updatedComments);
    setReplyInputText("");
    setActiveReplyId(null);
    triggerToast("Your reply has been posted! 💬");
  };

  const handleReaction = (id, type) => {
    const currentReaction = reactions[id];
    let nextReaction = null;
    let likeDelta = 0;
    let dislikeDelta = 0;

    if (currentReaction === type) {
      nextReaction = null;
      if (type === "like") likeDelta = -1;
      if (type === "dislike") dislikeDelta = -1;
    } else {
      nextReaction = type;
      if (type === "like") {
        likeDelta = 1;
        if (currentReaction === "dislike") dislikeDelta = -1;
      } else if (type === "dislike") {
        dislikeDelta = 1;
        if (currentReaction === "like") likeDelta = -1;
      }
    }

    const updatedReactions = { ...reactions, [id]: nextReaction };
    setReactions(updatedReactions);
    try {
      localStorage.setItem("phidim_homepage_comment_reactions", JSON.stringify(updatedReactions));
    } catch (err) { }

    const updatedComments = comments.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          likes: Math.max(0, c.likes + likeDelta),
          dislikes: Math.max(0, (c.dislikes || 0) + dislikeDelta),
        };
      }
      if (c.replies && c.replies.length > 0) {
        const updatedReplies = c.replies.map((r) => {
          if (r.id === id) {
            return {
              ...r,
              likes: Math.max(0, r.likes + likeDelta),
            };
          }
          return r;
        });
        return { ...c, replies: updatedReplies };
      }
      return c;
    });

    saveComments(updatedComments);
  };

  const handleShare = (item) => {
    const activeText = getCommentText(item, activeLang);
    const shareText = `"${activeText}" — ${item.author.name} on Phidim Service (https://phidimservice.com.np)`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
      triggerToast("Post copied to clipboard! 📋");
    }
  };

  const handleReadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleShowLess = () => {
    setVisibleCount(1);
  };

  const triggerToast = (msg) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(""), 3000);
  };

  // Only Nepali and English
  const languageOptions = [
    { id: "Nepali", label: "नेपाली", fullLabel: "Nepali (नेपाली)", flag: "🇳🇵" },
    { id: "English", label: "English", fullLabel: "English", flag: "🇬🇧" },
  ];

  // The main featured post is item 0 (DhanRaj Sherma's thought)
  const featuredPost = comments[0] || INITIAL_COMMENTS[0];

  // The comments on this post are items 1..N
  const postComments = comments.slice(1);
  const visiblePostComments = postComments.slice(0, visibleCount);
  const hasMoreComments = postComments.length > visibleCount;

  // Calculate total comments + nested replies count
  const totalCommentsAndRepliesCount = postComments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  );

  return (
    <div className="w-full font-site">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && !isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-slate-800 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Log In to Comment or Reply
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                To keep our community discussion verified, please log in with your account to post comments or reply to others.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={redirectToLogin}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Go to Login / Register</span>
              </button>

              <button
                onClick={() => setShowLoginPrompt(false)}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OPEN FULL PAGE SECTION (NO BOXES, SEPARATED BY LINES ONLY) */}
      <div className="w-full space-y-3">
        
        {/* 1. TOP SECTION WITH STACKED NEPALI & ENGLISH TRANSLATE (MATCHING SCREENSHOT) */}
        <div className="flex items-stretch justify-between border-y border-gray-300 dark:border-slate-700">
          
          {/* Left: Author Header + Post Statement Text */}
          <div className="flex-1 py-3 pr-4 sm:pr-6 space-y-2">
            {/* Author Header */}
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-emerald-500/40 bg-slate-900 shrink-0">
                <img
                  src={featuredPost.author.avatarUrl}
                  alt={featuredPost.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-gray-900 dark:text-white font-extrabold tracking-tight">
                  {featuredPost.author.name}
                </span>
                <span className="text-gray-400 dark:text-gray-500">•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {featuredPost.author.role}
                </span>
              </div>
            </div>

            {/* Post Statement Text with Read More toggle */}
            {(() => {
              const fullText = getCommentText(featuredPost, activeLang);
              const isLong = fullText.length > 160;
              const displayText = !isPostExpanded && isLong ? fullText.slice(0, 160) + "..." : fullText;

              return (
                <p
                  key={activeLang}
                  className="text-xs sm:text-[13px] md:text-sm text-gray-800 dark:text-gray-100 leading-relaxed font-normal animate-in fade-in duration-200"
                >
                  {displayText}
                  {isLong && (
                    <button
                      type="button"
                      onClick={() => setIsPostExpanded(!isPostExpanded)}
                      className="ml-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer inline-block"
                    >
                      {isPostExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </p>
              );
            })()}
          </div>

          {/* Right: Stacked Nepali / English Translate Box with Divider Lines as in Screenshot */}
          <div className="border-l border-gray-300 dark:border-slate-700 flex flex-col justify-stretch shrink-0 w-24 sm:w-28 md:w-32">
            {/* Nepali on Top */}
            <button
              type="button"
              onClick={() => {
                setActiveLang("Nepali");
                triggerToast("Language switched to Nepali (नेपाली) 🌐");
              }}
              className={`flex-1 flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-bold border-b border-gray-300 dark:border-slate-700 transition-colors cursor-pointer ${
                activeLang === "Nepali"
                  ? "bg-emerald-600 text-white font-extrabold"
                  : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              Nepali
            </button>

            {/* English on Bottom */}
            <button
              type="button"
              onClick={() => {
                setActiveLang("English");
                triggerToast("Language switched to English 🌐");
              }}
              className={`flex-1 flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeLang === "English"
                  ? "bg-emerald-600 text-white font-extrabold"
                  : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              English
            </button>
          </div>

        </div>

        {/* 2. SIGNATURES & POST ACTIONS */}
        <div>

          {/* Signatures & Post Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Signatures */}
            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-[13px] text-gray-800 dark:text-gray-300 font-medium">
              {/* It Founder DhanRaj Sherma */}
              <span className="inline-flex items-center gap-1.5">
  <span className="text-gray-600 dark:text-gray-400 font-normal">
    IT Founder
  </span>

  <a
    href="https://phidimbazar.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="relative font-bold text-blue-600 dark:text-blue-400 inline-block pb-0.5"
  >
    DhanRaj Sherma

    <svg
      className="absolute -bottom-0.5 left-0 w-full h-1.5 text-blue-600 dark:text-blue-400 overflow-visible"
      viewBox="0 0 100 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 3C25 10 75 10 98 3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </a>
</span>

              {/* Full Stack Developer Semik Serma */}
             <span className="inline-flex items-center gap-1.5">
  <span className="text-gray-600 dark:text-gray-400 font-normal">
    Full Stack Developer
  </span>

  <a
    href="https://portfolio.phidimservice.com.np"
    target="_blank"
    rel="noopener noreferrer"
    className="relative font-bold text-blue-600 dark:text-blue-400 inline-block pb-0.5"
  >
    Semik Serma

    <svg
      className="absolute -bottom-0.5 left-0 w-full h-1.5 text-blue-600 dark:text-blue-400 overflow-visible"
      viewBox="0 0 100 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 3C25 10 75 10 98 3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </a>
</span>
            </div>

            {/* Post Action Buttons: Like, Dislike, Share */}
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <button
                onClick={() => handleReaction(featuredPost.id, "like")}
                className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold transition-colors cursor-pointer hover:text-blue-600 ${
                  reactions[featuredPost.id] === "like" ? "text-blue-600 font-bold" : ""
                }`}
                title="Like"
              >
                <ThumbsUp
                  className={`w-4 h-4 ${
                    reactions[featuredPost.id] === "like" ? "fill-blue-600 text-blue-600" : ""
                  }`}
                />
                {featuredPost.likes > 0 && <span className="text-xs">{featuredPost.likes}</span>}
              </button>

              <button
                onClick={() => handleReaction(featuredPost.id, "dislike")}
                className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold transition-colors cursor-pointer hover:text-red-600 ${
                  reactions[featuredPost.id] === "dislike" ? "text-red-600 font-bold" : ""
                }`}
                title="Dislike"
              >
                <ThumbsDown
                  className={`w-4 h-4 ${
                    reactions[featuredPost.id] === "dislike" ? "fill-red-600 text-red-600" : ""
                  }`}
                />
              </button>

              <button
                onClick={() => handleShare(featuredPost)}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold transition-colors cursor-pointer hover:text-emerald-600"
                title="Share post"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* LINE SEPARATOR ONLY */}
        <div className="border-t border-gray-200 dark:border-slate-800 my-2" />

        {/* 3. COMMUNITY COMMENTS SECTION (NO BOXES, LINE SEPARATED) */}
        <div className="space-y-3">
          {/* Toggle / Header Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowComments(!showComments)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-bold text-xs transition-all cursor-pointer border border-gray-200 dark:border-slate-700/80"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>
                  {showComments
                    ? "Hide comments"
                    : `View comments (${totalCommentsAndRepliesCount})`}
                </span>
                {showComments ? (
                  <ChevronUp className="w-3.5 h-3.5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500 animate-bounce" />
                )}
              </button>

              {/* Add Comment Button */}
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    setShowLoginPrompt(true);
                    return;
                  }
                  setIsAddingComment(!isAddingComment);
                  if (!showComments) setShowComments(true);
                  setTimeout(() => {
                    inputRef.current?.focus();
                  }, 100);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all cursor-pointer shadow-2xs hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Comment</span>
              </button>
            </div>

            <span className="text-[11px] text-gray-400 font-medium hidden sm:inline-block">
              {showComments
                ? `Showing ${visiblePostComments.length} of ${postComments.length} comments`
                : "Click to view community responses"}
            </span>
          </div>

          {/* Inline Add Comment Input */}
          {isAddingComment && (
            <div className="pt-1 animate-in fade-in duration-200">
              <form
                onSubmit={(e) => {
                  handleAddComment(e);
                  setIsAddingComment(false);
                }}
                className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-full px-3.5 py-1.5 shadow-2xs focus-within:ring-2 focus-within:ring-emerald-500/20"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Show your feelings through adding a comment..."
                  className="flex-1 bg-transparent text-xs text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-full text-xs font-bold cursor-pointer transition-colors"
                >
                  Post
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingComment(false)}
                  className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          {/* Expandable Comments List (No Box Around Comments, Separated by Lines) */}
          {showComments && (
            <div className="space-y-3 pt-1 divide-y divide-gray-200 dark:divide-slate-800 animate-in fade-in duration-300">
              {visiblePostComments.map((cmt) => {
                const textInLang = getCommentText(cmt, activeLang);
                const isReplying = activeReplyId === cmt.id;

                return (
                  <div key={cmt.id} className="pt-2.5 first:pt-0 space-y-1.5">
                    {/* Author Header */}
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-slate-700 bg-slate-900 shrink-0">
                        <img
                          src={cmt.author.avatarUrl}
                          alt={cmt.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white tracking-tight">
                          {cmt.author.name}
                        </h4>
                        {cmt.author.role && (
                          <span className="text-[10px] text-gray-500 dark:text-gray-400">
                            {cmt.author.role} • {cmt.createdAt}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Comment Content (No Box) */}
                    <div className="pl-0 sm:pl-9 space-y-1.5">
                      <p
                        key={activeLang}
                        className="text-xs sm:text-[13px] text-gray-800 dark:text-gray-200 leading-relaxed font-normal animate-in fade-in duration-200"
                      >
                        {textInLang}
                      </p>

                      {/* Comment Actions: Reply, Like, Dislike, Share */}
                      <div className="flex items-center justify-end gap-3.5 text-gray-700 dark:text-gray-300 pt-0.5">
                        <button
                          onClick={() => {
                            if (!isAuthenticated) {
                              setShowLoginPrompt(true);
                              return;
                            }
                            setActiveReplyId(isReplying ? null : cmt.id);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
                          title="Reply to comment"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Reply</span>
                        </button>

                        <button
                          onClick={() => handleReaction(cmt.id, "like")}
                          className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer hover:text-blue-600 ${
                            reactions[cmt.id] === "like" ? "text-blue-600 font-bold" : ""
                          }`}
                          title="Like"
                        >
                          <ThumbsUp
                            className={`w-3.5 h-3.5 ${
                              reactions[cmt.id] === "like" ? "fill-blue-600 text-blue-600" : ""
                            }`}
                          />
                          {cmt.likes > 0 && <span className="text-xs">{cmt.likes}</span>}
                        </button>

                        <button
                          onClick={() => handleReaction(cmt.id, "dislike")}
                          className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer hover:text-red-600 ${
                            reactions[cmt.id] === "dislike" ? "text-red-600 font-bold" : ""
                          }`}
                          title="Dislike"
                        >
                          <ThumbsDown
                            className={`w-3.5 h-3.5 ${
                              reactions[cmt.id] === "dislike" ? "fill-red-600 text-red-600" : ""
                            }`}
                          />
                        </button>

                        <button
                          onClick={() => handleShare(cmt)}
                          className="inline-flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer hover:text-emerald-600"
                          title="Share comment"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Inline Reply Input Box */}
                      {isReplying && (
                        <div className="mt-2 pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center gap-2 animate-in fade-in duration-200">
                          <CornerDownRight className="w-4 h-4 text-gray-400 shrink-0" />
                          <input
                            type="text"
                            value={replyInputText}
                            onChange={(e) => setReplyInputText(e.target.value)}
                            placeholder={`Reply to ${cmt.author.name}...`}
                            className="flex-1 bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-full px-4 py-2 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddReply(cmt.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleAddReply(cmt.id)}
                            disabled={!replyInputText.trim()}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-full text-xs font-bold cursor-pointer transition-colors"
                          >
                            Send
                          </button>
                          <button
                            onClick={() => {
                              setActiveReplyId(null);
                              setReplyInputText("");
                            }}
                            className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 text-xs font-semibold cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      {/* Nested Replies Thread */}
                      {cmt.replies && cmt.replies.length > 0 && (
                        <div className="mt-2 space-y-1.5 pl-4 sm:pl-6 border-l-2 border-emerald-500/20 dark:border-emerald-500/10">
                          {cmt.replies.map((reply) => {
                            const replyText = getCommentText(reply, activeLang);
                            return (
                              <div
                                key={reply.id}
                                className="space-y-1 animate-in fade-in duration-200 pt-1"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-emerald-400/40 shrink-0">
                                      <img
                                        src={reply.author.avatarUrl}
                                        alt={reply.author.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <span className="font-bold text-xs text-gray-900 dark:text-white">
                                        {reply.author.name}
                                      </span>
                                      {reply.author.role && (
                                        <span className="ml-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full">
                                          {reply.author.role}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-[10px] text-gray-400">{reply.createdAt}</span>
                                </div>

                                <p className="text-xs text-gray-800 dark:text-gray-200 pl-7 font-normal leading-relaxed">
                                  {replyText}
                                </p>

                                <div className="flex items-center justify-end gap-3 pt-0.5">
                                  <button
                                    onClick={() => handleReaction(reply.id, "like")}
                                    className={`inline-flex items-center gap-1 text-xs transition-colors cursor-pointer hover:text-blue-600 ${
                                      reactions[reply.id] === "like"
                                        ? "text-blue-600 font-bold"
                                        : "text-gray-500"
                                    }`}
                                  >
                                    <ThumbsUp
                                      className={`w-3.5 h-3.5 ${
                                        reactions[reply.id] === "like"
                                          ? "fill-blue-600 text-blue-600"
                                          : ""
                                      }`}
                                    />
                                    {reply.likes > 0 && (
                                      <span className="text-[11px]">{reply.likes}</span>
                                    )}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Read More Pagination Bar */}
              <div className="pt-2.5 flex flex-col sm:flex-row items-center justify-center gap-3">
                {hasMoreComments ? (
                  <button
                    onClick={handleReadMore}
                    className="inline-flex items-center gap-2 px-5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 cursor-pointer border border-gray-200 dark:border-slate-700"
                    title="Show more comments"
                  >
                    <span>Read more ({postComments.length - visibleCount} more)</span>
                    <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                  </button>
                ) : postComments.length > 1 && visibleCount > 1 ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Showing all {postComments.length} comments ✨
                    </span>
                    <button
                      onClick={handleShowLess}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-bold text-[11px] transition-colors cursor-pointer hover:scale-105"
                      title="Collapse to default view"
                    >
                      <span>Show less</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
