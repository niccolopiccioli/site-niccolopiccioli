export type Language = 'it' | 'en';
export type Theme = 'light' | 'dark';

export interface Skill {
  title: string;
  items: string;
  level: number;
  levelLabel: string;
}

export interface ExperienceItem {
  date: string;
  title: string;
  desc: string;
  tag?: string;
}

export type ProjectCategory =
  | 'SaaS'
  | 'E-commerce'
  | 'Booking'
  | 'Siti web'
  | 'Tool'
  | 'Game'
  | 'Dashboard';

export interface ProjectItem {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  demo: string | null;
  github: string | null;
  category: ProjectCategory;
  featured?: boolean;
}

export interface HobbyItem {
  title: string;
  desc: string;
}

export interface HeroStrings {
  badge: string;
  title: string;
  subtitle: string;
  ctaProjects: string;
  ctaContact: string;
  scrollHint: string;
}

export interface AboutStrings {
  kicker: string;
  title: string;
  lead: string;
  p1: string;
  p2: string;
  p3: string;
  stats: { num: string; label: string }[];
}

export interface TranslationSchema {
  nav: Record<string, string>;
  hero: HeroStrings;
  ticker: string[];
  about: AboutStrings;
  skills: { title: string; kicker: string; lead: string; list: Skill[] };
  experience: { title: string; kicker: string; lead: string; items: ExperienceItem[] };
  projects: {
    title: string;
    kicker: string;
    lead: string;
    searchPlaceholder: string;
    all: string;
    featuredLabel: string;
    allLabel: string;
    count: string;
    live: string;
    demo: string;
    code: string;
    empty: string;
  };
  hobbies: { title: string; kicker: string; lead: string; music: HobbyItem; travel: HobbyItem };
  contact: Record<string, string>;
  footer: Record<string, string>;
}
