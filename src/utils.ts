import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export type ClassValue = ClassValue[] | string | Record<string, boolean>;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
