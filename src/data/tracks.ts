import type { Track } from "../types";

// Los audios se sirven desde public/media/audio/ (ver src/lib/media.ts).
export const tracks: readonly Track[] = [
  {
    id: "intro",
    title: "INTRO",
    producer: "BASSMAN",
    audioKey: "audio/intro.mp3",
    story:
      "Paseos nocturnos por la periferia. Ritmo pesado con sample de piano procesado que refleja la rutina urbana.",
  },
  {
    id: "doble-embrague",
    title: "DOBLE EMBRAGUE",
    producer: "KRO BEATS",
    audioKey: "audio/doble-embrague.mp3",
    story:
      "Tema escrito tras un parón creativo. Reflexiona sobre el miedo a la hoja en blanco y la autenticidad artística.",
  },
  {
    id: "kenofaltena",
    title: "KENOFALTENA",
    producer: "B.KAINE REC",
    audioKey: "audio/kenofaltena.mp3",
    story:
      "Grabado en una sola toma con micro abierto. Energía noventera rindiendo tributo a la cultura del rap puro.",
  },
];
