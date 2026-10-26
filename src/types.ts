/**
 * Las claves (`key`, `audioKey`) son rutas relativas al almacenamiento de
 * medios ("audio/intro.mp3"). `resolveMediaUrl` las convierte en URL, de modo
 * que cambiar dónde se alojan los archivos no toca datos ni componentes.
 * Una URL absoluta también es válida (útil para recursos provisionales).
 */
export interface MediaImage {
  key: string;
  alt: string;
}

export interface Album {
  artist: string;
  title: string;
  cover: MediaImage;
}

export interface Track {
  id: string;
  title: string;
  producer?: string;
  audioKey: string;
  /** Un elemento por párrafo. */
  story: readonly string[];
}

/** `key` es la versión ampliada; `thumbKey`, la miniatura reducida. */
export interface Photo extends MediaImage {
  id: string;
  thumbKey: string;
}

export interface SocialLink {
  id: string;
  label: string;
  /** Vacío mientras no exista el perfil: se muestra sin enlace. */
  href: string;
}
