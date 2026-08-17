"use client";

import { io } from "socket.io-client";

let socket = null;

export function getSocket() {
  if (typeof window === "undefined") return null;

  if (!socket) {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";
    socket = io(socketUrl, {
      autoConnect: true,
      withCredentials: true,
      transports: ["websocket", "polling"],
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

const socketInstance = typeof window !== "undefined" ? getSocket() : {
  emit: () => {},
  on: () => {},
  off: () => {},
  disconnect: () => {},
  connected: false,
};

export default socketInstance;
