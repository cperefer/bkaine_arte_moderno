import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import sharp from "sharp";
import type { Plugin, ResolvedConfig } from "vite";

const VIRTUAL_ID = "virtual:gallery";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const IMAGE_FILE = /\.(jpe?g|png|webp|avif|tiff?)$/i;

/**
 * Versiones que se generan de cada original. La miniatura cubre 140×70 px con
 * densidad de pantalla 3x; la ampliada cabe en el LCD con margen.
 */
export const VARIANTS = {
  thumb: { width: 420, height: undefined, quality: 70 },
  full: { width: 1200, height: 1200, quality: 80 },
} as const;

export type Variant = keyof typeof VARIANTS;

export interface GalleryEntry {
  id: string;
  /** Claves de medios de cada versión ("gallery/thumb/DSCF2005.webp"). */
  thumb: string;
  full: string;
}

/** Imágenes de una carpeta, por orden de nombre con los números en orden natural. */
export function imageFiles(files: readonly string[]): string[] {
  return files
    .filter((file) => IMAGE_FILE.test(file))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }));
}

/** Nombre de la versión generada: siempre WebP. */
export function outputName(file: string): string {
  return `${file.slice(0, -extname(file).length)}.webp`;
}

export function galleryEntries(files: readonly string[], outDir: string): GalleryEntry[] {
  return imageFiles(files).map((file) => ({
    id: file,
    thumb: `${outDir}/thumb/${outputName(file)}`,
    full: `${outDir}/full/${outputName(file)}`,
  }));
}

/** Reduce una imagen a la versión indicada, respetando la orientación EXIF. */
export function renderVariant(input: string | Buffer, variant: Variant): Promise<Buffer> {
  const { width, height, quality } = VARIANTS[variant];
  return sharp(input)
    .rotate()
    .resize({ width, height, fit: "inside", withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();
}

/**
 * Galería sin listas a mano: los originales se dejan en `sourceDir` (fuera de
 * public/, así no se publican) y el plugin
 * - genera `virtual:gallery` con las fotos que haya en la carpeta;
 * - crea una miniatura y una versión ampliada de cada una en media/<outDir>/,
 *   al vuelo en `npm run dev` y como archivos del build en producción.
 * Las versiones se guardan en caché y solo se regeneran si cambia el original.
 */
export function galleryPlugin({ sourceDir, outDir }: { sourceDir: string; outDir: string }): Plugin {
  let config: ResolvedConfig;
  let source = "";
  let cacheDir = "";

  const sources = () => (existsSync(source) ? imageFiles(readdirSync(source)) : []);

  const cachedVariant = async (file: string, variant: Variant): Promise<Buffer> => {
    const path = join(source, file);
    const { size, mtimeMs } = statSync(path);
    const key = createHash("sha1")
      .update(JSON.stringify([file, size, mtimeMs, VARIANTS[variant]]))
      .digest("hex");
    const target = join(cacheDir, `${key}.webp`);
    if (existsSync(target)) return readFileSync(target);
    const data = await renderVariant(path, variant);
    mkdirSync(cacheDir, { recursive: true });
    writeFileSync(target, data);
    return data;
  };

  return {
    name: "bkaine-gallery",
    configResolved(resolved) {
      config = resolved;
      source = resolve(resolved.root, sourceDir);
      cacheDir = resolve(resolved.cacheDir, "bkaine-gallery");
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined;
      return `export default ${JSON.stringify(galleryEntries(sources(), outDir))};`;
    },
    configureServer(server) {
      const prefix = `${config.base}media/${outDir}/`;
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (!url.startsWith(prefix)) return next();
        const [variant = "", name = ""] = url.slice(prefix.length).split("/").map(decodeURIComponent);
        const file = sources().find((candidate) => outputName(candidate) === name);
        if (!file || !(variant in VARIANTS)) return next();
        cachedVariant(file, variant as Variant).then((data) => {
          res.setHeader("Content-Type", "image/webp");
          res.end(data);
        }, next);
      });

      server.watcher.add(source);
      const refresh = (file: string) => {
        if (resolve(dirname(file)) !== source) return;
        const graph = server.environments.client.moduleGraph;
        const module = graph.getModuleById(RESOLVED_ID);
        if (module) graph.invalidateModule(module);
        server.environments.client.hot.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh);
      server.watcher.on("unlink", refresh);
      server.watcher.on("change", refresh);
    },
    async generateBundle() {
      const variants = Object.keys(VARIANTS) as Variant[];
      const jobs = sources().flatMap((file) =>
        variants.map(async (variant) => {
          this.emitFile({
            type: "asset",
            fileName: `media/${outDir}/${variant}/${outputName(file)}`,
            source: await cachedVariant(file, variant),
          });
        }),
      );
      await Promise.all(jobs);
    },
  };
}
