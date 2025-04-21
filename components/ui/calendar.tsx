// components/ui/calendar.tsx
"use client";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/src/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        // ... keep existing classNames
      }}
      components={{
        NavButtonPrev: ({ children, ...props }) => (
          <button
            {...props}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        ),
        NavButtonNext: ({ children, ...props }) => (
          <button
            {...props}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        ),
      }}
      weekStartsOn={1}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };