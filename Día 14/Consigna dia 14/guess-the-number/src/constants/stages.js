export const STAGES = [
  { stage: 1, max: 100, lives: 7 },
  { stage: 2, max: 50, lives: 6 },
  { stage: 3, max: 25, lives: 5 },
  { stage: 4, max: 10, lives: 3 },
  { stage: 5, max: 3, lives: 1 },
];

/* Para testing, reemplaza STAGES por:
export const STAGES = Array.from({ length: 5 }, (_, i) => ({ stage: i + 1, max: 1, lives: 1 }));
*/

export const TOTAL_STAGES = STAGES.length;
export const MIN_STAGE_SCORE = 50;
// Vidas guardadas que se gastan para reintentar la etapa final.
export const REVIVE_COST = 3;

export const GAME_STATE = Object.freeze({
  PLAYING: 'playing',
  WON: 'won',
  FINISHED: 'gameFinished',
  LOST: 'lost',
  REVIVE_OFFER: 'reviveOffer',
});

// Resultado de un intento, guardado en el historial.
// 'higher' = el secreto es MAYOR que lo que probaste; 'lower' = MENOR.
export const HINT = Object.freeze({
  HIGHER: 'higher',
  LOWER: 'lower',
  CORRECT: 'correct',
});

export const FEEDBACK = Object.freeze({
  INITIAL: 'initial',
  RANGE: 'range',
  REPEATED: 'repeated',
  HIGHER: 'higher',
  LOWER: 'lower',
});
