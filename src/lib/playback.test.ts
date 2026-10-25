import { describe, expect, it } from "vitest";
import { afterTrackEnded, nextIndex, previousIndex, shouldRestartOnPrevious } from "./playback";

describe("navegación entre pistas", () => {
  it("▶▶ y ◀◀ dan la vuelta a la lista", () => {
    expect(nextIndex(0, 3)).toBe(1);
    expect(nextIndex(2, 3)).toBe(0);
    expect(previousIndex(1, 3)).toBe(0);
    expect(previousIndex(0, 3)).toBe(2);
  });

  it("◀◀ reinicia la pista pasados 3 segundos", () => {
    expect(shouldRestartOnPrevious(1)).toBe(false);
    expect(shouldRestartOnPrevious(3)).toBe(false);
    expect(shouldRestartOnPrevious(3.1)).toBe(true);
  });
});

describe("afterTrackEnded", () => {
  it("continúa con la siguiente pista", () => {
    expect(afterTrackEnded(0, 3)).toEqual({ index: 1, autoplay: true });
  });

  it("tras la última vuelve a la primera en pausa", () => {
    expect(afterTrackEnded(2, 3)).toEqual({ index: 0, autoplay: false });
  });
});
