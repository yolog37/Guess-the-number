// Posiciones [cx, cy] de los puntos de cada cara del dado (viewBox 64x64).
const DICE_DOTS = {
  1: [[32, 32]],
  2: [[20, 20], [44, 44]],
  3: [[20, 20], [32, 32], [44, 44]],
  4: [[20, 20], [44, 20], [20, 44], [44, 44]],
  5: [[20, 20], [44, 20], [32, 32], [20, 44], [44, 44]],
  6: [[20, 18], [44, 18], [20, 32], [44, 32], [20, 46], [44, 46]],
};

export function Dice({ value, isRolling, onClick, title }) {
  const radius = value === 1 ? 6 : 5;

  return (
    <button
      type="button"
      className={`dice-vector-container ${isRolling ? 'rolling' : ''}`}
      onClick={onClick}
      title={title}
      aria-label={title}
    >
      <svg width="70" height="70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="56" height="56" rx="14" fill="#f7f5f0" stroke="#1e1e1e" strokeWidth="5" />
        {DICE_DOTS[value].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} fill="#1e1e1e" />
        ))}
      </svg>
    </button>
  );
}
