"use client";

import { useState, useRef, useEffect } from "react";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
      setTimeout(() => {
        setStatus("idle");
        setStatusMsg("");
      }, 200);
    }
  }, [open]);

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    ) {
      setOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMsg("sending...");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus("success");
        setStatusMsg(json.message || "message sent.");
        form.reset();
        setTimeout(() => setOpen(false), 2000);
      } else {
        setStatus("error");
        setStatusMsg(json.message || "something went wrong.");
      }
    } catch {
      setStatus("error");
      setStatusMsg("something went wrong.");
    }
  };

  return (
    <>
      {/* Trigger button — exported so Navbar can render it */}
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-[11px] px-3 py-1 transition-colors duration-150"
        style={{
          border: "1px solid var(--border-accent)",
          color: "var(--accent)",
          background: "transparent",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-glow)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        let&apos;s talk
      </button>

      {/* Modal */}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        onClose={() => setOpen(false)}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-accent)",
          borderRadius: "2px",
          padding: 0,
          width: "min(480px, 92vw)",
          color: "var(--fg)",
          maxHeight: "90vh",
        }}
        className="backdrop:bg-black/60"
      >
        <div className="p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] tracking-widest uppercase" style={{ color: "var(--accent)" }}>
              // get in touch
            </p>
            <button
              onClick={() => setOpen(false)}
              className="font-mono text-[14px] w-6 h-6 flex items-center justify-center"
              style={{ color: "var(--muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="access_key" value="90365e77-5a87-403a-b720-de1a6702fa52" />

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="your name"
                className="font-mono text-[12px] px-3 py-2 outline-none"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--fg)",
                  borderRadius: "2px",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--border-accent)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="font-mono text-[12px] px-3 py-2 outline-none"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--fg)",
                  borderRadius: "2px",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--border-accent)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>message</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="what's on your mind..."
                className="font-mono text-[12px] px-3 py-2 outline-none resize-none"
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  color: "var(--fg)",
                  borderRadius: "2px",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--border-accent)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            {status !== "idle" && (
              <p
                className="font-mono text-[11px]"
                style={{
                  color: status === "success" ? "var(--accent)" : status === "error" ? "#f87171" : "var(--muted)",
                }}
              >
                {statusMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="font-mono text-[12px] px-4 py-2.5 transition-colors duration-150 disabled:opacity-50"
              style={{
                border: "1px solid var(--border-accent)",
                color: "var(--accent)",
                background: "transparent",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-glow)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {status === "sending" ? "sending..." : "send message →"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
