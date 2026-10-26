# B.KAINE // Arte Moderno

Web del grupo con forma de iPod. React + TypeScript + Tailwind CSS v4 (Vite).
`ipod.html` es el mock original y sigue siendo la referencia visual.

```bash
npm install
npm run dev      # desarrollo
npm run build    # comprobación de tipos + build de producción
npm test         # Vitest
npm run lint
```

## Contenido

- Canciones: `src/data/tracks.ts`
- Disco (portada, artista), bio y pegatina: `src/data/band.ts`
- Galería: `src/data/gallery.ts`
- Redes: `src/data/links.ts`

## Archivos multimedia

Los audios y las fotos van en `public/media/` y se publican junto a la web en
Cloudflare Pages:

- Audios: `public/media/audio/*.mp3`, referenciados desde `src/data/tracks.ts`.
- Galería: los originales van en `media-src/gallery/` (fuera de `public/`, no
  se publican). No hay lista que mantener: basta con añadir o borrar archivos.
  `plugins/galleryPlugin.ts` genera de cada foto una miniatura y una versión
  ampliada en WebP (`/media/gallery/{thumb,full}/`), al vuelo en `npm run dev`
  y como archivos del build en producción. La lista se fija al hacer el build.

Cloudflare Pages no admite archivos de más de 25 MiB; `npm run build` se
detiene y los enumera si hay alguno en `public/` (p. ej. los WAV originales).

Los datos guardan claves relativas (`audio/01-INTRO.mp3`), nunca URLs;
`src/lib/media.ts` las resuelve. Para servirlos desde otro sitio, definir
`VITE_MEDIA_BASE_URL` (ver `.env.example`).

## Despliegue en Cloudflare Pages

- Comando de build: `npm run build`
- Directorio de salida: `dist`
