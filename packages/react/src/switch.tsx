"use client";
import * as React from "react";
import { PixelGlyph } from "./pixel-glyph.js";
import { cn } from "./internal.js";
export type SwitchProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type" | "size"
> & { onCheckedChange?: (checked: boolean) => void };
export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  onChange,
  children,
  className,
  ...props
}: SwitchProps) {
  return (
    <span
      className={cn("coal-switch", className)}
      data-disabled={props.disabled || undefined}
    >
      <input
        {...props}
        type="checkbox"
        role="switch"
        checked={checked}
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        onChange={(e) => {
          onChange?.(e);
          if (!e.defaultPrevented) onCheckedChange?.(e.target.checked);
        }}
      />
      {children ?? <SwitchThumb />}
    </span>
  );
}
export function SwitchThumb({
  className,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn("coal-switch-thumb", className)}
      {...props}
    >
      <PixelGlyph />
    </span>
  );
}
