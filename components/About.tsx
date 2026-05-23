"use client";

import { about, meta } from "@/lib/data";
import { useInView } from "@/hooks/useInView";

export default function About() {
  const ref = useInView<HTMLElement>();

  return (
    <section id="about" ref={ref}>
      <p className="section-label">
        <i className="fa-solid fa-user text-[10px]" />
        about
      </p>

      <div className="flex flex-col md:flex-row gap-12 md:gap-20">
        <div className="md:w-[32%] shrink-0">
          <h2
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(34px, 4.5vw, 58px)",
              fontWeight: 800,
              color: "var(--fg)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {meta.name.split(" ").map((word: string, i: number) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {about.map((paragraph, idx) => (
            <p
              key={idx}
              className="font-mono text-[15px] leading-[1.9]"
              style={{ color: "var(--fg-dim)" }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
