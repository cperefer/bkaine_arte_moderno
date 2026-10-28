import { useRef, useState } from "react";
import { ClickWheel } from "./components/device/ClickWheel";
import { IpodShell } from "./components/device/IpodShell";
import { LcdScreen } from "./components/screen/LcdScreen";
import { BioView } from "./components/views/BioView";
import { GalleryView } from "./components/views/GalleryView";
import { LinksView } from "./components/views/LinksView";
import { MainMenuView } from "./components/views/MainMenuView";
import { NowPlayingView } from "./components/views/NowPlayingView";
import { TracksView } from "./components/views/TracksView";
import { album, bio, stickerText } from "./data/band";
import { photos } from "./data/gallery";
import { socialLinks } from "./data/links";
import { tracks } from "./data/tracks";
import { useMediaSession } from "./hooks/useMediaSession";
import { usePlayer } from "./hooks/usePlayer";
import { tickFeedback } from "./lib/haptics";
import { moveIndex } from "./lib/wheel";
import type { MenuViewId, ViewId } from "./navigation";
import {
  MENU_ITEMS,
  MENU_SECTION,
  PARENT_VIEW,
  VIEW_TITLES,
} from "./navigation";

/** Desplazamiento de la pantalla por cada paso de la rueda en vistas de contenido. */
const WHEEL_SCROLL_PX = 48;

export default function App() {
  const player = usePlayer(tracks);
  useMediaSession(player, album);
  const [view, setView] = useState<ViewId>("menu");
  // Como en el iPod, el menú resalta la última sección abierta y SELECT la abre.
  const [menuCursor, setMenuCursor] = useState<MenuViewId>("tracks");
  // Canción resaltada en el listado; al abrirlo empieza en la que está cargada.
  const [trackCursor, setTrackCursor] = useState(0);
  // Foto resaltada en la galería (o ampliada, si isPhotoOpen).
  const [photoCursor, setPhotoCursor] = useState(0);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);
  const screenBodyRef = useRef<HTMLDivElement>(null);
  // Copia inmediata de los cursores: varios pasos de la rueda pueden llegar
  // antes del siguiente render, y hay que saber si el resaltado cambió de verdad.
  const menuCursorRef = useRef(menuCursor);
  const trackCursorRef = useRef(trackCursor);
  const photoCursorRef = useRef(photoCursor);

  const updateMenuCursor = (next: MenuViewId) => {
    menuCursorRef.current = next;
    setMenuCursor(next);
  };

  const updateTrackCursor = (next: number) => {
    trackCursorRef.current = next;
    setTrackCursor(next);
  };

  const updatePhotoCursor = (next: number) => {
    photoCursorRef.current = next;
    setPhotoCursor(next);
  };

  const openPhoto = (index: number) => {
    updatePhotoCursor(index);
    setIsPhotoOpen(true);
  };

  const openView = (next: ViewId) => {
    setView(next);
    setIsPhotoOpen(false);
    if (next === "tracks") updateTrackCursor(player.index);
    const section = MENU_SECTION[next];
    if (section) updateMenuCursor(section);
  };

  // Girar la rueda: en los menús y la galería mueve el resaltado (con un "tic"
  // por cada cambio; con una foto ampliada, pasa de foto); en las demás vistas
  // desplaza la pantalla. En el reproductor no hace nada (en el iPod era el volumen).
  const handleRotate = (steps: number) => {
    switch (view) {
      case "menu": {
        const cursor = menuCursorRef.current;
        const index = MENU_ITEMS.findIndex((item) => item.view === cursor);
        const next =
          MENU_ITEMS[moveIndex(index, steps, MENU_ITEMS.length)]?.view ?? cursor;
        if (next !== cursor) {
          updateMenuCursor(next);
          tickFeedback();
        }
        break;
      }
      case "tracks": {
        const cursor = trackCursorRef.current;
        const next = moveIndex(cursor, steps, tracks.length);
        if (next !== cursor) {
          updateTrackCursor(next);
          tickFeedback();
        }
        break;
      }
      case "gallery": {
        if (photos.length === 0) break;
        const cursor = photoCursorRef.current;
        const next = moveIndex(cursor, steps, photos.length);
        if (next !== cursor) {
          updatePhotoCursor(next);
          tickFeedback();
        }
        break;
      }
      case "bio":
      case "links":
        screenBodyRef.current?.scrollBy({ top: steps * WHEEL_SCROLL_PX });
        break;
      case "player":
        break;
    }
  };

  // MENU sube un nivel: foto ampliada → galería, reproductor → listado, resto → menú.
  const handleMenu = () => {
    if (view === "gallery" && isPhotoOpen) setIsPhotoOpen(false);
    else openView(PARENT_VIEW[view]);
  };

  const selectTrack = (index: number) => {
    player.select(index);
    openView("player");
  };

  const handleNext = () => {
    player.next();
    if (view !== "player") openView("player");
  };

  const handlePrevious = () => {
    player.previous();
    if (view !== "player") openView("player");
  };

  const handleSelect = () => {
    if (view === "menu") openView(menuCursor);
    else if (view === "tracks") selectTrack(trackCursor);
    else if (view === "gallery" && !isPhotoOpen && photos.length > 0)
      openPhoto(photoCursor);
    else player.togglePlay();
  };

  const renderView = () => {
    switch (view) {
      case "menu":
        return <MainMenuView highlighted={menuCursor} onOpen={openView} />;
      case "tracks":
        return (
          <TracksView
            tracks={tracks}
            cursorIndex={trackCursor}
            currentIndex={player.index}
            isPlaying={player.isPlaying}
            onSelect={selectTrack}
          />
        );
      case "player":
        return (
          <NowPlayingView
            album={album}
            track={player.track}
            index={player.index}
            total={tracks.length}
            isPlaying={player.isPlaying}
            currentTime={player.currentTime}
            duration={player.duration}
            hasError={player.hasError}
          />
        );
      case "gallery":
        return (
          <GalleryView
            photos={photos}
            cursorIndex={photoCursor}
            isOpen={isPhotoOpen}
            onOpen={openPhoto}
            onClose={() => setIsPhotoOpen(false)}
          />
        );
      case "bio":
        return <BioView bio={bio} />;
      case "links":
        return <LinksView links={socialLinks} />;
    }
  };

  return (
    <main className="flex min-h-dvh items-center justify-center p-2.5">
      <h1 className="sr-only">B.KAINE — Arte Moderno</h1>
      <IpodShell stickerText={stickerText}>
        <LcdScreen
          title={
            view === "gallery" && isPhotoOpen
              ? `${VIEW_TITLES.gallery} ${photoCursor + 1}/${photos.length}`
              : VIEW_TITLES[view]
          }
          isPlaying={player.isPlaying}
          bodyRef={screenBodyRef}
        >
          {renderView()}
        </LcdScreen>
        <ClickWheel
          isPlaying={player.isPlaying}
          onRotate={handleRotate}
          onMenu={handleMenu}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onPlayPause={player.togglePlay}
          onSelect={handleSelect}
        />
      </IpodShell>
    </main>
  );
}
