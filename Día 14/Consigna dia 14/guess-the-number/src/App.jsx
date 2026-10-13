import React, { useCallback, useState } from 'react';
import { Header } from './Header';
import GuessGame from './GuessGame';
import { ThemeToggle } from './ThemeToggle'; // 1. NUEVO IMPORT
import { translations } from './translations';
import './App.css';
import { LanguageToggle } from './LanguageToggle';

export function App() {
  const [lang, setLang] = useState('es');
  const [rollTrigger, setRollTrigger] = useState(0);
  const [currentMaxLimit, setCurrentMaxLimit] = useState(1);
  const [currentStage, setCurrentStage] = useState(1);
  const [theme, setTheme] = useState('dark'); 

  const traducciones = translations[lang];

  const handleTriggerRoll = () => {
    setRollTrigger((previousValue) => previousValue + 1);
  };

  const handleStageChange = useCallback((stage, max) => {
    setCurrentStage(stage);
    setCurrentMaxLimit(max);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === 'es' ? 'en' : 'es'));
  };

  return (
    <div
      className={`app-shell stage-${currentStage}`}
      data-theme={theme}
      data-lang={lang}
      style={{ background: 'var(--page-gradient)' }}
    >
      
      {/* Botón de Idiomas */}
      <button 
        className="language-toggle-btn"
        onClick={toggleLanguage}
        type="button"
        title={lang === 'es' ? "Switch to English" : "Cambiar a Español"}
      >
        <div className="flag-icon-wrapper">
          <svg className="flag-es" viewBox="0 0 32 32" xmlns="http://w3.org">
            <circle cx="16" cy="16" r="16" fill="#C60B1E"/>
            <rect y="8" width="32" height="16" fill="#FAE002"/>
            <circle cx="9" cy="16" r="2" fill="#C60B1E" opacity="0.8"/>
          </svg>
          <svg className="flag-en" viewBox="0 0 32 32" xmlns="http://w3.org">
            <clipPath id="circleView"><circle cx="16" cy="16" r="16"/></clipPath>
            <g clipPath="url(#circleView)">
              <rect width="32" height="32" fill="#00247D"/>
              <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFF" strokeWidth="4"/>
              <path d="M0 0 L32 32 M32 0 L0 32" stroke="#CF142B" strokeWidth="2"/>
              <path d="M16 0 V32 M0 16 H32" stroke="#FFF" strokeWidth="6"/>
              <path d="M16 0 V32 M0 16 H32" stroke="#CF142B" strokeWidth="4"/>
            </g>
          </svg>
        </div>
      </button>

      {/* 2. NUEVO COMPONENTE EXTRAÍDO (Línea súper limpia) */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      <Header
        t={traducciones}
        maxLimit={currentMaxLimit}
        triggerRoll={rollTrigger}
      />

      <GuessGame
        t={traducciones}
        onAttemptMade={handleTriggerRoll}
        onStageChange={handleStageChange}
      />
    </div>
  );
}

export default App;
