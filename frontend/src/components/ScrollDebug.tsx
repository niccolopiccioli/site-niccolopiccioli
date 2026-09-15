import React, { useState, useEffect } from 'react';

/** HUD di debug: mostra live di quanto hai scrollato (px + % + sezione). */
const ScrollDebug: React.FC = () => {
  const [info, setInfo] = useState({ y: 0, pct: 0, section: '' });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ids = ['hero', 'about', 'skills', 'experience', 'projects', 'hobbies', 'contact'];
        let current = '';
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) current = id;
        }
        setInfo({ y: Math.round(y), pct: max > 0 ? Math.round((y / max) * 100) : 0, section: current });
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 12,
        bottom: 12,
        zIndex: 9999,
        fontFamily: 'monospace',
        fontSize: 12,
        lineHeight: 1.5,
        color: '#22d3ee',
        background: 'rgba(0,0,0,0.72)',
        border: '1px solid rgba(34,211,238,0.35)',
        borderRadius: 8,
        padding: '6px 10px',
        pointerEvents: 'none',
        whiteSpace: 'pre',
      }}
    >
      {`y: ${info.y}px (${info.pct}%)\n@${info.section}`}
    </div>
  );
};

export default ScrollDebug;
