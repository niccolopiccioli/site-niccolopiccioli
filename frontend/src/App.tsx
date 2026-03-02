import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import {
  FaReact, FaAngular, FaPython, FaJava, FaDocker, FaDatabase,
  FaGithub, FaLinkedin, FaMusic, FaHeadphones, FaNodeJs, FaBrain,
  FaPlane, FaMapMarkedAlt
} from 'react-icons/fa';
import { SiTypescript, SiDjango, SiNextdotjs, SiTailwindcss, SiGraphql, SiPostgresql } from 'react-icons/si';
import { MdCloud, MdSecurity } from 'react-icons/md';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'Chi Sono' },
  { id: 'skills', label: 'Competenze' },
  { id: 'experience', label: 'Esperienza' },
  { id: 'projects', label: 'Progetti' },
  { id: 'contact', label: 'Contatti' },
];

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
    <>
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
    </>
  );
};

const Navbar: React.FC = () => {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-inner navbar-centered">
        <ul className="navbar-links">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
              >{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-centered">
      <h1>Ciao, sono Niccolò Piccioli.</h1>
      <p className="hero-subtitle">Software Developer for Web Application</p>
      <div className="hero-cta">
        <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Guarda i miei progetti</a>
        <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contattami</a>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  const ref = useFadeIn();
  return (
    <section id="about" ref={ref} className="fade-in">
      <h2>Chi Sono</h2>
      <div className="about-text">
        <p>
          Sono uno sviluppatore software appassionato di tecnologia e innovazione. La mia motivazione principale e costruire
          prodotti digitali che risolvano problemi reali in modo elegante ed efficiente. Dall'architettura di un backend
          scalabile all'esperienza utente di un'interfaccia, mi interessa l'intero ciclo di vita di un'applicazione.
        </p>
        <p>
          Nel mio approccio al lavoro seguo principi come il clean code, la separazione delle responsabilita e la
          manutenibilita del codice nel tempo. Lavoro bene in contesti agile, dove iterazioni rapide e feedback continuo
          permettono di migliorare il prodotto in modo progressivo. Ogni problema e un'opportunita per trovare la soluzione
          piu chiara e solida.
        </p>
        <p>
          I progetti che preferisco costruire sono quelli che combinano complessita tecnica e impatto concreto: applicazioni
          web full-stack, API REST ben strutturate, strumenti SaaS e dashboard interattive. Mi appassiona anche il modo in
          cui l'intelligenza artificiale sta cambiando il flusso di sviluppo, e cerco di integrare gli strumenti AI nel
          mio workflow quotidiano per lavorare in modo piu rapido e consapevole.
        </p>
        <p>
          Nel tempo libero mi dedico alla produzione musicale come hobby creativo: un'attivita che mi ha affinato la
          cura per i dettagli e la capacita di gestire progetti articolati, qualita che porto naturalmente anche nel codice.
        </p>
      </div>
    </section>
  );
};

const Skills: React.FC = () => {
  const ref = useFadeIn();
  const skillsList = [
    {
      title: "Frontend",
      items: "React, Next.js, Angular, TypeScript, JavaScript, Tailwind CSS, HTML/CSS",
      icon: <FaReact size={28} color="var(--accent-blue)" />
    },
    {
      title: "Backend",
      items: "Python, Django, Django REST Framework, Node.js, Java, REST API, GraphQL",
      icon: <SiDjango size={28} color="var(--accent-blue)" />
    },
    {
      title: "Database & Architettura",
      items: "PostgreSQL, MySQL, SQLite, MongoDB, Microservizi, API REST, ORM",
      icon: <FaDatabase size={28} color="var(--accent-blue)" />
    },
    {
      title: "DevOps & Cloud",
      items: "Docker, Git, GitHub Actions, CI/CD, Linux, Cloud Computing (AWS/GCP)",
      icon: <MdCloud size={28} color="var(--accent-blue)" />
    },
    {
      title: "Sicurezza & Qualita",
      items: "Autenticazione JWT, OAuth2, Cybersecurity base, Testing, Code Review",
      icon: <MdSecurity size={28} color="var(--accent-blue)" />
    },
    {
      title: "Intelligenza Artificiale & AI Tools",
      items: "ChatGPT, Claude, GitHub Copilot, Prompt Engineering, LLM integration, AI-assisted development",
      icon: <FaBrain size={28} color="var(--accent-blue)" />
    },
  ];

  return (
    <section id="skills" ref={ref} className="fade-in">
      <h2>Competenze Tecniche</h2>
      <div className="skills-grid">
        {skillsList.map((skill, index) => (
          <div key={index} className="card" style={{ transitionDelay: `${index * 0.08}s` }}>
            <div className="card-icon">{skill.icon}</div>
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
  return (
    <section id="experience" ref={ref} className="fade-in">
      <h2>Esperienza e Formazione</h2>
      <div className="timeline">
        <div className="timeline-item">
          <span className="timeline-date">2024 - 2026</span>
          <h3>Software Developer For Web Application</h3>
          <p>ITS Academy Prodigi. Focus su tecnologie frontend, architetture backend e sviluppo di sistemi moderni.</p>
        </div>
        <div className="timeline-item">
          <span className="timeline-date">Nov 2025 - Lug 2026</span>
          <h3>Runner / Addetto Magazzino</h3>
          <p>Foot Locker Italy (Firenze). Un'esperienza fondamentale che ha affinato la mia velocita operativa, l'efficienza sotto pressione e le dinamiche di lavoro di squadra.</p>
        </div>
        <div className="timeline-item">
          <span className="timeline-date">2020 - 2025</span>
          <h3>Diploma in Sistemi Informativi Aziendali</h3>
          <p>IISS Valdarno.</p>
        </div>
      </div>
    </section>
  );
};

const Projects: React.FC = () => {
  const ref = useFadeIn();
  const projects = [
    {
      title: "Task Manager SaaS",
      description: "Applicazione web per la gestione dei task in team, con board Kanban, assegnazione attivita e notifiche in tempo reale. Autenticazione JWT e ruoli utente.",
      tags: ["React", "TypeScript", "Django REST", "PostgreSQL", "JWT"],
      github: "#",
      demo: "#",
    },
    {
      title: "E-commerce Dashboard",
      description: "Pannello di amministrazione per negozio online con analytics, gestione ordini, inventario prodotti e grafici di vendita interattivi.",
      tags: ["React", "Chart.js", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "#",
      demo: "#",
    },
    {
      title: "API REST per Blog",
      description: "Backend scalabile per una piattaforma di blogging con autenticazione, CRUD articoli, sistema commenti, paginazione e ricerca full-text.",
      tags: ["Python", "Django", "PostgreSQL", "REST API", "Docker"],
      github: "#",
      demo: null,
    },
    {
      title: "Weather App",
      description: "Applicazione meteo con geolocalizzazione automatica, previsioni a 7 giorni, visualizzazioni animate e ricerca citta. Dati da OpenWeatherMap API.",
      tags: ["React", "TypeScript", "OpenWeatherMap API", "CSS Animations"],
      github: "#",
      demo: "#",
    },
    {
      title: "Portfolio Generator",
      description: "Tool web che consente di creare portfolio statici personalizzati scegliendo template, colori e contenuti, con export HTML/CSS pronto al deploy.",
      tags: ["React", "Node.js", "Express", "HTML/CSS", "File System API"],
      github: "#",
      demo: "#",
    },
    {
      title: "Real-time Chat App",
      description: "Applicazione di chat con WebSocket, rooms multiple, indicatore di digitazione, notifiche push e storico messaggi persistente su database.",
      tags: ["React", "Django Channels", "WebSocket", "Redis", "PostgreSQL"],
      github: "#",
      demo: null,
    },
    {
      title: "Portfolio Personale",
      description: "Questo stesso sito: portfolio full-stack con React, Vite e Django. Include form di contatto con backend API, design responsive e animazioni CSS.",
      tags: ["React", "TypeScript", "Vite", "Django"],
      github: "https://github.com/niccolopiccioli",
      demo: null,
    },
  ];

  const renderCard = (project: typeof projects[0], index: number, rowOffset = 0) => (
    <div key={index} className="project-card" style={{ transitionDelay: `${index * 0.08}s` }}>
      <div className="project-card-header">
        <FaGithub size={16} className="project-repo-icon" />
        <h3>{project.title}</h3>
      </div>
      <p>{project.description}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
          <FaGithub style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
          GitHub
        </a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
            Demo
          </a>
        )}
      </div>
    </div>
  );

  return (
    <section id="projects" ref={ref} className="fade-in">
      <h2>Progetti</h2>
      <div className="projects-row projects-row-4">
        {projects.slice(0, 4).map((p, i) => renderCard(p, i))}
      </div>
      <div className="projects-row projects-row-3">
        {projects.slice(4).map((p, i) => renderCard(p, i))}
      </div>
    </section>
  );
};

const Hobbies: React.FC = () => {
  const ref = useFadeIn();
  return (
    <section id="hobbies" ref={ref} className="fade-in">
      <h2>Oltre il Codice</h2>
      <div className="hobbies-grid">
        <div className="hobbies-card" style={{ transitionDelay: '0.05s' }}>
          <div className="hobbies-card-icon">
            <FaHeadphones size={32} />
          </div>
          <div className="hobbies-card-content">
            <h3><FaMusic style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />Produzione Musicale</h3>
            <p>
              Produco musica nel tempo libero spaziando tra hip-hop, elettronica e lo-fi.
              È un hobby che affina l'attenzione ai dettagli e la gestione di progetti articolati —
              qualità che porto naturalmente anche nello sviluppo software.
            </p>
          </div>
        </div>
        <div className="hobbies-card" style={{ transitionDelay: '0.15s' }}>
          <div className="hobbies-card-icon">
            <FaPlane size={32} />
          </div>
          <div className="hobbies-card-content">
            <h3><FaMapMarkedAlt style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />Viaggi & Esplorazione</h3>
            <p>
              Amo viaggiare e scoprire nuove culture. Ogni viaggio è un'occasione per uscire dalla zona di comfort,
              osservare come le persone risolvono problemi in modo diverso e tornare con una prospettiva più ampia
              — sia nella vita che nel lavoro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact: React.FC = () => {
  const ref = useFadeIn();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        setStatus('Messaggio inviato con successo!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(result.error || 'Errore durante l\'invio.');
      }
    } catch (error) {
      setStatus('Errore di connessione al server.');
    }
  };

  return (
    <section id="contact" ref={ref} className="fade-in contact-centered">
      <h2>Contattami</h2>
      <form className="contact-form contact-card" onSubmit={handleSubmit}>
        <input
          type="text" placeholder="Il tuo nome" required
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <input
          type="email" placeholder="La tua email" required
          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <textarea
          placeholder="Il tuo messaggio" rows={5} required
          value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
        ></textarea>
        <button type="submit" className="btn btn-primary">Invia Messaggio</button>
        {status && <p style={{ marginTop: '1rem', color: 'var(--accent-blue)' }}>{status}</p>}
      </form>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer>
    <div className="footer-inner">
      <span className="footer-copy">© 2025 Niccolò Piccioli · Castelfranco Piandisco, Italia</span>
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

export default App;
