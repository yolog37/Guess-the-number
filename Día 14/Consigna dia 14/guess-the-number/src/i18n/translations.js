// Todos los textos de la app. Algunos valores son funciones para inyectar datos.
export const translations = {
  es: {
    // Header
    title: '¡Adivina el Número Secreto!',
    subtitle: (max) =>
      `Piensa en un número del 1 al ${max} y trata de ganarle a la máquina.`,
    headerAlt: 'Icono de juego',
    diceTitle: 'Haz clic para lanzar',

    // Juego
    stageLabel: 'Etapa',
    initialMessage: '¡Haz tu apuesta y suerte!',
    inputPlaceholder: 'Tu número',
    checkButton: 'Comprobar',
    lives: 'Vidas restantes',
    previousAttempts: 'Intentos previos:',
    higher: (n) => `📈 El número secreto es MAYOR que ${n}`,
    lower: (n) => `📉 El número secreto es MENOR que ${n}`,
    hintHigher: (n) => `📈 MAYOR que ${n}`,
    hintLower: (n) => `📉 MENOR que ${n}`,
    validNumber: (max) => `⚠️ Ingresa un número válido entre 1 y ${max}.`,
    alreadyGuessed: '⚠️ ¡Ya intentaste con este número! Prueba con otro.',

    // Marcador
    scoreLabel: 'Puntuación',
    bestScoreLabel: 'Récord',
    savedLivesLabel: 'Vidas guardadas',

    // Modal: etapa superada
    stageCleared: (n) => `¡ETAPA ${n} SUPERADA!`,
    stageCompleted: '¡Nivel completado con éxito!',
    timeElapsed: 'Tiempo empleado:',
    stageScore: 'Puntaje de etapa:',
    totalScore: 'Puntaje total:',
    nextStageButton: 'Siguiente etapa 🚀',

    // Modal: juego completo
    victoryTitle: '¡VICTORIA ÉPICA!',
    allStagesDone: (total) => `¡Superaste las ${total} etapas!`,
    totalTime: 'Tiempo total:',
    finalScore: 'Puntuación final:',
    luckLine: '¡ESO FUE UNA CHEPA!',
    playAgain: 'Jugar Otra Vez',

    // Modal: derrota
    defeatTitle: '¡GAME OVER!',
    outOfLives: '¡Te quedaste sin vidas!',
    inStage: 'En la etapa:',
    scoreEarned: 'Puntuación obtenida:',
    numberWas: (n) => `El número era: ${n}`,
    restartButton: 'Intentar de Nuevo',

    // Segunda oportunidad en la etapa final
    reviveTitle: '¿OTRA OPORTUNIDAD?',
    reviveHeadline: '¡Fallaste en la etapa final!',
    reviveDescription: (cost) =>
      `Puedes canjear ${cost} vidas guardadas por un nuevo intento con otro número secreto.`,
    reviveAccept: (cost) => `Canjear ${cost} vidas ❤️`,
    reviveDecline: 'No, empezar de nuevo',
    shameTitle: '¿VICTORIA?',
    shameMessage:
      'Los verdaderos guerreros lo logran a la primera, esto no es una victoria real - Haz el paseo de la vergüenza',

    // Botones de tema e idioma
    langToggleTitle: 'Switch to English',
    themeToggleTitle: (theme) =>
      theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
  },

  en: {
    // Header
    title: 'Guess the Secret Number!',
    subtitle: (max) =>
      `Think of a number from 1 to ${max} and try to beat the machine.`,
    headerAlt: 'Game icon',
    diceTitle: 'Click to roll',

    // Game
    stageLabel: 'Stage',
    initialMessage: 'Make your guess and good luck!',
    inputPlaceholder: 'Your number',
    checkButton: 'Check',
    lives: 'Lives remaining',
    previousAttempts: 'Previous attempts:',
    higher: (n) => `📈 The secret number is HIGHER than ${n}`,
    lower: (n) => `📉 The secret number is LOWER than ${n}`,
    hintHigher: (n) => `📈 HIGHER than ${n}`,
    hintLower: (n) => `📉 LOWER than ${n}`,
    validNumber: (max) => `⚠️ Please enter a valid number between 1 and ${max}.`,
    alreadyGuessed: '⚠️ You already tried this number! Try a different one.',

    // Score board
    scoreLabel: 'Score',
    bestScoreLabel: 'Best',
    savedLivesLabel: 'Saved lives',

    // Modal: stage cleared
    stageCleared: (n) => `STAGE ${n} CLEARED!`,
    stageCompleted: 'Stage successfully completed!',
    timeElapsed: 'Time elapsed:',
    stageScore: 'Stage score:',
    totalScore: 'Total score:',
    nextStageButton: 'Next stage 🚀',

    // Modal: game complete
    victoryTitle: 'EPIC VICTORY!',
    allStagesDone: (total) => `You completed all ${total} stages!`,
    totalTime: 'Total time:',
    finalScore: 'Final score:',
    luckLine: 'THAT WAS DUMB LUCK!!',
    playAgain: 'Play Again',

    // Modal: defeat
    defeatTitle: 'GAME OVER!',
    outOfLives: 'You ran out of lives!',
    inStage: 'In stage:',
    scoreEarned: 'Score earned:',
    numberWas: (n) => `The number was: ${n}`,
    restartButton: 'Try Again',

    // Second chance on the final stage
    reviveTitle: 'ANOTHER CHANCE?',
    reviveHeadline: 'You missed on the final stage!',
    reviveDescription: (cost) =>
      `You can trade ${cost} saved lives for a new attempt with a fresh secret number.`,
    reviveAccept: (cost) => `Trade ${cost} lives ❤️`,
    reviveDecline: 'No, start over',
    shameTitle: 'VICTORY?',
    shameMessage:
      'True warriors do it on the first try, not real win - Take the walk of shame',

    // Theme and language buttons
    langToggleTitle: 'Cambiar a Español',
    themeToggleTitle: (theme) =>
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
  },
};
