import { Language, ProjectCategory } from '../types';

export interface ProjectRecord {
  slug: string;
  title: { it: string; en: string };
  desc: { it: string; en: string };
  tags: string[];
  demo: string | null;
  github: string | null;
  category: ProjectCategory;
  featured?: boolean;
}

/**
 * Tutti i progetti con deploy READY su Vercel (team niccolopicciolis-projects).
 * Esclusi: espinterface + frontend (ultimo deploy ERROR).
 */
export const PROJECTS: ProjectRecord[] = [
  {
    slug: 'taskwave',
    title: { it: 'TaskWave', en: 'TaskWave' },
    desc: {
      it: 'Kanban realtime per team di sviluppo: workspace multipli, drag-and-drop fluido, realtime sync, notifiche smart e piani Free/Pro con Stripe.',
      en: 'Realtime Kanban for dev teams: multiple workspaces, fluid drag-and-drop, realtime sync, smart notifications and Free/Pro plans with Stripe.',
    },
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
    demo: 'https://taskwave-rust.vercel.app',
    github: 'https://github.com/niccolopiccioli/taskwave',
    category: 'SaaS',
    featured: true,
  },
  {
    slug: 'riciclapp',
    title: { it: 'Riciclapp', en: 'Riciclapp' },
    desc: {
      it: 'Gestione rifiuti intelligente e gamificata: AI scan degli oggetti, calendario di raccolta personalizzato, segnalazioni geolocalizzate, badge e classifiche.',
      en: 'Smart, gamified waste management: AI object scan, personalized pickup calendar, geolocated reports, badges and leaderboards.',
    },
    tags: ['Next.js', 'TypeScript', 'AI Scan', 'Gamification', 'Tailwind CSS'],
    demo: 'https://riciclappp.vercel.app',
    github: null,
    category: 'SaaS',
    featured: true,
  },
  {
    slug: 'rewinddrop',
    title: { it: 'RewindDrop — Streetwear E-shop', en: 'RewindDrop — Streetwear E-shop' },
    desc: {
      it: 'E-shop streetwear con drop limitati, catalogo, lookbook editoriale, carrello e checkout. Estetica curata, mood Milano SS26.',
      en: 'Streetwear e-shop with limited drops, catalog, editorial lookbook, cart and checkout. Curated aesthetic, Milan SS26 mood.',
    },
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    demo: 'https://rewinddrop.vercel.app',
    github: 'https://github.com/niccolopiccioli/RewindDrop',
    category: 'E-commerce',
    featured: true,
  },
  {
    slug: 'sweet-lab',
    title: { it: 'Sweet Lab — Luxury Bakery', en: 'Sweet Lab — Luxury Bakery' },
    desc: {
      it: 'Sito multilingue per pasticceria di lusso a Milano: animazioni GSAP, scroll fluido Lenis, prenotazioni tavoli e design premium ossessivo nei dettagli.',
      en: 'Multilingual site for a luxury Milan patisserie: GSAP animations, Lenis smooth scroll, table booking and obsessively premium design.',
    },
    tags: ['Next.js', 'React', 'GSAP', 'Framer Motion', 'next-intl'],
    demo: 'https://luxury-bakery.vercel.app',
    github: 'https://github.com/niccolopiccioli/luxury-bakery',
    category: 'Siti web',
    featured: true,
  },
  {
    slug: 'animepedia',
    title: { it: 'AnimePedia', en: 'AnimePedia' },
    desc: {
      it: 'Esplora migliaia di anime e manga con dati da API gratuite (AniList, Jikan, MangaDex): trending, stagionali, lista personale e collegamenti streaming.',
      en: 'Explore thousands of anime and manga powered by free APIs (AniList, Jikan, MangaDex): trending, seasonal, personal list and streaming links.',
    },
    tags: ['Next.js', 'TypeScript', 'AniList', 'Jikan', 'MangaDex'],
    demo: 'https://animepedia-iota.vercel.app',
    github: null,
    category: 'Siti web',
  },
  {
    slug: 'vibeclash',
    title: { it: 'VibeClash — Music Party Game', en: 'VibeClash — Music Party Game' },
    desc: {
      it: 'Party game musicale multiplayer in realtime: crea una room, invita 2–8 amici, associa canzoni ai prompt e vota la migliore. 5 round, un campione.',
      en: 'Realtime multiplayer music party game: create a room, invite 2–8 friends, match songs to prompts and vote the best. 5 rounds, one champion.',
    },
    tags: ['Next.js', 'WebSocket', 'Realtime', 'Multiplayer'],
    demo: 'https://stupor-try.vercel.app',
    github: null,
    category: 'Game',
  },
  {
    slug: 'veluna',
    title: { it: 'Veluna — Piattaforma Prenotazioni', en: 'Veluna — Booking Platform' },
    desc: {
      it: 'Piattaforma di prenotazione online per studi e centri estetici: booking senza account, area staff, conferma via email e gestione appuntamenti.',
      en: 'Online booking platform for studios and beauty centers: no-account booking, staff area, email confirmation and appointment management.',
    },
    tags: ['TanStack Start', 'TypeScript', 'Booking', 'Email'],
    demo: 'https://veluna-mocha.vercel.app',
    github: 'https://github.com/niccolopiccioli/studio-nails-pro',
    category: 'SaaS',
  },
  {
    slug: 'studio-nails',
    title: { it: 'Studio Nails — Atelier Milano', en: 'Studio Nails — Milan Atelier' },
    desc: {
      it: 'Sito + booking per nail atelier a Milano: semipermanente, gel e nail art su misura. Prenotazione in un minuto senza account, portfolio lavori.',
      en: 'Site + booking for a Milan nail atelier: gel, semi-permanent and custom nail art. One-minute no-account booking, work portfolio.',
    },
    tags: ['TanStack Start', 'TypeScript', 'Booking', 'Tailwind CSS'],
    demo: 'https://studio-nails-one.vercel.app',
    github: 'https://github.com/niccolopiccioli/studio-nails-pro',
    category: 'Booking',
  },
  {
    slug: 'estetica-pura',
    title: { it: 'Estetica Pura — Centro Estetico', en: 'Estetica Pura — Beauty Center' },
    desc: {
      it: 'Sito + prenotazioni per centro estetico a Milano: rituali viso/corpo/relax, booking senza account e conferma immediata via email.',
      en: 'Site + booking for a Milan beauty center: face/body/relax rituals, no-account booking with instant email confirmation.',
    },
    tags: ['TanStack Start', 'TypeScript', 'Booking', 'Tailwind CSS'],
    demo: 'https://estetica-pura.vercel.app',
    github: 'https://github.com/niccolopiccioli/studio-nails-pro',
    category: 'Booking',
  },
  {
    slug: 'azuresky',
    title: { it: 'AzureSky Airlines — Concept', en: 'AzureSky Airlines — Concept' },
    desc: {
      it: 'Concept completo di compagnia aerea: ricerca voli, rotte, flotta, piani SkyPass, sezione recensioni e funnel di prenotazione.',
      en: 'Full airline concept: flight search, routes, fleet, SkyPass plans, reviews and booking funnel.',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    demo: 'https://azuresky-fly.vercel.app',
    github: 'https://github.com/niccolopiccioli/azuresky',
    category: 'Siti web',
  },
  {
    slug: 'energydream',
    title: { it: 'EnergyDream — Corporate B2B', en: 'EnergyDream — Corporate B2B' },
    desc: {
      it: 'Sito corporate B2B per UPS industriali: configuratore prodotti, settori applicativi, documentazione per gare e blog tecnico multilingua.',
      en: 'B2B corporate site for industrial UPS: product configurator, application sectors, tender documentation and multilingual tech blog.',
    },
    tags: ['Next.js', 'TypeScript', 'SEO', 'i18n'],
    demo: 'https://energydream.vercel.app',
    github: 'https://github.com/niccolopiccioli/energydream',
    category: 'Siti web',
  },
  {
    slug: 'site-generator',
    title: { it: 'Site Generator — Ready Layout', en: 'Site Generator — Ready Layout' },
    desc: {
      it: 'Tool che genera siti statici personalizzati: scegli template, colori e contenuti, poi esporta HTML/CSS pronto al deploy.',
      en: 'Tool that generates custom static sites: pick template, colors and content, then export deploy-ready HTML/CSS.',
    },
    tags: ['React', 'Node.js', 'Express', 'HTML/CSS'],
    demo: 'https://site-generator-eight.vercel.app',
    github: 'https://github.com/niccolopiccioli/ready-layout',
    category: 'Tool',
  },
  {
    slug: 'taskflow-pro',
    title: { it: 'TaskFlow Pro', en: 'TaskFlow Pro' },
    desc: {
      it: 'Evoluzione del task manager per team: board, automazioni e viste produttività in un workspace unico e minimale.',
      en: 'Evolved team task manager: boards, automations and productivity views in one minimal workspace.',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    demo: 'https://taskflow-pro-niccolopicciolis-projects.vercel.app',
    github: 'https://github.com/niccolopiccioli/taskwave',
    category: 'SaaS',
  },
];

export function getProjects(lang: Language) {
  return PROJECTS.map((p) => ({
    slug: p.slug,
    title: p.title[lang],
    desc: p.desc[lang],
    tags: p.tags,
    demo: p.demo,
    github: p.github,
    category: p.category,
    featured: p.featured,
  }));
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'SaaS',
  'Booking',
  'E-commerce',
  'Siti web',
  'Tool',
  'Game',
];
