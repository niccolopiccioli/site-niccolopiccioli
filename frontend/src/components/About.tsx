import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaBolt, FaBullseye, FaRocket } from 'react-icons/fa';
import { useTranslation } from '../context/LanguageContext';
import { useFadeIn } from '../hooks/useFadeIn';
import StickyScene from './StickyScene';
import { fadeOnly, staggerParent, fadeRise, cardHover, viewportOnce } from '../motion/shared';

const About: React.FC = () => {
  const ref = useFadeIn();
  const { t, lang } = useTranslation();
  const reduce = useReducedMotion();
  const stats = t('about.stats') as { num: string; label: string }[];
  const statsRef = useRef<HTMLDivElement>(null);

  // Contatori animati 0 → valore quando le stats entrano in vista
  useEffect(() => {
    const root = statsRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-count]'));
    if (reduce) {
      els.forEach((el) => { el.textContent = el.dataset.count || '0'; });
      return;
    }
    let done = false;
    const animate = () => {
      if (done) return;
      done = true;
      const start = performance.now();
      const dur = 1500;
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const e = 1 - Math.pow(1 - p, 4);
        els.forEach((el) => {
          el.textContent = String(Math.round(Number(el.dataset.count || '0') * e));
        });
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [reduce]);

  const principles = lang === 'it'
    ? [
      { icon: <FaBolt size={20} />, title: 'Spedire in produzione', desc: '13 progetti live: il codice conta quando gira online, non su localhost.' },
      { icon: <FaBullseye />, title: 'Semplicità intenzionale', desc: 'Clean code, separazione delle responsabilità, niente over-engineering.' },
      { icon: <FaRocket size={20} />, title: 'Iterazione continua', desc: 'Feedback reali, deploy rapidi, miglioramenti misurabili sprint dopo sprint.' },
    ]
    : [
      { icon: <FaBolt size={20} />, title: 'Ship to production', desc: '13 live projects: code counts when it runs online, not on localhost.' },
      { icon: <FaBullseye />, title: 'Intentional simplicity', desc: 'Clean code, separation of concerns, no over-engineering.' },
      { icon: <FaRocket size={20} />, title: 'Continuous iteration', desc: 'Real feedback, fast deploys, measurable improvements sprint after sprint.' },
    ];

  return (
    <motion.section
      id="about"
      ref={ref}
      className={`fade-in${reduce ? '' : ' overlap-about'}`}
      variants={fadeOnly}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={viewportOnce}
    >
      <StickyScene
        label={t('about.kicker') as string}
        heightVh={220}
        mode="accumulate"
        windows={[[0.02, 0.2], [0.34, 0.58], [0.66, 0.94]]}
        phases={[
          <div key="p1" style={{ textAlign: 'center', maxWidth: 760 }}>
            <span className="section-kicker" style={{ justifyContent: 'center', marginBottom: '1rem' }}>{t('about.kicker') as string}</span>
            <p className="sticky-text-sm">{t('about.p1') as string}</p>
          </div>,
          <p key="p2" className="sticky-text-sm">{t('about.p2') as string}</p>,
          <p key="p3" className="sticky-text-sm">{t('about.p3') as string}</p>,
        ]}
      />
      <motion.div
        className="about-stats"
        ref={statsRef}
        variants={staggerParent(0.1)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={viewportOnce}
      >
        {stats.map((s) => {
          const m = s.num.match(/^(\d+)(.*)$/);
          return (
            <motion.div
              key={s.label}
              className="stat-card"
              variants={fadeRise}
              whileHover={reduce ? undefined : cardHover}
            >
              <div className="stat-num">
                {m ? (
                  <><span data-count={m[1]}>0</span>{m[2]}</>
                ) : (s.num)}
              </div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          );
        })}
      </motion.div>
      <motion.div
        className="principles"
        variants={staggerParent(0.1)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={viewportOnce}
      >
        {principles.map((p) => (
          <motion.div
            key={p.title}
            className="principle-card"
            variants={fadeRise}
            whileHover={reduce ? undefined : cardHover}
          >
            <div className="principle-icon">{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default About;
