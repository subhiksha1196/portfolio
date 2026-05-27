"use client";

import { useState, useEffect } from "react";

export default function ChatBotNudge() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    // If already dismissed this session, stay hidden
    if (sessionStorage.getItem("nudge-dismissed")) {
      setDismissed(true);
      return;
    }
    setMobile(window.innerWidth < 640);
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => setShow(false);
    window.addEventListener("chatbot-opened", handler);
    return () => window.removeEventListener("chatbot-opened", handler);
  }, []);

  function dismiss() {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("nudge-dismissed", "1");
  }

  if (dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: mobile ? "68px" : "14px",
        right: mobile ? "8px" : "90px",
        zIndex: 1001,
        width: mobile ? "180px" : "210px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "10px 32px 10px 12px",
        boxShadow: "0 6px 28px rgba(0,0,0,0.35)",
        // Always in DOM at correct position — only visibility toggles
        // This is the ONLY way to prevent top-left flash
        visibility: show ? "visible" : "hidden",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
        transition: show
          ? "opacity 0.3s ease, transform 0.3s ease"
          : "none",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      {/* Arrow pointing right toward the bubble */}
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
  );
}
