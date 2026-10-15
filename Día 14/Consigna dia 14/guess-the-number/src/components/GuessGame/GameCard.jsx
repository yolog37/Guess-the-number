// Tarjeta del juego: título de etapa, mensaje, vidas y contenido (children).
// messageKey cambia en cada intento para que el mensaje se remonte y su
// animación de destello se repita aunque la pista sea igual a la anterior.
export function GameCard({
  stageNumber,
  title,
  message,
  messageClass = '',
  messageKey,
  isShaking,
  livesLabel,
  attemptsLeft,
  children,
}) {
  return (
    <div className={`game-area stage-${stageNumber}`}>
      <h2 className="game-range-title">{title}</h2>

      <div className="game-info-box">
        <p
          key={messageKey}
          className={`game-message ${isShaking ? 'shake-animation' : ''} ${messageClass}`}
        >
          {message}
        </p>
        <p className="game-attempts">
          {livesLabel}: {attemptsLeft}
        </p>
      </div>

      {children}
    </div>
  );
}
