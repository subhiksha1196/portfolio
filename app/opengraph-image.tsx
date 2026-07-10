import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Subhiksha — Full-Stack Developer & AI/ML Researcher";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#080810",
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(167,139,250,0.20) 0%, rgba(8,8,16,0) 55%)",
          padding: "90px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "#a78bfa",
            letterSpacing: 2,
            marginBottom: 28,
          }}
        >
          SUBHIKSHA.DEV
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#e2e2f0",
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          Subhiksha
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#c4b5fd",
            marginBottom: 36,
          }}
        >
          Full-Stack Developer &amp; AI/ML Researcher
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#9090b0",
            maxWidth: 900,
          }}
        >
          CS @ SSN College of Engineering · Building full-stack apps · NLP &amp; Cybersecurity Research
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            gap: 16,
          }}
        >
          {["React", "Next.js", "Spring Boot", "MongoDB", "Python"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 22,
                color: "#8080a8",
                backgroundColor: "#10101e",
                border: "1px solid rgba(167,139,250,0.25)",
                borderRadius: 8,
                padding: "10px 20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
