"use client";

import { useState, useEffect } from "react";

export default function ChatBotNudge() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < 640);
    if (sessionStorage.getItem("nudge-dismissed")) return;
    const t = setTimeout(() => {
      // 1. mount at correct position (opacity 0)
      setMounted(true);
      // 2. two rAFs later: element is painted at correct spot, now fade in
      requestAnimationFrame(() => requestAnimationFrame(() => setShow(true)));
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => dismiss();
    window.addEventListener("chatbot-opened", handler);
    return () => window.removeEventListener("chatbot-opened", handler);
  }, []);

  function dismiss() {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("nudge-dismissed", "1");
  }

  // not rendered at all until timer fires — zero chance of top-left flash
  if (!mounted || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        // desktop: bubble is bottom 28px, 52px tall → centre ~54px from bottom
        // nudge bottom 14px with ~40px height centres it alongside the bubble
        bottom: mobile ? "92px" : "14px",
        // desktop: 28px (bubble right) + 52px (bubble width) + 10px gap = 90px
        right: mobile ? "16px" : "90px",
        zIndex: 1001,
        width: "210px",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "10px 32px 10px 12px",
        boxShadow: "0 6px 28px rgba(0,0,0,0.35)",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(8px) scale(0.97)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
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
