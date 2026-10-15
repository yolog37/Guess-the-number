import { useId } from 'react';
import './ResultModal.css';

const VARIANT_CLASS = { win: '', lost: 'lost-modal', shame: 'shame-modal' };

/**
 * Modal único para victoria de etapa, juego completo, derrota y oferta de segunda oportunidad.
 * variant: 'win' | 'lost' | 'shame'
 * stats: [{ label, value }]
 * secondaryLabel + onSecondary: segundo botón (rojo), opcional.
 */
export function ResultModal({
  variant = 'win',
  icon,
  title,
  headline,
  description,
  stats = [],
  highlight,
  buttonLabel,
  buttonIcon,
  onConfirm,
  secondaryLabel,
  onSecondary,
}) {
  const titleId = useId();
  const isLost = variant === 'lost';

  return (
    <div className="splash-overlay">
      <div
        className={`splash-modal animate-pop ${VARIANT_CLASS[variant] ?? ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="splash-icon">{icon}</div>
        <h2 id={titleId} className={`splash-title ${isLost ? 'lost-title' : ''}`}>
          {title}
        </h2>

        <div className="splash-text-structured">
          <p className="splash-headline">{headline}</p>
          {description && <p className="splash-description">{description}</p>}
          {stats.map(({ label, value }) => (
            <p key={label} className="splash-stat">
              {label} <strong>{value}</strong>
            </p>
          ))}
          {highlight && <p className="splash-highlight">{highlight}</p>}
        </div>

        <button
          type="button"
          onClick={onConfirm}
          className={`splash-button ${isLost ? 'lost-button' : ''}`}
          autoFocus
        >
          {buttonIcon}
          {buttonLabel}
        </button>

        {secondaryLabel && (
          <button
            type="button"
            onClick={onSecondary}
            className="splash-button lost-button splash-button--secondary"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </div>
  );
}
