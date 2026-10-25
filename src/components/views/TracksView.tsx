import type { Track } from "../../types";
import { LcdMenu } from "../screen/LcdMenu";

interface TracksViewProps {
  tracks: readonly Track[];
  /** Elemento resaltado (se mueve con la rueda). */
  cursorIndex: number;
  /** Canción cargada en el reproductor. */
  currentIndex: number;
  isPlaying: boolean;
  onSelect: (index: number) => void;
}

export function TracksView({ tracks, cursorIndex, currentIndex, isPlaying, onSelect }: TracksViewProps) {
  return (
    <LcdMenu
      items={tracks.map((track, i) => ({
        id: track.id,
        label: `${String(i + 1).padStart(2, "0")}. ${track.title}`,
        trailing: isPlaying && i === currentIndex ? "▶" : undefined,
        highlighted: i === cursorIndex,
        onSelect: () => onSelect(i),
      }))}
    />
  );
}
