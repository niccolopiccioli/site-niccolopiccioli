import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useMotionValueEvent } from 'framer-motion';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Rampa 0→1 tra a e b. */
const win = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

interface PhaseProps {
  progress: number;
  index: number;
  total: number;
  children: React.ReactNode;
}

/** Singola fase crossfade: entra, resta, esce (l'ultima resta fino al rilascio). */
function Phase({ progress, index, total, children }: PhaseProps) {
  const seg = 1 / total;
  const start = index * seg;
  const end = Math.min(1, start + seg);
  const last = index === total - 1;
  const enter = win(progress, start, start + seg * 0.3);
  const exit = last ? 0 : win(progress, end - seg * 0.3, end);
  const opacity = enter * (1 - exit);
  const y = (1 - win(progress, start, start + seg * 0.45)) * 70;
  const scale = 1 - 0.04 * (1 - enter);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y.toFixed(1)}px) scale(${scale.toFixed(3)})`,
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(var(--navbar-height) + 1rem) 1.5rem 2rem',
        pointerEvents: 'none',
      }}
    >
      <div style={{ pointerEvents: 'auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}

interface AccumulatePhaseProps {
  progress: number;
  from: number;
  to: number;
  children: React.ReactNode;
}

/** Fase che appare e RESTA visibile: alla fine tutto è leggibile. */
function AccumulatePhase({ progress, from, to, children }: AccumulatePhaseProps) {
  const o = win(progress, from, to);
  return (
    <div
      style={{
        opacity: o,
        transform: `translateY(${((1 - o) * 36).toFixed(1)}px)`,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

interface StickySceneProps {
  /** Contenuti mostrati in sequenza mentre la scena resta fissa. */
  phases: React.ReactNode[];
  /** Altezza totale di scorrimento della scena. */
  heightVh?: number;
  label?: string;
  /** crossfade: uno esce mentre l'altro entra. accumulate: restano tutti visibili. */
  mode?: 'crossfade' | 'accumulate';
  /** Sotto questa larghezza si torna alla dissolvenza (default 560). */
  collapseBelow?: number;
  /** Finestre [from,to] personalizzate per l'accumulo (default: distribuite). */
  windows?: Array<[number, number]>;
}

/**
 * Scena sticky stile Apple: resta fissa a schermo mentre le fasi
 * appaiono in sequenza con lo scroll, poi rilascia la pagina.
 * Il progress è un numero React (niente MotionValue a valle: deterministico).
 */
const StickyScene: React.FC<StickySceneProps> = ({ phases, heightVh = 280, label, mode = 'crossfade', collapseBelow = 560, windows }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [narrow, setNarrow] = useState(false);
  const [progress, setProgress] = useState(0);

  // Su schermi piccoli l'accumulo non ci starebbe: si torna alla dissolvenza
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${collapseBelow}px)`);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [collapseBelow]);

  const effectiveMode = mode === 'accumulate' && narrow ? 'crossfade' : mode;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const r = Math.round(v * 300) / 300;
    setProgress((prev) => (prev === r ? prev : r));
  });

  // Senza animazioni: contenuto statico impilato, niente pin
  if (reduce) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem 0' }}>
        {phases.map((p, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>{p}</div>
        ))}
      </div>
    );
  }

  if (effectiveMode === 'accumulate') {
    const n = phases.length;
    return (
      <div ref={ref} className="sticky-scene" style={{ height: `${heightVh}vh`, position: 'relative' }} aria-label={label}>
        <div className="sticky-stage sticky-stage-stack">
          {phases.map((p, i) => {
            const [from, to] = windows && windows[i]
              ? windows[i]
              : [0.04 + (i / n) * 0.78, Math.min(0.98, 0.04 + (i / n) * 0.78 + 0.18)];
            return (
              <AccumulatePhase key={i} progress={progress} from={from} to={to}>
                {p}
              </AccumulatePhase>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="sticky-scene" style={{ height: `${heightVh}vh`, position: 'relative' }} aria-label={label}>
      <div className="sticky-stage">
        {phases.map((p, i) => (
          <Phase key={i} progress={progress} index={i} total={phases.length}>
            {p}
          </Phase>
        ))}
      </div>
    </div>
  );
};

export default StickyScene;
