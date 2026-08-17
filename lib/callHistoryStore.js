"use client";

// Persistent Call History Store (Client & localStorage backed)
// Stores call records (incoming, outgoing, missed, video/voice, duration, timestamps)

const CALL_HISTORY_STORAGE_KEY = "phidim_call_history_v1";

function getInitialCallHistory() {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(CALL_HISTORY_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  const defaultHistory = [
    {
      id: "call-log-1",
      caller: {
        name: "Prakash Sir Core-it Dharan Cloud Hosting",
        email: "prakash@phidim.np",
        role: "TECHNICIAN",
        phone: "+977 9862771122",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      },
      recipient: {
        name: "Dhanraj Serma",
        email: "dhanrajserma34@gmail.com",
        role: "ADMIN",
      },
      direction: "INCOMING",
      callType: "video",
      status: "COMPLETED",
      durationSeconds: 312,
      durationFormatted: "5m 12s",
      timestamp: Date.now() - 3600000 * 2,
      timeFormatted: "Today, 7:12 AM",
    },
    {
      id: "call-log-2",
      caller: {
        name: "Dhanraj Serma",
        email: "dhanrajserma34@gmail.com",
        role: "ADMIN",
      },
      recipient: {
        name: "Rajesh Tamang (AC Specialist)",
        email: "rajesh.tamang@phidim.np",
        role: "TECHNICIAN",
        phone: "+977 9862772457",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      },
      direction: "OUTGOING",
      callType: "voice",
      status: "COMPLETED",
      durationSeconds: 145,
      durationFormatted: "2m 25s",
      timestamp: Date.now() - 3600000 * 18,
      timeFormatted: "Yesterday, 8:40 PM",
    },
    {
      id: "call-log-3",
      caller: {
        name: "Rajesh Tamang (AC Specialist)",
        email: "rajesh.tamang@phidim.np",
        role: "TECHNICIAN",
        phone: "+977 9862772457",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      },
      recipient: {
        name: "Dhanraj Serma",
        email: "dhanrajserma34@gmail.com",
        role: "ADMIN",
      },
      direction: "INCOMING",
      callType: "voice",
      status: "MISSED",
      durationSeconds: 0,
      durationFormatted: "Missed",
      timestamp: Date.now() - 3600000 * 24,
      timeFormatted: "Yesterday, 2:15 PM",
    },
    {
      id: "call-log-4",
      caller: {
        name: "Anita Gurung (Customer)",
        email: "anita.gurung@gmail.com",
        role: "USER",
        phone: "+977 9804567890",
      },
      recipient: {
        name: "Dhanraj Serma",
        email: "dhanrajserma34@gmail.com",
        role: "ADMIN",
      },
      direction: "INCOMING",
      callType: "video",
      status: "COMPLETED",
      durationSeconds: 490,
      durationFormatted: "8m 10s",
      timestamp: Date.now() - 3600000 * 72,
      timeFormatted: "August 6, 11:20 AM",
    },
  ];

  try {
    localStorage.setItem(CALL_HISTORY_STORAGE_KEY, JSON.stringify(defaultHistory));
  } catch (e) {}

  return defaultHistory;
}

const historyListeners = new Set();

function saveCallHistoryData(list) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CALL_HISTORY_STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new Event("phidim_call_history_updated"));
    } catch (e) {}
  }
  historyListeners.forEach((fn) => fn(list));
}

export function subscribeCallHistory(callback) {
  historyListeners.add(callback);
  if (typeof window !== "undefined") {
    const handler = () => callback(getInitialCallHistory());
    window.addEventListener("phidim_call_history_updated", handler);
    return () => {
      historyListeners.delete(callback);
      window.removeEventListener("phidim_call_history_updated", handler);
    };
  }
  return () => historyListeners.delete(callback);
}

export function getCallHistoryList(currentUserEmail) {
  const all = getInitialCallHistory();
  if (!currentUserEmail) return all;

  const email = currentUserEmail.toLowerCase().trim();
  return all.filter(
    (c) =>
      (c.caller?.email || "").toLowerCase() === email ||
      (c.recipient?.email || "").toLowerCase() === email
  );
}

export function recordCallHistoryEntry({
  caller,
  recipient,
  callType = "video",
  status = "COMPLETED",
  durationSeconds = 0,
  currentUserEmail,
}) {
  const currentList = getInitialCallHistory();

  const isOutgoing = (caller?.email || "").toLowerCase() === (currentUserEmail || "").toLowerCase();

  const formatDuration = (sec) => {
    if (!sec || status === "MISSED" || status === "DECLINED") {
      return status === "MISSED" ? "Missed" : "Declined";
    }
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    if (mins === 0) return `${remainder}s`;
    return `${mins}m ${remainder}s`;
  };

  const newEntry = {
    id: `call-log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    caller: caller || { name: "Technician / User", email: "user@phidim.np" },
    recipient: recipient || { name: "Client / Recipient", email: "client@phidim.np" },
    direction: isOutgoing ? "OUTGOING" : "INCOMING",
    callType,
    status,
    durationSeconds,
    durationFormatted: formatDuration(durationSeconds),
    timestamp: Date.now(),
    timeFormatted: new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
  };

  const updated = [newEntry, ...currentList];
  saveCallHistoryData(updated);
  return newEntry;
}

export function deleteCallHistoryEntry(logId) {
  const currentList = getInitialCallHistory();
  const filtered = currentList.filter((c) => c.id !== logId);
  saveCallHistoryData(filtered);
  return filtered;
}

export function clearAllCallHistory() {
  saveCallHistoryData([]);
  return [];
}
