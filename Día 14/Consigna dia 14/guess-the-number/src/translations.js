// src/translations.js
//Funcionamiento: Contiene propiedades como títulos, subtítulos, mensajes de ayuda (mayor, menor, número repetido) y los textos de los modales de victoria/derrota. Algunos valores son funciones (por ejemplo, subtitle: (max) => ...) para inyectar dinámicamente el límite del rango de juego.

// src/translations.js
export const translations = {
  es: {
    title: "¡Adivina el Número Secreto!",
    subtitle: (max) => `Piensa en un número del 1 al ${max} y trata de ganarle a la máquina.`,
    rangeTitle: (max) => `Rango de juego: 1 al ${max}`,
    initialMessage: "¡Haz tu apuesta y suerte!",
    inputPlaceholder: "Tu número",
    checkButton: "Comprobar",
    restartButton: "Intentar de Nuevo",
    lives: "Vidas restantes",
    previousAttempts: "Intentos previos:",
    higher: "📈 El número secreto es MAYOR",
    lower: "📉 El número secreto es MENOR",
    validNumber: (max) => `⚠️ Ingresa un número válido entre 1 y ${max}.`,
    alreadyGuessed: "⚠️ ¡Ya intentaste con este número! Prueba con otro.",
    stageLabel: 'Etapa',
    // Dentro de es:
stageWonMessage: (time, score) =>
  `¡Excelente! Tiempo empleado: ${time}. Puntuación actual: ${score}.`,
nextStageButton: 'Siguiente etapa 🚀',
finishedMessage: (time, score) =>
  `¡Superaste las 5 etapas! Tiempo total: ${time}. ESO FUE UNA CHEPA! Puntuación final: ${score}.`,
lostMessage: (stage, target, score) =>
  `Te quedaste sin vidas en la etapa ${stage}. El número era ${target}. Puntuación obtenida: ${score}.`,
    
    // Marcador y Estadísticas
    scoreLabel: "Puntuación",
    bestScoreLabel: "Récord",
    timeLabel: "Tiempo",

    // Modal Victoria
    victoryTitle: "¡VICTORIA ÉPICA!",
    victoryText: (target) => `¡Adivinaste el número secreto <strong>${target}</strong> como todo un maestro! Eso fue una CHEPA!`,
    playAgain: "Jugar Otra Vez",

    // Modal Derrota
    defeatTitle: "¡GAME OVER!",
    defeatText: (target) => `Te quedaste sin vidas. El número secreto era <strong>${target}</strong>. ¡No te rindas!`,
  },
  en: {
    title: "Guess the Secret Number!",
    subtitle: (max) => `Think of a number from 1 to ${max} and try to beat the machine.`,
    rangeTitle: (max) => `Game Range: 1 to ${max}`,
    initialMessage: "Make your guess and good luck!",
    inputPlaceholder: "Your number",
    checkButton: "Check",
    restartButton: "Try Again",
    lives: "Lives remaining",
    previousAttempts: "Previous attempts:",
    higher: "📈 The secret number is HIGHER",
    lower: "📉 The secret number is LOWER",
    validNumber: (max) => `⚠️ Please enter a valid number between 1 and ${max}.`,
    alreadyGuessed: "⚠️ You already tried this number! Try a different one.",
    stageLabel: 'Stage',
    // Dentro de en:
    stageWonMessage: (time, score) =>
    `Excellent! Time: ${time}. Current score: ${score}.`,
    nextStageButton: 'Next stage 🚀',
    finishedMessage: (time, score) =>
    `You completed all 5 stages! Total time: ${time}. THAT WAS DUMB LUCK!! Final score: ${score}.`,
lostMessage: (stage, target, score) =>
  `You ran out of lives in stage ${stage}. The number was ${target}. Score earned: ${score}.`,  
    
    // Score & Stats
    scoreLabel: "Score",
    bestScoreLabel: "Best",
    timeLabel: "Time",

    // Victory Modal
    victoryTitle: "EPIC VICTORY!",
    victoryText: (target) => `You guessed the secret number <strong>${target}</strong> like a true master! That was DUMB LUCK!`,
    playAgain: "Play Again",

    // Defeat Modal
    defeatTitle: "GAME OVER!",
    defeatText: (target) => `You ran out of lives. The secret number was <strong>${target}</strong>. Don't give up!`,
  }
};