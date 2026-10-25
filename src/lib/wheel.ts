/** Grados de giro necesarios para avanzar un elemento. */
export const DEGREES_PER_STEP = 20;
/** Giro mínimo para considerar que es un gesto y no un toque en un botón. */
export const GESTURE_THRESHOLD_DEGREES = 10;
/** Fracción del radio ocupada por el botón central (80px de 230px), donde no se gira. */
export const INNER_RADIUS_RATIO = 0.36;

/** Ángulo en grados de un punto respecto al centro. En pantalla (y hacia abajo) crece en sentido horario. */
export function angleFrom(cx: number, cy: number, x: number, y: number): number {
  return (Math.atan2(y - cy, x - cx) * 180) / Math.PI;
}

/** Diferencia entre dos ángulos por el camino más corto, en [-180, 180). */
export function angleDelta(from: number, to: number): number {
  return ((((to - from + 180) % 360) + 360) % 360) - 180;
}

/** Convierte el giro acumulado en pasos (+ horario, − antihorario) y lo que sobra. */
export function consumeSteps(accumulated: number): { steps: number; rest: number } {
  const steps = Math.trunc(accumulated / DEGREES_PER_STEP);
  return { steps, rest: accumulated - steps * DEGREES_PER_STEP };
}

/** Mueve un índice dentro de una lista sin dar la vuelta, como el iPod. */
export function moveIndex(index: number, steps: number, length: number): number {
  return Math.min(length - 1, Math.max(0, index + steps));
}
