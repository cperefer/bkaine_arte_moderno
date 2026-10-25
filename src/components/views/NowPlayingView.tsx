import { formatTrackPosition } from "../../lib/format";
import { resolveMediaUrl } from "../../lib/media";
import type { Album, Track } from "../../types";
import { ProgressBar } from "../screen/ProgressBar";

interface NowPlayingViewProps {
  album: Album;
  track: Track;
  index: number;
  total: number;
  currentTime: number;
  duration: number | null;
  hasError: boolean;
}

export function NowPlayingView({ album, track, index, total, currentTime, duration, hasError }: NowPlayingViewProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2.5">
        <img
          className="size-21.25 shrink-0 border border-lcd-text bg-lcd-cover object-cover grayscale-40"
          src={resolveMediaUrl(album.cover.key)}
          alt={album.cover.alt}
        />
        <div aria-live="polite">
          <div className="text-lcd-2xs opacity-60">TRACK {formatTrackPosition(index, total)}</div>
          <h2 className="mb-0.5 text-lcd-lg font-bold text-lcd-accent uppercase">{track.title}</h2>
          <p className="text-lcd-xs opacity-80">
            {album.artist} - {album.title}
          </p>
          <p className="mt-1 text-lcd-xs text-lcd-accent opacity-80">PROD: {track.producer}</p>
        </div>
      </div>

      <div className="mt-1.5 max-h-22.5 overflow-y-auto border-l-2 border-lcd-accent bg-white/3 p-1.5 text-lcd-sm leading-[1.3] select-text">
        <strong>HISTORIA:</strong> {track.story}
      </div>

      <ProgressBar currentTime={currentTime} duration={duration} />
      {hasError && (
        <p role="alert" className="text-lcd-2xs text-lcd-accent">
          [ ERROR: NO SE PUDO CARGAR EL AUDIO ]
        </p>
      )}
    </div>
  );
}
