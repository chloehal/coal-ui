"use client";
import * as React from "react";
import { cn } from "./internal.js";
export type ChipProps = React.ComponentPropsWithRef<"span"> & {
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
};
export function Chip({
  children,
  className,
  onRemove,
  removeLabel = "Remove item",
  disabled,
  ...props
}: ChipProps) {
  return (
    <span className={cn("coal-chip", className)} {...props}>
      {children}
      {onRemove && (
        <button
          type="button"
          disabled={disabled}
          aria-label={removeLabel}
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  );
}
