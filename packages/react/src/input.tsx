import * as React from "react";
import { cn } from "./internal.js";
export type InputProps = React.ComponentPropsWithRef<"input">;
export function Input({ className, ...props }: InputProps) {
  return <input className={cn("coal-input", className)} {...props} />;
}
