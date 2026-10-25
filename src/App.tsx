import { useState } from "react";
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
import { usePlayer } from "./hooks/usePlayer";
import type { MenuViewId, ViewId } from "./navigation";
import { MENU_SECTION, PARENT_VIEW, VIEW_TITLES } from "./navigation";

export default function App() {
  const player = usePlayer(tracks);
  const [view, setView] = useState<ViewId>("menu");
  // Como en el iPod, el menú resalta la última sección abierta y SELECT la abre.
  const [menuCursor, setMenuCursor] = useState<MenuViewId>("tracks");
  const [openPhotoId, setOpenPhotoId] = useState<string | null>(null);

  const openView = (next: ViewId) => {
    setView(next);
    setOpenPhotoId(null);
    const section = MENU_SECTION[next];
    if (section) setMenuCursor(section);
  };

  // MENU sube un nivel: foto ampliada → galería, reproductor → listado, resto → menú.
  const handleMenu = () => {
    if (view === "gallery" && openPhotoId) setOpenPhotoId(null);
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
    else if (view === "tracks") selectTrack(player.index);
    else player.togglePlay();
  };

  const renderView = () => {
    switch (view) {
      case "menu":
        return <MainMenuView highlighted={menuCursor} onOpen={openView} />;
      case "tracks":
        return <TracksView tracks={tracks} currentIndex={player.index} onSelect={selectTrack} />;
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
            openPhotoId={openPhotoId}
            onOpen={setOpenPhotoId}
            onClose={() => setOpenPhotoId(null)}
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
        <LcdScreen title={VIEW_TITLES[view]} isPlaying={player.isPlaying}>
          {renderView()}
        </LcdScreen>
        <ClickWheel
          isPlaying={player.isPlaying}
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
