import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "var(--bg)" }}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-4" style={{ color: "var(--accent)" }}>
        404 — not found
      </p>
      <h1
        style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "clamp(48px, 8vw, 96px)",
          fontWeight: 600,
          color: "var(--fg)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        <i>Lost?</i>
      </h1>
      <p className="font-mono text-[14px] mt-6 mb-10" style={{ color: "var(--muted)" }}>
        This page doesn&apos;t exist. Let&apos;s get you back.
      </p>
      <Link href="/" className="btn-outline">
        ← back home
      </Link>
    </main>
  );
}
