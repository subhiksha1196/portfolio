"use client";

import { meta } from "@/lib/data";

export default function Footer() {
  const links = [
    { label: "GitHub",   icon: "fa-brands fa-github",   href: meta.github },
    { label: "LinkedIn", icon: "fa-brands fa-linkedin",  href: meta.linkedin },
    { label: "LeetCode", icon: "fa-solid fa-code",       href: meta.leetcode },
    { label: "Email",    icon: "fa-solid fa-envelope",   href: `mailto:${meta.email}` },
  ];

  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--accent-soft)",
        borderTop: "1px solid var(--border-accent)",
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-20 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Copyright + built with */}
        <div className="flex flex-col gap-1.5">
          <p className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>
            © {year} Subhiksha. All rights reserved.
          </p>
          <p className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>
            Built with Next.js · Tailwind CSS · love · coffee · ♥
          </p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              title={link.label}
              className="transition-colors"
              style={{ color: "var(--muted)", textDecoration: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >
              <i className={`${link.icon} text-[18px]`} />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
