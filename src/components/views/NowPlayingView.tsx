import { formatTrackPosition } from "../../lib/format";
import { resolveMediaUrl } from "../../lib/media";
import type { Album, Track } from "../../types";
import { ProgressBar } from "../screen/ProgressBar";
import { StoryBox } from "../screen/StoryBox";

interface NowPlayingViewProps {
  album: Album;
  track: Track;
  index: number;
  total: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number | null;
  hasError: boolean;
}

export function NowPlayingView({
  album,
  track,
  index,
  total,
  isPlaying,
  currentTime,
  duration,
  hasError,
}: NowPlayingViewProps) {
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
          {track.producer && <p className="mt-1 text-lcd-xs text-lcd-accent opacity-80">PROD: {track.producer}</p>}
        </div>
      </div>

      <StoryBox key={track.id} paragraphs={track.story} elapsed={currentTime} isPlaying={isPlaying} />

      <ProgressBar currentTime={currentTime} duration={duration} />
      {hasError && (
        <p role="alert" className="text-lcd-2xs text-lcd-accent">
          [ ERROR: NO SE PUDO CARGAR EL AUDIO ]
        </p>
      )}
    </div>
  );
}
