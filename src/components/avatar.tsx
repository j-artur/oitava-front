import { useMemo } from "react";
import { cn } from "~/lib/utils";

export const Avatar = (props: {
  size: "sm" | "md" | "lg" | "xl";
  user?: { nome: string } | null;
}) => {
  const initials = useMemo(
    () =>
      props.user &&
      props.user.nome
        .split(" ")
        .map(n => n[0]?.toLocaleUpperCase())
        .slice(0, 2)
        .join(""),
    [props.user],
  );

  return (
    <div
      className={cn("relative rounded-full bg-white", {
        "h-10 w-10": props.size === "sm",
        "h-12 w-12": props.size === "md",
        "h-16 w-16": props.size === "lg",
        "h-24 w-24": props.size === "xl",
      })}
    >
      <div className="rounded-inherit absolute inset-0 flex items-center justify-center text-xl font-bold text-primary-normal">
        {initials}
      </div>
    </div>
  );
};
