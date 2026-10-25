interface ClickWheelProps {
  isPlaying: boolean;
  onMenu: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onSelect: () => void;
}

// El padding amplía la zona táctil; las posiciones compensan esos 8px para
// que el texto quede donde estaba en el mock (top/bottom 15px, lados 20px; rueda de 230px).
const wheelButton =
  "absolute cursor-pointer p-2 text-lcd-base font-bold tracking-[1px] text-wheel-label focus-visible:outline-1 focus-visible:outline-lcd-accent";

export function ClickWheel({ isPlaying, onMenu, onPrevious, onNext, onPlayPause, onSelect }: ClickWheelProps) {
  return (
    <div className="click-wheel relative mb-2.5 flex size-57.5 shrink-0 items-center justify-center rounded-full">
      <button type="button" className={`${wheelButton} top-1.75`} onClick={onMenu}>
        MENU
      </button>
      <button type="button" className={`${wheelButton} right-3`} onClick={onNext} aria-label="Siguiente canción">
        ▶▶
      </button>
      <button type="button" className={`${wheelButton} left-3`} onClick={onPrevious} aria-label="Canción anterior">
        ◀◀
      </button>
      <button
        type="button"
        className={`${wheelButton} bottom-1.75`}
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        ▶❚❚
      </button>
      <button
        type="button"
        className="center-button flex size-20 cursor-pointer items-center justify-center rounded-full border border-center-border text-lcd-2xs text-center-label focus-visible:outline-1 focus-visible:outline-lcd-accent active:scale-[0.96]"
        onClick={onSelect}
      >
        SELECT
      </button>
    </div>
  );
}
