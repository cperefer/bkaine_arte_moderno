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

Los datos guardan claves relativas (`audio/intro.mp3`), nunca URLs.
`src/lib/media.ts` las resuelve contra `VITE_MEDIA_BASE_URL`:

- Local (por defecto): los archivos van en `public/media/` (`audio/`, `covers/`, `gallery/`).
- Cloudflare R2: subir los mismos archivos con las mismas claves al bucket y
  definir `VITE_MEDIA_BASE_URL=https://<dominio-del-bucket>/` (ver `.env.example`).
