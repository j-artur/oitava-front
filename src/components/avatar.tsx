import Image from "next/image";
import { useMemo } from "react";
import { cn } from "~/utils";

export const Avatar = (props: {
  size: "sm" | "md" | "lg" | "xl";
  user?: { name: string; image: string } | null;
}) => {
  const initials = useMemo(
    () =>
      props.user &&
      props.user.name
        .split(" ")
        .map((n) => n[0]?.toLocaleUpperCase())
        .slice(0, 2)
        .join(""),
    [props.user],
  );

  return (
    <div
      className={cn("bg-white relative rounded-full", {
        "h-10 w-10": props.size === "sm",
        "h-12 w-12": props.size === "md",
        "h-16 w-16": props.size === "lg",
        "h-24 w-24": props.size === "xl",
      })}
    >
      <div className="rounded-inherit absolute inset-0 flex items-center justify-center text-xl font-bold text-primary-normal">
        {initials}
      </div>
      {(props.user?.image || !initials) && (
        <div
          className={cn("index-0 absolute z-10", {
            "h-10 w-10": props.size === "sm",
            "h-12 w-12": props.size === "md",
            "h-16 w-16": props.size === "lg",
            "h-24 w-24": props.size === "xl",
          })}
        >
          <Image
            src={props.user?.image ?? "/google.svg"}
            alt={`Foto de perfil de ${props.user?.name ?? "usuário"}`}
            width={
              props.size === "sm" ? 40 : props.size === "md" ? 48 : props.size === "lg" ? 64 : 96
            }
            height={
              props.size === "sm" ? 40 : props.size === "md" ? 48 : props.size === "lg" ? 64 : 96
            }
            className={cn("rounded-full", {
              "h-10 w-10": props.size === "sm",
              "h-12 w-12": props.size === "md",
              "h-16 w-16": props.size === "lg",
              "h-24 w-24": props.size === "xl",
            })}
          />
        </div>
      )}
    </div>
  );
};
