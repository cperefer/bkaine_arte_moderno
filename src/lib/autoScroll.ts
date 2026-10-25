/** La historia empieza a desplazarse tras estos segundos de canción. */
export const AUTO_SCROLL_DELAY_SECONDS = 2;
/** Velocidad aproximada de lectura (≈ 2 líneas cada 4 s con el texto del LCD). */
export const AUTO_SCROLL_PX_PER_SECOND = 8;

/** Posición de scroll que corresponde a un momento de la canción. */
export function autoScrollOffset(elapsedSeconds: number): number {
  return Math.max(0, elapsedSeconds - AUTO_SCROLL_DELAY_SECONDS) * AUTO_SCROLL_PX_PER_SECOND;
}
