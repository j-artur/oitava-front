import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border text-sm font-semibold text-text-accent ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-darker focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "primary":
          "border-primary-dark bg-primary-dark text-white hover:border-primary-darker hover:bg-primary-darker",
        "primary-outline": "border-primary-darker bg-white text-primary-darker hover:bg-bg-hover",
        "secondary": "border-border-darker bg-white text-text-primary hover:bg-bg-hover",
        "destructive":
          "border-destructive-border bg-destructive-bg text-destructive-text hover:bg-destructive-hover",
        "ghost": "border-none hover:bg-bg-hover",
        "pagination": "border-none bg-primary-light/50 text-text-primary hover:bg-primary-light",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-14 px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
