import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import Cursor from "@/components/Cursor";
import ChatBot from "@/components/ChatBot";
import ChatBotNudge from "@/components/ChatBotNudge";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Subhiksha's Portfolio",
  description:
    "Portfolio of Subhiksha, CS student and AI/ML researcher at SSN College of Engineering, Chennai.",
  authors: [{ name: "Subhiksha" }],
  openGraph: {
    title: "Subhiksha — Full-Stack Developer & AI/ML Researcher",
    description: "CS student building full-stack apps and doing NLP + cybersecurity research at SSN College of Engineering.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Subhiksha — Full-Stack Developer & AI/ML Researcher",
    description: "CS student building full-stack apps and doing NLP + cybersecurity research.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${grotesk.variable} ${jetbrains.variable} antialiased`}>
        <Providers>
          <Cursor />
          {children}
          <ChatBotNudge />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
