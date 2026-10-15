import { formatTime } from '../../utils/formatTime';

export function ScoreBoard({ t, score, savedLives, bestScore, seconds }) {
  return (
    <div className="score-board">
      <span>🏆 {t.scoreLabel}: {score}</span>
      <span>❤️ {t.savedLivesLabel}: {savedLives}</span>
      <span>⭐ {t.bestScoreLabel}: {bestScore}</span>
      <span>⏱️ {formatTime(seconds)}</span>
    </div>
  );
}
