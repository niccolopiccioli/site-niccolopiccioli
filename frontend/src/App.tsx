import React, { useState, useEffect } from 'react';
import './index.css';
import { AmbientBackground, CursorGlow, ScrollProgress } from './effects/AmbientEffects';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Theme } from './types';
import { useScrollY } from './hooks/useScrollY';
import { initSmoothScroll } from './utils/scroll';
import { useMagnetic } from './hooks/useMagnetic';
import ToTop from './components/ToTop';
import ScrollDebug from './components/ScrollDebug';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  });

  useScrollY();
  useMagnetic();

  useEffect(() => {
    initSmoothScroll();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#060a13' : '#f5f7fc'
    );
  }, [theme]);

  return (
    <LanguageProvider>
      <AmbientBackground />
      <CursorGlow />
      <ScrollProgress />
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <main className="container">
        <About />
        <TechTicker />
        <Skills />
        <Experience />
        <Projects />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
      <ToTop />
      <ScrollDebug />
    </LanguageProvider>
  );
};

export default App;
