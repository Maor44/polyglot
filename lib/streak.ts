export function calculateStreak(currentStreak: number, lastPlayedDate: string | null): number {
  const today = new Date().toISOString().slice(0, 10);
  if (lastPlayedDate === today) return currentStreak;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return lastPlayedDate === yesterday ? currentStreak + 1 : 1;
}

export function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}
