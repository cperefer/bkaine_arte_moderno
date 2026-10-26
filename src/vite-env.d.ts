/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEDIA_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Fotos de la galería y claves de sus versiones, generadas por plugins/galleryPlugin.ts. */
declare module "virtual:gallery" {
  const entries: readonly { id: string; thumb: string; full: string }[];
  export default entries;
}
