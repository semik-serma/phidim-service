"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  MessageSquare,
  Phone,
  Video,
  Send,
  Plus,
  Paperclip,
  CheckCheck,
  Check,
  Search,
  MoreVertical,
  Smile,
  Users,
  Image as ImageIcon,
  Sparkles,
  PhoneCall,
  X,
  MapPin,
  Trash2,
  Copy,
  Info,
  ShieldCheck,
  Wrench,
  User,
  ArrowLeft,
  ChevronRight,
  Clock,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  getConversationMessages,
  saveMessageToConversation,
  deleteMessageFromConversation,
  addMessageReaction,
  clearConversationMessages,
  fetchServerMessagesForConversation,
  subscribeChatStore,
  playMessageChime,
} from "@/lib/chatStore.js";
import { getStoredRealUsers, DEFAULT_REAL_USERS, subscribeUserRegistry } from "@/lib/userRegistry.js";
import { getMyFriendsList, subscribeFriendsStore } from "@/lib/friendStore.js";
import { useAuth } from "@/context/AuthContext";
import { UserAvatar } from "@/components/UserAvatar";
import { useCall } from "@/components/calls/CallProvider";

const QUICK_SERVICE_PROMPTS = [
  "Hello! Is a technician available for doorstep service today?",
  "Can I get an estimated cost for AC servicing & repair?",
  "I have shared my service address in Phidim.",
  "Please call me when you are on the way.",
];

const EMOJI_LIST = ["👍", "❤️", "🔥", "👏", "😊", "🙏", "✅", "⚡"];

export function DirectChatSection({
  onOpenCreateArticleModal,
  onStartCall,
  activePartner,
  onSelectPartner,
}) {
  const { user: currentUser } = useAuth();
  const { startCall } = useCall() || {};

  const [selectedUser, setSelectedUser] = useState(activePartner || null);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL"); // "ALL" | "TECHNICIAN" | "ADMIN" | "USER"
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showContactDrawer, setShowContactDrawer] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [chatVersion, setChatVersion] = useState(0);
  const [registryVersion, setRegistryVersion] = useState(0);
  const [apiUsers, setApiUsers] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync external activePartner prop
  useEffect(() => {
    if (activePartner) {
      setSelectedUser(activePartner);
    }
  }, [activePartner]);

  // Fetch real users from backend API
  useEffect(() => {
    let active = true;
    const loadApiUsers = async () => {
      try {
        const res = await fetch("/api/users/search?limit=200");
        if (res.ok) {
          const json = await res.json();
          if (active && json.success && Array.isArray(json.users)) {
            setApiUsers(json.users);
          }
        }
      } catch (e) {}
    };
    loadApiUsers();
    return () => {
      active = false;
    };
  }, [registryVersion]);

  // Subscribe to real-time chat updates and user registry
  useEffect(() => {
    const unsubChat = subscribeChatStore(() => {
      setChatVersion((v) => v + 1);
    });
    const unsubRegistry = subscribeUserRegistry(() => {
      setRegistryVersion((v) => v + 1);
    });
    const unsubFriends = subscribeFriendsStore(() => {
      setRegistryVersion((v) => v + 1);
    });

    return () => {
      unsubChat();
      unsubRegistry();
      unsubFriends();
    };
  }, []);

  // Construct comprehensive list of all real users
  const contacts = useMemo(() => {
    const localReal = getStoredRealUsers();
    const myEmail = (currentUser?.email || "").toLowerCase().trim();
    const map = new Map();

    [...DEFAULT_REAL_USERS, ...localReal, ...apiUsers].forEach((u) => {
      if (u && (u.email || u.id)) {
        const key = (u.email || u.id).toLowerCase().trim();
        if (key && key !== myEmail) {
          map.set(key, {
            ...u,
            displayName: u.displayName || u.name || key.split("@")[0] || "User",
            role: u.role || "USER",
            online: u.online !== false,
          });
        }
      }
    });

    return Array.from(map.values());
  }, [currentUser?.email, registryVersion, apiUsers]);

  // Filter contacts by query & tab
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const name = (c.displayName || c.name || "").toLowerCase();
      const email = (c.email || "").toLowerCase();
      const role = (c.role || "").toUpperCase();
      const phone = (c.phone || "").toLowerCase();
      const q = searchQuery.toLowerCase().trim();

      const matchesQuery = !q || name.includes(q) || email.includes(q) || phone.includes(q) || role.includes(q);

      if (!matchesQuery) return false;

      if (activeFilter === "ALL") return true;
      if (activeFilter === "TECHNICIAN") return role === "TECHNICIAN";
      if (activeFilter === "ADMIN") return role === "ADMIN";
      if (activeFilter === "USER") return role === "USER" || role === "CUSTOMER";
      return true;
    });
  }, [contacts, searchQuery, activeFilter]);

  // Set initial selected user if none selected
  useEffect(() => {
    if (!selectedUser && filteredContacts.length > 0) {
      setSelectedUser(filteredContacts[0]);
    }
  }, [selectedUser, filteredContacts]);

  // Current active conversation messages
  const myIdentifier = currentUser?.email || currentUser?.id || "current-user";
  const partnerIdentifier = selectedUser?.email || selectedUser?.id || "partner";

  const messages = useMemo(() => {
    if (!selectedUser) return [];
    return getConversationMessages(myIdentifier, partnerIdentifier);
  }, [myIdentifier, partnerIdentifier, chatVersion, selectedUser]);

  // Fetch fresh messages on conversation select
  useEffect(() => {
    if (selectedUser) {
      fetchServerMessagesForConversation(myIdentifier, partnerIdentifier);
    }
  }, [selectedUser, myIdentifier, partnerIdentifier]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Direct Call Trigger (HD Video or Voice Call)
  const handleInitiateCall = (type = "video") => {
    if (!selectedUser) return;
    if (typeof startCall === "function") {
      startCall(selectedUser, type);
    } else if (typeof onStartCall === "function") {
      onStartCall(selectedUser, type);
    }
  };

  // Send Message Handler
  const handleSendMessage = async (customText = null) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || !selectedUser) return;

    const newMsgObj = {
      senderId: currentUser?.id || myIdentifier,
      senderEmail: (currentUser?.email || "").toLowerCase(),
      senderName: currentUser?.displayName || currentUser?.name || "User",
      senderAvatar: currentUser?.avatar || "",
      recipientId: selectedUser?.id || partnerIdentifier,
      recipientEmail: (selectedUser?.email || "").toLowerCase(),
      text: textToSend,
      timestamp: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }),
      status: "sent",
    };

    await saveMessageToConversation(myIdentifier, partnerIdentifier, newMsgObj);
    if (!customText) setInputText("");
    setShowEmojiPicker(false);
    setShowAttachMenu(false);
    playMessageChime();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Role pill styles
  const getRoleBadge = (role) => {
    const r = (role || "").toUpperCase();
    if (r === "ADMIN") {
      return {
        label: "Admin",
        icon: ShieldCheck,
        bg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
      };
    }
    if (r === "TECHNICIAN") {
      return {
        label: "Technician",
        icon: Wrench,
        bg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      };
    }
    return {
      label: "Customer",
      icon: User,
      bg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    };
  };

  return (
    <div className="relative w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[740px] max-h-[88vh]">
      {/* Top Main Application Hub Bar */}
      <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <MessageSquare size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black tracking-tight text-white">Live Messages & Dispatch Hub</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Real-Time
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Direct peer-to-peer messaging, encrypted communication, and instant HD calling.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowNewChatModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all active:scale-95"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Messaging Body: Sidebar + Chat Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* ── Left Sidebar: Conversations & Directory ── */}
        <div
          className={`w-full md:w-[340px] lg:w-[380px] border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col shrink-0 transition-all ${
            selectedUser ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Search Box */}
          <div className="p-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search people, technicians, admin..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: "ALL", label: "All" },
                { id: "TECHNICIAN", label: "Technicians" },
                { id: "ADMIN", label: "Admin" },
                { id: "USER", label: "Users" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all cursor-pointer shrink-0 ${
                    activeFilter === tab.id
                      ? "bg-slate-900 dark:bg-emerald-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200/60 dark:border-slate-700/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations / Contact List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-2 space-y-1">
            {filteredContacts.length === 0 ? (
              <div className="py-12 text-center text-slate-400 px-4">
                <Users size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                <p className="text-xs font-bold">No contacts found matching &ldquo;{searchQuery}&rdquo;</p>
              </div>
            ) : (
              filteredContacts.map((contact) => {
                const cKey = contact.email || contact.id;
                const isSelected = selectedUser && (selectedUser.email === contact.email || selectedUser.id === contact.id);
                const convMsgs = getConversationMessages(myIdentifier, cKey);
                const lastMsg = convMsgs[convMsgs.length - 1];
                const badge = getRoleBadge(contact.role);
                const BadgeIcon = badge.icon;

                return (
                  <div
                    key={cKey}
                    onClick={() => {
                      setSelectedUser(contact);
                      if (onSelectPartner) onSelectPartner(contact);
                    }}
                    className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-3 relative ${
                      isSelected
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 shadow-sm"
                        : "hover:bg-white dark:hover:bg-slate-800/60 border border-transparent"
                    }`}
                  >
                    {/* User Avatar with Online Dot */}
                    <div className="relative shrink-0">
                      <UserAvatar user={contact} size="md" />
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full ring-2 ring-white dark:ring-slate-900 ${
                          contact.online ? "bg-emerald-500" : "bg-slate-400"
                        }`}
                      />
                    </div>

                    {/* Contact Info & Last Message */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                          {contact.displayName || contact.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                          {lastMsg ? lastMsg.time : ""}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-black uppercase border ${badge.bg}`}
                        >
                          <BadgeIcon size={10} />
                          {badge.label}
                        </span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex-1">
                          {lastMsg ? lastMsg.text : contact.bio || contact.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Right: Active Chat View Area ── */}
        <div
          className={`flex-1 flex flex-col bg-white dark:bg-slate-900 transition-all ${
            selectedUser ? "flex" : "hidden md:flex"
          }`}
        >
          {selectedUser ? (
            <>
              {/* Active Conversation Header */}
              <div className="px-4 sm:px-6 py-3.5 bg-slate-50/80 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 md:hidden"
                    title="Back to conversations"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <div className="relative shrink-0">
                    <UserAvatar user={selectedUser} size="md" />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ring-2 ring-white dark:ring-slate-900 ${
                        selectedUser.online ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                      }`}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-black text-slate-900 dark:text-white truncate">
                        {selectedUser.displayName || selectedUser.name}
                      </h3>
                      {(() => {
                        const b = getRoleBadge(selectedUser.role);
                        const IconComponent = b.icon;
                        return (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${b.bg}`}
                          >
                            <IconComponent size={10} />
                            {b.label}
                          </span>
                        );
                      })()}
                    </div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {selectedUser.online ? "Online & Ready for service" : "Offline"}
                    </p>
                  </div>
                </div>

                {/* Top Action Buttons: Voice Call, Video Call, Details */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => handleInitiateCall("voice")}
                    className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 hover:dark:bg-emerald-950/50 text-slate-700 dark:text-slate-200 hover:text-emerald-600 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-bold"
                    title="Start Live Voice Call"
                  >
                    <Phone size={16} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="hidden lg:inline">Voice Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleInitiateCall("video")}
                    className="p-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all cursor-pointer shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-black"
                    title="Start HD Video Call"
                  >
                    <Video size={16} />
                    <span className="hidden lg:inline">Video Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowContactDrawer(!showContactDrawer)}
                    className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer"
                    title="View User Details"
                  >
                    <Info size={16} />
                  </button>
                </div>
              </div>

              {/* Message Stream Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40 dark:bg-[#070f0d]/40">
                {/* Security Banner */}
                <div className="max-w-md mx-auto py-1.5 px-3 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 text-[10px] font-bold text-center border border-slate-300/40 dark:border-slate-700/40 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span>Messages and HD calls are end-to-end synchronized across Phidim Service.</span>
                </div>

                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 max-w-md mx-auto space-y-4">
                    <div className="p-4 rounded-3xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <Sparkles size={32} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">
                        Start conversation with {selectedUser.displayName || selectedUser.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Send a message or tap one of the quick suggestions below to initiate doorstep service discussion.
                      </p>
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="w-full space-y-2 pt-2">
                      {QUICK_SERVICE_PROMPTS.map((prompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(prompt)}
                          className="w-full text-left p-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 text-xs font-semibold hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                        >
                          <span className="truncate mr-2">{prompt}</span>
                          <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe =
                      (msg.senderEmail && currentUser?.email && msg.senderEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
                      (msg.senderId && currentUser?.id && msg.senderId === currentUser.id);

                    return (
                      <div
                        key={msg.id}
                        className={`flex items-end gap-2.5 group ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        {!isMe && <UserAvatar user={selectedUser} size="xs" className="mb-1" />}

                        <div className={`relative max-w-[82%] sm:max-w-[70%] space-y-1 ${isMe ? "items-end" : "items-start"}`}>
                          {!isMe && (
                            <span className="text-[10px] font-bold text-slate-400 px-1">
                              {msg.senderName || selectedUser.displayName || selectedUser.name}
                            </span>
                          )}

                          <div
                            className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm break-words relative ${
                              isMe
                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-xs shadow-emerald-600/10"
                                : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-xs border border-slate-200/80 dark:border-slate-700/80"
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{msg.text}</p>

                            {/* Message Reaction Badge */}
                            {msg.reaction && (
                              <span className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-full bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700 text-xs">
                                {msg.reaction}
                              </span>
                            )}
                          </div>

                          {/* Time & Delivery Checkmark */}
                          <div className={`flex items-center gap-1 text-[10px] text-slate-400 px-1 ${isMe ? "justify-end" : "justify-start"}`}>
                            <span>{msg.time}</span>
                            {isMe && <CheckCheck size={13} className="text-emerald-500" />}
                          </div>
                        </div>

                        {/* Reaction Trigger on Hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 self-center pb-3">
                          <button
                            type="button"
                            onClick={() => addMessageReaction(myIdentifier, partnerIdentifier, msg.id, "❤️")}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs"
                            title="Heart"
                          >
                            ❤️
                          </button>
                          <button
                            type="button"
                            onClick={() => addMessageReaction(myIdentifier, partnerIdentifier, msg.id, "👍")}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs"
                            title="Thumbs Up"
                          >
                            👍
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Composer & Input Bar */}
              <div className="p-3 sm:p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shrink-0">
                {/* Emoji Picker Popover */}
                {showEmojiPicker && (
                  <div className="mb-2 p-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-2 flex-wrap">
                    {EMOJI_LIST.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setInputText((prev) => prev + emoji);
                          setShowEmojiPicker(false);
                          inputRef.current?.focus();
                        }}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-lg hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {/* Emoji Trigger */}
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer shrink-0"
                    title="Insert Emoji"
                  >
                    <Smile size={18} />
                  </button>

                  {/* Text Input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Message ${selectedUser.displayName || selectedUser.name}...`}
                    className="flex-1 px-4 py-3 bg-slate-100/80 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
                  />

                  {/* Send Button */}
                  <button
                    type="button"
                    onClick={() => handleSendMessage()}
                    disabled={!inputText.trim()}
                    className="p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white disabled:opacity-40 disabled:hover:scale-100 transition-all cursor-pointer shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center"
                    title="Send Message (Enter)"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
              <div className="p-4 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400">
                <MessageSquare size={36} />
              </div>
              <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">Select a conversation</h3>
              <p className="text-xs max-w-xs text-slate-400">
                Choose a customer, technician, or administrator from the left sidebar to start chatting.
              </p>
            </div>
          )}
        </div>

        {/* ── Contact Details Slide-Over Drawer ── */}
        {showContactDrawer && selectedUser && (
          <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 flex flex-col space-y-6 shrink-0 absolute right-0 top-0 bottom-0 z-30 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Contact Profile</h4>
              <button
                type="button"
                onClick={() => setShowContactDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="text-center space-y-3">
              <UserAvatar user={selectedUser} size="xl" className="mx-auto shadow-lg ring-4 ring-emerald-500/20" />
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {selectedUser.displayName || selectedUser.name}
                </h3>
                <p className="text-xs text-slate-500">{selectedUser.email}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs divide-y divide-slate-100 dark:divide-slate-800/60">
              {selectedUser.phone && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400 font-bold">Phone:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-bold">{selectedUser.phone}</span>
                </div>
              )}
              {selectedUser.location && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-400 font-bold">Location:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">{selectedUser.location}</span>
                </div>
              )}
              {selectedUser.bio && (
                <div className="pt-2">
                  <span className="text-slate-400 font-bold block mb-1">About:</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{selectedUser.bio}</p>
                </div>
              )}
            </div>

            {/* Calling Quick Actions */}
            <div className="pt-4 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowContactDrawer(false);
                  handleInitiateCall("video");
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                <Video size={15} />
                <span>Start Video Meeting</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowContactDrawer(false);
                  handleInitiateCall("voice");
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <Phone size={15} />
                <span>Voice Call</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── New Chat / User Selection Modal ── */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">Start New Conversation</h3>
                <p className="text-xs text-slate-500">Select any registered member in Panchthar to begin live chat.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowNewChatModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
              {contacts.map((c) => {
                const b = getRoleBadge(c.role);
                const IconComponent = b.icon;
                return (
                  <div
                    key={c.email || c.id}
                    onClick={() => {
                      setSelectedUser(c);
                      setShowNewChatModal(false);
                    }}
                    className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar user={c} size="md" />
                      <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                          {c.displayName || c.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase border ${b.bg}`}>
                            {b.label}
                          </span>
                          <span className="text-[11px] text-slate-400">{c.email}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-600 group-hover:text-white text-slate-600 dark:text-slate-300 text-xs font-bold transition-all"
                    >
                      Chat
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
