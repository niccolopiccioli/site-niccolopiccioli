import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const TechTicker: React.FC = () => {
  const { t } = useTranslation();
  const items = t('ticker') as string[];
  const doubled = [...items, ...items];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            <i />{item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechTicker;
