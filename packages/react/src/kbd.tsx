import * as React from "react";
import { cn } from "./internal.js";
export type KbdProps = React.ComponentPropsWithRef<"kbd">;
export function Kbd({ className, ...props }: KbdProps) {
  return <kbd className={cn("coal-kbd", className)} {...props} />;
}
