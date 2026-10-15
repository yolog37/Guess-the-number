import { HINT } from '../../constants/stages';

// Texto de cada intento: "MAYOR que 25", "MENOR que 50" o "✅ 51" si acertó.
function attemptText(t, { value, hint }) {
  if (hint === HINT.HIGHER) return t.hintHigher(value);
  if (hint === HINT.LOWER) return t.hintLower(value);
  return ` ${value}`;
}

export function AttemptHistory({ t, label, attempts }) {
  return (
    <div className="history-container">
      <span className="history-label">{label}</span>
      <div className="history-chips">
        {attempts.map((attempt, index) => (
          <span key={`${attempt.value}-${index}`} className="history-chip">
            {attemptText(t, attempt)}
          </span>
        ))}
      </div>
    </div>
  );
}
