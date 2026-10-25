import { describe, expect, it } from "vitest";
import { AUTO_SCROLL_PX_PER_SECOND, autoScrollOffset } from "./autoScroll";

describe("autoScrollOffset", () => {
  it("no se mueve durante los 2 primeros segundos", () => {
    expect(autoScrollOffset(0)).toBe(0);
    expect(autoScrollOffset(2)).toBe(0);
  });

  it("avanza a velocidad constante después", () => {
    expect(autoScrollOffset(3)).toBe(AUTO_SCROLL_PX_PER_SECOND);
    expect(autoScrollOffset(12)).toBe(10 * AUTO_SCROLL_PX_PER_SECOND);
  });
});
