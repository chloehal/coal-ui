"use client";
import * as React from "react";
import { cn } from "./internal.js";
export type ColorPickerProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type" | "size"
>;
export function ColorPicker({ className, ...props }: ColorPickerProps) {
  return (
    <input
      type="color"
      className={cn("coal-color-picker", className)}
      {...props}
    />
  );
}
