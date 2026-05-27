"use client";

import { useEffect, useRef, useState } from "react";

type Message = { from: "bot" | "user"; text: string };
type Step = "idle" | "name" | "email" | "message" | "sending" | "done";

const BOT_DELAY = 600;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<Step>("idle");
  const [input, setInput] = useState("");
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // focus input when open
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, step]);

  function botSay(text: string, onDone?: () => void) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text }]);
      onDone?.();
    }, BOT_DELAY);
  }

  function startChat() {
    setMessages([]);
    setData({ name: "", email: "", message: "" });
    setStep("name");
    botSay("Hey! I'm Subhiksha's contact bot. What's your name?");
  }

  function handleOpen() {
    setOpen(true);
    if (step === "idle") startChat();
    // dismiss the nudge pop-up when chat is opened
    window.dispatchEvent(new Event("chatbot-opened"));
  }

  function handleSend() {
    const val = input.trim();
    if (!val) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text: val }]);

    if (step === "name") {
      setData((d) => ({ ...d, name: val }));
      setStep("email");
      botSay(`Nice to meet you, ${val}! What's your email?`);
    } else if (step === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        botSay("Hmm, that doesn't look like a valid email. Try again?");
        return;
      }
      setData((d) => ({ ...d, email: val }));
      setStep("message");
      botSay("Got it! What would you like to say to Subhiksha?");
    } else if (step === "message") {
      const finalData = { ...data, message: val };
      setData(finalData);
      setStep("sending");
      botSay("Sending your message...", () => submit(finalData));
    }
  }

  async function submit(payload: { name: string; email: string; message: string }) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "90365e77-5a87-403a-b720-de1a6702fa52",
          ...payload,
        }),
      });
      if (res.ok) {
        setStep("done");
        botSay(`Thanks ${payload.name}! Subhiksha will get back to you at ${payload.email} soon.`);
      } else {
        setStep("message");
        botSay("Something went wrong. Try sending again?");
      }
    } catch {
      setStep("message");
      botSay("Network error. Please try again.");
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSend();
  }

  const placeholder =
    step === "name" ? "Your name..."
    : step === "email" ? "your@email.com"
    : step === "message" ? "Type your message..."
    : "";

  const disabled = step === "sending" || step === "done" || step === "idle";

  return (
    <>
      {/* Bubble toggle */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        aria-label="Open contact chat"
        style={{
          position: "fixed",
          bottom: "80px",
          right: "28px",
          zIndex: 1000,
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          color: "var(--fg-dim)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.45)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
        }}
      >
        {open
          ? <i className="fa-solid fa-xmark text-[18px]" />
          : <i className="fa-regular fa-comment-dots text-[20px]" />
        }
      </button>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "144px",
            right: "28px",
            zIndex: 999,
            width: "min(340px, calc(100vw - 32px))",
            maxHeight: "min(520px, calc(100dvh - 140px))",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ade80",
                flexShrink: 0,
              }}
            />
            <span className="font-mono text-[12px]" style={{ color: "var(--fg)" }}>
              contact subhiksha
            </span>
            <span className="font-mono text-[10px] ml-auto" style={{ color: "var(--muted)" }}>
              usually replies fast
            </span>
          </div>

          {/* Messages */}
          <div
            style={{
              padding: "14px 14px 10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflowY: "auto",
              flex: 1,
              minHeight: "180px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                }}
              >
                <span
                  className="font-mono text-[12px] leading-relaxed"
                  style={{
                    maxWidth: "80%",
                    padding: "7px 11px",
                    borderRadius: "3px",
                    background: msg.from === "bot" ? "var(--bg-alt)" : "var(--bg)",
                    color: msg.from === "bot" ? "var(--fg)" : "var(--fg-dim)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <span
                  className="font-mono text-[12px]"
                  style={{
                    padding: "7px 11px",
                    borderRadius: "3px",
                    background: "var(--bg-alt)",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  ...
                </span>
              </div>
            )}

            {/* Done — restart option */}
            {step === "done" && (
              <button
                onClick={startChat}
                className="font-mono text-[11px]"
                style={{
                  alignSelf: "center",
                  marginTop: "4px",
                  color: "var(--muted)",
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                send another message
              </button>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "0",
            }}
          >
            <input
              ref={inputRef}
              type={step === "email" ? "email" : "text"}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={placeholder}
              disabled={disabled}
              className="font-mono text-[12px] outline-none flex-1"
              style={{
                padding: "11px 14px",
                background: "transparent",
                color: "var(--fg)",
                border: "none",
              }}
            />
            <button
              onClick={handleSend}
              disabled={disabled || !input.trim()}
              style={{
                padding: "0 14px",
                height: "100%",
                background: "none",
                border: "none",
                color: input.trim() && !disabled ? "var(--fg-dim)" : "var(--border)",
                cursor: input.trim() && !disabled ? "pointer" : "default",
                transition: "color 0.15s",
                fontSize: "14px",
              }}
            >
              <i className="fa-solid fa-paper-plane" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
