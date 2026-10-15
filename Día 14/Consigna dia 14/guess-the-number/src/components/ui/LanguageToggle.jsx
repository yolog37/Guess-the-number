import './LanguageToggle.css';

const SVG_NS = 'http://www.w3.org/2000/svg';

export function LanguageToggle({ title, onToggle }) {
  return (
    <button
      className="language-toggle-btn"
      onClick={onToggle}
      type="button"
      title={title}
      aria-label={title}
    >
      <div className="flag-icon-wrapper">
        <svg className="flag-es" viewBox="0 0 32 32" xmlns={SVG_NS}>
          <circle cx="16" cy="16" r="16" fill="#C60B1E" />
          <rect y="8" width="32" height="16" fill="#FAE002" />
          <circle cx="9" cy="16" r="2" fill="#C60B1E" opacity="0.8" />
        </svg>
        <svg className="flag-en" viewBox="0 0 32 32" xmlns={SVG_NS}>
          <clipPath id="circleView">
            <circle cx="16" cy="16" r="16" />
          </clipPath>
          <g clipPath="url(#circleView)">
            <rect width="32" height="32" fill="#00247D" />
            <path d="M0 0 L32 32 M32 0 L0 32" stroke="#FFF" strokeWidth="4" />
            <path d="M0 0 L32 32 M32 0 L0 32" stroke="#CF142B" strokeWidth="2" />
            <path d="M16 0 V32 M0 16 H32" stroke="#FFF" strokeWidth="6" />
            <path d="M16 0 V32 M0 16 H32" stroke="#CF142B" strokeWidth="4" />
          </g>
        </svg>
      </div>
    </button>
  );
}

export default LanguageToggle;
