import type { ReactNode } from "react";

interface IpodShellProps {
  stickerText: string;
  children: ReactNode;
}

/**
 * Carcasa del iPod. La altura se limita al viewport (menos el padding de la
 * página) para que en móviles bajos sea la pantalla LCD la que se encoja.
 */
export function IpodShell({ stickerText, children }: IpodShellProps) {
  return (
    <div className="ipod-case relative flex h-[min(640px,calc(100dvh-20px))] min-h-112 w-full max-w-90 flex-col items-center justify-between rounded-[36px] border-3 border-case-border p-5 select-none">
      <div
        aria-hidden="true"
        className="absolute -top-2.5 right-3.75 z-10 rotate-5 border border-black bg-sticker px-2 py-0.5 text-lcd-2xs font-bold text-black shadow-[2px_2px_0_#000]"
      >
        {stickerText}
      </div>
      {children}
    </div>
  );
}
