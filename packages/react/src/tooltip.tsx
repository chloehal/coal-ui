"use client";
import * as React from "react";
import { Action, cn, type ActionProps } from "./internal.js";
import {
  FloatingRoot,
  FloatingContent,
  useFloating,
  type FloatingContentProps,
  type FloatingProps,
} from "./floating.js";
export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export function Tooltip(props: FloatingProps) {
  return <FloatingRoot {...props} />;
}
export function TooltipTrigger({
  onFocus,
  onBlur,
  onPointerEnter,
  onPointerLeave,
  onKeyDown,
  ...props
}: ActionProps) {
  const c = useFloating();
  return (
    <Action
      {...props}
      ref={(node) => {
        c.anchor.current = node;
      }}
      aria-describedby={c.open ? c.id : undefined}
      onFocus={(e) => {
        onFocus?.(e);
        if (!e.defaultPrevented) {
          c.cancelClose();
          c.set(true);
        }
      }}
      onBlur={(e) => {
        onBlur?.(e);
        c.scheduleClose();
      }}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (e.pointerType !== "touch") {
          c.cancelClose();
          c.set(true);
        }
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        c.scheduleClose();
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Escape") {
          e.preventDefault();
          c.set(false);
        }
      }}
    />
  );
}
export function TooltipContent({
  className,
  onPointerEnter,
  onPointerLeave,
  ...props
}: FloatingContentProps) {
  const c = useFloating();
  return (
    <FloatingContent
      onPointerEnter={(e) => {
        c.cancelClose();
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        c.scheduleClose();
        onPointerLeave?.(e);
      }}
      role="tooltip"
      autoFocus={false}
      className={cn("coal-tooltip", className)}
      {...props}
    />
  );
}
