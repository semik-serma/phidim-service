"use client";

import { useEffect, useRef, useState } from "react";
import socket from "./client.js";

export default function VideoCall() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  const [isCalling, setIsCalling] = useState(false);

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnectionRef.current = peerConnection;

    return peerConnection;
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const peerConnection = createPeerConnection();

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      setIsCalling(true);
    } catch (error) {
      console.error("Camera/microphone error:", error);
    }
  };

  useEffect(() => {
    return () => {
      localStreamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });

      peerConnectionRef.current?.close();
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Video Call Test</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div>
          <h3>You</h3>

          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "12px",
              background: "#111",
            }}
          />
        </div>

        <div>
          <h3>Remote User</h3>

          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "12px",
              background: "#111",
            }}
          />
        </div>
      </div>

      <button
        onClick={startCamera}
        disabled={isCalling}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {isCalling ? "Camera Started" : "Start Camera & Microphone"}
      </button>
    </div>
  );
}
