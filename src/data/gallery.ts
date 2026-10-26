import entries from "virtual:gallery";
import type { Photo } from "../types";

// La lista sale de media-src/gallery/ (ver plugins/galleryPlugin.ts): no hay que mantenerla a mano.
export const photos: readonly Photo[] = entries.map(({ id, thumb, full }, i) => ({
  id,
  key: full,
  thumbKey: thumb,
  alt: `Foto ${i + 1} de ${entries.length} de la galería`,
}));
