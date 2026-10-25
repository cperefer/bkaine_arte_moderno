/** 225 → "03:45". Sin duración conocida → "--:--". */
export function formatTime(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return "--:--";
  const whole = Math.floor(seconds);
  const minutes = String(Math.floor(whole / 60)).padStart(2, "0");
  const rest = String(whole % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

/** (0, 3) → "01/03" */
export function formatTrackPosition(index: number, total: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(index + 1)}/${pad(total)}`;
}
