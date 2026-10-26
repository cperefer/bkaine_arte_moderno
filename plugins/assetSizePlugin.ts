import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type { Plugin } from "vite";

/** Límite de Cloudflare Pages por archivo publicado. */
export const PAGES_MAX_FILE_BYTES = 25 * 1024 * 1024;

/** Rutas (relativas a `root`) de los archivos que superan `maxBytes`. */
export function oversizedFiles(root: string, maxBytes: number, dir = root): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return oversizedFiles(root, maxBytes, path);
    return statSync(path).size > maxBytes ? [relative(root, path)] : [];
  });
}

/**
 * Detiene `npm run build` si en public/ hay archivos que Cloudflare Pages no
 * aceptaría (p. ej. los WAV originales), en lugar de fallar al desplegar.
 */
export function assetSizePlugin(): Plugin {
  return {
    name: "bkaine-asset-size",
    apply: "build",
    configResolved(config) {
      if (!config.publicDir) return;
      const tooBig = oversizedFiles(config.publicDir, PAGES_MAX_FILE_BYTES);
      if (tooBig.length === 0) return;
      throw new Error(
        `Cloudflare Pages no admite archivos de más de 25 MiB. Saca de public/ o comprime:\n` +
          tooBig.map((file) => `  - ${file}`).join("\n"),
      );
    },
  };
}
