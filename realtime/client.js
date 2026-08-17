"use client";

import { io } from "socket.io-client";

let socket = null;

const DEFAULT_SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://service.phidimservice.com.np";

export function getSocket() {
  if (typeof window === "undefined") return null;

  if (!socket) {
    socket = io(DEFAULT_SOCKET_URL, {
      autoConnect: true,
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      timeout: 10000,
    });
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function subscribeToEvent(event, callback) {
  const s = getSocket();
  if (!s) return () => {};
  s.on(event, callback);
  return () => s.off(event, callback);
}

const socketInstance = {
  emit: (event, ...args) => {
    const s = getSocket();
    if (s) s.emit(event, ...args);
  },
  on: (event, callback) => {
    const s = getSocket();
    if (s) s.on(event, callback);
  },
  off: (event, callback) => {
    const s = getSocket();
    if (s) s.off(event, callback);
  },
  disconnect: () => {
    disconnectSocket();
  },
  get connected() {
    return socket ? socket.connected : false;
  },
};

export default socketInstance;

