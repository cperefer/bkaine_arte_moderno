interface StatusBarProps {
  title: string;
  isPlaying: boolean;
}

export function StatusBar({ title, isPlaying }: StatusBarProps) {
  return (
    <div className="flex items-center justify-between border-b border-lcd-line bg-lcd-header px-2.5 py-1.5 text-lcd-xs font-bold">
      <span>{title}</span>
      <div className="flex items-center gap-1.5">
        <span role="img" aria-label={isPlaying ? "Reproduciendo" : "En pausa"}>
          {isPlaying ? "▶" : "❚❚"}
        </span>
        <div aria-hidden="true" className="flex h-2.25 w-4.5 border border-lcd-text p-px">
          <div className="h-full w-[70%] bg-lcd-accent" />
        </div>
      </div>
    </div>
  );
}
