import { ViewHeading } from "../screen/ViewHeading";

interface BioViewProps {
  bio: string;
}

export function BioView({ bio }: BioViewProps) {
  return (
    <>
      <ViewHeading accent>BIOGRAFÍA</ViewHeading>
      <p className="text-lcd-sm leading-[1.4] select-text">{bio}</p>
    </>
  );
}
