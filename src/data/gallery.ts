import keys from "virtual:gallery";
import type { Photo } from "../types";

// La lista sale de la carpeta de fotos (ver plugins/galleryPlugin.ts): no hay que mantenerla a mano.
export const photos: readonly Photo[] = keys.map((key, i) => ({
  id: key,
  key,
  alt: `Foto ${i + 1} de ${keys.length} de la galería`,
}));
