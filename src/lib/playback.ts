/** Como en un iPod: ◀◀ reinicia la pista si ya lleva sonando más de esto. */
export const RESTART_THRESHOLD_SECONDS = 3;

export function nextIndex(index: number, total: number): number {
  return (index + 1) % total;
}

export function previousIndex(index: number, total: number): number {
  return (index - 1 + total) % total;
}

export function shouldRestartOnPrevious(currentTime: number): boolean {
  return currentTime > RESTART_THRESHOLD_SECONDS;
}

/** Al terminar una pista pasa a la siguiente; tras la última vuelve a la primera en pausa. */
export function afterTrackEnded(index: number, total: number): { index: number; autoplay: boolean } {
  const isLast = index >= total - 1;
  return { index: isLast ? 0 : index + 1, autoplay: !isLast };
}
