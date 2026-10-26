import { describe, expect, it } from "vitest";
import { imageKeys } from "./galleryPlugin";

describe("imageKeys", () => {
  it("se queda solo con imágenes, sin distinguir mayúsculas", () => {
    expect(imageKeys([".gitkeep", "a.JPG", "b.png", "notas.txt", "c.webp"], "covers")).toEqual([
      "covers/a.JPG",
      "covers/b.png",
      "covers/c.webp",
    ]);
  });

  it("ordena por nombre con los números en orden natural", () => {
    expect(imageKeys(["foto10.jpg", "foto2.jpg", "foto1.jpg"], "gallery")).toEqual([
      "gallery/foto1.jpg",
      "gallery/foto2.jpg",
      "gallery/foto10.jpg",
    ]);
  });
});
