import type { ReactNode } from "react";
import { StatusBar } from "./StatusBar";

interface LcdScreenProps {
  title: string;
  isPlaying: boolean;
  children: ReactNode;
}

export function LcdScreen({ title, isPlaying, children }: LcdScreenProps) {
  return (
    <div className="relative flex h-70 min-h-40 w-full flex-col overflow-hidden rounded-xl border-4 border-lcd-bezel bg-lcd-bg text-lcd-text shadow-[inset_0_0_10px_rgb(0_0_0/0.8)]">
      <StatusBar title={title} isPlaying={isPlaying} />
      <div className="min-h-0 flex-1 overflow-y-auto p-2.5">{children}</div>
    </div>
  );
}
