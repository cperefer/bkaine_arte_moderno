import type { Album } from "../types";

export const stickerText = "B.KAINE // 2026";

export const album: Album = {
  artist: "B.KAINE",
  title: "ARTE MODERNO",
  // TODO: sustituir por la portada real, p. ej. { key: "covers/arte-moderno.jpg", ... }
  cover: {
    key: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
    alt: "Portada provisional del disco Arte Moderno",
  },
};

// TODO: texto provisional, pendiente de la bio definitiva.
export const bio =
  'B.KAINE es un chaval que intentó ser QB pero muy allá pues no le salió así que dijo "voy a tirar por el Rap porque de la petanca no se puede vivir".';
