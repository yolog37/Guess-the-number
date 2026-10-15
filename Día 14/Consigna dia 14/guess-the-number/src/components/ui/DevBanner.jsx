import './DevBanner.css';

const MESSAGE = 'Made by -edipae- | Developer in progress...';
const REPEATS = 4;

export function DevBanner() {
  return (
    <div className="dev-banner-ticker">
      <div className="dev-banner-text">
        {Array.from({ length: REPEATS }, (_, i) => (
          <span key={i}>{MESSAGE}&nbsp;&nbsp;•&nbsp;&nbsp;</span>
        ))}
      </div>
    </div>
  );
}

export default DevBanner;
