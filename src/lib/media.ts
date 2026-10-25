/**
 * Único punto que conoce dónde viven los archivos multimedia.
 * Local: public/media/ (por defecto). Cloudflare R2: definir VITE_MEDIA_BASE_URL
 * con el dominio público del bucket, manteniendo las mismas claves.
 */
export const MEDIA_BASE_URL =
  import.meta.env.VITE_MEDIA_BASE_URL || `${import.meta.env.BASE_URL}media/`;

const ABSOLUTE_URL = /^(?:[a-z][a-z\d+.-]*:|\/)/i;

export function resolveMediaUrl(key: string, base: string = MEDIA_BASE_URL): string {
  if (ABSOLUTE_URL.test(key)) return key;
  return `${base.replace(/\/+$/, "")}/${key}`;
}
