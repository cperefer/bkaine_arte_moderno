import type { MenuViewId } from "../../navigation";
import { MENU_ITEMS } from "../../navigation";
import { LcdMenu } from "../screen/LcdMenu";

interface MainMenuViewProps {
  highlighted: MenuViewId;
  onOpen: (view: MenuViewId) => void;
}

export function MainMenuView({ highlighted, onOpen }: MainMenuViewProps) {
  return (
    <LcdMenu
      items={MENU_ITEMS.map(({ view, label }) => ({
        id: view,
        label,
        trailing: ">",
        highlighted: view === highlighted,
        onSelect: () => onOpen(view),
      }))}
    />
  );
}
