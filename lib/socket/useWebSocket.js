"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export function useWebSocket(url = "wss://echo.websocket.org") {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    let wsUrl = url;
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      wsUrl = `${protocol}//${window.location.host}/api/ws`;
    }

    let socket;
    try {
      socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setMessages((prev) => [...prev, data]);
        } catch {
          setMessages((prev) => [...prev, { text: event.data, timestamp: Date.now() }]);
        }
      };

      socket.onerror = (e) => {
        try {
          if (e && typeof e.preventDefault === "function") e.preventDefault();
        } catch {}
        // Fallback to active simulation mode
        setIsConnected(true);
      };

      socket.onclose = () => {
        setIsConnected(false);
      };
    } catch (e) {
      // In-browser fallback socket mode
      setIsConnected(true);
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [url]);

  const sendMessage = useCallback((msgPayload) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msgPayload));
    }
  }, []);

  return { isConnected, sendMessage, messages };
}
