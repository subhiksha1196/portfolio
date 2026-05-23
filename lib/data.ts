import { Project, ResearchEntry } from "./types";

export const meta = {
  name: "Subhiksha",
  role: "Full-Stack Developer & AI/ML Researcher",
  location: "Chennai · SSN College of Engineering · 2024–2028",
  email: "subhiksha1196@gmail.com",
  github: "https://github.com/subhiksha1196",
  linkedin: "https://www.linkedin.com/in/subhiksha1196",
  leetcode: "https://leetcode.com/u/subhiksha1196/",
};

export const projects: Project[] = [
  /* ── Featured ───────────────────────────────────────────── */
  {
    id: "eventhub",
    title: "EventHub",
    featured: true,
    description:
      "College event and mentor-mentee activity tracker built as a microservices system — three independent Spring Boot services each with their own MongoDB database, secured with JWT and a role-based React frontend for students and faculty.",
    tech: ["React 19", "TypeScript", "Spring Boot 3", "MongoDB", "JWT"],
    github: "https://github.com/subhiksha1196/EventHub",
    demo: "https://eventhub-green-five.vercel.app/",
  },
  {
    id: "fraudshield",
    title: "FraudShield",
    featured: true,
    description:
      "AI-powered scam detection platform built to protect Indian users from SMS, WhatsApp, and email fraud. Designed and built the Dashboard, Result, and Transparency pages with a MuRIL-backed FastAPI inference layer.",
    tech: ["TypeScript", "Tailwind CSS", "Supabase", "FastAPI", "MongoDB"],
    github: "https://github.com/Sanjai05122006/fraudshield",
    demo: "https://fraudshield-8sqp.vercel.app/",
  },
  {
    id: "smart-parking",
    title: "Smart Parking System",
    featured: true,
    description:
      "Parking management system that solves real-time slot allocation — supports reservations, priority access for differently-abled users, and multiple payment gateways, all built end-to-end with Spring Boot.",
    tech: ["Java", "Spring Boot 3", "HTML/CSS/JS", "Maven"],
    github: "https://github.com/subhiksha1196/smart-parking-system",
    demo: "",
    image: "/projects/smart-parking-system.png",
  },

  /* ── More ───────────────────────────────────────────────── */
  {
    id: "weather-tracker",
    title: "Weather Tracker",
    featured: false,
    description:
      "Real-time weather dashboard with smart city autocomplete, debounced API calls, 5-day forecast, and graceful error handling.",
    tech: ["HTML", "CSS", "JavaScript", "REST APIs"],
    github: "https://github.com/subhiksha1196/weather-tracker",
    demo: "https://subhiksha1196.github.io/weather-tracker/",
  },
  {
    id: "currency-converter",
    title: "Currency Converter",
    featured: false,
    description:
      "Live currency conversion across 150+ currencies with real-time exchange rates, flag icons, and one-click swap functionality.",
    tech: ["HTML", "CSS", "JavaScript", "REST APIs"],
    github: "https://github.com/subhiksha1196/currency-converter",
    demo: "https://subhiksha1196.github.io/currency-converter/",
  },
  {
    id: "snakescape",
    title: "Snakescape",
    featured: false,
    description:
      "Modern Snake game remake with multiple game modes, smooth UI animations, high-score tracking, and responsive keyboard controls.",
    tech: ["Raylib"],
    github: "https://github.com/subhiksha1196/snakescape",
    demo: "",
    image: "/projects/snakescape.png",
  },
  {
    id: "object-detection",
    title: "Object Segmentation — COIL-20",
    featured: false,
    description:
      "Image segmentation experiments on the COIL-20 object dataset, exploring clustering and contour-based approaches for unsupervised object recognition.",
    tech: ["OpenCV", "NumPy", "Matplotlib"],
    github: "https://github.com/vv-26/segmentation-coil20",
    demo: "",
    image: "",
  },
];

export const skills: Record<string, string[]> = {
  Frontend: ["TypeScript", "JavaScript", "React 19", "Next.js 14", "Tailwind CSS", "HTML", "CSS"],
  Backend:  ["Python", "Java", "Spring Boot 3", "Spring Security", "FastAPI", "Node.js", "REST APIs", "JWT", "C"],
  Databases: ["MongoDB", "MySQL", "Supabase", "Oracle SQL", "Cassandra", "Neo4j"],
  Tools: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Figma", "Google Colab", "Kaggle", "LaTeX"],
};

export const research: ResearchEntry[] = [
  {
    title: "Detecting Machine-Generated Code",
    venue: "SemEval-2026 Task 13",
    role: "Co-author",
    status: "Under Review",
    description:
      "Fine-tuned CodeBERT for binary and multi-class detection of AI-generated code across multiple programming languages on curated benchmark datasets. Macro F1 of 0.9935 on in-distribution data.",
    tags: ["NLP", "CodeBERT", "Python", "Transformers"],
    repo: "https://github.com/subhiksha1196/semeval-2026-task13",
  },
  {
    title: "Graph Neural Networks for Cybersecurity",
    venue: "SSN College of Engineering",
    role: "Researcher",
    status: "Ongoing",
    description:
      "Applying GNNs to network intrusion detection and threat modelling. Exploring graph construction strategies, node embeddings, and model performance on large-scale security datasets.",
    tags: ["GNN", "Machine Learning", "Python", "Cybersecurity"],
    repo: "",
  },
];

export const about = [
  "I build things that work end-to-end — React frontends, Spring Boot microservices, MongoDB schemas. On the side, I co-authored a SemEval paper on AI-generated code detection and I'm applying GNNs to cybersecurity problems.",
  "Third year at SSN College of Engineering. I've been building real projects since day one — not waiting until I felt ready.",
];
