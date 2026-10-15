import { useEffect, useState } from 'react';
import {
  FEEDBACK,
  GAME_STATE,
  HINT,
  MIN_STAGE_SCORE,
  REVIVE_COST,
  STAGES,
} from '../constants/stages';
import { randomBetween } from '../utils/random';
import { useLocalStorage } from './useLocalStorage';
import { useTimer } from './useTimer';

const SHAKE_MS = 400;

// Toda la lógica del juego, sin nada de UI.
export function useGuessGame({ onAttemptMade, onStageChange } = {}) {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = STAGES[stageIndex];
  const isLastStage = stageIndex === STAGES.length - 1;

  const [targetNumber, setTargetNumber] = useState(() =>
    randomBetween(1, STAGES[0].max)
  );
  const [attemptsLeft, setAttemptsLeft] = useState(STAGES[0].lives);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(FEEDBACK.INITIAL);
  const [history, setHistory] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.PLAYING);
  const [isShaking, setIsShaking] = useState(false);
  const [score, setScore] = useState(0);
  const [stageScore, setStageScore] = useState(0);
  const [savedLives, setSavedLives] = useState(0);
  const [usedRevive, setUsedRevive] = useState(false);
  const [bestScore, setBestScore] = useLocalStorage('guessGameBestScore', 0);

  // Último número válido que probó el usuario (para el mensaje de pista).
  const lastGuess = history.length ? history[history.length - 1].value : null;

  const { seconds, reset: resetTimer } = useTimer(
    gameState === GAME_STATE.PLAYING
  );

  // Avisa a App cuando cambia la etapa.
  useEffect(() => {
    onStageChange?.(stage.stage, stage.max);
  }, [stage.stage, stage.max, onStageChange]);

  // Apaga la animación de sacudida.
  useEffect(() => {
    if (!isShaking) return undefined;
    const id = setTimeout(() => setIsShaking(false), SHAKE_MS);
    return () => clearTimeout(id);
  }, [isShaking]);

  function resetRound(index) {
    const { max, lives } = STAGES[index];
    setStageIndex(index);
    setTargetNumber(randomBetween(1, max));
    setAttemptsLeft(lives);
    setGuess('');
    setFeedback(FEEDBACK.INITIAL);
    setHistory([]);
    setGameState(GAME_STATE.PLAYING);
  }

  function restart() {
    resetRound(0);
    setScore(0);
    setStageScore(0);
    setSavedLives(0);
    setUsedRevive(false);
    resetTimer();
  }

  function nextStage() {
    if (stageIndex + 1 < STAGES.length) resetRound(stageIndex + 1);
  }

  // Canjea REVIVE_COST vidas guardadas por otro intento en la etapa final,
  // con un número secreto nuevo (puede salir el mismo, es azar).
  function acceptRevive() {
    if (gameState !== GAME_STATE.REVIVE_OFFER) return;
    setSavedLives((prev) => prev - REVIVE_COST);
    setUsedRevive(true);
    resetRound(stageIndex);
  }

  // Rechaza la oferta: empieza una partida nueva.
  function declineRevive() {
    if (gameState !== GAME_STATE.REVIVE_OFFER) return;
    restart();
  }

  function rejectGuess(type) {
    setFeedback(type);
    setIsShaking(true);
  }

  function submitGuess() {
    if (gameState !== GAME_STATE.PLAYING || attemptsLeft <= 0) return;

    const number = Number(guess);

    if (!Number.isInteger(number) || number < 1 || number > stage.max) {
      rejectGuess(FEEDBACK.RANGE);
      return;
    }
    if (history.some((attempt) => attempt.value === number)) {
      rejectGuess(FEEDBACK.REPEATED);
      return;
    }

    const isTooHigh = number > targetNumber;
    let hint = isTooHigh ? HINT.LOWER : HINT.HIGHER;
    if (number === targetNumber) hint = HINT.CORRECT;
    setHistory((prev) => [...prev, { value: number, hint }]);
    setGuess('');
    onAttemptMade?.();

    if (number === targetNumber) {
      const earned = Math.max(
        attemptsLeft * 100 + stage.max * 5 - seconds * 2,
        MIN_STAGE_SCORE
      );
      const total = score + earned;
      setStageScore(earned);
      setScore(total);
      setBestScore((prev) => Math.max(prev, total));

      if (isLastStage) {
        setGameState(GAME_STATE.FINISHED);
      } else {
        // El intento ganador gasta una vida; las que sobran se guardan.
        setSavedLives((prev) => prev + (attemptsLeft - 1));
        setGameState(GAME_STATE.WON);
      }
      return;
    }

    const left = attemptsLeft - 1;
    setAttemptsLeft(left);

    if (left === 0) {
      const canRevive = isLastStage && savedLives >= REVIVE_COST;
      setGameState(canRevive ? GAME_STATE.REVIVE_OFFER : GAME_STATE.LOST);
      return;
    }
    setFeedback(isTooHigh ? FEEDBACK.LOWER : FEEDBACK.HIGHER);
  }

  return {
    stage,
    targetNumber,
    attemptsLeft,
    guess,
    setGuess,
    feedback,
    history,
    lastGuess,
    gameState,
    isShaking,
    score,
    stageScore,
    savedLives,
    usedRevive,
    bestScore,
    seconds,
    submitGuess,
    nextStage,
    restart,
    acceptRevive,
    declineRevive,
  };
}
