import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import ScrollWords from './ScrollWords';
import StickyScene from './StickyScene';
import { fadeOnly, viewportOnce } from '../motion/shared';
import { ExperienceItem } from '../types';

const Experience: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const items = t('experience.items') as ExperienceItem[];
  const [hero, ...rest] = items;

  const mini = (item: ExperienceItem) => (
    <div key={`${item.date}-${item.title}`} className="timeline-item exp-mini">
      <span className="timeline-date">{item.date}</span>
      <h3>{item.title}</h3>
      <p>{item.desc}</p>
      {item.tag && <span className="timeline-tag">{item.tag}</span>}
    </div>
  );

  return (
    <motion.section
      id="experience"
      ref={ref}
      className="fade-in"
      variants={fadeOnly}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      <span className="section-kicker">{t('experience.kicker') as string}</span>
      <h2>{t('experience.title') as string}</h2>
      <ScrollWords text={t('experience.lead') as string} className="section-lead" />
      <StickyScene
        label={t('experience.kicker') as string}
        heightVh={240}
        mode="accumulate"
        collapseBelow={700}
        phases={[
          <div key="hero" className="timeline-item exp-hero">
            <span className="timeline-date">{hero.date}</span>
            <h3>{hero.title}</h3>
            <p>{hero.desc}</p>
            {hero.tag && <span className="timeline-tag">{hero.tag}</span>}
          </div>,
          <div key="trio" className="exp-trio">
            {rest.map((item) => mini(item))}
          </div>,
        ]}
      />
    </motion.section>
  );
};

export default Experience;
