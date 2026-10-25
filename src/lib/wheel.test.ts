import { describe, expect, it } from "vitest";
import { DEGREES_PER_STEP, angleDelta, angleFrom, consumeSteps, moveIndex } from "./wheel";

describe("angleFrom", () => {
  it("crece en sentido horario en coordenadas de pantalla", () => {
    expect(angleFrom(0, 0, 1, 0)).toBe(0);
    expect(angleFrom(0, 0, 0, 1)).toBe(90); // abajo
    expect(angleFrom(0, 0, 0, -1)).toBe(-90); // arriba
  });
});

describe("angleDelta", () => {
  it("toma el camino corto al cruzar ±180°", () => {
    expect(angleDelta(170, -170)).toBe(20);
    expect(angleDelta(-170, 170)).toBe(-20);
    expect(angleDelta(10, 30)).toBe(20);
  });
});

describe("consumeSteps", () => {
  it("emite pasos enteros y guarda el resto", () => {
    expect(consumeSteps(DEGREES_PER_STEP * 2 + 5)).toEqual({ steps: 2, rest: 5 });
    expect(consumeSteps(-(DEGREES_PER_STEP + 3))).toEqual({ steps: -1, rest: -3 });
    expect(consumeSteps(DEGREES_PER_STEP - 1)).toEqual({ steps: 0, rest: DEGREES_PER_STEP - 1 });
  });
});

describe("moveIndex", () => {
  it("no da la vuelta en los extremos", () => {
    expect(moveIndex(0, -1, 4)).toBe(0);
    expect(moveIndex(3, 2, 4)).toBe(3);
    expect(moveIndex(1, 2, 4)).toBe(3);
  });
});
