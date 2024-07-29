import { ReactNode } from "react";

export const Error: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <p className="text-xs font-medium text-destructive-text">{children}</p>;
};
