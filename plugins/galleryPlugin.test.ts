import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { VARIANTS, galleryEntries, imageFiles, outputName, renderVariant } from "./galleryPlugin";

describe("imageFiles", () => {
  it("se queda solo con imágenes, sin distinguir mayúsculas", () => {
    expect(imageFiles([".gitkeep", "a.JPG", "b.png", "notas.txt", "c.webp"])).toEqual(["a.JPG", "b.png", "c.webp"]);
  });

  it("ordena por nombre con los números en orden natural", () => {
    expect(imageFiles(["foto10.jpg", "foto2.jpg", "foto1.jpg"])).toEqual(["foto1.jpg", "foto2.jpg", "foto10.jpg"]);
  });
});

describe("galleryEntries", () => {
  it("apunta a la miniatura y a la ampliada en WebP", () => {
    expect(outputName("DSCF2005.JPG")).toBe("DSCF2005.webp");
    expect(galleryEntries(["DSCF2005.JPG"], "gallery")).toEqual([
      { id: "DSCF2005.JPG", thumb: "gallery/thumb/DSCF2005.webp", full: "gallery/full/DSCF2005.webp" },
    ]);
  });
});

describe("renderVariant", () => {
  const original = () =>
    sharp({ create: { width: 4160, height: 6240, channels: 3, background: "#808080" } }).jpeg().toBuffer();

  it("reduce a las medidas de cada versión manteniendo la proporción", async () => {
    const thumb = await sharp(await renderVariant(await original(), "thumb")).metadata();
    expect([thumb.format, thumb.width, thumb.height]).toEqual(["webp", VARIANTS.thumb.width, 630]);

    const full = await sharp(await renderVariant(await original(), "full")).metadata();
    expect([full.width, full.height]).toEqual([800, VARIANTS.full.height]);
  });
});
