"use client";

import Link from "next/link";
import { projects } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

const PREVIEW_COUNT = 3;

export default function Work() {
  const ref = useInView<HTMLElement>();
  const preview = projects.filter((p) => p.featured).slice(0, PREVIEW_COUNT);

  return (
    <section id="work" ref={ref}>
      <p className="section-label">
        <i className="fa-solid fa-gear text-[10px]" />
        work
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-grid">
        {preview.map((project, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          return (
            <div key={project.id} className="card p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                  {num}
                </span>
                <div className="flex items-center gap-2">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ul font-mono text-[12px] flex items-center gap-1.5"
                      style={{ color: "var(--accent)", textDecoration: "none" }}
                      title="Live demo"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square text-[13px]" />
                    </a>
                  )}
                  {project.badge && (
                    <span
                      className="font-mono text-[10px] px-2 py-[2px]"
                      style={{
                        color: "var(--accent)",
                        border: "1px solid var(--border-accent)",
                        borderRadius: 2,
                      }}
                    >
                      {project.badge}
                    </span>
                  )}
                </div>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--fg)",
                }}
              >
                {project.title}
              </h3>

              <p className="font-mono text-[13px] leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              {(project.github) && (
                <div className="flex gap-4 mt-1">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ul font-mono text-[12px] flex items-center gap-1.5"
                      style={{ color: "var(--accent)", textDecoration: "none" }}
                    >
                      <i className="fa-brands fa-github text-[13px]" /> github ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Link to full archive */}
      <div className="mt-6 flex justify-end">
        <Link href="/projects" className="btn-outline text-[13px]">
          explore all projects →
        </Link>
      </div>
    </section>
  );
}
