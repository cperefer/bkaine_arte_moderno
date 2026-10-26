import { existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import type { Plugin } from "vite";

const VIRTUAL_ID = "virtual:gallery";
const RESOLVED_ID = `\0${VIRTUAL_ID}`;
const IMAGE_FILE = /\.(jpe?g|png|webp|avif|gif)$/i;

/** Claves de medios ("covers/DSCF2005.JPG") de las imágenes de una carpeta, por orden de nombre. */
export function imageKeys(files: readonly string[], dir: string): string[] {
  return files
    .filter((file) => IMAGE_FILE.test(file))
    .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))
    .map((file) => `${dir}/${file}`);
}

/**
 * Genera el módulo `virtual:gallery` con las fotos que haya en
 * public/media/<dir>, sin mantener ninguna lista a mano: basta con copiar o
 * borrar archivos. En `npm run dev` la página se recarga al cambiar la carpeta;
 * en producción la lista se fija al hacer `npm run build`.
 */
export function galleryPlugin({ dir }: { dir: string }): Plugin {
  let folder = "";

  return {
    name: "bkaine-gallery",
    configResolved(config) {
      folder = resolve(config.publicDir, "media", dir);
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : undefined;
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined;
      const files = existsSync(folder) ? readdirSync(folder) : [];
      return `export default ${JSON.stringify(imageKeys(files, dir))};`;
    },
    configureServer(server) {
      server.watcher.add(folder);
      const refresh = (file: string) => {
        if (resolve(dirname(file)) !== folder) return;
        const graph = server.environments.client.moduleGraph;
        const module = graph.getModuleById(RESOLVED_ID);
        if (module) graph.invalidateModule(module);
        server.environments.client.hot.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh);
      server.watcher.on("unlink", refresh);
    },
  };
}
