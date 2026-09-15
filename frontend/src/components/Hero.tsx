import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import { scrollToSection } from '../utils/scroll';

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 61 + 7) % 100}%`,
  top: `${8 + ((i * 37 + 13) % 80)}%`,
  size: 4 + ((i * 7) % 9),
  dur: `${7 + ((i * 3) % 6)}s`,
  delay: `${(-((i * 1.3) % 9)).toFixed(1)}s`,
}));

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

/**
 * Hero pinnato: resta fisso mentre scorri e il titolo esplode
 * in zoom fino a scomparire — poi entra il Chi Sono.
 * Pilotato da un numero React (deterministico).
 */
const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const r = Math.round(v * 300) / 300;
    setProgress((prev) => (prev === r ? prev : r));
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Mappature zoom-through (solo se animate abilitate)
  const p = reduce ? 0 : progress;
  const titleScale = 1 + 6 * win(p, 0.08, 1.0);
  const titleOpacity = 1 - win(p, 0.55, 0.97);
  const titleBlur = 10 * win(p, 0.45, 0.97);
  const titleY = -140 * win(p, 0, 1);
  const subOpacity = 1 - win(p, 0, 0.3);
  const subScale = 1 + 1.2 * win(p, 0, 0.6);
  const subY = -70 * win(p, 0, 0.6);
  const chromeOpacity = 1 - win(p, 0, 0.22);
  const chromeScale = 1 + 0.6 * win(p, 0, 0.4);
  const bgOpacity = 1 - 0.8 * win(p, 0, 0.55);

  const content = (
    <section id="hero" className={`hero-centered${ready ? ' hero-ready' : ''}`}>
      <div style={{ opacity: bgOpacity }} aria-hidden="true">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true">
          {PARTICLES.map((pp, i) => (
            <span
              key={i}
              style={{
                left: pp.left,
                top: pp.top,
                width: pp.size,
                height: pp.size,
                ['--dur' as string]: pp.dur,
                animationDelay: pp.delay,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="hero-glow-ring" aria-hidden="true" />
      </div>
      <div
        className="hero-badge"
        style={{ opacity: chromeOpacity, transform: `scale(${chromeScale.toFixed(3)})` }}
      >
        <span className="hero-badge-dot" aria-hidden="true" />
        {t('hero.badge') as string}
      </div>
      <h1
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY.toFixed(1)}px) scale(${titleScale.toFixed(3)})`,
          filter: `blur(${titleBlur.toFixed(1)}px)`,
        }}
      >
        {t('hero.title') as string}
      </h1>
      <p
        className="hero-subtitle"
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY.toFixed(1)}px) scale(${subScale.toFixed(3)})`,
        }}
      >
        {t('hero.subtitle') as string}
      </p>
      <div
        className="hero-cta"
        style={{ opacity: chromeOpacity, transform: `scale(${chromeScale.toFixed(3)})` }}
      >
        <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>{t('hero.ctaProjects') as string}</a>
        <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>{t('hero.ctaContact') as string}</a>
      </div>
    </section>
  );

  // Senza animazioni: hero statico normale
  if (reduce) return content;

  return (
    <div ref={trackRef} style={{ height: '130vh', position: 'relative' }}>
      <div className="sticky-stage" style={{ height: '100vh' }}>
        {content}
      </div>
    </div>
  );
};

export default Hero;
