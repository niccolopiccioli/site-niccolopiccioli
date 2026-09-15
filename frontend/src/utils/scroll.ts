import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Inizializza lo smooth scroll (Lenis). Rispetta prefers-reduced-motion. */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  if (lenis) return lenis;
  lenis = new Lenis({ duration: 1.35, smoothWheel: true });
  (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

function easeInOutQuart(t: number): number {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

function getLayoutOffsetTop(el: HTMLElement): number {
  let top = 0;
  let current: HTMLElement | null = el;
  while (current) {
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }
  return top;
}

const SCROLL_MARGIN: Record<string, number> = {
  projects: 24,
};
const DEFAULT_SCROLL_MARGIN = 8;

export function scrollToSection(id: string) {
  // La hero è pinnata: per l'inizio inizio si va a y=0 secco
  if (id === 'hero') {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo(0, 0);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const navbarEl = document.querySelector('.navbar');
  const navbarHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 60;
  const margin = SCROLL_MARGIN[id] ?? DEFAULT_SCROLL_MARGIN;

  // Via Lenis se attivo: butter-smooth e sincronizzato col resto
  if (lenis) {
    // Il Chi Sono è sovrapposto alla coda dello zoom: si atterra più avanti
    // per non restare sul fantasma del titolo ingrandito
    const extra = id === 'about' ? Math.round(window.innerHeight * 0.25) : 0;
    lenis.scrollTo(el, { offset: -navbarHeight - margin + extra, duration: 1.2 });
    return;
  }

  // Fallback senza Lenis (es. reduced-motion)
  const heading = el.querySelector('h2') as HTMLElement | null;
  const target = heading ?? el;
  const targetY = getLayoutOffsetTop(target) - navbarHeight - margin;
  const startY = window.scrollY;
  const distance = targetY - startY;
  const duration = 700;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutQuart(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
