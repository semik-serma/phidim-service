"use client";

// Persistent 1-on-1 Chat Store (Client & localStorage backed with Server Sync)
// Uses symmetric canonical conversation keys so conversation history is isolated,
// correctly attributed to sender/recipient, and synced in real time.

const CHAT_STORAGE_KEY = "phidim_chat_messages_v3";
const CHAT_CHANNEL_NAME = "phidim_chat_realtime_v3";

let chatBroadcastChannel = null;
if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  try {
    chatBroadcastChannel = new BroadcastChannel(CHAT_CHANNEL_NAME);
  } catch (e) {}
}

export function getCanonicalConvId(u1, u2) {
  const clean1 = String(u1 || "").toLowerCase().trim();
  const clean2 = String(u2 || "").toLowerCase().trim();
  if (!clean1 && !clean2) return "conv__general";
  if (!clean1) return `conv__${clean2}`;
  if (!clean2) return `conv__${clean1}`;
  return `conv__${[clean1, clean2].sort().join("__")}`;
}

export function playMessageChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // A5

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {}
}

function getInitialChatData() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {};
}

const chatListeners = new Set();

function saveChatData(data) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("phidim_chat_updated"));
    } catch (e) {}
  }
  chatListeners.forEach((fn) => fn(data));
}

// Broadcast incoming real-time chat event to all browser tabs
function broadcastChatEvent(type, payload) {
  if (typeof window === "undefined") return;
  const eventData = { type, payload, timestamp: Date.now() };

  if (chatBroadcastChannel) {
    try {
      chatBroadcastChannel.postMessage(eventData);
    } catch (e) {}
  }

  try {
    localStorage.setItem("phidim_chat_sync_event", JSON.stringify(eventData));
  } catch (e) {}

  try {
    window.dispatchEvent(new CustomEvent("phidim_chat_message_received", { detail: eventData }));
  } catch (e) {}
}

export function subscribeChatStore(callback) {
  chatListeners.add(callback);

  if (typeof window !== "undefined") {
    const updateHandler = () => callback(getInitialChatData());
    window.addEventListener("phidim_chat_updated", updateHandler);

    // Cross-tab BroadcastChannel listener
    const bcHandler = (e) => {
      if (e.data && e.data.type) {
        callback(getInitialChatData());
      }
    };
    if (chatBroadcastChannel) {
      chatBroadcastChannel.addEventListener("message", bcHandler);
    }

    // Cross-tab storage event listener
    const storageHandler = (e) => {
      if (e.key === "phidim_chat_sync_event" && e.newValue) {
        callback(getInitialChatData());
      }
    };
    window.addEventListener("storage", storageHandler);

    return () => {
      chatListeners.delete(callback);
      window.removeEventListener("phidim_chat_updated", updateHandler);
      if (chatBroadcastChannel) {
        chatBroadcastChannel.removeEventListener("message", bcHandler);
      }
      window.removeEventListener("storage", storageHandler);
    };
  }

  return () => chatListeners.delete(callback);
}

export function getConversationMessages(currentUserIdentifier, partnerIdentifier) {
  const data = getInitialChatData();
  const convKey = getCanonicalConvId(currentUserIdentifier, partnerIdentifier);
  return data[convKey] || [];
}

export async function saveMessageToConversation(currentUserIdentifier, partnerIdentifier, messageObj) {
  const data = getInitialChatData();
  const convKey = getCanonicalConvId(currentUserIdentifier, partnerIdentifier);
  const list = data[convKey] || [];

  const completeMsg = {
    id: messageObj.id || `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    senderId: messageObj.senderId || currentUserIdentifier || "",
    senderEmail: (messageObj.senderEmail || currentUserIdentifier || "").toLowerCase(),
    senderName: messageObj.senderName || "User",
    senderAvatar: messageObj.senderAvatar || "",
    recipientId: messageObj.recipientId || partnerIdentifier || "",
    recipientEmail: (messageObj.recipientEmail || partnerIdentifier || "").toLowerCase(),
    text: messageObj.text,
    timestamp: messageObj.timestamp || Date.now(),
    time: messageObj.time || new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true }),
    status: messageObj.status || "sent",
    attachment: messageObj.attachment || null,
    reaction: messageObj.reaction || null,
  };

  // Prevent exact ID duplicates
  if (!list.some((m) => m.id === completeMsg.id)) {
    list.push(completeMsg);
    data[convKey] = list;
    saveChatData(data);
    broadcastChatEvent("NEW_MESSAGE", { conversationId: convKey, message: completeMsg });

    // Sync to backend API
    try {
      fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "SEND", conversationId: convKey, message: completeMsg }),
      }).catch(() => {});
    } catch (e) {}
  }

  return data[convKey];
}

export async function fetchServerMessagesForConversation(currentUserIdentifier, partnerIdentifier) {
  const convKey = getCanonicalConvId(currentUserIdentifier, partnerIdentifier);
  try {
    const res = await fetch(`/api/chat/messages?conversationId=${encodeURIComponent(convKey)}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.messages) && json.messages.length > 0) {
        const data = getInitialChatData();
        data[convKey] = json.messages;
        saveChatData(data);
        return json.messages;
      }
    }
  } catch (e) {}
  return getConversationMessages(currentUserIdentifier, partnerIdentifier);
}

export function deleteMessageFromConversation(currentUserIdentifier, partnerIdentifier, messageId) {
  const data = getInitialChatData();
  const convKey = getCanonicalConvId(currentUserIdentifier, partnerIdentifier);
  const list = data[convKey] || [];
  data[convKey] = list.filter((m) => m.id !== messageId);
  saveChatData(data);
  broadcastChatEvent("DELETE_MESSAGE", { conversationId: convKey, messageId });

  try {
    fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "DELETE", conversationId: convKey, messageId }),
    }).catch(() => {});
  } catch (e) {}

  return data[convKey];
}

export function addMessageReaction(currentUserIdentifier, partnerIdentifier, messageId, emoji) {
  const data = getInitialChatData();
  const convKey = getCanonicalConvId(currentUserIdentifier, partnerIdentifier);
  const list = data[convKey] || [];
  data[convKey] = list.map((m) => (m.id === messageId ? { ...m, reaction: emoji } : m));
  saveChatData(data);
  broadcastChatEvent("REACTION", { conversationId: convKey, messageId, emoji });

  try {
    fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "REACTION", conversationId: convKey, messageId, emoji }),
    }).catch(() => {});
  } catch (e) {}

  return data[convKey];
}

export function clearConversationMessages(currentUserIdentifier, partnerIdentifier) {
  const data = getInitialChatData();
  const convKey = getCanonicalConvId(currentUserIdentifier, partnerIdentifier);
  data[convKey] = [];
  saveChatData(data);
  broadcastChatEvent("CLEAR", { conversationId: convKey });

  try {
    fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "CLEAR", conversationId: convKey }),
    }).catch(() => {});
  } catch (e) {}

  return [];
}
