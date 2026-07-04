export type ArahJalanEndedStreak = {
  scoreToSave: number | null;
  nextCurrentStreak: number;
};

export function resolveArahJalanStreakAfterMistake(currentStreak: number): ArahJalanEndedStreak {
  const safeStreak = Number.isInteger(currentStreak) && currentStreak > 0 ? currentStreak : 0;

  return {
    scoreToSave: safeStreak > 0 ? safeStreak : null,
    nextCurrentStreak: 0,
  };
}
