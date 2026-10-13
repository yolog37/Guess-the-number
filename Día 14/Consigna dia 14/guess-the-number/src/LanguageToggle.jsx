import React from 'react';
import './LanguageToggle.css';

export function LanguageToggle({ lang, toggleLanguage }) {
  return (
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
  );
}

export default LanguageToggle;



//Funcionamiento: Recibe las propiedades currentLang y setLang. Al hacer clic en el botón correspondiente, actualiza el estado global en App.jsx, haciendo que toda la interfaz se re-renderice instantáneamente con los nuevos textos.