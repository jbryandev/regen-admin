import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const dotVariants = cva("rounded-full", {
  variants: {
    variant: {
      default: "bg-primary",
      red: "border border-primary",
    },
    size: {
      default: "h-3 w-3",
      sm: "h-1 w-1",
      lg: "h-5 w-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface DotProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    VariantProps<typeof dotVariants> {
  asChild?: boolean;
}

const ColoredDot = React.forwardRef<HTMLDivElement, DotProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(dotVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
ColoredDot.displayName = "ColoredDot";

export { ColoredDot };
