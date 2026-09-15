import React, { useEffect, useState } from 'react';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}

export const AmbientBackground: React.FC = () => {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="ambient-layer" aria-hidden="true">
      <div className="ambient-aurora" />
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />
      <div className="ambient-mesh" />
      <div className="ambient-grain" />
    </div>
  );
};

export const CursorGlow: React.FC = () => {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      document.documentElement.style.setProperty('--cursor-x', `${x.toFixed(1)}px`);
      document.documentElement.style.setProperty('--cursor-y', `${y.toFixed(1)}px`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;
  return <div className="cursor-glow" aria-hidden="true" />;
};

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
};
