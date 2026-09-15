import { useEffect } from 'react';

/** I bottoni .btn seguono leggermente il cursore (proprietà `translate`, non confligge con transform). */
export function useMagnetic(strength = 0.18, max = 6) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let current: HTMLElement | null = null;

    const onMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.('.btn') as HTMLElement | null;
      if (el !== current) {
        if (current) current.style.translate = '';
        current = el;
      }
      if (!current) return;
      const r = current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const clamp = (v: number) => Math.max(-max, Math.min(max, v * strength));
      current.style.translate = `${clamp(dx).toFixed(1)}px ${clamp(dy).toFixed(1)}px`;
    };

    const onOut = (e: MouseEvent) => {
      const to = (e.relatedTarget as HTMLElement | null)?.closest?.('.btn');
      if (!to && current) {
        current.style.translate = '';
        current = null;
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseout', onOut);
    };
  }, [strength, max]);
}
