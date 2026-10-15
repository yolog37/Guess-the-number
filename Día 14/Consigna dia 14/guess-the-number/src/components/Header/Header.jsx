import numbersImg from '../../assets/numbers1.png';
import { useDiceRoll } from '../../hooks/useDiceRoll';
import { Dice } from './Dice';
import './Header.css';

// El dado gira al montar y cada vez que `triggerRoll` aumenta (cada intento).
export function Header({ t, maxLimit, triggerRoll }) {
  const { diceNumber, isRolling, roll } = useDiceRoll(triggerRoll);

  return (
    <header className="game-header">
      <img src={numbersImg} alt={t.headerAlt} className="header-img" />

      <h1 className="title-text">{t.title}</h1>

      <Dice
        value={diceNumber}
        isRolling={isRolling}
        onClick={roll}
        title={t.diceTitle}
      />

      <p className="header-instruction">{t.subtitle(maxLimit)}</p>
    </header>
  );
}

export default Header;
