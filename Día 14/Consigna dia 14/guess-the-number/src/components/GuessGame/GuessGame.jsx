import rocketIcon from '../../assets/rocket.svg';
import {
  FEEDBACK,
  GAME_STATE,
  REVIVE_COST,
  TOTAL_STAGES,
} from '../../constants/stages';
import { useGuessGame } from '../../hooks/useGuessGame';
import { formatTime } from '../../utils/formatTime';
import { AttemptHistory } from './AttemptHistory';
import { GameCard } from './GameCard';
import { GuessForm } from './GuessForm';
import { ResultModal } from './ResultModal';
import { ScoreBoard } from './ScoreBoard';
import './GuessGame.css';

export default function GuessGame({ t, onAttemptMade, onStageChange }) {
  const game = useGuessGame({ onAttemptMade, onStageChange });
  const { stage, gameState } = game;

  const messages = {
    [FEEDBACK.INITIAL]: t.initialMessage,
    [FEEDBACK.RANGE]: t.validNumber(stage.max),
    [FEEDBACK.REPEATED]: t.alreadyGuessed,
    [FEEDBACK.HIGHER]: t.higher(game.lastGuess),
    [FEEDBACK.LOWER]: t.lower(game.lastGuess),
  };

  // MAYOR destella en verde y MENOR en amarillo.
  const flashClass = {
    [FEEDBACK.HIGHER]: 'flash-green',
    [FEEDBACK.LOWER]: 'flash-yellow',
  }[game.feedback];

  return (
    <>
      <ScoreBoard
        t={t}
        score={game.score}
        savedLives={game.savedLives}
        bestScore={game.bestScore}
        seconds={game.seconds}
      />

      <GameCard
        stageNumber={stage.stage}
        title={`${t.stageLabel} ${stage.stage} (1 - ${stage.max})`}
        message={messages[game.feedback]}
        messageClass={flashClass}
        messageKey={game.history.length}
        isShaking={game.isShaking}
        livesLabel={t.lives}
        attemptsLeft={game.attemptsLeft}
      >
        <GuessForm
          value={game.guess}
          onChange={game.setGuess}
          onSubmit={game.submitGuess}
          disabled={gameState !== GAME_STATE.PLAYING}
          placeholder={t.inputPlaceholder}
          buttonLabel={t.checkButton}
        />
        <AttemptHistory t={t} label={t.previousAttempts} attempts={game.history} />
      </GameCard>

      {gameState === GAME_STATE.WON && (
        <ResultModal
          icon="🎉👑"
          title={t.stageCleared(stage.stage)}
          headline={t.stageCompleted}
          stats={[
            { label: t.timeElapsed, value: formatTime(game.seconds) },
            { label: t.stageScore, value: game.stageScore },
            { label: t.totalScore, value: game.score },
          ]}
          buttonLabel={t.nextStageButton}
          onConfirm={game.nextStage}
        />
      )}

      {gameState === GAME_STATE.REVIVE_OFFER && (
        <ResultModal
          icon="❤️🔄"
          title={t.reviveTitle}
          headline={t.reviveHeadline}
          description={t.reviveDescription(REVIVE_COST)}
          stats={[{ label: `${t.savedLivesLabel}:`, value: game.savedLives }]}
          buttonLabel={t.reviveAccept(REVIVE_COST)}
          onConfirm={game.acceptRevive}
          secondaryLabel={t.reviveDecline}
          onSecondary={game.declineRevive}
        />
      )}

      {gameState === GAME_STATE.FINISHED && (
        <ResultModal
          variant={game.usedRevive ? 'shame' : 'win'}
          icon={game.usedRevive ? '🚶💨' : '🏆🔥'}
          title={game.usedRevive ? t.shameTitle : t.victoryTitle}
          headline={t.allStagesDone(TOTAL_STAGES)}
          stats={[
            { label: t.totalTime, value: formatTime(game.seconds) },
            { label: t.finalScore, value: game.score },
          ]}
          highlight={game.usedRevive ? t.shameMessage : t.luckLine}
          buttonIcon={<img src={rocketIcon} alt="" className="rocket-icon-svg" />}
          buttonLabel={t.playAgain}
          onConfirm={game.restart}
        />
      )}

      {gameState === GAME_STATE.LOST && (
        <ResultModal
          variant="lost"
          icon="💀💔"
          title={t.defeatTitle}
          headline={t.outOfLives}
          stats={[
            { label: t.inStage, value: stage.stage },
            { label: t.scoreEarned, value: game.score },
          ]}
          highlight={t.numberWas(game.targetNumber)}
          buttonLabel={t.restartButton}
          onConfirm={game.restart}
        />
      )}
    </>
  );
}
