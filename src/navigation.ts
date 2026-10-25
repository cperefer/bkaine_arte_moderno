export type ViewId = "menu" | "player" | "gallery" | "bio" | "links";
export type MenuViewId = Exclude<ViewId, "menu">;

export const VIEW_TITLES: Record<ViewId, string> = {
  menu: "B.KAINE",
  player: "Reproduciendo",
  gallery: "Galería",
  bio: "Bio",
  links: "Enlaces",
};

export const MENU_ITEMS: readonly { view: MenuViewId; label: string }[] = [
  { view: "player", label: "1. Música / Tracks" },
  { view: "gallery", label: "2. Galería Fotos" },
  { view: "bio", label: "3. Sobre el Grupo" },
  { view: "links", label: "4. Redes / Contacto" },
];
