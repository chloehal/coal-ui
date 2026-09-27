"use client";
import * as React from "react";
import {
  FloatingRoot,
  FloatingContent,
  useFloating,
  type FloatingProps,
  type FloatingContentProps,
} from "./floating.js";
export function HoverCard(props: FloatingProps) {
  return <FloatingRoot {...props} />;
}
export function HoverCardTrigger({
  onFocus,
  onBlur,
  onPointerEnter,
  onPointerLeave,
  ...props
}: React.ComponentPropsWithRef<"a">) {
  const c = useFloating();
  return (
    <a
      {...props}
      ref={(node) => {
        c.anchor.current = node;
      }}
      aria-describedby={c.open ? c.id : undefined}
      onFocus={(e) => {
        onFocus?.(e);
        {
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
        {
          c.cancelClose();
          c.set(true);
        }
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        if (!c.content.current?.contains(e.relatedTarget as Node))
          c.scheduleClose();
      }}
    />
  );
}
export function HoverCardContent(props: FloatingContentProps) {
  const c = useFloating();
  return (
    <FloatingContent
      autoFocus={false}
      onPointerEnter={() => c.cancelClose()}
      onPointerLeave={() => c.scheduleClose()}
      onFocus={() => c.cancelClose()}
      onBlur={() => c.scheduleClose()}
      {...props}
    />
  );
}
