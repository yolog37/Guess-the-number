import React from 'react';
import './LanguageToggle.css';

export function LanguageToggle({ currentLang, setLang }) {
  const toggleLanguage = () => {
    setLang(currentLang === 'es' ? 'en' : 'es');
  };

  return (
    <button onClick={toggleLanguage} className="language-toggle-btn" title="Cambiar idioma / Change language">
      🌐 {currentLang === 'es' ? 'EN' : 'ES'}
    </button>
  );
}


//Funcionamiento: Recibe las propiedades currentLang y setLang. Al hacer clic en el botón correspondiente, actualiza el estado global en App.jsx, haciendo que toda la interfaz se re-renderice instantáneamente con los nuevos textos.