import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-main-info">
          <span className="footer-brand">
            <span className="nav-logo-mark">NP</span>
            Niccolò Piccioli
          </span>
          <div className="footer-links">
            <a href="https://github.com/niccolopiccioli" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub">
              <FaGithub size={18} /> GitHub
            </a>
            <a href="https://linkedin.com/in/niccolopiccioli" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">
              <FaLinkedin size={18} /> LinkedIn
            </a>
            <a href="mailto:niccolopiccioli68@gmail.com" className="footer-social">
              niccolopiccioli68@gmail.com
            </a>
          </div>
        </div>
        <div className="footer-main-info">
          <span className="footer-copy">{t('footer.copy') as string}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
