import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { assetSizePlugin } from "./plugins/assetSizePlugin.ts";
import { galleryPlugin } from "./plugins/galleryPlugin.ts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Fotos de la galería: todas las imágenes de public/media/covers/.
    galleryPlugin({ dir: "covers" }),
    // Cloudflare Pages rechaza archivos de más de 25 MiB.
    assetSizePlugin(),
  ],
  test: {
    environment: "node",
  },
});
