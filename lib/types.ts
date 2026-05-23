// lib/types.ts

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  featured?: boolean;
  badge?: string;
  image?: string;
  isPrivate?: boolean;
};

export type ResearchEntry = {
  title: string;
  venue: string;
  role: string;
  status: "Under Review" | "Ongoing" | "Published";
  description: string;
  tags: string[];
  repo: string;
};
