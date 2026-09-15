import React, { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  className?: string;
}

/**
 * Testo che si illumina parola per parola legato allo scroll (stile Apple):
 * le parole passano da spente/sfocate a nitide mentre attraversi la sezione.
 */
const ScrollWords: React.FC<Props> = ({ text, className }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const words = text.split(' ');

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.4)));
        setProgress((prev) => (Math.abs(prev - p) > 0.001 ? p : prev));
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
  }, [reduced]);

  if (reduced) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.5 / words.length);
        const wp = Math.min(1, Math.max(0, (progress - start) / (end - start)));
        return (
          <React.Fragment key={`${i}-${w}`}>
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                opacity: 0.13 + 0.87 * wp,
                filter: wp >= 1 ? 'blur(0)' : `blur(${(1 - wp) * 5}px)`,
                transform: `translateY(${(1 - wp) * 14}px)`,
              }}
            >
              {w}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default ScrollWords;
