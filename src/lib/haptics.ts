/** Duración del pulso al pulsar un botón: corto, como el "clic" de la rueda. */
export const TAP_VIBRATION_MS = 15;
/** Pulso al pasar por un elemento del menú girando la rueda: un "tic" más leve. */
export const TICK_VIBRATION_MS = 8;

/**
 * Funciona en Android; Safari (iOS) no implementa la Vibration API y aquí
 * simplemente no hace nada.
 */
function vibrate(ms: number): void {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(ms);
}

/** Vibración breve al pulsar un botón. */
export function tapFeedback(): void {
  vibrate(TAP_VIBRATION_MS);
}

/** "Tic" al cambiar de elemento con la rueda. */
export function tickFeedback(): void {
  vibrate(TICK_VIBRATION_MS);
}
