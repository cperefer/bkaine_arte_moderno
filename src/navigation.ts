export type ViewId = "menu" | "tracks" | "player" | "gallery" | "bio" | "links";
export type MenuViewId = "tracks" | "gallery" | "bio" | "links";

export const VIEW_TITLES: Record<ViewId, string> = {
  menu: "B.KAINE",
  tracks: "Música",
  player: "Reproduciendo",
  gallery: "Galería",
  bio: "Arte Moderno",
  links: "Enlaces",
};

/** Vista a la que vuelve MENU (sube un nivel, como en el iPod). */
export const PARENT_VIEW: Record<ViewId, ViewId> = {
  menu: "menu",
  tracks: "menu",
  player: "tracks",
  gallery: "menu",
  bio: "menu",
  links: "menu",
};

/** Sección del menú principal a la que pertenece cada vista. */
export const MENU_SECTION: Record<ViewId, MenuViewId | null> = {
  menu: null,
  tracks: "tracks",
  player: "tracks",
  gallery: "gallery",
  bio: "bio",
  links: "links",
};

export const MENU_ITEMS: readonly { view: MenuViewId; label: string }[] = [
  { view: "tracks", label: "1. Música / Tracks" },
  { view: "gallery", label: "2. Galería Fotos" },
  { view: "bio", label: '3. Sobre "Arte Moderno"' },
  { view: "links", label: "4. Redes / Contacto" },
];
