import { useCallback, useEffect, useRef, useState } from "react";
import { resolveMediaUrl } from "../lib/media";
import { afterTrackEnded, nextIndex, previousIndex, shouldRestartOnPrevious } from "../lib/playback";
import type { Track } from "../types";

export interface Player {
  track: Track;
  index: number;
  isPlaying: boolean;
  currentTime: number;
  /** null hasta que el navegador conoce los metadatos del audio. */
  duration: number | null;
  hasError: boolean;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
}

/**
 * Encapsula un único HTMLAudioElement. El elemento es la fuente de verdad de la
 * reproducción y el estado de React solo refleja sus eventos; `index` es la
 * única selección, así que audio, textos y vista no pueden desincronizarse.
 */
export function usePlayer(tracks: readonly Track[]): Player {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);

  const loadTrack = useCallback(
    (i: number, autoplay: boolean) => {
      const audio = audioRef.current;
      const track = tracks[i];
      if (!audio || !track) return;

      indexRef.current = i;
      setIndex(i);
      setCurrentTime(0);
      setDuration(null);
      setHasError(false);
      audio.src = resolveMediaUrl(track.audioKey);
      // Los fallos de carga llegan por el evento "error"; aquí solo se ignora el rechazo.
      if (autoplay) audio.play().catch(() => {});
    },
    [tracks],
  );

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;
    const initial = tracks[indexRef.current];
    if (initial) audio.src = resolveMediaUrl(initial.audioKey);

    const updateDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : null);
    const listeners: [keyof HTMLMediaElementEventMap, () => void][] = [
      ["play", () => setIsPlaying(true)],
      ["pause", () => setIsPlaying(false)],
      ["timeupdate", () => setCurrentTime(audio.currentTime)],
      ["loadedmetadata", updateDuration],
      ["durationchange", updateDuration],
      [
        "error",
        () => {
          setHasError(true);
          setIsPlaying(false);
        },
      ],
      [
        "ended",
        () => {
          const { index: next, autoplay } = afterTrackEnded(indexRef.current, tracks.length);
          loadTrack(next, autoplay);
        },
      ],
    ];
    listeners.forEach(([type, listener]) => audio.addEventListener(type, listener));

    return () => {
      listeners.forEach(([type, listener]) => audio.removeEventListener(type, listener));
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [tracks, loadTrack]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  const next = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    loadTrack(nextIndex(indexRef.current, tracks.length), !audio.paused);
  }, [tracks, loadTrack]);

  const previous = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (shouldRestartOnPrevious(audio.currentTime)) {
      audio.currentTime = 0;
      return;
    }
    loadTrack(previousIndex(indexRef.current, tracks.length), !audio.paused);
  }, [tracks, loadTrack]);

  const track = tracks[index];
  if (!track) throw new Error("usePlayer necesita al menos una pista");

  return { track, index, isPlaying, currentTime, duration, hasError, togglePlay, next, previous };
}
