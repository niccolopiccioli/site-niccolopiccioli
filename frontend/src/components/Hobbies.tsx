import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaMusic, FaPlane } from 'react-icons/fa';
import { useTranslation } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import StickyScene from './StickyScene';
import { EASE, fadeOnly, viewportOnce } from '../motion/shared';

const Hobbies: React.FC = () => {
  const ref = useFadeIn();
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  return (
    <motion.section
      id="hobbies"
      ref={ref}
      className="fade-in"
      variants={fadeOnly}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      <span className="section-kicker">{t('hobbies.kicker') as string}</span>
      {/* Reveal "mask slide": il titolo scorre dentro una maschera */}
      <span style={{ display: 'block', overflow: 'hidden' }}>
        <motion.h2
          initial={reduce ? false : { y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ willChange: 'transform', marginBottom: '0.2rem' }}
        >
          {t('hobbies.title') as string}
        </motion.h2>
      </span>
      <StickyScene
        label={t('hobbies.kicker') as string}
        heightVh={190}
        mode="accumulate"
        windows={[[0.03, 0.28], [0.5, 0.88]]}
        phases={[
          ...[
            {
              icon: <FaMusic size={28} />,
              title: t('hobbies.music.title') as string,
              desc: t('hobbies.music.desc') as string,
              cls: 'hobby-music',
              watermark: <FaMusic size={120} />,
              chips: ['Hip-Hop', 'Elettronica', 'Lo-Fi'],
            },
            {
              icon: <FaPlane size={28} />,
              title: t('hobbies.travel.title') as string,
              desc: t('hobbies.travel.desc') as string,
              cls: 'hobby-travel',
              watermark: <FaPlane size={120} />,
              chips: [] as string[],
            },
          ].map((h) => (
            <div key={h.title} className={`hobbies-card sticky-card ${h.cls}`}>
              <div className="hobbies-watermark" aria-hidden="true">{h.watermark}</div>
              <div className="hobbies-card-icon">{h.icon}</div>
              <div className="hobbies-card-content">
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
                {h.chips.length > 0 && (
                  <div className="project-tags" style={{ marginTop: '0.8rem', marginBottom: 0 }}>
                    {h.chips.map((c) => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )),
        ]}
      />
    </motion.section>
  );
};

export default Hobbies;
