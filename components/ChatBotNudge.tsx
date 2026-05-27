"use client";

import { useState, useEffect } from "react";

export default function ChatBotNudge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("nudge-dismissed")) return;
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // dismiss when the chatbot is opened
  useEffect(() => {
    const handler = () => dismiss();
    window.addEventListener("chatbot-opened", handler);
    return () => window.removeEventListener("chatbot-opened", handler);
  }, []);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem("nudge-dismissed", "1");
  }

  if (dismissed || !visible) return null;

  return (
    <>
      {/* Mobile-only: align nudge with the raised chatbot bubble */}
      <style>{`
        @media (max-width: 639px) {
          #chatbot-nudge {
            bottom: 144px !important;
            right: 16px !important;
          }
        }
      `}</style>
      <div
        id="chatbot-nudge"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "90px",
          zIndex: 1001,
          width: "min(220px, 80vw)",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          padding: "10px 32px 10px 12px",
          boxShadow: "0 6px 28px rgba(0,0,0,0.35)",
          visibility: "hidden",
          animation: "nudge-in 0.35s cubic-bezier(0.16,1,0.3,1) 0.05s forwards",
        }}
      >
      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          right: "-7px",
          top: "50%",
          width: "12px",
          height: "12px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderLeft: "none",
          borderTop: "none",
          transform: "translateY(-50%) rotate(-45deg)",
        }}
      />

      {/* Close */}
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: "absolute",
          top: "6px",
          right: "6px",
          transform: "none",
          background: "none",
          border: "none",
          color: "var(--muted)",
          fontSize: "11px",
          lineHeight: 1,
          cursor: "pointer",
          padding: "2px 4px",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
      >
        ✕
      </button>

      <p className="font-mono text-[12px] leading-relaxed" style={{ color: "var(--fg-dim)" }}>
        hiring or looking to collaborate?<br />
        <span style={{ color: "var(--accent)" }}>drop a message ↗</span>
      </p>
      </div>
    </>
  );
}
