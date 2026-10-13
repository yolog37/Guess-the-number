import React, { useEffect, useState } from 'react';
import rocketIcon from './assets/rocket.svg';
import './GuessGame.css';

const STAGES = [
  { stage: 1, max: 100, lives: 7 },
  { stage: 2, max: 50, lives: 6 },
  { stage: 3, max: 25, lives: 5 },
  { stage: 4, max: 10, lives: 3 },
  { stage: 5, max: 3, lives: 1 },
];

//esto es para Testing
/*const STAGES = [
  { stage: 1, max: 1, lives: 1 },
  { stage: 2, max: 1, lives: 1},
  { stage: 3, max: 1, lives: 1 },
  { stage: 4, max: 1, lives: 1 },
  { stage: 5, max: 3, lives: 1 },
];*/

export default function GuessGame({
  t,
  onAttemptMade,
  onStageChange,
  cardColor,
  cardTextColor,
  cardBorderColor, 
}) {

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const activeStage = STAGES[currentStageIndex];

  const [targetNumber, setTargetNumber] = useState(
    () => Math.floor(Math.random() * activeStage.max) + 1
  );
  const [guess, setGuess] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(activeStage.lives);
  const [gameState, setGameState] = useState('playing');
  
  /* --- ESTADOS DE CONTROL PARA ADIVINANZAS E IDIOMAS --- */
  const [rangeError, setRangeError] = useState(false);
  const [alreadyGuessedError, setAlreadyGuessedError] = useState(false);
  const [hintDirection, setHintDirection] = useState(''); 

  const [history, setHistory] = useState([]);
  const [isShaking, setIsShaking] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const savedScore = Number.parseInt(
      localStorage.getItem('guessGameBestScore'),
      10
    );
    return Number.isNaN(savedScore) ? 0 : savedScore;
  });

  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Notifica a App.jsx cuando cambia la etapa o el límite del juego.
  useEffect(() => {
    onStageChange?.(activeStage.stage, activeStage.max);
  }, [activeStage.stage, activeStage.max, onStageChange]);

  // Cuenta el tiempo solo mientras el juego está activo.
  useEffect(() => {
    if (gameState !== 'playing') return undefined;

    const intervalId = window.setInterval(() => {
      setSecondsElapsed((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [gameState]);

  // Convierte los segundos en minutos y segundos.
  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // Inicia una nueva sesión desde la primera etapa.
  function startNewGame() {
    const firstStage = STAGES[0];

    setCurrentStageIndex(0);
    setTargetNumber(Math.floor(Math.random() * firstStage.max) + 1);
    setAttemptsLeft(firstStage.lives);
    setGuess('');
    setGameState('playing');
    
    setRangeError(false);
    setAlreadyGuessedError(false);
    setHintDirection('');
    
    setHistory([]);
    setScore(0);
    setSecondsElapsed(0);
  }

  // Avanza a la siguiente etapa.
  function nextStage() {
    const nextIndex = currentStageIndex + 1;

    if (nextIndex >= STAGES.length) return;

    const nextStageConfig = STAGES[nextIndex];

    setCurrentStageIndex(nextIndex);
    setTargetNumber(Math.floor(Math.random() * nextStageConfig.max) + 1);
    setAttemptsLeft(nextStageConfig.lives);
    setGuess('');
    setGameState('playing');
    
    setRangeError(false);
    setAlreadyGuessedError(false);
    setHintDirection('');
    
    setHistory([]);
  }

  // Valida y procesa un intento.
  function handleGuess(event) {
    event.preventDefault();

    if (gameState !== 'playing' || attemptsLeft <= 0) return;

    const number = Number(guess);

    // 1. Validación: Rango inválido
    if (!Number.isInteger(number) || number < 1 || number > activeStage.max) {
      setRangeError(true);
      setAlreadyGuessedError(false);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400); 
      return;
    }

    // 2. Validación: Número repetido
    if (history.some((intento) => intento.valor === number)) {
      setRangeError(false);
      setAlreadyGuessedError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    setRangeError(false);
    setAlreadyGuessedError(false);
    
    // Identificamos el emoji de pista comparando el intento contra el número secreto
    const esMayor = number > targetNumber;
    const nuevoIntento = {
      valor: number,
      pista: esMayor ? '📉' : '📈' 
    };

    // Guardamos el objeto completo en el array de historial
    setHistory((previousHistory) => [...previousHistory, nuevoIntento]);
    onAttemptMade?.();

    // 3. Acierto: Victoria
    if (number === targetNumber) {
      const stageScore = attemptsLeft * 100 + activeStage.max * 5 - secondsElapsed * 2;
      const newTotalScore = score + Math.max(stageScore, 50);
      setScore(newTotalScore);

      if (newTotalScore > bestScore) {
        setBestScore(newTotalScore);
        localStorage.setItem('guessGameBestScore', newTotalScore.toString());
      }

      const isLastStage = currentStageIndex === STAGES.length - 1;
      setGameState(isLastStage ? 'gameFinished' : 'won');
      setGuess('');
      return;
    }

    // 4. Fallo: Restar vida y dar pistas
    const newAttemptsLeft = Math.max(attemptsLeft - 1, 0);
    setAttemptsLeft(newAttemptsLeft);
    setGuess('');

    if (newAttemptsLeft === 0) {
      setGameState('lost');
      return;
    }

    setHintDirection(number < targetNumber ? 'higher' : 'lower');
  }

  return (
    <>
      <div className="score-board">
        <span>🏆 {t.scoreLabel}: {score}</span>
        <span>⭐ {t.bestScoreLabel}: {bestScore}</span>
        <span>⏱️ {formatTime(secondsElapsed)}</span>
      </div>

      <div
        className={`game-area stage-${activeStage.stage}`}
        style={{
          backgroundColor: cardColor || 'var(--card-bg)',
          color: cardTextColor || 'var(--text-main)',
          borderColor: cardBorderColor || 'var(--card-border)',
          borderStyle: 'solid',
          borderWidth: '2px'
        }}
      >
        <h2 className="game-range-title">
          {t.stageLabel} {activeStage.stage} (1 - {activeStage.max})
        </h2>

        <div className="game-info-box">
          <p className={`game-message ${isShaking ? 'shake-animation' : ''}`}>
            {rangeError && t.validNumber(activeStage.max)}
            {alreadyGuessedError && t.alreadyGuessed}
            {!rangeError && !alreadyGuessedError && hintDirection === 'higher' && t.higher}
            {!rangeError && !alreadyGuessedError && hintDirection === 'lower' && t.lower}
            {!rangeError && !alreadyGuessedError && !hintDirection && t.initialMessage}
          </p>
          <p className="game-attempts">
            {t.lives}: {attemptsLeft}
          </p>
        </div>

        <form onSubmit={handleGuess} className="input-group">
          <input
            type="text"
            autoComplete="off"
            inputMode="numeric"
            autoCorrect="off"
            spellCheck={false}
            pattern="[0-9]*"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            min="1"
            max={activeStage.max}
            className="guess-input"
            placeholder={t.inputPlaceholder}
            autoFocus
            disabled={gameState !== 'playing'}
          />
          <button
            type="submit"
            className="guess-button"
            disabled={gameState !== 'playing'}
          >
            {t.checkButton}
          </button>
        </form>

        <div className="history-container">
          <span className="history-label">{t.previousAttempts}</span>
          <div className="history-chips">
            {/* CORRECCIÓN: Desestructuramos 'valor' y 'pista' del objeto guardado en el historial */}
            {history.map(({ valor, pista }, index) => (
              <span key={`${valor}-${index}`} className="history-chip">
                {valor} {pista}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- MODAL: GANÓ EL STAGE --- */}
      {gameState === 'won' && (
        <div className="splash-overlay">
          <div className="splash-modal animate-pop">
            <div className="splash-icon">🎉👑</div>
            <h2 className="splash-title">
              ¡{t.stageLabel.toUpperCase()} {activeStage.stage} SUPERADO!
            </h2>
            <p className="splash-text">
              {t.stageWonMessage(formatTime(secondsElapsed), score)}
            </p>
            <button onClick={nextStage} className="splash-button">
              {t.nextStageButton}
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL: JUEGO TERMINADO COMPLETO --- */}
      {gameState === 'gameFinished' && (
        <div className="splash-overlay">
          <div className="splash-modal animate-pop">
            <div className="splash-icon">🏆🔥</div>
            <h2 className="splash-title">{t.victoryTitle}</h2>
            <p className="splash-text">
              {t.finishedMessage(formatTime(secondsElapsed), score)}
            </p>
            <button onClick={startNewGame} className="splash-button">
              <img src={rocketIcon} alt="" className="rocket-icon-svg" />
              {t.playAgain}
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL: DERROTA --- */}
      {gameState === 'lost' && (
        <div className="splash-overlay">
          <div className="splash-modal lost-modal animate-pop">
            <div className="splash-icon">💀💔</div>
            <h2 className="splash-title lost-title">{t.defeatTitle}</h2>
            <p className="splash-text">
              {t.lostMessage(activeStage.stage, targetNumber, score)}
            </p>
            <button onClick={startNewGame} className="splash-button lost-button">
              {t.restartButton}
            </button>
          </div>
        </div>
      )}
    </>
  );
}