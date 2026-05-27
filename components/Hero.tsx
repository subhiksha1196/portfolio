"use client";

import { meta } from "@/lib/data";
import { useEffect, useState } from "react";

const ROLES = [
  "Full Stack Developer",
  "AI / ML Researcher",
  "CSE @ SSN College of Engineering",
  "Always Building",
  "Always Learning",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!erasing && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 70);
    } else if (!erasing && displayed.length === current.length) {
      timeout = setTimeout(() => setErasing(true), 1400);
    } else if (erasing && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, displayed.length - 1));
      }, 40);
    } else if (erasing && displayed.length === 0) {
      setErasing(false);
      setRoleIndex((roleIndex + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, erasing, roleIndex]);

  return (
    <section
      id="home"
      className="hero-dot-grid relative flex flex-col items-center justify-between"
      style={{ minHeight: "100dvh" }}
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(167,139,250,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg))" }}
      />

      {/* Top spacer */}
      <div />

      {/* Centre content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-24 w-full max-w-[1200px] mx-auto">

        {/* Name */}
        <h1
          style={{
            fontFamily: "'Times New Roman', Times, serif",
            fontSize: "clamp(44px, 7vw, 88px)",
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            color: "var(--fg)",
            margin: 0,
          }}
        >
          <i>Hello,</i> I am Subhiksha!
        </h1>

        {/* Typewriter role — below h1 */}
        <p
          className="font-mono tracking-[0.18em] uppercase mt-6"
          style={{ color: "var(--accent)", minHeight: "1.6em", fontSize: "clamp(11px, 1vw, 14px)" }}
        >
          {displayed}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "0.85em",
              background: "var(--accent)",
              marginLeft: "3px",
              verticalAlign: "middle",
              animation: "blink 0.8s step-end infinite",
            }}
          />
        </p>

      </div>

      {/* CTAs pinned to bottom of hero — above the wave */}
      <div className="relative z-10 pb-10 flex flex-wrap items-center justify-center gap-4">
        {/* Resume download button */}
        <a
          href="/resume.pdf"
          download="Subhiksha_Resume.pdf"
          className="flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] transition-all duration-150"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--accent)",
            border: "1px solid var(--border-accent)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-glow)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          download resume
        </a>

        {/* Divider */}
        <div className="w-px h-6" style={{ background: "var(--border)" }} />

        {/* Social icons */}
        <div className="flex items-center gap-5">
          <a href={meta.github} target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: "var(--muted)" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
            <i className="fa-brands fa-github text-[24px]" />
          </a>
          <a href={meta.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: "var(--muted)" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
            <i className="fa-brands fa-linkedin text-[24px]" />
          </a>
          <a href={meta.leetcode} target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ color: "var(--muted)" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
            <i className="fa-solid fa-code text-[24px]" />
          </a>
          <a href={`mailto:${meta.email}`} className="transition-colors" style={{ color: "var(--muted)" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
            <i className="fa-solid fa-envelope text-[24px]" />
          </a>
        </div>
      </div>

    </section>
  );
}
