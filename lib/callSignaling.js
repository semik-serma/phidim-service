"use client";

// Cross-tab, Cross-window, Cross-device Real-Time WebRTC Call Signaling Engine
// Powered by Server API (/api/calls/signal), BroadcastChannel, localStorage events, and Web Audio Ringtone Synthesizer

const CALLS_CHANNEL_NAME = "phidim_calls_channel_v2";
const ACTIVE_CALL_STORAGE_KEY = "phidim_active_call_session";

let broadcastChannel = null;
if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  try {
    broadcastChannel = new BroadcastChannel(CALLS_CHANNEL_NAME);
  } catch (e) {
    console.warn("BroadcastChannel not supported or failed:", e);
  }
}

// ── Web Audio Ringtone Synthesizer (Ringing & Busy Sound) ──
let ringtoneInterval = null;
let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playRingtoneSound(type = "incoming") {
  stopRingtoneSound();
  if (typeof window === "undefined") return;

  const playTone = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === "incoming") {
        // High-pitched pleasant phone ring (440Hz + 480Hz)
        osc1.frequency.value = 440;
        osc2.frequency.value = 480;
      } else if (type === "busy") {
        // Busy tone (480Hz + 620Hz fast beeps)
        osc1.frequency.value = 480;
        osc2.frequency.value = 620;
      } else {
        // Outgoing soft ringing chime (400Hz + 450Hz)
        osc1.frequency.value = 400;
        osc2.frequency.value = 450;
      }

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (type === "busy" ? 0.4 : 1.2));

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + (type === "busy" ? 0.4 : 1.2));
      osc2.stop(ctx.currentTime + (type === "busy" ? 0.4 : 1.2));
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  playTone();
  ringtoneInterval = setInterval(playTone, type === "busy" ? 700 : 2500);
}

export function stopRingtoneSound() {
  if (ringtoneInterval) {
    clearInterval(ringtoneInterval);
    ringtoneInterval = null;
  }
}

// ── Signaling State Helpers ──
export function getActiveCallSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ACTIVE_CALL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function broadcastEvent(type, payload) {
  if (typeof window === "undefined") return;

  const eventData = { type, payload, timestamp: Date.now() };

  // 1. BroadcastChannel (fastest across browser tabs)
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage(eventData);
    } catch (e) {}
  }

  // 2. localStorage event (fallback for separate processes/tabs)
  try {
    localStorage.setItem("phidim_call_event_sync", JSON.stringify(eventData));
  } catch (e) {}

  // 3. Same-window CustomEvent
  try {
    window.dispatchEvent(new CustomEvent("phidim_call_event", { detail: eventData }));
  } catch (e) {}
}

// ── Public Call Signaling API ──

export async function initiateCall({ caller, recipient, callType = "video" }) {
  if (typeof window === "undefined") return null;

  const callId = `call_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  let senderTabId = "";
  try {
    if (!sessionStorage.getItem("phidim_tab_session_id")) {
      sessionStorage.setItem("phidim_tab_session_id", "tab-" + Math.random().toString(36).slice(2, 9));
    }
    senderTabId = sessionStorage.getItem("phidim_tab_session_id") || "";
  } catch {}

  const session = {
    callId,
    senderTabId,
    caller: {
      id: caller?.id || "",
      name: caller?.displayName || caller?.name || "Caller",
      email: (caller?.email || "").toLowerCase(),
      avatar: caller?.avatar || caller?.picture || "",
      role: caller?.role || "USER",
      phone: caller?.phone || "",
    },
    recipient: {
      id: recipient?.id || "",
      name: recipient?.displayName || recipient?.name || "Recipient",
      email: (recipient?.email || "").toLowerCase(),
      avatar: recipient?.avatar || recipient?.picture || "",
      role: recipient?.role || "USER",
      phone: recipient?.phone || "",
    },
    callType, // "video" | "voice"
    status: "RINGING", // "RINGING" | "ACCEPTED" | "DECLINED" | "ENDED"
    startedAt: Date.now(),
  };

  try {
    localStorage.setItem(ACTIVE_CALL_STORAGE_KEY, JSON.stringify(session));
  } catch (e) {}

  broadcastEvent("CALL_INITIATED", session);

  // Sync to backend server
  try {
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "INITIATE", session }),
    }).catch(() => {});
  } catch {}

  return session;
}

export async function acceptCall(callId, acceptor) {
  const session = getActiveCallSession() || { callId };
  session.status = "ACCEPTED";
  session.acceptedAt = Date.now();

  try {
    localStorage.setItem(ACTIVE_CALL_STORAGE_KEY, JSON.stringify(session));
  } catch (e) {}

  stopRingtoneSound();
  broadcastEvent("CALL_ACCEPTED", session);

  try {
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "ACCEPT", callId, userEmail: acceptor?.email }),
    }).catch(() => {});
  } catch {}

  return session;
}

export async function declineCall(callId, decliner) {
  const session = getActiveCallSession();
  if (session && session.callId === callId) {
    session.status = "DECLINED";
    try {
      localStorage.setItem(ACTIVE_CALL_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {}
  }

  stopRingtoneSound();
  broadcastEvent("CALL_DECLINED", { callId, decliner });

  try {
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "DECLINE", callId, userEmail: decliner?.email }),
    }).catch(() => {});
  } catch {}

  setTimeout(() => {
    try {
      localStorage.removeItem(ACTIVE_CALL_STORAGE_KEY);
    } catch (e) {}
  }, 1000);
}

export async function endCall(callId) {
  const session = getActiveCallSession();
  stopRingtoneSound();

  if (session && (!callId || session.callId === callId)) {
    session.status = "ENDED";
    try {
      localStorage.removeItem(ACTIVE_CALL_STORAGE_KEY);
    } catch (e) {}
  }

  broadcastEvent("CALL_ENDED", { callId });

  try {
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "END", callId }),
    }).catch(() => {});
  } catch {}
}

// ── WebRTC Signaling Actions ──

export async function sendSdpOffer(callId, sdpOffer, senderEmail) {
  const payload = { callId, sdpOffer, senderEmail };
  broadcastEvent("WEBRTC_OFFER", payload);
  try {
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "OFFER", callId, sdpOffer, senderEmail }),
    }).catch(() => {});
  } catch {}
}

export async function sendSdpAnswer(callId, sdpAnswer, senderEmail) {
  const payload = { callId, sdpAnswer, senderEmail };
  broadcastEvent("WEBRTC_ANSWER", payload);
  try {
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "ANSWER", callId, sdpAnswer, senderEmail }),
    }).catch(() => {});
  } catch {}
}

export async function sendIceCandidate(callId, candidate, senderEmail) {
  const payload = { callId, candidate, senderEmail };
  broadcastEvent("WEBRTC_ICE_CANDIDATE", payload);
  try {
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "ICE_CANDIDATE", callId, candidate, senderEmail }),
    }).catch(() => {});
  } catch {}
}

export async function sendMediaState(callId, mediaState, senderEmail) {
  const payload = { callId, mediaState, senderEmail };
  broadcastEvent("MEDIA_STATE_CHANGED", payload);
  try {
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "MEDIA_STATE", callId, mediaState, senderEmail }),
    }).catch(() => {});
  } catch {}
}

export async function sendInCallChatMessage(callId, message, senderEmail) {
  const payload = { callId, message, senderEmail };
  broadcastEvent("IN_CALL_CHAT_MESSAGE", payload);
  try {
    fetch("/api/calls/signal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "CHAT_MESSAGE", callId, message, senderEmail }),
    }).catch(() => {});
  } catch {}
}

// ── Listener Subscription ──
export function subscribeCallSignaling(userInfo, callback, activeCallId = null) {
  if (typeof window === "undefined") return () => {};

  const userObj = typeof userInfo === "object" && userInfo !== null
    ? userInfo
    : { email: userInfo || "" };

  const normalizedEmail = (userObj.email || "").toLowerCase().trim();
  const normalizedId = (userObj.id || "").toLowerCase().trim();
  const normalizedName = (userObj.name || userObj.displayName || "").toLowerCase().trim();

  const handleMessage = (data) => {
    if (!data || !data.type) return;
    try {
      callback(data.type, data.payload);
    } catch (err) {
      console.warn("Call signaling callback error:", err);
    }
  };

  // 1. BroadcastChannel listener
  const bcHandler = (e) => {
    try {
      handleMessage(e.data);
    } catch {}
  };
  if (broadcastChannel) {
    broadcastChannel.addEventListener("message", bcHandler);
  }

  // 2. Window CustomEvent listener
  const winHandler = (e) => {
    try {
      handleMessage(e.detail);
    } catch {}
  };
  window.addEventListener("phidim_call_event", winHandler);

  // 3. Storage event listener (cross-tab sync)
  const storageHandler = (e) => {
    try {
      if (e.key === "phidim_call_event_sync" && e.newValue) {
        const parsed = JSON.parse(e.newValue);
        handleMessage(parsed);
      }
    } catch {}
  };
  window.addEventListener("storage", storageHandler);

  // 4. Server-Backed Live Polling (Cross-device, Cross-browser, Cross-tab fallback)
  let lastIncomingId = null;
  let lastActiveStatus = null;
  let lastSdpOffer = null;
  let lastSdpAnswer = null;
  let processedCandidates = new Set();
  let processedMessageIds = new Set();

  const pollInterval = setInterval(async () => {
    try {
      // If we are listening for a specific callId, poll that call directly
      if (activeCallId) {
        const res = await fetch(`/api/calls/signal?callId=${encodeURIComponent(activeCallId)}`);
        if (!res.ok) return;
        const data = await res.json();
        const call = data.call;
        if (!call) return;

        // Check SDP Offer
        if (call.sdpOffer && JSON.stringify(call.sdpOffer) !== JSON.stringify(lastSdpOffer)) {
          lastSdpOffer = call.sdpOffer;
          callback("WEBRTC_OFFER", { callId: activeCallId, sdpOffer: call.sdpOffer, senderEmail: call.caller?.email });
        }

        // Check SDP Answer
        if (call.sdpAnswer && JSON.stringify(call.sdpAnswer) !== JSON.stringify(lastSdpAnswer)) {
          lastSdpAnswer = call.sdpAnswer;
          callback("WEBRTC_ANSWER", { callId: activeCallId, sdpAnswer: call.sdpAnswer, senderEmail: call.recipient?.email });
        }

        // Check Candidates (caller & recipient)
        const callerCandidates = call.callerIceCandidates || [];
        const recipientCandidates = call.recipientIceCandidates || [];
        for (const c of callerCandidates) {
          const key = JSON.stringify(c);
          if (!processedCandidates.has(key)) {
            processedCandidates.add(key);
            callback("WEBRTC_ICE_CANDIDATE", { callId: activeCallId, candidate: c, senderEmail: call.caller?.email });
          }
        }
        for (const c of recipientCandidates) {
          const key = JSON.stringify(c);
          if (!processedCandidates.has(key)) {
            processedCandidates.add(key);
            callback("WEBRTC_ICE_CANDIDATE", { callId: activeCallId, candidate: c, senderEmail: call.recipient?.email });
          }
        }

        // Check Messages
        const messages = call.messages || [];
        for (const m of messages) {
          if (!processedMessageIds.has(m.id)) {
            processedMessageIds.add(m.id);
            callback("IN_CALL_CHAT_MESSAGE", { callId: activeCallId, message: m, senderEmail: m.sender });
          }
        }

        // Check Call Status Changes
        if (call.status === "ACCEPTED" && lastActiveStatus !== "ACCEPTED") {
          lastActiveStatus = "ACCEPTED";
          callback("CALL_ACCEPTED", call);
        } else if (call.status === "DECLINED" && lastActiveStatus !== "DECLINED") {
          lastActiveStatus = "DECLINED";
          callback("CALL_DECLINED", call);
        } else if (call.status === "ENDED" && lastActiveStatus !== "ENDED") {
          lastActiveStatus = "ENDED";
          callback("CALL_ENDED", call);
        }

        return;
      }

      // Default user-level polling for incoming/active calls
      const q = new URLSearchParams();
      if (normalizedEmail) q.set("email", normalizedEmail);
      if (normalizedId) q.set("id", normalizedId);
      if (normalizedName) q.set("name", normalizedName);

      const res = await fetch(`/api/calls/signal?${q.toString()}`);
      if (!res.ok) return;
      const data = await res.json();

      if (data.incoming) {
        if (lastIncomingId !== data.incoming.callId) {
          lastIncomingId = data.incoming.callId;
          callback("CALL_INITIATED", data.incoming);
        }
      } else if (lastIncomingId) {
        lastIncomingId = null;
      }

      if (data.active) {
        if (data.active.status === "ACCEPTED" && lastActiveStatus !== "ACCEPTED") {
          lastActiveStatus = "ACCEPTED";
          callback("CALL_ACCEPTED", data.active);
        } else if (data.active.status === "DECLINED" && lastActiveStatus !== "DECLINED") {
          lastActiveStatus = "DECLINED";
          callback("CALL_DECLINED", data.active);
        } else if (data.active.status === "ENDED" && lastActiveStatus !== "ENDED") {
          lastActiveStatus = "ENDED";
          callback("CALL_ENDED", data.active);
        }
      }
    } catch {}
  }, activeCallId ? 400 : 1000);

  return () => {
    if (broadcastChannel) {
      broadcastChannel.removeEventListener("message", bcHandler);
    }
    window.removeEventListener("phidim_call_event", winHandler);
    window.removeEventListener("storage", storageHandler);
    clearInterval(pollInterval);
  };
}
