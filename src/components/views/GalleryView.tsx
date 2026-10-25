import { resolveMediaUrl } from "../../lib/media";
import type { Photo } from "../../types";
import { ViewHeading } from "../screen/ViewHeading";

interface GalleryViewProps {
  photos: readonly Photo[];
  openPhotoId: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export function GalleryView({ photos, openPhotoId, onOpen, onClose }: GalleryViewProps) {
  const openPhoto = photos.find((photo) => photo.id === openPhotoId);

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
      <ul className="grid grid-cols-2 gap-1.5">
        {photos.map((photo) => (
          <li key={photo.id}>
            <button
              type="button"
              className="block w-full cursor-pointer focus-visible:outline-1 focus-visible:outline-lcd-accent"
              onClick={() => onOpen(photo.id)}
              aria-label={`Ampliar foto: ${photo.alt}`}
            >
              <img
                className="h-17.5 w-full border border-lcd-text object-cover grayscale"
                src={resolveMediaUrl(photo.key)}
                alt={photo.alt}
                loading="lazy"
              />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
