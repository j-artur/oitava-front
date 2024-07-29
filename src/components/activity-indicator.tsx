import { cn } from "~/lib/utils";

export const ActivityIndicator = (props: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-5 w-5 animate-spin rounded-full border-4 border-border-light border-b-primary-light",
        props.className,
      )}
    />
  );
};
