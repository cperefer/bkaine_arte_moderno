import { useEffect, useRef } from "react";
import { AUTO_SCROLL_DELAY_SECONDS, AUTO_SCROLL_PX_PER_SECOND, autoScrollOffset } from "../../lib/autoScroll";

interface StoryBoxProps {
  paragraphs: readonly string[];
  elapsed: number;
  isPlaying: boolean;
}

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Historia de la canción que se desplaza sola mientras suena. La posición se
 * deriva del tiempo de reproducción, así que pausa, reinicio y cambio de vista
 * la mantienen sincronizada. Montar con `key` por pista para reiniciarla.
 */
export function StoryBox({ paragraphs, elapsed, isPlaying }: StoryBoxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const position = useRef(0);
  // Si el usuario desliza el texto, deja de moverse solo hasta la próxima pista.
  const userTookOver = useRef(false);

  // timeupdate llega ~4 veces por segundo: solo se usa para recolocar tras un salto.
  useEffect(() => {
    const el = ref.current;
    if (!el || userTookOver.current || prefersReducedMotion()) return;
    const target = autoScrollOffset(elapsed);
    if (Math.abs(target - position.current) > AUTO_SCROLL_PX_PER_SECOND * 1.5) {
      position.current = target;
      el.scrollTop = target;
    }
  }, [elapsed]);

  // Entre actualizaciones, el avance suave lo hace requestAnimationFrame.
  const running = isPlaying && elapsed >= AUTO_SCROLL_DELAY_SECONDS;
  useEffect(() => {
    const el = ref.current;
    if (!el || !running || prefersReducedMotion()) return;
    let frame = 0;
    let last = performance.now();
    const step = (now: number) => {
      const max = el.scrollHeight - el.clientHeight;
      position.current = Math.min(max, position.current + ((now - last) / 1000) * AUTO_SCROLL_PX_PER_SECOND);
      last = now;
      if (!userTookOver.current) el.scrollTop = position.current;
      if (!userTookOver.current && position.current < max) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const takeOver = () => {
    userTookOver.current = true;
  };

  return (
    <div
      ref={ref}
      onTouchStart={takeOver}
      onWheel={takeOver}
      className="mt-1.5 max-h-22.5 overflow-y-auto border-l-2 border-lcd-accent bg-white/3 p-1.5 text-lcd-sm leading-[1.3] select-text"
    >
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={i > 0 ? "mt-1.5" : undefined}>
          {i === 0 && <strong>HISTORIA: </strong>}
          {paragraph}
        </p>
      ))}
    </div>
  );
}
