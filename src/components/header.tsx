"use client";

import { FC } from "react";
import { useAppSelector } from "~/lib/hooks";
import { Avatar } from "./avatar";

export const Header: FC = () => {
  const authSegment = useAppSelector(store => store.auth);

  return (
    <div className="flex h-20 shrink-0 justify-end bg-primary-normal p-4">
      <div className="flex items-center gap-6">
        <div className="flex flex-col text-right text-white">
          <p className="text-lg">
            Olá, <span className="font-semibold">{authSegment?.user.nome.split(" ")[0]}</span>
          </p>
          <p className="text-sm">Clínica Oitava Rosado</p>
        </div>
        <Avatar size="md" user={authSegment?.user} />
      </div>
    </div>
  );
};
