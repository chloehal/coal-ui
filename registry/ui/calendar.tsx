"use client";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { cn } from "@/lib/utils";
export function Calendar({ className, classNames, ...props }: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays
      className={cn("relative w-fit p-3 text-sm", className)}
      classNames={{
        months: "relative flex gap-5",
        month: "space-y-3",
        month_caption: "flex h-8 items-center justify-center font-medium",
        nav: "absolute inset-x-0 top-0 flex justify-between",
        button_previous:
          "z-10 flex size-8 items-center justify-center rounded hover:bg-muted disabled:opacity-30",
        button_next:
          "z-10 flex size-8 items-center justify-center rounded hover:bg-muted disabled:opacity-30",
        chevron: "size-4 fill-current",
        month_grid: "border-collapse",
        weekday: "size-8 text-[10px] font-normal text-muted-foreground",
        day: "size-8 text-center",
        day_button:
          "size-8 rounded-md text-xs hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring",
        selected:
          "rounded-md bg-primary text-primary-foreground [&_button:hover]:bg-primary/90",
        today: "font-bold underline decoration-brand underline-offset-4",
        outside: "text-muted-foreground opacity-40",
        disabled: "opacity-25",
        range_middle: "rounded-none bg-secondary text-secondary-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
