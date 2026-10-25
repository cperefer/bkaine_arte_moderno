import { formatTime } from "../../lib/format";

interface ProgressBarProps {
  currentTime: number;
  duration: number | null;
}

export function ProgressBar({ currentTime, duration }: ProgressBarProps) {
  const percent = duration ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div>
      <div
        role="progressbar"
        aria-label="Progreso de la canción"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration ?? 0)}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
        className="relative mt-2 h-2 border border-lcd-text bg-lcd-line"
      >
        <div className="h-full bg-lcd-accent" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-0.5 flex justify-between text-lcd-2xs">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
