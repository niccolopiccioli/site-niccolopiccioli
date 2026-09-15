import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { scrollToSection } from '../utils/scroll';

const ToTop: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`to-top${show ? ' to-top-show' : ''}`}
      aria-label="Torna in cima"
      tabIndex={show ? 0 : -1}
      onClick={() => scrollToSection('hero')}
    >
      <FaArrowUp size={16} />
    </button>
  );
};

export default ToTop;
