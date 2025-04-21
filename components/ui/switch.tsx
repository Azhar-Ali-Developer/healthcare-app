"use client";
import * as React from "react";
import { cn } from "@/src/lib/utils";

export const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }
>(({ className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      ref={ref}
      className={cn(
        "inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary-600" : "bg-gray-200",
        className
      )}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  );
});

Switch.displayName = "Switch";