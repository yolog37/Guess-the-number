import React, { useCallback, useState } from 'react';
import { Header } from './Header';
import GuessGame from './GuessGame';
import { ThemeToggle } from './ThemeToggle';
import { DevBanner } from './DevBanner'; 
import { LanguageToggle } from './LanguageToggle'; // 👈 Importamos tu componente limpio
import { translations } from './translations';
import './App.css';

export function App() {
  const [lang, setLang] = useState('es');
  const [rollTrigger, setRollTrigger] = useState(0);
  const [currentMaxLimit, setCurrentMaxLimit] = useState(1);
  const [currentStage, setCurrentStage] = useState(1);
  const [theme, setTheme] = useState('dark'); 
  const [isChangingLang, setIsChangingLang] = useState(false); 

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
    setIsChangingLang(true);
    setTimeout(() => {
      setLang((prevLang) => (prevLang === 'es' ? 'en' : 'es'));
      setIsChangingLang(false);
    }, 250);
  };

  return (
    <div
      className={`app-shell stage-${currentStage} ${isChangingLang ? 'lang-fade-out' : 'lang-fade-in'}`}
      data-theme={theme}
      data-lang={lang}
      style={{ background: 'var(--page-gradient)' }}
    >
      <DevBanner />

      {/* Componente del Botón de Idiomas Modularizado y Rescatado 🔥 */}
      <LanguageToggle lang={lang} toggleLanguage={toggleLanguage} />

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
