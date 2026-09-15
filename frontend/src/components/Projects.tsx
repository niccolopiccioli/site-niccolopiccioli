import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaGithub, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import ScrollWords from './ScrollWords';
import { EASE, sectionVariants, staggerParent, viewportOnce } from '../motion/shared';
import { PROJECT_CATEGORIES, getProjects } from '../data/projects';
import { ProjectCategory } from '../types';

interface Card {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  demo: string | null;
  github: string | null;
  category: ProjectCategory;
  featured?: boolean;
}

const Projects: React.FC = () => {
  const ref = useFadeIn();
  const { t, lang } = useTranslation();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const [query, setQuery] = useState('');

  const all = useMemo(() => getProjects(lang), [lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      if (filter !== 'all' && p.category !== filter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [all, filter, query]);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);
  const showSections = filter === 'all' && query.trim() === '';

  const renderCard = (project: Card) => (
    <motion.article
      key={project.slug}
      layout={!reduce}
      className={`project-card${project.featured ? ' featured' : ''}`}
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 26 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: EASE } }}
      whileHover={reduce ? undefined : {
        y: -6,
        boxShadow: '0 24px 60px -18px rgba(56, 189, 248, 0.4)',
        transition: { duration: 0.35, ease: EASE },
      }}
    >
      <div className="project-top">
        <span className="live-dot">{t('projects.live') as string}</span>
        <span className="project-cat">{project.category}</span>
      </div>
      <div className="project-card-header">
        <h3>{project.title}</h3>
      </div>
      <p>{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="project-links">
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link demo">
            {t('projects.demo') as string}
            <FaExternalLinkAlt size={12} />
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link code" aria-label={`${project.title} — GitHub`}>
            <FaGithub size={15} />
            {t('projects.code') as string}
          </a>
        )}
      </div>
    </motion.article>
  );

  const grid = (cards: Card[], className: string) => (
    <motion.div
      className={className}
      layout={!reduce}
      variants={staggerParent(0.07)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      <AnimatePresence mode="popLayout">
        {cards.map((p) => renderCard(p))}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <motion.section
      id="projects"
      ref={ref}
      className="fade-in"
      variants={sectionVariants('right')}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      <span className="section-kicker">{t('projects.kicker') as string}</span>
      <div className="projects-head-row">
        <h2>{t('projects.title') as string}</h2>
        <span className="live-counter">
          <span className="live-dot">{t('projects.live') as string}</span>
          &nbsp;· {all.length} {t('projects.count') as string}
        </span>
      </div>
      <ScrollWords text={t('projects.lead') as string} className="section-lead" />

      <div className="projects-toolbar">
        <label className="project-search">
          <FaSearch size={14} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('projects.searchPlaceholder') as string}
            aria-label={t('projects.searchPlaceholder') as string}
          />
        </label>
        <div className="filter-pills" role="group" aria-label="Filter projects">
          <button
            className={`filter-pill${filter === 'all' ? ' active' : ''}`}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
          >
            {t('projects.all') as string}
          </button>
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-pill${filter === cat ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="projects-empty">{t('projects.empty') as string}</div>
      ) : showSections ? (
        <>
          <div className="featured-label">✦ {t('projects.featuredLabel') as string}</div>
          {grid(featured, 'featured-grid')}
          <div className="featured-label">✦ {t('projects.allLabel') as string}</div>
          {grid(rest, 'projects-grid')}
        </>
      ) : (
        grid(filtered, 'projects-grid')
      )}
    </motion.section>
  );
};

export default Projects;
