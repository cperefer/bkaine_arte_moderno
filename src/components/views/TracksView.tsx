import type { Track } from "../../types";
import { LcdMenu } from "../screen/LcdMenu";

interface TracksViewProps {
  tracks: readonly Track[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export function TracksView({ tracks, currentIndex, onSelect }: TracksViewProps) {
  return (
    <LcdMenu
      items={tracks.map((track, i) => ({
        id: track.id,
        label: `${String(i + 1).padStart(2, "0")}. ${track.title}`,
        highlighted: i === currentIndex,
        onSelect: () => onSelect(i),
      }))}
    />
  );
}
