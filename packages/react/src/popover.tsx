"use client";
import * as React from "react";
import { Action, type ActionProps } from "./internal.js";
import {
  useFloating,
  FloatingContent,
  type FloatingContentProps,
} from "./floating.js";
export {
  FloatingRoot as Popover,
  FloatingTrigger as PopoverTrigger,
} from "./floating.js";
export function PopoverContent(props: FloatingContentProps) {
  const c = useFloating();
  return (
    <FloatingContent
      role="dialog"
      aria-labelledby={`${c.id}-title`}
      aria-describedby={`${c.id}-description`}
      {...props}
    />
  );
}
export function PopoverTitle(props: React.ComponentPropsWithRef<"h2">) {
  const c = useFloating();
  return <h2 className="coal-popover-title" {...props} id={`${c.id}-title`} />;
}
export function PopoverDescription(props: React.ComponentPropsWithRef<"p">) {
  const c = useFloating();
  return (
    <p
      className="coal-popover-description"
      {...props}
      id={`${c.id}-description`}
    />
  );
}
export function PopoverClose({ onClick, ...props }: ActionProps) {
  const c = useFloating();
  return (
    <Action
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) c.close();
      }}
    />
  );
}
