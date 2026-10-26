/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MEDIA_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Claves de las fotos de la galería, generadas por plugins/galleryPlugin.ts. */
declare module "virtual:gallery" {
  const keys: readonly string[];
  export default keys;
}
