import { useEffect } from "react";
import { resolveMediaUrl } from "../lib/media";
import type { Album } from "../types";
import type { Player } from "./usePlayer";

/**
 * Media Session API: título, portada y controles en la notificación de
 * Android y en la pantalla de bloqueo. Sin soporte del navegador no hace nada.
 */
export function useMediaSession(player: Player, album: Album): void {
  const { track, isPlaying, currentTime, duration, togglePlay, next, previous, seek } = player;
  const session = typeof navigator !== "undefined" && "mediaSession" in navigator ? navigator.mediaSession : null;

  useEffect(() => {
    if (!session) return;
    session.metadata = new MediaMetadata({
      title: track.title,
      artist: album.artist,
      album: album.title,
      artwork: [{ src: resolveMediaUrl(album.cover.key), type: "image/webp" }],
    });
  }, [session, track, album]);

  useEffect(() => {
    if (!session) return;
    session.playbackState = isPlaying ? "playing" : "paused";
  }, [session, isPlaying]);

  useEffect(() => {
    if (!session || duration === null) return;
    session.setPositionState({ duration, position: Math.min(currentTime, duration), playbackRate: 1 });
  }, [session, currentTime, duration]);

  useEffect(() => {
    if (!session) return;
    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ["play", togglePlay],
      ["pause", togglePlay],
      ["nexttrack", next],
      ["previoustrack", previous],
      ["seekto", (details) => details.seekTime !== undefined && seek(details.seekTime)],
    ];
    handlers.forEach(([action, handler]) => session.setActionHandler(action, handler));
    return () => handlers.forEach(([action]) => session.setActionHandler(action, null));
  }, [session, togglePlay, next, previous, seek]);
}
