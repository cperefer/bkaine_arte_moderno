import { describe, expect, it } from "vitest";
import { formatTime, formatTrackPosition } from "./format";

describe("formatTime", () => {
  it("formatea minutos y segundos con ceros", () => {
    expect(formatTime(0)).toBe("00:00");
    expect(formatTime(75.9)).toBe("01:15");
    expect(formatTime(222)).toBe("03:42");
  });

  it("devuelve --:-- sin duración válida", () => {
    expect(formatTime(null)).toBe("--:--");
    expect(formatTime(Number.NaN)).toBe("--:--");
    expect(formatTime(Number.POSITIVE_INFINITY)).toBe("--:--");
  });
});

describe("formatTrackPosition", () => {
  it("numera desde 1 con dos dígitos", () => {
    expect(formatTrackPosition(0, 3)).toBe("01/03");
    expect(formatTrackPosition(11, 12)).toBe("12/12");
  });
});
