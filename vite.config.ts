import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { galleryPlugin } from "./plugins/galleryPlugin";

export default defineConfig({
  // Fotos de la galería: todas las imágenes de public/media/covers/.
  plugins: [react(), tailwindcss(), galleryPlugin({ dir: "covers" })],
  test: {
    environment: "node",
  },
});
