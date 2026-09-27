import * as React from "react";
import { cn } from "./internal.js";
export type TimePickerProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type"
>;
export function TimePicker({ className, ...props }: TimePickerProps) {
  return (
    <input
      type="time"
      className={cn("coal-input", "coal-time-picker", className)}
      {...props}
    />
  );
}
