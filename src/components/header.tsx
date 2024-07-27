import { FC } from "react";
import { Avatar } from "./avatar";

export const Header: FC = () => {
  return (
    <div className="flex h-20 shrink-0 justify-end bg-primary-normal p-4">
      <div className="flex items-center gap-6">
        <div className="text-white flex flex-col text-right">
          <p className="text-lg">
            Olá, <span className="font-semibold">Dyego</span>
          </p>
          <p className="text-sm">Clínica Oitava Rosado</p>
        </div>
        <Avatar size="md" user={{ name: "Dyego Magno", image: "" }} />
      </div>
    </div>
  );
};
