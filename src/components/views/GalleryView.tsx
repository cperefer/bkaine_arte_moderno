import { useEffect, useRef } from "react";
import { resolveMediaUrl } from "../../lib/media";
import type { Photo } from "../../types";
import { ViewHeading } from "../screen/ViewHeading";

interface GalleryViewProps {
  photos: readonly Photo[];
  /** Foto resaltada (se mueve con la rueda) o ampliada. */
  cursorIndex: number;
  isOpen: boolean;
  onOpen: (index: number) => void;
  onClose: () => void;
}

export function GalleryView({ photos, cursorIndex, isOpen, onOpen, onClose }: GalleryViewProps) {
  const listRef = useRef<HTMLUListElement>(null);

  // La miniatura resaltada se mantiene a la vista al recorrerlas con la rueda.
  useEffect(() => {
    listRef.current?.querySelector("[aria-current]")?.scrollIntoView({ block: "nearest" });
  }, [cursorIndex, isOpen]);

  const openPhoto = isOpen ? photos[cursorIndex] : undefined;

  if (openPhoto) {
    return (
      <button
        type="button"
        className="flex size-full cursor-pointer items-center justify-center focus-visible:outline-1 focus-visible:outline-lcd-accent"
        onClick={onClose}
        aria-label={`Cerrar foto: ${openPhoto.alt}`}
      >
        <img
          className="max-h-full max-w-full border border-lcd-text grayscale"
          src={resolveMediaUrl(openPhoto.key)}
          alt={openPhoto.alt}
        />
      </button>
    );
  }

  return (
    <>
      <ViewHeading>ARCHIVO FOTOGRÁFICO</ViewHeading>
      {photos.length === 0 ? (
        <p className="text-lcd-sm">Sin fotos todavía.</p>
      ) : (
        <ul ref={listRef} className="grid grid-cols-2 gap-1.5">
          {photos.map((photo, i) => {
            const highlighted = i === cursorIndex;
            return (
              <li key={photo.id}>
                {/* El resaltado va en el botón: el grayscale de la imagen también apagaría su borde. */}
                <button
                  type="button"
                  className={`block w-full cursor-pointer focus-visible:outline-1 focus-visible:outline-lcd-accent ${
                    highlighted ? "outline-2 -outline-offset-1 outline-lcd-accent" : ""
                  }`}
                  onClick={() => onOpen(i)}
                  aria-label={`Ampliar foto: ${photo.alt}`}
                  aria-current={highlighted || undefined}
                >
                  <img
                    className="h-17.5 w-full border border-lcd-text object-cover grayscale"
                    src={resolveMediaUrl(photo.thumbKey)}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
