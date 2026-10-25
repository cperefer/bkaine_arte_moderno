import type { MouseEvent, PointerEvent } from "react";
import { useRef } from "react";
import { GESTURE_THRESHOLD_DEGREES, INNER_RADIUS_RATIO, angleDelta, angleFrom, consumeSteps } from "../lib/wheel";

interface Gesture {
  pointerId: number;
  cx: number;
  cy: number;
  lastAngle: number;
  accumulated: number;
  total: number;
}

/**
 * Gesto de girar la rueda: llama a `onRotate(+n)` en sentido horario y
 * `onRotate(-n)` en antihorario. Un toque sin giro sigue llegando a los
 * botones; si hubo giro, se anula el click del botón donde empezó.
 */
export function useWheelRotation(onRotate: (steps: number) => void) {
  const gesture = useRef<Gesture | null>(null);
  const rotated = useRef(false);

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    // El botón central no forma parte del anillo.
    if (Math.hypot(e.clientX - cx, e.clientY - cy) < (rect.width / 2) * INNER_RADIUS_RATIO) return;
    rotated.current = false;
    gesture.current = {
      pointerId: e.pointerId,
      cx,
      cy,
      lastAngle: angleFrom(cx, cy, e.clientX, e.clientY),
      accumulated: 0,
      total: 0,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const g = gesture.current;
    if (!g || g.pointerId !== e.pointerId) return;
    const angle = angleFrom(g.cx, g.cy, e.clientX, e.clientY);
    const delta = angleDelta(g.lastAngle, angle);
    g.lastAngle = angle;
    g.total += Math.abs(delta);

    if (!rotated.current && g.total > GESTURE_THRESHOLD_DEGREES) {
      rotated.current = true;
      // A partir de aquí la rueda recibe el gesto aunque el dedo salga de ella.
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    const { steps, rest } = consumeSteps(g.accumulated + delta);
    g.accumulated = rest;
    if (steps !== 0) onRotate(steps);
  };

  const onPointerEnd = (e: PointerEvent<HTMLElement>) => {
    if (gesture.current?.pointerId === e.pointerId) gesture.current = null;
  };

  const onClickCapture = (e: MouseEvent<HTMLElement>) => {
    if (!rotated.current) return;
    rotated.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return { onPointerDown, onPointerMove, onPointerUp: onPointerEnd, onPointerCancel: onPointerEnd, onClickCapture };
}
