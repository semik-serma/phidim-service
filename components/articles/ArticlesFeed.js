"use client";

import { useState } from "react";
import {
  FileText,
  PlusCircle,
  UserPlus,
  UserCheck,
  MessageSquare,
  Heart,
  Share2,
  Sparkles,
  Tag,
  Clock,
  ThumbsUp,
  Search,
  BookOpen,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";

const INITIAL_ARTICLES = [
  {
    id: "art-101",
    title: "Essential Maintenance Tips for Split Air Conditioners in Phidim Summers",
    category: "AC & Cooling",
    summary:
      "Regular cleaning of indoor dust filters, checking refrigerant gas pressure, and ensuring proper outdoor bracket ventilation can reduce electricity bills by up to 25%.",
    content: `Phidim summers can get warm and humid. To keep your split AC running efficiently during high usage months:

1. Clean indoor dust filters every 2 to 3 weeks using warm water and mild soap.
2. Check outdoor unit clearance — ensure at least 2 feet of space around the unit for proper heat dissipation.
3. Don't set the temperature lower than 24°C. Setting it to 24°C provides optimal cooling while saving power.
4. Schedule a professional deep pressure wash service at least once before summer begins.`,
    coverImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    author: {
      id: "usr-tech-rajesh",
      name: "Rajesh Tamang",
      role: "TECHNICIAN",
      specialty: "Senior AC & Cooling Specialist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      followersCount: 142,
      isFollowingUser: true, // This author already follows the current logged-in user!
    },
    likes: 48,
    commentsCount: 12,
    createdAt: "2 hours ago",
    tags: ["AC Maintenance", "Energy Saving", "Phidim Tech"],
  },
  {
    id: "art-102",
    title: "Complete Guide to Fiber Optic Splicing & Low Latency Home WiFi Setup",
    category: "Fiber & Networking",
    summary:
      "Learn how DishHome fiber drop cables are spliced using fusion splicers and how dual-band 5GHz routers eliminate latency for online gaming and streaming.",
    content: `Fiber optic technology delivers lightning-fast internet across Panchthar.

Key factors for a reliable WiFi setup:
• Place your dual-band ONU router in a central, elevated position.
• Avoid thick concrete walls between the router and heavy streaming devices.
• Use 5GHz frequency band for gaming and 2.4GHz for smart home devices requiring long-range connection.`,
    coverImage: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    author: {
      id: "usr-admin-phidim",
      name: "Phidim Service Admin",
      role: "ADMIN",
      specialty: "Official Platform Announcement",
      avatar: "/dhanraj.png",
      followersCount: 890,
      isFollowingUser: false,
    },
    likes: 92,
    commentsCount: 24,
    createdAt: "1 day ago",
    tags: ["DishHome Fiber", "Networking", "WiFi Tips"],
  },
  {
    id: "art-103",
    title: "How We Installed 8-Channel CCTV Security at Main Bazar Phidim",
    category: "CCTV & Security",
    summary:
      "A step-by-step walkthrough of running weather-proof Cat6 cables, mounting outdoor IP cameras, and setting up remote mobile monitoring.",
    content: `Security is crucial for local businesses in Phidim. In our latest project, we deployed an 8-camera 5MP Dahua IP setup with NVR storage and mobile phone alerts. Now the store owner can monitor all camera feeds live anywhere in Nepal!`,
    coverImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    author: {
      id: "usr-cust-ram",
      name: "Ram Shrestha",
      role: "USER",
      specialty: "Verified Business Customer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      followersCount: 35,
      isFollowingUser: true,
    },
    likes: 31,
    commentsCount: 7,
    createdAt: "3 days ago",
    tags: ["CCTV", "Phidim Bazar", "Security"],
  },
];

export function ArticlesFeed({ onOpenCreateModal, onStartChat, onStartCall }) {
  const { user } = useAuth();
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Track followed authors by author ID
  const [followingMap, setFollowingMap] = useState({
    "usr-tech-rajesh": true, // User already follows Rajesh -> Mutual Follow!
  });

  const [likedArticles, setLikedArticles] = useState({});

  const toggleFollow = (authorId, authorName) => {
    setFollowingMap((prev) => {
      const isCurrentlyFollowing = !!prev[authorId];
      const nextState = { ...prev, [authorId]: !isCurrentlyFollowing };
      return nextState;
    });
  };

  const toggleLike = (articleId) => {
    setLikedArticles((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  };

  const categories = ["ALL", "AC & Cooling", "Fiber & Networking", "CCTV & Security", "Electrical", "Plumbing"];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === "ALL" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              <Sparkles size={14} className="text-emerald-400" />
              <span>Panchthar Knowledge & Community Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Community Articles & Tech Guides</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
              Read latest articles published by local workers, customers, and admins. Follow authors back to unlock 1-on-1 direct chat messaging!
            </p>
          </div>

          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 cursor-pointer shrink-0"
          >
            <PlusCircle size={18} />
            <span>Create New Article</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Articles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const isFollowing = !!followingMap[article.author.id];
          const isMutual = isFollowing && article.author.isFollowingUser;
          const isLiked = !!likedArticles[article.id];

          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Article Cover Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/75 backdrop-blur-md text-emerald-400 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
                    {article.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  {/* Author Header */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-10 h-10 rounded-2xl object-cover ring-2 ring-emerald-500/40 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                          <span>{article.author.name}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-md font-extrabold uppercase ${
                              article.author.role === "ADMIN"
                                ? "bg-purple-500/20 text-purple-600 dark:text-purple-300"
                                : article.author.role === "TECHNICIAN"
                                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
                                : "bg-blue-500/20 text-blue-600 dark:text-blue-300"
                            }`}
                          >
                            {article.author.role}
                          </span>
                        </h4>
                        <p className="text-[10px] text-slate-400 font-medium truncate">
                          {article.author.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Follow / Followed / Mutual Button */}
                    <button
                      onClick={() => toggleFollow(article.author.id, article.author.name)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 ${
                        isMutual
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : isFollowing
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                          : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                      }`}
                    >
                      {isMutual ? (
                        <>
                          <UserCheck size={14} className="text-emerald-500" />
                          <span>Mutual</span>
                        </>
                      ) : isFollowing ? (
                        <>
                          <UserCheck size={14} />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <UserPlus size={14} />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Article Title & Summary */}
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {article.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="px-6 py-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                  <button
                    onClick={() => toggleLike(article.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isLiked ? "text-rose-500 font-black" : "hover:text-rose-500"
                    }`}
                  >
                    <Heart size={16} className={isLiked ? "fill-rose-500 text-rose-500" : ""} />
                    <span>{article.likes + (isLiked ? 1 : 0)}</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={16} />
                    <span>{article.commentsCount}</span>
                  </div>
                </div>

                {/* Mutual Follow Direct Chat / Call Action */}
                {isMutual ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onStartChat && onStartChat(article.author)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                      title="Mutual Follow Unlocked! Start Direct Chat"
                    >
                      <MessageSquare size={14} />
                      <span>Chat</span>
                    </button>

                    <button
                      onClick={() => onStartCall && onStartCall(article.author, "video")}
                      className="p-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-600 dark:text-teal-400 transition-colors cursor-pointer"
                      title="Start HD Video Call"
                    >
                      <BookOpen size={0} className="hidden" />
                      <span>📹</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium italic">
                    {article.author.isFollowingUser
                      ? "Follow back to chat"
                      : "Follow to request chat"}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
