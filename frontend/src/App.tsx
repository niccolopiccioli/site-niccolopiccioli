import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import './index.css';
import emailjs from '@emailjs/browser';

// Initialize EmailJS globally
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "");

import {
  FaReact, FaAngular, FaPython, FaJava, FaDocker, FaDatabase,
  FaGithub, FaLinkedin, FaMusic, FaHeadphones, FaNodeJs, FaBrain,
  FaPlane, FaMapMarkedAlt
} from 'react-icons/fa';
import { SiTypescript, SiDjango, SiNextdotjs, SiTailwindcss, SiGraphql, SiPostgresql } from 'react-icons/si';
import { MdCloud, MdSecurity } from 'react-icons/md';

type Language = 'it' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TRANSLATIONS: Record<Language, any> = {
  it: {
    nav: {
      hero: 'Home',
      about: 'Chi Sono',
      skills: 'Competenze',
      experience: 'Esperienza',
      projects: 'Progetti',
      contact: 'Contatti',
    },
    hero: {
      title: 'Ciao, sono Niccolò Piccioli.',
      subtitle: 'Software Developer for Web Application',
      ctaProjects: 'Guarda i miei progetti',
      ctaContact: 'Contattami',
    },
    about: {
      title: 'Chi Sono',
      p1: "Sono uno sviluppatore software appassionato di tecnologia e innovazione. La mia motivazione principale e costruire prodotti digitali che risolvano problemi reali in modo elegante ed efficiente. Dall'architettura di un backend scalabile all'esperienza utente di un'interfaccia, mi interessa l'intero ciclo di vita di un'applicazione.",
      p2: "Nel mio approccio al lavoro seguo principi come il clean code, la separazione delle responsabilita e la manutenibilita del codice nel tempo. Lavoro bene in contesti agile, dove iterazioni rapide e feedback continuo permettono di migliorare il prodotto in modo progressivo. Ogni problema e un'opportunita per trovare la soluzione piu chiara e solida.",
      p3: "I progetti che preferisco costruire sono quelli che combinano complessita tecnica e impatto concreto: applicazioni web full-stack, API REST ben strutturate, strumenti SaaS e dashboard interattive. Mi appassiona anche il modo in cui l'intelligenza artificiale sta cambiando il flusso di sviluppo, e cerco di integrare gli strumenti AI nel mio workflow quotidiano per lavorare in modo piu rapido e consapevole.",
      p4: "Nel tempo libero mi dedico alla produzione musicale come hobby creativo: un'attivita che mi ha affinato la cura per i dettagli e la capacita di gestire progetti articolati, qualita che porto naturalmente anche nel codice.",
    },
    skills: {
      title: 'Competenze Tecniche',
      list: [
        { title: "Frontend", items: "React, Next.js, Angular, TypeScript, JavaScript, Tailwind CSS, HTML/CSS" },
        { title: "Backend", items: "Python, Django, Django REST Framework, Node.js, Java, REST API, GraphQL" },
        { title: "Database & Architettura", items: "PostgreSQL, MySQL, SQLite, MongoDB, Microservizi, API REST, ORM" },
        { title: "DevOps & Cloud", items: "Docker, Git, GitHub Actions, CI/CD, Linux, Cloud Computing (AWS/GCP)" },
        { title: "Sicurezza & Qualita", items: "Autenticazione JWT, OAuth2, Cybersecurity base, Testing, Code Review" },
        { title: "Intelligenza Artificiale & AI Tools", items: "ChatGPT, Claude, GitHub Copilot, Prompt Engineering, LLM integration, AI-assisted development" },
      ]
    },
    experience: {
      title: 'Esperienza e Formazione',
      items: [
        { date: "2024 - 2026", title: "Software Developer For Web Application", desc: "ITS Academy Prodigi. Focus su tecnologie frontend, architetture backend e sviluppo di sistemi moderni." },
        { date: "Nov 2025 - Lug 2026", title: "Runner / Addetto Magazzino", desc: "Foot Locker Italy (Firenze). Un'esperienza fondamentale che ha affinato la mia velocita operativa, l'efficienza sotto pressione e le dinamiche di lavoro di squadra." },
        { date: "2020 - 2025", title: "Diploma in Sistemi Informativi Aziendali", desc: "IISS Valdarno." },
      ]
    },
    projects: {
      title: 'Progetti',
      list: [
        { title: "Task Manager SaaS", desc: "Applicazione web per la gestione dei task in team, con board Kanban, assegnazione attivita e notifiche in tempo reale. Autenticazione JWT e ruoli utente.", tags: ["React", "TypeScript", "Django REST", "PostgreSQL", "JWT"] },
        { title: "E-commerce Dashboard", desc: "Pannello di amministrazione per negozio online con analytics, gestione ordini, inventario prodotti e grafici di vendita interattivi.", tags: ["React", "Chart.js", "Node.js", "MongoDB", "Tailwind CSS"] },
        { title: "API REST per Blog", desc: "Backend scalabile per una piattaforma di blogging con autenticazione, CRUD articoli, sistema commenti, paginazione e ricerca full-text.", tags: ["Python", "Django", "PostgreSQL", "REST API", "Docker"] },
        { title: "Weather App", desc: "Applicazione meteo con geolocalizzazione automatica, previsioni a 7 giorni, visualizzazioni animate e ricerca citta. Dati da OpenWeatherMap API.", tags: ["React", "TypeScript", "OpenWeatherMap API", "CSS Animations"] },
        { title: "Portfolio Generator", desc: "Tool web che consente di creare portfolio statici personalizzati scegliendo template, colori e contenuti, con export HTML/CSS pronto al deploy.", tags: ["React", "Node.js", "Express", "HTML/CSS", "File System API"] },
        { title: "Real-time Chat App", desc: "Applicazione di chat con WebSocket, rooms multiple, indicatore di digitazione, notifiche push e storico messaggi persistente su database.", tags: ["React", "Django Channels", "WebSocket", "Redis", "PostgreSQL"] },
        { title: "Portfolio Personale", desc: "Questo stesso sito: portfolio con React, Vite e Firebase. Include form di contatto via EmailJS, design responsive e animazioni CSS.", tags: ["React", "TypeScript", "Vite", "Firebase", "EmailJS"] },
      ]
    },
    hobbies: {
      title: 'Oltre il Codice',
      music: { title: 'Produzione Musicale', desc: "Produco musica nel tempo libero spaziando tra hip-hop, elettronica e lo-fi. È un hobby che affina l'attenzione ai dettagli e la gestione di progetti articolati — qualità che porto naturalmente anche nello sviluppo software." },
      travel: { title: 'Viaggi & Esplorazione', desc: "Amo viaggiare e scoprire nuove culture. Ogni viaggio è un'occasione per uscire dalla zona di comfort, osservare come le persone risolvono problemi in modo diverso e tornare con una prospettiva più ampia — sia nella vita che nel lavoro." }
    },
    contact: {
      title: 'Contattami',
      namePlaceholder: 'Il tuo nome',
      emailPlaceholder: 'La tua email',
      messagePlaceholder: 'Il tuo messaggio',
      sendBtn: 'Invia Messaggio',
      sending: 'Invio in corso...',
      success: 'Messaggio inviato con successo!',
      error: 'Errore durante l\'invio. Riprova.',
      configError: 'Configurazione incompleta (.env)',
    },
    footer: {
      copy: '© 2025 Niccolò Piccioli · Castelfranco Piandisco, Italia',
    }
  },
  en: {
    nav: {
      hero: 'Home',
      about: 'About Me',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      title: "Hi, I'm Niccolò Piccioli.",
      subtitle: 'Software Developer for Web Applications',
      ctaProjects: 'View my work',
      ctaContact: 'Contact me',
    },
    about: {
      title: 'About Me',
      p1: "I am a software developer passionate about technology and innovation. My main motivation is building digital products that solve real-world problems elegantly and efficiently. From architecting a scalable backend to the user experience of an interface, I am interested in the entire application lifecycle.",
      p2: "In my approach to work, I follow principles such as clean code, separation of concerns, and long-term maintainability. I thrive in agile environments where rapid iterations and continuous feedback allow for progressive product improvement. Every problem is an opportunity to find the clearest and most robust solution.",
      p3: "The projects I enjoy building most are those that combine technical complexity with concrete impact: full-stack web applications, well-structured REST APIs, SaaS tools, and interactive dashboards. I am also fascinated by how AI is changing the development flow, and I integrate AI tools into my daily workflow to work faster and more consciously.",
      p4: "In my free time, I dedicate myself to music production as a creative hobby: an activity that has sharpened my attention to detail and my ability to manage complex projects—qualities I naturally channel into my code.",
    },
    skills: {
      title: 'Technical Skills',
      list: [
        { title: "Frontend", items: "React, Next.js, Angular, TypeScript, JavaScript, Tailwind CSS, HTML/CSS" },
        { title: "Backend", items: "Python, Django, Django REST Framework, Node.js, Java, REST API, GraphQL" },
        { title: "Database & Architecture", items: "PostgreSQL, MySQL, SQLite, MongoDB, Microservices, API REST, ORM" },
        { title: "DevOps & Cloud", items: "Docker, Git, GitHub Actions, CI/CD, Linux, Cloud Computing (AWS/GCP)" },
        { title: "Security & Quality", items: "JWT Authentication, OAuth2, Cybersecurity basics, Testing, Code Review" },
        { title: "AI & AI Tools", items: "ChatGPT, Claude, GitHub Copilot, Prompt Engineering, LLM integration, AI-assisted development" },
      ]
    },
    experience: {
      title: 'Experience and Education',
      items: [
        { date: "2024 - 2026", title: "Software Developer For Web Application", desc: "ITS Academy Prodigi. Focus on frontend technologies, backend architectures, and modern systems development." },
        { date: "Nov 2025 - Jul 2026", title: "Runner / Warehouse Assistant", desc: "Foot Locker Italy (Florence). A foundational experience that sharpened my operational speed, efficiency under pressure, and teamwork dynamics." },
        { date: "2020 - 2025", title: "Business Information Systems Diploma", desc: "IISS Valdarno." },
      ]
    },
    projects: {
      title: 'Projects',
      list: [
        { title: "Task Manager SaaS", desc: "Web application for team task management, featuring Kanban boards, task assignment, and real-time notifications. JWT authentication and user roles.", tags: ["React", "TypeScript", "Django REST", "PostgreSQL", "JWT"] },
        { title: "E-commerce Dashboard", desc: "Admin panel for an online store with analytics, order management, product inventory, and interactive sales charts.", tags: ["React", "Chart.js", "Node.js", "MongoDB", "Tailwind CSS"] },
        { title: "REST API for Blog", desc: "Scalable backend for a blogging platform with authentication, article CRUD, comment system, pagination, and full-text search.", tags: ["Python", "Django", "PostgreSQL", "REST API", "Docker"] },
        { title: "Weather App", desc: "Weather application with automatic geolocation, 7-day forecasts, animated visualizations, and city search. Powered by OpenWeatherMap API.", tags: ["React", "TypeScript", "OpenWeatherMap API", "CSS Animations"] },
        { title: "Portfolio Generator", desc: "Web tool that allows creating personalized static portfolios by choosing templates, colors, and content, with ready-to-deploy HTML/CSS export.", tags: ["React", "Node.js", "Express", "HTML/CSS", "File System API"] },
        { title: "Real-time Chat App", desc: "Chat application with WebSockets, multiple rooms, typing indicator, push notifications, and persistent message history on a database.", tags: ["React", "Django Channels", "WebSocket", "Redis", "PostgreSQL"] },
        { title: "Personal Portfolio", desc: "This very site: portfolio with React, Vite, and Firebase. Includes contact form via EmailJS, responsive design, and CSS animations.", tags: ["React", "TypeScript", "Vite", "Firebase", "EmailJS"] },
      ]
    },
    hobbies: {
      title: 'Beyond the Code',
      music: { title: 'Music Production', desc: "I produce music in my spare time ranging from hip-hop to electronics and lo-fi. It's a hobby that sharpens attention to detail and the management of complex projects—qualities I naturally bring to software development." },
      travel: { title: 'Travel & Exploration', desc: "I love traveling and discovering new cultures. Every trip is an opportunity to step out of my comfort zone, observe how people solve problems differently, and return with a broader perspective—both in life and work." }
    },
    contact: {
      title: 'Contact Me',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Your email',
      messagePlaceholder: 'Your message',
      sendBtn: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Error while sending. Please try again.',
      configError: 'Incomplete configuration (.env)',
    },
    footer: {
      copy: '© 2025 Niccolò Piccioli · Castelfranco Piandisco, Italy',
    }
  }
};

const SECTIONS = [
  { id: 'hero', key: 'hero' },
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'experience', key: 'experience' },
  { id: 'projects', key: 'projects' },
  { id: 'contact', key: 'contact' },
];

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('it');

  const t = (path: string) => {
    return path.split('.').reduce((obj, key) => obj && obj[key], TRANSLATIONS[lang]);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};

function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

function getLayoutOffsetTop(el: HTMLElement): number {
  let top = 0;
  let current: HTMLElement | null = el;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

const SCROLL_MARGIN: Record<string, number> = {
  projects: 24,
};
const DEFAULT_SCROLL_MARGIN = 8;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const navbarEl = document.querySelector('.navbar');
  const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 60;
  const heading = el.querySelector('h2') as HTMLElement | null;
  const target = heading ?? el;
  const margin = SCROLL_MARGIN[id] ?? DEFAULT_SCROLL_MARGIN;
  const targetY = getLayoutOffsetTop(target) - navbarHeight - margin;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 700;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutQuart(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function useActiveSection() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return active;
}

function useFadeIn() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-in-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <main className="container">
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
};

const Navbar: React.FC = () => {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="lang-switcher">
          <button
            className={`lang-btn ${lang === 'it' ? 'active' : ''}`}
            onClick={() => setLang('it')}
          >IT</button>
          <button
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
          >EN</button>
        </div>
        <div className="navbar-centered-links">
          <ul className="navbar-links">
            {SECTIONS.map(({ id, key }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                >{t(`nav.${key}`)}</a>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ width: '60px' }}></div> {/* Spacer for symmetry */}
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="hero" className="hero-centered">
      <h1>{t('hero.title')}</h1>
      <p className="hero-subtitle">{t('hero.subtitle')}</p>
      <div className="hero-cta">
        <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>{t('hero.ctaProjects')}</a>
        <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t('hero.ctaContact')}</a>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  return (
    <section id="about" ref={ref} className="fade-in">
      <h2>{t('about.title')}</h2>
      <div className="about-text">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
        <p>{t('about.p4')}</p>
      </div>
    </section>
  );
};

const Skills: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  const list = t('skills.list');

  const icons = [
    <FaReact size={28} color="var(--accent-blue)" />,
    <SiDjango size={28} color="var(--accent-blue)" />,
    <FaDatabase size={28} color="var(--accent-blue)" />,
    <MdCloud size={28} color="var(--accent-blue)" />,
    <MdSecurity size={28} color="var(--accent-blue)" />,
    <FaBrain size={28} color="var(--accent-blue)" />
  ];

  return (
    <section id="skills" ref={ref} className="fade-in">
      <h2>{t('skills.title')}</h2>
      <div className="skills-grid">
        {list.map((skill: any, index: number) => (
          <div key={index} className="card" style={{ transitionDelay: `${index * 0.08}s` }}>
            <div className="card-icon">{icons[index]}</div>
            <h3>{skill.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{skill.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Experience: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  const items = t('experience.items');
  return (
    <section id="experience" ref={ref} className="fade-in">
      <h2>{t('experience.title')}</h2>
      <div className="timeline">
        {items.map((item: any, index: number) => (
          <div key={index} className="timeline-item">
            <span className="timeline-date">{item.date}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Projects: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  const projects = t('projects.list');

  const githubLinks = [
    "#", "#", "#", "#", "#", "#", "https://github.com/niccolopiccioli/site-niccolopiccioli"
  ];
  const demoLinks = [
    "#", "#", null, "#", "#", null, null
  ];

  const renderCard = (project: any, index: number) => (
    <div key={index} className="project-card" style={{ transitionDelay: `${index * 0.08}s` }}>
      <div className="project-card-header">
        <FaGithub size={16} className="project-repo-icon" />
        <h3>{project.title}</h3>
      </div>
      <p>{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((tag: string) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="project-links">
        <a href={githubLinks[index]} target="_blank" rel="noopener noreferrer" className="project-link">
          <FaGithub style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
          GitHub
        </a>
        {demoLinks[index] && (
          <a href={demoLinks[index]} target="_blank" rel="noopener noreferrer" className="project-link">
            Demo
          </a>
        )}
      </div>
    </div>
  );

  return (
    <section id="projects" ref={ref} className="fade-in">
      <h2>{t('projects.title')}</h2>
      <div className="projects-row projects-row-4">
        {projects.slice(0, 4).map((p: any, i: number) => renderCard(p, i))}
      </div>
      <div className="projects-row projects-row-3">
        {projects.slice(4).map((p: any, i: number) => renderCard(p, i + 4))}
      </div>
    </section>
  );
};

const Hobbies: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  return (
    <section id="hobbies" ref={ref} className="fade-in">
      <h2>{t('hobbies.title')}</h2>
      <div className="hobbies-grid">
        <div className="hobbies-card" style={{ transitionDelay: '0.05s' }}>
          <div className="hobbies-card-icon">
            <FaHeadphones size={32} />
          </div>
          <div className="hobbies-card-content">
            <h3><FaMusic style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />{t('hobbies.music.title')}</h3>
            <p>{t('hobbies.music.desc')}</p>
          </div>
        </div>
        <div className="hobbies-card" style={{ transitionDelay: '0.15s' }}>
          <div className="hobbies-card-icon">
            <FaPlane size={32} />
          </div>
          <div className="hobbies-card-content">
            <h3><FaMapMarkedAlt style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />{t('hobbies.travel.title')}</h3>
            <p>{t('hobbies.travel.desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log("DEBUG - Invio con Service ID:", serviceId);

    console.log("EmailJS Config Check:", {
      service: serviceId ? "Present" : "Missing",
      template: templateId ? "Present" : "Missing",
      key: publicKey ? "Present" : "Missing"
    });

    if (!serviceId || !templateId || !publicKey) {
      setStatus(t('contact.configError'));
      return;
    }

    setStatus(t('contact.sending'));
    try {
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      if (response.status === 200) {
        setStatus(t('contact.success'));
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw response;
      }
    } catch (error: any) {
      console.error("ERRORE DETTAGLIATO:", error);
      const errorMsg = error?.text || error?.message || t('contact.error');
      setStatus(`Errore: ${errorMsg}`);
    }
  };

  return (
    <section id="contact" ref={ref} className="fade-in contact-centered">
      <h2>{t('contact.title')}</h2>
      <form className="contact-form contact-card" onSubmit={handleSubmit}>
        <input
          type="text" placeholder={t('contact.namePlaceholder')} required
          value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email" placeholder={t('contact.emailPlaceholder')} required
          value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder={t('contact.messagePlaceholder')} rows={5} required
          value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
        ></textarea>
        <button type="submit" className="btn btn-primary">{t('contact.sendBtn')}</button>
        {status && <p style={{ marginTop: '1rem', color: 'var(--accent-blue)' }}>{status}</p>}
      </form>
    </section>
  );
};

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="footer-inner">
        <span className="footer-copy">{t('footer.copy')}</span>
        <div className="footer-links">
          <a href="mailto:niccolopiccioli68@gmail.com" className="footer-social">
            niccolopiccioli68@gmail.com
          </a>
          <a href="https://github.com/niccolopiccioli" target="_blank" rel="noopener noreferrer" className="footer-social">
            <FaGithub size={18} /> GitHub
          </a>
          <a href="https://linkedin.com/in/niccolopiccioli" target="_blank" rel="noopener noreferrer" className="footer-social">
            <FaLinkedin size={18} /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default App;
