/**
 * Único punto que conoce dónde viven los archivos multimedia. Por defecto,
 * public/media/, que se publica junto a la web en Cloudflare Pages. Si algún
 * día se sirven desde otro sitio, basta con definir VITE_MEDIA_BASE_URL
 * manteniendo las mismas claves.
 */
export const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_BASE_URL || `${import.meta.env.BASE_URL}media/`;

const ABSOLUTE_URL = /^(?:[a-z][a-z\d+.-]*:|\/)/i;

export function resolveMediaUrl(key: string, base: string = MEDIA_BASE_URL): string {
  if (ABSOLUTE_URL.test(key)) return key;
  // Los nombres de archivo pueden llevar espacios o "%" (p. ej. "07-1% FT SOAVE.mp3").
  const path = key.split("/").map(encodeURIComponent).join("/");
  return `${base.replace(/\/+$/, "")}/${path}`;
}
