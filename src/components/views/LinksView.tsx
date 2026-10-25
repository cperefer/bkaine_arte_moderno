import type { SocialLink } from "../../types";
import { LcdMenu } from "../screen/LcdMenu";
import { ViewHeading } from "../screen/ViewHeading";

interface LinksViewProps {
  links: readonly SocialLink[];
}

export function LinksView({ links }: LinksViewProps) {
  return (
    <>
      <ViewHeading>PLATAFORMAS</ViewHeading>
      <LcdMenu size="sm" items={links.map(({ id, label, href }) => ({ id, label: `> ${label}`, href: href || undefined }))} />
    </>
  );
}
