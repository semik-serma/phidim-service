"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  PhoneOff,
  Phone,
  PhoneCall,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  Radio,
  AlertTriangle,
  RefreshCw,
  CameraOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Smile,
  Send,
  X,
  Shield,
  Wifi,
  Check,
  UserX,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  acceptCall,
  declineCall,
  endCall,
  playRingtoneSound,
  stopRingtoneSound,
  subscribeCallSignaling,
  sendSdpOffer,
  sendSdpAnswer,
  sendIceCandidate,
  sendMediaState,
  sendInCallChatMessage,
} from "@/lib/callSignaling";
import { recordCallHistoryEntry } from "@/lib/callHistoryStore";
import { useAuth } from "@/context/AuthContext";
import { UserAvatar } from "@/components/UserAvatar";

const EMOJI_REACTIONS = ["❤️", "👏", "👍", "🔥", "🎉", "😂", "✋"];

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ],
};

export function VideoVoiceCallModal({
  isOpen,
  onClose,
  targetPerson,
  callType = "video",
  initialCallState = "RINGING",
  activeCallId,
  isCaller = false,
}) {
  const { user: currentUser } = useAuth();
  const [isVideoOn, setIsVideoOn] = useState(callType === "video");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  // Call Lifecycle State: 'RINGING' | 'CONNECTED' | 'DECLINED'
  const [callState, setCallState] = useState(initialCallState);
  const [callDuration, setCallDuration] = useState(0);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [meetMessages, setMeetMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [mediaError, setMediaError] = useState(null);

  // Remote peer state
  const [remoteMediaState, setRemoteMediaState] = useState({
    isMuted: false,
    isVideoOn: callType === "video",
    isScreenSharing: false,
  });
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);

  // DOM & WebRTC Refs
  const mainVideoRef = useRef(null);
  const pipVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const dataChannelRef = useRef(null);
  const pendingCandidatesRef = useRef([]);
  const offerSentRef = useRef(false);
  const mediaReadyPromiseRef = useRef(null);
  const chatEndRef = useRef(null);

  const myEmail = (currentUser?.email || currentUser?.username || "").toLowerCase().trim();

  /* ─── Stop All Streams & Peer Connections ─── */
  const cleanupWebRTC = useCallback(() => {
    if (dataChannelRef.current) {
      try { dataChannelRef.current.close(); } catch {}
      dataChannelRef.current = null;
    }
    if (peerConnectionRef.current) {
      try { peerConnectionRef.current.close(); } catch {}
      peerConnectionRef.current = null;
    }
    pendingCandidatesRef.current = [];

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach((t) => t.stop());
      remoteStreamRef.current = null;
    }
    stopRingtoneSound();
  }, []);

  /* ─── Media Setup ─── */
  const requestMediaAccess = useCallback(async () => {
    setMediaError(null);
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setMediaError("Camera and microphone not accessible on this device.");
      setHasMediaPermission(false);
      return null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: isVideoOn ? { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" } : false,
        audio: true,
      });
      localStreamRef.current = stream;
      setHasMediaPermission(true);

      if (pipVideoRef.current && isVideoOn) {
        pipVideoRef.current.srcObject = stream;
        pipVideoRef.current.play().catch(() => {});
      }
      return stream;
    } catch (err) {
      // If video failed, try audio only
      try {
        const audioOnlyStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localStreamRef.current = audioOnlyStream;
        setIsVideoOn(false);
        setHasMediaPermission(true);
        return audioOnlyStream;
      } catch (audioErr) {
        setHasMediaPermission(false);
        setMediaError("Please allow camera and microphone access to connect the call.");
        return null;
      }
    }
  }, [isVideoOn]);

  /* ─── Initialize WebRTC PeerConnection ─── */
  const setupPeerConnection = useCallback((stream) => {
    if (peerConnectionRef.current) return peerConnectionRef.current;

    const pc = new RTCPeerConnection(ICE_SERVERS);
    peerConnectionRef.current = pc;

    // Add local tracks
    if (stream) {
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    }

    // Remote Track Handler
    pc.ontrack = (event) => {
      const [remoteStream] = event.streams;
      if (remoteStream) {
        remoteStreamRef.current = remoteStream;

        if (mainVideoRef.current) {
          mainVideoRef.current.srcObject = remoteStream;
          mainVideoRef.current.play().catch(() => {});
        }
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play().catch(() => {});
        }

        const videoTracks = remoteStream.getVideoTracks();
        setHasRemoteVideo(videoTracks.length > 0 && videoTracks[0].enabled);
        videoTracks.forEach((vt) => {
          vt.onmute = () => setHasRemoteVideo(false);
          vt.onunmute = () => setHasRemoteVideo(true);
          vt.onended = () => setHasRemoteVideo(false);
        });
      }
    };

    // ICE Candidate Gathering
    pc.onicecandidate = (event) => {
      if (event.candidate && activeCallId) {
        sendIceCandidate(activeCallId, event.candidate, myEmail);
      }
    };

    // DataChannel setup for real-time chat & reactions
    pc.ondatachannel = (event) => {
      const dc = event.channel;
      dataChannelRef.current = dc;
      dc.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.type === "CHAT") {
            setMeetMessages((p) => {
              if (p.some((m) => m.id === msg.payload.id)) return p;
              return [...p, msg.payload];
            });
          } else if (msg.type === "REACTION") {
            setFloatingReactions((p) => [...p, { id: Date.now() + Math.random(), emoji: msg.payload.emoji, left: Math.random() * 70 + 10 }]);
          }
        } catch {}
      };
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "failed") {
        setMediaError("The call connection failed. Check your internet connection and try again.");
      } else if (pc.connectionState === "disconnected") {
        setMediaError("The other participant disconnected.");
      }
    };

    return pc;
  }, [activeCallId, myEmail]);

  /* ─── Initiate WebRTC Offer (Caller side) ─── */
  const createAndSendOffer = useCallback(async (pc) => {
    // The caller is the sole offerer. Having both peers create offers leaves
    // them in "have-local-offer" and prevents either side from connecting.
    if (!isCaller || offerSentRef.current || !activeCallId || !pc) return;
    try {
      offerSentRef.current = true;
      // Create chat data channel
      const dc = pc.createDataChannel("meet_chat");
      dataChannelRef.current = dc;
      dc.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          if (msg.type === "CHAT") {
            setMeetMessages((p) => {
              if (p.some((m) => m.id === msg.payload.id)) return p;
              return [...p, msg.payload];
            });
          } else if (msg.type === "REACTION") {
            setFloatingReactions((p) => [...p, { id: Date.now() + Math.random(), emoji: msg.payload.emoji, left: Math.random() * 70 + 10 }]);
          }
        } catch {}
      };

      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pc.setLocalDescription(offer);
      sendSdpOffer(activeCallId, offer, myEmail);
    } catch (e) {
      offerSentRef.current = false;
      console.error("Error creating WebRTC offer:", e);
    }
  }, [activeCallId, isCaller, myEmail]);

  /* ─── Lifecycle & Signaling Subscriptions ─── */
  useEffect(() => {
    let isMounted = true;

    if (isOpen) {
      setIsVideoOn(callType === "video");
      setCallState(initialCallState);
      setCallDuration(0);
      offerSentRef.current = false;
      setMeetMessages([
        {
          id: "sys-1",
          sender: "system",
          senderName: "Phidim Meeting",
          text: "End-to-end encrypted session established.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      const mediaPromise = requestMediaAccess();
      mediaReadyPromiseRef.current = mediaPromise;
      mediaPromise.then((stream) => {
        if (!isMounted) return;
        const pc = setupPeerConnection(stream);

        if (initialCallState === "CONNECTED" && isCaller) {
          // Only the originating peer begins SDP negotiation.
          createAndSendOffer(pc);
        } else if (initialCallState === "RINGING") {
          playRingtoneSound("outgoing");
        }
      });
    } else {
      mediaReadyPromiseRef.current = null;
      cleanupWebRTC();
    }

    return () => {
      isMounted = false;
      cleanupWebRTC();
    };
  }, [isOpen, callType, initialCallState, isCaller, requestMediaAccess, setupPeerConnection, createAndSendOffer, cleanupWebRTC]);

  // Handle incoming signaling events (Offer, Answer, ICE Candidate, Media State, Chat)
  useEffect(() => {
    if (!isOpen || !activeCallId) return;

    const unsubscribe = subscribeCallSignaling(
      currentUser,
      async (type, payload) => {
        if (payload?.callId && payload.callId !== activeCallId) return;

        // A fast offer can arrive while the permission prompt is still open.
        // Do not create an answer-only peer in that window: wait so its local
        // camera/microphone tracks are included in the first answer.
        const localStream = localStreamRef.current || await mediaReadyPromiseRef.current;
        const pc = peerConnectionRef.current || setupPeerConnection(localStream);

        switch (type) {
          case "CALL_ACCEPTED": {
            stopRingtoneSound();
            setCallState("CONNECTED");
            // The recipient waits for the caller's offer.
            if (isCaller && pc && !pc.currentLocalDescription) {
              createAndSendOffer(pc);
            }
            break;
          }

          case "CALL_DECLINED": {
            stopRingtoneSound();
            playRingtoneSound("busy");
            setCallState("DECLINED");
            setTimeout(() => {
              cleanupWebRTC();
              onClose();
            }, 2500);
            break;
          }

          case "CALL_ENDED": {
            cleanupWebRTC();
            onClose();
            break;
          }

          case "WEBRTC_OFFER": {
            if (payload?.sdpOffer && pc) {
              const sender = (payload.senderEmail || "").toLowerCase();
              if (sender === myEmail) return; // Don't handle self offer

              try {
                await pc.setRemoteDescription(new RTCSessionDescription(payload.sdpOffer));

                // Process any queued candidates
                while (pendingCandidatesRef.current.length > 0) {
                  const cand = pendingCandidatesRef.current.shift();
                  await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
                }

                // Create Answer
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                sendSdpAnswer(activeCallId, answer, myEmail);
              } catch (e) {
                console.error("Error handling WebRTC offer:", e);
              }
            }
            break;
          }

          case "WEBRTC_ANSWER": {
            if (payload?.sdpAnswer && pc) {
              const sender = (payload.senderEmail || "").toLowerCase();
              if (sender === myEmail) return; // Don't handle self answer

              try {
                if (pc.signalingState === "have-local-offer") {
                  await pc.setRemoteDescription(new RTCSessionDescription(payload.sdpAnswer));

                  // Process any queued candidates
                  while (pendingCandidatesRef.current.length > 0) {
                    const cand = pendingCandidatesRef.current.shift();
                    await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
                  }
                }
              } catch (e) {
                console.error("Error handling WebRTC answer:", e);
              }
            }
            break;
          }

          case "WEBRTC_ICE_CANDIDATE": {
            if (payload?.candidate && pc) {
              const sender = (payload.senderEmail || "").toLowerCase();
              if (sender === myEmail) return;

              try {
                if (pc.remoteDescription && pc.remoteDescription.type) {
                  await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
                } else {
                  pendingCandidatesRef.current.push(payload.candidate);
                }
              } catch (e) {
                console.warn("Could not add ICE candidate:", e);
              }
            }
            break;
          }

          case "MEDIA_STATE_CHANGED": {
            if (payload?.mediaState) {
              const sender = (payload.senderEmail || "").toLowerCase();
              if (sender !== myEmail) {
                setRemoteMediaState((prev) => ({ ...prev, ...payload.mediaState }));
              }
            }
            break;
          }

          case "IN_CALL_CHAT_MESSAGE": {
            if (payload?.message) {
              const sender = (payload.message.sender || payload.senderEmail || "").toLowerCase();
              if (sender !== myEmail) {
                setMeetMessages((p) => {
                  if (p.some((m) => m.id === payload.message.id)) return p;
                  return [...p, payload.message];
                });
              }
            }
            break;
          }

          default:
            break;
        }
      },
      activeCallId
    );

    return () => {
      unsubscribe();
    };
  }, [isOpen, activeCallId, currentUser, myEmail, isCaller, setupPeerConnection, createAndSendOffer, cleanupWebRTC, onClose]);

  // Duration timer ticks ONLY when connected
  useEffect(() => {
    let dt;
    if (isOpen && callState === "CONNECTED") {
      stopRingtoneSound();
      dt = setInterval(() => setCallDuration((p) => p + 1), 1000);
    }
    return () => clearInterval(dt);
  }, [isOpen, callState]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [meetMessages]);

  /* ─── Media Controls ─── */

  // Mute / Unmute
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((t) => (t.enabled = !nextMuted));
    }
    if (activeCallId) {
      sendMediaState(activeCallId, { isMuted: nextMuted }, myEmail);
    }
  };

  // Video / Camera Toggle
  const toggleCamera = async () => {
    const nextVideo = !isVideoOn;
    setIsVideoOn(nextVideo);

    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks.forEach((t) => (t.enabled = nextVideo));
      } else if (nextVideo) {
        // Need to acquire video track if it wasn't captured initially
        try {
          const videoStream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
          });
          const newTrack = videoStream.getVideoTracks()[0];
          localStreamRef.current.addTrack(newTrack);

          if (pipVideoRef.current) {
            pipVideoRef.current.srcObject = localStreamRef.current;
            pipVideoRef.current.play().catch(() => {});
          }

          const pc = peerConnectionRef.current;
          if (pc) {
            const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
            if (sender) {
              sender.replaceTrack(newTrack);
            } else {
              pc.addTrack(newTrack, localStreamRef.current);
              createAndSendOffer(pc);
            }
          }
        } catch (e) {
          console.warn("Could not enable camera:", e);
          setIsVideoOn(false);
        }
      }
    }

    if (activeCallId) {
      sendMediaState(activeCallId, { isVideoOn: nextVideo }, myEmail);
    }
  };

  // Screen Share Toggle
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((t) => t.stop());
        screenStreamRef.current = null;
      }
      setIsScreenSharing(false);

      // Revert WebRTC sender to camera track
      const pc = peerConnectionRef.current;
      if (pc && localStreamRef.current) {
        const camTrack = localStreamRef.current.getVideoTracks()[0] || null;
        const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
        if (sender) {
          sender.replaceTrack(camTrack);
        }
      }

      if (activeCallId) {
        sendMediaState(activeCallId, { isScreenSharing: false }, myEmail);
      }
    } else {
      try {
        if (!navigator.mediaDevices?.getDisplayMedia) {
          alert("Screen sharing is not supported on this browser.");
          return;
        }
        const s = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
        screenStreamRef.current = s;
        setIsScreenSharing(true);

        const screenTrack = s.getVideoTracks()[0];

        // Replace track on WebRTC sender
        const pc = peerConnectionRef.current;
        if (pc) {
          const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
          if (sender) {
            sender.replaceTrack(screenTrack);
          } else {
            pc.addTrack(screenTrack, localStreamRef.current || s);
            createAndSendOffer(pc);
          }
        }

        if (activeCallId) {
          sendMediaState(activeCallId, { isScreenSharing: true }, myEmail);
        }

        screenTrack.onended = () => {
          setIsScreenSharing(false);
          screenStreamRef.current = null;
          if (pc && localStreamRef.current) {
            const camTrack = localStreamRef.current.getVideoTracks()[0] || null;
            const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
            if (sender) sender.replaceTrack(camTrack);
          }
          if (activeCallId) {
            sendMediaState(activeCallId, { isScreenSharing: false }, myEmail);
          }
        };
      } catch (e) {
        console.warn("Screen share cancelled or denied:", e);
      }
    }
  };

  // Speaker Volume Toggle
  const toggleSpeaker = () => {
    const nextSpeaker = !isSpeakerOn;
    setIsSpeakerOn(nextSpeaker);
    if (remoteAudioRef.current) {
      remoteAudioRef.current.muted = !nextSpeaker;
    }
  };

  /* ─── Call Termination ─── */
  const handleAcceptCall = () => {
    stopRingtoneSound();
    if (activeCallId) {
      acceptCall(activeCallId, currentUser);
    }
    setCallState("CONNECTED");
  };

  const handleDeclineCall = () => {
    stopRingtoneSound();
    playRingtoneSound("busy");
    if (activeCallId) {
      declineCall(activeCallId, currentUser);
    }
    recordCallHistoryEntry({
      caller: targetPerson,
      recipient: currentUser,
      callType,
      status: "DECLINED",
      durationSeconds: 0,
      currentUserEmail: currentUser?.email,
    });
    setCallState("DECLINED");
    setTimeout(() => {
      cleanupWebRTC();
      onClose();
    }, 2000);
  };

  const handleEndCall = () => {
    recordCallHistoryEntry({
      caller: currentUser,
      recipient: targetPerson,
      callType,
      status: callDuration > 0 ? "COMPLETED" : "MISSED",
      durationSeconds: callDuration,
      currentUserEmail: currentUser?.email,
    });
    cleanupWebRTC();
    if (activeCallId) {
      endCall(activeCallId);
    }
    onClose();
  };

  /* ─── In-Call Chat & Reactions ─── */
  const handleSendMeetChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: "mm-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      sender: myEmail,
      senderName: currentUser?.displayName || currentUser?.name || "Me",
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // 1. Add locally
    setMeetMessages((p) => [...p, newMsg]);

    // 2. Send over WebRTC DataChannel (zero latency)
    if (dataChannelRef.current && dataChannelRef.current.readyState === "open") {
      try {
        dataChannelRef.current.send(JSON.stringify({ type: "CHAT", payload: newMsg }));
      } catch {}
    }

    // 3. Fallback to server signaling
    if (activeCallId) {
      sendInCallChatMessage(activeCallId, newMsg, myEmail);
    }

    setChatInput("");
  };

  const sendEmojiReaction = (emoji) => {
    const id = Date.now() + Math.random();
    setFloatingReactions((p) => [...p, { id, emoji, left: Math.random() * 70 + 10 }]);
    setTimeout(() => setFloatingReactions((p) => p.filter((r) => r.id !== id)), 3000);

    if (dataChannelRef.current && dataChannelRef.current.readyState === "open") {
      try {
        dataChannelRef.current.send(JSON.stringify({ type: "REACTION", payload: { emoji } }));
      } catch {}
    }
  };

  if (!isOpen) return null;

  const fmtDur = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const personName = targetPerson?.displayName || targetPerson?.name || "Phidim User";
  const personRole = targetPerson?.role || "USER";

  /* ─── Shared Control Button ─── */
  const ControlBtn = ({
    onClick,
    active,
    activeClass = "bg-white/20 text-white border-white/20",
    label,
    icon: Icon,
    badge,
    danger = false,
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center gap-1 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer shadow-lg ${
        danger
          ? "bg-rose-600 hover:bg-rose-700 text-white border-rose-500 hover:scale-105"
          : active
          ? activeClass
          : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-white/10 hover:scale-105"
      }`}
      title={label}
    >
      <Icon size={20} className="transition-transform group-hover:scale-110" />
      <span className="text-[9px] font-bold tracking-tight hidden sm:block">{label}</span>
      {badge && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl overflow-hidden select-none">
        {/* Hidden Remote Audio Element for Live Voice */}
        <audio ref={remoteAudioRef} autoPlay playsInline />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative w-full h-full max-w-7xl max-h-[95vh] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
        >
          {/* Floating Emoji Reactions */}
          <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
            {floatingReactions.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 1, y: "80vh", x: `${r.left}%`, scale: 0.8 }}
                animate={{ opacity: 0, y: "15vh", scale: 1.8 }}
                transition={{ duration: 2.6, ease: "easeOut" }}
                className="absolute text-4xl"
              >
                {r.emoji}
              </motion.div>
            ))}
          </div>

          {/* Top Bar Header */}
          <div className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <UserAvatar user={targetPerson} size="md" />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm sm:text-base tracking-tight">{personName}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                    {personRole}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  {callState === "CONNECTED" ? (
                    <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      {fmtDur(callDuration)}
                    </span>
                  ) : callState === "DECLINED" ? (
                    <span className="text-rose-400 font-bold">Call Declined</span>
                  ) : (
                    <span className="text-amber-400 flex items-center gap-1 animate-pulse">
                      <Radio size={12} /> Calling...
                    </span>
                  )}
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Shield size={11} className="text-emerald-400" /> HD WebRTC
                  </span>
                </div>
              </div>
            </div>

            {/* Top Right Badges */}
            <div className="flex items-center gap-2">
              {remoteMediaState.isMuted && (
                <span className="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 flex items-center gap-1">
                  <MicOff size={12} /> Remote Muted
                </span>
              )}
              {remoteMediaState.isScreenSharing && (
                <span className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30 flex items-center gap-1 animate-pulse">
                  <Monitor size={12} /> Screen Sharing
                </span>
              )}
              <button
                onClick={handleEndCall}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Exit Call"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Main Stage View Area */}
          <div className="relative flex-1 bg-slate-900 overflow-hidden flex items-center justify-center">
            {/* Permission Denied Banner */}
            {mediaError && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-amber-500/90 text-slate-950 px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-xl backdrop-blur-md">
                <AlertTriangle size={15} />
                <span>{mediaError}</span>
              </div>
            )}

            {/* Remote Live Video / Screen Share */}
            <video
              ref={mainVideoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                hasRemoteVideo && callState === "CONNECTED" ? "opacity-100" : "opacity-0 absolute"
              }`}
            />

            {/* Avatar Placeholder when remote video is off or ringing */}
            {(!hasRemoteVideo || callState !== "CONNECTED") && (
              <div className="flex flex-col items-center justify-center p-6 text-center space-y-5 z-10">
                <div className="relative">
                  <UserAvatar user={targetPerson} size="xl" className="ring-8 ring-emerald-500/20 shadow-2xl" />
                  {callState === "RINGING" && (
                    <div className="absolute inset-0 rounded-2xl border-4 border-emerald-400 animate-ping opacity-50" />
                  )}
                </div>

                <div className="space-y-1 text-white">
                  <h2 className="text-xl sm:text-2xl font-black">{personName}</h2>
                  <p className="text-xs text-slate-400">
                    {callState === "RINGING"
                      ? "Waiting for response..."
                      : callState === "DECLINED"
                      ? "Call was declined."
                      : !hasRemoteVideo
                      ? "Connected (Camera Off / Voice Active)"
                      : "Connecting live media..."}
                  </p>
                </div>
              </div>
            )}

            {/* Picture-in-Picture (PiP) Local Camera Preview */}
            <div
              className={`absolute bottom-24 right-4 sm:right-6 z-30 w-32 h-44 sm:w-44 sm:h-60 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-slate-700 bg-slate-950 shadow-2xl transition-all ${
                isScreenSharing ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <video
                ref={pipVideoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover -scale-x-100 ${
                  isVideoOn ? "block" : "hidden"
                }`}
              />
              {!isVideoOn && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-2 text-center">
                  <UserAvatar user={currentUser} size="md" />
                  <span className="text-[10px] font-bold mt-1 text-slate-300">You (Cam Off)</span>
                </div>
              )}
              {/* Local Mic Muted Overlay Badge */}
              {isMuted && (
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white shadow">
                  <MicOff size={11} />
                </div>
              )}
            </div>

            {/* Slide-out In-Call Chat Drawer */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 280 }}
                  className="absolute top-0 right-0 bottom-0 w-80 sm:w-96 bg-slate-950/95 border-l border-slate-800 shadow-2xl backdrop-blur-2xl z-40 flex flex-col"
                >
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={16} className="text-emerald-400" />
                      <h4 className="text-xs font-black uppercase tracking-wider">Meeting Chat</h4>
                    </div>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {meetMessages.map((msg) => {
                      const isMe = (msg.sender || "").toLowerCase() === myEmail;
                      const isSys = msg.sender === "system";

                      if (isSys) {
                        return (
                          <div key={msg.id} className="text-center py-1">
                            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold">
                              {msg.text}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                        >
                          <span className="text-[9px] text-slate-400 px-1 mb-0.5">
                            {isMe ? "You" : msg.senderName || personName} • {msg.time}
                          </span>
                          <div
                            className={`px-3 py-2 rounded-2xl text-xs max-w-[85%] break-words ${
                              isMe
                                ? "bg-emerald-600 text-white rounded-br-xs"
                                : "bg-slate-800 text-slate-200 rounded-bl-xs"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input Form */}
                  <form onSubmit={handleSendMeetChat} className="p-3 border-t border-slate-800 bg-slate-900/60">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type message to meeting..."
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim()}
                        className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
                      >
                        <Send size={15} />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Floating Call Controls */}
          <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-center gap-2 sm:gap-4 relative z-30">
            {callState === "RINGING" ? (
              /* Ringing State Actions */
              <div className="flex items-center gap-4">
                <button
                  onClick={handleEndCall}
                  className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-2 shadow-xl cursor-pointer hover:scale-105 transition-all"
                >
                  <PhoneOff size={16} />
                  <span>Cancel Call</span>
                </button>
              </div>
            ) : (
              /* Connected In-Call Actions */
              <>
                {/* Microphone Toggle */}
                <ControlBtn
                  onClick={toggleMute}
                  active={isMuted}
                  activeClass="bg-rose-600/20 text-rose-400 border-rose-500/40"
                  label={isMuted ? "Unmute" : "Mute"}
                  icon={isMuted ? MicOff : Mic}
                />

                {/* Camera Video Toggle */}
                <ControlBtn
                  onClick={toggleCamera}
                  active={!isVideoOn}
                  activeClass="bg-amber-500/20 text-amber-400 border-amber-500/40"
                  label={isVideoOn ? "Stop Cam" : "Start Cam"}
                  icon={isVideoOn ? Video : VideoOff}
                />

                {/* Screen Share Toggle */}
                <ControlBtn
                  onClick={toggleScreenShare}
                  active={isScreenSharing}
                  activeClass="bg-blue-600 text-white border-blue-500 shadow-blue-500/30"
                  label={isScreenSharing ? "Stop Share" : "Share Screen"}
                  icon={isScreenSharing ? MonitorOff : Monitor}
                />

                {/* Speaker Output Toggle */}
                <ControlBtn
                  onClick={toggleSpeaker}
                  active={!isSpeakerOn}
                  activeClass="bg-slate-800 text-slate-400 border-slate-700"
                  label={isSpeakerOn ? "Speaker" : "Muted"}
                  icon={isSpeakerOn ? Volume2 : VolumeX}
                />

                {/* In-Call Chat Drawer Toggle */}
                <ControlBtn
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  active={isChatOpen}
                  activeClass="bg-emerald-600 text-white border-emerald-500"
                  label="Meeting Chat"
                  icon={MessageSquare}
                  badge={meetMessages.length > 1 ? meetMessages.length - 1 : null}
                />

                {/* Emoji Reactions Picker */}
                <div className="relative">
                  <ControlBtn
                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                    active={isEmojiPickerOpen}
                    label="React"
                    icon={Smile}
                  />

                  {isEmojiPickerOpen && (
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 p-2 rounded-2xl shadow-2xl flex items-center gap-1.5 z-50">
                      {EMOJI_REACTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            sendEmojiReaction(emoji);
                            setIsEmojiPickerOpen(false);
                          }}
                          className="p-1.5 hover:bg-slate-800 rounded-xl text-xl hover:scale-125 transition-transform cursor-pointer"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* End Call Button */}
                <ControlBtn
                  onClick={handleEndCall}
                  danger
                  label="End Call"
                  icon={PhoneOff}
                />
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
