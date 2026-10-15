import { useCallback, useEffect, useRef, useState } from 'react';
import { randomBetween } from '../utils/random';

const TICK_MS = 60;
const TICKS = 10;

// Controla el dado: tira al montar y cada vez que `trigger` aumenta.
export function useDiceRoll(trigger) {
  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const intervalRef = useRef(null);
  const rollingRef = useRef(false);

  const roll = useCallback(() => {
    if (rollingRef.current) return;
    rollingRef.current = true;
    setIsRolling(true);

    let ticks = 0;
    intervalRef.current = setInterval(() => {
      setDiceNumber(randomBetween(1, 6));
      ticks += 1;
      if (ticks > TICKS) {
        clearInterval(intervalRef.current);
        rollingRef.current = false;
        setIsRolling(false);
      }
    }, TICK_MS);
  }, []);

  useEffect(() => {
    roll();
    return () => {
      clearInterval(intervalRef.current);
      rollingRef.current = false;
    };
  }, [roll]);

  useEffect(() => {
    if (trigger > 0) roll();
  }, [trigger, roll]);

  return { diceNumber, isRolling, roll };
}
