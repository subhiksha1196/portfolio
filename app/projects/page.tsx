"use client";

import { projects } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

const ALL_TECH_TAGS = [
  "All", "TypeScript", "JavaScript", "Java",
  "React 19", "Spring Boot 3", "MongoDB",
];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) =>
          p.tech.some((t) => t.toLowerCase() === active.toLowerCase())
        );

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const showAll = active === "All";

  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-6 md:px-20 pt-20 pb-28">

        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="font-mono text-[12px] mb-6 inline-block ul"
            style={{ color: "var(--muted)", textDecoration: "none" }}
          >
            ← back home
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 800,
              color: "var(--fg)",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
            }}
          >
            Everything I've Built
          </h1>
          <p className="font-mono text-[14px] mt-4" style={{ color: "var(--muted)" }}>
            All projects — full-stack apps, research tools, games & experiments
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {ALL_TECH_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className="font-mono text-[12px] px-3 py-1.5 border transition-all duration-150"
              style={{
                borderRadius: 2,
                borderColor: active === tag ? "var(--accent)" : "var(--border-mid)",
                color: active === tag ? "var(--accent)" : "var(--muted)",
                background: active === tag ? "var(--accent-soft)" : "transparent",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {showAll ? (
          <>
            {/* Featured */}
            <div className="mb-3">
              <p className="font-mono text-[11px] tracking-widest uppercase mb-5" style={{ color: "var(--accent)" }}>
                <i className="fa-solid fa-star" />&nbsp;&nbsp;featured
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} idx={idx} />
                ))}
              </div>
            </div>

            <div className="my-12" style={{ borderTop: "1px solid var(--border)" }} />

            {/* More */}
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase mb-5" style={{ color: "var(--muted)" }}>
                + &nbsp;more
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} idx={featured.length + idx} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            {filtered.length === 0 ? (
              <p className="font-mono text-[14px]" style={{ color: "var(--muted)" }}>
                No projects match that filter.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} idx={idx} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer note */}
        <div className="mt-16 pt-8 text-center" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="font-mono text-[12px]" style={{ color: "var(--muted)" }}>
            and a lot more on{" "}
            <a
              href="https://github.com/subhiksha1196"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              <i className="fa-brands fa-github mr-1" />github ↗
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ── Card ── */
function ProjectCard({ project, idx }: { project: (typeof projects)[0]; idx: number }) {
  const num = String(idx + 1).padStart(2, "0");

  return (
    <div className="card flex flex-col overflow-hidden">

      {/* Preview: live demo iframe OR image slot */}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block flex-shrink-0"
          style={{ height: "150px", overflow: "hidden", borderBottom: "1px solid var(--border)" }}
        >
          <iframe
            src={project.demo}
            title={`${project.title} preview`}
            loading="lazy"
            style={{
              width: "1200px", height: "700px", border: "none",
              transform: "scale(0.28)", transformOrigin: "top left",
              pointerEvents: "none", userSelect: "none",
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.55)" }}
          >
            <span
              className="font-mono text-[11px] px-3 py-1.5"
              style={{ color: "var(--accent)", border: "1px solid var(--border-accent)", borderRadius: 2, background: "var(--accent-soft)" }}
            >
              <i className="fa-solid fa-arrow-up-right-from-square mr-1.5" />open demo
            </span>
          </div>
        </a>
      ) : (
        /* image slot — set project.image in data.ts to fill */
        <div
          className="flex-shrink-0"
          style={{ height: "150px", borderBottom: "1px solid var(--border)", background: "var(--bg-card)", overflow: "hidden" }}
        >
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
      )}

      {/* Card body */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px]" style={{ color: "var(--accent)" }}>{num}</span>
          <div className="flex gap-2">
            {project.badge && (
              <span
                className="font-mono text-[10px] px-2 py-[2px]"
                style={{ color: "var(--accent)", border: "1px solid var(--border-accent)", borderRadius: 2 }}
              >
                {project.badge}
              </span>
            )}
          </div>
        </div>

        <h2 style={{ fontFamily: "var(--font-display), serif", fontSize: "20px", fontWeight: 700, color: "var(--fg)", lineHeight: 1.2 }}>
          {project.title}
        </h2>

        <p className="font-mono text-[13px] leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>

        {project.github && (
          <div className="mt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px]"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              <i className="fa-brands fa-github" />&nbsp;github ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
