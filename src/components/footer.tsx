import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="flex h-20 shrink-0 flex-col-reverse items-center justify-between overflow-auto bg-bg-white p-4 text-sm lg:flex-row">
      <div>
        <p className="text-text-secondary">© 2024 Clínica Oitava Rosado</p>
      </div>
      <div className="flex gap-4">
        <p>Feedback</p>
        <p>Centro de suporte</p>
        <p>Contato</p>
      </div>
    </div>
  );
};
