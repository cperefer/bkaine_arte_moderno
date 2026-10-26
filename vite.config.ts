import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { assetSizePlugin } from "./plugins/assetSizePlugin.ts";
import { galleryPlugin } from "./plugins/galleryPlugin.ts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Galería: originales en media-src/gallery/; las versiones reducidas se
    // sirven en /media/gallery/{thumb,full}/.
    galleryPlugin({ sourceDir: "media-src/gallery", outDir: "gallery" }),
    // Cloudflare Pages rechaza archivos de más de 25 MiB.
    assetSizePlugin(),
  ],
  test: {
    environment: "node",
  },
});
