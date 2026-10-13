import React, { useState, useEffect } from 'react';
import './Header.css';
import numbersImg from './assets/numbers1.png';


//Utiliza un estado interno diceNumber (del 1 al 6) y isRolling para controlar la animación.
//Escucha la propiedad triggerRoll proveniente de App.jsx. Cada vez que el usuario presiona el botón de comprobar en el juego, este disparador cambia y activa de nuevo la animación de giro.
export function Header({ t, maxLimit, triggerRoll }) {
  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    let counter = 0;
    const interval = setInterval(() => {
      setDiceNumber(Math.floor(Math.random() * 6) + 1);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        setDiceNumber(Math.floor(Math.random() * 6) + 1);
        setIsRolling(false);
      }
    }, 60);
  };

  useEffect(() => {
    rollDice();
  }, []);

  useEffect(() => {
    if (triggerRoll > 0) {
      rollDice();
    }
  }, [triggerRoll]);
//Contiene una función renderDots(num) que dibuja dinámicamente mediante SVG los puntos negros correspondientes al número que haya salido en el dado.
  const renderDots = (num) => {
    switch (num) {
      case 1:
        return <circle cx="32" cy="32" r="6" fill="#1e1e1e" />;
      case 2:
        return (
          <>
            <circle cx="20" cy="20" r="5" fill="#1e1e1e" />
            <circle cx="44" cy="44" r="5" fill="#1e1e1e" />
          </>
        );
      case 3:
        return (
          <>
            <circle cx="20" cy="20" r="5" fill="#1e1e1e" />
            <circle cx="32" cy="32" r="5" fill="#1e1e1e" />
            <circle cx="44" cy="44" r="5" fill="#1e1e1e" />
          </>
        );
      case 4:
        return (
          <>
            <circle cx="20" cy="20" r="5" fill="#1e1e1e" />
            <circle cx="44" cy="20" r="5" fill="#1e1e1e" />
            <circle cx="20" cy="44" r="5" fill="#1e1e1e" />
            <circle cx="44" cy="44" r="5" fill="#1e1e1e" />
          </>
        );
      case 5:
        return (
          <>
            <circle cx="20" cy="20" r="5" fill="#1e1e1e" />
            <circle cx="44" cy="20" r="5" fill="#1e1e1e" />
            <circle cx="32" cy="32" r="5" fill="#1e1e1e" />
            <circle cx="20" cy="44" r="5" fill="#1e1e1e" />
            <circle cx="44" cy="44" r="5" fill="#1e1e1e" />
          </>
        );
      case 6:
        return (
          <>
            <circle cx="20" cy="18" r="5" fill="#1e1e1e" />
            <circle cx="44" cy="18" r="5" fill="#1e1e1e" />
            <circle cx="20" cy="32" r="5" fill="#1e1e1e" />
            <circle cx="44" cy="32" r="5" fill="#1e1e1e" />
            <circle cx="20" cy="46" r="5" fill="#1e1e1e" />
            <circle cx="44" cy="46" r="5" fill="#1e1e1e" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header className="game-header">
      <img 
        src={numbersImg} 
        alt="Icono de juego" 
        className="header-img"
      />
      
      <h1 className="title-text">{t.title}</h1>

      <div 
        className={`dice-vector-container ${isRolling ? 'rolling' : ''}`} 
        onClick={rollDice}
        title="Haz clic para lanzar"
      >
        <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="56" height="56" rx="14" fill="#f7f5f0" stroke="#1e1e1e" strokeWidth="5" />
          {renderDots(diceNumber)}
        </svg>
      </div>

      <p className="header-instruction">
        {t.subtitle(maxLimit)}
      </p>
    </header>
  );
}