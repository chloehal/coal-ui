"use client";
import * as React from "react";
import { Action, cn, moveFocus, type ActionProps } from "./internal.js";
import {
  FloatingTrigger,
  FloatingContent,
  useFloating,
  type FloatingContentProps,
} from "./floating.js";
export { FloatingRoot as DropdownMenu } from "./floating.js";
export function DropdownMenuTrigger(props: ActionProps) {
  return <FloatingTrigger aria-haspopup="menu" {...props} />;
}
export function DropdownMenuContent({
  onKeyDown,
  ...props
}: FloatingContentProps) {
  return (
    <FloatingContent
      role="menu"
      {...props}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (!e.defaultPrevented) {
          moveFocus(e, '[role="menuitem"]');
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            const item = Array.from(
              e.currentTarget.querySelectorAll<HTMLElement>(
                '[role="menuitem"]',
              ),
            ).find(
              (el) =>
                !el.hasAttribute("disabled") &&
                el.textContent?.toLowerCase().startsWith(e.key.toLowerCase()),
            );
            item?.focus();
          }
        }
      }}
    />
  );
}
export function DropdownMenuItem({
  className,
  onClick,
  ...props
}: ActionProps) {
  const c = useFloating();
  return (
    <Action
      role="menuitem"
      tabIndex={-1}
      className={cn("coal-menu-item", className)}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) c.close();
      }}
    />
  );
}
export function DropdownMenuSeparator(
  props: React.ComponentPropsWithRef<"hr">,
) {
  return <hr className="coal-separator" {...props} />;
}
export function DropdownMenuGroup(props: React.ComponentPropsWithRef<"div">) {
  return <div role="group" {...props} />;
}
export function DropdownMenuGroupLabel(
  props: React.ComponentPropsWithRef<"div">,
) {
  return <div className="coal-menu-label" {...props} />;
}
