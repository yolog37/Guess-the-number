import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import GuessGame from './components/GuessGame/GuessGame';
import { Header } from './components/Header/Header';
import { DevBanner } from './components/ui/DevBanner';
import { LanguageToggle } from './components/ui/LanguageToggle';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { useLocalStorage } from './hooks/useLocalStorage';
import { translations } from './i18n/translations';

const LANG_FADE_MS = 250;

export function App() {
  const [lang, setLang] = useLocalStorage('guessGame.lang', 'es');
  const [theme, setTheme] = useLocalStorage('guessGame.theme', 'dark');
  const [isChangingLang, setIsChangingLang] = useState(false);
  const [rollTrigger, setRollTrigger] = useState(0);
  const [maxLimit, setMaxLimit] = useState(1);
  const langTimeoutRef = useRef(null);

  const t = translations[lang];

  // data-theme y data-lang van en <html> para que afecten a toda la página
  // (incluido el fondo del body y los modales).
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.lang = lang;
  }, [theme, lang]);

  useEffect(() => () => clearTimeout(langTimeoutRef.current), []);

  const handleAttemptMade = useCallback(
    () => setRollTrigger((value) => value + 1),
    []
  );

  const handleStageChange = useCallback((_stage, max) => setMaxLimit(max), []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const toggleLanguage = () => {
    if (isChangingLang) return;
    setIsChangingLang(true);
    langTimeoutRef.current = setTimeout(() => {
      setLang((prev) => (prev === 'es' ? 'en' : 'es'));
      setIsChangingLang(false);
    }, LANG_FADE_MS);
  };

  return (
    <div className={`app-shell ${isChangingLang ? 'lang-fade-out' : ''}`}>
      <DevBanner />
      <LanguageToggle title={t.langToggleTitle} onToggle={toggleLanguage} />
      <ThemeToggle title={t.themeToggleTitle(theme)} onToggle={toggleTheme} />

      <Header t={t} maxLimit={maxLimit} triggerRoll={rollTrigger} />

      <GuessGame
        t={t}
        onAttemptMade={handleAttemptMade}
        onStageChange={handleStageChange}
      />
    </div>
  );
}

export default App;
