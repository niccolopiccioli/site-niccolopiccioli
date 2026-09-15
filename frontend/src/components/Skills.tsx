import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaReact, FaDatabase, FaBrain, FaCreditCard } from 'react-icons/fa';
import { SiDjango } from 'react-icons/si';
import { MdCloud } from 'react-icons/md';
import { useTranslation } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import ScrollWords from './ScrollWords';
import { EASE, sectionVariants, staggerParent, fadeRise, cardHover, viewportOnce } from '../motion/shared';
import { Skill } from '../types';

const icons = [
  <FaReact size={26} />,
  <SiDjango size={26} />,
  <FaDatabase size={26} />,
  <FaCreditCard size={26} />,
  <MdCloud size={26} />,
  <FaBrain size={26} />,
];

const Skills: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const list = t('skills.list') as Skill[];

  return (
    <motion.section
      id="skills"
      ref={ref}
      className="fade-in"
      variants={sectionVariants('right')}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      <span className="section-kicker">{t('skills.kicker') as string}</span>
      <h2>{t('skills.title') as string}</h2>
      <ScrollWords text={t('skills.lead') as string} className="section-lead" />
      <motion.div
        className="skills-grid"
        variants={staggerParent(0.09)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={viewportOnce}
      >
        {list.map((skill, index) => (
          <motion.div
            key={skill.title}
            className="card"
            variants={fadeRise}
            whileHover={reduce ? undefined : cardHover}
            whileTap={{ scale: 0.98 }}
          >
            {/* Icona con micro-bounce al primo render */}
            <motion.div
              className="card-icon"
              initial={reduce ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={viewportOnce}
              transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.15 }}
            >
              {icons[index % icons.length]}
            </motion.div>
            <h3>{skill.title}</h3>
            <p>{skill.items}</p>
            <div className="skill-bar" role="img" aria-label={`${skill.title}: ${skill.levelLabel}`}>
              <motion.div
                className="skill-bar-fill"
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
              />
            </div>
            <div className="skill-level">
              <span>{skill.levelLabel}</span>
              <span>{skill.level}%</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Skills;
