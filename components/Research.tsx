"use client";

import { research } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

export default function Research() {
  const ref = useInView<HTMLElement>();

  return (
    <section id="research" ref={ref}>
      <p className="section-label">
        <i className="fa-solid fa-flask text-[10px]" />
        research
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger-grid">
        {research.map((entry) => (
          <div key={entry.title} className="card p-7 flex flex-col gap-4">
            <div className="flex justify-between items-start gap-3">
              <span
                className="font-mono text-[10px] px-2.5 py-1 tracking-wider uppercase"
                style={{
                  color: "var(--accent-bright)",
                  border: "1px solid var(--border-accent)",
                  borderRadius: 4,
                  whiteSpace: "nowrap",
                  background: "var(--accent-soft)",
                }}
              >
                {entry.status}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "19px",
                fontWeight: 700,
                color: "var(--fg)",
                lineHeight: 1.3,
              }}
            >
              {entry.title}
            </h3>

            <p className="font-mono text-[13px]" style={{ color: "var(--accent)" }}>
              {entry.venue} &middot; {entry.role}
            </p>

            <p className="font-mono text-[14px] leading-relaxed flex-1" style={{ color: "var(--fg-dim)" }}>
              {entry.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-1 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              {entry.repo && (
                <a
                  href={entry.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ul font-mono text-[13px] flex items-center gap-1.5"
                  style={{ color: "var(--accent-bright)" }}
                >
                  <i className="fa-brands fa-github text-[12px]" />
                  repo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
