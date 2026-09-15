import React, { useState, useEffect, createContext, useContext } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => unknown;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('lang');
    return stored === 'en' || stored === 'it' ? stored : 'it';
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (path: string) => {
    return path.split('.').reduce<unknown>((obj, key) => {
      if (obj && typeof obj === 'object' && key in obj) {
        return (obj as Record<string, unknown>)[key];
      }
      return undefined;
    }, TRANSLATIONS[lang] as unknown as Record<string, unknown>);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation must be used within LanguageProvider");
  return context;
};
