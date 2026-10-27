import { ViewHeading } from "../screen/ViewHeading";

interface BioViewProps {
  bio: string;
}

export function BioView({ bio }: BioViewProps) {
  return (
    <>
      <ViewHeading accent>SOBRE ARTE MODERNO</ViewHeading>
      <p className="text-lcd-sm leading-[1.4] whitespace-pre-line select-text">{bio}</p>
    </>
  );
}
