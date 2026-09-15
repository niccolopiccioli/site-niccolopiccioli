import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Theme } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { useActiveSection, SECTIONS } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/scroll';

interface NavbarProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <a
          href="#hero"
          className="nav-logo"
          aria-label="Niccolò Piccioli — home"
          onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
        >
          <span className="nav-logo-mark">NP</span>
          <span>Niccolò Piccioli</span>
        </a>

        <div className="navbar-centered-links">
          <ul className="navbar-links">
            {SECTIONS.map(({ id, key }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
                >{t(`nav.${key}`) as string}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-controls">
          <div className="lang-switcher" role="group" aria-label="Language">
            <button
              className={`lang-btn ${lang === 'it' ? 'active' : ''}`}
              onClick={() => setLang('it')}
              aria-pressed={lang === 'it'}
            >IT</button>
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
            >EN</button>
          </div>
          <span className="nav-divider" aria-hidden="true" />
          <div className="theme-switcher" role="group" aria-label="Theme">
            <button
              className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
              aria-label="Light theme"
              aria-pressed={theme === 'light'}
            >
              <FaSun size={14} />
            </button>
            <button
              className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
              aria-label="Dark theme"
              aria-pressed={theme === 'dark'}
            >
              <FaMoon size={14} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
