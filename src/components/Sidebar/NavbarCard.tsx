import { type ReactNode } from "react";

interface NavbarCardProps {
  selected?: boolean;
  text: string;
  logo: ReactNode;
  onClick?: () => void;
}

export const NavbarCard = ({
  selected = false,
  text,
  logo,
  onClick,
}: NavbarCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-start gap-x-2 rounded drop-shadow ${
        selected ? "bg-indigo-700" : "bg-slate-100"
      } px-4 py-2 ${selected ? "text-white" : "text-black"}`}
    >
      {logo}

      <p>{text}</p>
    </div>
  );
};
