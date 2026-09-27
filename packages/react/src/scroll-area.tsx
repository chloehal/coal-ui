import * as React from "react";
import { cn } from "./internal.js";
export function ScrollArea({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return <div className={cn("coal-scroll-area", className)} {...props} />;
}
export function ScrollAreaViewport({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Scrollable content"
      className={cn("coal-scroll-viewport", className)}
      {...props}
    />
  );
}
export function ScrollAreaContent(props: React.ComponentPropsWithRef<"div">) {
  return <div {...props} />;
}
// The native scrollbar provides dragging, touch and platform accessibility.
export function ScrollAreaScrollbar(
  _props: React.ComponentPropsWithRef<"div">,
) {
  void _props;
  return null;
}
export function ScrollAreaThumb(_props: React.ComponentPropsWithRef<"div">) {
  void _props;
  return null;
}
