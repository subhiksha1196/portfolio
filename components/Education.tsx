"use client";

import { useInView } from "@/hooks/useInView";

const education = [
  {
    institution: "SSN College of Engineering",
    degree: "B.E. Computer Science & Engineering",
    period: "2024 – 2028",
    detail: "CGPA: 8.718 / 10",
  },
  {
    institution: "Vivekananda Matric Hr. Sec. School",
    degree: "Class XII — PCM",
    period: "2024",
    detail: "96.3%",
  },
  {
    institution: "Vivekananda Matric Hr. Sec. School",
    degree: "Class X",
    period: "2022",
    detail: "98.6%",
  },
];

const achievements = [
  {
    icon: "fa-solid fa-trophy",
    title: "School Topper",
    desc: "Consistently ranked among the top 3 in all grades.",
  },
  {
    icon: "fa-solid fa-flask",
    title: "198.5 / 200 Cutoff — PCM",
    desc: "Scored a near-perfect cutoff in Physics, Chemistry & Mathematics in XII.",
  },
];

export default function Education() {
  const ref = useInView<HTMLElement>();

  return (
    <section id="education" ref={ref}>
      <p className="section-label">
        <i className="fa-solid fa-graduation-cap text-[10px]" />
        education &amp; achievements
      </p>

      <div className="flex flex-col md:flex-row gap-12 md:gap-16">

        {/* Education — slides in from left */}
        <div className="md:w-[45%] shrink-0 flex flex-col gap-5 about-left">
          <p className="font-mono text-[13px] uppercase tracking-[0.15em]" style={{ color: "var(--accent)" }}>
            education
          </p>
          {education.map((edu, i) => (
            <div
              key={i}
              className="flex flex-col gap-0.5 pl-3"
              style={{ borderLeft: "1px solid var(--border)" }}
            >
              <span className="font-mono text-[14px] font-semibold" style={{ color: "var(--fg)" }}>
                {edu.institution}
              </span>
              <span className="font-mono text-[13px]" style={{ color: "var(--fg-dim)" }}>
                {edu.degree}
              </span>
              <span className="font-mono text-[12px]" style={{ color: "var(--muted)" }}>
                {edu.period} &nbsp;·&nbsp; {edu.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Achievements — slides in from right, cards stagger */}
        <div className="flex flex-col gap-5 flex-1 about-right">
          <p className="font-mono text-[13px] uppercase tracking-[0.15em]" style={{ color: "var(--accent)" }}>
            achievements
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-grid">
            {achievements.map((a, i) => (
              <div key={i} className="card p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <i className={`${a.icon} text-[14px]`} style={{ color: "var(--accent)" }} />
                  <span className="font-mono text-[13px] font-semibold" style={{ color: "var(--fg)" }}>
                    {a.title}
                  </span>
                </div>
                <p className="font-mono text-[12px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
