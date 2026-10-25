import type { Photo } from "../types";

// TODO: sustituir por las fotos reales en public/media/gallery/, p. ej. key: "gallery/concierto.jpg".
export const photos: readonly Photo[] = [
  {
    id: "concierto",
    key: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    alt: "Concierto",
  },
  {
    id: "estudio",
    key: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
    alt: "Estudio",
  },
  {
    id: "calle",
    key: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80",
    alt: "Calle",
  },
  {
    id: "backstage",
    key: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80",
    alt: "Backstage",
  },
];
