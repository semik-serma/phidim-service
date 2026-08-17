"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  UserPlus,
  UserCheck,
  UserX,
  Clock,
  MessageSquare,
  Phone,
  Video,
  Sparkles,
  Shield,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "@/context/AuthContext";
import {
  subscribeFriendsStore,
  getFriendStatus,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  removeFriend,
} from "@/lib/friendStore.js";
import { getStoredRealUsers, subscribeUserRegistry } from "@/lib/userRegistry.js";
import { resolveUserAvatar } from "@/lib/avatarCache.js";
import { UserAvatar } from "@/components/UserAvatar";
import { useCall } from "@/components/calls/CallProvider";

const ALL_COMMUNITY_USERS = [
  {
    id: "usr-tech-rajesh",
    name: "Rajesh Tamang",
    displayName: "Rajesh Tamang (AC Specialist)",
    role: "TECHNICIAN",
    email: "rajesh@phidim.np",
    phone: "+977 9862111111",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    bio: "Senior AC Cooling & Electrical Technician in Phidim Ward 4.",
    location: "Phidim-4, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-saraswati",
    name: "Saraswati Subedi",
    displayName: "Saraswati Subedi",
    role: "USER",
    email: "saraswati@phidim.np",
    phone: "+977 9822222222",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    bio: "Homeowner in Phidim Ward 2. Frequent service customer.",
    location: "Phidim-2, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-bikash",
    name: "Bikash Thapa",
    displayName: "Bikash Thapa",
    role: "USER",
    email: "bikash@phidim.np",
    phone: "+977 9833333333",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    bio: "Store manager at Main Bazar Phidim.",
    location: "Main Bazar, Phidim",
    online: false,
  },
  {
    id: "usr-tech-anita",
    name: "Anita Gurung",
    displayName: "Anita Gurung (Fiber Expert)",
    role: "TECHNICIAN",
    email: "anita@phidim.np",
    phone: "+977 9844444444",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    bio: "DishHome Fiber Optic splicing & network setup specialist.",
    location: "Yokok, Panchthar",
    online: true,
  },
  {
    id: "usr-tech-suman",
    name: "Suman Limbu",
    displayName: "Suman Limbu",
    role: "TECHNICIAN",
    email: "suman@phidim.np",
    phone: "+977 9855555555",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    bio: "Master Electrician & Plumber in Panchthar district.",
    location: "Phidim-1, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-semik",
    name: "Semik Serma",
    displayName: "Semik Serma",
    role: "USER",
    email: "semikserma@gmail.com",
    phone: "+977 9862772400",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    bio: "Registered customer & Panchthar community member.",
    location: "Phidim-1, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-pooja",
    name: "Pooja Karki",
    displayName: "Pooja Karki",
    role: "USER",
    email: "pooja@phidim.np",
    phone: "+977 9866666666",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    bio: "Resident of Phidim Ward 3, Panchthar.",
    location: "Phidim-3, Panchthar",
    online: true,
  },
  {
    id: "usr-tech-kiran",
    name: "Kiran Gurung",
    displayName: "Kiran Gurung (CCTV Specialist)",
    role: "TECHNICIAN",
    email: "kiran@phidim.np",
    phone: "+977 9877777777",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
    bio: "CCTV Security Systems & Smart Alarm technician.",
    location: "Phidim Bazar, Panchthar",
    online: true,
  },
  {
    id: "usr-cust-sunil",
    name: "Sunil Sherpa",
    displayName: "Sunil Sherpa",
    role: "USER",
    email: "sunil@phidim.np",
    phone: "+977 9888888888",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    bio: "Hotel proprietor in Phidim main square.",
    location: "Main Bazar, Phidim",
    online: false,
  },
  {
    id: "usr-cust-webdev",
    name: "Web Developer",
    displayName: "Web Developer",
    role: "USER",
    email: "webdeveloper@phidim.np",
    phone: "+977 9862000111",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    bio: "Registered Web Developer & Panchthar community member.",
    location: "Phidim-1, Panchthar",
    online: true,
  },
  {
    id: "usr-admin-dhanraj",
    name: "Dhanraj Serma",
    displayName: "Dhanraj Serma (Master Admin)",
    role: "ADMIN",
    email: "dhanrajserma34@gmail.com",
    phone: "+977 9800000000",
    avatar: "/dhanraj.png",
    bio: "Official Phidim Service System Master Administrator.",
    location: "Phidim HQ, Panchthar",
    online: true,
  },
];

export function CommunityUserDirectory({ onStartChat, onStartCall, onShowToast }) {
  const { user: currentUser } = useAuth();
  const { startCall } = useCall();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [usersList, setUsersList] = useState(ALL_COMMUNITY_USERS);
  const [friendDataVersion, setFriendDataVersion] = useState(0);

  const triggerCall = (friend, type = "video") => {
    if (onStartCall) {
      onStartCall(friend, type);
    } else {
      startCall(friend, type);
    }
  };

  // Subscribe to real user registry and friendStore updates
  useEffect(() => {
    const unsubFriends = subscribeFriendsStore(() => {
      setFriendDataVersion((v) => v + 1);
    });
    const unsubRegistry = subscribeUserRegistry(() => {
      setFriendDataVersion((v) => v + 1);
    });
    return () => {
      unsubFriends();
      unsubRegistry();
    };
  }, []);

  // Fetch real-time users from API and merge with stored real accounts
  useEffect(() => {
    let active = true;
    const fetchUsers = async () => {
      let apiUsers = [];
      try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.users)) {
            apiUsers = data.users;
          }
        }
      } catch (e) {}

      const localRealUsers = getStoredRealUsers();
      const map = new Map();
      [...ALL_COMMUNITY_USERS, ...localRealUsers, ...apiUsers].forEach((u) => {
        if (u && u.email) {
          map.set(u.email.toLowerCase(), {
            ...u,
            avatar: resolveUserAvatar(u),
          });
        }
      });

      if (active) {
        setUsersList(Array.from(map.values()));
      }
    };

    const timer = setTimeout(fetchUsers, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery, friendDataVersion]);

  // Keep ALL users so user can see their own account too
  const baseUsers = usersList;

  const filteredUsers = baseUsers.filter((u) => {
    const matchesQuery =
      !searchQuery.trim() ||
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;

    return matchesQuery && matchesRole;
  });

  const techCount = baseUsers.filter((u) => u.role === "TECHNICIAN").length;
  const custCount = baseUsers.filter((u) => u.role === "USER").length;
  const adminCount = baseUsers.filter((u) => u.role === "ADMIN").length;

  const handleSendRequest = (targetUser) => {
    sendFriendRequest({ senderUser: currentUser, receiverUser: targetUser });
    if (onShowToast) onShowToast(`Friend request sent to ${targetUser.displayName || targetUser.name}!`);
  };

  const handleCancelRequest = (targetUser) => {
    declineFriendRequest(currentUser?.email, targetUser.email);
    if (onShowToast) onShowToast(`Cancelled request to ${targetUser.displayName || targetUser.name}.`);
  };

  const handleAcceptRequest = (targetUser) => {
    acceptFriendRequest(currentUser?.email, targetUser.email);
    if (onShowToast) onShowToast(`You are now friends with ${targetUser.displayName || targetUser.name}! 🎉`);
  };

  const handleDeclineRequest = (targetUser) => {
    declineFriendRequest(currentUser?.email, targetUser.email);
    if (onShowToast) onShowToast(`Declined request from ${targetUser.displayName || targetUser.name}.`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Title & Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Phidim Registered Users Directory</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="text-emerald-500" size={24} />
            <span>Search All Registered Users & Technicians</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Search all registered customers, field technicians, and admins in Panchthar. Send friend requests, accept/decline incoming requests, or start HD voice & video calls.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-extrabold px-3.5 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            {filteredUsers.length} Users Displayed
          </span>
        </div>
      </div>

      {/* Search Input & Role Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar Input */}
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, email, phone, role..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Role Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setRoleFilter("ALL")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              roleFilter === "ALL"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            All Members ({baseUsers.length})
          </button>

          <button
            onClick={() => setRoleFilter("TECHNICIAN")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              roleFilter === "TECHNICIAN"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            Technicians ({techCount})
          </button>

          <button
            onClick={() => setRoleFilter("USER")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              roleFilter === "USER"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            Customers ({custCount})
          </button>

          <button
            onClick={() => setRoleFilter("ADMIN")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              roleFilter === "ADMIN"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            Admins ({adminCount})
          </button>
        </div>
      </div>

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((u) => {
          const status = getFriendStatus(currentUser?.email, u.email);
          const isSelf = currentUser?.email && u.email?.toLowerCase() === currentUser.email.toLowerCase();

          return (
            <motion.div
              key={u.id || u.email}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl p-5 border transition-all flex flex-col justify-between space-y-4 shadow-sm ${
                isSelf
                  ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500/60 ring-2 ring-emerald-500/20"
                  : "bg-slate-50/70 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    <UserAvatar user={u} size="lg" />
                    {u.online && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                        {u.displayName || u.name}
                      </h4>
                      {isSelf && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-emerald-600 text-white uppercase tracking-wider">
                          YOU
                        </span>
                      )}
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                          u.role === "ADMIN"
                            ? "bg-purple-500/20 text-purple-600 dark:text-purple-300"
                            : u.role === "TECHNICIAN"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"
                            : "bg-blue-500/20 text-blue-600 dark:text-blue-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{u.email}</p>
                    {u.phone && <p className="text-[11px] text-slate-400 font-mono">{u.phone}</p>}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium line-clamp-2 leading-relaxed">
                  {u.bio || "Registered member of Phidim Service platform."}
                </p>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-2">
                {isSelf ? (
                  <div className="w-full py-2 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs border border-emerald-500/30 text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>Your Active Profile</span>
                  </div>
                ) : status === "friends" ? (
                  <div className="flex items-center gap-2">
                    <span className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black border border-emerald-500/20">
                      <UserCheck size={14} /> Friends ✓
                    </span>
                    {onStartChat && (
                      <button
                        onClick={() => onStartChat(u)}
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1 shadow cursor-pointer"
                        title="Chat Message"
                      >
                        <MessageSquare size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => triggerCall(u, "voice")}
                      className="p-2 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                      title="Voice Call"
                    >
                      <Phone size={14} />
                    </button>
                    <button
                      onClick={() => triggerCall(u, "video")}
                      className="p-2 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 hover:bg-teal-500/30 transition-colors cursor-pointer"
                      title="HD Video Call"
                    >
                      <Video size={14} />
                    </button>
                  </div>
                ) : status === "sent" ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Clock size={14} /> Pending Request...
                    </span>
                    <button
                      onClick={() => handleCancelRequest(u)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-rose-100 text-slate-700 dark:text-slate-200 hover:text-rose-600 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                ) : status === "received" ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAcceptRequest(u)}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all cursor-pointer shadow"
                    >
                      Accept Request
                    </button>
                    <button
                      onClick={() => handleDeclineRequest(u)}
                      className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 cursor-pointer"
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSendRequest(u)}
                    className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <UserPlus size={14} />
                    <span>Send Friend Request</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="p-10 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
          No users matching "{searchQuery}" found.
        </div>
      )}
    </div>
  );
}
