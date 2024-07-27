import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="bg-white flex h-20 shrink-0 items-center justify-between p-4 text-sm">
      <div>
        <p className="text-text-normal">© 2024 Clínica Oitava Rosado</p>
      </div>
      <div className="flex gap-4">
        <p>Feedback</p>
        <p>Centro de suporte</p>
        <p>Contato</p>
      </div>
    </div>
  );
};
