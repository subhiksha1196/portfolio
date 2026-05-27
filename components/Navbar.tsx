"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "work", href: "/#work-wrapper", section: "work" },
  { label: "projects", href: "/projects", section: null },
  { label: "research", href: "/#research-wrapper", section: "research" },
  { label: "education", href: "/#education-wrapper", section: "education" },
  { label: "about", href: "/#about-wrapper", section: "about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["work", "research", "education", "about"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(`${id}-wrapper`);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const isActive = (link: typeof navLinks[0]) => {
    if (pathname === "/projects" && link.href === "/projects") return true;
    if (pathname === "/" && link.section === active) return true;
    return false;
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-[1100px] mx-auto px-5 md:px-16 h-12 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="font-mono text-[13px] font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
          subhiksha
        </a>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 font-mono text-[12px] transition-colors duration-100"
              style={{ color: isActive(link) ? "var(--accent)" : "var(--muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
              onMouseLeave={e => (e.currentTarget.style.color = isActive(link) ? "var(--accent)" : "var(--muted)")}
            >
              {link.label}
              {isActive(link) && (
                <span style={{ display: "block", height: "1px", background: "var(--accent)", marginTop: "1px" }} />
              )}
            </Link>
          ))}
          <div className="w-px h-3.5 mx-2" style={{ background: "var(--border)" }} />
          <ThemeToggle />
        </nav>

        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          >
            <span className="block h-px w-5 transition-all duration-150" style={{ background: "var(--muted)", transform: open ? "translateY(6px) rotate(45deg)" : "" }} />
            <span className="block h-px w-5 transition-all duration-150" style={{ background: "var(--muted)", opacity: open ? 0 : 1 }} />
            <span className="block h-px w-5 transition-all duration-150" style={{ background: "var(--muted)", transform: open ? "translateY(-6px) rotate(-45deg)" : "" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu — fixed overlay so it doesn't push page content down */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="sm:hidden fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.4)" }}
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div
            className="sm:hidden fixed top-12 left-0 right-0 z-50 px-5 pb-4 pt-2 flex flex-col gap-1"
            style={{ borderTop: "1px solid var(--border)", background: "var(--bg)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 font-mono text-[13px]"
                style={{ color: isActive(link) ? "var(--accent)" : "var(--muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </header>
  );
}
