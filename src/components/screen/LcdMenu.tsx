import { useEffect, useRef } from "react";

export interface LcdMenuItem {
  id: string;
  label: string;
  trailing?: string;
  highlighted?: boolean;
  onSelect?: () => void;
  /** Enlace externo; tiene prioridad sobre onSelect. */
  href?: string;
}

interface LcdMenuProps {
  items: readonly LcdMenuItem[];
  size?: "md" | "sm";
}

export function LcdMenu({ items, size = "md" }: LcdMenuProps) {
  const listRef = useRef<HTMLUListElement>(null);

  // En listas largas (canciones), al abrir se muestra el elemento resaltado.
  useEffect(() => {
    listRef.current?.querySelector("[aria-current]")?.scrollIntoView({ block: "nearest" });
  }, []);

  return (
    <ul ref={listRef} className={size === "md" ? "text-lcd-md" : "text-lcd-base"}>
      {items.map((item) => {
        const className = `flex w-full justify-between border-b border-dashed border-lcd-divider px-1.5 py-2 text-left focus-visible:outline-1 focus-visible:outline-lcd-accent ${
          item.href || item.onSelect ? "cursor-pointer" : ""
        } ${item.highlighted ? "bg-lcd-accent font-bold text-black" : ""}`;
        const content = (
          <>
            {item.label}
            {item.trailing && <span aria-hidden="true">{item.trailing}</span>}
          </>
        );

        return (
          <li key={item.id}>
            {item.href ? (
              <a className={className} href={item.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : item.onSelect ? (
              <button
                type="button"
                className={className}
                onClick={item.onSelect}
                aria-current={item.highlighted || undefined}
              >
                {content}
              </button>
            ) : (
              <span className={className}>{content}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
