"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { IncomingCallBanner } from "./IncomingCallBanner";
import { VideoVoiceCallModal } from "./VideoVoiceCallModal";
import {
  initiateCall,
  acceptCall,
  declineCall,
  endCall,
  subscribeCallSignaling,
  stopRingtoneSound,
} from "@/lib/callSignaling";

const CallContext = createContext({
  startCall: () => {},
  endActiveCall: () => {},
  isCallActive: false,
});

export function useCall() {
  const ctx = useContext(CallContext);
  return ctx || {
    startCall: () => {},
    endActiveCall: () => {},
    isCallActive: false,
  };
}

export function CallProvider({ children }) {
  const { user: currentUser } = useAuth();

  // Call Modal State
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [activeCallPartner, setActiveCallPartner] = useState(null);
  const [activeCallType, setActiveCallType] = useState("video");
  const [callModalInitialState, setCallModalInitialState] = useState("RINGING");
  const [currentCallId, setCurrentCallId] = useState(null);
  const [isCaller, setIsCaller] = useState(false);

  // Incoming Call State
  const [incomingCall, setIncomingCall] = useState(null);

  const myEmail = (currentUser?.email || currentUser?.username || "").toLowerCase().trim();

  // Handle incoming & outgoing call signaling events
  useEffect(() => {
    let currentTabId = "";
    if (typeof window !== "undefined") {
      try {
        if (!sessionStorage.getItem("phidim_tab_session_id")) {
          sessionStorage.setItem("phidim_tab_session_id", "tab-" + Math.random().toString(36).slice(2, 9));
        }
        currentTabId = sessionStorage.getItem("phidim_tab_session_id") || "";
      } catch {}
    }

    const unsubscribe = subscribeCallSignaling(currentUser, (type, payload) => {
      switch (type) {
        case "CALL_INITIATED": {
          const recEmail = (payload?.recipient?.email || "").toLowerCase().trim();
          const calEmail = (payload?.caller?.email || "").toLowerCase().trim();
          const recId = (payload?.recipient?.id || "").toLowerCase().trim();
          const recName = (payload?.recipient?.name || payload?.recipient?.displayName || "").toLowerCase().trim();
          const recPhone = (payload?.recipient?.phone || "").replace(/[^0-9]/g, "");

          const myEmailStr = (currentUser?.email || currentUser?.username || "").toLowerCase().trim();
          const myIdStr = (currentUser?.id || "").toLowerCase().trim();
          const myNameStr = (currentUser?.name || currentUser?.displayName || "").toLowerCase().trim();
          const myPhoneStr = (currentUser?.phone || "").replace(/[^0-9]/g, "");

          const isSenderTab = payload?.senderTabId && currentTabId && payload.senderTabId === currentTabId;

          // Never ring on the sender's own originating tab
          if (isSenderTab) {
            break;
          }

          // If target matches user email, id, phone, or name
          const isForMe =
            !myEmailStr ||
            !recEmail ||
            recEmail === myEmailStr ||
            recEmail.includes(myEmailStr) ||
            myEmailStr.includes(recEmail) ||
            (myIdStr && (recId === myIdStr || recId.includes(myIdStr) || myIdStr.includes(recId))) ||
            (myPhoneStr && recPhone && (myPhoneStr.includes(recPhone) || recPhone.includes(myPhoneStr))) ||
            (myNameStr && (recName === myNameStr || recName.includes(myNameStr) || myNameStr.includes(recName)));

          if (isForMe) {
            setIncomingCall(payload);
          }
          break;
        }

        case "CALL_ACCEPTED": {
          setIncomingCall(null);
          stopRingtoneSound();
          setCallModalInitialState("CONNECTED");
          setCurrentCallId(payload?.callId);
          break;
        }

        case "CALL_DECLINED": {
          setIncomingCall(null);
          stopRingtoneSound();
          break;
        }

        case "CALL_ENDED": {
          setIncomingCall(null);
          stopRingtoneSound();
          setIsCallModalOpen(false);
          setActiveCallPartner(null);
          setCurrentCallId(null);
          setIsCaller(false);
          break;
        }

        default:
          break;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [myEmail]);

  // Start an Outgoing Call
  const startCall = useCallback(
    async (targetPerson, type = "video") => {
      if (!targetPerson) return;

      const session = await initiateCall({
        caller: currentUser || { name: "User", email: myEmail },
        recipient: targetPerson,
        callType: type,
      });

      setActiveCallPartner(targetPerson);
      setActiveCallType(type);
      setCallModalInitialState("RINGING");
      setCurrentCallId(session?.callId || null);
      setIsCaller(true);
      setIsCallModalOpen(true);
    },
    [currentUser, myEmail]
  );

  // Accept an Incoming Call
  const handleAcceptIncoming = useCallback(
    (callSession) => {
      if (!callSession) return;
      acceptCall(callSession.callId, currentUser);

      setIncomingCall(null);
      setActiveCallPartner(callSession.caller);
      setActiveCallType(callSession.callType || "video");
      setCallModalInitialState("CONNECTED");
      setCurrentCallId(callSession.callId);
      setIsCaller(false);
      setIsCallModalOpen(true);
    },
    [currentUser]
  );

  // Decline an Incoming Call
  const handleDeclineIncoming = useCallback(
    (callSession) => {
      if (!callSession) return;
      declineCall(callSession.callId, currentUser);
      setIncomingCall(null);
    },
    [currentUser]
  );

  // End / Close Call Modal
  const handleCloseCallModal = useCallback(() => {
    if (currentCallId) {
      endCall(currentCallId);
    }
    stopRingtoneSound();
    setIsCallModalOpen(false);
    setActiveCallPartner(null);
    setCurrentCallId(null);
    setIsCaller(false);
  }, [currentCallId]);

  return (
    <CallContext.Provider
      value={{
        startCall,
        endActiveCall: handleCloseCallModal,
        isCallActive: isCallModalOpen || !!incomingCall,
      }}
    >
      {children}

      {/* Global Incoming Call Ringing Banner */}
      <IncomingCallBanner
        incomingCall={incomingCall}
        onAccept={handleAcceptIncoming}
        onDecline={handleDeclineIncoming}
      />

      {/* Full-Screen HD Video & Voice Call Modal */}
      <VideoVoiceCallModal
        isOpen={isCallModalOpen}
        onClose={handleCloseCallModal}
        targetPerson={activeCallPartner}
        callType={activeCallType}
        initialCallState={callModalInitialState}
        activeCallId={currentCallId}
        isCaller={isCaller}
      />
    </CallContext.Provider>
  );
}
