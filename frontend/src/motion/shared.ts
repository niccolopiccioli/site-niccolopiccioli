import type { Variants } from 'framer-motion';

/** Easing Apple-like condiviso. Durate sempre < 0.8s, solo transform/opacity. */
export const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = 'left' | 'right' | 'up';

/** Ingresso sezione direzionale con profondità 3D. Da fuori schermo ma elegante. */
export function sectionVariants(dir: Direction = 'up'): Variants {
  const hidden =
    dir === 'left'
      ? { opacity: 0, x: -140, rotateY: 7, scale: 0.985, filter: 'blur(10px)' }
      : dir === 'right'
        ? { opacity: 0, x: 140, rotateY: -7, scale: 0.985, filter: 'blur(10px)' }
        : { opacity: 0, y: 44, scale: 0.985, filter: 'blur(10px)' };
  return {
    hidden,
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.75, ease: EASE },
    },
  };
}

/** Solo dissolvenza (per sezioni che contengono sticky: niente transform/filter). */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Contenitore che scagliona i figli. */
export const staggerParent = (stagger = 0.09): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

/** Figlio standard: fade + rise. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/** Hover lift + glow soft condiviso per le card. */
export const cardHover = {
  scale: 1.04,
  y: -4,
  boxShadow: '0 20px 48px -16px rgba(56, 189, 248, 0.4)',
  transition: { duration: 0.35, ease: EASE },
};

/** Viewport di default: anima una sola volta, un filo prima di entrare. */
export const viewportOnce = { once: true, margin: '-60px' } as const;
