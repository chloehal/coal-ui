"use client";
import * as React from "react";
import { ScrollArea as Base } from "@base-ui/react/scroll-area";
import { cn } from "@/lib/utils";
export function ScrollArea({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Root>) {
  return (
    <Base.Root
      className={cn("relative overflow-hidden", className)}
      {...props}
    />
  );
}
export function ScrollAreaViewport({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Viewport>) {
  return (
    <Base.Viewport
      className={cn(
        "size-full overscroll-contain focus-visible:outline-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    />
  );
}
export function ScrollAreaScrollbar({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Scrollbar>) {
  return (
    <Base.Scrollbar
      className={cn("m-1 flex w-1.5 rounded bg-muted", className)}
      {...props}
    />
  );
}
export function ScrollAreaThumb({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Base.Thumb>) {
  return (
    <Base.Thumb
      className={cn("w-full rounded bg-muted-foreground/40", className)}
      {...props}
    />
  );
}
export const ScrollAreaContent = Base.Content;
