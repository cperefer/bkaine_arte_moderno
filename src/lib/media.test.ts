import { describe, expect, it } from "vitest";
import { resolveMediaUrl } from "./media";

describe("resolveMediaUrl", () => {
  it("antepone la base local a una clave relativa", () => {
    expect(resolveMediaUrl("audio/intro.mp3", "/media/")).toBe("/media/audio/intro.mp3");
  });

  it("funciona con una base remota con o sin barra final", () => {
    expect(resolveMediaUrl("audio/intro.mp3", "https://media.example.com/")).toBe(
      "https://media.example.com/audio/intro.mp3",
    );
    expect(resolveMediaUrl("audio/intro.mp3", "https://media.example.com")).toBe(
      "https://media.example.com/audio/intro.mp3",
    );
  });

  it("codifica espacios y % en los nombres de archivo", () => {
    expect(resolveMediaUrl("audio/07-1% FT SOAVE.mp3", "/media/")).toBe("/media/audio/07-1%25%20FT%20SOAVE.mp3");
  });

  it("respeta las URL absolutas y las rutas desde la raíz", () => {
    expect(resolveMediaUrl("https://cdn.example.com/a.jpg", "/media/")).toBe("https://cdn.example.com/a.jpg");
    expect(resolveMediaUrl("/otro/a.jpg", "/media/")).toBe("/otro/a.jpg");
  });
});
