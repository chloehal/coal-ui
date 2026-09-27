"use client";
import * as React from "react";
import { cn } from "./internal.js";
export type ActionBarProps = React.ComponentPropsWithRef<"div"> & {
  selectedCount: number;
  onClear?: () => void;
};
export function ActionBar({
  selectedCount,
  onClear,
  children,
  className,
  ...props
}: ActionBarProps) {
  if (selectedCount < 1) return null;
  return (
    <div
      role="region"
      aria-label="Selection actions"
      className={cn("coal-action-bar", className)}
      {...props}
    >
      <span role="status">{selectedCount} selected</span>
      {children}
      {onClear && (
        <button type="button" onClick={onClear}>
          Clear selection
        </button>
      )}
    </div>
  );
}
